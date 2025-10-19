/**
 * Alert Store
 * Manages alerts and emergency incidents with real-time updates
 */

import { create } from 'zustand';
import { generateMockAlerts, generateMockEmergencies } from '@/lib/mock-data';
import type { Alert, EmergencyIncident, AlertSeverity } from '@/types';

interface AlertStore {
  alerts: Alert[];
  emergencies: EmergencyIncident[];
  unreadCount: number;
  loading: boolean;
  error: string | null;

  // Actions
  fetchAlerts: () => Promise<void>;
  fetchEmergencies: () => Promise<void>;
  addAlert: (alert: Alert) => void;
  updateAlertStatus: (id: string, status: Alert['status']) => void;
  dismissAlert: (id: string) => void;
  getActiveAlerts: () => Alert[];
  getCriticalAlerts: () => Alert[];
  markAsRead: (id: string) => void;
  startRealTimeUpdates: () => void;
  stopRealTimeUpdates: () => void;
}

let updateInterval: NodeJS.Timeout | null = null;

export const useAlertStore = create<AlertStore>((set, get) => ({
  alerts: [],
  emergencies: [],
  unreadCount: 0,
  loading: false,
  error: null,

  fetchAlerts: async () => {
    set({ loading: true, error: null });

    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      
      const alerts = generateMockAlerts(15);
      const unreadCount = alerts.filter((a) => a.status === 'active').length;

      set({ alerts, unreadCount, loading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch alerts',
        loading: false,
      });
    }
  },

  fetchEmergencies: async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      
      const emergencies = generateMockEmergencies(8);
      set({ emergencies });
    } catch (error) {
      console.error('Failed to fetch emergencies:', error);
    }
  },

  addAlert: (alert: Alert) => {
    set((state) => ({
      alerts: [alert, ...state.alerts],
      unreadCount: state.unreadCount + 1,
    }));

    // Play sound for critical alerts (optional)
    if (alert.severity === 'critical' && typeof window !== 'undefined') {
      // You can add audio notification here
      console.log('🚨 CRITICAL ALERT:', alert.title);
    }
  },

  updateAlertStatus: (id: string, status: Alert['status']) => {
    set((state) => ({
      alerts: state.alerts.map((alert) =>
        alert.id === id ? { ...alert, status } : alert
      ),
      unreadCount:
        status === 'acknowledged' || status === 'resolved'
          ? Math.max(0, state.unreadCount - 1)
          : state.unreadCount,
    }));
  },

  dismissAlert: (id: string) => {
    set((state) => ({
      alerts: state.alerts.filter((alert) => alert.id !== id),
    }));
  },

  getActiveAlerts: () => {
    return get().alerts.filter((alert) => alert.status === 'active');
  },

  getCriticalAlerts: () => {
    return get().alerts.filter(
      (alert) => alert.severity === 'critical' && alert.status === 'active'
    );
  },

  markAsRead: (id: string) => {
    get().updateAlertStatus(id, 'acknowledged');
  },

  startRealTimeUpdates: () => {
    if (updateInterval) return;

    // Simulate new alerts randomly
    updateInterval = setInterval(() => {
      const shouldGenerateAlert = Math.random() > 0.7; // 30% chance

      if (shouldGenerateAlert) {
        const types: Alert['type'][] = [
          'crowd-overflow',
          'security-breach',
          'medical-emergency',
          'technical-failure',
        ];
        const severities: AlertSeverity[] = ['low', 'medium', 'high', 'critical'];

        const newAlert: Alert = {
          id: `alert-${Date.now()}`,
          type: types[Math.floor(Math.random() * types.length)],
          severity: severities[Math.floor(Math.random() * severities.length)],
          title: 'New Alert Detected',
          description: 'Automated alert from IoT sensors',
          location: {
            templeId: ['1', '2', '3', '4'][Math.floor(Math.random() * 4)],
            zone: ['Main Hall', 'Entrance', 'Parking'][Math.floor(Math.random() * 3)],
          },
          timestamp: new Date(),
          status: 'active',
          actions: [],
        };

        get().addAlert(newAlert);
      }
    }, 10000); // Check every 10 seconds
  },

  stopRealTimeUpdates: () => {
    if (updateInterval) {
      clearInterval(updateInterval);
      updateInterval = null;
    }
  },
}));

// Initialize alerts
if (typeof window !== 'undefined') {
  useAlertStore.getState().fetchAlerts();
  useAlertStore.getState().fetchEmergencies();
  useAlertStore.getState().startRealTimeUpdates();
}
