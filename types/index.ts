/**
 * DivyaFlow - Comprehensive Type Definitions
 * AI-Powered Temple Crowd Management System
 */

// ============= User & Authentication Types =============

export type UserRole = 
  | 'devotee' 
  | 'admin' 
  | 'security' 
  | 'medical' 
  | 'traffic' 
  | 'control-room';

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  role: UserRole;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
  bhaktiScore?: number; // For devotees
  preferences?: UserPreferences;
}

export interface UserPreferences {
  notifications: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
  language: 'en' | 'hi' | 'gu'; // English, Hindi, Gujarati
  theme: 'light' | 'dark' | 'system';
}

// ============= Temple Types =============

export interface Temple {
  id: string;
  name: string;
  description: string;
  location: {
    lat: number;
    lng: number;
    address: string;
    city: string;
    state: string;
  };
  capacity: {
    max: number;
    current: number;
    vip: number;
  };
  image: string;
  images: string[]; // Gallery
  timings: {
    opening: string; // "05:00"
    closing: string; // "22:00"
  };
  darshan: {
    duration: number; // minutes
    slotsPerHour: number;
    pricing: {
      general: number;
      vip: number;
      senior: number;
    };
  };
  amenities: string[];
  status: 'open' | 'closed' | 'maintenance';
  festivalSchedule?: FestivalEvent[];
}

export interface FestivalEvent {
  id: string;
  name: string;
  date: Date;
  description: string;
  expectedCrowd: number;
  specialArrangements: string[];
}

// ============= Booking Types =============

export type BookingStatus = 
  | 'pending' 
  | 'confirmed' 
  | 'checked-in' 
  | 'completed' 
  | 'cancelled' 
  | 'no-show';

export interface Booking {
  id: string;
  bookingNumber: string; // "BK-20241008-001"
  devoteeId: string;
  devotee: User;
  templeId: string;
  temple: Temple;
  date: Date;
  slot: TimeSlot;
  numberOfDevotees: number;
  category: 'general' | 'vip' | 'senior';
  amount: number;
  status: BookingStatus;
  qrCode: string;
  checkInTime?: Date;
  checkOutTime?: Date;
  feedback?: BookingFeedback;
  createdAt: Date;
  updatedAt: Date;
}

export interface TimeSlot {
  id: string;
  startTime: string; // "10:00"
  endTime: string; // "10:30"
  available: number;
  booked: number;
  maxCapacity: number;
}

export interface BookingFeedback {
  rating: number; // 1-5
  comment?: string;
  experience: 'excellent' | 'good' | 'average' | 'poor';
  submittedAt: Date;
}

// ============= Crowd Analytics Types =============

export interface CrowdData {
  id: string;
  templeId: string;
  timestamp: Date;
  count: number;
  zones: CrowdZone[];
  riskScore: number; // 0-10
  prediction: CrowdPrediction;
  sensors: IoTSensor[];
}

export interface CrowdZone {
  id: string;
  name: string; // "Main Hall", "Entrance", "Parking"
  currentOccupancy: number;
  maxCapacity: number;
  densityLevel: 'low' | 'medium' | 'high' | 'critical';
  heatmapData: HeatmapPoint[];
}

export interface HeatmapPoint {
  lat: number;
  lng: number;
  intensity: number; // 0-1
}

export interface CrowdPrediction {
  nextHour: number;
  next3Hours: number;
  peakTime: string;
  confidence: number; // 0-100
}

export interface IoTSensor {
  id: string;
  type: 'camera' | 'thermal' | 'counter' | 'environmental';
  location: string;
  value: number;
  unit: string;
  lastUpdate: Date;
  status: 'active' | 'inactive' | 'error';
}

// ============= Analytics & Reporting Types =============

export interface AnalyticsSummary {
  templeId: string;
  period: 'today' | 'week' | 'month' | 'year';
  totalVisitors: number;
  totalBookings: number;
  revenue: number;
  avgRating: number;
  peakHours: HourlyData[];
  crowdTrends: TrendData[];
  comparisonData: ComparisonData;
}

export interface HourlyData {
  hour: number;
  count: number;
  avgWaitTime: number;
}

export interface TrendData {
  date: Date;
  visitors: number;
  bookings: number;
  revenue: number;
}

export interface ComparisonData {
  previousPeriod: number;
  percentageChange: number;
  trend: 'up' | 'down' | 'stable';
}

// ============= Alert & Emergency Types =============

