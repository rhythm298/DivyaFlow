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
import { Search, UserPlus, Shield, Clock, CheckCircle, XCircle } from 'lucide-react';

interface Personnel {
  id: string;
  name: string;
  badgeNumber: string;
  position: string;
  shift: 'morning' | 'afternoon' | 'night';
  zone: string;
  status: 'on-duty' | 'off-duty' | 'on-break';
  contact: string;
  checkInTime: string;
}

const mockPersonnel: Personnel[] = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    badgeNumber: 'SEC001',
    position: 'Head Security',
    shift: 'morning',
    zone: 'Main Entrance',
    status: 'on-duty',
    contact: '+91 98765 00001',
    checkInTime: '06:00 AM',
  },
  {
    id: '2',
    name: 'Vikram Singh',
    badgeNumber: 'SEC002',
    position: 'Security Guard',
    shift: 'morning',
    zone: 'North Gate',
    status: 'on-duty',
    contact: '+91 98765 00002',
    checkInTime: '06:15 AM',
  },
  {
    id: '3',
    name: 'Amit Sharma',
    badgeNumber: 'SEC003',
    position: 'Security Guard',
    shift: 'morning',
    zone: 'South Gate',
    status: 'on-break',
    contact: '+91 98765 00003',
    checkInTime: '06:10 AM',
  },
  {
    id: '4',
    name: 'Suresh Patel',
    badgeNumber: 'SEC004',
    position: 'Security Guard',
    shift: 'afternoon',
    zone: 'East Wing',
    status: 'off-duty',
    contact: '+91 98765 00004',
    checkInTime: '-',
  },
  {
    id: '5',
    name: 'Ramesh Yadav',
    badgeNumber: 'SEC005',
    position: 'Security Supervisor',
    shift: 'morning',
    zone: 'West Wing',
    status: 'on-duty',
    contact: '+91 98765 00005',
    checkInTime: '06:00 AM',
  },
  {
    id: '6',
    name: 'Dinesh Reddy',
    badgeNumber: 'SEC006',
    position: 'Security Guard',
    shift: 'night',
    zone: 'Parking Area',
    status: 'off-duty',
    contact: '+91 98765 00006',
    checkInTime: '-',
  },
  {
    id: '7',
    name: 'Karan Mehta',
    badgeNumber: 'SEC007',
    position: 'Security Guard',
    shift: 'morning',
    zone: 'CCTV Room',
    status: 'on-duty',
    contact: '+91 98765 00007',
    checkInTime: '06:05 AM',
  },
  {
    id: '8',
    name: 'Sanjay Gupta',
    badgeNumber: 'SEC008',
    position: 'Security Guard',
    shift: 'afternoon',
    zone: 'Main Entrance',
    status: 'off-duty',
    contact: '+91 98765 00008',
    checkInTime: '-',
  },
];

export default function SecurityPersonnelPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterShift, setFilterShift] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredPersonnel = mockPersonnel.filter(person => {
    const matchesSearch = 
      person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      person.badgeNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      person.zone.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesShift = filterShift === 'all' || person.shift === filterShift;
    const matchesStatus = filterStatus === 'all' || person.status === filterStatus;

    return matchesSearch && matchesShift && matchesStatus;
  });

  const getStatusBadge = (status: Personnel['status']) => {
    const configs = {
      'on-duty': { label: 'On Duty', className: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300', icon: CheckCircle },
      'off-duty': { label: 'Off Duty', className: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300', icon: XCircle },
      'on-break': { label: 'On Break', className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300', icon: Clock },
    };
    return configs[status];
  };

  const getShiftBadge = (shift: Personnel['shift']) => {
    const colors = {
      morning: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      afternoon: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
      night: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
    };
    return colors[shift];
  };

  const stats = {
    total: mockPersonnel.length,
    onDuty: mockPersonnel.filter(p => p.status === 'on-duty').length,
    onBreak: mockPersonnel.filter(p => p.status === 'on-break').length,
    offDuty: mockPersonnel.filter(p => p.status === 'off-duty').length,
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Security Personnel</h1>
            <p className="text-muted-foreground mt-1">
              Manage security staff roster and shifts
            </p>
          </div>
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Add Personnel
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-card border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Staff</p>
                <p className="text-2xl font-bold mt-1">{stats.total}</p>
              </div>
              <Shield className="h-8 w-8 text-primary opacity-50" />
            </div>
          </div>
          <div className="bg-card border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">On Duty</p>
                <p className="text-2xl font-bold mt-1 text-green-600">{stats.onDuty}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600 opacity-50" />
            </div>
          </div>
          <div className="bg-card border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">On Break</p>
                <p className="text-2xl font-bold mt-1 text-yellow-600">{stats.onBreak}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600 opacity-50" />
            </div>
          </div>
          <div className="bg-card border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Off Duty</p>
                <p className="text-2xl font-bold mt-1 text-gray-600">{stats.offDuty}</p>
              </div>
              <XCircle className="h-8 w-8 text-gray-600 opacity-50" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-card border rounded-lg p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, badge, or zone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={filterShift}
              onChange={(e) => setFilterShift(e.target.value)}
              className="px-3 py-2 border rounded-md bg-background text-sm"
            >
              <option value="all">All Shifts</option>
              <option value="morning">Morning</option>
              <option value="afternoon">Afternoon</option>
              <option value="night">Night</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border rounded-md bg-background text-sm"
            >
              <option value="all">All Statuses</option>
              <option value="on-duty">On Duty</option>
              <option value="on-break">On Break</option>
              <option value="off-duty">Off Duty</option>
            </select>
          </div>
        </div>

        {/* Personnel Table */}
        <div className="bg-card border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Badge #</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Shift</TableHead>
                  <TableHead>Zone</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Check-In</TableHead>
                  <TableHead>Contact</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPersonnel.map((person) => {
                  const statusConfig = getStatusBadge(person.status);
                  const StatusIcon = statusConfig.icon;
                  
                  return (
                    <TableRow key={person.id}>
                      <TableCell className="font-mono font-semibold">{person.badgeNumber}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Shield className="h-5 w-5 text-primary" />
                          </div>
                          <span className="font-medium">{person.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{person.position}</TableCell>
                      <TableCell>
                        <Badge className={getShiftBadge(person.shift)}>
                          {person.shift.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell>{person.zone}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <StatusIcon className="h-4 w-4" />
                          <Badge className={statusConfig.className}>
                            {statusConfig.label}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {person.checkInTime}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {person.contact}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>

        {filteredPersonnel.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No personnel found matching your criteria</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
