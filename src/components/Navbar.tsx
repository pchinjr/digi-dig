"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, Heart, User, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useUser } from '@/context/UserContext';

const Navbar = () => {
  const { user } = useUser();
  const profilePath = user ? "/profile" : "/login";

  return (
    <nav className="sticky top-4 z-50 mx-auto max-w-4xl px-4">
      <div className="flex items-center justify-between rounded-xl border-4 border-secondary/50 bg-white/90 p-2 px-6 backdrop-blur-md shadow-[0_8px_32px_rgba(255,100,200,0.3)]">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="rounded-lg bg-primary p-2 text-primary-foreground group-hover:rotate-6 transition-transform duration-300">
            <Camera size={20} />
          </div>
          <span className="font-extrabold text-xl text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary tracking-tighter uppercase">
            digi-dig
          </span>
        </Link>

        <div className="flex items-center gap-6">
          <Link to="/catalog" className="text-sm font-bold text-gray-700 hover:text-secondary transition-colors flex items-center gap-1">
            <Sparkles size={14} className="text-yellow-500" />
            Catalog
          </Link>
          <Link to={profilePath} className="text-sm font-bold text-gray-700 hover:text-secondary transition-colors flex items-center gap-1">
            <Heart size={14} className="text-secondary" />
            Collection
          </Link>
          <Link to={profilePath} className="rounded-lg bg-primary/10 p-2 text-primary hover:bg-primary/20 transition-colors">
            <User size={20} />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;