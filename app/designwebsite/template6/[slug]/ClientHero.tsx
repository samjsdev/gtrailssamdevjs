'use client';

import Link from 'next/link';
import { INTERIOR_HERO_IMAGES } from '@/lib/interiorContent';
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

interface ClientHeroProps {
  clinic: any;
  business: any;
  basePath: string;
  heroImage?: string;
}

export default function ClientHero({ clinic, business, basePath, heroImage }: ClientHeroProps) {
  return (
    <div className="relative min-h-[90vh] bg-[#1a1a1a] flex flex-col justify-center overflow-hidden">
      {/* Background Image with elegant dark overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage || INTERIOR_HERO_IMAGES.home}
          alt={clinic.name || "Interior design studio"} 
          className="w-full h-full object-cover object-center opacity-60" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a]/50 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a] via-[#1a1a1a]/80 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 pt-32 pb-16">
        <div className="max-w-2xl space-y-8">
          <div className="inline-flex items-center gap-4">
            <div className="w-12 h-[1px] bg-zinc-400"></div>
            <span className="text-[10px] font-bold tracking-[0.3em] text-zinc-400 uppercase">
              Bespoke Interiors
            </span>
          </div>

          <h1 className={`${playfair.className} text-5xl md:text-6xl lg:text-7xl text-white leading-[1.1] tracking-wide`}>
            {clinic.tagline || 'Crafting Spaces of Quiet Luxury.'}
          </h1>

          <p className="text-sm md:text-base text-zinc-400 font-light leading-relaxed max-w-lg">
            {clinic.description || 'Welcome to our studio. We create spaces that balance timeless elegance with contemporary function, tailored intimately to your lifestyle.'}
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-6 pt-8">
            <a 
              href="#contact"
              className="w-full sm:w-auto px-10 py-4 bg-white text-black text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-zinc-200 transition-colors text-center"
            >
              Book Consultation
            </a>
            <Link 
              href="#gallery"
              className="w-full sm:w-auto px-10 py-4 border border-zinc-600 text-white text-[11px] font-bold tracking-[0.2em] uppercase hover:border-white transition-colors text-center"
            >
              View Portfolio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
