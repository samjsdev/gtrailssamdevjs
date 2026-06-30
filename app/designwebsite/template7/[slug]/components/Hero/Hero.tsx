"use client";

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';
import { useLoading } from '../../context/LoadingContext';
import { useTemplateData } from '../../context/TemplateContext';

const INITIAL_IMAGES = [
  "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1615876234886-fd9a39fda97f?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80"
];

const CARD_CONFIGS = [
  {
    wrapper: "absolute top-[65%] md:top-[55%] left-[10%] md:left-[10%] -translate-x-1/2 -translate-y-1/2 z-0 -rotate-[24deg]",
    inner: "relative w-[100px] h-[140px] sm:w-[140px] sm:h-[200px] md:w-[200px] md:h-[280px] rounded-[12px] md:rounded-[24px] opacity-70 shadow-xl border-2 md:border-4 border-white/80 overflow-hidden"
  },
  {
    wrapper: "absolute top-[60%] md:top-1/2 left-[25%] md:left-[25%] -translate-x-1/2 -translate-y-1/2 z-10 -rotate-12",
    inner: "relative w-[140px] h-[200px] sm:w-[180px] sm:h-[260px] md:w-[260px] md:h-[380px] rounded-[16px] md:rounded-[32px] opacity-100 shadow-2xl border-4 md:border-8 border-white overflow-hidden"
  },
  {
    wrapper: "absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 rotate-0",
    inner: "relative w-[300px] h-[40vh] md:h-[70vh] md:w-[600px] rounded-[24px] md:rounded-[32px] opacity-100 shadow-2xl border-4 md:border-8 border-white overflow-hidden"
  },
  {
    wrapper: "absolute top-[60%] md:top-1/2 left-[75%] md:left-[75%] -translate-x-1/2 -translate-y-1/2 z-10 rotate-12",
    inner: "relative w-[140px] h-[200px] sm:w-[180px] sm:h-[260px] md:w-[260px] md:h-[380px] rounded-[16px] md:rounded-[32px] opacity-100 shadow-2xl border-4 md:border-8 border-white overflow-hidden"
  },
  {
    wrapper: "absolute top-[65%] md:top-[55%] left-[90%] md:left-[90%] -translate-x-1/2 -translate-y-1/2 z-0 rotate-[24deg]",
    inner: "relative w-[100px] h-[140px] sm:w-[140px] sm:h-[200px] md:w-[200px] md:h-[280px] rounded-[12px] md:rounded-[24px] opacity-70 shadow-xl border-2 md:border-4 border-white/80 overflow-hidden"
  }
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const [isReady, setIsReady] = useState(false);
  
  const { isLoading } = useLoading();
  const { basePath, data } = useTemplateData();
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  // Read texts from data or fallback to home.json defaults
  const watermarkText = data?.clinic?.name || 'Interior Design Studio';
  const ctaText = data?.hero?.ctaText || 'Consult Now';

  // Read images from data.media.clinicImages or fallback to stock
  const dataImages = data?.media?.clinicImages?.filter(Boolean) || [];
  const heroImages = dataImages.length >= 5 ? dataImages.slice(0, 5) : INITIAL_IMAGES;

  useGSAP(() => {

    const tl = gsap.timeline({
      paused: true,
      onComplete: () => {
        setIsReady(true);
        // Wait for React to apply the CSS transition classes, then clear GSAP styles
        setTimeout(() => {
          gsap.set('.hero-moving-card', { clearProps: 'all' });
          gsap.set('.hero-moving-card .group', { clearProps: 'all' });
          
          // Start continuous swapping after the spread completes
          setTimeout(() => {
            setOffset(prev => (prev + 1) % 5); // First swap immediately so it doesn't just sit there
            setInterval(() => {
              setOffset(prev => (prev + 1) % 5);
            }, 3000); // Slightly faster rotation
          }, 1500); // Wait 1.5s for the CSS spread transition
        }, 50); // 50ms wait for React render
      }
    });

    tlRef.current = tl;

    // Preloader already hides initial load, so make content immediately visible
    gsap.set('.hero-content', { opacity: 1 });

    // To perfectly match the deck stack visual:
    // Z-indexes: Card 2 (Front), Cards 1 & 3 (Middle), Cards 0 & 4 (Back)
    // Y-offsets push back cards higher so they peek out from the top.
    const stackOffsets: Record<number, number> = {
        0: -60,
        4: -45,
        1: -30,
        3: -15,
        2: 0
    };

    const cards = gsap.utils.toArray('.hero-moving-card');
    
    cards.forEach((card: any, i: number) => {
        // 1. Set all cards as a single deck at the bottom center fully visible
        gsap.set(card, {
            left: '50%',
            top: '50%',
            xPercent: -50,
            yPercent: -50,
            y: window.innerHeight + (stackOffsets[i] || 0),
            rotate: 0,
            opacity: 1, // Start fully visible so it doesn't fade in (which feels like a delay)
        });

        // Force uniform size for the deck phase so smaller cards aren't fully hidden behind the center card
        const inner = card.querySelector('.group');
        if (inner) {
            gsap.set(inner, {
                width: 'clamp(180px, 25vw, 320px)',
                height: 'clamp(260px, 35vh, 450px)',
            });
        }

        // 2. Slide the deck up to the center of the screen instantly
        tl.to(card, {
            y: stackOffsets[i] || 0,
            duration: 0.8,
            ease: 'power2.out',
        }, 0); // Start at absolute 0 time to completely eliminate delay
    });

  }, { dependencies: [], scope: containerRef });

  // Play the timeline only after the preloader finishes
  useEffect(() => {
    if (!isLoading && tlRef.current) {
        // Wait 200ms for the preloader bar to finish, so the slide-up matches exactly as the overlay fades out
        const timer = setTimeout(() => {
            tlRef.current?.play();
        }, 200);
        return () => clearTimeout(timer);
    }
  }, [isLoading]);

  return (
    <section ref={containerRef} className="relative min-h-[110vh] pt-32 pb-20 overflow-hidden bg-[#eaf6ff] dark:bg-[#020617]">
      
      {/* Background - Soft Blue Gradient (Guardent Style) */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#eaf6ff] via-[#e2f1ff] to-[#f0f9ff] dark:from-[#020617] dark:via-[#0f172a] dark:to-[#1e293b] opacity-100" />
      
      {/* Massive Background Watermark */}
      <div className="absolute top-[8%] left-0 right-0 z-0 overflow-hidden pointer-events-none select-none flex justify-center">
         <h1 className="hero-watermark text-[18vw] leading-none font-bold text-white dark:text-slate-800 opacity-40 dark:opacity-20 text-center uppercase tracking-tighter whitespace-nowrap"
             style={{ 
                 textShadow: '0 4px 20px rgba(186, 219, 255, 0.4)',
                 WebkitTextStroke: '2px rgba(255,255,255,0.8)'
             }}>
           {watermarkText}
         </h1>
      </div>

      {/* Main Content Area */}
      <div className="absolute top-0  z-10 w-full h-full flex flex-col items-center">
         
         {/* Navigation / Top Links Placeholder (If needed, otherwise relying on Navbar) */}

         {/* Central Interactive Area */}
         <div className="hero-content mt-0 opacity-0 relative w-full h-full  max-w-[1400px] mx-auto min-h-screen flex justify-center items-center" style={{ perspective: '1000px' }}>
            
            {heroImages.map((src: string, index: number) => {
               const posIndex = (index + offset) % 5;
               const config = CARD_CONFIGS[posIndex];
               
               return (
                   <div key={index} 
                        className={`hero-moving-card ${config.wrapper}`}
                        style={isReady ? (posIndex === 0 ? { transition: 'none' } : { transition: 'all 1000ms ease-in-out, z-index 0ms' }) : {}}
                   >
                       <div className={`hero-img-inner ${config.inner} group cursor-pointer`}
                            style={isReady ? (posIndex === 0 ? { transition: 'none' } : { transition: 'all 1000ms ease-in-out' }) : {}}
                       >
                           <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors z-10 duration-500"></div>
                           <Image 
                               src={src} 
                               alt={`Interior Design ${index}`} 
                               fill 
                               className="object-cover transition-transform duration-700 group-hover:scale-110"
                               priority={true}
                           />
                       </div>
                   </div>
               );
            })}

            {/* Bottom Floating CTA */}
            <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 z-50">
               <Link href={`${basePath}/appointment`} className="group glass-card pl-6 pr-2 py-2 md:pl-8 rounded-full flex items-center gap-3 md:gap-4 hover:bg-white transition-all font-semibold text-slate-700 shadow-2xl border border-white/60 hover:scale-105 duration-300 whitespace-nowrap">
                  <span className="tracking-wide text-xs md:text-sm uppercase">{ctaText}</span>
                  <span className="w-10 h-10 rounded-full bg-[#2563eb] text-white flex items-center justify-center group-hover:bg-[#1d4ed8] transition-colors shadow-lg">
                     <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </span>
               </Link>
            </div>

         </div>

      </div>

      {/* Curved Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-20">
         {/* Inverted Arc (Hill / Convex White) */}
         <svg className="relative block w-full h-[80px] md:h-[150px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
             <path d="M0,120 Q600,0 1200,120 V120 H0 Z" style={{ fill: 'var(--bg)' }}></path>
         </svg>
      </div>

    </section>
  );
}

