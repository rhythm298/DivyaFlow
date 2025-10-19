'use client';

/**
 * Role Guard Component
 * Restricts component rendering based on user roles
 */

import { useSession } from 'next-auth/react';
import { UserRole } from '@/types';
import { ReactNode } from 'react';

interface RoleGuardProps {
  children: ReactNode;
  allowedRoles: UserRole[];
  fallback?: ReactNode;
}

export function RoleGuard({ children, allowedRoles, fallback = null }: RoleGuardProps) {
  const { data: session } = useSession();

  if (!session?.user) {
    return <>{fallback}</>;
  }

  const userHasRole = allowedRoles.includes(session.user.role);

  if (!userHasRole) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
