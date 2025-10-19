'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Search, Car, LogIn, LogOut, Clock, Download } from 'lucide-react';

interface Vehicle {
  id: string;
  vehicleNumber: string;
  type: 'car' | 'two-wheeler' | 'bus' | 'auto';
  ownerName: string;
  entryTime: string;
  exitTime?: string;
  parkingLot: string;
  status: 'parked' | 'exited';
  duration?: string;
  charges?: number;
}

const mockVehicles: Vehicle[] = [
  {
    id: '1',
    vehicleNumber: 'GJ 01 AB 1234',
    type: 'car',
    ownerName: 'Rajesh Kumar',
    entryTime: '2025-10-08T08:30:00',
    parkingLot: 'Parking Lot A',
    status: 'parked',
  },
  {
    id: '2',
    vehicleNumber: 'GJ 05 CD 5678',
    type: 'two-wheeler',
    ownerName: 'Priya Sharma',
    entryTime: '2025-10-08T07:45:00',
    exitTime: '2025-10-08T09:30:00',
    parkingLot: 'Two Wheeler Zone 1',
    status: 'exited',
    duration: '1h 45m',
    charges: 20,
  },
  {
    id: '3',
    vehicleNumber: 'GJ 18 EF 9012',
    type: 'car',
    ownerName: 'Amit Patel',
    entryTime: '2025-10-08T09:00:00',
    parkingLot: 'Parking Lot B',
    status: 'parked',
  },
  {
    id: '4',
    vehicleNumber: 'GJ 12 GH 3456',
    type: 'bus',
    ownerName: 'Navjivan Tours',
    entryTime: '2025-10-08T06:30:00',
    exitTime: '2025-10-08T10:00:00',
    parkingLot: 'Bus Parking',
    status: 'exited',
    duration: '3h 30m',
    charges: 350,
  },
  {
    id: '5',
    vehicleNumber: 'GJ 03 IJ 7890',
    type: 'car',
    ownerName: 'Sunita Reddy',
    entryTime: '2025-10-08T08:15:00',
    parkingLot: 'VIP Parking',
    status: 'parked',
  },
  {
    id: '6',
    vehicleNumber: 'GJ 22 KL 2345',
    type: 'two-wheeler',
    ownerName: 'Vikram Singh',
    entryTime: '2025-10-08T07:00:00',
    exitTime: '2025-10-08T08:45:00',
    parkingLot: 'Two Wheeler Zone 1',
    status: 'exited',
    duration: '1h 45m',
    charges: 20,
  },
  {
    id: '7',
    vehicleNumber: 'GJ 07 MN 6789',
    type: 'car',
    ownerName: 'Kavita Mehta',
    entryTime: '2025-10-08T09:30:00',
    parkingLot: 'Parking Lot A',
    status: 'parked',
  },
  {
    id: '8',
    vehicleNumber: 'GJ 15 OP 0123',
    type: 'auto',
    ownerName: 'Ramesh Yadav',
    entryTime: '2025-10-08T08:45:00',
    exitTime: '2025-10-08T09:15:00',
    parkingLot: 'Parking Lot C',
    status: 'exited',
    duration: '30m',
    charges: 10,
  },
];

export default function TrafficVehiclesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredVehicles = mockVehicles.filter(vehicle => {
    const matchesSearch = 
      vehicle.vehicleNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.ownerName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = filterType === 'all' || vehicle.type === filterType;
    const matchesStatus = filterStatus === 'all' || vehicle.status === filterStatus;

    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusBadge = (status: Vehicle['status']) => {
    const configs = {
      parked: { label: 'Parked', className: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300', icon: LogIn },
      exited: { label: 'Exited', className: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300', icon: LogOut },
    };
    return configs[status];
  };

  const getTypeBadge = (type: Vehicle['type']) => {
    const colors = {
      car: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      'two-wheeler': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      bus: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
      auto: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    };
    return colors[type];
  };

  const stats = {
    total: mockVehicles.length,
    parked: mockVehicles.filter(v => v.status === 'parked').length,
    exited: mockVehicles.filter(v => v.status === 'exited').length,
    totalRevenue: mockVehicles.reduce((sum, v) => sum + (v.charges || 0), 0),
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Vehicle Management</h1>
            <p className="text-muted-foreground mt-1">
              Track vehicle entry and exit records
            </p>
          </div>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-card border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Vehicles</p>
                <p className="text-2xl font-bold mt-1">{stats.total}</p>
              </div>
              <Car className="h-8 w-8 text-primary opacity-50" />
            </div>
          </div>
          <div className="bg-card border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Currently Parked</p>
                <p className="text-2xl font-bold mt-1 text-green-600">{stats.parked}</p>
              </div>
              <LogIn className="h-8 w-8 text-green-600 opacity-50" />
            </div>
          </div>
          <div className="bg-card border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Exited Today</p>
                <p className="text-2xl font-bold mt-1 text-gray-600">{stats.exited}</p>
              </div>
              <LogOut className="h-8 w-8 text-gray-600 opacity-50" />
            </div>
          </div>
          <div className="bg-card border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Revenue Today</p>
                <p className="text-2xl font-bold mt-1">₹{stats.totalRevenue}</p>
              </div>
              <Clock className="h-8 w-8 text-primary opacity-50" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-card border rounded-lg p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by vehicle number or owner name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 border rounded-md bg-background text-sm"
            >
              <option value="all">All Types</option>
              <option value="car">Car</option>
              <option value="two-wheeler">Two Wheeler</option>
              <option value="bus">Bus</option>
              <option value="auto">Auto</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border rounded-md bg-background text-sm"
            >
              <option value="all">All Statuses</option>
              <option value="parked">Parked</option>
              <option value="exited">Exited</option>
            </select>
          </div>
        </div>

        {/* Vehicles Table */}
        <div className="bg-card border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vehicle Number</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Parking Lot</TableHead>
                  <TableHead>Entry Time</TableHead>
                  <TableHead>Exit Time</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Charges</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVehicles.map((vehicle) => {
                  const statusConfig = getStatusBadge(vehicle.status);
                  const StatusIcon = statusConfig.icon;

                  return (
                    <TableRow key={vehicle.id}>
                      <TableCell className="font-mono font-semibold">
                        {vehicle.vehicleNumber}
                      </TableCell>
                      <TableCell>
                        <Badge className={getTypeBadge(vehicle.type)}>
                          {vehicle.type.replace('-', ' ').toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell>{vehicle.ownerName}</TableCell>
                      <TableCell className="text-sm">{vehicle.parkingLot}</TableCell>
                      <TableCell className="text-sm">
                        {new Date(vehicle.entryTime).toLocaleString('en-IN', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </TableCell>
                      <TableCell className="text-sm">
                        {vehicle.exitTime
                          ? new Date(vehicle.exitTime).toLocaleString('en-IN', {
                              hour: '2-digit',
                              minute: '2-digit',
                            })
                          : '-'}
                      </TableCell>
                      <TableCell className="text-sm">{vehicle.duration || '-'}</TableCell>
                      <TableCell className="font-semibold">
                        {vehicle.charges ? `₹${vehicle.charges}` : '-'}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <StatusIcon className="h-4 w-4" />
                          <Badge className={statusConfig.className}>
                            {statusConfig.label}
                          </Badge>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>

        {filteredVehicles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No vehicles found matching your criteria</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
