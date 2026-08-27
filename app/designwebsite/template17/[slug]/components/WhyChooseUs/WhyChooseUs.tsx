'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function WhyChooseUs({ data }: { data?: any }) {
  const clinicName = data?.clinic?.name || 'Architectural Atelier';
  const subtitle = data?.philosophy?.subtitle || 'Client Confidence';
  const title = data?.philosophy?.title || 'Why clients trust';
  const desc = data?.philosophy?.description || 'We combine architectural vision, structural engineering, and a client-first approach to deliver generational residences you can rely on.';
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Header Trigger
    gsap.fromTo('.why-choose-header', 
      { y: 50, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 1, 
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.why-choose-header',
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );

    // Feature Cards - Batch Trigger
    // This allows cards to animate in rows or individually as they scroll into view
    ScrollTrigger.batch('.feature-card', {
      start: 'top 90%', // Trigger when card enters bottom of viewport
      onEnter: (batch) => {
        gsap.fromTo(batch, 
          { y: 40, opacity: 0 }, 
          {
            y: 0, 
            opacity: 1, 
            duration: 0.8, 
            stagger: 0.15, // Stagger relative to the BATCH (row/group in view)
            ease: 'power3.out'
          }
        );
      },
      once: true // Only animate once
    });
  }, { scope: containerRef });

  const features = [
    {
      title: "Licensed Architects & Engineers",
      desc: "Qualified architects and structural engineers calculate load safety and oversee construction personally on site.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
      )
    },
    {
      title: "100% CMDA & Corporation Approvals",
      desc: "Single-window government building permit approvals with strict setback and road-width compliance.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
      )
    },
    {
      title: "Soil-Tested Strong Foundations",
      desc: "Soil testing to determine the right foundation—bored concrete piles for clay soils or raft foundations for coastal areas.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
      )
    },
    {
      title: "Fixed Price Contract",
      desc: "Item-by-item material list and fixed price agreement with zero mid-construction price increase.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
      )
    },
    {
      title: "10-Year Structural Warranty",
      desc: "Written 10-year warranty certificate covering foundation stability, concrete pillars, and terrace waterproofing.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
      )
    },
    {
      title: "100% Vaastu Compliant Planning",
      desc: "Proper room placement—pooja room, kitchen, and master bedroom aligned with traditional Vaastu for peace and prosperity.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>
      )
    },
  ];

  return (
    <section ref={containerRef} className="py-24 relative bg-[var(--bg)] overflow-hidden">
      <div className="absolute top-0 right-0 w-[520px] h-[520px] bg-[var(--glow)] rounded-full blur-[120px] pointer-events-none opacity-40" />
      <div className="absolute bottom-0 left-0 w-[460px] h-[460px] bg-[var(--glow-2)] rounded-full blur-[120px] pointer-events-none opacity-40" />

      <div className="max-w-[1240px] mx-auto px-6 relative z-10">
        <div className="why-choose-header mb-20 md:mb-28 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--border)] bg-[var(--surface-2)] mb-6">
             <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-2)]"></span>
             <span className="font-mono text-[10px] text-[var(--muted)] tracking-widest uppercase">{subtitle}</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-light mb-6 text-[var(--text)] leading-tight whitespace-pre-line" style={{ fontFamily: 'var(--serif-font)' }}>
            {title} <br />
            <span className="italic text-[var(--accent)]">{clinicName}</span>
          </h2>
          <p className="text-lg md:text-xl text-[var(--muted)] leading-relaxed max-w-2xl border-l-2 border-[var(--accent-2)] pl-6 whitespace-pre-wrap">
            {desc}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="feature-card group relative p-8 rounded-[24px] bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--accent-2)]/30 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity text-[var(--text)]">
                <span className="text-6xl font-light" style={{ fontFamily: 'var(--serif-font)' }}>
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
              
              <div className="mb-8 relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-[var(--surface-2)] flex items-center justify-center text-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-white transition-colors duration-300 shadow-sm">
                  {feature.icon}
                </div>
              </div>
              
              <h3 className="text-xl md:text-2xl font-medium mb-3 text-[var(--text)]" style={{ fontFamily: 'var(--serif-font)' }}>
                {feature.title}
              </h3>
              
              <p className="text-[var(--muted)] leading-relaxed text-[15px]">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
