'use client';

/**
 * Dashboard Layout Component
 * Wrapper for all dashboard pages with sidebar and header
 */

import { ReactNode } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { DashboardSidebar } from './Sidebar';
import { DashboardHeader } from './Header';
import { Skeleton } from '@/components/ui/skeleton';

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { data: session, status } = useSession();

  // Show loading state
  if (status === 'loading') {
    return (
      <div className="flex h-screen">
        <div className="w-64 border-r p-4 space-y-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="flex-1">
          <div className="h-16 border-b p-4">
            <Skeleton className="h-8 w-48" />
          </div>
          <div className="p-8 space-y-4">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
        </div>
      </div>
    );
  }

  // Redirect if not authenticated
  if (status === 'unauthenticated') {
    redirect('/auth/login');
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar - Desktop and Mobile */}
      <DashboardSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        
        <main className="flex-1 overflow-y-auto bg-muted/20">
          <div className="container mx-auto p-4 md:p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
