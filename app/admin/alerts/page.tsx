'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Bell, CheckCircle, XCircle, AlertCircle, Plus, Filter } from 'lucide-react';

interface Alert {
  id: string;
  title: string;
  description: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  category: 'security' | 'medical' | 'traffic' | 'system' | 'booking';
  status: 'active' | 'acknowledged' | 'resolved';
  timestamp: string;
  source: string;
}

const mockAlerts: Alert[] = [
  {
    id: '1',
    title: 'High Crowd Density Detected',
    description: 'Main darshan area has exceeded 80% capacity. Consider crowd control measures.',
    severity: 'high',
    category: 'security',
    status: 'active',
    timestamp: '2025-10-08T09:30:00',
    source: 'Security System',
  },
  {
    id: '2',
    title: 'Medical Emergency Resolved',
    description: 'Patient with chest pain successfully treated and stabilized.',
    severity: 'critical',
    category: 'medical',
    status: 'resolved',
    timestamp: '2025-10-08T08:15:00',
    source: 'Medical Team',
  },
  {
    id: '3',
    title: 'Parking Lot B Full',
    description: 'Parking Lot B has reached maximum capacity. Divert vehicles to Lot C.',
    severity: 'medium',
    category: 'traffic',
    status: 'acknowledged',
    timestamp: '2025-10-08T07:45:00',
    source: 'Traffic Management',
  },
  {
    id: '4',
    title: 'System Backup Completed',
    description: 'Daily system backup completed successfully at 3:00 AM.',
    severity: 'low',
    category: 'system',
    status: 'resolved',
    timestamp: '2025-10-08T03:00:00',
    source: 'IT Department',
  },
  {
    id: '5',
    title: 'Suspicious Activity Detected',
    description: 'Unattended bag detected near North Gate. Security team dispatched.',
    severity: 'critical',
    category: 'security',
    status: 'active',
    timestamp: '2025-10-08T10:15:00',
    source: 'CCTV Monitoring',
  },
  {
    id: '6',
    title: 'Booking System Performance',
    description: 'Booking response time increased to 3.5s. Investigating potential database issues.',
    severity: 'medium',
    category: 'system',
    status: 'acknowledged',
    timestamp: '2025-10-08T06:20:00',
    source: 'System Monitor',
  },
  {
    id: '7',
    title: 'Ambulance Dispatched',
    description: 'Ambulance AMB-002 dispatched to East Wing for elderly devotee with breathing issues.',
    severity: 'high',
    category: 'medical',
    status: 'acknowledged',
    timestamp: '2025-10-08T09:50:00',
    source: 'Medical Control',
  },
  {
    id: '8',
    title: 'Traffic Congestion Alert',
    description: 'Heavy traffic detected at main entrance. Estimated wait time: 15 minutes.',
    severity: 'low',
    category: 'traffic',
    status: 'active',
    timestamp: '2025-10-08T08:30:00',
    source: 'Traffic Sensors',
  },
];

export default function AdminAlertsPage() {
  const [filterSeverity, setFilterSeverity] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredAlerts = mockAlerts.filter(alert => {
    const matchesSeverity = filterSeverity === 'all' || alert.severity === filterSeverity;
    const matchesCategory = filterCategory === 'all' || alert.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || alert.status === filterStatus;
    return matchesSeverity && matchesCategory && matchesStatus;
  });

  const getSeverityConfig = (severity: Alert['severity']) => {
    const configs = {
      critical: {
        icon: XCircle,
        className: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 border-red-200',
        badge: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
      },
      high: {
        icon: AlertTriangle,
        className: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300 border-orange-200',
        badge: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
      },
      medium: {
        icon: AlertCircle,
        className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 border-yellow-200',
        badge: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
      },
      low: {
        icon: Bell,
        className: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 border-blue-200',
        badge: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      },
    };
    return configs[severity];
  };

  const getStatusBadge = (status: Alert['status']) => {
    const configs = {
      active: { label: 'Active', className: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' },
      acknowledged: { label: 'Acknowledged', className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' },
      resolved: { label: 'Resolved', className: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' },
    };
    return configs[status];
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
            <h1 className="text-2xl md:text-3xl font-bold">System Alerts</h1>
            <p className="text-muted-foreground mt-1">
              Monitor and manage all system alerts
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Alert
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
                <p className="text-sm text-muted-foreground">Active Alerts</p>
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
                <p className="text-sm text-muted-foreground">Resolved</p>
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
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 border rounded-md bg-background text-sm"
            >
              <option value="all">All Categories</option>
              <option value="security">Security</option>
              <option value="medical">Medical</option>
              <option value="traffic">Traffic</option>
              <option value="system">System</option>
              <option value="booking">Booking</option>
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
            const statusConfig = getStatusBadge(alert.status);
            const Icon = severityConfig.icon;

            return (
              <div
                key={alert.id}
                className={`bg-card border-2 rounded-lg p-4 ${severityConfig.className}`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{alert.title}</h3>
                        <p className="text-sm opacity-90 mt-1">{alert.description}</p>
                      </div>
                      <Badge className={statusConfig.className}>
                        {statusConfig.label}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm opacity-75 mt-3">
                      <span className="flex items-center gap-1">
                        <Badge className={severityConfig.badge}>
                          {alert.severity.toUpperCase()}
                        </Badge>
                      </span>
                      <span>Category: {alert.category.toUpperCase()}</span>
                      <span>Source: {alert.source}</span>
                      <span>
                        {new Date(alert.timestamp).toLocaleString('en-IN')}
                      </span>
                    </div>
                    {alert.status === 'active' && (
                      <div className="flex gap-2 mt-4">
                        <Button size="sm" variant="outline">
                          Acknowledge
                        </Button>
                        <Button size="sm" variant="outline">
                          Resolve
                        </Button>
                        <Button size="sm" variant="outline">
                          View Details
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
