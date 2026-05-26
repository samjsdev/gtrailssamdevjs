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
    <div className="relative h-[85vh] bg-[#F7F4EB] flex flex-col">
      <section className="relative h-full overflow-hidden flex flex-col">
        {/* Background Image */}
        <div className="absolute inset-0 -z-10">
          <img 
            src={heroImage || INTERIOR_HERO_IMAGES.home}
            alt="Welcome to our interior design studio" 
            className="w-full h-full object-cover" 
          />
          {/* Subtle clay tint overlay */}
          <div className="absolute inset-0 bg-[#F7F4EB]/90 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#F7F4EB]/40 to-[#F7F4EB]"></div>
        </div>

        {/* Content */}
        <div className="relative h-full flex flex-col flex-1">
          <div className="flex-1 flex items-center justify-center">
            <div className="flex flex-col items-center justify-center text-center px-4 max-w-4xl">
              <span className="text-[11px] font-bold text-[#8C6239] tracking-[0.25em] uppercase bg-[#E8E2D5] px-4 py-1.5 rounded-full mb-6">
                Organic & Sustainable Space Planning
              </span>

              <div className="flex flex-col items-center mb-6">
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-[#4A3B32] leading-[1.1] tracking-tight">
                  {line1}
                </h1>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-[#8C6239] leading-[1.1] tracking-tight italic mt-2">
                  {line2}
                </h1>
              </div>

              <p className="text-lg md:text-xl text-[#6B5A4E] mb-10 max-w-2xl font-light leading-relaxed">
                {clinic.description || 'Welcome to our studio. We plan homes using natural timbers, raw stone textures, and airy palettes that reflect the outdoors.'}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link 
                  href="#about"
                  className="px-8 py-4 rounded-xl bg-white border border-[#E8E2D5] text-[#4A3B32] font-semibold hover:bg-[#F7F4EB] transition-all hover:scale-105"
                >
                  Explore Studio
                </Link>
                <a 
                  href="#contact"
                  className="px-8 py-4 rounded-xl text-white bg-[#8C6239] hover:bg-[#734A29] font-semibold transition-all hover:scale-105 shadow-md"
                >
                  Book Consultation
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
