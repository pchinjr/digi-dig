"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, Heart, User, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
  return (
    <nav className="sticky top-4 z-50 mx-auto max-w-4xl px-4">
      <div className="flex items-center justify-between rounded-full border-2 border-pink-200 bg-white/80 p-2 px-6 backdrop-blur-md shadow-[0_8px_32px_rgba(255,182,193,0.2)]">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="rounded-full bg-gradient-to-br from-pink-400 to-purple-400 p-2 text-white group-hover:rotate-12 transition-transform">
            <Camera size={20} />
          </div>
          <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 tracking-tight">
            DIGI-DREAM
          </span>
        </Link>

        <div className="flex items-center gap-6">
          <Link to="/catalog" className="text-sm font-medium text-gray-600 hover:text-pink-500 transition-colors flex items-center gap-1">
            <Sparkles size={14} className="text-yellow-400" />
            Catalog
          </Link>
          <Link to="/profile" className="text-sm font-medium text-gray-600 hover:text-pink-500 transition-colors flex items-center gap-1">
            <Heart size={14} className="text-pink-400" />
            Collection
          </Link>
          <Link to="/profile" className="rounded-full bg-blue-50 p-2 text-blue-500 hover:bg-blue-100 transition-colors">
            <User size={20} />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;