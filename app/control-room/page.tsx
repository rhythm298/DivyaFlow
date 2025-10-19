'use client';

/**
 * Control Room Master Dashboard
 * Unified command center for all temple operations
 */

import { useEffect } from 'react';
import { DashboardLayout, StatCard } from '@/components/dashboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTempleStore } from '@/lib/stores/temple-store';
import { useAlertStore } from '@/lib/stores/alert-store';
import { useBookingStore } from '@/lib/stores/booking-store';
import {
  Activity,
  AlertTriangle,
  Camera,
  MapPin,
  Users,
  Shield,
  Heart,
  Car,
  Radio,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  Bell,
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export default function ControlRoomPage() {
  const { temples, fetchTemples } = useTempleStore();
  const { alerts, fetchAlerts } = useAlertStore();
  const { bookings, fetchBookings, getTodayBookings } = useBookingStore();

  useEffect(() => {
    fetchTemples();
    fetchAlerts();
    fetchBookings();
  }, [fetchTemples, fetchAlerts, fetchBookings]);

  const totalOccupancy = temples.reduce((sum, t) => sum + t.capacity.current, 0);
  const totalCapacity = temples.reduce((sum, t) => sum + t.capacity.max, 0);
  const activeAlerts = alerts.filter((a) => a.status === 'active');
  const criticalAlerts = activeAlerts.filter((a) => a.severity === 'critical');
  const todayBookings = getTodayBookings();

  return (
    <DashboardLayout>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Radio className="h-8 w-8 text-primary" />
              Control Room
            </h1>
            <p className="text-muted-foreground mt-1">
              Master command center • Real-time operations monitoring
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-lg px-4 py-2">
              <Activity className="h-4 w-4 mr-2 animate-pulse text-green-500" />
              All Systems Operational
            </Badge>
          </div>
        </div>

        {/* Critical Alerts Banner */}
        {criticalAlerts.length > 0 && (
          <Card className="border-destructive bg-destructive/10">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <AlertTriangle className="h-8 w-8 text-destructive animate-pulse" />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">
                    {criticalAlerts.length} Critical Alert{criticalAlerts.length > 1 ? 's' : ''}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Immediate attention required
                  </p>
                </div>
                <Button variant="destructive">View All Alerts</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Key Metrics Row */}
        <div className="grid gap-4 md:grid-cols-5">
          <StatCard
            title="System Health"
            value="99.9%"
            icon={Activity}
            variant="success"
            description="All systems online"
          />
          <StatCard
            title="Total Occupancy"
            value={`${Math.round((totalOccupancy / totalCapacity) * 100)}%`}
            icon={Users}
            description={`${totalOccupancy} / ${totalCapacity}`}
            variant={totalOccupancy / totalCapacity > 0.8 ? 'warning' : 'default'}
          />
          <StatCard
            title="Active Alerts"
            value={activeAlerts.length}
            icon={AlertTriangle}
            variant={criticalAlerts.length > 0 ? 'danger' : activeAlerts.length > 5 ? 'warning' : 'default'}
            description={`${criticalAlerts.length} critical`}
          />
          <StatCard
            title="Today's Visitors"
            value={todayBookings.length}
            icon={TrendingUp}
            variant="default"
            trend={{ value: 15.2, isPositive: true }}
          />
          <StatCard
            title="Avg Response Time"
            value="1.2m"
            icon={Clock}
            variant="success"
            description="Alert resolution"
          />
        </div>

        {/* Main Grid Layout */}
        <div className="grid gap-4 md:grid-cols-3">
          {/* Left Column - CCTV & Temple Status */}
          <div className="md:col-span-2 space-y-4">
            {/* Live CCTV Feeds */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Camera className="h-5 w-5" />
                      Live Camera Feeds
                    </CardTitle>
                    <CardDescription>Real-time surveillance across all temples</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">View All</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {temples.slice(0, 4).map((temple, index) => (
                    <div
                      key={temple.id}
                      className="relative aspect-video rounded-lg bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden group cursor-pointer"
                    >
                      {/* Simulated CCTV Feed */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Camera className="h-12 w-12 text-gray-600" />
                      </div>
                      <div className="absolute top-2 left-2 flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                        <span className="text-xs text-white font-medium">LIVE</span>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                        <p className="text-white text-sm font-medium">{temple.name}</p>
                        <p className="text-white/70 text-xs">
                          CAM-{index + 1} • Main Entrance
                        </p>
                      </div>
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button size="sm" variant="secondary">
                          <Activity className="h-3 w-3 mr-1" />
                          Expand
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Temple Status Grid */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Temple Status Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {temples.map((temple) => {
                    const occupancyPercent = Math.round(
                      (temple.capacity.current / temple.capacity.max) * 100
                    );
                    const isHighOccupancy = occupancyPercent > 80;
                    const isFullCapacity = occupancyPercent > 95;

                    return (
                      <div
                        key={temple.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:border-primary transition-colors"
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                            <MapPin className="h-6 w-6 text-primary" />
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold">{temple.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {temple.location.city} • {temple.location.state}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-2xl font-bold">{occupancyPercent}%</p>
                            <p className="text-xs text-muted-foreground">
                              {temple.capacity.current.toLocaleString()} / {temple.capacity.max.toLocaleString()}
                            </p>
                          </div>
                          <div className="flex flex-col gap-2">
                            <Badge
                              variant={isFullCapacity ? 'destructive' : isHighOccupancy ? 'default' : 'secondary'}
                            >
                              {temple.status}
                            </Badge>
                            {isFullCapacity && (
                              <Badge variant="destructive" className="text-xs">
                                ⚠ At Capacity
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Alerts & Team Status */}
          <div className="space-y-4">
            {/* Active Alerts */}
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Active Alerts
                  </CardTitle>
                  <Badge variant="outline">{activeAlerts.length}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-[600px] overflow-y-auto">
                  {activeAlerts.length === 0 ? (
                    <div className="text-center py-8">
                      <CheckCircle className="h-12 w-12 mx-auto text-green-500 mb-2" />
                      <p className="text-sm text-muted-foreground">All Clear</p>
                    </div>
                  ) : (
                    activeAlerts.map((alert) => {
                      const icons: Record<string, any> = {
                        'crowd-overflow': Users,
                        'security-breach': Shield,
                        'medical-emergency': Heart,
                        fire: AlertTriangle,
                        'technical-failure': Activity,
                        'weather-alert': Activity,
                      };
                      const Icon = icons[alert.type] || AlertTriangle;

                      const severityColors = {
                        low: 'bg-blue-100 border-blue-300',
                        medium: 'bg-yellow-100 border-yellow-300',
                        high: 'bg-orange-100 border-orange-300',
                        critical: 'bg-red-100 border-red-300',
                      };

                      return (
                        <div
                          key={alert.id}
                          className={`p-3 border-2 rounded-lg ${severityColors[alert.severity]}`}
                        >
                          <div className="flex items-start gap-2">
                            <Icon className="h-5 w-5 mt-0.5" />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <p className="font-medium text-sm">{alert.title}</p>
                                <Badge variant="outline" className="text-xs">
                                  {alert.severity}
                                </Badge>
                              </div>
                              <p className="text-xs text-muted-foreground line-clamp-2">
                                {alert.description}
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                {formatDistanceToNow(new Date(alert.timestamp), { addSuffix: true })}
                              </p>
                              <div className="mt-2 flex gap-2">
                                <Button size="sm" variant="outline" className="h-7 text-xs">
                                  Acknowledge
                                </Button>
                                <Button size="sm" className="h-7 text-xs">
                                  Resolve
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Team Status */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Shield className="h-4 w-4 text-blue-500" />
                Security
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">Personnel on duty</p>
              <div className="mt-2">
                <Badge variant="outline" className="bg-green-50">
                  <Activity className="h-3 w-3 mr-1" />
                  All Active
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Heart className="h-4 w-4 text-red-500" />
                Medical
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">Ambulances ready</p>
              <div className="mt-2">
                <Badge variant="outline" className="bg-green-50">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Ready
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Car className="h-4 w-4 text-yellow-500" />
                Traffic
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
              <p className="text-xs text-muted-foreground">Parking spaces available</p>
              <div className="mt-2">
                <Badge variant="outline">
                  65% Occupied
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Camera className="h-4 w-4 text-purple-500" />
                CCTV
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">48/48</div>
              <p className="text-xs text-muted-foreground">Cameras online</p>
              <div className="mt-2">
                <Badge variant="outline" className="bg-green-50">
                  100% Operational
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
