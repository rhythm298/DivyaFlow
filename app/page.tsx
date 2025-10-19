'use client';

/**
 * DivyaFlow Landing Page
 * Beautiful, modern landing page with hero section and features
 */

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  MapPin,
  Users,
  AlertCircle,
  Calendar,
  Shield,
  Activity,
  Clock,
  TrendingUp,
  Smartphone,
  Award,
  ChevronRight,
  Heart,
} from 'lucide-react';

export default function HomePage() {
  const features = [
    {
      icon: Calendar,
      title: 'Virtual Queue System',
      description:
        'Book your darshan slot in advance. Skip the physical queue with QR-code based entry.',
    },
    {
      icon: Activity,
      title: 'Real-time Crowd Analytics',
      description:
        'AI-powered crowd density monitoring with live updates and predictive insights.',
    },
    {
      icon: AlertCircle,
      title: 'Emergency Response',
      description:
        'Instant alert system coordinating security, medical, and traffic teams.',
    },
    {
      icon: MapPin,
      title: 'Smart Navigation',
      description:
        'Interactive maps showing crowd density, facilities, and optimal routes.',
    },
    {
      icon: Shield,
      title: 'Safety First',
      description:
        'AI risk scoring prevents overcrowding with automatic capacity management.',
    },
    {
      icon: Smartphone,
      title: 'Mobile-Friendly',
      description:
        'Access everything from your phone. Get notifications and live updates.',
    },
  ];

  const temples = [
    {
      name: 'Somnath Temple',
      location: 'Veraval, Gujarat',
      image: '/images/temples/somnath.jpg',
      visitors: '50K+ daily',
    },
    {
      name: 'Dwarkadhish Temple',
      location: 'Dwarka, Gujarat',
      image: '/images/temples/dwarka.jpg',
      visitors: '35K+ daily',
    },
    {
      name: 'Ambaji Temple',
      location: 'Banaskantha, Gujarat',
      image: '/images/temples/ambaji.jpg',
      visitors: '60K+ daily',
    },
    {
      name: 'Pavagadh Temple',
      location: 'Panchmahal, Gujarat',
      image: '/images/temples/pavagadh.jpg',
      visitors: '25K+ daily',
    },
  ];

  const stats = [
    { value: '4', label: 'Major Temples', icon: MapPin },
    { value: '170K+', label: 'Daily Visitors', icon: Users },
    { value: '99.9%', label: 'Uptime', icon: Activity },
    { value: '< 2 min', label: 'Response Time', icon: Clock },
  ];

  const testimonials = [
    {
      name: 'Rajesh Patel',
      role: 'Devotee from Ahmedabad',
      content:
        'Virtual queue booking saved me 3 hours of waiting! The process was smooth and the QR code entry was instant.',
      rating: 5,
    },
    {
      name: 'Dr. Meera Shah',
      role: 'Temple Administrator',
      content:
        'The crowd analytics dashboard helps us manage peak hours efficiently. Emergency response coordination has improved significantly.',
      rating: 5,
    },
    {
      name: 'Amit Kumar',
      role: 'Security Officer',
      content:
        'Real-time alerts and CCTV integration make our job much easier. We can prevent overcrowding before it becomes critical.',
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
              <Heart className="h-5 w-5 text-white" fill="white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              DivyaFlow
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/auth/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/devotee/booking">
              <Button>
                Book Darshan
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 dark:from-primary/5 dark:via-accent/5 dark:to-secondary/5" />
        
        <div className="container relative py-20 md:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              🚀 AI-Powered Temple Management
            </div>
            
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Smart Crowd Management for
              <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                {' '}
                Sacred Spaces
              </span>
            </h1>

            <p className="mb-8 text-lg text-muted-foreground md:text-xl">
              Experience seamless darshan with our AI-powered virtual queue system.
              Real-time crowd monitoring, instant booking, and emergency coordination
              for major pilgrimage sites in Gujarat.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/devotee/booking">
                <Button size="lg" className="w-full sm:w-auto">
                  Book Your Darshan
                  <Calendar className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/auth/login?role=admin">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Staff Login
                  <Shield className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border bg-card p-4 text-center transition-all hover:shadow-lg"
                >
                  <stat.icon className="mx-auto mb-2 h-6 w-6 text-primary" />
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t py-20">
        <div className="container">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Why Choose DivyaFlow?
            </h2>
            <p className="text-lg text-muted-foreground">
              Combining ancient devotion with modern technology for a safer, smoother
              temple experience.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-xl border bg-card p-6 transition-all hover:border-primary hover:shadow-lg"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-all group-hover:scale-110">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Temples Section */}
      <section className="border-t bg-muted/30 py-20">
        <div className="container">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Featured Temples
            </h2>
            <p className="text-lg text-muted-foreground">
              Book darshan at Gujarat's most revered pilgrimage destinations
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {temples.map((temple) => (
              <div
                key={temple.name}
                className="group overflow-hidden rounded-xl border bg-card transition-all hover:shadow-xl"
              >
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20">
                  {/* Placeholder for temple image */}
                  <div className="flex h-full items-center justify-center text-6xl">
                    🛕
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="mb-1 font-semibold">{temple.name}</h3>
                  <p className="mb-2 text-sm text-muted-foreground">
                    <MapPin className="mr-1 inline h-3 w-3" />
                    {temple.location}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      <Users className="mr-1 inline h-3 w-3" />
                      {temple.visitors}
                    </span>
                    <Button size="sm" variant="ghost" asChild>
                      <Link href="/devotee/booking">Book Now</Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-t py-20">
        <div className="container">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              What People Say
            </h2>
            <p className="text-lg text-muted-foreground">
              Trusted by thousands of devotees and temple management teams
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="rounded-xl border bg-card p-6 transition-all hover:shadow-lg"
              >
                <div className="mb-4 flex text-accent">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Award key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mb-4 text-muted-foreground">{testimonial.content}</p>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 py-20">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Ready to Experience Seamless Darshan?
            </h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Join thousands of devotees who have made their temple visits smoother and safer
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/devotee/booking">
                <Button size="lg" className="w-full sm:w-auto">
                  Book Now - It's Free
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Create Account
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
                  <Heart className="h-4 w-4 text-white" fill="white" />
                </div>
                <span className="font-bold">DivyaFlow</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Smart temple crowd management for safer, smoother pilgrimage experiences.
              </p>
            </div>

            <div>
              <h4 className="mb-4 font-semibold">Quick Links</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/devotee/booking" className="hover:text-primary">
                    Book Darshan
                  </Link>
                </li>
                <li>
                  <Link href="/temples" className="hover:text-primary">
                    Temples
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-primary">
                    About Us
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 font-semibold">For Staff</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/auth/login" className="hover:text-primary">
                    Staff Login
                  </Link>
                </li>
                <li>
                  <Link href="/admin" className="hover:text-primary">
                    Admin Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/control-room" className="hover:text-primary">
                    Control Room
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 font-semibold">Contact</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Email: support@divyaflow.com</li>
                <li>Phone: +91 1800 123 4567</li>
                <li>24/7 Emergency Helpline</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
            <p>
              &copy; {new Date().getFullYear()} DivyaFlow. Built with ❤️ for devotees
              across Gujarat.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
