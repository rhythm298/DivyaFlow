/**
 * Temple Store
 * Manages temple data and current occupancy with real-time updates
 */

import { create } from 'zustand';
import { MOCK_TEMPLES } from '@/lib/mock-data';
import type { Temple } from '@/types';

interface TempleStore {
  temples: Temple[];
  selectedTemple: Temple | null;
  loading: boolean;
  error: string | null;
  
  // Actions
  fetchTemples: () => Promise<void>;
  getTempleById: (id: string) => Temple | undefined;
  selectTemple: (temple: Temple | null) => void;
  updateOccupancy: (templeId: string, occupancy: number) => void;
  startRealTimeUpdates: () => void;
  stopRealTimeUpdates: () => void;
}

let updateInterval: NodeJS.Timeout | null = null;

export const useTempleStore = create<TempleStore>((set, get) => ({
  temples: [],
  selectedTemple: null,
  loading: false,
  error: null,

  fetchTemples: async () => {
    set({ loading: true, error: null });
    
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      // In production, fetch from Supabase
      // const { data, error } = await supabase.from('temples').select('*');
      
      set({ temples: MOCK_TEMPLES, loading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch temples',
        loading: false,
      });
    }
  },

  getTempleById: (id: string) => {
    return get().temples.find((temple) => temple.id === id);
  },

  selectTemple: (temple: Temple | null) => {
    set({ selectedTemple: temple });
  },

  updateOccupancy: (templeId: string, occupancy: number) => {
    set((state) => ({
      temples: state.temples.map((temple) =>
        temple.id === templeId
          ? { ...temple, capacity: { ...temple.capacity, current: occupancy } }
          : temple
      ),
    }));
  },

  startRealTimeUpdates: () => {
    // Simulate real-time occupancy updates every 3 seconds
    if (updateInterval) return;

    updateInterval = setInterval(() => {
      const temples = get().temples;
      
      temples.forEach((temple) => {
        // Random walk for realistic crowd changes
        const currentOccupancy = temple.capacity.current;
        const maxCapacity = temple.capacity.max;
        const change = Math.floor(Math.random() * 100) - 40; // -40 to +60
        const newOccupancy = Math.max(
          0,
          Math.min(maxCapacity, currentOccupancy + change)
        );
        
        get().updateOccupancy(temple.id, newOccupancy);
      });
    }, 3000);
  },

  stopRealTimeUpdates: () => {
    if (updateInterval) {
      clearInterval(updateInterval);
      updateInterval = null;
    }
  },
}));

// Initialize temples on first import
if (typeof window !== 'undefined') {
  useTempleStore.getState().fetchTemples();
  useTempleStore.getState().startRealTimeUpdates();
}
