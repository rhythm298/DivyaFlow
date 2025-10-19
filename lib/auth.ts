/**
 * NextAuth.js v5 Configuration
 * Authentication setup with multiple providers
 */

import NextAuth, { NextAuthConfig } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { supabase } from './supabase/client';

import type { User, UserRole } from '@/types';

// Extend the built-in session types
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      role: UserRole;
      avatar?: string;
      bhaktiScore?: number;
    };
  }

  interface User {
    id: string;
    role: UserRole;
    bhaktiScore?: number;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: UserRole;
    bhaktiScore?: number;
  }
}

export const authConfig: NextAuthConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          // Query Supabase for user
          const { data: user, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', credentials.email)
            .single();

          if (error || !user) {
            // For demo purposes, create hardcoded test users
            const testUsers = [
              {
                id: '1',
                email: 'admin@divyaflow.com',
                name: 'Admin User',
                role: 'admin' as UserRole,
                password: 'admin123',
              },
              {
                id: '2',
                email: 'security@divyaflow.com',
                name: 'Security Officer',
                role: 'security' as UserRole,
                password: 'security123',
              },
              {
                id: '3',
                email: 'medical@divyaflow.com',
                name: 'Medical Staff',
                role: 'medical' as UserRole,
                password: 'medical123',
              },
              {
                id: '4',
                email: 'traffic@divyaflow.com',
                name: 'Traffic Controller',
                role: 'traffic' as UserRole,
                password: 'traffic123',
              },
              {
                id: '5',
                email: 'devotee@divyaflow.com',
                name: 'Sample Devotee',
                role: 'devotee' as UserRole,
                password: 'devotee123',
                bhaktiScore: 450,
              },
              {
                id: '6',
                email: 'control@divyaflow.com',
                name: 'Control Room',
                role: 'control-room' as UserRole,
                password: 'control123',
              },
            ];

            const testUser = testUsers.find(
              (u) => u.email === credentials.email && u.password === credentials.password
            );

            if (!testUser) {
              return null;
            }

            return {
              id: testUser.id,
              email: testUser.email,
              name: testUser.name,
              role: testUser.role,
              bhaktiScore: testUser.bhaktiScore,
            };
          }

          // In production, verify password hash here
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role as UserRole,
            avatar: user.avatar,
            bhaktiScore: user.bhakti_score,
          };
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/login',
    signOut: '/auth/logout',
    error: '/auth/error',
  },
  callbacks: {
    async jwt({ token, user, account }) {
      // Initial sign in
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.bhaktiScore = user.bhaktiScore;
      }

      // Google OAuth - create or fetch user from database
      if (account?.provider === 'google' && user) {
        try {
          // Check if user exists in Supabase
          const { data: existingUser } = await supabase
            .from('users')
            .select('*')
            .eq('email', user.email)
            .single();

          if (existingUser) {
            token.id = existingUser.id;
            token.role = existingUser.role as UserRole;
            token.bhaktiScore = existingUser.bhakti_score;
          } else {
            // Create new user - default to 'devotee' role
            const { data: newUser, error } = await supabase
              .from('users')
              .insert({
                email: user.email!,
                name: user.name!,
                avatar: user.image,
                role: 'devotee',
                bhakti_score: 0,
              })
              .select()
              .single();

            if (!error && newUser) {
              token.id = newUser.id;
              token.role = 'devotee';
              token.bhaktiScore = 0;

              // Create bhakti profile
              await supabase.from('bhakti_profiles').insert({
                user_id: newUser.id,
                total_score: 0,
                level: 1,
              });
            }
          }
        } catch (error) {
          console.error('Error creating user:', error);
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.bhaktiScore = token.bhaktiScore;
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  trustHost: true,
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
