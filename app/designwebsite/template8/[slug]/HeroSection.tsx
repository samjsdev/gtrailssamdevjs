'use client';

import { Search, SlidersHorizontal } from 'lucide-react';
import Image from 'next/image';

export default function HeroSection({
  clinic,
  media
}: {
  clinic: any;
  media: any;
}) {
  const heroImage = media.clinicImages?.[0] || 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=2000';

  return (
    <section className="px-4 md:px-8 mt-6">
      <div className="max-w-7xl mx-auto relative rounded-[40px] overflow-hidden h-[400px] md:h-[500px] flex items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={heroImage}
            alt="Interior Design Hero"
            fill
            className="object-cover"
            priority
          />
          {/* Blue Overlay similar to reference */}
          <div className="absolute inset-0 bg-[#2b347b]/40 mix-blend-multiply"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-3xl px-6 flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center mb-8 drop-shadow-md">
            Transform Your Space
          </h1>

          {/* Search Bar */}
          <div className="w-full bg-white/90 backdrop-blur-sm p-2 rounded-full flex items-center shadow-lg">
            <div className="flex-1 flex items-center px-4 gap-3 text-gray-500">
              <Search className="w-5 h-5" />
              <input 
                type="text" 
                placeholder="Explore Design Styles" 
                className="bg-transparent border-none outline-none w-full text-gray-800 placeholder-gray-500"
              />
            </div>
            
            <div className="px-4 border-l border-gray-300 text-gray-400 hover:text-gray-600 cursor-pointer transition">
              <SlidersHorizontal className="w-5 h-5" />
            </div>

            <button className="w-12 h-12 bg-[#2b347b] text-white rounded-full flex items-center justify-center hover:bg-opacity-90 transition">
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
