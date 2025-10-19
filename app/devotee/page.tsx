'use client';

/**
 * Devotee Dashboard
 * Main dashboard for devotees with bookings overview and quick actions
 */

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { DashboardLayout, StatCard } from '@/components/dashboard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useBookingStore } from '@/lib/stores/booking-store';
import { useTempleStore } from '@/lib/stores/temple-store';
import { Calendar, MapPin, Clock, TrendingUp, Award, Plus, QrCode } from 'lucide-react';

export default function DevoteeDashboardPage() {
  const { data: session } = useSession();
  const { userBookings, fetchUserBookings } = useBookingStore();
  const { temples, fetchTemples } = useTempleStore();

  useEffect(() => {
    fetchTemples();
    if (session?.user?.id) {
      fetchUserBookings(session.user.id);
    }
  }, [session?.user?.id, fetchTemples, fetchUserBookings]);

  const upcomingBookings = userBookings.filter(
    (b) => b.status === 'confirmed' && new Date(b.date) >= new Date()
  );

  const completedBookings = userBookings.filter((b) => b.status === 'completed');

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div>
          <h1 className="text-3xl font-bold">Welcome, {session?.user?.name}!</h1>
          <p className="text-muted-foreground mt-1">
            Plan your divine journey with ease
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Upcoming Bookings"
            value={upcomingBookings.length}
            icon={Calendar}
            variant="default"
          />
          <StatCard
            title="Completed Visits"
            value={completedBookings.length}
            icon={MapPin}
            variant="success"
          />
          <StatCard
            title="Bhakti Score"
            value={session?.user?.bhaktiScore || 0}
            icon={TrendingUp}
            description="Keep visiting to earn more!"
            variant="default"
          />
          <StatCard
            title="Badges Earned"
            value={0}
            icon={Award}
            variant="default"
          />
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Get started with your darshan booking</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <Link href="/devotee/booking">
                <Button className="w-full h-24 flex flex-col gap-2" size="lg">
                  <Plus className="h-6 w-6" />
                  <span>Book Darshan</span>
                </Button>
              </Link>
              <Link href="/devotee/bookings">
                <Button variant="outline" className="w-full h-24 flex flex-col gap-2" size="lg">
                  <QrCode className="h-6 w-6" />
                  <span>My Bookings</span>
                </Button>
              </Link>
              <Link href="/devotee/profile">
                <Button variant="outline" className="w-full h-24 flex flex-col gap-2" size="lg">
                  <Award className="h-6 w-6" />
                  <span>My Profile</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Bookings */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Upcoming Bookings</CardTitle>
                <CardDescription>Your scheduled darshan visits</CardDescription>
              </div>
              <Link href="/devotee/bookings">
                <Button variant="outline" size="sm">View All</Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {upcomingBookings.length === 0 ? (
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No upcoming bookings</p>
                <Link href="/devotee/booking">
                  <Button className="mt-4">Book Your First Darshan</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {upcomingBookings.slice(0, 3).map((booking) => (
                  <div
                    key={booking.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:border-primary transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex flex-col items-center justify-center h-14 w-14 rounded-lg bg-primary/10">
                        <span className="text-xl font-bold text-primary">
                          {new Date(booking.date).getDate()}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(booking.date).toLocaleString('default', { month: 'short' })}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold">{booking.temple.name}</h3>
                        <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {booking.slot.startTime} - {booking.slot.endTime}
                          </div>
                          <Badge>{booking.status}</Badge>
                        </div>
                      </div>
                    </div>
                    <Link href={`/devotee/bookings/${booking.id}`}>
                      <Button variant="outline" size="sm">
                        <QrCode className="h-4 w-4 mr-2" />
                        View QR
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Featured Temples */}
        <Card>
          <CardHeader>
            <CardTitle>Featured Temples</CardTitle>
            <CardDescription>Popular pilgrimage destinations in Gujarat</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {temples.slice(0, 4).map((temple) => (
                <div
                  key={temple.id}
                  className="group relative overflow-hidden rounded-lg border hover:border-primary transition-all cursor-pointer"
                >
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <MapPin className="h-12 w-12 text-primary" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold group-hover:text-primary transition-colors">
                      {temple.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {temple.location.city}
                    </p>
                    <div className="mt-2">
                      <Badge variant="outline" className="text-xs">
                        {temple.capacity.current} / {temple.capacity.max} capacity
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
