# Project Scope: Vehicle Trip Tracker

## 1. Executive Summary
A mobile-first web application designed to simplify vehicle trip tracking. The application solves the problem of tedious manual logging by leveraging Generative AI (Gemini) to extract odometer and fuel data directly from dashboard photos.

## 2. Problem Statement
Travelers currently face a manual and error-prone process for tracking vehicle trips:
-   Need to remember to note down starting/ending odometer readings.
-   Need to log fuel levels and time.
-   Data is often recorded in disconnected tables or notes.
-   Forgetting to log a trip leads to data gaps (using previous end data as current start).

## 3. Proposed Solution
A user-friendly, mobile-first Next.js application that:
-   Allows manual entry of trip details.
-   **Key Differentiator**: Supports uploading a photo of the car's dashboard. The app uses an Edge Function with the Gemini SDK to visually understand the image and automatically extract:
    -   Odometer reading.
    -   Distance to empty (fuel).
-   Stores data securely in Supabase.

## 4. Functional Requirements

### 4.1 User Interface (Mobile First)
-   **Dashboard/Home**:
    -   Quick view of current vehicle status (last known odometer, fuel).
    -   List of recent trips.
    -   Prominent "Start Trip" / "End Trip" actions.
-   **Trip Entry**:
    -   **Manual Mode**: Form inputs for Odometer, Fuel Level, Date/Time.
    -   **AI Mode**: Camera capture/Upload button.
        -   Preview image.
        -   "Scanning..." indicator.
        -   Pre-filled form with extracted data for user verification.
-   **Trip History**:
    -   List view of all past trips.
    -   Ability to edit or delete entries.

### 4.2 Backend & Data
-   **Authentication**: Secure user login/signup (Supabase Auth).
-   **Database (Supabase)**:
    -   `profiles`: User details.
    -   `vehicles`: Car details (Make, Model, Year).
    -   `trips`:
        -   `start_odometer`, `end_odometer`
        -   `start_fuel_range`, `end_fuel_range`
        -   `start_time`, `end_time`
        -   `image_url` (optional, for the dashboard photo)
-   **Edge Functions**:
    -   `analyze-dashboard`: Accepts an image, calls Gemini API, returns JSON with extracted metrics.

## 5. Technical Stack

### Frontend
-   **Framework**: Next.js (React).
-   **UI Library**: ShadCN-UI + Tailwind CSS.
-   **Design Philosophy**: Clean, modern, "Premium" feel, mobile-responsive.

### Backend
-   **Platform**: Supabase.
-   **Database**: PostgreSQL.
-   **API**: Supabase Client (RLS enabled).
-   **Compute**: Supabase Edge Functions (Deno).

### AI / ML
-   **Model**: Google Gemini (via Gemini SDK).
-   **Task**: Multimodal visual understanding (OCR + Contextual extraction of dashboard metrics).

## 6. Future Considerations (Out of Scope for MVP)
-   GPS tracking/Maps integration.
-   Multiple vehicle support (MVP will focus on single vehicle flow first).
-   Export to CSV/Excel.
-   Service reminders based on odometer.

## 7. Development Phases
1.  **Setup**: Initialize Next.js, Supabase project, and UI libraries.
2.  **Core UI**: Build the mobile layout, forms, and navigation.
3.  **Backend**: Set up Database schema and Auth.
4.  **AI Integration**: Implement the Gemini Edge Function.
5.  **Integration**: Connect UI to Backend and AI service.
6.  **Polish**: Animations, error handling, and UI refinements.
