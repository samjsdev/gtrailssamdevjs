'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { getInteriorServiceData, getInteriorServiceSummary } from '@/lib/interiorContent';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection({ data }: { data?: any }) {
  const containerRef = useRef<HTMLElement>(null);

  const clinic = data?.clinic || {};
  const business = data?.business || {};
  const doctor = data?.doctor || {};
  const about = data?.about || {};
  const leader = data?.leader || {};
  
  const clinicName = clinic.name || 'Interior Design Studio';
  const clinicDesc = about.description || clinic.description || 'Welcome to Interior Design Studio. We create refined, functional interiors tailored to your lifestyle, budget, and space.';
  const aboutSubtitle = about.subtitle || 'Who We Are';
  const aboutTitle = about.title || 'Crafting Timeless Spaces with Purpose and Elegance.';
  const expertiseTitle = about.expertiseTitle || 'Our Expertise';
  const expertiseSubtitle = about.expertiseSubtitle || 'What We Do';
  
  const leaderSectionTitle = leader.title || 'The Leader';
  const leaderName = doctor.name || 'The Leader';
  const leaderFirstName = leaderName.split(' ')[0] || 'Founder';
  const leaderRole = doctor.specialization || 'Interior Design & Turnkey Execution';
  const leaderExp = doctor.experience || '5+';
  const leaderQuote = leader.quote || '"Design is not just about aesthetics; it\'s about creating an environment that elevates your everyday life."';
  const leaderBio = doctor.bio || 'With a visionary approach to modern architecture and a deep understanding of spatial psychology, we have led our studio to become a recognized design firm. Our philosophy centers on transparency, compassionate client care, and uncompromising elegance.';
  const leaderImg = data?.media?.otherImages?.[0] || '/images/stock/bbb7f0e7.webp';

  const servicesList = (business.services?.length ? business.services : [
    'Residential Design', 'Commercial Spaces', 'Full Renovations', 'Custom Furnishing'
  ]).slice(0, 4).map((svc: string) => {
    const svcData = getInteriorServiceData(svc);
    return {
      title: svc,
      icon: (svcData as any)?.icon || '✨',
      description: svcData?.description || getInteriorServiceSummary(svc) || 'Transforming spaces into personalized environments.'
    };
  });

  useGSAP(() => {
    // 1. Who We Are Animations
    gsap.fromTo('.who-reveal', 
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power3.out',
        scrollTrigger: { trigger: '.who-section', start: 'top 80%', toggleActions: 'play none none none' }
      }
    );

    // 2. What We Do Animations
    gsap.fromTo('.service-card',
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: '.what-section', start: 'top 75%', toggleActions: 'play none none none' }
      }
    );

    // 3. The Leader Animations
    gsap.fromTo('.leader-img',
      { opacity: 0, scale: 0.95 },
      {
        opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: '.leader-section', start: 'top 75%', toggleActions: 'play none none none' }
      }
    );

    gsap.fromTo('.leader-text',
      { opacity: 0, x: 30 },
      {
        opacity: 1, x: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: '.leader-section', start: 'top 75%', toggleActions: 'play none none none' }
      }
    );

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-24 md:py-32 relative overflow-hidden bg-[var(--bg)]" id="about">
      
      {/* Background Elements */}
      <div className="absolute top-40 right-0 w-[500px] h-[500px] bg-[var(--accent-2)] opacity-[0.02] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-40 left-0 w-[600px] h-[600px] bg-[var(--accent)] opacity-[0.03] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1300px] mx-auto px-6 relative z-10 flex flex-col gap-32">
        
        {/* SUBSECTION 1: WHO WE ARE */}
        <div className="who-section max-w-4xl mx-auto text-center">
           <div className="who-reveal flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-12 bg-[var(--accent)]" />
              <span className="text-sm font-bold text-[var(--accent)] tracking-[0.2em] uppercase">{aboutSubtitle}</span>
              <div className="h-px w-12 bg-[var(--accent)]" />
           </div>
           
           <h2 className="who-reveal text-4xl md:text-5xl lg:text-6xl font-serif font-light text-[var(--text)] leading-[1.2] mb-8">
             {aboutTitle}
           </h2>
           
           <p className="who-reveal text-lg md:text-xl text-[var(--muted)] leading-relaxed max-w-3xl mx-auto whitespace-pre-wrap">
             {clinicDesc}
           </p>
        </div>

        {/* SUBSECTION 2: WHAT WE DO */}
        <div className="what-section">
           <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
               <div>
                  <div className="flex items-center gap-3 mb-4">
                     <div className="h-px w-8 bg-[var(--accent-2)]" />
                     <span className="text-sm font-bold text-[var(--accent-2)] tracking-[0.2em] uppercase">{expertiseTitle}</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-serif text-[var(--text)]">{expertiseSubtitle}</h2>
               </div>
               <Link href="/services" className="text-[var(--accent)] hover:text-[var(--accent-2)] transition-colors font-medium flex items-center gap-2">
                 View All Services <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
               </Link>
           </div>

           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {servicesList.map((service: any, idx: number) => (
                <div key={idx} className="service-card glass-card p-8 rounded-3xl border border-white/40 hover:border-[var(--accent)]/50 hover:-translate-y-2 transition-all duration-300 group shadow-lg hover:shadow-xl bg-gradient-to-b from-white/60 to-white/20">
                   <div className="w-14 h-14 rounded-2xl bg-[var(--surface)] flex items-center justify-center text-2xl mb-6 shadow-inner group-hover:scale-110 transition-transform duration-300">
                     {service.icon}
                   </div>
                   <h3 className="text-xl font-serif font-medium text-[var(--text)] mb-3">{service.title}</h3>
                   <p className="text-[var(--muted)] text-sm leading-relaxed">{service.description}</p>
                </div>
              ))}
           </div>
        </div>

        {/* SUBSECTION 3: THE LEADER */}
        <div className="leader-section pt-10 border-t border-[var(--border)]">
           <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-16 lg:gap-24 items-center">
              
              {/* Left: Image */}
              <div className="leader-img relative mx-auto lg:mx-0 w-full max-w-[500px]">
                 <div className="relative rounded-[32px] overflow-hidden shadow-2xl aspect-[4/5]">
                    <Image
                      src={leaderImg}
                      alt={leaderName}
                      fill
                      className="object-cover"
                    />
                 </div>
                 
                 {/* Floating Badge */}
                 <div className="absolute -bottom-6 -right-6 lg:-bottom-10 lg:-right-10 z-20">
                   <div className="glass-card p-6 rounded-3xl shadow-xl border border-white/60 backdrop-blur-xl text-center">
                      <span className="block text-3xl font-serif text-[var(--accent)] font-bold mb-1">{leaderExp}+</span>
                      <span className="text-xs font-semibold text-[var(--muted)] uppercase tracking-wider">Years Design<br/>Experience</span>
                   </div>
                 </div>
              </div>

              {/* Right: Content */}
              <div className="flex flex-col">
                 <div className="leader-text flex items-center gap-3 mb-4">
                    <div className="h-px w-8 bg-[var(--accent)]" />
                    <span className="text-sm font-bold text-[var(--accent)] tracking-[0.2em] uppercase">{leaderSectionTitle}</span>
                 </div>

                 <h2 className="leader-text text-4xl md:text-5xl font-serif font-light mb-2 text-[var(--text)]">
                    {leaderName}
                 </h2>
                 <p className="leader-text text-lg text-[var(--muted)] font-medium mb-8">{leaderRole}</p>

                 <blockquote className="leader-text relative mb-8 pl-6 border-l-2 border-[var(--accent)]">
                     <p className="text-2xl font-light italic text-[var(--text)] leading-relaxed">
                         {leaderQuote}
                     </p>
                 </blockquote>

                 <p className="leader-text text-[1.05rem] leading-relaxed text-[var(--muted-2)] mb-10 max-w-xl whitespace-pre-wrap">
                   {leaderBio}
                 </p>

                 {/* Signature & CTA */}
                 <div className="leader-text flex flex-wrap items-center justify-between gap-6 border-t border-[var(--border)] pt-8">
                    <div>
                      <span className="block font-serif text-2xl text-[var(--text)] italic opacity-70">{leaderFirstName}</span>
                      <span className="text-xs text-[var(--muted)] tracking-widest uppercase mt-1 block">Founder</span>
                    </div>
                    <Link href="/contact" className="px-8 py-3.5 bg-[var(--text)] text-[var(--bg)] rounded-full font-medium transition-transform hover:scale-105 shadow-lg">
                       Book Consultation
                    </Link>
                 </div>
              </div>

           </div>
        </div>

      </div>
    </section>
  );
}
