'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  AlertTriangle, 
  Bell, 
  Shield, 
  Heart, 
  Car, 
  Video,
  CheckCircle, 
  XCircle,
  Clock,
  Filter,
  Download
} from 'lucide-react';

interface Alert {
  id: string;
  title: string;
  description: string;
  department: 'security' | 'medical' | 'traffic' | 'system';
  severity: 'critical' | 'high' | 'medium' | 'low';
  status: 'active' | 'acknowledged' | 'resolved';
  timestamp: string;
  location?: string;
  assignedTo?: string;
}

const mockAlerts: Alert[] = [
  {
    id: '1',
    title: 'High Crowd Density Alert',
    description: 'Main Darshan Hall has exceeded 80% capacity. Immediate crowd control required.',
    department: 'security',
    severity: 'high',
    status: 'active',
    timestamp: '2025-10-08T10:15:00',
    location: 'Main Darshan Hall',
    assignedTo: 'Security Chief',
  },
  {
    id: '2',
    title: 'Medical Emergency - Critical',
    description: 'Elderly patient with chest pain. Ambulance AMB-002 dispatched.',
    department: 'medical',
    severity: 'critical',
    status: 'acknowledged',
    timestamp: '2025-10-08T10:10:00',
    location: 'Prayer Hall',
    assignedTo: 'Dr. Arvind Reddy',
  },
  {
    id: '3',
    title: 'Parking Lot Full',
    description: 'Parking Lot B has reached maximum capacity. Redirecting to Lot C.',
    department: 'traffic',
    severity: 'medium',
    status: 'acknowledged',
    timestamp: '2025-10-08T10:05:00',
    location: 'Parking Lot B',
    assignedTo: 'Traffic Manager',
  },
  {
    id: '4',
    title: 'CCTV Camera Offline',
    description: 'Camera CAM-004 at East Gate is not responding. Technical team notified.',
    department: 'system',
    severity: 'medium',
    status: 'active',
    timestamp: '2025-10-08T09:50:00',
    location: 'East Gate',
  },
  {
    id: '5',
    title: 'Unauthorized Access Attempt',
    description: 'Individual attempted entry to restricted area without authorization.',
    department: 'security',
    severity: 'high',
    status: 'resolved',
    timestamp: '2025-10-08T09:30:00',
    location: 'North Gate',
    assignedTo: 'Vikram Singh',
  },
  {
    id: '6',
    title: 'Ambulance Deployed',
    description: 'AMB-005 dispatched to East Wing for breathing difficulty case.',
    department: 'medical',
    severity: 'high',
    status: 'active',
    timestamp: '2025-10-08T09:20:00',
    location: 'East Wing',
    assignedTo: 'Dr. Kavita Mehta',
  },
  {
    id: '7',
    title: 'Traffic Congestion',
    description: 'Heavy traffic at main entrance. Wait time exceeds 15 minutes.',
    department: 'traffic',
    severity: 'low',
    status: 'acknowledged',
    timestamp: '2025-10-08T09:00:00',
    location: 'Main Entrance',
  },
  {
    id: '8',
    title: 'System Backup Completed',
    description: 'Daily system backup completed successfully.',
    department: 'system',
    severity: 'low',
    status: 'resolved',
    timestamp: '2025-10-08T03:00:00',
  },
];

