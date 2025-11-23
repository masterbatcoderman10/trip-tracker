# Vehicle Trip Tracker - Development Tasks

## Phase 1: Project Setup & Foundation

### 1.1 Initial Setup
- [x] Initialize Next.js project with TypeScript and App Router
- [x] Install and configure Tailwind CSS
- [x] Install and configure ShadCN-UI (init shadcn-ui)
- [x] Set up ESLint and Prettier configurations
- [x] Create `.env.local` template with required variables
- [x] Initialize git repository and create `.gitignore`
- [x] Create basic project folder structure (src/lib, src/app, etc.)

### 1.2 Supabase Setup
- [x] Create Supabase project (or connect to existing)
- [x] Configure Supabase environment variables (SUPABASE_URL, SUPABASE_ANON_KEY)
- [x] Install Supabase client libraries (`@supabase/supabase-js`, `@supabase/ssr`)
- [x] Create Supabase client utility files for server and client components
- [x] Set up Supabase middleware for auth session management

### 1.3 Type Definitions
- [x] Create TypeScript types for `Profile` model
- [x] Create TypeScript types for `Vehicle` model
- [x] Create TypeScript types for `Trip` model
- [x] Create TypeScript types for `TripImage` model
- [x] Create TypeScript types for `TollRate` model
- [x] Create shared enums (UnitSystem, TripStatus, ImageType, etc.)

---

## Phase 2: Database Schema & Migrations

### 2.1 Core Tables Migration
- [x] Create migration for `profiles` table (id, email, timezone, currency_symbol, unit_system, store_images, created_at)
- [x] Create migration for `vehicles` table (id, user_id, make, model, year, nickname, fuel_capacity, image_url, is_primary, created_at)
- [x] Create migration for `toll_rates` table (id, user_id, name, cost, start_time, end_time)
- [x] Create migration for `trips` table (id, vehicle_id, user_id, status, start_time, end_time, start_odometer, end_odometer, start_fuel_range, end_fuel_range, toll_count, calculated_distance, calculated_cost, notes)
- [x] Create migration for `trip_images` table (id, trip_id, storage_path, type, ai_metadata)

### 2.2 RLS Policies
- [x] Enable RLS on `profiles` table
- [x] Create RLS policy for `profiles` (user can only access their own profile)
- [x] Enable RLS on `vehicles` table
- [x] Create RLS policy for `vehicles` (user_id = auth.uid())
- [x] Enable RLS on `toll_rates` table
- [x] Create RLS policy for `toll_rates` (user_id = auth.uid())
- [x] Enable RLS on `trips` table
- [x] Create RLS policy for `trips` (user_id = auth.uid())
- [x] Enable RLS on `trip_images` table
- [x] Create RLS policy for `trip_images` (via trip.user_id = auth.uid())

