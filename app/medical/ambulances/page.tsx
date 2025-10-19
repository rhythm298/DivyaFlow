'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Ambulance, MapPin, Navigation, Clock, Activity, CheckCircle, AlertCircle } from 'lucide-react';

interface AmbulanceUnit {
  id: string;
  vehicleNumber: string;
  driver: string;
  paramedic: string;
  status: 'available' | 'on-mission' | 'maintenance';
  location: string;
  destination?: string;
  eta?: string;
  lastMission: string;
  totalMissions: number;
  equipment: string[];
}

const mockAmbulances: AmbulanceUnit[] = [
  {
    id: '1',
    vehicleNumber: 'AMB-001',
    driver: 'Suresh Kumar',
    paramedic: 'Dr. Priya Sharma',
    status: 'available',
    location: 'Main Medical Center',
    lastMission: '45 mins ago',
    totalMissions: 156,
    equipment: ['Defibrillator', 'Oxygen', 'First Aid', 'Stretcher'],
  },
  {
    id: '2',
    vehicleNumber: 'AMB-002',
    driver: 'Rajesh Patel',
    paramedic: 'Dr. Arvind Reddy',
    status: 'on-mission',
    location: 'En route',
    destination: 'East Wing',
    eta: '3 mins',
    lastMission: '15 mins ago',
    totalMissions: 203,
    equipment: ['Defibrillator', 'Oxygen', 'First Aid', 'ECG'],
  },
  {
    id: '3',
    vehicleNumber: 'AMB-003',
    driver: 'Amit Singh',
    paramedic: 'Nurse Sunita Rao',
    status: 'available',
    location: 'South Ambulance Station',
    lastMission: '2 hours ago',
    totalMissions: 89,
    equipment: ['Oxygen', 'First Aid', 'Stretcher'],
  },
  {
    id: '4',
    vehicleNumber: 'AMB-004',
    driver: 'Vikram Yadav',
    paramedic: 'Dr. Kavita Mehta',
    status: 'maintenance',
    location: 'Service Center',
    lastMission: '1 day ago',
    totalMissions: 178,
    equipment: ['Defibrillator', 'Oxygen', 'First Aid'],
  },
  {
    id: '5',
    vehicleNumber: 'AMB-005',
    driver: 'Dinesh Gupta',
    paramedic: 'Nurse Rekha Shah',
    status: 'on-mission',
    location: 'Parking Lot B',
    destination: 'Nearby Hospital',
    eta: '5 mins',
    lastMission: '10 mins ago',
    totalMissions: 142,
    equipment: ['Defibrillator', 'Oxygen', 'First Aid', 'Stretcher', 'ECG'],
  },
];

export default function MedicalAmbulancesPage() {
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredAmbulances = mockAmbulances.filter(ambulance => {
    return filterStatus === 'all' || ambulance.status === filterStatus;
  });

  const getStatusConfig = (status: AmbulanceUnit['status']) => {
    const configs = {
      available: {
        label: 'Available',
        className: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
        icon: CheckCircle,
        borderColor: 'border-green-500',
      },
      'on-mission': {
        label: 'On Mission',
        className: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
        icon: Activity,
        borderColor: 'border-red-500',
      },
      maintenance: {
        label: 'Maintenance',
        className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
        icon: AlertCircle,
        borderColor: 'border-yellow-500',
      },
    };
    return configs[status];
  };

  const stats = {
    total: mockAmbulances.length,
    available: mockAmbulances.filter(a => a.status === 'available').length,
    onMission: mockAmbulances.filter(a => a.status === 'on-mission').length,
    totalMissions: mockAmbulances.reduce((sum, a) => sum + a.totalMissions, 0),
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Ambulance Fleet</h1>
            <p className="text-muted-foreground mt-1">
              Real-time ambulance tracking and management
            </p>
          </div>
          <Button variant="destructive">
            <Activity className="mr-2 h-4 w-4" />
            Dispatch Emergency
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-card border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Ambulances</p>
                <p className="text-2xl font-bold mt-1">{stats.total}</p>
              </div>
              <Ambulance className="h-8 w-8 text-primary opacity-50" />
            </div>
          </div>
          <div className="bg-card border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Available</p>
                <p className="text-2xl font-bold mt-1 text-green-600">{stats.available}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600 opacity-50" />
            </div>
          </div>
          <div className="bg-card border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">On Mission</p>
                <p className="text-2xl font-bold mt-1 text-red-600">{stats.onMission}</p>
              </div>
              <Activity className="h-8 w-8 text-red-600 opacity-50" />
            </div>
          </div>
          <div className="bg-card border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Missions</p>
                <p className="text-2xl font-bold mt-1">{stats.totalMissions}</p>
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
            <option value="all">All Ambulances</option>
            <option value="available">Available</option>
            <option value="on-mission">On Mission</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </div>

        {/* Ambulances Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredAmbulances.map((ambulance) => {
            const statusConfig = getStatusConfig(ambulance.status);
            const StatusIcon = statusConfig.icon;

            return (
              <div
                key={ambulance.id}
                className={`bg-card border-2 rounded-lg p-6 ${statusConfig.borderColor}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3">
                    <div className={`h-14 w-14 rounded-lg ${statusConfig.className} flex items-center justify-center flex-shrink-0`}>
                      <Ambulance className="h-7 w-7" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl">{ambulance.vehicleNumber}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <StatusIcon className="h-4 w-4" />
                        <Badge className={statusConfig.className}>
                          {statusConfig.label}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Total Missions</p>
                    <p className="text-2xl font-bold">{ambulance.totalMissions}</p>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  {/* Location */}
                  <div className="flex items-start gap-2">
                    <MapPin className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">Current Location</p>
                      <p className="font-medium">{ambulance.location}</p>
                    </div>
                  </div>

                  {/* On Mission Info */}
                  {ambulance.status === 'on-mission' && ambulance.destination && (
                    <>
                      <div className="flex items-start gap-2">
                        <Navigation className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="text-sm text-muted-foreground">Destination</p>
                          <p className="font-medium text-red-600">{ambulance.destination}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Clock className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="text-sm text-muted-foreground">ETA</p>
                          <p className="font-medium">{ambulance.eta}</p>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Crew */}
                  <div className="grid grid-cols-2 gap-4 pt-3 border-t">
                    <div>
                      <p className="text-sm text-muted-foreground">Driver</p>
                      <p className="font-medium text-sm">{ambulance.driver}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Paramedic</p>
                      <p className="font-medium text-sm">{ambulance.paramedic}</p>
                    </div>
                  </div>

                  {/* Last Mission */}
                  <div className="flex items-center justify-between pt-2 border-t">
                    <span className="text-sm text-muted-foreground">Last Mission</span>
                    <span className="text-sm font-medium">{ambulance.lastMission}</span>
                  </div>
                </div>

                {/* Equipment */}
                <div className="mb-4">
                  <p className="text-sm text-muted-foreground mb-2">Equipment</p>
                  <div className="flex flex-wrap gap-1">
                    {ambulance.equipment.map((item, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  {ambulance.status === 'available' && (
                    <Button size="sm" variant="destructive" className="flex-1">
                      <Activity className="mr-2 h-4 w-4" />
                      Dispatch
                    </Button>
                  )}
                  {ambulance.status === 'on-mission' && (
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

        {filteredAmbulances.length === 0 && (
          <div className="text-center py-12 bg-card border rounded-lg">
            <Ambulance className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-lg font-medium">No ambulances found</p>
            <p className="text-sm text-muted-foreground mt-1">
              Adjust your filters to see more ambulances
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
