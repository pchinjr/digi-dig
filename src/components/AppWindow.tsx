"use client";

import React from 'react';
import { X, Minus, Square } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface AppWindowProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  onClose?: () => void;
}

const AppWindow = ({ 
  title, 
  children, 
  className, 
  onClose,
}: AppWindowProps) => {
  const navigate = useNavigate();

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      // Default close action navigates home
      navigate('/');
    }
  };

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
        <div className="flex gap-2">
          <button 
            onClick={() => navigate('/')}
            className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
            title="Minimize"
          >
            <Minus size={14} />
          </button>
          <button 
            className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition-colors"
            title="Maximize"
          >
            <Square size={12} />
          </button>
          <button 
            onClick={handleClose}
            className="flex h-6 w-6 items-center justify-center rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
            title="Close"
          >
            <X size={14} />
          </button>
        </div>
      </CardHeader>

      {/* Content Area */}
      <CardContent className="p-6">
        {children}
      </CardContent>
    </Card>
  );
};

export default AppWindow;