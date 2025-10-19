'use client';

/**
 * Traffic Dashboard
 * Parking management, vehicle tracking, and shuttle monitoring
 */

import { useEffect } from 'react';
import { DashboardLayout, StatCard } from '@/components/dashboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useTempleStore } from '@/lib/stores/temple-store';
import {
  Car,
  ParkingCircle,
  Bus,
  TrendingUp,
  MapPin,
  Activity,
  CheckCircle,
} from 'lucide-react';

export default function TrafficDashboardPage() {
  const { temples, fetchTemples } = useTempleStore();

  useEffect(() => {
    fetchTemples();
  }, [fetchTemples]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Traffic Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Parking, vehicle entry, and shuttle management
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-4">
          <StatCard
            title="Total Parking"
            value="450"
            icon={ParkingCircle}
            description="156 spaces available"
            variant="default"
          />
          <StatCard
            title="Vehicle Entries"
            value={342}
            icon={Car}
            description="Today"
            variant="default"
            trend={{ value: 8.2, isPositive: true }}
          />
          <StatCard
            title="Shuttle Buses"
            value="12/12"
            icon={Bus}
            description="All operational"
            variant="success"
          />
          <StatCard
            title="Avg Wait Time"
            value="4.2m"
            icon={Activity}
            description="Parking entry"
            variant="success"
          />
        </div>

        {/* Parking Lots */}
        <Card>
          <CardHeader>
            <CardTitle>Parking Lot Status</CardTitle>
            <CardDescription>Real-time occupancy across all locations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {temples.map((temple, idx) => {
                const totalSpaces = 100 + (idx * 20);
                const occupiedSpaces = Math.floor(totalSpaces * (0.5 + Math.random() * 0.4));
                const availableSpaces = totalSpaces - occupiedSpaces;
                const occupancyPercent = Math.round((occupiedSpaces / totalSpaces) * 100);

                return (
                  <div key={temple.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4 flex-1">
                      <ParkingCircle className="h-8 w-8 text-primary" />
                      <div className="flex-1">
                        <p className="font-semibold">{temple.name} Parking</p>
                        <p className="text-sm text-muted-foreground">
                          {temple.location.city} • Lot {idx + 1}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-2xl font-bold">{occupancyPercent}%</p>
                        <p className="text-sm text-muted-foreground">
                          {occupiedSpaces} / {totalSpaces} occupied
                        </p>
                      </div>
                      <div className="flex flex-col gap-1">
                        <Badge variant={occupancyPercent > 80 ? 'destructive' : 'default'}>
                          {availableSpaces} available
                        </Badge>
                        <Badge variant="outline" className="bg-green-50">
                          <Activity className="h-3 w-3 mr-1" />
                          Active
                        </Badge>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Shuttle Services */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Shuttle Bus Fleet</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[1, 2, 3, 4].map((bus) => (
                  <div key={bus} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Bus className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="font-medium">Shuttle Bus {bus}</p>
                        <p className="text-sm text-muted-foreground">
                          Route: {temples[Math.min(bus - 1, temples.length - 1)]?.name} - Parking
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">35/50 capacity</Badge>
                      <Badge className="bg-green-500">
                        <Activity className="h-3 w-3 mr-1 animate-pulse" />
                        Running
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Vehicle Entry Gates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {temples.map((temple, idx) => (
                  <div key={temple.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Car className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Gate {idx + 1}</p>
                        <p className="text-sm text-muted-foreground">
                          {temple.location.city}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{20 + idx * 10} entries/hr</Badge>
                      <Badge className="bg-green-500">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Open
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Today's Summary */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Peak Hour</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3-6 PM</div>
              <p className="text-xs text-muted-foreground mt-1">
                Highest traffic volume
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">VIP Parking</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24/50</div>
              <p className="text-xs text-muted-foreground mt-1">
                26 spaces available
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Violations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground mt-1">
                Wrong parking today
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹8,450</div>
              <p className="text-xs text-muted-foreground mt-1">
                Parking fees collected
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
