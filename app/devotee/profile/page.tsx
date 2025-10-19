'use client';

/**
 * Devotee Profile Page
 * View and edit devotee profile and Bhakti stats
 */

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { DashboardLayout, StatCard } from '@/components/dashboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  Heart,
  TrendingUp,
  Edit,
  Save,
} from 'lucide-react';
import { toast } from 'sonner';

export default function DevoteeProfilePage() {
  const { data: session } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    preferences: '',
  });

  useEffect(() => {
    if (session?.user) {
      setFormData({
        name: session.user.name || '',
        email: session.user.email || '',
        phone: '+91 98765 43210',
        address: '123 Temple Street',
        city: 'Ahmedabad',
        state: 'Gujarat',
        preferences: 'Early morning darshan preferred. Vegetarian prasad only.',
      });
    }
  }, [session]);

  const handleSave = () => {
    toast.success('Profile updated successfully!');
    setIsEditing(false);
  };

  const user = session?.user;
  const initials = user?.name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase() || 'D';

  // Mock Bhakti stats
  const bhaktiStats = {
    totalVisits: 24,
    thisYear: 8,
    favTemple: 'Somnath Temple',
    totalDonation: 15000,
    level: 'Gold Devotee',
    joinDate: 'Jan 2023',
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">My Profile</h1>
            <p className="text-muted-foreground mt-1">
              Manage your profile and Bhakti journey
            </p>
          </div>
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </div>
          )}
        </div>

        {/* Bhakti Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <StatCard
            title="Total Visits"
            value={bhaktiStats.totalVisits}
            icon={Calendar}
            description="All-time darshan count"
            variant="success"
          />
          <StatCard
            title="This Year"
            value={bhaktiStats.thisYear}
            icon={TrendingUp}
            description="Visits in 2025"
            variant="default"
          />
          <StatCard
            title="Total Donation"
            value={`₹${bhaktiStats.totalDonation.toLocaleString()}`}
            icon={Heart}
            description="Lifetime contribution"
            variant="success"
          />
          <StatCard
            title="Devotee Level"
            value={bhaktiStats.level}
            icon={Award}
            description="Gold tier benefits"
            variant="warning"
          />
        </div>

        <Tabs defaultValue="personal" className="space-y-4">
          <TabsList>
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="bhakti">Bhakti Journey</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
          </TabsList>

          {/* Personal Info Tab */}
          <TabsContent value="personal">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Your basic profile information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <Avatar className="h-24 w-24">
                    <AvatarFallback className="bg-primary text-white text-2xl">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-2xl font-semibold">{user?.name}</h3>
                    <p className="text-muted-foreground">{user?.email}</p>
                    <Badge className="mt-2 bg-orange-500">
                      {bhaktiStats.level}
                    </Badge>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) =>
                        setFormData({ ...formData, city: e.target.value })
                      }
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Bhakti Journey Tab */}
          <TabsContent value="bhakti">
            <Card>
              <CardHeader>
                <CardTitle>Bhakti Journey</CardTitle>
                <CardDescription>
                  Your spiritual journey with DivyaFlow
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex items-center gap-4 p-4 border rounded-lg">
                    <Calendar className="h-8 w-8 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Member Since</p>
                      <p className="text-xl font-semibold">{bhaktiStats.joinDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 border rounded-lg">
                    <MapPin className="h-8 w-8 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Favorite Temple</p>
                      <p className="text-xl font-semibold">{bhaktiStats.favTemple}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Recent Visits</h4>
                  <div className="space-y-2">
                    {[
                      { temple: 'Somnath Temple', date: 'Oct 1, 2025', type: 'VIP Darshan' },
                      { temple: 'Dwarka Temple', date: 'Sep 15, 2025', type: 'General Darshan' },
                      { temple: 'Ambaji Temple', date: 'Aug 20, 2025', type: 'Special Puja' },
                    ].map((visit, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Heart className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{visit.temple}</p>
                            <p className="text-sm text-muted-foreground">{visit.type}</p>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{visit.date}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Preferences Tab */}
          <TabsContent value="preferences">
            <Card>
              <CardHeader>
                <CardTitle>Preferences</CardTitle>
                <CardDescription>
                  Customize your darshan experience
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="preferences">Darshan Preferences</Label>
                  <Textarea
                    id="preferences"
                    value={formData.preferences}
                    onChange={(e) =>
                      setFormData({ ...formData, preferences: e.target.value })
                    }
                    disabled={!isEditing}
                    rows={4}
                    placeholder="Enter your preferences..."
                  />
                </div>

                <div className="space-y-3">
                  <Label>Notification Settings</Label>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-muted-foreground">
                          Receive booking confirmations via email
                        </p>
                      </div>
                      <input type="checkbox" defaultChecked className="h-4 w-4" />
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">SMS Alerts</p>
                        <p className="text-sm text-muted-foreground">
                          Get SMS for important updates
                        </p>
                      </div>
                      <input type="checkbox" defaultChecked className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
