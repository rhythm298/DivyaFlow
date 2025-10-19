/**
 * Mock Data Generator
 * Generates realistic test data for DivyaFlow using Faker.js
 */

import { faker } from '@faker-js/faker';
import type {
  Temple,
  Booking,
  CrowdData,
  Alert,
  EmergencyIncident,
  User,
  CCTVCamera,
  SecurityPersonnel,
  ParkingLot,
  Ambulance,
  ChatMessage,
  Announcement,
  BhaktiProfile,
  UserRole,
} from '@/types';

// ============= Temple Data =============
export const MOCK_TEMPLES: Temple[] = [
  {
    id: '1',
    name: 'Somnath Temple',
    description:
      'First among the twelve Jyotirlinga shrines of Lord Shiva. Located in Prabhas Patan near Veraval in Gujarat, the temple is believed to have been built by the Moon God himself.',
    location: {
      lat: 20.888,
      lng: 70.4013,
      address: 'Veraval, Prabhas Patan',
      city: 'Veraval',
      state: 'Gujarat',
    },
    capacity: {
      max: 5000,
      current: Math.floor(Math.random() * 3000),
      vip: 200,
    },
    image: '/images/temples/somnath.jpg',
    images: [
      '/images/temples/somnath-1.jpg',
      '/images/temples/somnath-2.jpg',
      '/images/temples/somnath-3.jpg',
    ],
    timings: {
      opening: '06:00',
      closing: '21:00',
    },
    darshan: {
      duration: 30,
      slotsPerHour: 2,
      pricing: {
        general: 0,
        vip: 500,
        senior: 0,
      },
    },
    amenities: ['Prasadam', 'Drinking Water', 'Cloakroom', 'Wheelchairs', 'First Aid', 'Parking'],
    status: 'open',
  },
  {
    id: '2',
    name: 'Dwarkadhish Temple',
    description:
      'Sacred temple dedicated to Lord Krishna, also known as Jagat Mandir. One of the Char Dham pilgrimage sites and holds immense religious significance.',
    location: {
      lat: 22.2442,
      lng: 68.9685,
      address: 'Dwarka',
      city: 'Dwarka',
      state: 'Gujarat',
    },
    capacity: {
      max: 4000,
      current: Math.floor(Math.random() * 2500),
      vip: 150,
    },
    image: '/images/temples/dwarka.jpg',
    images: [
      '/images/temples/dwarka-1.jpg',
      '/images/temples/dwarka-2.jpg',
      '/images/temples/dwarka-3.jpg',
    ],
    timings: {
      opening: '05:30',
      closing: '21:30',
    },
    darshan: {
      duration: 30,
      slotsPerHour: 2,
      pricing: {
        general: 0,
        vip: 300,
        senior: 0,
      },
    },
    amenities: [
      'Prasadam',
      'Drinking Water',
      'Cloakroom',
      'Guided Tours',
      'First Aid',
      'Food Court',
    ],
    status: 'open',
  },
  {
    id: '3',
    name: 'Ambaji Temple',
    description:
      'One of the 51 Shakti Peethas, dedicated to Goddess Amba. Located in the Arasur hills, it is one of the most sacred pilgrimage sites in Gujarat.',
    location: {
      lat: 24.3211,
      lng: 72.8428,
      address: 'Ambaji',
      city: 'Banaskantha',
      state: 'Gujarat',
    },
    capacity: {
      max: 6000,
      current: Math.floor(Math.random() * 4000),
      vip: 250,
    },
    image: '/images/temples/ambaji.jpg',
    images: [
      '/images/temples/ambaji-1.jpg',
      '/images/temples/ambaji-2.jpg',
      '/images/temples/ambaji-3.jpg',
    ],
    timings: {
      opening: '06:00',
      closing: '22:00',
    },
    darshan: {
      duration: 25,
      slotsPerHour: 2,
      pricing: {
        general: 0,
        vip: 400,
        senior: 0,
      },
    },
    amenities: [
      'Prasadam',
      'Drinking Water',
      'Cloakroom',
      'Ropeway',
      'Shopping',
      'First Aid',
      'Hotels',
    ],
    status: 'open',
  },
  {
    id: '4',
    name: 'Pavagadh Kalika Mata Temple',
    description:
      'Ancient temple atop Pavagadh Hill, part of the Champaner-Pavagadh Archaeological Park (UNESCO World Heritage Site). Dedicated to Goddess Kali.',
    location: {
      lat: 22.4851,
      lng: 73.5316,
      address: 'Pavagadh',
      city: 'Panchmahal',
      state: 'Gujarat',
    },
    capacity: {
      max: 3000,
      current: Math.floor(Math.random() * 2000),
      vip: 100,
    },
    image: '/images/temples/pavagadh.jpg',
    images: [
      '/images/temples/pavagadh-1.jpg',
      '/images/temples/pavagadh-2.jpg',
      '/images/temples/pavagadh-3.jpg',
    ],
    timings: {
      opening: '07:00',
      closing: '20:00',
    },
    darshan: {
      duration: 35,
      slotsPerHour: 2,
      pricing: {
        general: 0,
        vip: 250,
        senior: 0,
      },
    },
    amenities: ['Prasadam', 'Ropeway', 'Drinking Water', 'Food Court', 'First Aid', 'Trekking'],
    status: 'open',
  },
];

