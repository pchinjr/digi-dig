"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface AppWindowProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const AppWindow = ({ 
  title, 
  children, 
  className, 
}: AppWindowProps) => {
  // Removed navigation/close logic as requested for a cleaner app aesthetic

  return (
    <Card className={cn(
      "w-full max-w-4xl mx-auto rounded-xl shadow-2xl border-2 border-gray-100 bg-white overflow-hidden",
      className
    )}>
      {/* Header */}
      <CardHeader className="flex flex-row items-center justify-between p-4 border-b border-gray-100 bg-gray-50">
        <CardTitle className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-pink-500" />
          {title}
        </CardTitle>
        {/* Removed window controls */}
      </CardHeader>

      {/* Content Area */}
      <CardContent className="p-6">
        {children}
      </CardContent>
    </Card>
  );
};

export default AppWindow;