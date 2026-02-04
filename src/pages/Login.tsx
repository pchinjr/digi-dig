"use client";

import React, { useState } from 'react';
import AppLayout from '@/components/AppLayout';
import AppWindow from '@/components/AppWindow';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Camera, LogIn, Loader2 } from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { useNavigate, Navigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, login, isLoading } = useUser();
  const navigate = useNavigate();

  // If the user is already logged in, redirect them to the profile page
  if (user && !isLoading) {
    return <Navigate to="/profile" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await login(email, password);
    setIsSubmitting(false);
  };

  if (isLoading) {
    return (
      <AppLayout>
        <AppWindow title="Loading Session" className="w-full max-w-md">
          <div className="flex flex-col items-center justify-center p-10">
            <Loader2 className="h-8 w-8 animate-spin text-secondary" />
            <p className="mt-4 text-sm text-gray-500">Checking session...</p>
          </div>
        </AppWindow>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <AppWindow title="Log In to digi-dig" className="w-full max-w-md">
        <div className="space-y-6 p-6">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 rounded-lg bg-primary p-2 text-primary-foreground flex items-center justify-center mb-2">
              <Camera size={24} />
            </div>
            <h2 className="text-xl font-black text-gray-900">User Authentication</h2>
            <p className="text-xs text-gray-500">Use your registered email and password.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="user@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-lg border-gray-300 focus:border-secondary h-10"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-lg border-gray-300 focus:border-secondary h-10"
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full rounded-lg bg-secondary hover:bg-secondary/90 text-white h-10 font-bold shadow-lg shadow-secondary/40 transition-all"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <LogIn size={16} className="mr-2" />
              )}
              {isSubmitting ? 'Logging In...' : 'Log In'}
            </Button>
          </form>
          
          <p className="text-center text-sm text-gray-500">
            Don't have an account? <span className="text-secondary font-semibold cursor-pointer hover:underline">Sign Up (Not yet implemented)</span>
          </p>
        </div>
      </AppWindow>
    </AppLayout>
  );
};

export default LoginPage;