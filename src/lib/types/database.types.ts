// Enums
export enum UnitSystem {
  METRIC = "metric",
  IMPERIAL = "imperial",
}

export enum TripStatus {
  ACTIVE = "active",
  COMPLETED = "completed",
}

export enum ImageType {
  START = "start",
  END = "end",
}

// Database Types
export interface Profile {
  id: string;
  email: string | null;
  timezone: string;
  currency_symbol: string;
  unit_system: UnitSystem;
  store_images: boolean;
  created_at: string;
}

export interface Vehicle {
  id: string;
  user_id: string;
  make: string;
  model: string;
  year: number | null;
  nickname: string | null;
  fuel_capacity: number | null;
  image_url: string | null;
  is_primary: boolean;
  created_at: string;
}

export interface TollRate {
  id: string;
  user_id: string;
  name: string;
  cost: number;
  start_time: string | null;
  end_time: string | null;
}

export interface Trip {
  id: string;
  vehicle_id: string;
  user_id: string;
  status: TripStatus;
  start_time: string;
  end_time: string | null;
  start_odometer: number | null;
  end_odometer: number | null;
  start_fuel_range: number | null;
  end_fuel_range: number | null;
  toll_count: number;
  calculated_distance: number | null;
  calculated_cost: number | null;
  notes: string | null;
}

export interface TripImage {
  id: string;
  trip_id: string;
  storage_path: string;
  type: ImageType;
  ai_metadata: AiMetadata | null;
}

// AI Metadata Type (JSONB field)
export interface AiMetadata {
  odometer?: number;
  fuel_range?: number;
  unit?: "km" | "mi";
  confidence?: number;
  raw_response?: string;
  extracted_at?: string;
}

// Insert Types (for creating new records)
export type ProfileInsert = Omit<Profile, "id" | "created_at">;
export type VehicleInsert = Omit<Vehicle, "id" | "created_at">;
export type TollRateInsert = Omit<TollRate, "id">;
export type TripInsert = Omit<Trip, "id">;
export type TripImageInsert = Omit<TripImage, "id">;

// Update Types (for updating existing records)
export type ProfileUpdate = Partial<Omit<Profile, "id" | "created_at">>;
export type VehicleUpdate = Partial<Omit<Vehicle, "id" | "user_id" | "created_at">>;
export type TollRateUpdate = Partial<Omit<TollRate, "id" | "user_id">>;
export type TripUpdate = Partial<Omit<Trip, "id" | "vehicle_id" | "user_id">>;
export type TripImageUpdate = Partial<Omit<TripImage, "id" | "trip_id">>;

// Extended Types with Relations
export interface TripWithRelations extends Trip {
  vehicle?: Vehicle;
  trip_images?: TripImage[];
}

export interface VehicleWithTrips extends Vehicle {
  trips?: Trip[];
}
