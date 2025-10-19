-- DivyaFlow Database Schema for Supabase
-- Run this in your Supabase SQL Editor after creating a new project

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enable PostGIS for location features
CREATE EXTENSION IF NOT EXISTS postgis;

-- ============= Users Table =============
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  phone TEXT,
  role TEXT NOT NULL CHECK (role IN ('devotee', 'admin', 'security', 'medical', 'traffic', 'control-room')),
  avatar TEXT,
  bhakti_score INTEGER DEFAULT 0,
  preferences JSONB DEFAULT '{"notifications": {"email": true, "sms": false, "push": true}, "language": "en", "theme": "system"}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============= Temples Table =============
CREATE TABLE temples (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  location JSONB NOT NULL,
  capacity JSONB NOT NULL DEFAULT '{"max": 5000, "current": 0, "vip": 100}'::jsonb,
  image TEXT,
  images TEXT[] DEFAULT '{}',
  timings JSONB DEFAULT '{"opening": "05:00", "closing": "22:00"}'::jsonb,
  darshan JSONB DEFAULT '{"duration": 30, "slotsPerHour": 2, "pricing": {"general": 0, "vip": 500, "senior": 0}}'::jsonb,
  amenities TEXT[] DEFAULT '{}',
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'closed', 'maintenance')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============= Time Slots Table =============
CREATE TABLE time_slots (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  temple_id UUID REFERENCES temples(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  max_capacity INTEGER NOT NULL DEFAULT 100,
  available INTEGER NOT NULL DEFAULT 100,
  booked INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(temple_id, date, start_time)
);

-- ============= Bookings Table =============
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_number TEXT UNIQUE NOT NULL,
  devotee_id UUID REFERENCES users(id) ON DELETE CASCADE,
  temple_id UUID REFERENCES temples(id) ON DELETE CASCADE,
  slot_id UUID REFERENCES time_slots(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  number_of_devotees INTEGER NOT NULL DEFAULT 1,
  category TEXT NOT NULL DEFAULT 'general' CHECK (category IN ('general', 'vip', 'senior')),
  amount DECIMAL(10, 2) NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'confirmed' CHECK (status IN ('pending', 'confirmed', 'checked-in', 'completed', 'cancelled', 'no-show')),
  qr_code TEXT NOT NULL,
  check_in_time TIMESTAMP WITH TIME ZONE,
  check_out_time TIMESTAMP WITH TIME ZONE,
  feedback JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============= Crowd Data Table =============
CREATE TABLE crowd_data (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  temple_id UUID REFERENCES temples(id) ON DELETE CASCADE,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  count INTEGER NOT NULL,
  risk_score DECIMAL(3, 1) NOT NULL CHECK (risk_score >= 0 AND risk_score <= 10),
  zones JSONB DEFAULT '[]'::jsonb,
  prediction JSONB DEFAULT '{}'::jsonb,
  sensors JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for faster queries
CREATE INDEX idx_crowd_data_temple_timestamp ON crowd_data(temple_id, timestamp DESC);

-- ============= Alerts Table =============
CREATE TABLE alerts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type TEXT NOT NULL CHECK (type IN ('crowd-overflow', 'security-breach', 'medical-emergency', 'fire', 'technical-failure', 'weather-alert')),
  severity TEXT NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  location JSONB NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'acknowledged', 'resolved')),
  assigned_to UUID REFERENCES users(id),
  resolved_at TIMESTAMP WITH TIME ZONE,
  actions JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============= Emergency Incidents Table =============
CREATE TABLE emergency_incidents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  incident_number TEXT UNIQUE NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('medical', 'security', 'fire', 'accident', 'stampede')),
  severity TEXT NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  description TEXT NOT NULL,
  location JSONB NOT NULL,
  reported_by UUID REFERENCES users(id),
  reported_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT NOT NULL DEFAULT 'reported' CHECK (status IN ('reported', 'responding', 'on-site', 'resolved')),
  response_team JSONB DEFAULT '[]'::jsonb,
  response_time INTEGER, -- seconds
  resolved_at TIMESTAMP WITH TIME ZONE,
  casualties INTEGER DEFAULT 0,
  notes TEXT,
  media TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============= Parking Lots Table =============
