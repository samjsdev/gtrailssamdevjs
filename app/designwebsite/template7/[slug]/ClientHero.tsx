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
    <div className="relative min-h-[90vh] bg-[#FAF8F5] flex flex-col border-b border-[#D4C3B3]">
      <section className="relative flex-1 overflow-hidden flex flex-col lg:flex-row items-center w-full">
        {/* Left Text */}
        <div className="w-full lg:w-3/5 p-8 lg:p-16">
          <div className="max-w-2xl space-y-6">
            <span className="text-[11px] font-bold text-[#3B483B] tracking-[0.25em] uppercase bg-[#E1E8E1] px-4 py-1.5 rounded-full inline-block">
              EST. 2016 • RETRO MODERN INTERIORS
            </span>

            <h1 className="text-5xl md:text-7xl font-serif text-[#3D2C20] leading-[1.1] tracking-tight">
              {line1}
              <br />
              <span className="text-[#E3A857] italic font-normal">
                {line2}
              </span>
            </h1>

            <p className="text-lg md:text-xl text-[#5C4D3C] max-w-xl font-normal leading-relaxed">
              {clinic.description || 'Welcome to our studio. We believe in simplicity, natural timbers, and organic geometry, creating spaces that feel timeless.'}
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              <Link 
                href="#services"
                className="w-full sm:w-auto px-8 py-4 rounded-none bg-[#3B483B] text-white font-bold text-center text-sm tracking-wider uppercase hover:bg-[#2C372C] transition-all"
              >
                EXPLORE PLAN
              </Link>
              <a 
                href="#contact"
                className="w-full sm:w-auto px-8 py-4 rounded-none bg-transparent border border-[#3D2C20] text-[#3D2C20] font-bold text-center text-sm tracking-wider uppercase hover:bg-[#3D2C20] hover:text-white transition-all"
              >
                SCHEDULE CONSULTATION
              </a>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="w-full lg:w-2/5 h-[50vh] lg:h-auto self-stretch relative border-t lg:border-t-0 lg:border-l border-[#D4C3B3]">
          <img 
            src={heroImage || INTERIOR_HERO_IMAGES.home} 
            alt="Mid century living room" 
            className="w-full h-full object-cover grayscale opacity-90 contrast-110" 
          />
          <div className="absolute inset-0 bg-[#E3A857]/10 mix-blend-color pointer-events-none"></div>
        </div>
      </section>
    </div>
  );
}
