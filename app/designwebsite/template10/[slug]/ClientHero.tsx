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
    <div className="relative min-h-[90vh] bg-[#1E2022] flex flex-col justify-center overflow-hidden border-b-2 border-[#E07A5F]">
      <section className="relative flex-1 overflow-hidden flex flex-col lg:flex-row items-center w-full">
        {/* Content Side */}
        <div className="w-full lg:w-1/2 p-8 lg:p-16 flex items-center">
          <div className="max-w-xl space-y-6">
            <h1 className="text-5xl md:text-7xl font-sans font-extrabold text-white leading-[1.05] tracking-tight uppercase">
              {line1}
              <br />
              <span className="text-[#E07A5F]">
                {line2}
              </span>
            </h1>

            <p className="text-base md:text-lg text-slate-300 w-full font-normal leading-relaxed">
              {clinic.description || 'Welcome to our studio. We specialize in converting warehouses and modern lofts with raw concrete structures, black steel framework, and textured rust bricks.'}
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-6">
              <Link 
                href={`${basePath}/services`}
                className="w-full sm:w-auto px-8 py-4 bg-[#E07A5F] hover:bg-[#C9644A] text-white font-bold text-center text-xs tracking-wider uppercase transition-all"
              >
                VIEW SERVICES
              </Link>
              <Link 
                href={`${basePath}/contact`}
                className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white text-white hover:bg-white hover:text-slate-900 font-bold text-center text-xs tracking-wider uppercase transition-all"
              >
                SCHEDULE APPOINTMENT
              </Link>
            </div>
          </div>
        </div>

        {/* Image right side */}
        <div className="w-full lg:w-1/2 h-[50vh] lg:h-auto self-stretch">
          <img 
            src={heroImage || INTERIOR_HERO_IMAGES.home} 
            alt="Industrial warehouse loft space" 
            className="w-full h-full object-cover grayscale mix-blend-screen opacity-90 border-l-4 border-b-4 lg:border-b-0 border-[#E07A5F]" 
          />
        </div>
      </section>
    </div>
  );
}
