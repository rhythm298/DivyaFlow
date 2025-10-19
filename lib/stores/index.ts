/**
 * Zustand Store Exports
 * Central export point for all stores
 */

export { useTempleStore } from './temple-store';
export { useCrowdStore } from './crowd-store';
export { useAlertStore } from './alert-store';
export { useBookingStore } from './booking-store';

// Cleanup function for all stores (call on unmount or page unload)
export function cleanupStores() {
  if (typeof window !== 'undefined') {
    const { useTempleStore } = require('./temple-store');
    const { useCrowdStore } = require('./crowd-store');
    const { useAlertStore } = require('./alert-store');
    const { useBookingStore } = require('./booking-store');

    useTempleStore.getState().stopRealTimeUpdates();
    useCrowdStore.getState().stopRealTimeUpdates();
    useAlertStore.getState().stopRealTimeUpdates();
    useBookingStore.getState().stopRealTimeUpdates();
  }
}

// Auto cleanup on page unload
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', cleanupStores);
}
