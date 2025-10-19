'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Car, MapPin, Users, TrendingUp, CheckCircle, AlertCircle, XCircle } from 'lucide-react';

interface ParkingLot {
  id: string;
  name: string;
  location: string;
  totalSpaces: number;
  occupiedSpaces: number;
  reservedSpaces: number;
  status: 'available' | 'full' | 'closed';
  type: 'car' | 'two-wheeler' | 'bus' | 'vip';
  facilities: string[];
  hourlyRate: number;
}

const mockParkingLots: ParkingLot[] = [
  {
    id: '1',
    name: 'Parking Lot A',
    location: 'North Gate',
    totalSpaces: 200,
    occupiedSpaces: 156,
    reservedSpaces: 20,
    status: 'available',
    type: 'car',
    facilities: ['CCTV', 'Security Guard', 'Lighting', 'Washroom'],
    hourlyRate: 20,
  },
  {
    id: '2',
    name: 'Parking Lot B',
    location: 'East Wing',
    totalSpaces: 150,
    occupiedSpaces: 150,
    reservedSpaces: 10,
    status: 'full',
    type: 'car',
    facilities: ['CCTV', 'Security Guard', 'Lighting'],
    hourlyRate: 20,
  },
  {
    id: '3',
    name: 'Two Wheeler Zone 1',
    location: 'West Gate',
    totalSpaces: 300,
    occupiedSpaces: 245,
    reservedSpaces: 30,
    status: 'available',
    type: 'two-wheeler',
    facilities: ['CCTV', 'Lighting'],
    hourlyRate: 10,
  },
  {
    id: '4',
    name: 'VIP Parking',
    location: 'Main Entrance',
    totalSpaces: 50,
    occupiedSpaces: 32,
    reservedSpaces: 15,
    status: 'available',
    type: 'vip',
    facilities: ['CCTV', 'Security Guard', 'Valet Service', 'Covered'],
    hourlyRate: 50,
  },
  {
    id: '5',
    name: 'Bus Parking',
    location: 'South Gate',
    totalSpaces: 30,
    occupiedSpaces: 18,
    reservedSpaces: 5,
    status: 'available',
    type: 'bus',
    facilities: ['CCTV', 'Security Guard'],
    hourlyRate: 100,
  },
  {
    id: '6',
    name: 'Parking Lot C',
    location: 'South Wing',
    totalSpaces: 180,
    occupiedSpaces: 0,
    reservedSpaces: 0,
    status: 'closed',
    type: 'car',
    facilities: ['CCTV', 'Lighting'],
    hourlyRate: 20,
  },
];

