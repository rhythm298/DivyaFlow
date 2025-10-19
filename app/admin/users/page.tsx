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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Search, UserPlus, MoreVertical, Mail, Phone, Shield, Ban, CheckCircle } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'devotee' | 'admin' | 'security' | 'medical' | 'traffic' | 'control-room';
  status: 'active' | 'inactive' | 'suspended';
  joinedDate: string;
  lastLogin: string;
  totalBookings: number;
}

const mockUsers: User[] = [
  {
    id: '1',
    name: 'Raj Kumar',
    email: 'devotee@example.com',
    phone: '+91 98765 43210',
    role: 'devotee',
    status: 'active',
    joinedDate: '2023-01-15',
    lastLogin: '2 hours ago',
    totalBookings: 24,
  },
  {
    id: '2',
    name: 'Priya Sharma',
    email: 'priya.sharma@temple.com',
    phone: '+91 98765 43211',
    role: 'devotee',
    status: 'active',
    joinedDate: '2023-03-20',
    lastLogin: '1 day ago',
    totalBookings: 15,
  },
  {
    id: '3',
    name: 'Admin User',
    email: 'admin@example.com',
    phone: '+91 98765 43212',
    role: 'admin',
    status: 'active',
    joinedDate: '2022-12-01',
    lastLogin: '30 mins ago',
    totalBookings: 0,
  },
  {
    id: '4',
    name: 'Security Chief',
    email: 'security@example.com',
    phone: '+91 98765 43213',
    role: 'security',
    status: 'active',
    joinedDate: '2023-01-10',
    lastLogin: '1 hour ago',
    totalBookings: 0,
  },
  {
    id: '5',
    name: 'Dr. Arvind',
    email: 'medical@example.com',
    phone: '+91 98765 43214',
    role: 'medical',
    status: 'active',
    joinedDate: '2023-02-05',
    lastLogin: '3 hours ago',
    totalBookings: 0,
  },
  {
    id: '6',
    name: 'Traffic Manager',
    email: 'traffic@example.com',
    phone: '+91 98765 43215',
    role: 'traffic',
    status: 'active',
    joinedDate: '2023-01-20',
    lastLogin: '45 mins ago',
    totalBookings: 0,
  },
  {
    id: '7',
    name: 'Control Room',
    email: 'control@example.com',
    phone: '+91 98765 43216',
    role: 'control-room',
    status: 'active',
    joinedDate: '2023-01-01',
    lastLogin: '15 mins ago',
    totalBookings: 0,
  },
  {
    id: '8',
    name: 'Amit Patel',
    email: 'amit.patel@gmail.com',
    phone: '+91 98765 43217',
    role: 'devotee',
    status: 'active',
    joinedDate: '2023-04-10',
    lastLogin: '5 days ago',
    totalBookings: 8,
  },
  {
    id: '9',
    name: 'Suspended User',
    email: 'suspended@example.com',
    phone: '+91 98765 43218',
    role: 'devotee',
    status: 'suspended',
    joinedDate: '2023-05-01',
    lastLogin: '2 months ago',
    totalBookings: 3,
  },
  {
    id: '10',
    name: 'Inactive User',
    email: 'inactive@example.com',
    phone: '+91 98765 43219',
    role: 'devotee',
    status: 'inactive',
    joinedDate: '2022-11-15',
    lastLogin: '6 months ago',
    totalBookings: 1,
  },
];

export default function AdminUsersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone.includes(searchQuery);
    
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;

    return matchesSearch && matchesRole && matchesStatus;
  });

  const getRoleBadgeColor = (role: User['role']) => {
    const colors = {
      devotee: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      admin: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
      security: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
      medical: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      traffic: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
      'control-room': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300',
    };
    return colors[role];
  };

  const getStatusBadge = (status: User['status']) => {
    const configs = {
      active: { label: 'Active', className: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' },
      inactive: { label: 'Inactive', className: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300' },
      suspended: { label: 'Suspended', className: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' },
    };
    return configs[status];
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">User Management</h1>
            <p className="text-muted-foreground mt-1">
              Manage all users across the platform
            </p>
          </div>
          <Button className="sm:w-auto">
            <UserPlus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-card border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Users</p>
                <p className="text-2xl font-bold mt-1">{mockUsers.length}</p>
              </div>
              <Shield className="h-8 w-8 text-primary opacity-50" />
            </div>
          </div>
          <div className="bg-card border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Users</p>
                <p className="text-2xl font-bold mt-1 text-green-600">
                  {mockUsers.filter(u => u.status === 'active').length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600 opacity-50" />
            </div>
          </div>
          <div className="bg-card border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Devotees</p>
                <p className="text-2xl font-bold mt-1 text-blue-600">
                  {mockUsers.filter(u => u.role === 'devotee').length}
                </p>
              </div>
              <Mail className="h-8 w-8 text-blue-600 opacity-50" />
            </div>
          </div>
          <div className="bg-card border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Suspended</p>
                <p className="text-2xl font-bold mt-1 text-red-600">
                  {mockUsers.filter(u => u.status === 'suspended').length}
                </p>
              </div>
              <Ban className="h-8 w-8 text-red-600 opacity-50" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-card border rounded-lg p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, or phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="px-3 py-2 border rounded-md bg-background text-sm"
            >
              <option value="all">All Roles</option>
              <option value="devotee">Devotee</option>
              <option value="admin">Admin</option>
              <option value="security">Security</option>
              <option value="medical">Medical</option>
              <option value="traffic">Traffic</option>
              <option value="control-room">Control Room</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border rounded-md bg-background text-sm"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-card border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead>Bookings</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => {
                  const statusConfig = getStatusBadge(user.status);
                  return (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-sm font-semibold text-primary">
                              {user.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-muted-foreground">ID: {user.id}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm">
                            <Mail className="h-3 w-3 text-muted-foreground" />
                            <span className="text-muted-foreground">{user.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="h-3 w-3 text-muted-foreground" />
                            <span className="text-muted-foreground">{user.phone}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getRoleBadgeColor(user.role)}>
                          {user.role.replace('-', ' ').toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={statusConfig.className}>
                          {statusConfig.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(user.joinedDate).toLocaleDateString('en-IN')}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {user.lastLogin}
                      </TableCell>
                      <TableCell>
                        <span className="text-sm font-medium">{user.totalBookings}</span>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Edit User</DropdownMenuItem>
                            <DropdownMenuItem>View Bookings</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {user.status === 'active' ? (
                              <>
                                <DropdownMenuItem className="text-orange-600">
                                  Suspend User
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">
                                  Deactivate User
                                </DropdownMenuItem>
                              </>
                            ) : user.status === 'suspended' ? (
                              <DropdownMenuItem className="text-green-600">
                                Reactivate User
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem className="text-green-600">
                                Activate User
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No users found matching your criteria</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
