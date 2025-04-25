
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ExplanationCardProps {
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

const ExplanationCard: React.FC<ExplanationCardProps> = ({ 
  title, 
  children, 
  icon,
  className 
}) => {
  return (
    <Card className={cn("overflow-hidden card-hover", className)}>
      <CardHeader className="bg-gradient-to-r from-purple-100 to-teal-50 pb-4">
        <CardTitle className="flex items-center gap-2 text-xl font-display font-semibold text-purple-700">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        {children}
      </CardContent>
    </Card>
  );
};

export default ExplanationCard;
