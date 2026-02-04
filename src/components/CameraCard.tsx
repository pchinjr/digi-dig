"use client";

import React from 'react';
import { Camera as CameraType } from '@/data/mockData';
import { motion } from 'framer-motion';
import { Heart, Check, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useUser } from '@/context/UserContext';
import { useNavigate } from 'react-router-dom';

interface CameraCardProps {
  camera: CameraType;
}

const CameraCard = ({ camera }: CameraCardProps) => {
  const { user, updateUserCollection } = useUser();
  const navigate = useNavigate();

  const isOwned = user?.ownedCameraIds.includes(camera.id) ?? false;
  const isWishlist = user?.wishlistCameraIds.includes(camera.id) ?? false;

  const handleToggleOwned = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }
    const action = isOwned ? 'remove' : 'add';
    updateUserCollection(camera.id, 'owned', action);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }
    const action = isWishlist ? 'remove' : 'add';
    updateUserCollection(camera.id, 'wishlist', action);
  };

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="group relative overflow-hidden rounded-3xl border-2 border-blue-100 bg-white p-4 shadow-sm hover:shadow-xl transition-all"
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gray-50">
        <img 
          src={camera.image} 
          alt={`${camera.brand} ${camera.model}`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-2 right-2 flex flex-col gap-2">
          <button 
            onClick={handleToggleWishlist}
            className={`rounded-full p-2 backdrop-blur-md transition-colors ${isWishlist ? 'bg-pink-500 text-white' : 'bg-white/80 text-pink-400 hover:bg-pink-50'}`}
            title={isWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
          >
            <Heart size={18} fill={isWishlist ? "currentColor" : "none"} />
          </button>
          <button 
            onClick={handleToggleOwned}
            className={`rounded-full p-2 backdrop-blur-md transition-colors ${isOwned ? 'bg-green-500 text-white' : 'bg-white/80 text-green-400 hover:bg-green-50'}`}
            title={isOwned ? "Remove from Collection" : "Add to Collection"}
          >
            <Check size={18} />
          </button>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-bold text-gray-900">{camera.brand}</h3>
            <p className="text-sm text-gray-500">{camera.model}</p>
          </div>
          <Badge variant="secondary" className="bg-blue-50 text-blue-600 border-blue-100">
            {camera.year}
          </Badge>
        </div>
        
        <div className="flex gap-2 text-[10px] font-bold uppercase tracking-wider text-gray-400">
          <span>{camera.megapixels} MP</span>
          <span>•</span>
          <span>{camera.sensorType} SENSOR</span>
        </div>

        <Link to={`/camera/${camera.id}`}>
          <Button variant="outline" className="w-full mt-2 rounded-xl border-pink-100 text-pink-500 hover:bg-pink-50 hover:text-pink-600">
            <Info size={16} className="mr-2" />
            View Details
          </Button>
        </Link>
      </div>
    </motion.div>
  );
};

export default CameraCard;