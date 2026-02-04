"use client";

import React, { useState, useRef } from 'react';
import { motion, useDragControls } from 'framer-motion';
import { X, Minus, Square, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

interface XPWindowProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  onClose?: () => void;
  defaultWidth?: number;
  defaultHeight?: number;
}

const XPWindow = ({ 
  title, 
  children, 
  className, 
  onClose,
  defaultWidth = 800,
  defaultHeight = 500 
}: XPWindowProps) => {
  const [isMaximized, setIsMaximized] = useState(false);
  const [size, setSize] = useState({ width: defaultWidth, height: defaultHeight });
  const dragControls = useDragControls();
  const navigate = useNavigate();

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      navigate('/');
    }
  };

  const handleResize = (e: React.MouseEvent) => {
    if (isMaximized) return;
    e.preventDefault();
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = size.width;
    const startHeight = size.height;

    const onMouseMove = (moveEvent: MouseEvent) => {
      const newWidth = Math.max(300, startWidth + (moveEvent.clientX - startX));
      const newHeight = Math.max(200, startHeight + (moveEvent.clientY - startY));
      setSize({ width: newWidth, height: newHeight });
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  return (
    <motion.div
      drag={!isMaximized}
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ 
        scale: 1, 
        opacity: 1,
        width: isMaximized ? '100%' : size.width,
        height: isMaximized ? 'calc(100vh - 40px)' : size.height,
        top: isMaximized ? 0 : 'auto',
        left: isMaximized ? 0 : 'auto',
      }}
      className={cn(
        "flex flex-col overflow-hidden rounded-t-lg border-2 border-[#0058e6] bg-[#ece9d8] shadow-[8px_8px_20px_rgba(0,0,0,0.4)] z-30",
        !isMaximized && "absolute",
        className
      )}
    >
      {/* Title Bar */}
      <div 
        onPointerDown={(e) => !isMaximized && dragControls.start(e)}
        onDoubleClick={() => setIsMaximized(!isMaximized)}
        className="flex h-8 shrink-0 cursor-default items-center justify-between bg-gradient-to-b from-[#0058e6] via-[#3b8df5] to-[#0058e6] px-2 select-none"
      >
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded-sm bg-white/20" />
          <span className="text-sm font-bold text-white drop-shadow-md truncate">
            {title}
          </span>
        </div>
        <div className="flex gap-1">
          <button 
            onClick={() => navigate('/')}
            className="flex h-5 w-5 items-center justify-center rounded-sm bg-[#3b8df5] border border-white/30 hover:bg-[#5ba3ff] transition-colors"
          >
            <Minus size={12} className="text-white" />
          </button>
          <button 
            onClick={() => setIsMaximized(!isMaximized)}
            className="flex h-5 w-5 items-center justify-center rounded-sm bg-[#3b8df5] border border-white/30 hover:bg-[#5ba3ff] transition-colors"
          >
            {isMaximized ? <Copy size={10} className="text-white" /> : <Square size={10} className="text-white" />}
          </button>
          <button 
            onClick={handleClose}
            className="flex h-5 w-5 items-center justify-center rounded-sm bg-gradient-to-b from-[#e96e5c] to-[#c13524] border border-white/30 hover:from-[#ff8e7d] transition-colors"
          >
            <X size={12} className="text-white" />
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden p-1 relative">
        <div className="h-full w-full bg-white border border-[#919b9c] overflow-auto custom-scrollbar">
          <div className="p-4">
            {children}
          </div>
        </div>
      </div>

      {/* Resize Handle */}
      {!isMaximized && (
        <div 
          onMouseDown={handleResize}
          className="absolute bottom-0 right-0 h-4 w-4 cursor-nwse-resize z-50 flex items-end justify-end p-0.5"
        >
          <div className="w-3 h-3 border-r-2 border-b-2 border-gray-400 opacity-50" />
        </div>
      )}
    </motion.div>
  );
};

export default XPWindow;