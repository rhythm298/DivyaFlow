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
import { Search, AlertCircle, Activity, Clock, CheckCircle, XCircle, Plus, Heart } from 'lucide-react';

interface Emergency {
  id: string;
  caseNumber: string;
  patientName: string;
  age: number;
  gender: 'male' | 'female';
  condition: string;
  severity: 'critical' | 'high' | 'moderate' | 'stable';
  location: string;
  assignedTo: string;
  status: 'active' | 'treating' | 'stable' | 'transferred' | 'resolved';
  timestamp: string;
  vitals: {
    heartRate?: number;
    bloodPressure?: string;
    oxygen?: number;
  };
}

const mockEmergencies: Emergency[] = [
  {
    id: '1',
    caseNumber: 'EMG2025001',
    patientName: 'Ramesh Kumar',
    age: 68,
    gender: 'male',
    condition: 'Chest Pain - Suspected Heart Attack',
    severity: 'critical',
    location: 'Main Darshan Hall',
    assignedTo: 'Dr. Arvind Reddy',
    status: 'treating',
    timestamp: '2025-10-08T09:45:00',
    vitals: {
      heartRate: 110,
      bloodPressure: '160/95',
      oxygen: 92,
    },
  },
  {
    id: '2',
    caseNumber: 'EMG2025002',
    patientName: 'Sunita Devi',
    age: 72,
    gender: 'female',
    condition: 'Breathing Difficulty',
    severity: 'high',
    location: 'Prayer Hall',
    assignedTo: 'Dr. Priya Sharma',
    status: 'stable',
    timestamp: '2025-10-08T09:30:00',
    vitals: {
      heartRate: 88,
      bloodPressure: '140/85',
      oxygen: 95,
    },
  },
  {
    id: '3',
    caseNumber: 'EMG2025003',
    patientName: 'Amit Patel',
    age: 45,
    gender: 'male',
    condition: 'Heat Exhaustion',
    severity: 'moderate',
    location: 'East Wing',
    assignedTo: 'Nurse Rekha Shah',
    status: 'treating',
    timestamp: '2025-10-08T09:15:00',
    vitals: {
      heartRate: 95,
      bloodPressure: '130/80',
      oxygen: 98,
    },
  },
  {
    id: '4',
    caseNumber: 'EMG2025004',
    patientName: 'Kavita Sharma',
    age: 35,
    gender: 'female',
    condition: 'Minor Injury - Fall',
    severity: 'stable',
    location: 'North Gate',
    assignedTo: 'Nurse Sunita Rao',
    status: 'resolved',
    timestamp: '2025-10-08T08:45:00',
    vitals: {
      heartRate: 75,
      bloodPressure: '120/75',
      oxygen: 99,
    },
  },
  {
    id: '5',
    caseNumber: 'EMG2025005',
    patientName: 'Rajesh Singh',
    age: 55,
    gender: 'male',
    condition: 'Diabetic Emergency - Low Blood Sugar',
    severity: 'high',
    location: 'West Wing',
    assignedTo: 'Dr. Kavita Mehta',
    status: 'transferred',
    timestamp: '2025-10-08T08:30:00',
    vitals: {
      heartRate: 102,
      bloodPressure: '145/90',
      oxygen: 96,
    },
  },
  {
    id: '6',
    caseNumber: 'EMG2025006',
    patientName: 'Anita Reddy',
    age: 28,
    gender: 'female',
    condition: 'Dehydration',
    severity: 'moderate',
    location: 'Parking Area',
    assignedTo: 'Nurse Rekha Shah',
    status: 'active',
    timestamp: '2025-10-08T10:00:00',
    vitals: {
      heartRate: 90,
      bloodPressure: '125/78',
      oxygen: 97,
    },
  },
];

