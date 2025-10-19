'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bus, MapPin, Navigation, Users, Clock, Activity, CheckCircle, AlertCircle } from 'lucide-react';

interface Shuttle {
  id: string;
  shuttleNumber: string;
  route: string;
  driver: string;
  capacity: number;
  currentPassengers: number;
  status: 'active' | 'idle' | 'maintenance';
  currentLocation: string;
  nextStop: string;
  eta: string;
  totalTrips: number;
  lastMaintenance: string;
}

const mockShuttles: Shuttle[] = [
  {
    id: '1',
    shuttleNumber: 'SH-001',
    route: 'Main Gate → Temple → Parking A',
    driver: 'Suresh Kumar',
    capacity: 40,
    currentPassengers: 32,
    status: 'active',
    currentLocation: 'Near Main Gate',
    nextStop: 'Temple Entrance',
    eta: '3 mins',
    totalTrips: 45,
    lastMaintenance: '2 days ago',
  },
  {
    id: '2',
    shuttleNumber: 'SH-002',
    route: 'Parking B → Temple → Exit Gate',
    driver: 'Rajesh Patel',
    capacity: 40,
    currentPassengers: 28,
    status: 'active',
    currentLocation: 'Temple Complex',
    nextStop: 'Exit Gate',
    eta: '5 mins',
    totalTrips: 38,
    lastMaintenance: '1 day ago',
  },
  {
    id: '3',
    shuttleNumber: 'SH-003',
    route: 'East Gate → Temple → West Gate',
    driver: 'Amit Singh',
    capacity: 35,
    currentPassengers: 0,
    status: 'idle',
    currentLocation: 'East Gate Depot',
    nextStop: 'Awaiting passengers',
    eta: '-',
    totalTrips: 52,
    lastMaintenance: '3 days ago',
  },
  {
    id: '4',
    shuttleNumber: 'SH-004',
    route: 'Parking C → Temple → Main Exit',
    driver: 'Vikram Yadav',
    capacity: 40,
    currentPassengers: 0,
    status: 'maintenance',
    currentLocation: 'Service Center',
    nextStop: 'Under Maintenance',
    eta: '-',
    totalTrips: 41,
    lastMaintenance: 'Today',
  },
  {
    id: '5',
    shuttleNumber: 'SH-005',
    route: 'VIP Parking → Temple → VIP Exit',
    driver: 'Dinesh Gupta',
    capacity: 25,
    currentPassengers: 18,
    status: 'active',
    currentLocation: 'VIP Area',
    nextStop: 'Temple VIP Entrance',
    eta: '2 mins',
    totalTrips: 29,
    lastMaintenance: '1 week ago',
  },
  {
    id: '6',
    shuttleNumber: 'SH-006',
    route: 'South Gate → Temple → North Exit',
    driver: 'Karan Mehta',
    capacity: 40,
    currentPassengers: 35,
    status: 'active',
    currentLocation: 'Temple Area',
    nextStop: 'North Exit',
    eta: '4 mins',
    totalTrips: 47,
    lastMaintenance: '4 days ago',
  },
];

