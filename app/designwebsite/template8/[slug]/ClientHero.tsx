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
    <div className="relative h-[85vh] bg-[#0B0F19] flex flex-col justify-center overflow-hidden border-b border-white/10">
      {/* Background image & gradient meshes */}
      <div className="absolute inset-0 -z-10">
        <img 
          src={heroImage || INTERIOR_HERO_IMAGES.home} 
          alt="Modern interior design" 
          className="w-full h-full object-cover opacity-30 mix-blend-luminosity" 
        />
        <div className="absolute inset-0 bg-[#0B0F19]/80"></div>
        {/* Glow meshes */}
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-[#6366F1]/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#06B6D4]/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-8 w-full">
        {/* Glassmorphic Panel */}
        <div className="max-w-3xl bg-white/5 border border-white/10 backdrop-blur-xl p-8 md:p-12 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <span className="text-[10px] font-bold text-[#38BDF8] tracking-[0.3em] uppercase bg-white/5 border border-white/10 px-4 py-1.5 rounded-full inline-block mb-6">
            GLASSMORPHIC ARCHITECTURE SYSTEM
          </span>

          <h1 className="text-4xl md:text-6xl font-sans font-extrabold text-white leading-[1.1] tracking-tight">
            {line1}
            <br />
            <span className="bg-gradient-to-r from-[#6366F1] to-[#06B6D4] bg-clip-text text-transparent">
              {line2}
            </span>
          </h1>

          <p className="text-base md:text-lg text-slate-300 max-w-xl font-normal mt-4 leading-relaxed">
            {clinic.description || 'Welcome to our studio. We plan spaces using clean grids, translucent partitions, layered architectural lighting, and high-end material specs.'}
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-8">
            <Link 
              href="#services"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white text-slate-900 font-bold text-center text-sm hover:bg-slate-100 transition-all hover:scale-105"
            >
              EXPLORE SERVICES
            </Link>
            <a 
              href="#contact"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white/5 border border-white/20 text-white font-bold text-center text-sm hover:bg-white/10 transition-all hover:scale-105"
            >
              BOOK CONSULTATION
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