CREATE TABLE parking_lots (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  temple_id UUID REFERENCES temples(id) ON DELETE CASCADE,
  location JSONB NOT NULL,
  total_slots INTEGER NOT NULL,
  available_slots INTEGER NOT NULL,
  sections JSONB DEFAULT '[]'::jsonb,
  pricing JSONB DEFAULT '{"twoWheeler": 20, "fourWheeler": 50, "bus": 200}'::jsonb,
  features TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============= Vehicle Entries Table =============
CREATE TABLE vehicle_entries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  vehicle_number TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('two-wheeler', 'four-wheeler', 'bus')),
  parking_lot_id UUID REFERENCES parking_lots(id) ON DELETE CASCADE,
  parking_slot_id TEXT,
  entry_time TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  exit_time TIMESTAMP WITH TIME ZONE,
  amount DECIMAL(10, 2),
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============= CCTV Cameras Table =============
CREATE TABLE cctv_cameras (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  temple_id UUID REFERENCES temples(id) ON DELETE CASCADE,
  zone TEXT NOT NULL,
  location JSONB NOT NULL,
  stream_url TEXT,
  thumbnail TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'maintenance')),
  rotation INTEGER DEFAULT 0,
  zoom INTEGER DEFAULT 1,
  features TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============= Security Personnel Table =============
CREATE TABLE security_personnel (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  badge_number TEXT UNIQUE NOT NULL,
  position JSONB NOT NULL,
  zone TEXT NOT NULL,
  status TEXT DEFAULT 'on-duty' CHECK (status IN ('on-duty', 'off-duty', 'on-break', 'emergency')),
  shift_timing JSONB NOT NULL,
  last_update TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============= Medical Facilities Table =============
CREATE TABLE medical_facilities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('first-aid', 'ambulance', 'hospital')),
  temple_id UUID REFERENCES temples(id) ON DELETE CASCADE,
  location JSONB NOT NULL,
  capacity INTEGER NOT NULL,
  current_occupancy INTEGER DEFAULT 0,
  staff JSONB DEFAULT '[]'::jsonb,
  equipment JSONB DEFAULT '[]'::jsonb,
  status TEXT DEFAULT 'available' CHECK (status IN ('available', 'busy', 'emergency')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============= Ambulances Table =============
CREATE TABLE ambulances (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  vehicle_number TEXT UNIQUE NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('basic', 'advanced', 'cardiac')),
  current_location JSONB NOT NULL,
  status TEXT DEFAULT 'available' CHECK (status IN ('available', 'dispatched', 'on-scene', 'transporting', 'maintenance')),
  crew JSONB DEFAULT '[]'::jsonb,
  equipment TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============= Chat Messages Table =============
CREATE TABLE chat_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sender_id UUID REFERENCES users(id) ON DELETE CASCADE,
  recipient_id UUID REFERENCES users(id),
  channel_id TEXT NOT NULL,
  content TEXT NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  read BOOLEAN DEFAULT FALSE,
  urgent BOOLEAN DEFAULT FALSE,
  attachments TEXT[] DEFAULT '{}'
);

CREATE INDEX idx_chat_messages_channel ON chat_messages(channel_id, timestamp DESC);

-- ============= Announcements Table =============
CREATE TABLE announcements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  target_audience TEXT[] NOT NULL,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE,
  active BOOLEAN DEFAULT TRUE
);

-- ============= Bhakti Profiles Table =============
CREATE TABLE bhakti_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  total_score INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  badges JSONB DEFAULT '[]'::jsonb,
  achievements JSONB DEFAULT '[]'::jsonb,
  visit_count INTEGER DEFAULT 0,
  streak JSONB DEFAULT '{"current": 0, "longest": 0}'::jsonb,
  donations DECIMAL(10, 2) DEFAULT 0,
  volunteer_hours INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============= Notifications Table =============
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('booking', 'alert', 'announcement', 'reminder', 'emergency')),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  action_url TEXT,
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_notifications_user ON notifications(user_id, created_at DESC);

