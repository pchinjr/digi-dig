"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Camera, LayoutGrid, User, Heart, LogOut, LogIn } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '@/context/UserContext';
import { Button } from '@/components/ui/button';

const XPTaskbar = () => {
  const [time, setTime] = useState(new Date());
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useUser();

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleStartButtonClick = () => {
    if (user) {
      logout();
      navigate('/'); // Navigate home after logout
    } else {
      navigate('/login');
    }
  };

  const startButtonLabel = user ? 'log out' : 'log in';
  const startButtonIcon = user ? <LogOut size={14} /> : <LogIn size={14} />;

  const navItems = [
    { path: '/', icon: <LayoutGrid size={16} />, label: 'Desktop' },
    { path: '/catalog', icon: <Camera size={16} />, label: 'Catalog' },
    { path: user ? '/profile' : '/login', icon: <User size={16} />, label: user ? user.username : 'Log In' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] flex h-10 items-stretch bg-gradient-to-b from-[#245edb] via-[#3f8cf3] to-[#245edb] shadow-[0_-2px_10px_rgba(0,0,0,0.2)]">
      {/* Start Button (Login/Logout) */}
      <motion.button
        onClick={handleStartButtonClick}
        whileHover={{ brightness: 1.1 }}
        whileTap={{ scale: 0.98 }}
        className="flex h-full items-center gap-2 rounded-r-2xl bg-gradient-to-b from-[#3c813c] via-[#52ad52] to-[#3c813c] px-4 italic text-white shadow-[2px_0_5px_rgba(0,0,0,0.3)]"
      >
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
          {startButtonIcon}
        </div>
        <span className="font-black tracking-tighter text-lg drop-shadow-md">{startButtonLabel}</span>
      </motion.button>

      {/* Taskbar Items */}
      <div className="flex flex-1 items-center gap-1 px-2">
        {navItems.map((item) => (
          <Link key={item.path} to={item.path}>
            <div className={`flex h-8 items-center gap-2 rounded-sm px-3 transition-colors ${
              location.pathname === item.path 
                ? 'bg-[#1e4bb3] shadow-inner border border-black/20' 
                : 'bg-[#3c81f0] hover:bg-[#5ba3ff] border border-white/10'
            }`}>
              <span className="text-white">{item.icon}</span>
              <span className="text-xs font-medium text-white hidden sm:block">{item.label}</span>
            </div>
          </Link>
        ))}
      </div>

      {/* System Tray */}
      <div className="flex items-center bg-[#0997ff] px-4 shadow-inner border-l border-white/20">
        {/* Removed redundant logout button */}
        <div className="flex items-center gap-3 text-white">
          <Heart size={14} className="text-pink-200 animate-pulse" />
          <span className="text-xs font-bold">
            {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default XPTaskbar;