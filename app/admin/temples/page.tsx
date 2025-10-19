'use client';

import { DashboardLayout } from '@/components/dashboard';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Construction, ArrowLeft, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function AdminTemplesPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <MapPin className="h-8 w-8" />
            Manage Temples
          </h1>
          <p className="text-muted-foreground mt-1">Configure temple settings and information</p>
        </div>

        <div className="flex items-center justify-center min-h-[40vh]">
          <Card className="max-w-md w-full">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
                  <Construction className="h-10 w-10 text-primary animate-pulse" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold">Coming Soon</h2>
                  <p className="text-muted-foreground">
                    Temple management features are under development. You'll be able to:
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1 text-left">
                    <li>• Add and edit temple information</li>
                    <li>• Manage darshan timings</li>
                    <li>• Configure capacity limits</li>
                    <li>• Update temple photos and details</li>
                  </ul>
                </div>
                <Link href="/admin">
                  <Button variant="outline" className="mt-4">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Dashboard
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
