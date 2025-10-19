/**
 * Booking Store
 * Manages devotee bookings with real-time updates
 */

import { create } from 'zustand';
import { generateMockBookings } from '@/lib/mock-data';
import type { Booking, BookingFormData, TimeSlot } from '@/types';

interface BookingStore {
  bookings: Booking[];
  userBookings: Booking[];
  availableSlots: TimeSlot[];
  loading: boolean;
  error: string | null;

  // Actions
  fetchBookings: () => Promise<void>;
  fetchUserBookings: (userId: string) => Promise<void>;
  fetchAvailableSlots: (templeId: string, date: Date) => Promise<void>;
  createBooking: (data: BookingFormData) => Promise<Booking>;
  cancelBooking: (id: string) => Promise<void>;
  checkInBooking: (id: string) => Promise<void>;
  getRecentBookings: (limit?: number) => Booking[];
  getTodayBookings: (templeId?: string) => Booking[];
  startRealTimeUpdates: () => void;
  stopRealTimeUpdates: () => void;
}

let updateInterval: NodeJS.Timeout | null = null;

// Load initial bookings from localStorage
const loadBookingsFromStorage = () => {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem('divyaflow-bookings');
    if (stored) {
      const parsed = JSON.parse(stored);
      // Convert date strings back to Date objects
      return parsed.map((b: any) => ({
        ...b,
        date: new Date(b.date),
        createdAt: new Date(b.createdAt),
        updatedAt: new Date(b.updatedAt),
        checkInTime: b.checkInTime ? new Date(b.checkInTime) : undefined,
        checkOutTime: b.checkOutTime ? new Date(b.checkOutTime) : undefined,
      }));
    }
  } catch (error) {
    console.error('Error loading bookings from storage:', error);
  }
  return [];
};

// Save bookings to localStorage
const saveBookingsToStorage = (bookings: Booking[]) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('divyaflow-bookings', JSON.stringify(bookings));
  } catch (error) {
    console.error('Error saving bookings to storage:', error);
  }
};

