/**
 * Next.js Middleware
 * Handles route protection and redirects based on authentication
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/lib/auth';

// Define public routes that don't require authentication
const publicRoutes = ['/', '/auth/login', '/auth/register', '/auth/error'];

// Define role-based route prefixes
const roleRoutes = {
  admin: ['/admin'],
  security: ['/security'],
  medical: ['/medical'],
  traffic: ['/traffic'],
  'control-room': ['/control-room'],
  devotee: ['/devotee', '/booking'],
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public routes
  if (publicRoutes.some((route) => pathname === route)) {
    return NextResponse.next();
  }

  // Allow static files and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/fonts')
  ) {
    return NextResponse.next();
  }

  // Get session
  const session = await auth();

  // Redirect to login if not authenticated
  if (!session?.user) {
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Check role-based access
  const userRole = session.user.role;
  
  // Check if user is trying to access a role-specific route
  for (const [role, routes] of Object.entries(roleRoutes)) {
    if (routes.some((route) => pathname.startsWith(route))) {
      // Allow access if user has the required role or is admin
      if (userRole === role || userRole === 'admin') {
        return NextResponse.next();
      }
      
      // Redirect to unauthorized page
      return NextResponse.redirect(new URL('/auth/unauthorized', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\..*|api).*)',
  ],
};