// ============= Generate Mock Users =============
export function generateMockUsers(count: number = 50): User[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `user-${i + 1}`,
    email: faker.internet.email(),
    name: faker.person.fullName(),
    phone: faker.phone.number(),
    role: 'devotee' as UserRole,
    avatar: faker.image.avatar(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
    bhaktiScore: Math.floor(Math.random() * 1000),
    preferences: {
      notifications: {
        email: true,
        sms: faker.datatype.boolean(),
        push: faker.datatype.boolean(),
      },
      language: faker.helpers.arrayElement(['en', 'hi', 'gu']) as 'en' | 'hi' | 'gu',
      theme: faker.helpers.arrayElement(['light', 'dark', 'system']) as 'light' | 'dark' | 'system',
    },
  }));
}

// ============= Generate Mock Bookings =============
export function generateMockBookings(count: number = 100): Booking[] {
  const users = generateMockUsers(20);
  
  return Array.from({ length: count }, (_, i) => {
    const temple = faker.helpers.arrayElement(MOCK_TEMPLES);
    const user = faker.helpers.arrayElement(users);
    const date = faker.date.future();
    const hour = faker.number.int({ min: 6, max: 20 });
    
    return {
      id: `booking-${i + 1}`,
      bookingNumber: `BK-${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(i + 1).padStart(4, '0')}`,
      devoteeId: user.id,
      devotee: user,
      templeId: temple.id,
      temple,
      date,
      slot: {
        id: `slot-${i}`,
        startTime: `${String(hour).padStart(2, '0')}:00`,
        endTime: `${String(hour).padStart(2, '0')}:30`,
        available: 50,
        booked: 30,
        maxCapacity: 80,
      },
      numberOfDevotees: faker.number.int({ min: 1, max: 10 }),
      category: faker.helpers.arrayElement(['general', 'vip', 'senior']) as 'general' | 'vip' | 'senior',
      amount: faker.number.int({ min: 0, max: 500 }),
      status: faker.helpers.arrayElement([
        'confirmed',
        'completed',
        'pending',
        'cancelled',
      ]) as 'confirmed' | 'completed' | 'pending' | 'cancelled',
      qrCode: `QR-${i + 1}-${Date.now()}`,
      checkInTime: faker.date.recent(),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    };
  });
}

// ============= Generate Crowd Data =============
export function generateCrowdData(templeId: string): CrowdData {
  return {
    id: faker.string.uuid(),
    templeId,
    timestamp: new Date(),
    count: faker.number.int({ min: 100, max: 5000 }),
    zones: [
      {
        id: 'zone-1',
        name: 'Main Hall',
        currentOccupancy: faker.number.int({ min: 50, max: 500 }),
        maxCapacity: 500,
        densityLevel: faker.helpers.arrayElement(['low', 'medium', 'high', 'critical']) as
          | 'low'
          | 'medium'
          | 'high'
          | 'critical',
        heatmapData: Array.from({ length: 20 }, () => ({
          lat: 20.888 + (Math.random() - 0.5) * 0.01,
          lng: 70.4013 + (Math.random() - 0.5) * 0.01,
          intensity: Math.random(),
        })),
      },
      {
        id: 'zone-2',
        name: 'Entrance',
        currentOccupancy: faker.number.int({ min: 20, max: 200 }),
        maxCapacity: 200,
        densityLevel: faker.helpers.arrayElement(['low', 'medium', 'high']) as
          | 'low'
          | 'medium'
          | 'high',
        heatmapData: [],
      },
      {
        id: 'zone-3',
        name: 'Parking Area',
        currentOccupancy: faker.number.int({ min: 50, max: 300 }),
        maxCapacity: 300,
        densityLevel: faker.helpers.arrayElement(['low', 'medium']) as 'low' | 'medium',
        heatmapData: [],
      },
    ],
    riskScore: parseFloat((Math.random() * 10).toFixed(1)),
    prediction: {
      nextHour: faker.number.int({ min: 100, max: 6000 }),
      next3Hours: faker.number.int({ min: 100, max: 6000 }),
      peakTime: `${faker.number.int({ min: 8, max: 18 })}:00`,
      confidence: faker.number.int({ min: 70, max: 95 }),
    },
    sensors: [
      {
        id: 'sensor-1',
        type: 'camera',
        location: 'Main Entrance',
        value: faker.number.int({ min: 50, max: 200 }),
        unit: 'people',
        lastUpdate: new Date(),
        status: 'active',
      },
      {
        id: 'sensor-2',
        type: 'thermal',
        location: 'Main Hall',
        value: faker.number.int({ min: 25, max: 35 }),
        unit: '°C',
        lastUpdate: new Date(),
        status: 'active',
      },
    ],
  };
}