export default function TrafficShuttlesPage() {
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredShuttles = mockShuttles.filter(shuttle => {
    return filterStatus === 'all' || shuttle.status === filterStatus;
  });

  const getStatusConfig = (status: Shuttle['status']) => {
    const configs = {
      active: {
        label: 'Active',
        className: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
        icon: Activity,
        borderColor: 'border-green-500',
      },
      idle: {
        label: 'Idle',
        className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
        icon: Clock,
        borderColor: 'border-yellow-500',
      },
      maintenance: {
        label: 'Maintenance',
        className: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
        icon: AlertCircle,
        borderColor: 'border-red-500',
      },
    };
    return configs[status];
  };

  const stats = {
    total: mockShuttles.length,
    active: mockShuttles.filter(s => s.status === 'active').length,
    totalPassengers: mockShuttles.reduce((sum, s) => sum + s.currentPassengers, 0),
    totalTrips: mockShuttles.reduce((sum, s) => sum + s.totalTrips, 0),
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Shuttle Service</h1>
            <p className="text-muted-foreground mt-1">
              Real-time shuttle tracking and management
            </p>
          </div>
          <Button>
            <MapPin className="mr-2 h-4 w-4" />
            View Route Map
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-card border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Shuttles</p>
                <p className="text-2xl font-bold mt-1">{stats.total}</p>
              </div>
              <Bus className="h-8 w-8 text-primary opacity-50" />
            </div>
          </div>
          <div className="bg-card border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Shuttles</p>
                <p className="text-2xl font-bold mt-1 text-green-600">{stats.active}</p>
              </div>
              <Activity className="h-8 w-8 text-green-600 opacity-50" />
            </div>
          </div>
          <div className="bg-card border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Current Passengers</p>
                <p className="text-2xl font-bold mt-1 text-blue-600">{stats.totalPassengers}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600 opacity-50" />
            </div>
          </div>
          <div className="bg-card border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Trips Today</p>
                <p className="text-2xl font-bold mt-1">{stats.totalTrips}</p>
              </div>
              <Navigation className="h-8 w-8 text-primary opacity-50" />
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
            <option value="all">All Shuttles</option>
            <option value="active">Active</option>
            <option value="idle">Idle</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </div>

        {/* Shuttles Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredShuttles.map((shuttle) => {
            const statusConfig = getStatusConfig(shuttle.status);
            const StatusIcon = statusConfig.icon;
            const occupancyPercentage = (shuttle.currentPassengers / shuttle.capacity) * 100;

            return (
              <div
                key={shuttle.id}
                className={`bg-card border-2 rounded-lg p-6 ${statusConfig.borderColor}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3">
                    <div className={`h-14 w-14 rounded-lg ${statusConfig.className} flex items-center justify-center flex-shrink-0`}>
                      <Bus className="h-7 w-7" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl">{shuttle.shuttleNumber}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <StatusIcon className="h-4 w-4" />
                        <Badge className={statusConfig.className}>
                          {statusConfig.label}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Trips Today</p>
                    <p className="text-2xl font-bold">{shuttle.totalTrips}</p>
                  </div>
                </div>

                {/* Route */}
                <div className="bg-muted/50 rounded-lg p-3 mb-4">
                  <p className="text-sm text-muted-foreground mb-1">Route</p>
                  <p className="font-medium">{shuttle.route}</p>
                </div>

                <div className="space-y-3">
                  {/* Location & Next Stop */}
                  {shuttle.status === 'active' && (
                    <>
                      <div className="flex items-start gap-2">
                        <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="text-sm text-muted-foreground">Current Location</p>
                          <p className="font-medium">{shuttle.currentLocation}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Navigation className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="text-sm text-muted-foreground">Next Stop</p>
                          <p className="font-medium text-green-600">{shuttle.nextStop}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Clock className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="text-sm text-muted-foreground">ETA</p>
                          <p className="font-medium">{shuttle.eta}</p>
                        </div>
                      </div>
                    </>
                  )}

                  {shuttle.status !== 'active' && (
                    <div className="flex items-start gap-2">
                      <MapPin className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground">Location</p>
                        <p className="font-medium">{shuttle.currentLocation}</p>
                      </div>
                    </div>
                  )}

                  {/* Passenger Capacity */}
                  <div className="pt-3 border-t">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Passenger Capacity</span>
                      <span className="font-semibold">
                        {shuttle.currentPassengers}/{shuttle.capacity}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          occupancyPercentage > 80
                            ? 'bg-red-600'
                            : occupancyPercentage > 50
                            ? 'bg-yellow-600'
                            : 'bg-green-600'
                        }`}
                        style={{ width: `${occupancyPercentage}%` }}
                      />
                    </div>
                  </div>

                  {/* Driver & Maintenance */}
                  <div className="grid grid-cols-2 gap-4 pt-3 border-t">
                    <div>
                      <p className="text-sm text-muted-foreground">Driver</p>
                      <p className="font-medium text-sm">{shuttle.driver}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Last Maintenance</p>
                      <p className="font-medium text-sm">{shuttle.lastMaintenance}</p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-4">
                  {shuttle.status === 'active' && (
                    <Button size="sm" variant="outline" className="flex-1">
                      <MapPin className="mr-2 h-4 w-4" />
                      Track Live
                    </Button>
                  )}
                  <Button size="sm" variant="outline" className="flex-1">
                    View Details
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredShuttles.length === 0 && (
          <div className="text-center py-12 bg-card border rounded-lg">
            <Bus className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-lg font-medium">No shuttles found</p>
            <p className="text-sm text-muted-foreground mt-1">
              Adjust your filters to see more shuttles
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
