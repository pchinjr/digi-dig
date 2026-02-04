"use client";

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import DesktopLayout from '@/components/DesktopLayout';
import XPWindow from '@/components/XPWindow';
import { CAMERAS } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Upload, Share2, Camera as CameraIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { usePhotos } from '@/context/PhotoContext';
import { useUser } from '@/context/UserContext';

const CameraDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useUser();
  const { uploadPhoto, getPhotosByCameraId } = usePhotos();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const camera = CAMERAS.find(c => c.id === id);
  const cameraPhotos = getPhotosByCameraId(id || '');

  if (!camera) return (
    <DesktopLayout>
      <XPWindow title="Error">
        <div className="p-8 text-center">Camera not found</div>
      </XPWindow>
    </DesktopLayout>
  );

  const handleUpload = () => {
    if (!user) {
      return;
    }
    // Trigger the hidden file input click
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        if (id) {
          uploadPhoto(id, imageUrl); // Pass the Data URL
        }
      };
      reader.readAsDataURL(file);
    }
    // Reset the input value so the same file can be uploaded again
    if (fileInputRef.current) {
        fileInputRef.current.value = '';
    }
  };

  return (
    <DesktopLayout>
      <XPWindow title={`Properties: ${camera.brand} ${camera.model}`} className="w-full max-w-5xl h-[85vh]">
        <div className="flex flex-col h-full">
          <Link to="/catalog" className="inline-flex items-center text-sm font-bold text-blue-600 hover:underline mb-6">
            <ArrowLeft size={14} className="mr-1" />
            Back to Catalog
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="relative">
              <div className="aspect-square overflow-hidden border-2 border-gray-200 shadow-inner bg-gray-50">
                <img src={camera.image} alt={camera.model} className="h-full w-full object-cover" />
              </div>
              <div className="absolute -bottom-2 -right-2 h-16 w-16 rounded-full bg-yellow-400 flex items-center justify-center rotate-12 shadow-md border-2 border-white">
                <span className="font-black text-yellow-900 text-lg">{camera.year}</span>
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <div className="mb-6">
                <h1 className="text-3xl font-black text-gray-900 mb-1">{camera.brand}</h1>
                <h2 className="text-xl font-bold text-blue-600">{camera.model}</h2>
              </div>

              <p className="text-gray-600 text-sm leading-relaxed mb-6 italic">
                "{camera.description}"
              </p>

              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-gray-50 p-3 border border-gray-200">
                  <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Resolution</p>
                  <p className="text-lg font-black text-gray-700">{camera.megapixels} MP</p>
                </div>
                <div className="bg-gray-50 p-3 border border-gray-200">
                  <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Sensor</p>
                  <p className="text-lg font-black text-gray-700">{camera.sensorType}</p>
                </div>
              </div>

              <div className="flex gap-3">
                {/* Hidden file input */}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
                
                <Button 
                  onClick={handleUpload}
                  disabled={!user}
                  className="flex-1 rounded-none bg-[#3c813c] hover:bg-[#4caf50] text-white h-10 font-bold shadow-[2px_2px_0_rgba(0,0,0,0.2)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Upload size={16} className="mr-2" />
                  Upload Photo
                </Button>
                <Button variant="outline" className="rounded-none border-2 border-blue-200 h-10 w-10 p-0 text-blue-600 hover:bg-blue-50">
                  <Share2 size={16} />
                </Button>
              </div>
              {!user && (
                <p className="text-xs text-red-500 mt-2">Log in to upload photos.</p>
              )}
            </div>
          </div>

          <div className="border-t border-gray-100 pt-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-black text-gray-900 flex items-center gap-2">
                <CameraIcon size={20} className="text-blue-500" />
                Sample Gallery
              </h3>
              <span className="text-xs font-bold text-gray-400">{cameraPhotos.length} Photos</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {cameraPhotos.map((photo) => (
                <div key={photo.id} className="group relative aspect-square overflow-hidden border border-gray-200 bg-gray-50">
                  <img src={photo.url} alt={photo.caption} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-end">
                    <p className="text-white text-[10px] font-bold">@{photo.user}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </XPWindow>
    </DesktopLayout>
  );
};

export default CameraDetail;