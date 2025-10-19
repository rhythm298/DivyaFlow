'use client';

/**
 * Admin Main Dashboard
 * Overview of entire temple management system
 */

import { useEffect } from 'react';
import Link from 'next/link';
import { DashboardLayout, StatCard } from '@/components/dashboard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTempleStore } from '@/lib/stores/temple-store';
import { useAlertStore } from '@/lib/stores/alert-store';
import { useBookingStore } from '@/lib/stores/booking-store';
import {
  Users,
  MapPin,
  Calendar,
  AlertTriangle,
  TrendingUp,
  Activity,
  Shield,
  Heart,
  Car,
  BarChart3,
  ArrowRight,
  CheckCircle,
  XCircle,
  Clock,
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export default function AdminDashboardPage() {
  const { temples, fetchTemples } = useTempleStore();
  const { alerts, fetchAlerts } = useAlertStore();
  const { bookings, fetchBookings, getRecentBookings } = useBookingStore();

  useEffect(() => {
    fetchTemples();
    fetchAlerts();
    fetchBookings();
  }, [fetchTemples, fetchAlerts, fetchBookings]);

  const totalCapacity = temples.reduce((sum, t) => sum + t.capacity.max, 0);
  const currentOccupancy = temples.reduce((sum, t) => sum + t.capacity.current, 0);
  const activeAlerts = alerts.filter((a) => a.status === 'active');
  const recentBookings = getRecentBookings(10);

  const confirmedBookings = bookings.filter((b) => b.status === 'confirmed').length;
  const completedBookings = bookings.filter((b) => b.status === 'completed').length;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            System overview and management controls
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Visitors"
            value={currentOccupancy.toLocaleString()}
            icon={Users}
            description={`Capacity: ${totalCapacity.toLocaleString()}`}
            trend={{
              value: 12.5,
              isPositive: true,
            }}
          />
          <StatCard
            title="Active Temples"
            value={temples.filter((t) => t.status === 'open').length}
            icon={MapPin}
            description={`${temples.length} total temples`}
            variant="success"
          />
          <StatCard
            title="Today's Bookings"
            value={confirmedBookings}
            icon={Calendar}
            description={`${completedBookings} completed`}
            variant="default"
          />
          <StatCard
            title="Active Alerts"
            value={activeAlerts.length}
            icon={AlertTriangle}
            description="Require attention"
            variant={activeAlerts.length > 5 ? 'danger' : 'warning'}
          />
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-4">
              <Link href="/admin/analytics">
                <Button variant="outline" className="w-full h-20 flex flex-col gap-2">
                  <BarChart3 className="h-6 w-6" />
                  <span>Analytics</span>
                </Button>
              </Link>
              <Link href="/admin/temples">
                <Button variant="outline" className="w-full h-20 flex flex-col gap-2">
                  <MapPin className="h-6 w-6" />
                  <span>Manage Temples</span>
                </Button>
              </Link>
              <Link href="/admin/bookings">
                <Button variant="outline" className="w-full h-20 flex flex-col gap-2">
                  <Calendar className="h-6 w-6" />
                  <span>View Bookings</span>
                </Button>
              </Link>
              <Link href="/admin/alerts">
                <Button variant="outline" className="w-full h-20 flex flex-col gap-2">
                  <AlertTriangle className="h-6 w-6" />
                  <span>Manage Alerts</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Temple Overview and Recent Activity */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Temple Status */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Temple Overview</CardTitle>
                  <CardDescription>Real-time status of all temples</CardDescription>
                </div>
                <Link href="/admin/temples">
                  <Button variant="ghost" size="sm">
                    View All <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {temples.map((temple) => {
                  const occupancyPercent = Math.round(
                    (temple.capacity.current / temple.capacity.max) * 100
                  );
                  const isHighOccupancy = occupancyPercent > 80;

                  return (
                    <div
                      key={temple.id}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <MapPin className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{temple.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {temple.location.city}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="text-sm font-medium">{occupancyPercent}%</p>
                          <p className="text-xs text-muted-foreground">
                            {temple.capacity.current} / {temple.capacity.max}
                          </p>
                        </div>
                        <Badge variant={isHighOccupancy ? 'destructive' : 'default'}>
                          {temple.status}
                        </Badge>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Recent Alerts */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Alerts</CardTitle>
                  <CardDescription>Latest system notifications</CardDescription>
                </div>
                <Link href="/admin/alerts">
                  <Button variant="ghost" size="sm">
                    View All <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {alerts.slice(0, 5).map((alert) => {
                  const icons: Record<string, any> = {
                    crowd: Users,
                    security: Shield,
                    medical: Heart,
                    traffic: Car,
                    emergency: AlertTriangle,
                  };
                  const Icon = icons[alert.type] || AlertTriangle;

                  const severityColors = {
                    low: 'text-blue-500',
                    medium: 'text-yellow-500',
                    high: 'text-orange-500',
                    critical: 'text-red-500',
                  };

                  return (
                    <div
                      key={alert.id}
                      className="flex items-start gap-3 p-3 border rounded-lg"
                    >
                      <Icon className={`h-5 w-5 ${severityColors[alert.severity]} mt-0.5`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-sm">{alert.title}</p>
                          <Badge variant="outline" className="text-xs">
                            {alert.severity}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {alert.description}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {formatDistanceToNow(new Date(alert.timestamp), { addSuffix: true })}
                        </p>
                      </div>
                      {alert.status === 'active' ? (
                        <Clock className="h-4 w-4 text-orange-500" />
                      ) : (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Bookings */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Bookings</CardTitle>
                <CardDescription>Latest darshan reservations</CardDescription>
              </div>
              <Link href="/admin/bookings">
                <Button variant="ghost" size="sm">
                  View All <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentBookings.map((booking) => {
                const statusIcons = {
                  confirmed: CheckCircle,
                  pending: Clock,
                  cancelled: XCircle,
                  completed: CheckCircle,
                  'checked-in': Activity,
                  'no-show': XCircle,
                };
                const Icon = statusIcons[booking.status] || Clock;

                const statusColors = {
                  confirmed: 'text-green-500',
                  pending: 'text-yellow-500',
                  cancelled: 'text-red-500',
                  completed: 'text-blue-500',
                  'checked-in': 'text-green-500',
                  'no-show': 'text-red-500',
                };

                return (
                  <div
                    key={booking.id}
                    className="flex items-center justify-between p-3 border rounded-lg hover:border-primary transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`h-5 w-5 ${statusColors[booking.status]}`} />
                      <div>
                        <p className="font-medium text-sm">{booking.devotee.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {booking.temple.name} • {new Date(booking.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">
                          {booking.slot.startTime} - {booking.slot.endTime}
                        </p>
                        <p className="text-xs font-medium">{booking.bookingNumber}</p>
                      </div>
                      <Badge variant="outline">{booking.status}</Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* System Status */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">System Health</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-green-500" />
                <span className="text-2xl font-bold">99.9%</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">All systems operational</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-500" />
                <span className="text-2xl font-bold">1.2m</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Alert resolution time</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">User Satisfaction</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="text-2xl font-bold">4.8/5</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Based on feedback</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
