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
import { Search, AlertTriangle, FileText, Clock, CheckCircle, XCircle, Plus } from 'lucide-react';

interface Incident {
  id: string;
  incidentNumber: string;
  title: string;
  description: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  location: string;
  reportedBy: string;
  status: 'open' | 'investigating' | 'resolved' | 'closed';
  timestamp: string;
  resolvedAt?: string;
}

const mockIncidents: Incident[] = [
  {
    id: '1',
    incidentNumber: 'INC2025001',
    title: 'Unattended Bag Found',
    description: 'Suspicious unattended bag found near North Gate. Bomb squad notified.',
    severity: 'critical',
    location: 'North Gate',
    reportedBy: 'Rajesh Kumar (SEC001)',
    status: 'resolved',
    timestamp: '2025-10-08T08:30:00',
    resolvedAt: '2025-10-08T09:15:00',
  },
  {
    id: '2',
    incidentNumber: 'INC2025002',
    title: 'Crowd Surge Incident',
    description: 'Sudden crowd surge in main darshan area. Extra security deployed.',
    severity: 'high',
    location: 'Main Darshan Hall',
    reportedBy: 'Vikram Singh (SEC002)',
    status: 'investigating',
    timestamp: '2025-10-08T09:00:00',
  },
  {
    id: '3',
    incidentNumber: 'INC2025003',
    title: 'Lost Child Report',
    description: '5-year-old child separated from parents. Reunited successfully.',
    severity: 'medium',
    location: 'West Wing',
    reportedBy: 'Amit Sharma (SEC003)',
    status: 'closed',
    timestamp: '2025-10-08T07:45:00',
    resolvedAt: '2025-10-08T08:00:00',
  },
  {
    id: '4',
    incidentNumber: 'INC2025004',
    title: 'Parking Dispute',
    description: 'Verbal altercation between two devotees over parking space.',
    severity: 'low',
    location: 'Parking Lot A',
    reportedBy: 'Dinesh Reddy (SEC006)',
    status: 'resolved',
    timestamp: '2025-10-08T06:30:00',
    resolvedAt: '2025-10-08T06:45:00',
  },
  {
    id: '5',
    incidentNumber: 'INC2025005',
    title: 'Medical Emergency',
    description: 'Elderly devotee collapsed. Medical team responded immediately.',
    severity: 'critical',
    location: 'Prayer Hall',
    reportedBy: 'Ramesh Yadav (SEC005)',
    status: 'closed',
    timestamp: '2025-10-08T05:20:00',
    resolvedAt: '2025-10-08T06:00:00',
  },
  {
    id: '6',
    incidentNumber: 'INC2025006',
    title: 'Unauthorized Entry Attempt',
    description: 'Individual attempted to enter restricted area without proper authorization.',
    severity: 'high',
    location: 'East Gate',
    reportedBy: 'Karan Mehta (SEC007)',
    status: 'open',
    timestamp: '2025-10-08T10:00:00',
  },
  {
    id: '7',
    incidentNumber: 'INC2025007',
    title: 'Property Damage',
    description: 'Minor damage to railing in south corridor. Maintenance notified.',
    severity: 'low',
    location: 'South Corridor',
    reportedBy: 'Sanjay Gupta (SEC008)',
    status: 'investigating',
    timestamp: '2025-10-08T08:00:00',
  },
];

export default function SecurityIncidentsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSeverity, setFilterSeverity] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredIncidents = mockIncidents.filter(incident => {
    const matchesSearch = 
      incident.incidentNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      incident.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      incident.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSeverity = filterSeverity === 'all' || incident.severity === filterSeverity;
    const matchesStatus = filterStatus === 'all' || incident.status === filterStatus;

    return matchesSearch && matchesSeverity && matchesStatus;
  });

  const getSeverityBadge = (severity: Incident['severity']) => {
    const configs = {
      critical: { label: 'Critical', className: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' },
      high: { label: 'High', className: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300' },
      medium: { label: 'Medium', className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' },
      low: { label: 'Low', className: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' },
    };
    return configs[severity];
  };

  const getStatusBadge = (status: Incident['status']) => {
    const configs = {
      open: { label: 'Open', className: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300', icon: AlertTriangle },
      investigating: { label: 'Investigating', className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300', icon: Clock },
      resolved: { label: 'Resolved', className: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300', icon: CheckCircle },
      closed: { label: 'Closed', className: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300', icon: XCircle },
    };
    return configs[status];
  };

  const stats = {
    total: mockIncidents.length,
    open: mockIncidents.filter(i => i.status === 'open').length,
    investigating: mockIncidents.filter(i => i.status === 'investigating').length,
    resolved: mockIncidents.filter(i => i.status === 'resolved').length,
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Incident Reports</h1>
            <p className="text-muted-foreground mt-1">
              Track and manage security incidents
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Report Incident
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-card border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Incidents</p>
                <p className="text-2xl font-bold mt-1">{stats.total}</p>
              </div>
              <FileText className="h-8 w-8 text-primary opacity-50" />
            </div>
          </div>
          <div className="bg-card border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Open</p>
                <p className="text-2xl font-bold mt-1 text-red-600">{stats.open}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600 opacity-50" />
            </div>
          </div>
          <div className="bg-card border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Investigating</p>
                <p className="text-2xl font-bold mt-1 text-yellow-600">{stats.investigating}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600 opacity-50" />
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
                placeholder="Search by incident #, title, or location..."
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
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border rounded-md bg-background text-sm"
            >
              <option value="all">All Statuses</option>
              <option value="open">Open</option>
              <option value="investigating">Investigating</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </div>

        {/* Incidents Table */}
        <div className="bg-card border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Incident #</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Reported By</TableHead>
                  <TableHead>Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredIncidents.map((incident) => {
                  const severityConfig = getSeverityBadge(incident.severity);
                  const statusConfig = getStatusBadge(incident.status);
                  const StatusIcon = statusConfig.icon;

                  return (
                    <TableRow key={incident.id} className="cursor-pointer hover:bg-muted/50">
                      <TableCell className="font-mono font-semibold">
                        {incident.incidentNumber}
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{incident.title}</p>
                          <p className="text-sm text-muted-foreground line-clamp-1">
                            {incident.description}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{incident.location}</TableCell>
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
                      <TableCell className="text-sm text-muted-foreground">
                        {incident.reportedBy}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(incident.timestamp).toLocaleString('en-IN')}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>

        {filteredIncidents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No incidents found matching your criteria</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
