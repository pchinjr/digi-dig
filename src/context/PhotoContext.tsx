"use client";

import React, { createContext, useContext, useState, useMemo } from 'react';
import { Photo, PHOTOS as initialPhotos } from '@/data/mockData';
import { useUser } from './UserContext';
import { showSuccess, showError } from '@/utils/toast';

interface PhotoContextType {
  photos: Photo[];
  uploadPhoto: (cameraId: string) => void;
  getPhotosByCameraId: (cameraId: string) => Photo[];
}

const PhotoContext = createContext<PhotoContextType | undefined>(undefined);

// Mock function to generate a unique ID
let photoCount = initialPhotos.length;
const generatePhotoId = () => `p${++photoCount}`;

export const PhotoProvider = ({ children }: { children: React.ReactNode }) => {
  const [photos, setPhotos] = useState<Photo[]>(initialPhotos);
  const { user } = useUser();

  const uploadPhoto = (cameraId: string) => {
    if (!user) {
      showError("You must be logged in to upload photos.");
      return;
    }

    // Simulate a successful upload by adding a new mock photo
    const newPhoto: Photo = {
      id: generatePhotoId(),
      cameraId: cameraId,
      // Using a generic placeholder image for the uploaded photo
      url: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800", 
      caption: `A new shot uploaded by ${user.username}`,
      user: user.username,
    };

    setPhotos(prevPhotos => [newPhoto, ...prevPhotos]);
    showSuccess("Photo uploaded successfully! Check the gallery.");
  };

  const getPhotosByCameraId = (cameraId: string): Photo[] => {
    return photos.filter(p => p.cameraId === cameraId);
  };

  const value = useMemo(() => ({
    photos,
    uploadPhoto,
    getPhotosByCameraId,
  }), [photos, user]);

  return (
    <PhotoContext.Provider value={value}>
      {children}
    </PhotoContext.Provider>
  );
};

export const usePhotos = () => {
  const context = useContext(PhotoContext);
  if (context === undefined) {
    throw new Error('usePhotos must be used within a PhotoProvider');
  }
  return context;
};