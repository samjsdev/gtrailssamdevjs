'use client';

import Link from 'next/link';
import { INTERIOR_HERO_IMAGES } from '@/lib/interiorContent';
import { Playfair_Display } from "next/font/google";
import { Star } from 'lucide-react';

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
    <div className="relative min-h-[95vh] bg-[#1a1a1a] flex flex-col justify-center overflow-hidden">
      {/* Background Image with elegant dark overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage || INTERIOR_HERO_IMAGES.home}
          alt={clinic?.name || "Interior design studio"} 
          className="w-full h-full object-cover object-center opacity-40 grayscale" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a]/40 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a] via-[#1a1a1a]/80 to-transparent"></div>
      </div>

      {/* Editorial layout grid */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 pt-36 pb-20">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8 space-y-8">
            <div className="inline-flex items-center gap-4">
              <div className="w-12 h-[1px] bg-[#c59b72]"></div>
              <span className="text-[10px] font-bold tracking-[0.35em] text-[#c59b72] uppercase">
                {clinic?.name || "Bespoke Interiors"}
              </span>
            </div>

            <h1 className={`${playfair.className} text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-white leading-[1.05] tracking-tight`}>
              Design Your <br />
              <span className="italic text-zinc-400 font-light">Dream Space</span> With Us
            </h1>

            <p className="text-sm md:text-base text-zinc-400 font-light leading-relaxed max-w-xl">
              We create refined interiors with thoughtful planning, curated materials, and client-first project coordination to bring your vision to life.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-6">
              <Link 
                href={`${basePath}/contact`}
                className="w-full sm:w-auto px-10 py-4 bg-white text-black text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-zinc-200 transition-colors text-center"
              >
                Start Your Project
              </Link>
              <Link 
                href={`${basePath}/gallery`}
                className="w-full sm:w-auto px-10 py-4 border border-zinc-600 text-white text-[11px] font-bold tracking-[0.2em] uppercase hover:border-white hover:bg-white/5 transition-all text-center"
              >
                View Portfolio
              </Link>
            </div>
          </div>

          {/* Right Column: Floating Experience Badge styled with Premium Minimalism */}
          <div className="lg:col-span-4 flex justify-start lg:justify-end relative">
            <div className="bg-[#121212]/95 border border-white/10 backdrop-blur-md p-8 rounded-none w-72 shadow-2xl relative overflow-hidden group hover:border-[#c59b72]/45 transition-colors duration-500">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#c59b72]/5 rounded-bl-full pointer-events-none"></div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center text-[#c59b72]">
                  <Star className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <div className={`${playfair.className} text-4xl font-light text-white`}>15+</div>
                  <div className="text-[9px] text-zinc-500 font-bold tracking-widest uppercase mt-0.5">Years Experience</div>
                </div>
              </div>
              
              <div className="w-full h-[1px] bg-white/5 my-6"></div>
              
              <p className="text-[11px] text-zinc-400 font-light leading-relaxed">
                A legacy of crafting custom residences, boutique workspaces, and bespoke joinery with operational sincerity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
