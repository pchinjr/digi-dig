"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import { CAMERAS } from '@/data/mockData';
import CameraCard from '@/components/CameraCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { User, Settings, MapPin, Camera } from 'lucide-react';

const Profile = () => {
  // Mocking owned and wishlist for profile view
  const ownedIds = ["canon-ixus-70", "olympus-mju-mini"];
  const wishlistIds = ["sony-cybershot-t700"];

  const ownedCameras = CAMERAS.filter(c => ownedIds.includes(c.id));
  const wishlistCameras = CAMERAS.filter(c => wishlistIds.includes(c.id));

  return (
    <div className="min-h-screen bg-[#fdfcf0] pb-20">
      <Navbar />
      
      <main className="mx-auto max-w-5xl px-4 pt-12">
        <div className="mb-12 flex flex-col md:flex-row items-center gap-8 bg-white p-8 rounded-[3rem] border-2 border-blue-100 shadow-sm">
          <div className="relative">
            <div className="h-32 w-32 rounded-full bg-gradient-to-br from-pink-300 to-purple-300 p-1">
              <div className="h-full w-full rounded-full bg-white p-1">
                <img 
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=pixel_queen" 
                  alt="Avatar" 
                  className="h-full w-full rounded-full bg-blue-50"
                />
              </div>
            </div>
            <div className="absolute -bottom-2 -right-2 h-10 w-10 rounded-full bg-yellow-300 border-4 border-white flex items-center justify-center">
              <Camera size={16} className="text-yellow-800" />
            </div>
          </div>

          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-2">
              <h1 className="text-3xl font-black text-gray-900">pixel_queen</h1>
              <button className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-100 text-gray-600 text-sm font-bold hover:bg-gray-200 transition-all">
                <Settings size={14} />
                Edit Profile
              </button>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-4 text-gray-500 text-sm mb-4">
              <span className="flex items-center gap-1"><MapPin size={14} /> Tokyo, JP</span>
              <span>•</span>
              <span className="font-bold text-pink-500">12 Photos</span>
            </div>
            <p className="text-gray-600 max-w-md">
              Collecting CCD sensors and chasing that early 2000s aesthetic. Canon IXUS enthusiast. ✨
            </p>
          </div>
        </div>

        <Tabs defaultValue="collection" className="w-full">
          <TabsList className="w-full justify-start bg-transparent border-b-2 border-blue-50 rounded-none h-auto p-0 mb-8">
            <TabsTrigger 
              value="collection" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-pink-500 data-[state=active]:bg-transparent data-[state=active]:text-pink-500 px-8 py-4 font-bold text-gray-400"
            >
              My Collection ({ownedCameras.length})
            </TabsTrigger>
            <TabsTrigger 
              value="wishlist" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-pink-500 data-[state=active]:bg-transparent data-[state=active]:text-pink-500 px-8 py-4 font-bold text-gray-400"
            >
              Wishlist ({wishlistCameras.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="collection">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {ownedCameras.map((camera) => (
                <CameraCard key={camera.id} camera={camera} isOwned={true} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="wishlist">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlistCameras.map((camera) => (
                <CameraCard key={camera.id} camera={camera} isWishlist={true} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Profile;