export type AlertSeverity = 'low' | 'medium' | 'high' | 'critical';
export type AlertType = 
  | 'crowd-overflow' 
  | 'security-breach' 
  | 'medical-emergency' 
  | 'fire' 
  | 'technical-failure'
  | 'weather-alert';

export interface Alert {
  id: string;
  type: AlertType;
  severity: AlertSeverity;
  title: string;
  description: string;
  location: {
    templeId?: string;
    zone?: string;
    coordinates?: { lat: number; lng: number };
  };
  timestamp: Date;
  status: 'active' | 'acknowledged' | 'resolved';
  assignedTo?: string;
  resolvedAt?: Date;
  actions: AlertAction[];
}

export interface AlertAction {
  id: string;
  action: string;
  takenBy: string;
  timestamp: Date;
  notes?: string;
}

export interface EmergencyIncident {
  id: string;
  incidentNumber: string; // "EM-20241008-001"
  type: 'medical' | 'security' | 'fire' | 'accident' | 'stampede';
  severity: AlertSeverity;
  description: string;
  location: {
    templeId: string;
    zone: string;
    coordinates: { lat: number; lng: number };
  };
  reportedBy: string;
  reportedAt: Date;
  status: 'reported' | 'responding' | 'on-site' | 'resolved';
  responseTeam: ResponseTeam[];
  responseTime?: number; // seconds
  resolvedAt?: Date;
  casualties?: number;
  notes?: string;
  media?: string[]; // Photos/videos
}

export interface ResponseTeam {
  id: string;
  name: string;
  role: 'medical' | 'security' | 'fire' | 'evacuation';
  members: number;
  vehicleNumber?: string;
  dispatchTime: Date;
  arrivalTime?: Date;
  status: 'dispatched' | 'en-route' | 'on-site' | 'returning';
}

// ============= Security Types =============

export interface SecurityPersonnel {
  id: string;
  name: string;
  badgeNumber: string;
  phone: string;
  position: {
    lat: number;
    lng: number;
  };
  zone: string;
  status: 'on-duty' | 'off-duty' | 'on-break' | 'emergency';
  shiftTiming: {
    start: string;
    end: string;
  };
  lastUpdate: Date;
}

export interface CCTVCamera {
  id: string;
  name: string;
  location: {
    templeId: string;
    zone: string;
    coordinates: { lat: number; lng: number };
  };
  streamUrl: string;
  thumbnail: string;
  status: 'active' | 'inactive' | 'maintenance';
  rotation: number; // 0-360
  zoom: number; // 1-10
  features: ('night-vision' | 'motion-detection' | 'face-recognition')[];
}

export interface SecurityIncident {
  id: string;
  type: 'theft' | 'violence' | 'suspicious-activity' | 'lost-person' | 'vandalism';
  description: string;
  location: string;
  reportedBy: string;
  reportedAt: Date;
  status: 'reported' | 'investigating' | 'resolved';
  evidence: string[]; // CCTV footage, photos
  involvedPersons?: string[];
}

// ============= Medical Types =============

export interface MedicalFacility {
  id: string;
  name: string;
  type: 'first-aid' | 'ambulance' | 'hospital';
  location: {
    templeId: string;
    coordinates: { lat: number; lng: number };
  };
  capacity: number;
  currentOccupancy: number;
  staff: MedicalStaff[];
  equipment: MedicalEquipment[];
  status: 'available' | 'busy' | 'emergency';
}

export interface MedicalStaff {
  id: string;
  name: string;
  qualification: string;
  specialization?: string;
  phone: string;
  status: 'on-duty' | 'off-duty' | 'on-call';
}

export interface MedicalEquipment {
  id: string;
  name: string;
  quantity: number;
  minStock: number;
  status: 'available' | 'low-stock' | 'out-of-stock';
  lastRestocked: Date;
}

export interface Ambulance {
  id: string;
  vehicleNumber: string;
  type: 'basic' | 'advanced' | 'cardiac';
  currentLocation: {
    lat: number;
    lng: number;
  };
  status: 'available' | 'dispatched' | 'on-scene' | 'transporting' | 'maintenance';
  crew: MedicalStaff[];
  equipment: string[];
}

// ============= Traffic & Parking Types =============

export interface ParkingLot {
  id: string;
  name: string;
  templeId: string;
  location: {
    lat: number;
    lng: number;
  };
  totalSlots: number;
  availableSlots: number;
  sections: ParkingSection[];
  pricing: {
    twoWheeler: number;
    fourWheeler: number;
    bus: number;
  };
  features: string[];
}

