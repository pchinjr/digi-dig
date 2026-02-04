"use client";

import React, { createContext, useContext, useState, useMemo } from 'react';
import { Photo, PHOTOS as initialPhotos } from '@/data/mockData';
import { useUser } from './UserContext';
import { showSuccess, showError } from '@/utils/toast';

interface PhotoContextType {
  photos: Photo[];
  uploadPhoto: (cameraId: string, imageUrl: string) => void;
  getPhotosByCameraId: (cameraId: string) => Photo[];
}

const PhotoContext = createContext<PhotoContextType | undefined>(undefined);

// Key for localStorage
const LOCAL_STORAGE_KEY = 'digidream_photos';

// Mock function to generate a unique ID
let photoCount = initialPhotos.length;
const generatePhotoId = () => `p${++photoCount}`;

// Function to load photos from localStorage
const loadPhotos = (): Photo[] => {
  if (typeof window !== 'undefined') {
    const storedPhotos = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedPhotos) {
      try {
        return JSON.parse(storedPhotos);
      } catch (e) {
        console.error("Error parsing photos from localStorage:", e);
        // Fallback to initial mock data if parsing fails
        return initialPhotos;
      }
    }
  }
  return initialPhotos;
};

// Function to save photos to localStorage
const savePhotos = (photos: Photo[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(photos));
  }
};

export const PhotoProvider = ({ children }: { children: React.ReactNode }) => {
  // Initialize state from localStorage
  const [photos, setPhotos] = useState<Photo[]>(loadPhotos);
  const { user } = useUser();

  // Effect to save photos whenever the state changes
  React.useEffect(() => {
    savePhotos(photos);
  }, [photos]);

  const uploadPhoto = (cameraId: string, imageUrl: string) => {
    if (!user) {
      showError("You must be logged in to upload photos.");
      return;
    }

    const newPhoto: Photo = {
      id: generatePhotoId(),
      cameraId: cameraId,
      url: imageUrl, // Use the provided image URL (Data URL)
      caption: `A shot uploaded by ${user.username}`,
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