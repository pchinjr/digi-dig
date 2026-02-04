"use client";

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { CAMERAS, PHOTOS } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Upload, Share2, Calendar, Camera as CameraIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { showSuccess } from '@/utils/toast';

const CameraDetail = () => {
  const { id } = useParams();
  const camera = CAMERAS.find(c => c.id === id);
  const cameraPhotos = PHOTOS.filter(p => p.cameraId === id);

  if (!camera) return <div>Camera not found</div>;

  return (
    <div className="min-h-screen bg-[#fdfcf0] pb-20">
      <Navbar />
      
      <main className="mx-auto max-w-5xl px-4 pt-8">
        <Link to="/catalog" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-pink-500 mb-8 transition-colors">
          <ArrowLeft size={16} className="mr-2" />
          Back to Catalog
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <div className="aspect-square overflow-hidden rounded-[2.5rem] border-4 border-white shadow-2xl">
              <img src={camera.image} alt={camera.model} className="h-full w-full object-cover" />
            </div>
            <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-yellow-300 flex items-center justify-center rotate-12 shadow-lg border-4 border-white">
              <span className="font-black text-yellow-800 text-xl">{camera.year}</span>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col justify-center"
          >
            <div className="mb-6">
              <h1 className="text-4xl font-black text-gray-900 mb-2">{camera.brand}</h1>
              <h2 className="text-2xl font-bold text-pink-500">{camera.model}</h2>
            </div>

            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              {camera.description}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="rounded-2xl bg-blue-50 p-4 border border-blue-100">
                <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-1">Resolution</p>
                <p className="text-xl font-black text-blue-600">{camera.megapixels} MP</p>
              </div>
              <div className="rounded-2xl bg-purple-50 p-4 border border-purple-100">
                <p className="text-[10px] font-bold text-purple-400 uppercase tracking-widest mb-1">Sensor</p>
                <p className="text-xl font-black text-purple-600">{camera.sensorType}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <Button className="flex-1 rounded-2xl bg-pink-500 hover:bg-pink-600 text-white h-12 font-bold shadow-lg shadow-pink-200">
                <Upload size={18} className="mr-2" />
                Upload Photo
              </Button>
              <Button variant="outline" className="rounded-2xl border-2 border-blue-100 h-12 w-12 p-0 text-blue-500 hover:bg-blue-50">
                <Share2 size={18} />
              </Button>
            </div>
          </motion.div>
        </div>

        <section>
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-black text-gray-900 flex items-center gap-2">
              <CameraIcon className="text-pink-500" />
              Sample Gallery
            </h3>
            <span className="text-sm font-bold text-gray-400">{cameraPhotos.length} Photos</span>
          </div>

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {cameraPhotos.map((photo, index) => (
              <motion.div 
                key={photo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-3xl border-2 border-white shadow-md hover:shadow-xl transition-all cursor-pointer"
              >
                <img src={photo.url} alt={photo.caption} className="w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end">
                  <p className="text-white font-bold mb-1">{photo.caption}</p>
                  <p className="text-white/80 text-xs">by @{photo.user}</p>
                </div>
              </motion.div>
            ))}
            {cameraPhotos.length === 0 && (
              <div className="col-span-full py-20 text-center rounded-[2.5rem] border-4 border-dashed border-blue-100 bg-blue-50/30">
                <p className="text-gray-400 font-medium">No photos yet. Be the first to upload!</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default CameraDetail;