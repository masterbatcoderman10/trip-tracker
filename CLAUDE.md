# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Vehicle Trip Tracker is a mobile-first web application for logging vehicle trips using AI-powered dashboard photo analysis. The app leverages Google Gemini to extract odometer and fuel data from dashboard photos, eliminating tedious manual entry.

**Tech Stack:**
- Frontend: Next.js (React) + ShadCN-UI + Tailwind CSS
- Backend: Supabase (PostgreSQL, Auth, Storage, Edge Functions)
- AI: Google Gemini API (via Supabase Edge Functions)
- Deployment: Vercel/Netlify + Supabase

## Database Schema

The application uses Supabase PostgreSQL with Row Level Security (RLS) enabled on all tables:

### Core Tables
- **profiles**: User settings (timezone, currency_symbol, unit_system, store_images opt-in)
- **vehicles**: Vehicle details (make, model, year, nickname, fuel_capacity, image_url, is_primary)
- **trips**: Trip records with status ('active' | 'completed'), odometer readings, fuel range, timestamps, toll_count
- **trip_images**: Dashboard photos with AI-extracted metadata (JSONB)
- **toll_rates**: User-defined toll pricing (name, cost, optional time-based start_time/end_time)

### RLS Policy Pattern
All tables: `Users can select/insert/update/delete rows where user_id = auth.uid()`

## Application Architecture

### Directory Structure (Planned)
```
src/
  lib/
    components/
      ui/           # ShadCN components
      app/          # App-specific: VehicleCard, TripCard, CameraCapture, StatsChart
    server/         # Server-side DB helpers
    context/        # React Context (UserContext for profile, vehicles, activeTrip)
  app/
    (app)/          # Authenticated routes
      dashboard/
      trips/
        [id]/       # Trip details/edit
        new/        # Start trip flow
      vehicles/
      settings/
    (auth)/         # Public routes (login, signup)
```

### State Management
- Local state via `useState()` for forms and toggles
- Global state via `UserContext` (React Context) providing: `profile`, `vehicles`, `activeTrip`, and `load()` function

## Core Features & Logic

### Trip Session Flow
1. **Start Trip**: Create `trips` row with `status: 'active'`, capture start_odometer, start_fuel_range, start_time
2. **Active Trip**: Display "Trip in Progress" with start details and ticking timer
3. **End Trip**: Update trip with end_odometer, end_fuel_range, end_time, toll_count. Calculate distance and cost. Set `status: 'completed'`

### AI Integration (Edge Function: `analyze-dashboard`)
- Accepts dashboard image (base64 or storage_path)
- Respects `profiles.store_images` privacy setting (if false, process in-memory only)
- Prompts Gemini: "Extract odometer reading and Distance to Empty. Return JSON: { odometer: number, fuel_range: number, unit: 'km'|'mi' }"
- Model: `gemini-1.5-flash` or `gemini-1.5-pro` (or newer gemini-3-pro-preview)
- Always allow manual override of AI-extracted values

### Privacy & Security
- Supabase Auth with Email/Password
- Session persistence via Supabase SSR helpers
- Storage bucket `trip-images` with policy: access to `{user_id}/*` only
- User must opt-in to store dashboard photos (`profiles.store_images`)

## Design Philosophy

**Mobile-First & Premium Modern:**
- Glassmorphism for cards/overlays
- Smooth state transitions (Start → Active → End)
- Large, legible typography for metrics
- Vibrant but professional color palette
- Touch-optimized UI (one-handed use, vertical scrolling)

## Key Constraints

1. **No Time Extraction from Dashboard**: Always use device timestamp, never extract time from dashboard photos
2. **Privacy First**: Dashboard photos only stored if user explicitly enables `store_images`
3. **AI as Assistant**: Always provide manual input/override options for AI-extracted data
4. **Offline Support**: Basic form entry must work offline (AI features require connection)
5. **Performance**: Target < 2s load time on 4G networks

## Development Commands

*(To be added once Next.js project is initialized)*

Expected commands:
```bash
npm install          # Install dependencies
npm run dev          # Start development server
npm run build        # Production build
npm run lint         # Lint code
npm test             # Run tests
```

## Supabase Integration

Connected via MCP server. Key operations:
- Use `mcp__supabase__apply_migration` for schema changes (DDL)
- Use `mcp__supabase__execute_sql` for data queries
- Edge Functions deployed via Supabase CLI or dashboard
- Environment variables: `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `GEMINI_API_KEY` (in Edge Function secrets)

## Multi-Vehicle Support

- Users can add/edit/delete multiple vehicles
- Each vehicle has optional nickname and photo
- One vehicle can be marked as `is_primary`
- Vehicle selection required before starting trip (defaults to last used/primary)

## Analytics Features

Planned Edge Functions for analytics:
- `analytics-overview`: Total distance, trips, time
- `analytics-efficiency`: Fuel efficiency calculations
- `analytics-cost`: Toll and fuel cost aggregation

Use `chart.js` or `visx` for visualizations.
