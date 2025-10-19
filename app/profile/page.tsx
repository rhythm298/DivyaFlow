'use client';

/**
 * Profile Page - Role-based redirect
 * Redirects users to their role-specific profile page
 */

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/dashboard';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.role) {
      // Redirect based on user role
      switch (session.user.role) {
        case 'devotee':
          router.push('/devotee/profile');
          break;
        case 'admin':
        case 'security':
        case 'medical':
        case 'traffic':
        case 'control-room':
          // For now, redirect to settings for non-devotee users
          router.push('/settings');
          break;
        default:
          router.push('/settings');
      }
    }
  }, [session, status, router]);

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <Skeleton className="h-12 w-64" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    </DashboardLayout>
  );
}
