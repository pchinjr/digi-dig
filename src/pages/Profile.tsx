"use client";

import React from 'react';
import DesktopLayout from '@/components/DesktopLayout';
import XPWindow from '@/components/XPWindow';
import { CAMERAS } from '@/data/mockData';
import CameraCard from '@/components/CameraCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, LogIn } from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { Link, Navigate } from 'react-router-dom';

const Profile = () => {
  const { user } = useUser();

  if (!user) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" />;
  }

  const ownedCameras = CAMERAS.filter(c => user.ownedCameraIds.includes(c.id));
  const wishlistCameras = CAMERAS.filter(c => user.wishlistCameraIds.includes(c.id));

  return (
    <DesktopLayout>
      <XPWindow title={`User Profile: ${user.username}`} className="w-full max-w-4xl">
        <div className="flex flex-col md:flex-row items-start gap-8 mb-8">
          <div className="relative">
            <div className="h-24 w-24 rounded-none border-2 border-blue-400 p-1 bg-white shadow-md">
              <img 
                src={user.avatarUrl} 
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
              <h1 className="text-2xl font-black text-gray-900">{user.username}</h1>
              <button className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 bg-gray-100 border border-gray-300 hover:bg-gray-200 transition-colors">
                Edit Profile
              </button>
            </div>
            <div className="flex items-center gap-4 text-gray-500 text-xs font-bold mb-4">
              <span className="flex items-center gap-1"><MapPin size={12} /> {user.location}</span>
              <span className="text-blue-500">{ownedCameras.length} Cameras Owned</span>
            </div>
            <p className="text-sm text-gray-600 max-w-md italic">
              "{user.bio}"
            </p>
          </div>
        </div>

        <Tabs defaultValue="collection" className="w-full">
          <TabsList className="w-full justify-start bg-gray-100 border border-gray-300 rounded-none h-auto p-0 mb-6">
            <TabsTrigger 
              value="collection" 
              className="rounded-none data-[state=active]:bg-white data-[state=active]:border-b-transparent border-r border-gray-300 px-6 py-2 text-xs font-bold"
            >
              My Collection ({ownedCameras.length})
            </TabsTrigger>
            <TabsTrigger 
              value="wishlist" 
              className="rounded-none data-[state=active]:bg-white data-[state=active]:border-b-transparent border-r border-gray-300 px-6 py-2 text-xs font-bold"
            >
              Wishlist ({wishlistCameras.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="collection">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {ownedCameras.length > 0 ? (
                ownedCameras.map((camera) => (
                  <CameraCard key={camera.id} camera={camera} isOwned={true} />
                ))
              ) : (
                <p className="text-gray-500 italic col-span-full p-4 text-center">
                  Your collection is empty. Find your first digicam in the <Link to="/catalog" className="text-blue-500 underline">Catalog</Link>!
                </p>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="wishlist">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {wishlistCameras.length > 0 ? (
                wishlistCameras.map((camera) => (
                  <CameraCard key={camera.id} camera={camera} isWishlist={true} />
                ))
              ) : (
                <p className="text-gray-500 italic col-span-full p-4 text-center">
                  Your wishlist is empty. Start dreaming!
                </p>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </XPWindow>
    </DesktopLayout>
  );
};

export default Profile;