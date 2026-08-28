'use client';

import { useState, useEffect } from 'react';

interface InitialLoaderProps {
  companyName: string;
}

export default function InitialLoader({ companyName }: InitialLoaderProps) {
  const [loading, setLoading] = useState(true);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    // 1. Wait a bit, then trigger fade out
    const timer = setTimeout(() => {
      setFade(true);
      // 2. Wait for fade transition to finish, then unmount
      setTimeout(() => {
        setLoading(false);
      }, 700); // 700ms matches the duration-700 class
    }, 1500); // Show loader for 1.5 seconds

    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#111111] transition-opacity duration-700 ease-in-out ${
        fade ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Container to handle the spinning and drawing */}
      <div className="relative flex items-center justify-center">
        <svg width="80" height="80" viewBox="0 0 80 80" className="animate-spin" style={{ animationDuration: '3s' }}>
          {/* Background faint square */}
          <rect
            x="10"
            y="10"
            width="60"
            height="60"
            fill="transparent"
            stroke="#333333"
            strokeWidth="2"
          />
          {/* Animated drawing square */}
          <rect
            x="10"
            y="10"
            width="60"
            height="60"
            fill="transparent"
            stroke="#EA580C"
            strokeWidth="2"
            strokeDasharray="240"
            strokeLinecap="square"
            className="animate-draw-square"
          />
        </svg>
        
        {/* Inner static branding (optional, but looks premium) */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-1.5 h-1.5 bg-[#EA580C] animate-pulse"></div>
        </div>
      </div>
      
      <div className="mt-8 overflow-hidden">
        <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#EA580C] animate-pulse">
          {companyName}
        </p>
      </div>
    </div>
  );
}
