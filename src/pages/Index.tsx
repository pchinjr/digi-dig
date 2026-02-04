"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { CAMERAS, PHOTOS } from '@/data/mockData';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Sparkles, Camera, ArrowRight, Heart } from 'lucide-react';

const Index = () => {
  const featuredPhotos = PHOTOS.slice(0, 3);

  return (
    <div className="min-h-screen bg-[#fdfcf0] overflow-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-4">
        {/* Whimsical Background Elements */}
        <div className="absolute top-20 left-10 h-32 w-32 rounded-full bg-pink-200/30 blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 h-40 w-40 rounded-full bg-blue-200/30 blur-3xl animate-pulse" />
        
        <div className="mx-auto max-w-5xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border-2 border-pink-100 text-pink-500 text-sm font-bold mb-8 shadow-sm"
          >
            <Sparkles size={16} />
            Relive the CCD Era
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-black text-gray-900 mb-6 tracking-tighter leading-none"
          >
            Capture the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 italic">
              Nostalgia
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-500 max-w-2xl mx-auto mb-12 font-medium"
          >
            The social home for digicam lovers. Catalog your collection, share your lo-fi shots, and find your next dream camera from 2000-2012.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link to="/catalog">
              <Button className="rounded-2xl bg-gray-900 hover:bg-gray-800 text-white px-8 h-14 text-lg font-bold shadow-xl shadow-gray-200">
                Explore Catalog
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
            <Link to="/profile">
              <Button variant="outline" className="rounded-2xl border-2 border-pink-100 bg-white text-pink-500 hover:bg-pink-50 px-8 h-14 text-lg font-bold">
                My Collection
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Floating Camera Images */}
        <div className="hidden lg:block">
          <motion.img 
            animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            src={CAMERAS[0].image} 
            className="absolute top-40 left-[10%] w-48 h-48 object-cover rounded-[2rem] border-4 border-white shadow-2xl -rotate-12"
          />
          <motion.img 
            animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
            src={CAMERAS[1].image} 
            className="absolute top-60 right-[10%] w-56 h-56 object-cover rounded-[2.5rem] border-4 border-white shadow-2xl rotate-12"
          />
        </div>
      </section>

      {/* Featured Photos */}
      <section className="bg-white py-24 border-y-2 border-blue-50">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl font-black text-gray-900 mb-2">Recent Captures</h2>
              <p className="text-gray-500 font-medium">Freshly uploaded shots from the community</p>
            </div>
            <Link to="/catalog" className="text-pink-500 font-bold hover:underline flex items-center gap-1">
              View all <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredPhotos.map((photo, index) => (
              <motion.div 
                key={photo.id}
                whileHover={{ scale: 1.02 }}
                className="group relative aspect-square overflow-hidden rounded-[2.5rem] border-2 border-blue-50 shadow-sm"
              >
                <img src={photo.url} alt={photo.caption} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-8 flex flex-col justify-end">
                  <div className="flex items-center gap-2 text-white mb-2">
                    <div className="h-8 w-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                      <Heart size={14} fill="white" />
                    </div>
                    <span className="text-sm font-bold">@{photo.user}</span>
                  </div>
                  <p className="text-white/90 text-sm italic">"{photo.caption}"</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats / Fun Section */}
      <section className="py-24 px-4">
        <div className="mx-auto max-w-4xl rounded-[3rem] bg-gradient-to-br from-blue-400 to-purple-500 p-12 text-center text-white shadow-2xl shadow-blue-200">
          <h2 className="text-4xl font-black mb-6">Join the CCD Revolution</h2>
          <p className="text-blue-50 text-lg mb-10 max-w-xl mx-auto">
            Whether you're a seasoned collector or just found your parents' old point-and-shoot, there's a place for you here.
          </p>
          <div className="flex justify-center gap-12">
            <div>
              <p className="text-4xl font-black mb-1">1.2k</p>
              <p className="text-blue-100 text-sm font-bold uppercase tracking-widest">Cameras</p>
            </div>
            <div>
              <p className="text-4xl font-black mb-1">8.5k</p>
              <p className="text-blue-100 text-sm font-bold uppercase tracking-widest">Photos</p>
            </div>
            <div>
              <p className="text-4xl font-black mb-1">4.2k</p>
              <p className="text-blue-100 text-sm font-bold uppercase tracking-widest">Members</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 text-center border-t border-blue-50">
        <p className="text-gray-400 text-sm font-medium">© 2024 Digi-Dream. Keep it lo-fi. ✨</p>
      </footer>
    </div>
  );
};

export default Index;