'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Video, 
  Activity, 
  Users, 
  AlertCircle, 
  TrendingUp, 
  Car,
  Heart,
  Shield,
  Maximize2
} from 'lucide-react';

export default function ControlRoomLivePage() {
  const [selectedView, setSelectedView] = useState<'overview' | 'cctv' | 'crowd'>('overview');

  const liveStats = {
    totalVisitors: 2847,
    crowdLevel: 'High',
    activeCCTV: 8,
    totalCCTV: 9,
    activeIncidents: 2,
    activeEmergencies: 1,
    parkingOccupancy: 78,
    shuttlesActive: 4,
  };

  const criticalAlerts = [
    {
      id: '1',
      type: 'security',
      message: 'High crowd density in Main Darshan Hall',
      time: '2 mins ago',
      severity: 'high',
    },
    {
      id: '2',
      type: 'medical',
      message: 'Medical emergency - Chest pain patient',
      time: '5 mins ago',
      severity: 'critical',
    },
    {
      id: '3',
      type: 'traffic',
      message: 'Parking Lot B is now full',
      time: '10 mins ago',
      severity: 'medium',
    },
  ];

  const crowdZones = [
    { zone: 'Main Darshan Hall', count: 842, capacity: 1000, level: 'high' },
    { zone: 'Prayer Hall', count: 320, capacity: 500, level: 'medium' },
    { zone: 'North Gate', count: 156, capacity: 300, level: 'medium' },
    { zone: 'East Wing', count: 89, capacity: 200, level: 'low' },
    { zone: 'West Wing', count: 134, capacity: 200, level: 'high' },
    { zone: 'Parking Area', count: 267, capacity: 500, level: 'medium' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Live Monitoring</h1>
            <p className="text-muted-foreground mt-1">
              Real-time temple operations dashboard
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant={selectedView === 'overview' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedView('overview')}
            >
              Overview
            </Button>
            <Button
              variant={selectedView === 'cctv' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedView('cctv')}
            >
              CCTV Grid
            </Button>
            <Button
              variant={selectedView === 'crowd' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedView('crowd')}
            >
              Crowd Map
            </Button>
          </div>
        </div>

        {/* Live Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-card border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Current Visitors</p>
                <p className="text-2xl font-bold mt-1">{liveStats.totalVisitors}</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-600" />
                  <span className="text-xs text-green-600">+12% from avg</span>
                </div>
              </div>
              <Users className="h-8 w-8 text-primary opacity-50" />
            </div>
          </div>

          <div className="bg-card border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Crowd Level</p>
                <p className="text-2xl font-bold mt-1 text-orange-600">{liveStats.crowdLevel}</p>
                <Badge className="mt-1 bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300">
                  Alert Active
                </Badge>
              </div>
              <AlertCircle className="h-8 w-8 text-orange-600 opacity-50" />
            </div>
          </div>

          <div className="bg-card border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active CCTVs</p>
                <p className="text-2xl font-bold mt-1 text-green-600">
                  {liveStats.activeCCTV}/{liveStats.totalCCTV}
                </p>
                <p className="text-xs text-muted-foreground mt-1">1 offline</p>
              </div>
              <Video className="h-8 w-8 text-green-600 opacity-50" />
            </div>
          </div>

          <div className="bg-card border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Alerts</p>
                <p className="text-2xl font-bold mt-1 text-red-600">
                  {liveStats.activeIncidents + liveStats.activeEmergencies}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {liveStats.activeEmergencies} critical
                </p>
              </div>
              <Activity className="h-8 w-8 text-red-600 opacity-50" />
            </div>
          </div>
        </div>

        {/* Critical Alerts Banner */}
        {criticalAlerts.length > 0 && (
          <div className="bg-red-50 dark:bg-red-950 border-2 border-red-500 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="font-semibold text-red-900 dark:text-red-100 mb-2">
                  Critical Alerts Requiring Attention
                </h3>
                <div className="space-y-2">
                  {criticalAlerts.map((alert) => (
                    <div key={alert.id} className="flex items-center justify-between bg-white dark:bg-gray-900 rounded p-2">
                      <div className="flex items-center gap-3">
                        {alert.type === 'security' && <Shield className="h-4 w-4 text-red-600" />}
                        {alert.type === 'medical' && <Heart className="h-4 w-4 text-red-600" />}
                        {alert.type === 'traffic' && <Car className="h-4 w-4 text-orange-600" />}
                        <span className="text-sm font-medium">{alert.message}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{alert.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        {selectedView === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Crowd Analysis */}
            <div className="bg-card border rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-4">Crowd Distribution</h3>
              <div className="space-y-3">
                {crowdZones.map((zone, index) => {
                  const percentage = (zone.count / zone.capacity) * 100;
                  const levelColor =
                    zone.level === 'high'
                      ? 'bg-red-600'
                      : zone.level === 'medium'
                      ? 'bg-yellow-600'
                      : 'bg-green-600';

                  return (
                    <div key={index}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium">{zone.zone}</span>
                        <span className="text-muted-foreground">
                          {zone.count}/{zone.capacity}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${levelColor}`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Department Status */}
            <div className="bg-card border rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-4">Department Status</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Security</p>
                      <p className="text-sm text-muted-foreground">5 personnel on duty</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                    Active
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Heart className="h-5 w-5 text-red-600" />
                    <div>
                      <p className="font-medium">Medical</p>
                      <p className="text-sm text-muted-foreground">1 emergency active</p>
                    </div>
                  </div>
                  <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
                    Alert
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Car className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium">Traffic</p>
                      <p className="text-sm text-muted-foreground">{liveStats.parkingOccupancy}% parking occupied</p>
                    </div>
                  </div>
                  <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                    Busy
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Video className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium">Surveillance</p>
                      <p className="text-sm text-muted-foreground">{liveStats.activeCCTV}/{liveStats.totalCCTV} cameras online</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                    Operational
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedView === 'cctv' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((cam) => (
              <div key={cam} className="bg-card border rounded-lg overflow-hidden">
                <div className="relative aspect-video bg-gray-900 flex items-center justify-center">
                  <div className="absolute inset-0 opacity-10">
                    <div className="grid grid-cols-4 grid-rows-3 h-full w-full">
                      {[...Array(12)].map((_, i) => (
                        <div key={i} className="border border-white/20" />
                      ))}
                    </div>
                  </div>
                  <Video className="h-12 w-12 text-white z-10" />
                  {cam !== 4 && (
                    <div className="absolute top-2 left-2 flex items-center gap-1 bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold">
                      <span className="h-2 w-2 bg-white rounded-full animate-pulse" />
                      LIVE
                    </div>
                  )}
                  <Button size="sm" variant="secondary" className="absolute top-2 right-2">
                    <Maximize2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="p-3">
                  <p className="font-medium">Camera {cam}</p>
                  <p className="text-sm text-muted-foreground">
                    {cam === 4 ? 'Offline' : 'Live Feed'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedView === 'crowd' && (
          <div className="bg-card border rounded-lg p-6">
            <div className="aspect-video bg-muted/50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg font-semibold">Interactive Crowd Heat Map</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Real-time visualization of crowd density across temple zones
                </p>
                <Button className="mt-4">Load Heat Map</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
