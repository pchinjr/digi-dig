"use client";

import React, { useState } from 'react';
import DesktopLayout from '@/components/DesktopLayout';
import XPWindow from '@/components/XPWindow';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Camera, LogIn } from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { useNavigate, Navigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { user, login } = useUser();
  const navigate = useNavigate();

  // If the user is already logged in, redirect them to the profile page
  if (user) {
    return <Navigate to="/profile" replace />;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(username, password)) {
      navigate('/profile');
    }
  };

  return (
    <DesktopLayout>
      <XPWindow title="Log In to Digi-Dream" className="w-full max-w-md">
        <div className="space-y-6 p-6">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 p-2 text-white flex items-center justify-center mb-2">
              <Camera size={24} />
            </div>
            <h2 className="text-xl font-black text-gray-900">User Authentication</h2>
            <p className="text-xs text-gray-500">Use mock credentials: pixel_queen / password</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input 
                id="username" 
                type="text" 
                placeholder="pixel_queen" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="rounded-none border-gray-300 focus:border-blue-400 h-9"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-none border-gray-300 focus:border-blue-400 h-9"
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full rounded-none bg-[#3c813c] hover:bg-[#4caf50] text-white h-10 font-bold shadow-[2px_2px_0_rgba(0,0,0,0.2)]"
            >
              <LogIn size={16} className="mr-2" />
              Log In
            </Button>
          </form>
        </div>
      </XPWindow>
    </DesktopLayout>
  );
};

export default LoginPage;