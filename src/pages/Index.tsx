"use client";

import React from 'react';
import AppLayout from '@/components/AppLayout';
import AppWindow from '@/components/AppWindow';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Camera } from 'lucide-react';

const Index = () => {
  return (
    <AppLayout>
      <AppWindow title="Welcome to Digi-Dream v1.0" className="w-full max-w-3xl">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-50 border border-pink-200 text-pink-600 text-xs font-bold">
              <Sparkles size={14} />
              System Ready: Nostalgia Loaded
            </div>
            
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter leading-none">
              The Social Home for <br />
              <span className="text-purple-600 italic">Digicam Lovers</span>
            </h1>
            
            <p className="text-gray-600 font-medium">
              Catalog your collection, share your lo-fi shots, and find your next dream camera from the golden era (2000-2012).
            </p>

            <div className="flex flex-wrap gap-3">
              <Link to="/catalog">
                <Button className="rounded-full bg-pink-500 hover:bg-pink-600 text-white px-6 h-10 font-bold shadow-lg shadow-pink-500/30 transition-all">
                  Explore Catalog
                  <ArrowRight className="ml-2" size={16} />
                </Button>
              </Link>
              <Link to="/profile">
                <Button variant="outline" className="rounded-full border-2 border-blue-200 text-blue-600 hover:bg-blue-50 px-6 h-10 font-bold">
                  My Collection
                </Button>
              </Link>
            </div>
          </div>

          <motion.div 
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="relative hidden md:block"
          >
            <div className="h-48 w-48 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 p-1 shadow-2xl">
              <div className="h-full w-full rounded-full bg-white overflow-hidden border-4 border-white">
                <img 
                  src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800" 
                  alt="Retro Camera"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <div className="absolute -bottom-2 -right-2 h-12 w-12 rounded-full bg-yellow-400 border-4 border-white flex items-center justify-center shadow-lg">
              <Camera size={20} className="text-yellow-900" />
            </div>
          </motion.div>
        </div>

        <div className="mt-12 grid grid-cols-3 gap-4 border-t border-gray-100 pt-8">
          <StatCard label="Cameras" value="1.2k" />
          <StatCard label="Photos" value="8.5k" />
          <StatCard label="Members" value="4.2k" />
        </div>
      </AppWindow>
    </AppLayout>
  );
};

const StatCard = ({ label, value }: { label: string, value: string }) => (
  <div className="text-center">
    <p className="text-2xl font-black text-purple-600">{value}</p>
    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{label}</p>
  </div>
);

export default Index;