export default function ControlRoomAlertsPage() {
  const [filterDepartment, setFilterDepartment] = useState<string>('all');
  const [filterSeverity, setFilterSeverity] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredAlerts = mockAlerts.filter(alert => {
    const matchesDept = filterDepartment === 'all' || alert.department === filterDepartment;
    const matchesSev = filterSeverity === 'all' || alert.severity === filterSeverity;
    const matchesStatus = filterStatus === 'all' || alert.status === filterStatus;
    return matchesDept && matchesSev && matchesStatus;
  });

  const getSeverityConfig = (severity: Alert['severity']) => {
    const configs = {
      critical: {
        label: 'Critical',
        className: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
        borderColor: 'border-red-500',
        icon: XCircle,
      },
      high: {
        label: 'High',
        className: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
        borderColor: 'border-orange-500',
        icon: AlertTriangle,
      },
      medium: {
        label: 'Medium',
        className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
        borderColor: 'border-yellow-500',
        icon: Bell,
      },
      low: {
        label: 'Low',
        className: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
        borderColor: 'border-blue-500',
        icon: Bell,
      },
    };
    return configs[severity];
  };

  const getStatusConfig = (status: Alert['status']) => {
    const configs = {
      active: {
        label: 'Active',
        className: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
        icon: AlertTriangle,
      },
      acknowledged: {
        label: 'Acknowledged',
        className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
        icon: Clock,
      },
      resolved: {
        label: 'Resolved',
        className: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
        icon: CheckCircle,
      },
    };
    return configs[status];
  };

  const getDepartmentIcon = (department: Alert['department']) => {
    const icons = {
      security: Shield,
      medical: Heart,
      traffic: Car,
      system: Video,
    };
    return icons[department];
  };

  const stats = {
    total: mockAlerts.length,
    active: mockAlerts.filter(a => a.status === 'active').length,
    critical: mockAlerts.filter(a => a.severity === 'critical').length,
    resolved: mockAlerts.filter(a => a.status === 'resolved').length,
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Alert Management</h1>
            <p className="text-muted-foreground mt-1">
              Centralized alert monitoring and response
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
                <p className="text-sm text-muted-foreground">Total Alerts</p>
                <p className="text-2xl font-bold mt-1">{stats.total}</p>
              </div>
              <Bell className="h-8 w-8 text-primary opacity-50" />
            </div>
          </div>
          <div className="bg-card border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active</p>
                <p className="text-2xl font-bold mt-1 text-red-600">{stats.active}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600 opacity-50" />
            </div>
          </div>
          <div className="bg-card border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Critical</p>
                <p className="text-2xl font-bold mt-1 text-orange-600">{stats.critical}</p>
              </div>
              <XCircle className="h-8 w-8 text-orange-600 opacity-50" />
            </div>
          </div>
          <div className="bg-card border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Resolved Today</p>
                <p className="text-2xl font-bold mt-1 text-green-600">{stats.resolved}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600 opacity-50" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-card border rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Filters</span>
          </div>
          <div className="flex flex-col lg:flex-row gap-4">
            <select
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
              className="px-3 py-2 border rounded-md bg-background text-sm"
            >
              <option value="all">All Departments</option>
              <option value="security">Security</option>
              <option value="medical">Medical</option>
              <option value="traffic">Traffic</option>
              <option value="system">System</option>
            </select>
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
              <option value="active">Active</option>
              <option value="acknowledged">Acknowledged</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
        </div>

        {/* Alerts List */}
        <div className="space-y-4">
          {filteredAlerts.map((alert) => {
            const severityConfig = getSeverityConfig(alert.severity);
            const statusConfig = getStatusConfig(alert.status);
            const DeptIcon = getDepartmentIcon(alert.department);
            const SevIcon = severityConfig.icon;
            const StatIcon = statusConfig.icon;

            return (
              <div
                key={alert.id}
                className={`bg-card border-2 rounded-lg p-6 ${severityConfig.borderColor}`}
              >
                <div className="flex items-start gap-4">
                  <div className={`h-12 w-12 rounded-lg ${severityConfig.className} flex items-center justify-center flex-shrink-0`}>
                    <SevIcon className="h-6 w-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{alert.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {alert.description}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Badge className={severityConfig.className}>
                          {severityConfig.label}
                        </Badge>
                        <div className="flex items-center gap-2">
                          <StatIcon className="h-4 w-4" />
                          <Badge className={statusConfig.className}>
                            {statusConfig.label}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm mt-3">
                      <div className="flex items-center gap-2">
                        <DeptIcon className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">
                          {alert.department.charAt(0).toUpperCase() + alert.department.slice(1)}
                        </span>
                      </div>
                      {alert.location && (
                        <span className="text-muted-foreground">
                          📍 {alert.location}
                        </span>
                      )}
                      {alert.assignedTo && (
                        <span className="text-muted-foreground">
                          👤 {alert.assignedTo}
                        </span>
                      )}
                      <span className="text-muted-foreground">
                        🕐 {new Date(alert.timestamp).toLocaleString('en-IN')}
                      </span>
                    </div>

                    {alert.status === 'active' && (
                      <div className="flex gap-2 mt-4">
                        <Button size="sm" variant="outline">
                          Acknowledge
                        </Button>
                        <Button size="sm" variant="outline">
                          Assign
                        </Button>
                        <Button size="sm" variant="outline">
                          Resolve
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredAlerts.length === 0 && (
          <div className="text-center py-12 bg-card border rounded-lg">
            <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-3" />
            <p className="text-lg font-medium">No alerts found</p>
            <p className="text-sm text-muted-foreground mt-1">
              All systems are running smoothly
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
