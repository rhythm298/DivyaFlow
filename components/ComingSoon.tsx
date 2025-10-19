'use client';

/**
 * Coming Soon Page Template
 * Placeholder for features under development
 */

import { DashboardLayout } from '@/components/dashboard';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Construction, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface ComingSoonProps {
  title: string;
  description?: string;
  backLink?: string;
}

export default function ComingSoonPage({
  title = 'Feature Under Development',
  description = 'This feature is coming soon! We\'re working hard to bring you this functionality.',
  backLink = '/',
}: ComingSoonProps) {
  return (
    <DashboardLayout>
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
                <Construction className="h-10 w-10 text-primary" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">{title}</h2>
                <p className="text-muted-foreground">{description}</p>
              </div>
              <Link href={backLink}>
                <Button variant="outline" className="mt-4">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Go Back
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
