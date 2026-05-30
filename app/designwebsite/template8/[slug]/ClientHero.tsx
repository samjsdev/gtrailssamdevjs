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
    <div className="relative min-h-[90vh] bg-[#0B0F19] flex flex-col justify-center overflow-hidden border-b border-white/10">
      {/* Background gradient meshes */}
      <div className="absolute inset-0 -z-10 bg-[#0B0F19]">
        {/* Glow meshes */}
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-[#6366F1]/15 rounded-none blur-[120px] rotate-12 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#06B6D4]/15 rounded-none blur-[120px] -rotate-12 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-8 w-full py-16 grid lg:grid-cols-[1.05fr_0.95fr] gap-14 items-center relative z-10">
        <div className="space-y-8 max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-sans font-extrabold text-white leading-[1.02] tracking-tight max-w-xl">
            {line1}
            <br />
            <span className="bg-gradient-to-r from-[#6366F1] to-[#06B6D4] bg-clip-text text-transparent">
              {line2}
            </span>
          </h1>

          <p className="text-base md:text-lg text-slate-300 w-full font-normal leading-relaxed max-w-xl">
            {clinic.description || 'Welcome to our studio. We plan spaces using clean grids, translucent partitions, layered architectural lighting, and high-end material specs.'}
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2">
            <Link 
              href="#services"
              className="w-full sm:w-auto px-8 py-3.5 rounded-none bg-white text-slate-900 font-bold text-center text-sm hover:bg-slate-100 transition-all hover:translate-y-[-1px]"
            >
              EXPLORE SERVICES
            </Link>
            <a 
              href="#contact"
              className="w-full sm:w-auto px-8 py-3.5 rounded-none bg-slate-900/90 border border-slate-700/60 text-white font-bold text-center text-sm hover:bg-slate-800/90 transition-all hover:translate-y-[-1px]"
            >
              BOOK CONSULTATION
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-[11px] uppercase tracking-[0.28em] text-slate-500">
            <span>CONCEPT TO COMPLETION</span>
            <span className="hidden sm:block h-px w-10 bg-slate-700/60" />
            <span>PRECISION LAYOUTS</span>
            <span className="hidden sm:block h-px w-10 bg-slate-700/60" />
            <span>EXECUTION SUPPORT</span>
          </div>
        </div>

        <div className="relative lg:justify-self-end w-full max-w-[560px]">
          <div className="absolute -inset-6 border border-slate-700/40 translate-x-6 translate-y-6 pointer-events-none" />
          <div className="absolute -inset-10 bg-gradient-to-br from-[#38BDF8]/10 via-transparent to-[#6366F1]/10 blur-3xl pointer-events-none" />
          <div className="relative aspect-[4/5] overflow-hidden rounded-none shadow-[0_30px_80px_rgba(0,0,0,0.55)]">
            <img 
              src={heroImage || INTERIOR_HERO_IMAGES.home} 
              alt="Modern interior design" 
              className="w-full h-full object-cover rounded-none" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19]/40 via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
}
