/**
 * Supabase Client Configuration
 * Handles database connections and real-time subscriptions
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Client for browser usage
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
});

// Admin client for server-side operations (use with caution)
export const supabaseAdmin = createClient(
  supabaseUrl,
  process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseAnonKey,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

/**
 * Database Table Names
 * Keep these in sync with your Supabase schema
 */
export const TABLES = {
  USERS: 'users',
  TEMPLES: 'temples',
  BOOKINGS: 'bookings',
  CROWD_DATA: 'crowd_data',
  ALERTS: 'alerts',
  EMERGENCIES: 'emergency_incidents',
  PARKING: 'parking_lots',
  VEHICLES: 'vehicle_entries',
  CCTV: 'cctv_cameras',
  MEDICAL_FACILITIES: 'medical_facilities',
  AMBULANCES: 'ambulances',
  SECURITY_PERSONNEL: 'security_personnel',
  CHAT_MESSAGES: 'chat_messages',
  ANNOUNCEMENTS: 'announcements',
  BHAKTI_PROFILES: 'bhakti_profiles',
  NOTIFICATIONS: 'notifications',
} as const;

/**
 * Real-time Channel Names
 */
export const CHANNELS = {
  CROWD_UPDATES: 'crowd_updates',
  ALERTS: 'alerts',
  BOOKINGS: 'bookings',
  CHAT: 'chat',
  EMERGENCY: 'emergency',
} as const;

/**
 * Type-safe database query helpers
 */
export type Database = {
  public: {
    Tables: {
      [key in typeof TABLES[keyof typeof TABLES]]: {
        Row: unknown;
        Insert: unknown;
        Update: unknown;
      };
    };
  };
};
