"use client";

import React from 'react';
import Navbar from './Navbar';
import { MadeWithDyad } from './made-with-dyad';

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen w-full bg-gray-50">
      <div className="pt-8 pb-16">
        <Navbar />
        
        <main className="container mx-auto mt-10 px-4">
          {children}
        </main>
      </div>
      <MadeWithDyad />
    </div>
  );
};

export default AppLayout;