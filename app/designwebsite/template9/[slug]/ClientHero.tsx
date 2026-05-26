'use client';

import Link from 'next/link';
import { INTERIOR_HERO_IMAGES } from '@/lib/interiorContent';

interface ClientHeroProps {
  clinic: any;
  business: any;
  basePath: string;
  heroImage?: string;
}

export default function ClientHero({ clinic, business, basePath, heroImage }: ClientHeroProps) {
  const taglineWords = (clinic.tagline || 'Thoughtful Interiors For Everyday Living').split(' ');
  const half = Math.ceil(taglineWords.length / 2);
  const line1 = taglineWords.slice(0, half).join(' ');
  const line2 = taglineWords.slice(half).join(' ');

  return (
    <div className="relative h-[85vh] bg-[#F4F7F6] flex flex-col justify-center border-b border-[#D0DCD6]">
      {/* Background Image & Soft Filter Overlay */}
      <div className="absolute inset-0 -z-10">
        <img 
          src={heroImage || INTERIOR_HERO_IMAGES.home} 
          alt="Coastal interior space" 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-[#F4F7F6]/85 backdrop-blur-[2px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-8 w-full">
        <div className="max-w-2xl space-y-6">
          <span className="text-[10px] font-bold text-[#497A76] tracking-[0.25em] uppercase bg-[#E1EDEB] px-4 py-1.5 rounded-full inline-block">
            COASTAL RETREAT STYLING
          </span>

          <h1 className="text-5xl md:text-7xl font-sans font-semibold text-[#2D4A47] leading-[1.1] tracking-tight">
            {line1}
            <br />
            <span className="text-[#609994] font-light italic">
              {line2}
            </span>
          </h1>

          <p className="text-lg text-[#556F6B] max-w-xl font-light leading-relaxed">
            {clinic.description || 'Welcome to our studio. We curate serene rooms with soft linens, white washed timbers, sea-salt accents, and plenty of natural daylight.'}
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
            <Link 
              href="#services"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#497A76] hover:bg-[#3B6461] text-white font-bold text-center text-sm tracking-wider uppercase transition-all shadow-md hover:scale-105"
            >
              EXPLORE SHORE
            </Link>
            <a 
              href="#contact"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-transparent border border-[#497A76] text-[#497A76] hover:bg-[#497A76] hover:text-white font-bold text-center text-sm tracking-wider uppercase transition-all hover:scale-105"
            >
              INQUIRE DIRECT
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
