'use client';

/**
 * Devotee Bookings List
 * View all bookings with QR codes and management
 */

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { DashboardLayout } from '@/components/dashboard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useBookingStore } from '@/lib/stores/booking-store';
import { Calendar, MapPin, Clock, QrCode, XCircle, CheckCircle, Download, Share2 } from 'lucide-react';
import { toast } from 'sonner';
import { QRCodeSVG } from 'qrcode.react';
import { Booking, BookingStatus } from '@/types';

export default function DevoteeBookingsPage() {
  const { data: session } = useSession();
  const { userBookings, fetchUserBookings, cancelBooking } = useBookingStore();
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [filter, setFilter] = useState<'all' | BookingStatus>('all');

  useEffect(() => {
    if (session?.user?.id) {
      fetchUserBookings(session.user.id);
    }
  }, [session?.user?.id, fetchUserBookings]);

  const handleCancelBooking = async (bookingId: string) => {
    try {
      await cancelBooking(bookingId);
      toast.success('Booking cancelled successfully');
    } catch (error) {
      toast.error('Failed to cancel booking');
    }
  };

  const handleDownloadQR = (booking: Booking) => {
    const canvas = document.getElementById(`qr-${booking.id}`) as HTMLCanvasElement;
    if (canvas) {
      const url = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `booking-${booking.bookingNumber}.png`;
      link.href = url;
      link.click();
      toast.success('QR code downloaded');
    }
  };

  const handleShareBooking = (booking: Booking) => {
    if (navigator.share) {
      navigator.share({
        title: `DivyaFlow Booking ${booking.bookingNumber}`,
        text: `Darshan booking for ${booking.temple.name} on ${new Date(booking.date).toLocaleDateString()}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(`Booking: ${booking.bookingNumber}`);
      toast.success('Booking details copied to clipboard');
    }
  };

  const filteredBookings = filter === 'all' 
    ? userBookings 
    : userBookings.filter(b => b.status === filter);

  const getStatusColor = (status: BookingStatus) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-500';
      case 'pending':
        return 'bg-yellow-500';
      case 'cancelled':
        return 'bg-red-500';
      case 'completed':
        return 'bg-blue-500';
      case 'checked-in':
        return 'bg-green-600';
      case 'no-show':
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  };

  const upcomingBookings = userBookings.filter(
    b => b.status === 'confirmed' && new Date(b.date) >= new Date()
  );

  const pastBookings = userBookings.filter(
    b => b.status === 'completed' || new Date(b.date) < new Date()
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">My Bookings</h1>
            <p className="text-muted-foreground mt-1">
              Manage your darshan reservations
            </p>
          </div>
          <Button asChild>
            <a href="/devotee/booking">
              <Calendar className="mr-2 h-4 w-4" />
              New Booking
            </a>
          </Button>
        </div>

        {/* Summary Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userBookings.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{upcomingBookings.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pastBookings.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Cancelled</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {userBookings.filter(b => b.status === 'cancelled').length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bookings List */}
        <Tabs defaultValue="upcoming" className="space-y-4">
          <TabsList>
            <TabsTrigger value="upcoming">
              Upcoming ({upcomingBookings.length})
            </TabsTrigger>
            <TabsTrigger value="past">
              Past ({pastBookings.length})
            </TabsTrigger>
            <TabsTrigger value="all">
              All ({userBookings.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4">
            {upcomingBookings.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground mb-4">No upcoming bookings</p>
                  <Button asChild>
                    <a href="/devotee/booking">Book Your Darshan</a>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              upcomingBookings.map((booking) => (
                <BookingCard
                  key={booking.id}
                  booking={booking}
                  onCancel={handleCancelBooking}
                  onViewQR={() => setSelectedBooking(booking)}
                  onDownloadQR={handleDownloadQR}
                  onShare={handleShareBooking}
                />
              ))
            )}
          </TabsContent>

          <TabsContent value="past" className="space-y-4">
            {pastBookings.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <CheckCircle className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No past bookings</p>
                </CardContent>
              </Card>
            ) : (
              pastBookings.map((booking) => (
                <BookingCard
                  key={booking.id}
                  booking={booking}
                  onViewQR={() => setSelectedBooking(booking)}
                  onDownloadQR={handleDownloadQR}
                  onShare={handleShareBooking}
                />
              ))
            )}
          </TabsContent>

          <TabsContent value="all" className="space-y-4">
            {userBookings.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                onCancel={handleCancelBooking}
                onViewQR={() => setSelectedBooking(booking)}
                onDownloadQR={handleDownloadQR}
                onShare={handleShareBooking}
              />
            ))}
          </TabsContent>
        </Tabs>

        {/* QR Code Dialog */}
        <Dialog open={!!selectedBooking} onOpenChange={() => setSelectedBooking(null)}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Booking QR Code</DialogTitle>
              <DialogDescription>
                Show this QR code at the temple entrance
              </DialogDescription>
            </DialogHeader>
            {selectedBooking && (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="bg-white p-4 rounded-lg">
                  <QRCodeSVG
                    id={`qr-${selectedBooking.id}`}
                    value={selectedBooking.qrCode}
                    size={256}
                    level="H"
                    includeMargin
                  />
                </div>
                <div className="text-center space-y-2">
                  <p className="font-medium text-lg">{selectedBooking.bookingNumber}</p>
                  <p className="text-sm text-muted-foreground">
                    {selectedBooking.temple.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(selectedBooking.date).toLocaleDateString()} • {selectedBooking.slot.startTime}
                  </p>
                  <Badge className={getStatusColor(selectedBooking.status)}>
                    {selectedBooking.status}
                  </Badge>
                </div>
                <div className="flex gap-2 w-full">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => selectedBooking && handleDownloadQR(selectedBooking)}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => selectedBooking && handleShareBooking(selectedBooking)}
                  >
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}

interface BookingCardProps {
  booking: Booking;
  onCancel?: (id: string) => void;
  onViewQR: () => void;
  onDownloadQR: (booking: Booking) => void;
  onShare: (booking: Booking) => void;
}

function BookingCard({ booking, onCancel, onViewQR, onDownloadQR, onShare }: BookingCardProps) {
  const canCancel = booking.status === 'confirmed' && new Date(booking.date) > new Date();

  const getStatusColor = (status: BookingStatus) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-500';
      case 'pending':
        return 'bg-yellow-500';
      case 'cancelled':
        return 'bg-red-500';
      case 'completed':
        return 'bg-blue-500';
      case 'checked-in':
        return 'bg-green-600';
      case 'no-show':
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4 flex-1">
            <div className="flex flex-col items-center justify-center h-16 w-16 rounded-lg bg-primary/10">
              <span className="text-2xl font-bold text-primary">
                {new Date(booking.date).getDate()}
              </span>
              <span className="text-xs text-muted-foreground">
                {new Date(booking.date).toLocaleString('default', { month: 'short' })}
              </span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-semibold text-lg">{booking.temple?.name || 'Unknown Temple'}</h3>
                <Badge className={getStatusColor(booking.status)}>
                  {booking.status}
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {new Date(booking.date).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {booking.slot?.startTime || 'N/A'} - {booking.slot?.endTime || 'N/A'}
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {booking.temple?.location?.city || 'N/A'}
                </div>
                <div className="flex items-center gap-1">
                  <QrCode className="h-3 w-3" />
                  {booking.bookingNumber}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Button variant="outline" size="sm" onClick={onViewQR}>
              <QrCode className="mr-2 h-4 w-4" />
              View QR
            </Button>
            {canCancel && onCancel && (
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onCancel(booking.id)}
              >
                <XCircle className="mr-2 h-4 w-4" />
                Cancel
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
