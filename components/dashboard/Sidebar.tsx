'use client';

/**
 * Dashboard Sidebar Component
 * Role-based navigation menu with mobile responsiveness
 */

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  LayoutDashboard,
  Calendar,
  Users,
  Shield,
  Heart,
  Car,
  Radio,
  Bell,
  MapPin,
  Settings,
  BarChart3,
  Camera,
  Ambulance,
  ParkingCircle,
  MessageSquare,
  TrendingUp,
  UserCheck,
  Menu,
  LucideIcon,
} from 'lucide-react';
import { UserRole } from '@/types';

interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  roles: UserRole[];
  badge?: string;
}

const navItems: NavItem[] = [
  // Devotee Routes
  {
    title: 'My Dashboard',
    href: '/devotee',
    icon: LayoutDashboard,
    roles: ['devotee'],
  },
  {
    title: 'Book Darshan',
    href: '/devotee/booking',
    icon: Calendar,
    roles: ['devotee'],
  },
  {
    title: 'My Bookings',
    href: '/devotee/bookings',
    icon: UserCheck,
    roles: ['devotee'],
  },
  {
    title: 'Bhakti Profile',
    href: '/devotee/profile',
    icon: TrendingUp,
    roles: ['devotee'],
  },

  // Admin Routes
  {
    title: 'Admin Dashboard',
    href: '/admin',
    icon: LayoutDashboard,
    roles: ['admin'],
  },
  {
    title: 'Analytics',
    href: '/admin/analytics',
    icon: BarChart3,
    roles: ['admin'],
  },
  {
    title: 'Manage Temples',
    href: '/admin/temples',
    icon: MapPin,
    roles: ['admin'],
  },
  {
    title: 'Manage Users',
    href: '/admin/users',
    icon: Users,
    roles: ['admin'],
  },
  {
    title: 'Bookings',
    href: '/admin/bookings',
    icon: Calendar,
    roles: ['admin'],
  },
  {
    title: 'Alerts',
    href: '/admin/alerts',
    icon: Bell,
    roles: ['admin'],
  },

  // Security Routes
  {
    title: 'Security Dashboard',
    href: '/security',
    icon: Shield,
    roles: ['security'],
  },
  {
    title: 'Personnel',
    href: '/security/personnel',
    icon: Users,
    roles: ['security'],
  },
  {
    title: 'CCTV Cameras',
    href: '/security/cctv',
    icon: Camera,
    roles: ['security'],
  },
  {
    title: 'Incidents',
    href: '/security/incidents',
    icon: Bell,
    roles: ['security'],
  },

  // Medical Routes
  {
    title: 'Medical Dashboard',
    href: '/medical',
    icon: Heart,
    roles: ['medical'],
  },
  {
    title: 'Facilities',
    href: '/medical/facilities',
    icon: Heart,
    roles: ['medical'],
  },
  {
    title: 'Ambulances',
    href: '/medical/ambulances',
    icon: Ambulance,
    roles: ['medical'],
  },
  {
    title: 'Emergencies',
    href: '/medical/emergencies',
    icon: Bell,
    roles: ['medical'],
  },

  // Traffic Routes
  {
    title: 'Traffic Dashboard',
    href: '/traffic',
    icon: Car,
    roles: ['traffic'],
  },
  {
    title: 'Parking Lots',
    href: '/traffic/parking',
    icon: ParkingCircle,
    roles: ['traffic'],
  },
  {
    title: 'Vehicle Entries',
    href: '/traffic/vehicles',
    icon: Car,
    roles: ['traffic'],
  },
  {
    title: 'Shuttles',
    href: '/traffic/shuttles',
    icon: Car,
    roles: ['traffic'],
  },

  // Control Room Routes
  {
    title: 'Control Room',
    href: '/control-room',
    icon: Radio,
    roles: ['control-room'],
  },
  {
    title: 'Live Overview',
    href: '/control-room/live',
    icon: Camera,
    roles: ['control-room'],
  },
  {
    title: 'Communications',
    href: '/control-room/chat',
    icon: MessageSquare,
    roles: ['control-room'],
  },
  {
    title: 'All Alerts',
    href: '/control-room/alerts',
    icon: Bell,
    roles: ['control-room'],
  },
];

// Sidebar content component (reusable for both desktop and mobile)
function SidebarContent({ 
  filteredNavItems, 
  pathname,
  onLinkClick 
}: { 
  filteredNavItems: NavItem[]; 
  pathname: string;
  onLinkClick?: () => void;
}) {
  return (
    <div className="flex h-full flex-col bg-background">
      {/* Logo */}
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/" className="flex items-center gap-2" onClick={onLinkClick}>
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold">
            DF
          </div>
          <span className="font-bold text-lg">DivyaFlow</span>
        </Link>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-3 py-4 overflow-y-auto">
        <div className="space-y-1">
          {filteredNavItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            
            return (
              <Link key={item.href} href={item.href} onClick={onLinkClick}>
                <Button
                  variant={isActive ? 'secondary' : 'ghost'}
                  className={cn(
                    'w-full justify-start',
                    isActive && 'bg-secondary'
                  )}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.title}
                  {item.badge && (
                    <span className="ml-auto bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Button>
              </Link>
            );
          })}
        </div>

        <Separator className="my-4" />

        {/* Settings */}
        <Link href="/settings" onClick={onLinkClick}>
          <Button variant="ghost" className="w-full justify-start">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </Link>
      </div>
    </div>
  );
}

export function DashboardSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  if (!session?.user) return null;

  const userRole = session.user.role;

  // Filter nav items by user role
  const filteredNavItems = navItems.filter((item) =>
    item.roles.includes(userRole)
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden fixed top-4 left-4 z-40"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-64">
          <SidebarContent 
            filteredNavItems={filteredNavItems} 
            pathname={pathname}
            onLinkClick={() => setOpen(false)}
          />
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex h-full flex-col border-r bg-background w-64">
        <SidebarContent 
          filteredNavItems={filteredNavItems} 
          pathname={pathname}
        />
      </div>
    </>
  );
}
