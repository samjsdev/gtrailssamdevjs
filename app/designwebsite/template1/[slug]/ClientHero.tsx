'use client';

import Link from 'next/link';
import { INTERIOR_HERO_IMAGES } from '@/lib/interiorContent';
import { Phone, ArrowUpRight, Sparkles } from 'lucide-react';
import { cleanClinicName, cleanClinicDescription } from '@/lib/copyCleaner';

interface ClientHeroProps {
  clinic: any;
  business: any;
  basePath: string;
  heroImage?: string;
}

export default function ClientHero({ clinic, business, basePath, heroImage }: ClientHeroProps) {
  const cleanName = cleanClinicName(clinic.name);
  const cleanTagline = clinic.tagline || 'Thoughtful Interiors For Everyday Living';
  const cleanDesc = cleanClinicDescription(clinic.description, clinic.name);

  const fallbackImage = INTERIOR_HERO_IMAGES.home;
  const displayImage = heroImage || fallbackImage;

  return (
    <div className="relative min-h-[90vh] bg-[#FCFAF6] flex flex-col selection:bg-[#C1FF72] selection:text-[#0A0A0A] overflow-hidden">
      {/* Decorative architectural circle line in background */}
      <div className="absolute top-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full border border-[#0A0A0A]/5 pointer-events-none z-0"></div>
      
      <section className="relative flex-1 flex items-center pt-24 pb-20 z-10">
        <div className="max-w-[90rem] mx-auto px-8 w-full flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">

          {/* Left Column: Premium Typography & Dynamic Copy */}
          <div className="flex flex-col flex-1 z-10 text-left">
            <div className="inline-flex items-center gap-2 mb-8 tracking-[0.25em] text-[11px] font-bold uppercase text-[#0A0A0A]/70">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C1FF72]"></span>
              <span>{cleanName || 'Architecture & Design Studio'}</span>
            </div>

            <h1 className="font-serif text-5xl sm:text-7xl lg:text-[5.5rem] font-light text-[#0A0A0A] leading-[1.05] tracking-tight mb-8 max-w-3xl">
              {cleanTagline.split(' ').slice(0, -2).join(' ')}{' '}
              <span className="italic font-normal text-[#0A0A0A]/60">
                {cleanTagline.split(' ').slice(-2, -1)}
              </span>{' '}
              <span className="font-normal text-[#0A0A0A] inline-block relative">
                {cleanTagline.split(' ').slice(-1)}
                <span className="absolute bottom-2 left-0 w-full h-[2px] bg-[#C1FF72]"></span>
              </span>
            </h1>

            <div className="flex flex-col md:flex-row gap-10 md:items-end mt-4">
              <div className="space-y-6 max-w-md">
                <p className="text-[15px] md:text-base text-[#0A0A0A]/70 font-normal leading-relaxed border-l-2 border-[#0A0A0A]/15 pl-6">
                  {cleanDesc}
                </p>
                <div className="flex items-center gap-6 pl-6 text-[11px] font-bold uppercase tracking-[0.2em] text-[#0A0A0A]/60">
                  <span className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-[#C1FF72]"></span>Bespoke</span>
                  <span className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-[#C1FF72]"></span>Turnkey</span>
                  <span className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-[#C1FF72]"></span>Refined</span>
                </div>
              </div>

              <div className="flex gap-4 shrink-0 pl-6 md:pl-0">
                <a
                  href={`tel:${clinic.contact?.phone || ''}`}
                  className="group relative flex flex-col items-center justify-center w-24 h-24 rounded-full bg-[#0A0A0A] text-[#FCFAF6] hover:bg-transparent hover:text-[#0A0A0A] transition-all duration-500 border border-[#0A0A0A]"
                >
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-center leading-snug">
                    Let's<br />Talk
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 mt-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Hero Image Container */}
          <div className="relative w-full lg:w-[45%] h-[55vh] lg:h-[75vh] z-10">
            {/* Elegant visual backdrop frames - thin luxurious charcoal frame */}
            <div className="absolute inset-4 border border-[#0A0A0A]/10 rounded-[2.5rem] transform rotate-2 scale-[1.02] z-0"></div>
            <div className="absolute inset-0 border border-[#0A0A0A]/5 rounded-[2.5rem] transform -rotate-1 z-0"></div>
            
            <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden z-10 group border-4 border-[#FCFAF6] shadow-2xl">
              <img
                src={displayImage}
                alt={cleanName || 'Studio portfolio'}
                className="w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-105"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/60 via-transparent to-transparent opacity-85 group-hover:opacity-40 transition-opacity duration-700"></div>

            </div>
          </div>

        </div>
      </section>

      {/* Endless Marquee Banner */}
      <div className="w-full bg-[#0A0A0A] py-4.5 overflow-hidden border-t border-[#FCFAF6]/10 relative z-20">
        <div className="flex whitespace-nowrap animate-[marquee_25s_linear_infinite]">
          {[...Array(6)].map((_, i) => (
            <span key={i} className="text-[11px] font-bold tracking-[0.25em] uppercase mx-12 flex items-center gap-12 text-[#FCFAF6]/90">
              Residential Interiors <span className="w-1.5 h-1.5 bg-[#C1FF72] rounded-full"></span>
              Modular Kitchens <span className="w-1.5 h-1.5 bg-[#C1FF72] rounded-full"></span>
              Bespoke Custom Furniture <span className="w-1.5 h-1.5 bg-[#C1FF72] rounded-full"></span>
              Turnkey Projects <span className="w-1.5 h-1.5 bg-[#C1FF72] rounded-full"></span>
            </span>
          ))}
        </div>
      </div>
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}} />
    </div>
  );
}
