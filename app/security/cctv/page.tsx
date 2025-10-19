'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Video, Activity, AlertCircle, CheckCircle, Settings, Maximize2 } from 'lucide-react';

interface Camera {
  id: string;
  name: string;
  location: string;
  status: 'online' | 'offline' | 'maintenance';
  feed: string;
  lastActive: string;
  resolution: string;
}

const mockCameras: Camera[] = [
  {
    id: 'CAM001',
    name: 'Main Entrance',
    location: 'North Gate',
    status: 'online',
    feed: 'active',
    lastActive: 'Just now',
    resolution: '1080p',
  },
  {
    id: 'CAM002',
    name: 'Darshan Hall',
    location: 'Central Area',
    status: 'online',
    feed: 'active',
    lastActive: 'Just now',
    resolution: '4K',
  },
  {
    id: 'CAM003',
    name: 'Parking Lot A',
    location: 'West Wing',
    status: 'online',
    feed: 'active',
    lastActive: 'Just now',
    resolution: '1080p',
  },
  {
    id: 'CAM004',
    name: 'East Gate',
    location: 'East Wing',
    status: 'maintenance',
    feed: 'inactive',
    lastActive: '2 hours ago',
    resolution: '1080p',
  },
  {
    id: 'CAM005',
    name: 'South Entrance',
    location: 'South Gate',
    status: 'online',
    feed: 'active',
    lastActive: 'Just now',
    resolution: '1080p',
  },
  {
    id: 'CAM006',
    name: 'Donation Counter',
    location: 'Main Hall',
    status: 'online',
    feed: 'active',
    lastActive: 'Just now',
    resolution: '4K',
  },
  {
    id: 'CAM007',
    name: 'Parking Lot B',
    location: 'East Wing',
    status: 'offline',
    feed: 'inactive',
    lastActive: '30 mins ago',
    resolution: '1080p',
  },
  {
    id: 'CAM008',
    name: 'Back Gate',
    location: 'Service Area',
    status: 'online',
    feed: 'active',
    lastActive: 'Just now',
    resolution: '720p',
  },
  {
    id: 'CAM009',
    name: 'Prayer Hall',
    location: 'West Wing',
    status: 'online',
    feed: 'active',
    lastActive: 'Just now',
    resolution: '4K',
  },
];

export default function SecurityCCTVPage() {
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredCameras = mockCameras.filter(camera => {
    return filterStatus === 'all' || camera.status === filterStatus;
  });

  const getStatusConfig = (status: Camera['status']) => {
    const configs = {
      online: {
        label: 'Online',
        className: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
        icon: CheckCircle,
        borderColor: 'border-green-500',
      },
      offline: {
        label: 'Offline',
        className: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
        icon: AlertCircle,
        borderColor: 'border-red-500',
      },
      maintenance: {
        label: 'Maintenance',
        className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
        icon: Settings,
        borderColor: 'border-yellow-500',
      },
    };
    return configs[status];
  };

  const stats = {
    total: mockCameras.length,
    online: mockCameras.filter(c => c.status === 'online').length,
    offline: mockCameras.filter(c => c.status === 'offline').length,
    maintenance: mockCameras.filter(c => c.status === 'maintenance').length,
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">CCTV Monitoring</h1>
            <p className="text-muted-foreground mt-1">
              Live camera feeds and surveillance
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Activity className="mr-2 h-4 w-4" />
              View All
            </Button>
            <Button>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-card border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Cameras</p>
                <p className="text-2xl font-bold mt-1">{stats.total}</p>
              </div>
              <Video className="h-8 w-8 text-primary opacity-50" />
            </div>
          </div>
          <div className="bg-card border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Online</p>
                <p className="text-2xl font-bold mt-1 text-green-600">{stats.online}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600 opacity-50" />
            </div>
          </div>
          <div className="bg-card border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Offline</p>
                <p className="text-2xl font-bold mt-1 text-red-600">{stats.offline}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-red-600 opacity-50" />
            </div>
          </div>
          <div className="bg-card border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Maintenance</p>
                <p className="text-2xl font-bold mt-1 text-yellow-600">{stats.maintenance}</p>
              </div>
              <Settings className="h-8 w-8 text-yellow-600 opacity-50" />
            </div>
          </div>
        </div>

        {/* Filter */}
        <div className="bg-card border rounded-lg p-4">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border rounded-md bg-background text-sm"
          >
            <option value="all">All Cameras</option>
            <option value="online">Online Only</option>
            <option value="offline">Offline Only</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </div>

        {/* Camera Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCameras.map((camera) => {
            const statusConfig = getStatusConfig(camera.status);
            const StatusIcon = statusConfig.icon;

            return (
              <div
                key={camera.id}
                className={`bg-card border-2 rounded-lg overflow-hidden ${statusConfig.borderColor}`}
              >
                {/* Camera Feed Placeholder */}
                <div className="relative aspect-video bg-gray-900 flex items-center justify-center">
                  {camera.status === 'online' ? (
                    <>
                      {/* Simulated live feed with grid pattern */}
                      <div className="absolute inset-0 opacity-10">
                        <div className="grid grid-cols-4 grid-rows-3 h-full w-full">
                          {[...Array(12)].map((_, i) => (
                            <div key={i} className="border border-white/20" />
                          ))}
                        </div>
                      </div>
                      <div className="text-center z-10">
                        <Video className="h-16 w-16 text-white mb-2 mx-auto" />
                        <p className="text-white text-sm font-medium">Live Feed Active</p>
                      </div>
                      {/* Live indicator */}
                      <div className="absolute top-3 left-3 flex items-center gap-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold">
                        <span className="h-2 w-2 bg-white rounded-full animate-pulse" />
                        LIVE
                      </div>
                      {/* Maximize button */}
                      <Button
                        size="sm"
                        variant="secondary"
                        className="absolute top-3 right-3"
                      >
                        <Maximize2 className="h-4 w-4" />
                      </Button>
                    </>
                  ) : (
                    <div className="text-center">
                      <StatusIcon className="h-16 w-16 text-gray-500 mb-2 mx-auto" />
                      <p className="text-gray-500 text-sm font-medium">
                        {camera.status === 'offline' ? 'Camera Offline' : 'Under Maintenance'}
                      </p>
                    </div>
                  )}
                </div>

                {/* Camera Info */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-lg">{camera.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        📍 {camera.location}
                      </p>
                    </div>
                    <Badge className={statusConfig.className}>
                      {statusConfig.label}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Camera ID:</span>
                      <span className="font-mono font-semibold">{camera.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Resolution:</span>
                      <span className="font-medium">{camera.resolution}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Last Active:</span>
                      <span className="font-medium">{camera.lastActive}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Button size="sm" variant="outline" className="flex-1">
                      View Details
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredCameras.length === 0 && (
          <div className="text-center py-12 bg-card border rounded-lg">
            <Video className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-lg font-medium">No cameras found</p>
            <p className="text-sm text-muted-foreground mt-1">
              Adjust your filters to see more cameras
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