export default function TrafficParkingPage() {
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredLots = mockParkingLots.filter(lot => {
    const matchesType = filterType === 'all' || lot.type === filterType;
    const matchesStatus = filterStatus === 'all' || lot.status === filterStatus;
    return matchesType && matchesStatus;
  });

  const getStatusConfig = (status: ParkingLot['status']) => {
    const configs = {
      available: {
        label: 'Available',
        className: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
        icon: CheckCircle,
      },
      full: {
        label: 'Full',
        className: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
        icon: XCircle,
      },
      closed: {
        label: 'Closed',
        className: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300',
        icon: AlertCircle,
      },
    };
    return configs[status];
  };

  const getTypeBadge = (type: ParkingLot['type']) => {
    const colors = {
      car: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      'two-wheeler': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      bus: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
      vip: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    };
    return colors[type];
  };

  const stats = {
    totalLots: mockParkingLots.length,
    totalSpaces: mockParkingLots.reduce((sum, lot) => sum + lot.totalSpaces, 0),
    occupiedSpaces: mockParkingLots.reduce((sum, lot) => sum + lot.occupiedSpaces, 0),
    availableSpaces: mockParkingLots.reduce((sum, lot) => sum + (lot.totalSpaces - lot.occupiedSpaces), 0),
  };

  const occupancyRate = ((stats.occupiedSpaces / stats.totalSpaces) * 100).toFixed(1);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Parking Management</h1>
            <p className="text-muted-foreground mt-1">
              Real-time parking lot monitoring and management
            </p>
          </div>
          <Button>
            <MapPin className="mr-2 h-4 w-4" />
            View Map
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-card border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Spaces</p>
                <p className="text-2xl font-bold mt-1">{stats.totalSpaces}</p>
              </div>
              <Car className="h-8 w-8 text-primary opacity-50" />
            </div>
          </div>
          <div className="bg-card border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Occupied</p>
                <p className="text-2xl font-bold mt-1 text-red-600">{stats.occupiedSpaces}</p>
              </div>
              <Users className="h-8 w-8 text-red-600 opacity-50" />
            </div>
          </div>
          <div className="bg-card border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Available</p>
                <p className="text-2xl font-bold mt-1 text-green-600">{stats.availableSpaces}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600 opacity-50" />
            </div>
          </div>
          <div className="bg-card border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Occupancy Rate</p>
                <p className="text-2xl font-bold mt-1">{occupancyRate}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-primary opacity-50" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-card border rounded-lg p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 border rounded-md bg-background text-sm"
            >
              <option value="all">All Types</option>
              <option value="car">Car</option>
              <option value="two-wheeler">Two Wheeler</option>
              <option value="bus">Bus</option>
              <option value="vip">VIP</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border rounded-md bg-background text-sm"
            >
              <option value="all">All Statuses</option>
              <option value="available">Available</option>
              <option value="full">Full</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </div>

        {/* Parking Lots Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredLots.map((lot) => {
            const statusConfig = getStatusConfig(lot.status);
            const StatusIcon = statusConfig.icon;
            const availableSpaces = lot.totalSpaces - lot.occupiedSpaces;
            const occupancyPercentage = (lot.occupiedSpaces / lot.totalSpaces) * 100;

            return (
              <div key={lot.id} className="bg-card border rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Car className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{lot.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{lot.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge className={getTypeBadge(lot.type)}>
                      {lot.type.replace('-', ' ').toUpperCase()}
                    </Badge>
                    <div className="flex items-center gap-2">
                      <StatusIcon className="h-4 w-4" />
                      <Badge className={statusConfig.className}>
                        {statusConfig.label}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Capacity Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Total</p>
                      <p className="text-xl font-bold">{lot.totalSpaces}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Occupied</p>
                      <p className="text-xl font-bold text-red-600">{lot.occupiedSpaces}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Available</p>
                      <p className="text-xl font-bold text-green-600">{availableSpaces}</p>
                    </div>
                  </div>

                  {/* Occupancy Bar */}
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Occupancy</span>
                      <span className="font-semibold">{occupancyPercentage.toFixed(0)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full transition-all ${
                          occupancyPercentage >= 90
                            ? 'bg-red-600'
                            : occupancyPercentage >= 70
                            ? 'bg-yellow-600'
                            : 'bg-green-600'
                        }`}
                        style={{ width: `${occupancyPercentage}%` }}
                      />
                    </div>
                  </div>

                  {/* Reserved Spaces */}
                  <div className="flex justify-between items-center py-2 border-t">
                    <span className="text-sm text-muted-foreground">Reserved Spaces</span>
                    <span className="font-semibold">{lot.reservedSpaces}</span>
                  </div>

                  {/* Hourly Rate */}
                  <div className="flex justify-between items-center py-2 border-t">
                    <span className="text-sm text-muted-foreground">Hourly Rate</span>
                    <span className="font-semibold">₹{lot.hourlyRate}</span>
                  </div>

                  {/* Facilities */}
                  <div className="border-t pt-3">
                    <p className="text-sm text-muted-foreground mb-2">Facilities</p>
                    <div className="flex flex-wrap gap-1">
                      {lot.facilities.map((facility, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {facility}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      View Details
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      Manage
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredLots.length === 0 && (
          <div className="text-center py-12 bg-card border rounded-lg">
            <Car className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-lg font-medium">No parking lots found</p>
            <p className="text-sm text-muted-foreground mt-1">
              Adjust your filters to see more lots
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