export default function MedicalEmergenciesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSeverity, setFilterSeverity] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredEmergencies = mockEmergencies.filter(emergency => {
    const matchesSearch = 
      emergency.caseNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emergency.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emergency.condition.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSeverity = filterSeverity === 'all' || emergency.severity === filterSeverity;
    const matchesStatus = filterStatus === 'all' || emergency.status === filterStatus;

    return matchesSearch && matchesSeverity && matchesStatus;
  });

  const getSeverityBadge = (severity: Emergency['severity']) => {
    const configs = {
      critical: { label: 'Critical', className: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' },
      high: { label: 'High', className: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300' },
      moderate: { label: 'Moderate', className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' },
      stable: { label: 'Stable', className: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' },
    };
    return configs[severity];
  };

  const getStatusBadge = (status: Emergency['status']) => {
    const configs = {
      active: { label: 'Active', className: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300', icon: AlertCircle },
      treating: { label: 'Treating', className: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300', icon: Activity },
      stable: { label: 'Stable', className: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300', icon: CheckCircle },
      transferred: { label: 'Transferred', className: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300', icon: Clock },
      resolved: { label: 'Resolved', className: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300', icon: XCircle },
    };
    return configs[status];
  };

  const stats = {
    total: mockEmergencies.length,
    active: mockEmergencies.filter(e => e.status === 'active' || e.status === 'treating').length,
    critical: mockEmergencies.filter(e => e.severity === 'critical').length,
    resolved: mockEmergencies.filter(e => e.status === 'resolved').length,
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Emergency Cases</h1>
            <p className="text-muted-foreground mt-1">
              Real-time emergency patient monitoring
            </p>
          </div>
          <Button variant="destructive">
            <Plus className="mr-2 h-4 w-4" />
            New Emergency
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-card border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Cases</p>
                <p className="text-2xl font-bold mt-1">{stats.total}</p>
              </div>
              <Heart className="h-8 w-8 text-primary opacity-50" />
            </div>
          </div>
          <div className="bg-card border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active</p>
                <p className="text-2xl font-bold mt-1 text-red-600">{stats.active}</p>
              </div>
              <Activity className="h-8 w-8 text-red-600 opacity-50" />
            </div>
          </div>
          <div className="bg-card border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Critical</p>
                <p className="text-2xl font-bold mt-1 text-orange-600">{stats.critical}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-orange-600 opacity-50" />
            </div>
          </div>
          <div className="bg-card border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Resolved</p>
                <p className="text-2xl font-bold mt-1 text-green-600">{stats.resolved}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600 opacity-50" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-card border rounded-lg p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by case #, patient, or condition..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={filterSeverity}
              onChange={(e) => setFilterSeverity(e.target.value)}
              className="px-3 py-2 border rounded-md bg-background text-sm"
            >
              <option value="all">All Severities</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="moderate">Moderate</option>
              <option value="stable">Stable</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border rounded-md bg-background text-sm"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="treating">Treating</option>
              <option value="stable">Stable</option>
              <option value="transferred">Transferred</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
        </div>

        {/* Emergencies Table */}
        <div className="bg-card border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Case #</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Condition</TableHead>
                  <TableHead>Vitals</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead>Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEmergencies.map((emergency) => {
                  const severityConfig = getSeverityBadge(emergency.severity);
                  const statusConfig = getStatusBadge(emergency.status);
                  const StatusIcon = statusConfig.icon;

                  return (
                    <TableRow key={emergency.id} className="cursor-pointer hover:bg-muted/50">
                      <TableCell className="font-mono font-semibold">
                        {emergency.caseNumber}
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{emergency.patientName}</p>
                          <p className="text-sm text-muted-foreground">
                            {emergency.age}Y, {emergency.gender === 'male' ? 'M' : 'F'}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="font-medium text-sm">{emergency.condition}</p>
                      </TableCell>
                      <TableCell>
                        <div className="text-xs space-y-1">
                          {emergency.vitals.heartRate && (
                            <div>HR: <span className="font-semibold">{emergency.vitals.heartRate}</span> bpm</div>
                          )}
                          {emergency.vitals.bloodPressure && (
                            <div>BP: <span className="font-semibold">{emergency.vitals.bloodPressure}</span></div>
                          )}
                          {emergency.vitals.oxygen && (
                            <div>O2: <span className="font-semibold">{emergency.vitals.oxygen}</span>%</div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{emergency.location}</TableCell>
                      <TableCell>
                        <Badge className={severityConfig.className}>
                          {severityConfig.label}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <StatusIcon className="h-4 w-4" />
                          <Badge className={statusConfig.className}>
                            {statusConfig.label}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{emergency.assignedTo}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(emergency.timestamp).toLocaleTimeString('en-IN')}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>

        {filteredEmergencies.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No emergency cases found matching your criteria</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