export interface ParkingSection {
  id: string;
  name: string; // "A1", "B2"
  type: 'two-wheeler' | 'four-wheeler' | 'bus' | 'vip';
  totalSlots: number;
  occupiedSlots: number;
  slots: ParkingSlot[];
}

export interface ParkingSlot {
  id: string;
  number: string;
  status: 'vacant' | 'occupied' | 'reserved' | 'maintenance';
  vehicleNumber?: string;
  entryTime?: Date;
  bookingId?: string;
}

export interface VehicleEntry {
  id: string;
  vehicleNumber: string;
  type: 'two-wheeler' | 'four-wheeler' | 'bus';
  entryTime: Date;
  exitTime?: Date;
  parkingSlotId?: string;
  amount?: number;
  paymentStatus: 'pending' | 'paid';
}

export interface ShuttleBus {
  id: string;
  busNumber: string;
  route: string;
  capacity: number;
  currentOccupancy: number;
  currentLocation: {
    lat: number;
    lng: number;
  };
  nextStop: string;
  eta: number; // minutes
  status: 'running' | 'stopped' | 'maintenance' | 'off-duty';
  schedule: BusSchedule[];
}

export interface BusSchedule {
  id: string;
  departureTime: string;
  arrivalTime: string;
  stops: string[];
  frequency: number; // minutes
}

// ============= Communication Types =============

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  recipientId?: string; // If DM, otherwise group message
  channelId: string; // 'security', 'medical', 'all'
  content: string;
  timestamp: Date;
  read: boolean;
  urgent: boolean;
  attachments?: string[];
}

export interface Announcement {
  id: string;
  title: string;
  message: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  targetAudience: UserRole[];
  createdBy: string;
  createdAt: Date;
  expiresAt?: Date;
  active: boolean;
}

// ============= Gamification Types (Bhakti Score) =============

export interface BhaktiProfile {
  userId: string;
  totalScore: number;
  level: number;
  badges: Badge[];
  achievements: Achievement[];
  visitCount: number;
  streak: {
    current: number;
    longest: number;
  };
  donations: number;
  volunteerHours: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: Date;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  points: number;
  progress: number;
  target: number;
  unlocked: boolean;
  unlockedAt?: Date;
}

// ============= Configuration Types =============

export interface SystemConfig {
  id: string;
  templeId: string;
  crowdThresholds: {
    low: number;
    medium: number;
    high: number;
    critical: number;
  };
  alertSettings: {
    autoAlert: boolean;
    notificationChannels: ('email' | 'sms' | 'push' | 'dashboard')[];
    escalationTime: number; // minutes
  };
  aiSettings: {
    predictionEnabled: boolean;
    updateFrequency: number; // seconds
    confidenceThreshold: number; // 0-100
  };
  operationalHours: {
    start: string;
    end: string;
  };
}

// ============= API Response Types =============

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
  meta?: {
    timestamp: Date;
    version: string;
  };
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// ============= Form Types =============

export interface BookingFormData {
  templeId: string;
  date: Date;
  slotId: string;
  numberOfDevotees: number;
  category: 'general' | 'vip' | 'senior';
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  specialRequirements?: string;
  // Session user data (populated from login)
  userId?: string;
  userName?: string;
  userEmail?: string;
  // Full objects for complete data
  temple?: Temple;
  slot?: TimeSlot;
}

export interface IncidentReportForm {
  type: AlertType;
  severity: AlertSeverity;
  location: string;
  description: string;
  urgentAction: boolean;
  media?: File[];
}

// ============= Dashboard Widget Types =============

export interface DashboardWidget {
  id: string;
  type: 'stat' | 'chart' | 'map' | 'feed' | 'table' | 'custom';
  title: string;
  position: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  data: unknown;
  refreshInterval?: number; // seconds
  visible: boolean;
}

export interface StatWidget extends DashboardWidget {
  type: 'stat';
  data: {
    value: number;
    label: string;
    change?: number;
    trend?: 'up' | 'down' | 'stable';
    icon?: string;
    color?: string;
  };
}

// ============= Notification Types =============

export interface Notification {
  id: string;
  userId: string;
  type: 'booking' | 'alert' | 'announcement' | 'reminder' | 'emergency';
  title: string;
  message: string;
  read: boolean;
  actionUrl?: string;
  createdAt: Date;
  expiresAt?: Date;
  priority: 'low' | 'medium' | 'high' | 'urgent';
}