### 2.3 Storage Configuration
- [x] Create `trip-images` storage bucket in Supabase
- [x] Create storage policy for `trip-images` bucket (user can only access {user_id}/*)
- [x] Create `vehicle-images` storage bucket in Supabase
- [x] Create storage policy for `vehicle-images` bucket

### 2.4 Database Functions & Triggers
- [x] Create trigger to auto-create profile on user signup
- [x] Create function to calculate trip distance (end_odometer - start_odometer)
- [x] Create function to calculate trip duration
- [x] Create computed column or trigger for `calculated_distance`
- [x] Create function to get active trip for a user
- [x] Add database indexes for common queries (user_id, vehicle_id, status)

---

## Phase 3: Authentication

### 3.1 Auth Pages
- [x] Create login page UI (`app/(auth)/login/page.tsx`)
- [x] Create signup page UI (`app/(auth)/signup/page.tsx`)
- [x] Implement email/password login flow
- [x] Implement email/password signup flow
- [x] Add form validation for auth forms
- [x] Add loading states for auth actions
- [x] Add error handling and display for auth errors
- [x] Create auth layout component

### 3.2 Auth Protection
- [ ] Create middleware to protect authenticated routes
- [ ] Create auth check in `app/(app)/layout.tsx`
- [ ] Implement redirect logic (logged out → login, logged in → dashboard)
- [ ] Create logout functionality
- [ ] Add session persistence testing

### 3.3 Profile Management
- [ ] Create profile creation flow (on first login)
- [ ] Create server action to update profile settings
- [ ] Create profile context provider

---

## Phase 4: Global State & Context

### 4.1 User Context
- [ ] Create `UserContext` with TypeScript interface
- [ ] Implement `UserProvider` component
- [ ] Add `profile` state and loading logic
- [ ] Add `vehicles` state and loading logic
- [ ] Add `activeTrip` state and loading logic
- [ ] Create `useUser` custom hook
- [ ] Integrate UserProvider in root layout

### 4.2 Data Fetching Helpers
- [ ] Create server action to fetch user profile
- [ ] Create server action to fetch user vehicles
- [ ] Create server action to fetch active trip
- [ ] Create server action to fetch recent trips
- [ ] Add error handling for all fetch operations

---

## Phase 5: Core UI Components (ShadCN)

### 5.1 Install Required ShadCN Components
- [ ] Install `button` component
- [ ] Install `card` component
- [ ] Install `input` component
- [ ] Install `label` component
- [ ] Install `select` component
- [ ] Install `dialog` component
- [ ] Install `toast` component
- [ ] Install `form` component
- [ ] Install `tabs` component
- [ ] Install `switch` component
- [ ] Install `badge` component
- [ ] Install `separator` component

### 5.2 Custom App Components
- [ ] Create `VehicleCard` component (display vehicle info)
- [ ] Create `TripCard` component (display trip summary)
- [ ] Create `StatCard` component (for analytics metrics)
- [ ] Create `CameraCapture` component (photo upload/capture)
- [ ] Create `LoadingSpinner` component
- [ ] Create `EmptyState` component
- [ ] Create `BottomNavigation` component (mobile nav bar)

### 5.3 Layout Components
- [ ] Create authenticated app layout with navigation
- [ ] Create bottom navigation bar for mobile
- [ ] Create header/top bar component
- [ ] Implement dark/light theme toggle
- [ ] Add theme provider and theme switching logic

---

## Phase 6: Vehicle Management

### 6.1 Vehicle List
- [ ] Create vehicles list page (`app/(app)/vehicles/page.tsx`)
- [ ] Fetch and display user's vehicles
- [ ] Add "Add Vehicle" button
- [ ] Implement swipeable vehicle cards on dashboard
- [ ] Show primary vehicle indicator
- [ ] Add empty state for no vehicles

### 6.2 Add/Edit Vehicle
- [ ] Create add vehicle form page (`app/(app)/vehicles/new/page.tsx`)
- [ ] Create edit vehicle form page (`app/(app)/vehicles/[id]/page.tsx`)
- [ ] Add form fields (make, model, year, nickname, fuel_capacity)
- [ ] Add vehicle photo upload functionality
- [ ] Implement "Set as Primary" toggle
- [ ] Create server action to insert vehicle
- [ ] Create server action to update vehicle
- [ ] Add form validation (required fields, numeric validation)
- [ ] Implement unit selection for fuel capacity (liters/gallons)

### 6.3 Delete Vehicle
- [ ] Create server action to delete vehicle
- [ ] Add delete confirmation dialog
- [ ] Prevent deletion if vehicle has trips
- [ ] Delete associated vehicle image from storage

---

## Phase 7: Trip Management - Start Trip

### 7.1 Start Trip UI
- [ ] Create start trip page (`app/(app)/trips/new/page.tsx`)
- [ ] Add vehicle selection dropdown (if multiple vehicles)
- [ ] Create camera/upload interface for dashboard photo
- [ ] Add image preview carousel (for multiple photos)
- [ ] Create manual input fields (odometer, fuel range)
- [ ] Add "Capture Photo" button
- [ ] Add "Start Trip" submit button

### 7.2 Start Trip Logic
- [ ] Create server action to start trip
- [ ] Check for existing active trip (prevent multiple active trips)
- [ ] Validate odometer reading (must be >= last trip's end odometer)
- [ ] Upload dashboard photo to storage (if store_images enabled)
- [ ] Create trip record with status='active'
- [ ] Create trip_images record
- [ ] Update UserContext with new active trip
- [ ] Redirect to active trip dashboard

### 7.3 Photo Upload
- [ ] Implement camera access for mobile devices
- [ ] Implement file upload for desktop
- [ ] Add image compression before upload
- [ ] Validate image file type and size
- [ ] Generate unique storage path ({user_id}/{trip_id}/{timestamp}.jpg)
- [ ] Handle upload errors gracefully

---

## Phase 8: Trip Management - Active Trip

### 8.1 Active Trip Dashboard
- [ ] Create active trip view on home dashboard
- [ ] Display "Trip in Progress" banner
- [ ] Show start time and start details
- [ ] Implement ticking duration timer
- [ ] Add "End Trip" button (prominent)
- [ ] Add "Cancel Trip" button (destructive action)

### 8.2 Cancel Trip
- [ ] Create server action to cancel trip
- [ ] Add confirmation dialog for cancel
- [ ] Delete trip record
- [ ] Delete associated trip images from storage
- [ ] Update UserContext (clear activeTrip)

---

## Phase 9: Trip Management - End Trip

### 9.1 End Trip UI
- [ ] Create end trip page (`app/(app)/trips/end/page.tsx`)
- [ ] Display start trip details (for reference)
- [ ] Create camera/upload interface for end dashboard photo
- [ ] Add manual input fields (end odometer, end fuel range)
- [ ] Create toll toggle ("Tolls Used?")
- [ ] Add toll count input (with +/- buttons)
- [ ] Add "Complete Trip" button

### 9.2 End Trip Logic
- [ ] Create server action to end trip
- [ ] Validate end odometer (must be >= start odometer)
- [ ] Upload end dashboard photo to storage
- [ ] Calculate distance (end_odometer - start_odometer)
- [ ] Calculate duration (end_time - start_time)
- [ ] Calculate estimated toll cost based on toll_count and rates
- [ ] Update trip record with status='completed'
- [ ] Update UserContext (clear activeTrip)
- [ ] Redirect to trip details or dashboard

### 9.3 Trip Calculations
- [ ] Implement distance calculation logic
- [ ] Implement duration calculation (format as HH:MM)
- [ ] Implement toll cost estimation (check time-based rates)
- [ ] Calculate fuel consumed (start_fuel_range - end_fuel_range)
- [ ] Calculate estimated fuel cost (requires user fuel price setting)

---

## Phase 10: AI Integration (Gemini)

### 10.1 Edge Function Setup
- [ ] Create Supabase Edge Function (`analyze-dashboard`)
- [ ] Install Google Generative AI SDK in Edge Function
- [ ] Configure GEMINI_API_KEY in Edge Function secrets
- [ ] Set up CORS headers for Edge Function

### 10.2 Image Analysis Logic
- [ ] Implement image retrieval (from storage or base64)
- [ ] Respect `profiles.store_images` setting
- [ ] Construct Gemini prompt for odometer and fuel extraction
- [ ] Call Gemini API with multimodal input (text + image)
- [ ] Parse Gemini response (handle JSON and markdown code blocks)
- [ ] Extract odometer and fuel_range values
- [ ] Determine unit (km/mi) from response
- [ ] Return structured JSON response

### 10.3 Frontend Integration
- [ ] Create client function to call Edge Function
- [ ] Add "Scanning..." loading state on photo upload
- [ ] Pre-fill form fields with AI-extracted data
- [ ] Allow manual override of AI values
- [ ] Handle AI extraction errors (show manual input)
- [ ] Add retry mechanism for failed AI calls
- [ ] Display confidence/success indicator

### 10.4 Error Handling
- [ ] Handle invalid image format errors
- [ ] Handle Gemini API rate limits
- [ ] Handle extraction failures (no data found)
- [ ] Provide clear user feedback for each error type
- [ ] Log errors for debugging

---

## Phase 11: Trip History

### 11.1 Trip List
- [ ] Create trip history page (`app/(app)/trips/page.tsx`)
- [ ] Fetch user's completed trips (paginated)
- [ ] Display trips in list view (sorted by date desc)
- [ ] Show trip summary (date, distance, duration, cost)
- [ ] Add filter by vehicle
- [ ] Add filter by date range
- [ ] Implement infinite scroll or pagination
- [ ] Add empty state for no trips

### 11.2 Trip Details
- [ ] Create trip details page (`app/(app)/trips/[id]/page.tsx`)
- [ ] Display all trip information
- [ ] Show start and end photos (if available)
- [ ] Display calculated metrics
- [ ] Add "Edit" button
- [ ] Add "Delete" button

### 11.3 Edit Trip
- [ ] Create edit trip form
- [ ] Allow editing odometer readings
- [ ] Allow editing fuel range values
- [ ] Allow editing toll count
- [ ] Create server action to update trip
- [ ] Recalculate metrics on save

### 11.4 Delete Trip
- [ ] Create server action to delete trip
- [ ] Add delete confirmation dialog
- [ ] Delete associated trip_images records
- [ ] Delete trip photos from storage
- [ ] Redirect to trip history after deletion

---

## Phase 12: Dashboard/Home Page

### 12.1 Dashboard Layout
- [ ] Create dashboard page (`app/(app)/dashboard/page.tsx`)
- [ ] Add swipeable vehicle carousel
- [ ] Display current vehicle info (odometer, fuel)
- [ ] Show active trip banner (if exists)
- [ ] Display recent trips list (last 5)
- [ ] Add quick stats (this week/month distance)

### 12.2 Quick Actions
- [ ] Add floating "Start Trip" button (prominent)
- [ ] Add "Add Vehicle" quick action (if no vehicles)
- [ ] Implement quick vehicle switch

### 12.3 Recent Trips Widget
- [ ] Fetch and display last 5 trips
- [ ] Show trip date, distance, and vehicle
- [ ] Make each trip clickable (navigate to details)
- [ ] Add "View All" link to trip history

---

## Phase 13: Analytics Dashboard

### 13.1 Analytics UI
- [ ] Create analytics page (`app/(app)/analytics/page.tsx`)
- [ ] Add time period selector (Week/Month/Year)
- [ ] Add vehicle filter dropdown
- [ ] Create overview stats section
- [ ] Create cost breakdown section
- [ ] Create usage patterns section

### 13.2 Overview Analytics
- [ ] Create server action to fetch total distance
- [ ] Create server action to fetch total trips count
- [ ] Create server action to fetch total time on road
- [ ] Display metrics in StatCard components
- [ ] Add comparison with previous period

### 13.3 Cost Analytics
- [ ] Calculate total toll costs
- [ ] Calculate total fuel costs (requires fuel price input)
- [ ] Create pie chart for cost breakdown
- [ ] Show cost trends over time (line chart)

### 13.4 Efficiency Analytics
- [ ] Calculate average fuel efficiency (distance per fuel consumed)
- [ ] Calculate average trip distance
- [ ] Calculate average trip duration
- [ ] Display efficiency trends

### 13.5 Usage Patterns
- [ ] Aggregate trips by day of week
- [ ] Create heatmap visualization
- [ ] Show peak usage times
- [ ] Display most used vehicle (if multiple)

### 13.6 Charts Implementation
- [ ] Install chart library (chart.js or visx)
- [ ] Create BarChart component
- [ ] Create LineChart component
- [ ] Create PieChart component
- [ ] Create Heatmap component
- [ ] Style charts to match app theme

---

## Phase 14: Toll Management

### 14.1 Toll Rates UI
- [ ] Create toll rates page (`app/(app)/settings/tolls/page.tsx`)
- [ ] Display list of configured toll rates
- [ ] Add "Add Toll Rate" button
- [ ] Show rate name, cost, and time range

### 14.2 Add/Edit Toll Rate
- [ ] Create toll rate form dialog
- [ ] Add fields (name, cost, start_time, end_time)
- [ ] Make time range optional (all-day rates)
- [ ] Create server action to insert toll rate
- [ ] Create server action to update toll rate
- [ ] Validate cost (must be positive number)

### 14.3 Delete Toll Rate
- [ ] Create server action to delete toll rate
- [ ] Add delete confirmation dialog

### 14.4 Toll Calculation
- [ ] Implement logic to select toll rate based on trip time
- [ ] Handle overlapping time ranges (use first match)
- [ ] Apply toll rate × toll_count for trip cost
- [ ] Default to first all-day rate if no time match

---

## Phase 15: Settings & Preferences

### 15.1 Settings Page
- [ ] Create settings page (`app/(app)/settings/page.tsx`)
- [ ] Add profile section (name, email display)
- [ ] Add preferences section
- [ ] Add privacy section
- [ ] Add toll configuration link
- [ ] Add logout button

### 15.2 Unit System
- [ ] Add unit system toggle (Metric/Imperial)
- [ ] Create server action to update unit_system in profile
- [ ] Apply unit conversion throughout app
- [ ] Update all displays based on user preference

### 15.3 Currency Settings
- [ ] Add currency symbol input
- [ ] Create server action to update currency_symbol
- [ ] Apply currency symbol to all cost displays

### 15.4 Timezone Settings
- [ ] Add timezone selector dropdown
- [ ] Create server action to update timezone
- [ ] Apply timezone to all timestamp displays

### 15.5 Privacy Settings
- [ ] Add "Store Dashboard Photos" toggle
- [ ] Create server action to update store_images preference
- [ ] Show warning if disabling (existing photos remain)
- [ ] Implement in-memory AI processing when disabled

### 15.6 Theme Settings
- [ ] Implement dark/light mode toggle
- [ ] Store theme preference in localStorage
- [ ] Add "System" theme option (auto-detect)
- [ ] Apply theme across entire app

---

## Phase 16: Offline Support

### 16.1 Service Worker Setup
- [ ] Configure Next.js for PWA
- [ ] Create service worker for offline caching
- [ ] Cache static assets (CSS, JS, images)
- [ ] Cache API responses where appropriate

### 16.2 Offline Form Entry
- [ ] Detect online/offline status
- [ ] Store pending trips in IndexedDB when offline
- [ ] Sync pending trips when connection restored
- [ ] Show offline indicator in UI
- [ ] Disable AI features when offline

### 16.3 Optimistic Updates
- [ ] Implement optimistic UI updates for trip creation
- [ ] Handle sync failures gracefully
- [ ] Show sync status to user

---

## Phase 17: Polish & UX Refinements

### 17.1 Animations & Transitions
- [ ] Add smooth page transitions
- [ ] Implement glassmorphism for cards
- [ ] Add loading skeletons for data fetching
- [ ] Implement swipe gestures for vehicle carousel
- [ ] Add success/error toast notifications
- [ ] Create smooth state transitions (Start → Active → End)

### 17.2 Responsive Design
- [ ] Test and refine mobile layout (320px-428px)
- [ ] Test and refine tablet layout (768px-1024px)
- [ ] Test and refine desktop layout (1024px+)
- [ ] Ensure touch targets are min 44px × 44px
- [ ] Optimize for one-handed mobile use

### 17.3 Accessibility
- [ ] Add ARIA labels to interactive elements
- [ ] Ensure keyboard navigation works throughout app
- [ ] Test with screen reader
- [ ] Ensure sufficient color contrast
- [ ] Add focus indicators

### 17.4 Performance Optimization
- [ ] Implement code splitting for routes
- [ ] Optimize images (use Next.js Image component)
- [ ] Lazy load below-fold components
- [ ] Minimize bundle size
- [ ] Test load time on 4G network
- [ ] Implement caching strategies

### 17.5 Error Handling
- [ ] Create global error boundary
- [ ] Add user-friendly error messages
- [ ] Implement retry mechanisms for failed requests
- [ ] Add error reporting/logging (optional)

---

## Phase 18: Testing

### 18.1 Unit Tests
- [ ] Set up testing framework (Jest + React Testing Library)
- [ ] Write tests for utility functions
- [ ] Write tests for calculation functions
- [ ] Write tests for form validation
- [ ] Achieve >80% code coverage for utils

### 18.2 Component Tests
- [ ] Write tests for VehicleCard component
- [ ] Write tests for TripCard component
- [ ] Write tests for CameraCapture component
- [ ] Write tests for form components

### 18.3 Integration Tests
- [ ] Test complete trip flow (start → end)
- [ ] Test vehicle management flow
- [ ] Test auth flow (signup → login → logout)
- [ ] Test toll rate configuration

### 18.4 E2E Tests (Optional)
- [ ] Set up Playwright or Cypress
- [ ] Write E2E test for trip creation
- [ ] Write E2E test for analytics viewing

---

## Phase 19: Documentation

### 19.1 User Documentation
- [ ] Create user guide (how to use the app)
- [ ] Document AI photo capture tips
- [ ] Create FAQ document

### 19.2 Developer Documentation
- [ ] Update README with setup instructions
- [ ] Document environment variables
- [ ] Document database schema
- [ ] Document API/Edge Functions
- [ ] Add code comments for complex logic

---

## Phase 20: Deployment

### 20.1 Pre-deployment Checklist
- [ ] Run production build locally
- [ ] Test production build
- [ ] Check for console errors/warnings
- [ ] Verify all environment variables are set
- [ ] Run security audit (npm audit)

### 20.2 Vercel Deployment
- [ ] Connect GitHub repo to Vercel
- [ ] Configure environment variables in Vercel
- [ ] Set up custom domain (optional)
- [ ] Deploy to production
- [ ] Test deployed application

### 20.3 Supabase Production Setup
- [ ] Review and optimize database indexes
- [ ] Set up database backups
- [ ] Configure rate limiting for Edge Functions
- [ ] Monitor Edge Function usage
- [ ] Set up database monitoring/alerts

### 20.4 Post-deployment
- [ ] Test all features in production
- [ ] Monitor error logs
- [ ] Monitor performance metrics
- [ ] Set up analytics (optional)
- [ ] Create bug report process

---

## Future Enhancements (Post-MVP)

- [ ] GPS tracking and route mapping
- [ ] Multi-vehicle comparison dashboard
- [ ] Export trips to CSV/Excel
- [ ] Service reminders based on odometer
- [ ] Fuel price tracking integration
- [ ] Social sharing features
- [ ] Vehicle maintenance logs
- [ ] Integration with car APIs (Tesla, etc.)
- [ ] Voice input for trip logging
- [ ] Apple CarPlay / Android Auto integration
