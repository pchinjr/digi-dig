"use client";

import React, { useState } from 'react';
import DesktopLayout from '@/components/DesktopLayout';
import XPWindow from '@/components/XPWindow';
import { CAMERAS } from '@/data/mockData';
import CameraCard from '@/components/CameraCard';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

const Catalog = () => {
  const [search, setSearch] = useState("");

  const filteredCameras = CAMERAS.filter(c => 
    c.brand.toLowerCase().includes(search.toLowerCase()) || 
    c.model.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DesktopLayout>
      <XPWindow title="C:\Users\Admin\Desktop\Camera_Catalog" className="w-full max-w-6xl h-[80vh]">
        <div className="flex flex-col h-full">
          <div className="mb-6 flex items-center justify-between border-b border-gray-100 pb-4">
            <div>
              <h2 className="text-2xl font-black text-gray-900">The Digi-Vault</h2>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-tighter">Exploring {filteredCameras.length} items</p>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
              <Input 
                placeholder="Search cameras..." 
                className="pl-9 rounded-none border-gray-300 focus:border-blue-400 h-8 text-sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="flex-1 overflow-auto pr-2 custom-scrollbar">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredCameras.map((camera, index) => (
                <motion.div
                  key={camera.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <CameraCard camera={camera} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </XPWindow>
    </DesktopLayout>
  );
};

export default Catalog;