export const useBookingStore = create<BookingStore>((set, get) => ({
  bookings: loadBookingsFromStorage(),
  userBookings: [],
  availableSlots: [],
  loading: false,
  error: null,

  fetchBookings: async () => {
    set({ loading: true, error: null });

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const bookings = generateMockBookings(100);
      set({ bookings, loading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch bookings',
        loading: false,
      });
    }
  },

  fetchUserBookings: async (userId: string) => {
    set({ loading: true, error: null });

    try {
      await new Promise((resolve) => setTimeout(resolve, 400));

      // Get all bookings from store (including those from localStorage)
      const allBookings = get().bookings;
      
      // Filter by user ID
      const userBookings = allBookings.filter((b) => b.devoteeId === userId);

      set({ userBookings, loading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch user bookings',
        loading: false,
      });
    }
  },

  fetchAvailableSlots: async (templeId: string, date: Date) => {
    set({ loading: true, error: null });

    try {
      await new Promise((resolve) => setTimeout(resolve, 300));

      // Generate time slots for the temple
      const slots: TimeSlot[] = [];
      for (let hour = 6; hour <= 20; hour++) {
        for (let slot = 0; slot < 2; slot++) {
          const startMinute = slot * 30;
          const endMinute = startMinute + 30;

          slots.push({
            id: `slot-${templeId}-${hour}-${slot}`,
            startTime: `${String(hour).padStart(2, '0')}:${String(startMinute).padStart(2, '0')}`,
            endTime: `${String(hour).padStart(2, '0')}:${String(endMinute).padStart(2, '0')}`,
            maxCapacity: 100,
            booked: Math.floor(Math.random() * 80),
            available: 100 - Math.floor(Math.random() * 80),
          });
        }
      }

      set({ availableSlots: slots, loading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch available slots',
        loading: false,
      });
    }
  },

  createBooking: async (data: BookingFormData & { userId?: string; userName?: string; userEmail?: string; temple?: any; slot?: TimeSlot }) => {
    set({ loading: true, error: null });

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      const userId = data.userId || 'guest-user';
      const userName = data.userName || data.contactName;
      const userEmail = data.userEmail || data.contactEmail;

      // Create new booking
      const newBooking: Booking = {
        id: `booking-${Date.now()}`,
        bookingNumber: `BK-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}${String(Math.floor(Math.random() * 9999)).padStart(4, '0')}`,
        devoteeId: userId,
        devotee: {
          id: userId,
          email: userEmail,
          name: userName,
          phone: data.contactPhone,
          role: 'devotee',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        templeId: data.templeId,
        temple: data.temple || {} as any,
        date: data.date,
        slot: data.slot || {
          id: data.slotId,
          startTime: '10:00',
          endTime: '10:30',
          available: 50,
          booked: 30,
          maxCapacity: 80,
        },
        numberOfDevotees: data.numberOfDevotees,
        category: data.category,
        amount: data.category === 'vip' ? 500 : 0,
        status: 'confirmed',
        qrCode: `QR-${Date.now()}-${Math.random().toString(36).substring(7)}`,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      set((state) => {
        const newBookings = [newBooking, ...state.bookings];
        const newUserBookings = [newBooking, ...state.userBookings];
        
        // Save to localStorage
        saveBookingsToStorage(newBookings);
        
        return {
          bookings: newBookings,
          userBookings: newUserBookings,
          loading: false,
        };
      });

      return newBooking;
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to create booking',
        loading: false,
      });
      throw error;
    }
  },

  cancelBooking: async (id: string) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      set((state) => {
        const updatedBookings = state.bookings.map((b) =>
          b.id === id ? { ...b, status: 'cancelled' as const } : b
        );
        const updatedUserBookings = state.userBookings.map((b) =>
          b.id === id ? { ...b, status: 'cancelled' as const } : b
        );
        
        // Save to localStorage
        saveBookingsToStorage(updatedBookings);
        
        return {
          bookings: updatedBookings,
          userBookings: updatedUserBookings,
        };
      });
    } catch (error) {
      console.error('Failed to cancel booking:', error);
      throw error;
    }
  },

  checkInBooking: async (id: string) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 400));

      set((state) => ({
        bookings: state.bookings.map((b) =>
          b.id === id
            ? { ...b, status: 'checked-in' as const, checkInTime: new Date() }
            : b
        ),
      }));
    } catch (error) {
      console.error('Failed to check-in booking:', error);
      throw error;
    }
  },

  getRecentBookings: (limit = 10) => {
    return get()
      .bookings.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit);
  },

  getTodayBookings: (templeId?: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return get().bookings.filter((booking) => {
      const bookingDate = new Date(booking.date);
      bookingDate.setHours(0, 0, 0, 0);

      const isToday = bookingDate.getTime() === today.getTime();
      const matchesTemple = templeId ? booking.templeId === templeId : true;

      return isToday && matchesTemple;
    });
  },

  startRealTimeUpdates: () => {
    if (updateInterval) return;

    // Simulate new bookings every 15 seconds
    updateInterval = setInterval(() => {
      const shouldGenerateBooking = Math.random() > 0.5; // 50% chance

      if (shouldGenerateBooking) {
        const newBookings = generateMockBookings(1);
        set((state) => ({
          bookings: [...newBookings, ...state.bookings].slice(0, 200), // Keep last 200
        }));
      }
    }, 15000);
  },

  stopRealTimeUpdates: () => {
    if (updateInterval) {
      clearInterval(updateInterval);
      updateInterval = null;
    }
  },
}));

// Initialize bookings - only start real-time updates
if (typeof window !== 'undefined') {
  // Don't auto-fetch mock data, rely on localStorage
  useBookingStore.getState().startRealTimeUpdates();
}
