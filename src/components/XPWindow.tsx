"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { X, Minus, Square } from 'lucide-react';
import { cn } from '@/lib/utils';

interface XPWindowProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  onClose?: () => void;
}

const XPWindow = ({ title, children, className, onClose }: XPWindowProps) => {
  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={cn(
        "flex flex-col overflow-hidden rounded-t-lg border-2 border-[#0058e6] bg-[#ece9d8] shadow-[4px_4px_10px_rgba(0,0,0,0.3)]",
        className
      )}
    >
      {/* Title Bar */}
      <div className="flex h-8 items-center justify-between bg-gradient-to-b from-[#0058e6] via-[#3b8df5] to-[#0058e6] px-2">
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded-sm bg-white/20" />
          <span className="text-sm font-bold text-white drop-shadow-md">{title}</span>
        </div>
        <div className="flex gap-1">
          <button className="flex h-5 w-5 items-center justify-center rounded-sm bg-[#3b8df5] border border-white/30 hover:bg-[#5ba3ff] transition-colors">
            <Minus size={12} className="text-white" />
          </button>
          <button className="flex h-5 w-5 items-center justify-center rounded-sm bg-[#3b8df5] border border-white/30 hover:bg-[#5ba3ff] transition-colors">
            <Square size={10} className="text-white" />
          </button>
          <button 
            onClick={onClose}
            className="flex h-5 w-5 items-center justify-center rounded-sm bg-gradient-to-b from-[#e96e5c] to-[#c13524] border border-white/30 hover:from-[#ff8e7d] transition-colors"
          >
            <X size={12} className="text-white" />
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-auto p-1">
        <div className="h-full w-full bg-white border border-[#919b9c] p-4">
          {children}
        </div>
      </div>
    </motion.div>
  );
};

export default XPWindow;