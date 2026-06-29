"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";
import { cleanClinicName, cleanClinicDescription } from '@/lib/copyCleaner';

interface ClientHeroProps {
  clinic: any;
  business: any;
  basePath: string;
  data?: any;
}

export default function ClientHero({ clinic, business, basePath, data }: ClientHeroProps) {
  const cleanName = cleanClinicName(clinic.name);
  const cleanTagline = clinic.tagline || 'Quality Homes Honest Price — Build With Us';
  const cleanDesc = cleanClinicDescription(clinic.description, clinic.name);
  
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const offersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Intro animation
      gsap.from(textRef.current?.children || [], {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out",
        delay: 0.5
      });

      gsap.from(offersRef.current?.children || [], {
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.7)",
        delay: 1.2
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const heroData = (data as any)?.hero || {};
  const line1 = heroData.line1 || 'Quality Homes';
  const line2 = heroData.line2 || 'Honest Price';
  const line3 = heroData.line3 || '— Build With Us';

  return (
    <div ref={heroRef} className="relative min-h-[95vh] bg-[#0A0A0A] flex flex-col selection:bg-[#C1FF72] selection:text-[#0A0A0A] overflow-hidden">
      
      {/* Background Video */}
      <div className="absolute inset-0 z-0 opacity-40">
        {data?.hero?.video ? (
          <video 
            autoPlay 
            muted 
            loop 
            playsInline 
            className="w-full h-full object-cover"
            poster={data?.media?.clinicImages?.[0] || "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=100&w=2560"}
          >
            <source src={data.hero.video} type="video/mp4" />
          </video>
        ) : (
          <img 
            src={data?.media?.clinicImages?.[0] || "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=100&w=2560"} 
            alt="Hero background" 
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/50 to-transparent"></div>
      </div>
      
      <section className="relative flex-1 flex items-end pb-24 z-10 pt-32">
        <div className="max-w-7xl mx-auto px-8 w-full">
          
          <div className="max-w-4xl text-left">
            <div className="inline-flex items-center gap-3 mb-6 tracking-[0.2em] text-xs font-bold uppercase text-[#FCFAF6]/80 overflow-hidden">
              <span>{cleanName || 'Premium Architecture & Interiors'}</span>
            </div>


            <h1 ref={textRef} className="font-serif text-5xl sm:text-7xl lg:text-[6rem] font-bold text-[#FCFAF6] leading-[1.05] tracking-tight mb-8">
              <span className="block overflow-hidden"><span className="block">{line1}</span></span>
              <span className="block overflow-hidden"><span className="block italic font-light text-[#C1FF72]">{line2}</span></span>
              <span className="block overflow-hidden"><span className="block">{line3}</span></span>
            </h1>

            <div className="flex flex-col md:flex-row gap-10 md:items-center mt-8">
              <p className="text-lg text-[#FCFAF6]/70 font-medium leading-relaxed max-w-xl">
                {cleanDesc}
              </p>
              
              <a
                href={`tel:${clinic.contact?.phone || ''}`}
                className="group relative flex items-center justify-center gap-3 px-8 py-5 rounded-full bg-[#C1FF72] text-[#0A0A0A] font-bold uppercase tracking-widest hover:bg-[#FCFAF6] transition-all duration-300 w-max"
              >
                <span>Book Consultation</span>
                <div className="w-8 h-8 bg-[#0A0A0A] text-[#FCFAF6] rounded-full flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </a>
            </div>

            {/* Highlights/Offers Banner */}
            <div ref={offersRef} className="flex flex-wrap gap-4 mt-16">
              {(business?.highlights?.length > 0 ? business.highlights.slice(0, 4) : [
                "Bespoke Design", "Premium Materials", "End-to-End Execution", "Transparent Pricing"
              ]).map((highlight: string, idx: number) => (
                <div key={idx} className="bg-[#FCFAF6]/10 backdrop-blur-md border border-[#FCFAF6]/20 text-[#FCFAF6] px-6 py-3 rounded-full text-sm font-bold tracking-wider uppercase flex items-center gap-2">
                  {idx === 0 && <span className="w-2 h-2 rounded-full bg-[#C1FF72]"></span>}
                  {highlight}
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
