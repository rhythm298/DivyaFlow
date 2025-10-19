'use client';

/**
 * Admin Analytics Dashboard
 * Real-time crowd analytics with interactive charts
 */

import { useEffect, useState } from 'react';
import { DashboardLayout, StatCard, ChartWrapper } from '@/components/dashboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useTempleStore } from '@/lib/stores/temple-store';
import { useAlertStore } from '@/lib/stores/alert-store';
import { useBookingStore } from '@/lib/stores/booking-store';
import {
  Users,
  TrendingUp,
  AlertTriangle,
  Calendar,
  Activity,
  Brain,
  MapPin,
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
} from 'recharts';

const COLORS = ['#FF6B35', '#004E89', '#F7B801', '#00A878', '#9B59B6', '#E74C3C'];

export default function AdminAnalyticsPage() {
  const { temples, fetchTemples } = useTempleStore();
  const { alerts, fetchAlerts } = useAlertStore();
  const { bookings, fetchBookings, getTodayBookings } = useBookingStore();

  const [selectedTemple, setSelectedTemple] = useState<string>('all');
  const [timeRange, setTimeRange] = useState<'today' | 'week' | 'month'>('today');

  useEffect(() => {
    fetchTemples();
    fetchAlerts();
    fetchBookings();
  }, [fetchTemples, fetchAlerts, fetchBookings]);

  // Calculate metrics
  const totalCapacity = temples.reduce((sum, t) => sum + t.capacity.max, 0);
  const currentOccupancy = temples.reduce((sum, t) => sum + t.capacity.current, 0);
  const occupancyPercentage = totalCapacity > 0 ? Math.round((currentOccupancy / totalCapacity) * 100) : 0;

  const todayBookings = getTodayBookings();
  const activeAlerts = alerts.filter((a) => a.status === 'active');
  
  // Simulate AI risk score based on occupancy
  const avgRiskLevel = occupancyPercentage > 80 ? 7.5 : occupancyPercentage > 60 ? 5.2 : 3.1;

  // Prepare chart data
  const occupancyByTemple = temples.map((temple) => ({
    name: temple.name.split(' ')[0], // Short name
    current: temple.capacity.current,
    max: temple.capacity.max,
    percentage: Math.round((temple.capacity.current / temple.capacity.max) * 100),
  }));

  // Footfall trend (last 24 hours)
  const footfallData = Array.from({ length: 24 }, (_, i) => {
    const hour = i;
    const baseCount = 500 + Math.sin(i / 4) * 300;
    const variance = Math.random() * 200;
    return {
      hour: `${String(hour).padStart(2, '0')}:00`,
      visitors: Math.round(baseCount + variance),
      capacity: 1000,
    };
  });

  // Peak hours heatmap data
  const peakHoursData = [
    { time: '6-9 AM', monday: 450, tuesday: 520, wednesday: 480, thursday: 510, friday: 650, saturday: 850, sunday: 920 },
    { time: '9-12 PM', monday: 780, tuesday: 820, wednesday: 790, thursday: 810, friday: 950, saturday: 1200, sunday: 1350 },
    { time: '12-3 PM', monday: 650, tuesday: 680, wednesday: 660, thursday: 670, friday: 800, saturday: 1000, sunday: 1150 },
    { time: '3-6 PM', monday: 890, tuesday: 920, wednesday: 880, thursday: 900, friday: 1100, saturday: 1400, sunday: 1600 },
    { time: '6-9 PM', monday: 720, tuesday: 750, wednesday: 730, thursday: 740, friday: 900, saturday: 1150, sunday: 1300 },
  ];

  // Alert distribution
  const alertDistribution = [
    { name: 'Crowd Overflow', value: alerts.filter(a => a.type === 'crowd-overflow').length, color: '#FF6B35' },
    { name: 'Security', value: alerts.filter(a => a.type === 'security-breach').length, color: '#004E89' },
    { name: 'Medical', value: alerts.filter(a => a.type === 'medical-emergency').length, color: '#E74C3C' },
    { name: 'Fire', value: alerts.filter(a => a.type === 'fire').length, color: '#F7B801' },
    { name: 'Technical', value: alerts.filter(a => a.type === 'technical-failure').length, color: '#9B59B6' },
  ].filter(item => item.value > 0);

  // AI Risk Score gauge
  const riskScoreData = [
    {
      name: 'Risk Level',
      value: Math.round(avgRiskLevel * 10),
      fill: avgRiskLevel < 4 ? '#00A878' : avgRiskLevel < 7 ? '#F7B801' : '#E74C3C',
    },
  ];

  const getRiskColor = (risk: number) => {
    if (risk < 4) return 'text-green-500';
    if (risk < 7) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getRiskBadge = (risk: number) => {
    if (risk < 4) return <Badge className="bg-green-500">Safe</Badge>;
    if (risk < 7) return <Badge className="bg-yellow-500">Moderate</Badge>;
    return <Badge variant="destructive">High Risk</Badge>;
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
            <p className="text-muted-foreground mt-1">Real-time crowd intelligence and insights</p>
          </div>
          <div className="flex items-center gap-4">
            <Select value={timeRange} onValueChange={(value: any) => setTimeRange(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Occupancy"
            value={`${occupancyPercentage}%`}
            icon={Users}
            description={`${currentOccupancy.toLocaleString()} / ${totalCapacity.toLocaleString()} visitors`}
            variant={occupancyPercentage > 80 ? 'danger' : 'default'}
          />
          <StatCard
            title="Today's Bookings"
            value={todayBookings.length}
            icon={Calendar}
            description="Confirmed reservations"
            variant="success"
          />
          <StatCard
            title="Active Alerts"
            value={activeAlerts.length}
            icon={AlertTriangle}
            description="Requiring attention"
            variant={activeAlerts.length > 5 ? 'warning' : 'default'}
          />
          <StatCard
            title="AI Risk Score"
            value={avgRiskLevel.toFixed(1)}
            icon={Brain}
            variant={avgRiskLevel < 4 ? 'success' : avgRiskLevel < 7 ? 'warning' : 'danger'}
          />
        </div>

        {/* Charts Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Occupancy Gauge */}
          <ChartWrapper
            title="Current Occupancy by Temple"
            description="Real-time capacity utilization"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={occupancyByTemple}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="current" fill="#FF6B35" name="Current" />
                <Bar dataKey="max" fill="#004E89" name="Capacity" />
              </BarChart>
            </ResponsiveContainer>
          </ChartWrapper>

          {/* AI Risk Score Radial */}
          <ChartWrapper
            title="AI Risk Assessment"
            description="Machine learning-based crowd risk analysis"
          >
            <div className="flex flex-col items-center justify-center h-full">
              <ResponsiveContainer width="100%" height={200}>
                <RadialBarChart
                  cx="50%"
                  cy="50%"
                  innerRadius="60%"
                  outerRadius="90%"
                  data={riskScoreData}
                  startAngle={180}
                  endAngle={0}
                >
                  <RadialBar
                    background
                    dataKey="value"
                    cornerRadius={10}
                  />
                  <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-4xl font-bold"
                  >
                    {avgRiskLevel.toFixed(1)}
                  </text>
                </RadialBarChart>
              </ResponsiveContainer>
              <div className="mt-4 text-center">
                {getRiskBadge(avgRiskLevel)}
                <p className="text-sm text-muted-foreground mt-2">
                  Scale: 0 (Safe) - 10 (Critical)
                </p>
              </div>
            </div>
          </ChartWrapper>
        </div>

        {/* Footfall Trends */}
        <ChartWrapper
          title="24-Hour Footfall Trend"
          description="Visitor count throughout the day"
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={footfallData}>
              <defs>
                <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF6B35" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#FF6B35" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey="visitors"
                stroke="#FF6B35"
                fillOpacity={1}
                fill="url(#colorVisitors)"
                name="Visitors"
              />
              <Line
                type="monotone"
                dataKey="capacity"
                stroke="#004E89"
                strokeDasharray="5 5"
                name="Capacity"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartWrapper>

        {/* Peak Hours and Alert Distribution */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Peak Hours Heatmap */}
          <ChartWrapper
            title="Peak Hours Analysis"
            description="Weekly visitor patterns by time slot"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={peakHoursData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="monday" stackId="a" fill="#FF6B35" />
                <Bar dataKey="tuesday" stackId="a" fill="#004E89" />
                <Bar dataKey="wednesday" stackId="a" fill="#F7B801" />
                <Bar dataKey="thursday" stackId="a" fill="#00A878" />
                <Bar dataKey="friday" stackId="a" fill="#9B59B6" />
                <Bar dataKey="saturday" stackId="a" fill="#E74C3C" />
                <Bar dataKey="sunday" stackId="a" fill="#3498DB" />
              </BarChart>
            </ResponsiveContainer>
          </ChartWrapper>

          {/* Alert Distribution */}
          <ChartWrapper
            title="Alert Distribution"
            description="Breakdown of alert types"
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={alertDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }: any) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {alertDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </ChartWrapper>
        </div>

        {/* Temple-wise Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Temple-wise Analytics</CardTitle>
            <CardDescription>Detailed metrics for each temple location</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {temples.map((temple) => {
                const occupancyPercent = Math.round((temple.capacity.current / temple.capacity.max) * 100);
                const risk = occupancyPercent > 80 ? 7.5 : occupancyPercent > 60 ? 5.0 : 3.0;
                
                return (
                  <div key={temple.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{temple.name}</h3>
                        <p className="text-sm text-muted-foreground">{temple.location.city}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-8">
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Occupancy</p>
                        <p className="text-2xl font-bold">
                          {Math.round((temple.capacity.current / temple.capacity.max) * 100)}%
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Risk Level</p>
                        <p className={`text-2xl font-bold ${getRiskColor(risk)}`}>
                          {risk.toFixed(1)}
                        </p>
                      </div>
                      <div>
                        {getRiskBadge(risk)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
