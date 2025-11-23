# Technical Design Document: Vehicle Trip Tracker

## 1. System Architecture
The application follows a **Serverless Architecture** using **Next.js** (hosted on Vercel/Netlify or similar) and **Supabase** (BaaS).

*   **Frontend**: Next.js (React) + ShadCN-UI + Tailwind CSS.
*   **Backend**: Supabase (PostgreSQL, Auth, Storage, Edge Functions).
*   **AI Service**: Google Gemini 3 Pro Preview (via Supabase Edge Functions).

## 2. Database Schema (PostgreSQL)

### 2.1 Tables

#### `profiles`
*   `id`: uuid (PK, references auth.users)
*   `email`: text
*   `timezone`: text (default 'UTC')
*   `currency_symbol`: text (default '$')
*   `unit_system`: text (enum: 'metric', 'imperial')
*   `store_images`: boolean (default false) - *User must opt-in to store dashboard photos*
*   `created_at`: timestamptz

#### `vehicles`
*   `id`: uuid (PK, default gen_random_uuid())
*   `user_id`: uuid (FK -> profiles.id)
*   `make`: text
*   `model`: text
*   `year`: int
*   `nickname`: text
*   `fuel_capacity`: numeric (Liters/Gallons)
*   `image_url`: text (Supabase Storage path)
*   `is_primary`: boolean (default false)
*   `created_at`: timestamptz

#### `toll_rates`
*   `id`: uuid (PK)
*   `user_id`: uuid (FK -> profiles.id)
*   `name`: text (e.g., "Morning Commute")
*   `cost`: numeric
*   `start_time`: time (nullable, for time-based)
*   `end_time`: time (nullable)

#### `trips`
*   `id`: uuid (PK)
*   `vehicle_id`: uuid (FK -> vehicles.id)
*   `user_id`: uuid (FK -> profiles.id)
*   `status`: text (enum: 'active', 'completed')
*   `start_time`: timestamptz
*   `end_time`: timestamptz
*   `start_odometer`: numeric
*   `end_odometer`: numeric
*   `start_fuel_range`: numeric (Distance to empty)
*   `end_fuel_range`: numeric
*   `toll_count`: int (default 0)
*   `calculated_distance`: numeric (Generated column or computed on save)
*   `calculated_cost`: numeric
*   `notes`: text

#### `trip_images`
*   `id`: uuid (PK)
*   `trip_id`: uuid (FK -> trips.id)
*   `storage_path`: text
*   `type`: text (enum: 'start', 'end')
*   `ai_metadata`: jsonb (Raw Gemini response)

### 2.2 RLS Policies
*   All tables will have RLS enabled.
*   Policy: `Users can select/insert/update/delete rows where user_id = auth.uid()`.

## 3. Component Architecture (Next.js)

### 3.1 Directory Structure
```
src/
  lib/
    components/
      ui/           # ShadCN components
      app/          # App-specific components
        VehicleCard.tsx
        TripCard.tsx
        CameraCapture.tsx
        StatsChart.tsx
    server/         # Server-side logic (DB helpers)
    context/        # Global state (React Context)
  app/
    (app)/          # Authenticated routes
      layout.tsx (Auth check, Navigation)
      dashboard/
        page.tsx
      trips/
        [id]/
          page.tsx (Trip details/Edit)
        new/
          page.tsx (Start Trip flow)
      vehicles/
        page.tsx
      settings/
        page.tsx
    (auth)/         # Public routes
      login/
      signup/
```

### 3.2 State Management (React Context/Hooks)
We will use React Context and Hooks for state management.

