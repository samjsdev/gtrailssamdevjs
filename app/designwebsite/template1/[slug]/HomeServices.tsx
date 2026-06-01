'use client';

import { ArrowRight, ChevronRight } from 'lucide-react';
import Link from 'next/link';

type ServiceItem = {
  num: string;
  title: string;
  desc: string;
  img: string;
  highlights: string[];
};

type HomeServicesProps = {
  basePath: string;
  services: ServiceItem[];
};

export default function HomeServices({ basePath, services }: HomeServicesProps) {
  return (
    <section className="relative bg-[#FCFAF6] py-28 lg:py-36 selection:bg-[#C1FF72] selection:text-[#0A0A0A] border-t border-[#0A0A0A]/5">
      {/* Decorative vertical line */}
      <div className="absolute right-[8%] top-0 w-px h-full bg-[#0A0A0A]/5 pointer-events-none z-0"></div>
      
      <div className="max-w-[90rem] mx-auto px-8 w-full relative z-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-24">
          <div className="space-y-6 max-w-2xl text-left">
            <div className="inline-flex items-center gap-3">
              <div className="w-8 h-px bg-[#0A0A0A]"></div>
              <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#0A0A0A]/70">Our Specialization</span>
            </div>
            <h2 className="font-serif text-5xl lg:text-7xl font-light tracking-tight leading-[1.05] text-[#0A0A0A]">
              Our Design <br /> Services <span className="text-[#C1FF72]">.</span>
            </h2>
          </div>
          <Link
            href={`${basePath}/services`}
            className="group inline-flex items-center gap-4 text-[#0A0A0A] font-bold tracking-[0.15em] uppercase text-[11px] hover:text-[#0A0A0A]/70 transition-colors shrink-0"
          >
            <span className="border-b border-[#0A0A0A]/20 hover:border-[#0A0A0A] pb-1 transition-colors">View All Services</span>
            <span className="w-9 h-9 rounded-full border border-[#0A0A0A] group-hover:bg-[#C1FF72] group-hover:border-[#C1FF72] flex items-center justify-center transition-all duration-300">
              <ChevronRight className="w-3.5 h-3.5 text-[#0A0A0A]" />
            </span>
          </Link>
        </div>

        {/* Services Grid (Minimal Architectural Cards) */}
        <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
          {services.map((svc, idx) => (
            <div key={idx} className="group cursor-pointer flex flex-col h-full text-left">
              {/* Image box with visual triggers */}
              <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem] mb-8 border border-[#0A0A0A]/5 bg-[#FCFAF6] shadow-sm">
                <img
                  src={svc.img}
                  alt={svc.title}
                  className="w-full h-full object-cover grayscale-[30%] transition-all duration-[1200ms] group-hover:scale-105 group-hover:grayscale-0"
                />
                {/* Subtle dark styling overlay */}
                <div className="absolute inset-0 bg-[#0A0A0A]/10 transition-colors duration-500 group-hover:bg-transparent"></div>
                
                {/* Floating arrow reveal button */}
                <div className="absolute top-6 right-6 w-10 h-10 bg-[#FCFAF6] rounded-full flex items-center justify-center transform scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 shadow-xl border border-[#0A0A0A]/5">
                  <ArrowRight className="w-4 h-4 text-[#0A0A0A] -rotate-45" />
                </div>
              </div>

              {/* Text components details list */}
              <div className="flex gap-4">
                <span className="font-serif text-base italic text-[#0A0A0A]/40 mt-1">{svc.num}</span>
                <div className="space-y-3 grow">
                  <h3 className="font-serif text-xl md:text-2xl font-normal tracking-wide text-[#0A0A0A] group-hover:text-[#0A0A0A]/70 transition-colors">
                    {svc.title}
                  </h3>
                  <p className="text-[15px] font-normal leading-relaxed text-[#0A0A0A]/70 mb-6 min-h-[3.5rem]">
                    {svc.desc}
                  </p>
                  
                  {/* Highlights list */}
                  <ul className="space-y-2 pt-4 border-t border-[#0A0A0A]/5">
                    {svc.highlights.map((highlight, hIdx) => (
                      <li key={hIdx} className="text-[12px] font-semibold uppercase tracking-[0.15em] text-[#0A0A0A]/60 border-l-2 border-[#C1FF72] pl-3 py-1 hover:text-[#0A0A0A]/80 hover:border-[#0A0A0A]/50 transition-all duration-300">
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

