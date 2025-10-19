'use client';

/**
 * Security Dashboard
 * Personnel tracking, CCTV monitoring, and incident management
 */

import { useEffect } from 'react';
import { DashboardLayout, StatCard } from '@/components/dashboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useTempleStore } from '@/lib/stores/temple-store';
import { useAlertStore } from '@/lib/stores/alert-store';
import {
  Shield,
  Users,
  Camera,
  AlertTriangle,
  CheckCircle,
  Clock,
  MapPin,
  Activity,
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export default function SecurityDashboardPage() {
  const { temples, fetchTemples } = useTempleStore();
  const { alerts, fetchAlerts } = useAlertStore();

  useEffect(() => {
    fetchTemples();
    fetchAlerts();
  }, [fetchTemples, fetchAlerts]);

  const securityAlerts = alerts.filter(a => a.type === 'security-breach');
  const activeIncidents = securityAlerts.filter(a => a.status === 'active');

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Security Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Monitor personnel, incidents, and surveillance
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-4">
          <StatCard
            title="Personnel on Duty"
            value={24}
            icon={Shield}
            description="Across all temples"
            variant="default"
          />
          <StatCard
            title="CCTV Cameras"
            value="48/48"
            icon={Camera}
            description="All operational"
            variant="success"
          />
          <StatCard
            title="Active Incidents"
            value={activeIncidents.length}
            icon={AlertTriangle}
            variant={activeIncidents.length > 0 ? 'warning' : 'success'}
          />
          <StatCard
            title="Patrol Status"
            value="Active"
            icon={Activity}
            description="All zones covered"
            variant="success"
          />
        </div>

        {/* Active Incidents */}
        <Card>
          <CardHeader>
            <CardTitle>Active Incidents</CardTitle>
            <CardDescription>Security breaches requiring attention</CardDescription>
          </CardHeader>
          <CardContent>
            {activeIncidents.length === 0 ? (
              <div className="text-center py-8">
                <CheckCircle className="h-12 w-12 mx-auto text-green-500 mb-4" />
                <p className="text-muted-foreground">No active incidents</p>
              </div>
            ) : (
              <div className="space-y-3">
                {activeIncidents.map((incident) => (
                  <div key={incident.id} className="flex items-start gap-3 p-4 border rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium">{incident.title}</p>
                        <Badge variant="outline">{incident.severity}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{incident.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatDistanceToNow(new Date(incident.timestamp), { addSuffix: true })}
                      </p>
                    </div>
                    <Button size="sm">Respond</Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Personnel Status */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Personnel by Location</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {temples.map((temple) => (
                  <div key={temple.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">{temple.name}</p>
                        <p className="text-sm text-muted-foreground">{temple.location.city}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">
                        <Users className="h-3 w-3 mr-1" />
                        6 personnel
                      </Badge>
                      <Badge className="bg-green-500">
                        <Activity className="h-3 w-3 mr-1" />
                        Active
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>CCTV Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {temples.map((temple, idx) => (
                  <div key={temple.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Camera className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">{temple.name}</p>
                        <p className="text-sm text-muted-foreground">12 cameras</p>
                      </div>
                    </div>
                    <Badge className="bg-green-500">
                      <Activity className="h-3 w-3 mr-1 animate-pulse" />
                      12/12 Online
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
