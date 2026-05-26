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
    <div className="relative min-h-[85vh] bg-[#FFF275] flex flex-col justify-center border-b-4 border-black p-8 md:p-16">
      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-12 gap-12 items-center">
        
        {/* Left column text */}
        <div className="lg:col-span-7 space-y-6">
          <span className="inline-block text-xs font-black tracking-widest text-black bg-[#FF8C42] border-2 border-black px-4 py-2 uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            NEO-DESIGN STUDIO
          </span>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-black leading-none tracking-tight uppercase">
            {line1}
            <br />
            <span className="text-[#FF8C42] underline decoration-4 decoration-black">
              {line2}
            </span>
          </h1>

          <p className="text-lg md:text-xl text-black font-bold leading-relaxed max-w-xl border-l-4 border-black pl-4">
            {clinic.description || 'Welcome to our studio. We create bold, high-contrast, structured rooms built to function perfectly and stand out visually.'}
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
            <Link 
              href="#services"
              className="px-8 py-4 bg-white border-4 border-black text-black font-black text-center uppercase tracking-wider hover:bg-black hover:text-white transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1"
            >
              OUR SERVICES
            </Link>
            <a 
              href="#contact"
              className="px-8 py-4 bg-[#FF8C42] border-4 border-black text-black font-black text-center uppercase tracking-wider hover:bg-black hover:text-white transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1"
            >
              BOOK CONSULTATION
            </a>
          </div>
        </div>

        {/* Right column image */}
        <div className="lg:col-span-5 relative">
          <div className="border-4 border-black bg-white p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <img 
              src={heroImage || INTERIOR_HERO_IMAGES.home}
              alt="Welcome to our interior design studio" 
              className="w-full h-96 object-cover border-2 border-black" 
            />
          </div>
        </div>

      </div>
    </div>
  );
}
