/**
 * Authentication Helper Functions
 * Utilities for checking user roles and permissions
 */

import { auth } from '@/lib/auth';
import type { UserRole } from '@/types';

/**
 * Get the current authenticated user session
 */
export async function getCurrentUser() {
  const session = await auth();
  return session?.user;
}

/**
 * Check if user has required role
 */
export async function hasRole(requiredRole: UserRole | UserRole[]) {
  const user = await getCurrentUser();
  
  if (!user) return false;
  
  if (Array.isArray(requiredRole)) {
    return requiredRole.includes(user.role);
  }
  
  return user.role === requiredRole;
}

/**
 * Check if user is admin
 */
export async function isAdmin() {
  return hasRole('admin');
}

/**
 * Check if user is staff (any role except devotee)
 */
export async function isStaff() {
  return hasRole(['admin', 'security', 'medical', 'traffic', 'control-room']);
}

/**
 * Require authentication - throw error if not authenticated
 */
export async function requireAuth() {
  const user = await getCurrentUser();
  
  if (!user) {
    throw new Error('Unauthorized - Please login');
  }
  
  return user;
}

/**
 * Require specific role - throw error if user doesn't have role
 */
export async function requireRole(requiredRole: UserRole | UserRole[]) {
  const user = await requireAuth();
  
  const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
  
  if (!roles.includes(user.role)) {
    throw new Error(`Forbidden - Required role: ${roles.join(' or ')}`);
  }
  
  return user;
}

/**
 * Demo credentials for testing
 */
export const DEMO_CREDENTIALS = {
  admin: {
    email: 'admin@divyaflow.com',
    password: 'admin123',
    name: 'Admin User',
  },
  security: {
    email: 'security@divyaflow.com',
    password: 'security123',
    name: 'Security Officer',
  },
  medical: {
    email: 'medical@divyaflow.com',
    password: 'medical123',
    name: 'Medical Staff',
  },
  traffic: {
    email: 'traffic@divyaflow.com',
    password: 'traffic123',
    name: 'Traffic Controller',
  },
  devotee: {
    email: 'devotee@divyaflow.com',
    password: 'devotee123',
    name: 'Sample Devotee',
  },
  'control-room': {
    email: 'control@divyaflow.com',
    password: 'control123',
    name: 'Control Room',
  },
};
