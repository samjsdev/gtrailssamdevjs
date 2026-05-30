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
    <div className="relative min-h-[90vh] bg-[#F7F4EB] flex flex-col">
      <section className="relative h-full overflow-hidden flex flex-col lg:flex-row flex-1">
        {/* Content Side */}
        <div className="relative flex-1 flex items-center justify-center p-8 lg:p-16 lg:w-1/2">
          <div className="flex flex-col items-start justify-center max-w-2xl w-full">
            <span className="text-[11px] font-bold text-[#8C6239] tracking-[0.25em] uppercase bg-[#E8E2D5] px-4 py-1.5 rounded-full mb-6">
              Organic & Sustainable Space Planning
            </span>

            <div className="flex flex-col items-start mb-6">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-[#4A3B32] leading-[1.1] tracking-tight">
                {line1}
              </h1>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-[#8C6239] leading-[1.1] tracking-tight italic mt-2">
                {line2}
              </h1>
            </div>

            <p className="text-lg md:text-xl text-[#6B5A4E] mb-10 max-w-xl font-light leading-relaxed">
              {clinic.description || 'Welcome to our studio. We plan homes using natural timbers, raw stone textures, and airy palettes that reflect the outdoors.'}
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Link 
                href="#about"
                className="w-full sm:w-auto text-center px-8 py-4 rounded-xl bg-white border border-[#E8E2D5] text-[#4A3B32] font-semibold hover:bg-[#F7F4EB] transition-all hover:scale-105"
              >
                Explore Studio
              </Link>
              <a 
                href="#contact"
                className="w-full sm:w-auto text-center px-8 py-4 rounded-xl text-white bg-[#8C6239] hover:bg-[#734A29] font-semibold transition-all hover:scale-105 shadow-md"
              >
                Book Consultation
              </a>
            </div>
          </div>
        </div>

        {/* Image Right Side */}
        <div className="relative w-full lg:w-1/2 h-[50vh] lg:h-auto overflow-hidden">
          <img 
            src={heroImage || INTERIOR_HERO_IMAGES.home}
            alt="Welcome to our interior design studio" 
            className="w-full h-full object-cover" 
          />
        </div>
      </section>
    </div>
  );
}
