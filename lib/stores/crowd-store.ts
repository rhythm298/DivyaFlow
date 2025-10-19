/**
 * Crowd Analytics Store
 * Manages real-time crowd data, risk scores, and predictions
 */

import { create } from 'zustand';
import { generateCrowdData, MOCK_TEMPLES } from '@/lib/mock-data';
import type { CrowdData } from '@/types';

interface CrowdStore {
  crowdData: Map<string, CrowdData>;
  historicalData: Map<string, CrowdData[]>;
  loading: boolean;
  error: string | null;

  // Actions
  fetchCrowdData: (templeId: string) => Promise<void>;
  getCrowdData: (templeId: string) => CrowdData | undefined;
  getHistoricalData: (templeId: string) => CrowdData[];
  getRiskLevel: (riskScore: number) => 'safe' | 'moderate' | 'high' | 'critical';
  startRealTimeUpdates: () => void;
  stopRealTimeUpdates: () => void;
}

let updateInterval: NodeJS.Timeout | null = null;

export const useCrowdStore = create<CrowdStore>((set, get) => ({
  crowdData: new Map(),
  historicalData: new Map(),
  loading: false,
  error: null,

  fetchCrowdData: async (templeId: string) => {
    set({ loading: true, error: null });

    try {
      await new Promise((resolve) => setTimeout(resolve, 300));

      const data = generateCrowdData(templeId);
      
      set((state) => {
        const newCrowdData = new Map(state.crowdData);
        newCrowdData.set(templeId, data);

        const newHistorical = new Map(state.historicalData);
        const existing = newHistorical.get(templeId) || [];
        newHistorical.set(templeId, [...existing, data].slice(-24)); // Keep last 24 entries

        return {
          crowdData: newCrowdData,
          historicalData: newHistorical,
          loading: false,
        };
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch crowd data',
        loading: false,
      });
    }
  },

  getCrowdData: (templeId: string) => {
    return get().crowdData.get(templeId);
  },

  getHistoricalData: (templeId: string) => {
    return get().historicalData.get(templeId) || [];
  },

  getRiskLevel: (riskScore: number) => {
    if (riskScore < 3) return 'safe';
    if (riskScore < 6) return 'moderate';
    if (riskScore < 8) return 'high';
    return 'critical';
  },

  startRealTimeUpdates: () => {
    if (updateInterval) return;

    // Update crowd data every 5 seconds for all temples
    updateInterval = setInterval(() => {
      MOCK_TEMPLES.forEach((temple) => {
        get().fetchCrowdData(temple.id);
      });
    }, 5000);
  },

  stopRealTimeUpdates: () => {
    if (updateInterval) {
      clearInterval(updateInterval);
      updateInterval = null;
    }
  },
}));

// Auto-start real-time updates
if (typeof window !== 'undefined') {
  // Initial fetch for all temples
  MOCK_TEMPLES.forEach((temple) => {
    useCrowdStore.getState().fetchCrowdData(temple.id);
  });
  
  useCrowdStore.getState().startRealTimeUpdates();
}
