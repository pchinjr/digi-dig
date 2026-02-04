"use client";

import React from 'react';
import DesktopLayout from '@/components/DesktopLayout';
import XPWindow from '@/components/XPWindow';
import { CAMERAS } from '@/data/mockData';
import CameraCard from '@/components/CameraCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, MapPin, Camera } from 'lucide-react';

const Profile = () => {
  const ownedIds = ["canon-ixus-70", "olympus-mju-mini"];
  const ownedCameras = CAMERAS.filter(c => ownedIds.includes(c.id));

  return (
    <DesktopLayout>
      <XPWindow title="User Profile: pixel_queen" className="w-full max-w-4xl">
        <div className="flex flex-col md:flex-row items-start gap-8 mb-8">
          <div className="relative">
            <div className="h-24 w-24 rounded-none border-2 border-blue-400 p-1 bg-white shadow-md">
              <img 
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=pixel_queen" 
                alt="Avatar" 
                className="h-full w-full bg-blue-50"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 h-8 w-8 bg-green-500 border-2 border-white flex items-center justify-center shadow-sm">
              <div className="h-2 w-2 rounded-full bg-white animate-pulse" />
            </div>
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-4 mb-2">
              <h1 className="text-2xl font-black text-gray-900">pixel_queen</h1>
              <button className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 bg-gray-100 border border-gray-300 hover:bg-gray-200 transition-colors">
                Edit Profile
              </button>
            </div>
            <div className="flex items-center gap-4 text-gray-500 text-xs font-bold mb-4">
              <span className="flex items-center gap-1"><MapPin size={12} /> Tokyo, JP</span>
              <span className="text-blue-500">12 Photos Uploaded</span>
            </div>
            <p className="text-sm text-gray-600 max-w-md italic">
              "Collecting CCD sensors and chasing that early 2000s aesthetic. Canon IXUS enthusiast. ✨"
            </p>
          </div>
        </div>

        <Tabs defaultValue="collection" className="w-full">
          <TabsList className="w-full justify-start bg-gray-100 border border-gray-300 rounded-none h-auto p-0 mb-6">
            <TabsTrigger 
              value="collection" 
              className="rounded-none data-[state=active]:bg-white data-[state=active]:border-b-transparent border-r border-gray-300 px-6 py-2 text-xs font-bold"
            >
              My Collection
            </TabsTrigger>
            <TabsTrigger 
              value="wishlist" 
              className="rounded-none data-[state=active]:bg-white data-[state=active]:border-b-transparent border-r border-gray-300 px-6 py-2 text-xs font-bold"
            >
              Wishlist
            </TabsTrigger>
          </TabsList>

          <TabsContent value="collection">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {ownedCameras.map((camera) => (
                <CameraCard key={camera.id} camera={camera} isOwned={true} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </XPWindow>
    </DesktopLayout>
  );
};

export default Profile;