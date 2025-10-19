'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Hospital, MapPin, Users, Clock, CheckCircle, AlertCircle, Plus } from 'lucide-react';

interface MedicalFacility {
  id: string;
  name: string;
  type: 'clinic' | 'first-aid' | 'pharmacy' | 'ambulance-station';
  location: string;
  status: 'operational' | 'busy' | 'closed';
  staff: number;
  capacity: number;
  currentPatients: number;
  equipment: string[];
  contact: string;
}

const mockFacilities: MedicalFacility[] = [
  {
    id: '1',
    name: 'Main Medical Center',
    type: 'clinic',
    location: 'Central Complex',
    status: 'operational',
    staff: 5,
    capacity: 20,
    currentPatients: 8,
    equipment: ['ECG', 'X-Ray', 'Defibrillator', 'Oxygen'],
    contact: '+91 98765 11111',
  },
  {
    id: '2',
    name: 'North Gate First Aid',
    type: 'first-aid',
    location: 'North Gate',
    status: 'operational',
    staff: 2,
    capacity: 5,
    currentPatients: 1,
    equipment: ['First Aid Kit', 'Stretcher', 'Oxygen'],
    contact: '+91 98765 11112',
  },
  {
    id: '3',
    name: 'Temple Pharmacy',
    type: 'pharmacy',
    location: 'West Wing',
    status: 'operational',
    staff: 3,
    capacity: 10,
    currentPatients: 4,
    equipment: ['Medicines', 'Medical Supplies'],
    contact: '+91 98765 11113',
  },
  {
    id: '4',
    name: 'East Wing First Aid',
    type: 'first-aid',
    location: 'East Gate',
    status: 'busy',
    staff: 2,
    capacity: 5,
    currentPatients: 5,
    equipment: ['First Aid Kit', 'Wheelchair', 'Oxygen'],
    contact: '+91 98765 11114',
  },
  {
    id: '5',
    name: 'Emergency Ambulance Station',
    type: 'ambulance-station',
    location: 'South Entrance',
    status: 'operational',
    staff: 4,
    capacity: 3,
    currentPatients: 0,
    equipment: ['3 Ambulances', 'Paramedic Equipment'],
    contact: '+91 98765 11115',
  },
  {
    id: '6',
    name: 'Parking Area First Aid',
    type: 'first-aid',
    location: 'Parking Lot B',
    status: 'closed',
    staff: 0,
    capacity: 5,
    currentPatients: 0,
    equipment: ['First Aid Kit'],
    contact: '+91 98765 11116',
  },
];

export default function MedicalFacilitiesPage() {
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredFacilities = mockFacilities.filter(facility => {
    const matchesType = filterType === 'all' || facility.type === filterType;
    const matchesStatus = filterStatus === 'all' || facility.status === filterStatus;
    return matchesType && matchesStatus;
  });

  const getStatusConfig = (status: MedicalFacility['status']) => {
    const configs = {
      operational: {
        label: 'Operational',
        className: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
        icon: CheckCircle,
      },
      busy: {
        label: 'Busy',
        className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
        icon: AlertCircle,
      },
      closed: {
        label: 'Closed',
        className: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
        icon: Clock,
      },
    };
    return configs[status];
  };

  const getTypeBadge = (type: MedicalFacility['type']) => {
    const colors = {
      clinic: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      'first-aid': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      pharmacy: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
      'ambulance-station': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    };
    return colors[type];
  };

  const stats = {
    total: mockFacilities.length,
    operational: mockFacilities.filter(f => f.status === 'operational').length,
    totalStaff: mockFacilities.reduce((sum, f) => sum + f.staff, 0),
    currentPatients: mockFacilities.reduce((sum, f) => sum + f.currentPatients, 0),
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Medical Facilities</h1>
            <p className="text-muted-foreground mt-1">
              Manage medical centers and first aid stations
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Facility
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-card border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Facilities</p>
                <p className="text-2xl font-bold mt-1">{stats.total}</p>
              </div>
              <Hospital className="h-8 w-8 text-primary opacity-50" />
            </div>
          </div>
          <div className="bg-card border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Operational</p>
                <p className="text-2xl font-bold mt-1 text-green-600">{stats.operational}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600 opacity-50" />
            </div>
          </div>
          <div className="bg-card border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Medical Staff</p>
                <p className="text-2xl font-bold mt-1">{stats.totalStaff}</p>
              </div>
              <Users className="h-8 w-8 text-primary opacity-50" />
            </div>
          </div>
          <div className="bg-card border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Current Patients</p>
                <p className="text-2xl font-bold mt-1 text-blue-600">{stats.currentPatients}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600 opacity-50" />
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
              <option value="clinic">Medical Clinic</option>
              <option value="first-aid">First Aid</option>
              <option value="pharmacy">Pharmacy</option>
              <option value="ambulance-station">Ambulance Station</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border rounded-md bg-background text-sm"
            >
              <option value="all">All Statuses</option>
              <option value="operational">Operational</option>
              <option value="busy">Busy</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredFacilities.map((facility) => {
            const statusConfig = getStatusConfig(facility.status);
            const StatusIcon = statusConfig.icon;
            const occupancyPercentage = (facility.currentPatients / facility.capacity) * 100;

            return (
              <div key={facility.id} className="bg-card border rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Hospital className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{facility.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{facility.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge className={getTypeBadge(facility.type)}>
                      {facility.type.replace('-', ' ').toUpperCase()}
                    </Badge>
                    <div className="flex items-center gap-2">
                      <StatusIcon className="h-4 w-4" />
                      <Badge className={statusConfig.className}>
                        {statusConfig.label}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  {/* Staff & Capacity */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Medical Staff</p>
                      <p className="text-lg font-semibold">{facility.staff}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Capacity</p>
                      <p className="text-lg font-semibold">{facility.capacity} beds</p>
                    </div>
                  </div>

                  {/* Occupancy */}
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Occupancy</span>
                      <span className="font-medium">
                        {facility.currentPatients}/{facility.capacity}
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

                  {/* Equipment */}
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Equipment</p>
                    <div className="flex flex-wrap gap-1">
                      {facility.equipment.map((item, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Contact */}
                  <div className="pt-2 border-t">
                    <p className="text-sm text-muted-foreground">Contact: {facility.contact}</p>
                  </div>

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

        {filteredFacilities.length === 0 && (
          <div className="text-center py-12 bg-card border rounded-lg">
            <Hospital className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-lg font-medium">No facilities found</p>
            <p className="text-sm text-muted-foreground mt-1">
              Adjust your filters to see more facilities
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