-- ============= Functions for auto-updating timestamps =============
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply triggers to tables with updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_temples_updated_at BEFORE UPDATE ON temples
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_parking_lots_updated_at BEFORE UPDATE ON parking_lots
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============= Row Level Security (RLS) Policies =============
-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE temples ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE crowd_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE emergency_incidents ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Users can read their own data
CREATE POLICY "Users can view own data" ON users
  FOR SELECT USING (auth.uid()::text = id::text);

-- Temples are public
CREATE POLICY "Temples are publicly readable" ON temples
  FOR SELECT USING (true);

-- Users can view their own bookings
CREATE POLICY "Users can view own bookings" ON bookings
  FOR SELECT USING (auth.uid()::text = devotee_id::text);

-- Users can create their own bookings
CREATE POLICY "Users can create own bookings" ON bookings
  FOR INSERT WITH CHECK (auth.uid()::text = devotee_id::text);

-- Staff can view all crowd data
CREATE POLICY "Staff can view crowd data" ON crowd_data
  FOR SELECT USING (true);

-- Notifications are private to users
CREATE POLICY "Users can view own notifications" ON notifications
  FOR SELECT USING (auth.uid()::text = user_id::text);

-- ============= Sample Data =============
-- Insert sample temples
INSERT INTO temples (name, description, location, capacity, image, timings, amenities, status) VALUES
('Somnath Temple', 'First among the twelve Jyotirlinga shrines of Lord Shiva', 
 '{"lat": 20.8880, "lng": 70.4013, "address": "Veraval, Prabhas Patan", "city": "Veraval", "state": "Gujarat"}'::jsonb,
 '{"max": 5000, "current": 0, "vip": 200}'::jsonb,
 '/images/temples/somnath.jpg',
 '{"opening": "06:00", "closing": "21:00"}'::jsonb,
 ARRAY['Prasadam', 'Drinking Water', 'Cloakroom', 'Wheelchairs', 'First Aid'],
 'open'),

('Dwarkadhish Temple', 'Sacred temple dedicated to Lord Krishna', 
 '{"lat": 22.2442, "lng": 68.9685, "address": "Dwarka", "city": "Dwarka", "state": "Gujarat"}'::jsonb,
 '{"max": 4000, "current": 0, "vip": 150}'::jsonb,
 '/images/temples/dwarka.jpg',
 '{"opening": "05:30", "closing": "21:30"}'::jsonb,
 ARRAY['Prasadam', 'Drinking Water', 'Cloakroom', 'Guided Tours', 'First Aid'],
 'open'),

('Ambaji Temple', 'One of the 51 Shakti Peethas', 
 '{"lat": 24.3211, "lng": 72.8428, "address": "Ambaji", "city": "Banaskantha", "state": "Gujarat"}'::jsonb,
 '{"max": 6000, "current": 0, "vip": 250}'::jsonb,
 '/images/temples/ambaji.jpg',
 '{"opening": "06:00", "closing": "22:00"}'::jsonb,
 ARRAY['Prasadam', 'Drinking Water', 'Cloakroom', 'Ropeway', 'Shopping', 'First Aid'],
 'open'),

('Pavagadh Kalika Mata Temple', 'Ancient temple atop Pavagadh Hill', 
 '{"lat": 22.4851, "lng": 73.5316, "address": "Pavagadh", "city": "Panchmahal", "state": "Gujarat"}'::jsonb,
 '{"max": 3000, "current": 0, "vip": 100}'::jsonb,
 '/images/temples/pavagadh.jpg',
 '{"opening": "07:00", "closing": "20:00"}'::jsonb,
 ARRAY['Prasadam', 'Ropeway', 'Drinking Water', 'Food Court', 'First Aid'],
 'open');

-- Create sample admin user
INSERT INTO users (email, name, role) VALUES
('admin@divyaflow.com', 'Admin User', 'admin'),
('security@divyaflow.com', 'Security Officer', 'security'),
('medical@divyaflow.com', 'Medical Staff', 'medical'),
('traffic@divyaflow.com', 'Traffic Controller', 'traffic'),
('devotee@divyaflow.com', 'Sample Devotee', 'devotee');

COMMENT ON DATABASE postgres IS 'DivyaFlow - AI-Powered Temple Crowd Management System';
