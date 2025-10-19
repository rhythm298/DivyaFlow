import { ReactNode } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ChartWrapperProps {
  title: string;
  description?: string;
  children: ReactNode;
  action?: ReactNode;
}

export function ChartWrapper({ title, description, children, action }: ChartWrapperProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </div>
          {action && <div>{action}</div>}
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          {children}
        </div>
      </CardContent>
    </Card>
  );
}
