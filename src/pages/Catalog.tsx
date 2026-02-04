"use client";

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { CAMERAS } from '@/data/mockData';
import CameraCard from '@/components/CameraCard';
import { Input } from '@/components/ui/input';
import { Search, SlidersHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';

const Catalog = () => {
  const [search, setSearch] = useState("");
  const [owned, setOwned] = useState<string[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);

  const filteredCameras = CAMERAS.filter(c => 
    c.brand.toLowerCase().includes(search.toLowerCase()) || 
    c.model.toLowerCase().includes(search.toLowerCase())
  );

  const toggleOwned = (id: string) => {
    setOwned(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const toggleWishlist = (id: string) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  return (
    <div className="min-h-screen bg-[#fdfcf0] pb-20">
      <Navbar />
      
      <main className="mx-auto max-w-6xl px-4 pt-12">
        <header className="mb-12 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-black text-gray-900 mb-4 tracking-tight"
          >
            The <span className="text-pink-500 italic">Digi-Vault</span>
          </motion.h1>
          <p className="text-gray-500 max-w-md mx-auto">
            Explore the iconic cameras that defined a generation of digital memories.
          </p>
        </header>

        <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <Input 
              placeholder="Search by brand or model..." 
              className="pl-10 rounded-2xl border-2 border-blue-100 focus:border-pink-300 transition-all bg-white"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white border-2 border-blue-100 text-gray-600 hover:border-pink-200 transition-all">
            <SlidersHorizontal size={18} />
            <span>Filters</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCameras.map((camera, index) => (
            <motion.div
              key={camera.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <CameraCard 
                camera={camera} 
                isOwned={owned.includes(camera.id)}
                isWishlist={wishlist.includes(camera.id)}
                onToggleOwned={() => toggleOwned(camera.id)}
                onToggleWishlist={() => toggleWishlist(camera.id)}
              />
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Catalog;