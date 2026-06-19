'use client';

import { Cormorant_Garamond } from 'next/font/google';
import { ArrowUpRight, Award, Layers } from 'lucide-react';
import Link from 'next/link';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
});

interface ClientHeroProps {
  clinic: any;
  business: any;
  basePath: string;
  doctor?: any;
  media?: any;
}

export default function ClientHero({ clinic, business, basePath, doctor, media }: ClientHeroProps) {
  // Luxe interior design image — Pastel Green Arched Living Room
  const backgroundImage = '/images/otherImages-4.jpg';

  return (
    <div className="space-y-6 w-full relative z-10">
      {/* Padded Hero Banner Container with Deep Rounded Corners */}
      <section className="relative min-h-[480px] sm:min-h-[550px] lg:min-h-[620px] flex items-center rounded-[2.5rem] overflow-hidden p-8 sm:p-12 lg:p-20 shadow-lg shadow-[#2A2421]/5">
        {/* Background Image with warm organic overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={backgroundImage}
            alt="Luxurious organic modern living room" 
            className="w-full h-full object-cover object-center scale-[1.01]" 
          />
          <div className="absolute inset-0 bg-[#2A2421]/60 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2A2421]/80 via-[#2A2421]/30 to-transparent" />
        </div>

        {/* Content Wrapper in Dual Column Grid */}
        <div className="relative z-10 max-w-7xl mx-auto w-full grid lg:grid-cols-12 gap-8 lg:gap-16 items-end text-white">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md text-[9px] font-bold tracking-[0.2em] uppercase rounded-full border border-white/20">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8E7056]" />
              {clinic.name || 'SKETCHLAB'} · CHENNAI
            </div>
            <h1 className={`${cormorant.className} text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-light leading-[1.08] tracking-wide`}>
              {clinic.tagline || <>Bespoke Modular Kitchens<br />&amp; Turnkey Chennai Interiors</>}
            </h1>
          </div>

          <div className="lg:col-span-5 space-y-6 lg:pl-4">
            <p className="text-sm sm:text-[15px] text-[#FAF8F5]/95 font-light leading-relaxed max-w-md">
              {clinic.description || 'SKETCHLAB simplifies the complex process of designing and executing high-end modular kitchens, bespoke home interiors, and collaborative commercial offices in Chennai.'}
            </p>

            <div className="pt-2">
              <Link 
                href={`${basePath}/contact`}
                className="inline-flex items-center gap-3 px-8 py-4 bg-white hover:bg-[#8E7056] text-[#2A2421] hover:text-white font-bold uppercase tracking-widest text-[10px] rounded-full transition-all duration-300 shadow-md hover:scale-[1.03] active:scale-[0.97]"
              >
                Start Your Furnishing Journey <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Side-by-Side Stats and Who We Are Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
        {/* Stats Card (Left, lg:col-span-4) */}
        <div className="lg:col-span-4 bg-[#8E7056] text-white rounded-[2rem] p-8 sm:p-10 flex flex-col justify-between shadow-sm relative overflow-hidden group">
          {/* Abstract background graphics */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full pointer-events-none transition-all duration-700 group-hover:scale-110" />
          
          <div className="space-y-6">
            <span className="block text-[9px] font-bold tracking-[0.2em] text-[#FAF8F5]/85 uppercase">
              OUR COMPANY IN NUMBERS
            </span>
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center border border-white/20">
              <Layers className="w-5 h-5 text-white/90" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mt-16 pt-6 border-t border-white/10">
            <div>
              <div className={`${cormorant.className} text-4xl sm:text-5xl font-light tracking-tight`}>250+</div>
              <div className="text-[10px] font-semibold text-[#FAF8F5]/90 uppercase tracking-wider mt-2">
                Projects Completed
              </div>
            </div>
            <div>
              <div className={`${cormorant.className} text-4xl sm:text-5xl font-light tracking-tight`}>
                {doctor?.experience ? doctor.experience.replace(/\D/g, '') + '+' : '8+'}
              </div>
              <div className="text-[10px] font-semibold text-[#FAF8F5]/90 uppercase tracking-wider mt-2">
                Years Experience
              </div>
            </div>
          </div>
        </div>

        {/* Who We Are Card (Right, lg:col-span-8) */}
        <div className="lg:col-span-8 bg-[#EAE3D8] text-[#2A2421] rounded-[2rem] p-8 sm:p-10 flex flex-col md:flex-row justify-between items-center gap-8 shadow-sm relative overflow-hidden">
          <div className="space-y-6 md:w-3/5">
            <div className="flex items-center gap-2 text-[#8E7056] text-[10px] font-bold uppercase tracking-[0.2em]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8E7056]" />
              WHO WE ARE
            </div>
            <h2 className={`${cormorant.className} text-3xl sm:text-4xl font-light tracking-wide`}>
              {doctor?.name || 'Crafting Precision Spaces'}
            </h2>
            <p className="text-[13.5px] leading-relaxed text-[#2A2421]/90 font-light">
              At {clinic.name || 'SKETCHLAB'}, we understand the challenges of creating exceptional modular kitchens and customized residential spaces in Chennai. We take full ownership of custom modular manufacturing, material procurement, and turnkey styling.
            </p>
            <p className="text-[13.5px] leading-relaxed text-[#2A2421]/90 font-light">
              As premier interior solution providers, we make it our mission to simplify the design process, ensuring that every project is executed flawlessly from initial 3D visualization to final site handover.
            </p>
          </div>

          {/* Organic Portrait Crop */}
          <div className="md:w-2/5 flex justify-center w-full">
            <div className="relative w-56 h-56 rounded-full overflow-hidden border-4 border-white/50 shadow-md aspect-square bg-stone-100 group">
              <img 
                src="/images/clinicImages-3.jpg" 
                alt="Sketchlab studio exterior at night" 
                className="w-full h-full object-cover grayscale opacity-90 transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-[#8E7056]/10 mix-blend-overlay group-hover:opacity-0 transition-opacity" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


