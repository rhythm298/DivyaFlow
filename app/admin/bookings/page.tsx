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
import { Search, Calendar, MapPin, Users, Clock, Download, Filter } from 'lucide-react';

interface Booking {
  id: string;
  bookingNumber: string;
  userName: string;
  userEmail: string;
  templeName: string;
  location: string;
  date: string;
  timeSlot: string;
  devotees: number;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
  amount: number;
  createdAt: string;
}

const mockBookings: Booking[] = [
  {
    id: '1',
    bookingNumber: 'BK2025001',
    userName: 'Raj Kumar',
    userEmail: 'devotee@example.com',
    templeName: 'Golden Temple',
    location: 'Amritsar, Punjab',
    date: '2025-10-15',
    timeSlot: '06:00 AM - 08:00 AM',
    devotees: 4,
    status: 'confirmed',
    amount: 500,
    createdAt: '2025-10-08',
  },
  {
    id: '2',
    bookingNumber: 'BK2025002',
    userName: 'Priya Sharma',
    userEmail: 'priya.sharma@temple.com',
    templeName: 'Tirupati Temple',
    location: 'Tirupati, Andhra Pradesh',
    date: '2025-10-20',
    timeSlot: '05:00 AM - 07:00 AM',
    devotees: 2,
    status: 'confirmed',
    amount: 300,
    createdAt: '2025-10-07',
  },
  {
    id: '3',
    bookingNumber: 'BK2025003',
    userName: 'Amit Patel',
    userEmail: 'amit.patel@gmail.com',
    templeName: 'Somnath Temple',
    location: 'Gujarat',
    date: '2025-10-10',
    timeSlot: '07:00 AM - 09:00 AM',
    devotees: 6,
    status: 'completed',
    amount: 750,
    createdAt: '2025-10-05',
  },
  {
    id: '4',
    bookingNumber: 'BK2025004',
    userName: 'Sneha Reddy',
    userEmail: 'sneha.r@example.com',
    templeName: 'Meenakshi Temple',
    location: 'Madurai, Tamil Nadu',
    date: '2025-10-25',
    timeSlot: '06:00 AM - 08:00 AM',
    devotees: 3,
    status: 'pending',
    amount: 450,
    createdAt: '2025-10-08',
  },
  {
    id: '5',
    bookingNumber: 'BK2025005',
    userName: 'Rahul Singh',
    userEmail: 'rahul.singh@example.com',
    templeName: 'Kashi Vishwanath',
    location: 'Varanasi, Uttar Pradesh',
    date: '2025-10-12',
    timeSlot: '04:00 AM - 06:00 AM',
    devotees: 5,
    status: 'cancelled',
    amount: 600,
    createdAt: '2025-10-06',
  },
  {
    id: '6',
    bookingNumber: 'BK2025006',
    userName: 'Divya Iyer',
    userEmail: 'divya.iyer@example.com',
    templeName: 'Padmanabhaswamy Temple',
    location: 'Thiruvananthapuram, Kerala',
    date: '2025-10-18',
    timeSlot: '05:30 AM - 07:30 AM',
    devotees: 2,
    status: 'confirmed',
    amount: 400,
    createdAt: '2025-10-07',
  },
  {
    id: '7',
    bookingNumber: 'BK2025007',
    userName: 'Vikram Joshi',
    userEmail: 'vikram.j@example.com',
    templeName: 'Siddhivinayak Temple',
    location: 'Mumbai, Maharashtra',
    date: '2025-10-22',
    timeSlot: '08:00 AM - 10:00 AM',
    devotees: 4,
    status: 'confirmed',
    amount: 500,
    createdAt: '2025-10-08',
  },
  {
    id: '8',
    bookingNumber: 'BK2025008',
    userName: 'Ananya Das',
    userEmail: 'ananya.das@example.com',
    templeName: 'Jagannath Temple',
    location: 'Puri, Odisha',
    date: '2025-10-28',
    timeSlot: '06:00 AM - 08:00 AM',
    devotees: 3,
    status: 'pending',
    amount: 450,
    createdAt: '2025-10-08',
  },
];

export default function AdminBookingsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredBookings = mockBookings.filter(booking => {
    const matchesSearch = 
      booking.bookingNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.templeName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || booking.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: Booking['status']) => {
    const configs = {
      confirmed: { label: 'Confirmed', className: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' },
      pending: { label: 'Pending', className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' },
      cancelled: { label: 'Cancelled', className: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' },
      completed: { label: 'Completed', className: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' },
    };
    return configs[status];
  };

  const stats = {
    total: mockBookings.length,
    confirmed: mockBookings.filter(b => b.status === 'confirmed').length,
    pending: mockBookings.filter(b => b.status === 'pending').length,
    completed: mockBookings.filter(b => b.status === 'completed').length,
    totalRevenue: mockBookings.reduce((sum, b) => sum + b.amount, 0),
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">All Bookings</h1>
            <p className="text-muted-foreground mt-1">
              Manage and monitor all temple bookings
            </p>
          </div>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-card border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Bookings</p>
                <p className="text-2xl font-bold mt-1">{stats.total}</p>
              </div>
              <Calendar className="h-8 w-8 text-primary opacity-50" />
            </div>
          </div>
          <div className="bg-card border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Confirmed</p>
                <p className="text-2xl font-bold mt-1 text-green-600">{stats.confirmed}</p>
              </div>
              <Calendar className="h-8 w-8 text-green-600 opacity-50" />
            </div>
          </div>
          <div className="bg-card border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold mt-1 text-yellow-600">{stats.pending}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600 opacity-50" />
            </div>
          </div>
          <div className="bg-card border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold mt-1 text-blue-600">{stats.completed}</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-600 opacity-50" />
            </div>
          </div>
          <div className="bg-card border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold mt-1">₹{stats.totalRevenue.toLocaleString()}</p>
              </div>
              <Users className="h-8 w-8 text-primary opacity-50" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-card border rounded-lg p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by booking number, user, or temple..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border rounded-md bg-background text-sm"
            >
              <option value="all">All Statuses</option>
              <option value="confirmed">Confirmed</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="bg-card border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Booking #</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Temple</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Devotees</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBookings.map((booking) => {
                  const statusConfig = getStatusBadge(booking.status);
                  return (
                    <TableRow key={booking.id}>
                      <TableCell className="font-medium">{booking.bookingNumber}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{booking.userName}</p>
                          <p className="text-sm text-muted-foreground">{booking.userEmail}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium">{booking.templeName}</p>
                            <p className="text-sm text-muted-foreground">{booking.location}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-start gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-sm font-medium">
                              {new Date(booking.date).toLocaleDateString('en-IN')}
                            </p>
                            <p className="text-sm text-muted-foreground">{booking.timeSlot}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{booking.devotees}</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-semibold">₹{booking.amount}</TableCell>
                      <TableCell>
                        <Badge className={statusConfig.className}>
                          {statusConfig.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(booking.createdAt).toLocaleDateString('en-IN')}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>

        {filteredBookings.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No bookings found matching your criteria</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
