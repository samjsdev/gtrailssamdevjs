'use client';

import { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function StatsGrid({ data }: { data?: any }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    // Header Trigger
    gsap.fromTo('.stats-header-el',
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.stats-header-el',
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );

    // Cards Batch Trigger
    // Using batch ensures that in mobile view (vertical stack), cards animate individually
    ScrollTrigger.batch('.stat-card', {
      start: 'top 85%',
      onEnter: (batch) => {
        gsap.fromTo(batch,
          { y: 40, opacity: 0, scale: 0.98 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out'
          }
        );
      },
      once: true
    });
  }, { scope: containerRef });

  return (
    <section id="stats" ref={containerRef} className="py-16 md:py-24 px-6 relative overflow-visible bg-gradient-to-b from-white to-[var(--bg)]">
      
      {/* Floating Tags (Decorative) */}
      <div className="absolute top-0 left-10 -translate-y-1/2 z-20 hidden lg:block">
         <div className="glass-card px-6 py-2 rounded-full transform -rotate-6 shadow-lg bg-white/40">
            <span className="font-bold text-blue-900 tracking-wide">SPATIAL PLANNING</span>
         </div>
      </div>
      <div className="absolute top-20 right-10 z-20 hidden lg:block">
         <div className="glass-card px-6 py-2 rounded-full transform rotate-12 shadow-lg bg-white/40">
            <span className="font-bold text-blue-900 tracking-wide">MODERN FURNITURE</span>
         </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-8 md:space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <h2 className="stats-header-el text-3xl md:text-5xl font-bold text-[var(--accent)] mb-6 leading-tight">
            Comprehensive Design.<br/>
            <span className="text-slate-800">Curated for You.</span>
          </h2>
          <p className="stats-header-el text-lg text-slate-500">
            From conceptual sketches to full renovations, we provide the highest standard of interior design in a seamless, enjoyable process.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 auto-rows-auto md:auto-rows-[300px]">
          
          {/* Large Card 1 - Preventive */}
          <div className="stat-card col-span-1 md:col-span-8 relative group rounded-[32px] md:rounded-[40px] overflow-hidden glass-card border-[3px] border-white/50 bg-gradient-to-br from-blue-50 to-blue-100/50 min-h-[300px]">
             <div className="absolute inset-0 z-0">
               <Image 
                 src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80" 
                 alt="Design Consultation" 
                 fill 
                 className="object-cover opacity-30 transition-transform duration-700 group-hover:scale-105"
               />
               <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 to-transparent z-10"/>
             </div>
             
             <div className="absolute bottom-0 left-0 p-8 md:p-10 z-20">
                <span className="inline-block px-4 py-1 rounded-full bg-blue-600 text-white text-xs font-bold mb-4">CONSULTATION</span>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">Design Discovery</h3>
                <p className="text-slate-500 max-w-sm text-sm md:text-base">Initial consultations to understand your vision, lifestyle, and spatial needs perfectly.</p>
             </div>
             
             <div className="absolute top-6 right-6 md:top-8 md:right-8 w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center text-xl md:text-2xl group-hover:rotate-12 transition-transform z-20">
                🛡️
             </div>
          </div>

          {/* Tall Card 2 - Cosmetic */}
          <div className="stat-card col-span-1 md:col-span-4 row-span-1 md:row-span-2 relative group rounded-[32px] md:rounded-[40px] overflow-hidden glass-card border-[3px] border-white/50 bg-slate-900 min-h-[350px]">
             <div className="absolute inset-0 z-0">
               <Image 
                 src={data?.media?.otherImages?.[0] || "https://images.unsplash.com/photo-1593696140826-c58b021acf8b?auto=format&fit=crop&w=800&q=80"}
                 alt="Space Makeover" 
                 fill 
                 className="object-cover opacity-60 transition-transform duration-700 group-hover:scale-105"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"/>
             </div>
             
             <div className="absolute inset-x-0 bottom-0 p-8 pt-20 z-20">
                <span className="inline-block px-4 py-1 rounded-full bg-indigo-500 text-white text-xs font-bold mb-4">RENOVATION</span>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-2 leading-none">{data?.business?.services?.[1] || 'Space Makeover'}</h3>
                <p className="text-slate-200 mt-4 text-sm font-medium">Transform your environment with bespoke materials, lighting, and furniture.</p>
                <div className="mt-8">
                   <button className="w-12 h-12 rounded-full bg-white/20 backdrop-blur text-white flex items-center justify-center hover:bg-white hover:text-indigo-600 transition-all shadow-lg">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                   </button>
                </div>
             </div>
          </div>

          {/* Medium Card 3 - 24/7 Support */}
          <div className="stat-card col-span-1 md:col-span-4 relative group rounded-[32px] md:rounded-[40px] overflow-hidden glass-card border-[3px] border-white/50 bg-blue-50 min-h-[250px]">
             <div className="absolute inset-0 z-0">
               <Image 
                 src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80" 
                 alt="Dedicated Support" 
                 fill 
                 className="object-cover opacity-30 transition-transform duration-700 group-hover:scale-105"
               />
             </div>
             <div className="p-8 h-full flex flex-col justify-between relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-blue-600 shadow-sm">
                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <div>
                   <h3 className="text-xl font-bold text-slate-800 mb-1">Dedicated Support</h3>
                   <p className="text-sm text-slate-600 font-medium">Expert guidance throughout your entire design journey.</p>
                </div>
             </div>
          </div>

          {/* Medium Card 4 - Restorative */}
          <div className="stat-card col-span-1 md:col-span-4 relative group rounded-[32px] md:rounded-[40px] overflow-hidden bg-slate-800 text-white shadow-xl shadow-blue-500/20 min-h-[250px]">
             <div className="absolute inset-0 z-0">
               <Image 
                 src="https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80" 
                 alt="Furnishing" 
                 fill 
                 className="object-cover opacity-40 transition-transform duration-700 group-hover:scale-105"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent z-10"/>
             </div>
             
             <div className="p-8 h-full flex flex-col justify-between relative z-20">
                <div className="text-blue-200 font-medium tracking-widest text-xs uppercase">Furnishing</div>
                <div>
                   <h3 className="text-2xl font-bold mb-2">{data?.business?.services?.[3] || 'Custom Furniture'}</h3>
                   <div className="h-1 w-12 bg-white/30 rounded-full mt-4 group-hover:w-20 transition-all"/>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}
