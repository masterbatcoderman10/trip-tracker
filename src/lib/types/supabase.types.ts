export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          created_at: string | null
          currency_symbol: string | null
          email: string | null
          id: string
          store_images: boolean | null
          timezone: string | null
          unit_system: string | null
        }
        Insert: {
          created_at?: string | null
          currency_symbol?: string | null
          email?: string | null
          id: string
          store_images?: boolean | null
          timezone?: string | null
          unit_system?: string | null
        }
        Update: {
          created_at?: string | null
          currency_symbol?: string | null
          email?: string | null
          id?: string
          store_images?: boolean | null
          timezone?: string | null
          unit_system?: string | null
        }
        Relationships: []
      }
      toll_rates: {
        Row: {
          cost: number
          end_time: string | null
          id: string
          name: string
          start_time: string | null
          user_id: string
        }
        Insert: {
          cost: number
          end_time?: string | null
          id?: string
          name: string
          start_time?: string | null
          user_id: string
        }
        Update: {
          cost?: number
          end_time?: string | null
          id?: string
          name?: string
          start_time?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "toll_rates_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      trip_images: {
        Row: {
          ai_metadata: Json | null
          id: string
          storage_path: string
          trip_id: string
          type: string | null
        }
        Insert: {
          ai_metadata?: Json | null
          id?: string
          storage_path: string
          trip_id: string
          type?: string | null
        }
        Update: {
          ai_metadata?: Json | null
          id?: string
          storage_path?: string
          trip_id?: string
          type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "trip_images_trip_id_fkey"
            columns: ["trip_id"]
            isOneToOne: false
            referencedRelation: "trips"
            referencedColumns: ["id"]
          },
        ]
      }
      trips: {
        Row: {
          calculated_cost: number | null
          calculated_distance: number | null
          end_fuel_range: number | null
          end_odometer: number | null
          end_time: string | null
          id: string
          notes: string | null
          start_fuel_range: number | null
          start_odometer: number | null
          start_time: string | null
          status: string | null
          toll_count: number | null
          user_id: string
          vehicle_id: string
        }
        Insert: {
          calculated_cost?: number | null
          calculated_distance?: number | null
          end_fuel_range?: number | null
          end_odometer?: number | null
          end_time?: string | null
          id?: string
          notes?: string | null
          start_fuel_range?: number | null
          start_odometer?: number | null
          start_time?: string | null
          status?: string | null
          toll_count?: number | null
          user_id: string
          vehicle_id: string
        }
        Update: {
          calculated_cost?: number | null
          calculated_distance?: number | null
          end_fuel_range?: number | null
          end_odometer?: number | null
          end_time?: string | null
          id?: string
          notes?: string | null
          start_fuel_range?: number | null
          start_odometer?: number | null
          start_time?: string | null
          status?: string | null
          toll_count?: number | null
          user_id?: string
          vehicle_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "trips_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "trips_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      vehicles: {
        Row: {
          created_at: string | null
          fuel_capacity: number | null
          id: string
          image_url: string | null
          is_primary: boolean | null
          make: string
          model: string
          nickname: string | null
          user_id: string
          year: number | null
        }
        Insert: {
          created_at?: string | null
          fuel_capacity?: number | null
          id?: string
          image_url?: string | null
          is_primary?: boolean | null
          make: string
          model: string
          nickname?: string | null
          user_id: string
          year?: number | null
        }
        Update: {
          created_at?: string | null
          fuel_capacity?: number | null
          id?: string
          image_url?: string | null
          is_primary?: boolean | null
          make?: string
          model?: string
          nickname?: string | null
          user_id?: string
          year?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "vehicles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
