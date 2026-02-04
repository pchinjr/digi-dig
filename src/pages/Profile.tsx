"use client";

import React, { useState } from 'react';
import AppLayout from '@/components/AppLayout';
import AppWindow from '@/components/AppWindow';
import { CAMERAS } from '@/data/mockData';
import CameraCard from '@/components/CameraCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, LogOut, Loader2, Settings, User } from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { Link, Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import ProfileEditor from '@/components/ProfileEditor';

const Profile = () => {
  const { user, logout, isLoading, auth, fetchProfile } = useUser();
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const handleProfileSave = () => {
    setIsEditorOpen(false);
    // Re-fetch profile data to update the UI immediately after save
    if (auth) {
      fetchProfile(auth.id, auth);
    }
  };

  if (isLoading) {
    return (
      <AppLayout>
        <AppWindow title="Loading Profile" className="w-full max-w-4xl">
          <div className="flex flex-col items-center justify-center p-10">
            <Loader2 className="h-8 w-8 animate-spin text-secondary" />
            <p className="mt-4 text-sm text-gray-500">Loading user data...</p>
          </div>
        </AppWindow>
      </AppLayout>
    );
  }

  if (!user) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" />;
  }

  const ownedCameras = CAMERAS.filter(c => user.ownedCameraIds.includes(c.id));
  const wishlistCameras = CAMERAS.filter(c => user.wishlistCameraIds.includes(c.id));

  const displayName = user.firstName && user.lastName 
    ? `${user.firstName} ${user.lastName}` 
    : user.username;

  return (
    <AppLayout>
      <AppWindow title={`Profile: ${user.username}`} className="w-full max-w-4xl">
        <div className="flex flex-col">
          <div className="flex flex-col md:flex-row items-start gap-8 mb-8 border-b pb-6">
            <div className="relative">
              <div className="h-24 w-24 rounded-full border-4 border-secondary p-1 bg-white shadow-lg overflow-hidden">
                <img 
                  src={user.avatarUrl} 
                  alt="Avatar" 
                  className="h-full w-full object-cover rounded-full"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-green-500 border-2 border-white flex items-center justify-center shadow-sm">
                <div className="h-2 w-2 rounded-full bg-white" />
              </div>
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-3xl font-black text-gray-900">{displayName}</h1>
                <div className="flex gap-2">
                  <Dialog open={isEditorOpen} onOpenChange={setIsEditorOpen}>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        className="rounded-lg border-primary/30 text-primary hover:bg-primary/10 text-xs font-bold h-8"
                      >
                        <Settings size={14} className="mr-1" />
                        Edit Profile
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] rounded-xl p-6">
                      <DialogHeader>
                        <DialogTitle className="text-xl font-black text-gray-900 flex items-center gap-2">
                          <User size={20} className="text-primary" />
                          Edit Your digi-dig Profile
                        </DialogTitle>
                      </DialogHeader>
                      <ProfileEditor onSave={handleProfileSave} />
                    </DialogContent>
                  </Dialog>

                  <Button 
                    onClick={logout}
                    variant="outline" 
                    className="rounded-lg border-red-300 text-red-600 hover:bg-red-50 text-xs font-bold h-8"
                  >
                    <LogOut size={14} className="mr-1" />
                    Log Out
                  </Button>
                </div>
              </div>
              <div className="flex items-center gap-4 text-gray-500 text-sm font-medium mb-4">
                <span className="flex items-center gap-1 text-primary"><MapPin size={14} /> {user.location}</span>
                <span className="text-gray-400">|</span>
                <span className="text-secondary">{ownedCameras.length} Cameras Owned</span>
              </div>
              <p className="text-sm text-gray-600 max-w-md italic">
                "{user.bio}"
              </p>
            </div>
          </div>

          <Tabs defaultValue="collection" className="w-full">
            <TabsList className="w-full justify-start bg-gray-100 rounded-lg h-auto p-1 mb-6">
              <TabsTrigger 
                value="collection" 
                className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-md px-6 py-2 text-sm font-bold text-gray-700 data-[state=active]:text-secondary transition-all"
              >
                My Collection ({ownedCameras.length})
              </TabsTrigger>
              <TabsTrigger 
                value="wishlist" 
                className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-md px-6 py-2 text-sm font-bold text-gray-700 data-[state=active]:text-secondary transition-all"
              >
                Wishlist ({wishlistCameras.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="collection">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {ownedCameras.length > 0 ? (
                  ownedCameras.map((camera) => (
                    <CameraCard key={camera.id} camera={camera} />
                  ))
                ) : (
                  <p className="text-gray-500 italic col-span-full p-8 text-center bg-gray-50 rounded-lg border border-dashed">
                    Your collection is empty. Find your first digicam in the <Link to="/catalog" className="text-secondary underline font-semibold">Catalog</Link>!
                  </p>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="wishlist">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlistCameras.length > 0 ? (
                  wishlistCameras.map((camera) => (
                    <CameraCard key={camera.id} camera={camera} />
                  ))
                ) : (
                  <p className="text-gray-500 italic col-span-full p-8 text-center bg-gray-50 rounded-lg border border-dashed">
                    Your wishlist is empty. Start dreaming!
                  </p>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </AppWindow>
    </AppLayout>
  );
};

export default Profile;