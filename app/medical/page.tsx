'use client';

/**
 * Medical Dashboard
 * Emergency response, ambulance tracking, and health incident management
 */

import { useEffect } from 'react';
import { DashboardLayout, StatCard } from '@/components/dashboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useTempleStore } from '@/lib/stores/temple-store';
import { useAlertStore } from '@/lib/stores/alert-store';
import {
  Heart,
  Ambulance,
  Activity,
  AlertTriangle,
  CheckCircle,
  MapPin,
  Clock,
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export default function MedicalDashboardPage() {
  const { temples, fetchTemples } = useTempleStore();
  const { alerts, fetchAlerts } = useAlertStore();

  useEffect(() => {
    fetchTemples();
    fetchAlerts();
  }, [fetchTemples, fetchAlerts]);

  const medicalAlerts = alerts.filter(a => a.type === 'medical-emergency');
  const activeEmergencies = medicalAlerts.filter(a => a.status === 'active');

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Medical Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Emergency response and health services management
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-4">
          <StatCard
            title="Medical Staff"
            value={12}
            icon={Heart}
            description="On duty"
            variant="default"
          />
          <StatCard
            title="Ambulances Ready"
            value="8/8"
            icon={Ambulance}
            description="All operational"
            variant="success"
          />
          <StatCard
            title="Active Emergencies"
            value={activeEmergencies.length}
            icon={AlertTriangle}
            variant={activeEmergencies.length > 0 ? 'danger' : 'success'}
          />
          <StatCard
            title="Avg Response Time"
            value="3.5m"
            icon={Clock}
            description="Last 24 hours"
            variant="success"
          />
        </div>

        {/* Active Emergencies */}
        <Card>
          <CardHeader>
            <CardTitle>Active Medical Emergencies</CardTitle>
            <CardDescription>Incidents requiring immediate attention</CardDescription>
          </CardHeader>
          <CardContent>
            {activeEmergencies.length === 0 ? (
              <div className="text-center py-8">
                <CheckCircle className="h-12 w-12 mx-auto text-green-500 mb-4" />
                <p className="text-muted-foreground">No active emergencies</p>
              </div>
            ) : (
              <div className="space-y-3">
                {activeEmergencies.map((emergency) => (
                  <div key={emergency.id} className="flex items-start gap-3 p-4 border-2 border-red-200 rounded-lg bg-red-50">
                    <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 animate-pulse" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium">{emergency.title}</p>
                        <Badge variant="destructive">{emergency.severity}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{emergency.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatDistanceToNow(new Date(emergency.timestamp), { addSuffix: true })}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button size="sm" variant="destructive">
                        <Ambulance className="h-4 w-4 mr-2" />
                        Dispatch
                      </Button>
                      <Button size="sm" variant="outline">
                        Update
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Medical Facilities */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Medical Facilities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {temples.map((temple) => (
                  <div key={temple.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Heart className="h-5 w-5 text-red-500" />
                      <div>
                        <p className="font-medium">{temple.name}</p>
                        <p className="text-sm text-muted-foreground">
                          First Aid Station
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">3 staff</Badge>
                      <Badge className="bg-green-500">
                        <Activity className="h-3 w-3 mr-1" />
                        Operational
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ambulance Fleet</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {temples.map((temple, idx) => (
                  <div key={temple.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Ambulance className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="font-medium">Ambulance {idx + 1}-{idx + 2}</p>
                        <p className="text-sm text-muted-foreground">
                          {temple.location.city}
                        </p>
                      </div>
                    </div>
                    <Badge className="bg-green-500">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Ready
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Today's Cases</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground mt-1">
                5 minor, 2 moderate, 1 critical
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Medical Supplies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">95%</div>
              <p className="text-xs text-muted-foreground mt-1">
                Stock level - Good condition
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Ambulance Dispatches</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground mt-1">
                This week • +20% from last week
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
