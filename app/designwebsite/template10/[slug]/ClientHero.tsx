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
    <div className="relative h-[85vh] bg-[#1E2022] flex flex-col justify-center overflow-hidden border-b-2 border-[#E07A5F]">
      {/* Background Image with concrete filter overlay */}
      <div className="absolute inset-0 -z-10">
        <img 
          src={heroImage || INTERIOR_HERO_IMAGES.home} 
          alt="Industrial warehouse loft space" 
          className="w-full h-full object-cover opacity-20 mix-blend-multiply" 
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1E2022] via-[#1E2022]/90 to-[#1E2022]/40"></div>
      </div>

      <div className="max-w-7xl mx-auto px-8 w-full">
        <div className="max-w-3xl space-y-6">
          <span className="text-[10px] font-bold text-white tracking-[0.3em] uppercase bg-[#E07A5F] px-4 py-1.5 inline-block">
            URBAN INFILL & LOFT ARCHITECTURE
          </span>

          <h1 className="text-5xl md:text-7xl font-sans font-extrabold text-white leading-[1.05] tracking-tight uppercase">
            {line1}
            <br />
            <span className="text-[#E07A5F]">
              {line2}
            </span>
          </h1>

          <p className="text-base md:text-lg text-slate-300 max-w-xl font-normal leading-relaxed">
            {clinic.description || 'Welcome to our studio. We specialize in converting warehouses and modern lofts with raw concrete structures, black steel framework, and textured rust bricks.'}
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-6">
            <Link 
              href="#services"
              className="w-full sm:w-auto px-8 py-4 bg-[#E07A5F] hover:bg-[#C9644A] text-white font-bold text-center text-xs tracking-wider uppercase transition-all"
            >
              EXPLORE DELIVERABLES
            </Link>
            <a 
              href="#contact"
              className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white text-white hover:bg-white hover:text-slate-900 font-bold text-center text-xs tracking-wider uppercase transition-all"
            >
              SCHEDULE APPOINTMENT
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