*   **Local State**: `useState()` for form inputs, toggle states.
*   **Global Context**: A `UserContext` exposed via React Context Provider in the root layout.
    ```typescript
    // lib/context/user.tsx
    import { createContext, useContext, useState, useEffect } from 'react';

    interface UserState {
        profile: Profile | null;
        vehicles: Vehicle[];
        activeTrip: Trip | null;
        load: () => Promise<void>;
    }

    const UserContext = createContext<UserState | null>(null);

    export function UserProvider({ children }) {
        const [profile, setProfile] = useState<Profile | null>(null);
        const [vehicles, setVehicles] = useState<Vehicle[]>([]);
        const [activeTrip, setActiveTrip] = useState<Trip | null>(null);

        async function load() { ... } // Fetches from Supabase

        return (
            <UserContext.Provider value={{ profile, vehicles, activeTrip, load }}>
                {children}
            </UserContext.Provider>
        );
    }
    ```

## 4. Logic & Encapsulation

### 4.1 Trip Session Logic
*   **Start Trip**:
    1.  Check if `activeTrip` exists. If yes, warn user.
    2.  Create new `trips` row with `status: 'active'`, `start_time: now()`.
    3.  Upload image (if any) to `trip-images` bucket.
    4.  Call Edge Function (async) to extract data (optional, can be done before save).
*   **End Trip**:
    1.  Update `trips` row with `end_time`, `end_odometer`, etc.
    2.  Calculate `distance = end_odometer - start_odometer`.
    3.  Calculate `cost = (distance * avg_fuel_cost) + (toll_count * toll_rate)`.
    4.  Set `status: 'completed'`.

### 4.2 AI Extraction Logic (Edge Function)
*   **Function**: `analyze-dashboard`
*   **Input**: `image_base64` (if storage off) or `storage_path` (if storage on)
*   **Privacy Check**: Check `profiles.store_images`. If false, process image in-memory only and do not save to Storage.
*   **Process**:
    1.  Retrieve image.
    2.  Construct Gemini Prompt (using `gemini-1.5-flash` or `gemini-1.5-pro`):
        > "Analyze this car dashboard. Extract the Odometer reading (numeric) and Distance to Empty (numeric). Return JSON: { odometer: number, fuel_range: number, unit: 'km'|'mi' }."
    3.  **Code Example (Node.js SDK)**:
        ```typescript
        import { GoogleGenerativeAI } from "@google/generative-ai";

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-3-pro-preview" });

        async function analyzeDashboard(imageBuffer: ArrayBuffer, mimeType: string) {
          const prompt = "Extract the odometer reading and fuel level from this dashboard image. Return JSON: { odometer: number, fuel_range: number, unit: 'km'|'mi' }";
          
          const imagePart = {
            inlineData: {
              data: Buffer.from(imageBuffer).toString("base64"),
              mimeType
            },
          };

          const result = await model.generateContent([prompt, imagePart]);
          const response = await result.response;
          const text = response.text();
          
          // Parse JSON from text (handle markdown code blocks if present)
          return JSON.parse(text.replace(/```json|```/g, '').trim());
        }
        ```
    4.  Return data to frontend.
*   **Error Handling**: If AI fails, return null/error, frontend prompts user for manual input.

### 4.3 Analytics Logic
*   **Architecture**: Dedicated Edge Functions for specific analytic views to offload computation and keep client light.
    *   `analytics-overview`: Returns total distance, trips, time.
    *   `analytics-efficiency`: Calculates fuel efficiency stats.
    *   `analytics-cost`: Aggregates toll and fuel costs.
*   **Charts**: Use `chart.js` or `visx` (wrapped in React components) to render data.

## 5. Security & Privacy
*   **Auth**: Supabase Auth with Email/Password.
    *   **Session**: Persisted cookies (handled by Supabase SSR helpers for Next.js) to ensure users stay logged in.
*   **Storage**:
    *   Bucket: `trip-images`
    *   Policy: `Give access to files in folder {user_id}/*`.
*   **Environment Variables**:
    *   `SUPABASE_URL`, `SUPABASE_ANON_KEY`
    *   `GEMINI_API_KEY` (Stored in Edge Function secrets).
