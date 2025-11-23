# Product Requirements Document (PRD): Vehicle Trip Tracker

## 1. Introduction
The Vehicle Trip Tracker is a mobile-first web application designed to streamline the process of logging vehicle trips. By leveraging Generative AI for data extraction from dashboard photos and providing robust analytics, the application aims to replace tedious manual logging with a seamless, intelligent experience.

## 2. User Personas
*   **The Frequent Traveler**: Travels often for work or leisure, needs accurate logs for reimbursement or personal tracking, but finds manual entry burdensome.
*   **The Car Enthusiast**: Wants detailed statistics on their vehicle's usage, fuel efficiency, and running costs.
*   **The Multi-Car Owner**: Manages multiple vehicles and needs a central place to track usage for each.

## 3. Functional Requirements

### 3.1 Vehicle Management
*   **Multiple Vehicle Support**: Users must be able to add, edit, and delete multiple vehicles.
*   **Vehicle Details**:
    *   Make, Model, Year.
    *   Nickname (e.g., "The Daily", "Work Truck").
    *   Vehicle Photo (optional).
    *   Full Fuel Capacity (e.g., 50L, 15 Gal) - *New*.
*   **Vehicle Selection**: Users must select a vehicle before starting a trip (or default to the last used/primary).

### 3.2 Trip Session Management
*   **Start Trip**:
    *   User initiates a trip.
    *   **Input**: Current Odometer, Fuel Level (Manual or AI-extracted).
    *   **Timestamp**: Auto-captured from device time (configurable timezone).
    *   **State**: System enters "Active Trip" state for the specific vehicle.
*   **Active Trip Dashboard**:
    *   If a trip is active, the home screen must prominently display "Trip in Progress" with start time and start details.
    *   Option to "Cancel Trip" (discard data).
*   **End Trip**:
    *   User completes the active trip.
    *   **Input**: Ending Odometer, Fuel Level (Manual or AI-extracted).
    *   **Tolls**: User toggles "Tolls Used" and inputs the *count* of tolls.
    *   **Timestamp**: Auto-captured.
    *   **Calculation**: System calculates distance traveled, duration, and estimated fuel consumed.

### 3.3 AI & Data Extraction (Gemini Integration)
*   **Image Capture**: Support for taking/uploading *multiple* photos of the dashboard at both Start and End of trips.
*   **Visual Understanding**:
    *   Extract **Odometer Reading** (numeric).
    *   Extract **Distance to Empty** / Fuel Level (numeric/percentage).
    *   *Constraint*: Do not extract time from dashboard; rely on device timestamp.
*   **Fallback**: Users must always be able to manually edit or overwrite AI-extracted values.

### 3.4 Toll Management
*   **Global Configuration**: Users can define "Toll Profiles" or rates (e.g., "Standard Toll: $5.00", "Peak Toll: $8.00") associated with time ranges. These are global settings, not per-vehicle.
*   **Trip Entry**:
    *   Simple toggle: "Did you use tolls?"
    *   If yes, input number of tolls passed.
    *   System calculates estimated toll cost based on the time of the trip and configured rates.

### 3.5 Analytics Dashboard
*   **Overview Stats**:
    *   Total Distance (Week/Month/Year).
    *   Total Trips.
    *   Total Time on Road.
*   **Advanced Metrics**:
    *   **Fuel Efficiency**: Calculated from Odometer delta vs. Fuel delta (requires consistent fuel logging).
    *   **Cost Analysis**: Estimated fuel cost (user inputs avg fuel price) + Toll costs.
    *   **Usage Patterns**: Heatmap of trip times (e.g., "You drive mostly on Tuesdays").
    *   **Vehicle Comparison**: Compare usage stats between multiple vehicles.
*   **Visualizations**: Graphs/Charts for distance over time, cost over time.

### 3.6 Settings
*   **Timezone**: Configurable user timezone.
*   **Units**: Metric (km, liters) vs. Imperial (miles, gallons).
*   **Theme**: Dark/Light mode (default to system, but toggleable).

## 4. Non-Functional Requirements
*   **Mobile-First Design**: UI must be optimized for touch targets, one-handed use, and vertical scrolling.
*   **Performance**: App should load quickly (< 2s) even on 4G networks.
*   **Offline Capability**: Basic form entry should work offline, syncing when connection is restored (AI features will require connection).
*   **Data Privacy**: Dashboard photos should be stored securely.

## 5. Data Requirements (Schema Draft)

### `profiles`
*   `id` (PK), `email`, `timezone`, `currency_symbol`, `unit_system`

### `vehicles`
*   `id` (PK), `user_id` (FK), `make`, `model`, `year`, `nickname`, `image_url`, `is_primary`, `fuel_capacity`

### `toll_rates`
*   `id` (PK), `user_id` (FK), `name`, `cost`, `start_time`, `end_time` (for time-based pricing)

### `trips`
*   `id` (PK), `vehicle_id` (FK)
*   `status` (ENUM: 'active', 'completed')
*   `start_time`, `end_time`
*   `start_odometer`, `end_odometer`
*   `start_fuel`, `end_fuel`
*   `toll_count`
*   `calculated_distance`, `calculated_duration`
*   `notes`

### `trip_images`
*   `id` (PK), `trip_id` (FK), `url`, `type` (ENUM: 'start', 'end'), `extracted_data` (JSONB)

## 6. UI/UX Guidelines
*   **Framework**: Next.js (React).
*   **Component Library**: ShadCN-UI.
*   **Style**: "Premium Modern".
    *   Use glassmorphism for cards/overlays.
    *   Smooth transitions between states (Start -> Active -> End).
    *   Large, legible typography for metrics.
    *   Vibrant but professional color palette (avoid generic bootstrap look).