// ============= Generate Alerts =============
export function generateMockAlerts(count: number = 20): Alert[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `alert-${i + 1}`,
    type: faker.helpers.arrayElement([
      'crowd-overflow',
      'security-breach',
      'medical-emergency',
      'technical-failure',
    ]) as 'crowd-overflow' | 'security-breach' | 'medical-emergency' | 'technical-failure',
    severity: faker.helpers.arrayElement(['low', 'medium', 'high', 'critical']) as
      | 'low'
      | 'medium'
      | 'high'
      | 'critical',
    title: faker.helpers.arrayElement([
      'High Crowd Density Detected',
      'Security Breach Alert',
      'Medical Emergency Reported',
      'CCTV Camera Offline',
      'Parking Lot Full',
    ]),
    description: faker.lorem.sentence(),
    location: {
      templeId: faker.helpers.arrayElement(MOCK_TEMPLES).id,
      zone: faker.helpers.arrayElement(['Main Hall', 'Entrance', 'Parking', 'VIP Area']),
    },
    timestamp: faker.date.recent(),
    status: faker.helpers.arrayElement(['active', 'acknowledged', 'resolved']) as
      | 'active'
      | 'acknowledged'
      | 'resolved',
    actions: [],
  }));
}

// ============= Generate Emergency Incidents =============
export function generateMockEmergencies(count: number = 10): EmergencyIncident[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `emergency-${i + 1}`,
    incidentNumber: `EM-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}${String(i + 1).padStart(3, '0')}`,
    type: faker.helpers.arrayElement(['medical', 'security', 'fire', 'accident']) as
      | 'medical'
      | 'security'
      | 'fire'
      | 'accident',
    severity: faker.helpers.arrayElement(['medium', 'high', 'critical']) as 'medium' | 'high' | 'critical',
    description: faker.lorem.sentence(),
    location: {
      templeId: faker.helpers.arrayElement(MOCK_TEMPLES).id,
      zone: faker.helpers.arrayElement(['Main Hall', 'Entrance', 'Parking']),
      coordinates: {
        lat: 20.888 + (Math.random() - 0.5) * 0.01,
        lng: 70.4013 + (Math.random() - 0.5) * 0.01,
      },
    },
    reportedBy: `user-${faker.number.int({ min: 1, max: 10 })}`,
    reportedAt: faker.date.recent(),
    status: faker.helpers.arrayElement(['reported', 'responding', 'on-site', 'resolved']) as
      | 'reported'
      | 'responding'
      | 'on-site'
      | 'resolved',
    responseTeam: [],
    casualties: faker.number.int({ min: 0, max: 5 }),
  }));
}

// ============= Generate CCTV Cameras =============
export function generateMockCCTVs(templeId: string): CCTVCamera[] {
  return Array.from({ length: 9 }, (_, i) => ({
    id: `cctv-${templeId}-${i + 1}`,
    name: `Camera ${i + 1}`,
    location: {
      templeId,
      zone: faker.helpers.arrayElement(['Main Hall', 'Entrance', 'Parking', 'Perimeter']),
      coordinates: {
        lat: 20.888 + (Math.random() - 0.5) * 0.01,
        lng: 70.4013 + (Math.random() - 0.5) * 0.01,
      },
    },
    streamUrl: `https://example.com/stream/${i + 1}`,
    thumbnail: `/images/cctv/feed-${(i % 3) + 1}.jpg`,
    status: faker.helpers.arrayElement(['active', 'inactive']) as 'active' | 'inactive',
    rotation: faker.number.int({ min: 0, max: 360 }),
    zoom: faker.number.int({ min: 1, max: 10 }),
    features: ['night-vision', 'motion-detection'],
  }));
}

// Export mock data instances
export const MOCK_USERS = generateMockUsers(50);
export const MOCK_BOOKINGS = generateMockBookings(100);
export const MOCK_ALERTS = generateMockAlerts(20);
export const MOCK_EMERGENCIES = generateMockEmergencies(10);
