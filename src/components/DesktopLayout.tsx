"use client";

import React from 'react';
import XPTaskbar from './XPTaskbar';
import { motion } from 'framer-motion';

const DesktopLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#003399]">
      {/* Bliss Background (The iconic XP Hill) */}
      <div 
        className="absolute inset-0 z-0 opacity-80"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=2000)',
          backgroundSize: 'cover',
          backgroundPosition: 'center bottom'
        }}
      />
      
      {/* Aceternity-inspired Sparkles/Beams Overlay */}
      <div className="absolute inset-0 z-1 bg-gradient-to-t from-blue-900/20 to-transparent pointer-events-none" />
      
      {/* Desktop Icons (Static for aesthetic) */}
      <div className="absolute left-4 top-4 z-10 flex flex-col gap-8">
        <DesktopIcon icon={<Camera className="text-white" />} label="My Cameras" />
        <DesktopIcon icon={<User className="text-white" />} label="My Profile" />
      </div>

      {/* Main Content Area */}
      <main className="relative z-20 flex min-h-screen flex-col items-center justify-center p-4 pb-16">
        {children}
      </main>

      <XPTaskbar />
    </div>
  );
};

const DesktopIcon = ({ icon, label }: { icon: React.ReactNode, label: string }) => (
  <motion.div 
    whileHover={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
    className="flex w-20 flex-col items-center gap-1 rounded-md p-2 cursor-pointer"
  >
    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/40 backdrop-blur-sm border border-white/20 shadow-lg">
      {icon}
    </div>
    <span className="text-[10px] font-bold text-white text-center drop-shadow-md leading-tight">{label}</span>
  </motion.div>
);

import { Camera, User } from 'lucide-react';

export default DesktopLayout;