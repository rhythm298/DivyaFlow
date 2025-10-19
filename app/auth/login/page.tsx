'use client';

/**
 * Login Page
 * Authentication with role selection and demo credentials
 */

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Heart, Mail, Lock, User, Shield, Stethoscope, Car, Radio, Chrome, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { DEMO_CREDENTIALS } from '@/lib/auth-helpers';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const roles = [
    { value: 'devotee', label: 'Devotee', icon: Heart, color: 'text-pink-500', desc: 'Book darshan & view history' },
    { value: 'admin', label: 'Admin', icon: Shield, color: 'text-primary', desc: 'Manage system & analytics' },
    { value: 'security', label: 'Security', icon: Shield, color: 'text-blue-500', desc: 'Monitor crowds & alerts' },
    { value: 'medical', label: 'Medical', icon: Stethoscope, color: 'text-red-500', desc: 'Handle emergencies' },
    { value: 'traffic', label: 'Traffic', icon: Car, color: 'text-green-500', desc: 'Manage parking & vehicles' },
    { value: 'control-room', label: 'Control Room', icon: Radio, color: 'text-purple-500', desc: 'Master dashboard' },
  ];

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('Invalid email or password');
        toast.error('Login failed', {
          description: 'Please check your credentials and try again',
        });
      } else {
        toast.success('Login successful!', {
          description: 'Redirecting to your dashboard...',
        });
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      toast.error('Login error', {
        description: 'Something went wrong. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      await signIn('google', { callbackUrl });
    } catch (err) {
      setError('Google sign-in failed');
      setIsLoading(false);
    }
  };

  const handleQuickLogin = async (role: keyof typeof DEMO_CREDENTIALS) => {
    setIsLoading(true);
    setError('');

    const credentials = DEMO_CREDENTIALS[role];
    
    try {
      const result = await signIn('credentials', {
        email: credentials.email,
        password: credentials.password,
        redirect: false,
      });

      if (result?.error) {
        setError('Quick login failed');
        toast.error('Login failed');
      } else {
        toast.success(`Logged in as ${credentials.name}!`);
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (err) {
      setError('An error occurred');
      toast.error('Login error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 p-4">
      <div className="w-full max-w-6xl">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
              <Heart className="h-6 w-6 text-white" fill="white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              DivyaFlow
            </span>
          </Link>
          <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
          <p className="text-muted-foreground">Sign in to access your dashboard</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Main Login Card */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Sign In</CardTitle>
              <CardDescription>
                Enter your credentials or use a demo account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="email" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="email">Email</TabsTrigger>
                  <TabsTrigger value="google">Google</TabsTrigger>
                </TabsList>

                <TabsContent value="email">
                  <form onSubmit={handleEmailLogin} className="space-y-4">
                    {error && (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="admin@divyaflow.com"
                          className="pl-9"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          disabled={isLoading}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="password"
                          type="password"
                          placeholder="••••••••"
                          className="pl-9"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          disabled={isLoading}
                        />
                      </div>
                    </div>

                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? 'Signing in...' : 'Sign In'}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="google">
                  <div className="space-y-4">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={handleGoogleLogin}
                      disabled={isLoading}
                    >
                      <Chrome className="mr-2 h-4 w-4" />
                      Continue with Google
                    </Button>
                    <p className="text-xs text-center text-muted-foreground">
                      New users will be registered as devotees by default
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              <Link href="/auth/register" className="text-sm text-primary hover:underline">
                Don't have an account? Register here
              </Link>
              <Link href="/" className="text-sm text-muted-foreground hover:underline">
                Back to home
              </Link>
            </CardFooter>
          </Card>

          {/* Quick Login Card */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Quick Login (Demo)</CardTitle>
              <CardDescription>
                Choose a role to instantly login with demo credentials
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {roles.map((role) => (
                  <Button
                    key={role.value}
                    variant="outline"
                    className="justify-start h-auto p-4"
                    onClick={() => handleQuickLogin(role.value as keyof typeof DEMO_CREDENTIALS)}
                    disabled={isLoading}
                  >
                    <role.icon className={`mr-3 h-5 w-5 ${role.color}`} />
                    <div className="flex flex-col items-start">
                      <span className="font-semibold">{role.label}</span>
                      <span className="text-xs text-muted-foreground">{role.desc}</span>
                    </div>
                  </Button>
                ))}
              </div>

              <Alert className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Demo Credentials:</strong> All passwords are{' '}
                  <code className="bg-muted px-1 py-0.5 rounded">
                    {'{role}'}123
                  </code>{' '}
                  (e.g., admin123, devotee123)
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>

        {/* Info Banner */}
        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>
            This is a demo application for hackathon purposes. All data is simulated.
          </p>
        </div>
      </div>
    </div>
  );
}
