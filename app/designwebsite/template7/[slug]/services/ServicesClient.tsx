"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Link from 'next/link';
import Image from 'next/image';

import WhyChooseUs from '../components/WhyChooseUs/WhyChooseUs';
import { useTemplateData } from '../context/TemplateContext';

gsap.registerPlugin(ScrollTrigger);

export default function ServicesClient() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { data: templateData, basePath } = useTemplateData();
    const data = templateData.services || {};
    const contactData = templateData.contact || {};

    useGSAP(() => {
        // Subtle Parallax & Fade In
        const sections = gsap.utils.toArray<HTMLElement>('.treatment-section');
        sections.forEach((section) => {
            const content = section.querySelectorAll('.fade-up');
            
            gsap.fromTo(content, 
                { y: 50, opacity: 0 },
                {
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse'
                    },
                    y: 0,
                    opacity: 1,
                    duration: 1.2,
                    stagger: 0.15,
                    ease: 'power3.out'
                }
            );
        });

        // Hero Parallax
        gsap.to('.hero-bg', {
            yPercent: 30,
            ease: 'none',
            scrollTrigger: {
                trigger: '.hero-section',
                start: 'top top',
                end: 'bottom top',
                scrub: true
            }
        });

    }, { scope: containerRef });

    return (
      <div ref={containerRef} className="min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-200 selection:text-blue-900 overflow-x-hidden">
        
        {/* Hero Section */}
        <section className="hero-section relative min-h-[90vh] flex flex-col justify-center items-center px-6 overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-50/50 -z-20" />
            <div className="hero-bg absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full bg-blue-200/20 blur-[120px] -z-10 mix-blend-multiply" />
            <div className="hero-bg absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-indigo-200/20 blur-[120px] -z-10 mix-blend-multiply" />

            <div className="text-center max-w-5xl mx-auto relative z-10">
                <p className="text-blue-600 font-medium tracking-[0.2em] text-sm uppercase mb-8 animate-fade-in-up">
                    World Class Design
                </p>
                <h1 className="text-6xl md:text-8xl lg:text-9xl font-light tracking-tight leading-[0.9] mb-12 text-slate-900" style={{ fontFamily: 'var(--serif-font)' }}>
                    {data.header.title} <br/>
                    <span className="italic font-serif text-blue-600/90 relative inline-block">
                        {data.header.highlight}
                        <svg className="absolute -bottom-2 md:-bottom-4 left-0 w-full h-3 md:h-6 text-blue-200/50 -z-10" viewBox="0 0 100 20" preserveAspectRatio="none">
                             <path d="M0 10 Q 50 20 100 10" stroke="currentColor" strokeWidth="4" fill="none" />
                        </svg>
                    </span>
                </h1>
                <p className="text-xl md:text-2xl text-slate-500 max-w-2xl mx-auto font-light leading-relaxed mb-12">
                    {data.header.description}
                </p>
                
                <div className="flex flex-wrap justify-center gap-8 text-sm font-medium text-slate-400 uppercase tracking-widest">
                    <span>Residential</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-200 self-center" />
                    <span>Commercial</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-200 self-center" />
                    <span>Hospitality</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-200 self-center" />
                    <span>Retail</span>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40 animate-bounce cursor-pointer">
                <span className="text-[10px] uppercase tracking-widest">Explore</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 5v14M19 12l-7 7-7-7" />
                </svg>
            </div>
        </section>

        {/* 1. Essential Care */}
        <section className="treatment-section py-32 px-6 bg-white relative">
            <div className="max-w-[1400px] mx-auto">
                <div className="grid lg:grid-cols-12 gap-16 items-start">
                    <div className="lg:col-span-4 lg:sticky lg:top-32 fade-up">
                        <span className="text-9xl font-light text-slate-100 absolute -top-16 -left-8 -z-10 select-none">01</span>
                        <h2 className="text-5xl font-light mb-8 text-slate-900" style={{ fontFamily: 'var(--serif-font)' }}>
                            {data.essentialCare.title}
                        </h2>
                        <p className="text-lg text-slate-500 leading-relaxed mb-12 max-w-sm">
                            {data.essentialCare.description}
                        </p>
                        <div className="hidden lg:block w-px h-32 bg-slate-200" />
                    </div>
                    
                    <div className="lg:col-span-8 grid md:grid-cols-2 lg:grid-cols-2 gap-8">
                        {data.essentialCare.services.map((service, idx) => (
                            <div key={idx} className={`fade-up group p-10 bg-slate-50 border border-slate-100 hover:border-blue-100 transition-colors duration-500 rounded-3xl ${idx === 2 ? 'md:col-span-2' : ''}`}>
                                <div className="mb-8 relative w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-500">
                                    {idx === 0 ? '📐' : idx === 1 ? '🎨' : '🛋️'}
                                </div>
                                <h3 className="text-2xl font-light mb-4 text-slate-900" style={{ fontFamily: 'var(--serif-font)' }}>
                                    {service.title}
                                </h3>
                                <p className="text-slate-500 mb-8 leading-relaxed font-light">
                                    {service.description}
                                </p>
                                <ul className="space-y-3 border-t border-slate-200/50 pt-6">
                                    {service.features.map((f, i) => (
                                        <li key={i} className="flex items-center gap-3 text-sm font-medium text-slate-600">
                                            <span className="w-1 h-1 rounded-full bg-blue-400" />
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>

        {/* 2. Transformations - Orthodontics */}
        <section className="treatment-section py-32 px-6 bg-slate-50 border-t border-slate-200/50">
            <div className="max-w-[1400px] mx-auto">
                <div className="flex flex-col lg:flex-row gap-20 items-center">
                    <div className="lg:w-1/2 fade-up">
                         <div className="relative aspect-[4/5] md:aspect-square w-full">
                            <div className="absolute inset-4 border border-slate-300 z-10 rounded-2xl" />
                            <div className="relative h-full w-full overflow-hidden shadow-2xl bg-white rounded-2xl">
                                <Image 
                                    src={data.transformations.orthodontics.gallery[0].src} 
                                    alt="Orthodontics" 
                                    fill 
                                    className="object-cover scale-105" 
                                />
                            </div>
                            {/* Floating Detail Card */}
                            <div className="absolute -bottom-8 -right-8 bg-white p-8 shadow-xl max-w-xs z-20 hidden md:block rounded-xl">
                                <p className="font-serif italic text-xl text-slate-800 mb-2">"Elegance in every detail."</p>
                                <p className="text-xs text-slate-400 uppercase tracking-widest">Award Winning Studio</p>
                            </div>
                         </div>
                    </div>
                    <div className="lg:w-1/2 fade-up">
                         <span className="text-sm font-mono text-blue-600 mb-6 block uppercase tracking-widest">02 — Transformations</span>
                         <h2 className="text-5xl md:text-7xl font-light mb-8 text-slate-900" style={{ fontFamily: 'var(--serif-font)' }}>
                            {data.transformations.orthodontics.title}
                         </h2>
                         <p className="text-xl text-slate-500 mb-12 font-light leading-relaxed max-w-xl">
                            {data.transformations.orthodontics.description}
                         </p>
                         
                         <div className="space-y-8">
                            {data.transformations.orthodontics.features.map((feature, i) => (
                                <div key={i} className="flex items-baseline gap-6 group cursor-default">
                                    <span className="text-xs font-mono text-slate-300 group-hover:text-blue-500 transition-colors">0{i+1}</span>
                                    <h4 className="text-2xl font-serif text-slate-800 group-hover:translate-x-2 transition-transform duration-300">
                                        {feature}
                                    </h4>
                                </div>
                            ))}
                         </div>

                         <div className="mt-16">
                            <Link href={`${basePath}/contact`} className="group inline-flex items-center gap-4 text-slate-900 border-b border-slate-900 pb-1 hover:text-blue-600 hover:border-blue-600 transition-colors">
                                <span className="text-lg font-medium">Book Consultation</span>
                                <span className="group-hover:translate-x-2 transition-transform">→</span>
                            </Link>
                         </div>
                    </div>
                </div>
            </div>
        </section>

        {/* 3. Implants - Dark Section */}
        <section className="treatment-section py-32 px-6 bg-slate-900 text-white relative overflow-hidden">
            {/* Texture */}
             <div className="absolute inset-0 opacity-20 bg-[url('/noise.png')]" />
             
            <div className="max-w-[1400px] mx-auto relative z-10">
                <div className="grid lg:grid-cols-2 gap-20 items-center">
                    <div className="order-2 lg:order-1 fade-up">
                        <span className="text-sm font-mono text-blue-300 mb-6 block uppercase tracking-widest">03 — Restoration</span>
                        <h2 className="text-5xl md:text-7xl font-light mb-8" style={{ fontFamily: 'var(--serif-font)' }}>
                            {data.transformations.implants.title}
                        </h2>
                        <div className="w-24 h-px bg-blue-500 mb-10" />
                        <p className="text-xl text-slate-300 mb-12 font-light leading-relaxed max-w-xl">
                            {data.transformations.implants.description}
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-16 border-t border-slate-800 pt-10">
                            {data.transformations.implants.features.map((f, i) => (
                                <div key={i}>
                                    <h5 className="font-serif text-xl mb-2">{f}</h5>
                                    <p className="text-sm text-slate-500">Premium Solution</p>
                                </div>
                            ))}
                        </div>
                        <Link href={`${basePath}/contact`} className="inline-block bg-white text-slate-900 px-8 py-4 uppercase tracking-widest text-xs font-bold hover:bg-blue-50 transition-colors rounded-full">
                            Start your project
                        </Link>
                    </div>
                    <div className="order-1 lg:order-2 fade-up relative h-[600px] w-full grayscale hover:grayscale-0 transition-all duration-1000 rounded-[2.5rem] overflow-hidden">
                         <Image 
                            src={data.transformations.implants.image} 
                            alt="Implants" 
                            fill 
                            className="object-cover" 
                        />
                        <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
                    </div>
                </div>
            </div>
        </section>

        {/* 4. Cosmetic - Gallery Style */}
        <section className="treatment-section py-32 px-6 bg-white relative">
            <div className="max-w-[1400px] mx-auto text-center fade-up mb-20">
                <span className="text-sm font-mono text-blue-600 mb-6 block uppercase tracking-widest">04 — Aesthetics</span>
                <h2 className="text-5xl md:text-7xl font-light mb-8 text-slate-900" style={{ fontFamily: 'var(--serif-font)' }}>
                    {data.transformations.cosmetic.title}
                </h2>
                <p className="text-xl text-slate-500 font-light max-w-2xl mx-auto">
                     {data.transformations.cosmetic.description}
                </p>
            </div>

            <div className="max-w-[1600px] mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[600px]">
                    <div className="md:col-span-2 relative fade-up overflow-hidden group rounded-3xl">
                        <Image 
                            src={data.transformations.cosmetic.image} 
                            alt="Cosmetic" 
                            fill 
                            className="object-cover transition-transform duration-1000 group-hover:scale-105" 
                        />
                        <div className="absolute bottom-0 left-0 p-8 w-full bg-gradient-to-t from-black/60 to-transparent">
                            <h3 className="text-white text-2xl font-serif">Custom Furniture</h3>
                        </div>
                    </div>
                    <div className="grid grid-rows-2 gap-4">
                        <div className="relative bg-slate-100 p-8 flex flex-col justify-center fade-up rounded-3xl">
                            <h4 className="text-xl font-serif text-slate-900 mb-4">Bespoke Design</h4>
                            <p className="text-slate-500 text-sm leading-relaxed">Tailored specifically to your vision and functional needs.</p>
                        </div>
                        <div className="relative bg-blue-50 p-8 flex flex-col justify-center fade-up rounded-3xl">
                            <h4 className="text-xl font-serif text-blue-900 mb-4">Lighting & Decor</h4>
                            <p className="text-blue-700/70 text-sm leading-relaxed">Expertly curated lighting and decor for immediate, brilliant results.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* 5. Advanced Procedures - Minimal List */}
        <section className="treatment-section py-32 px-6 bg-slate-50 border-t border-slate-200">
             <div className="max-w-[1200px] mx-auto">
                <div className="mb-20 fade-up">
                    <h2 className="text-3xl font-light text-slate-900 mb-4" style={{ fontFamily: 'var(--serif-font)' }}>
                        {data.advancedProcedures.title}
                    </h2>
                     <div className="h-px w-full bg-slate-300" />
                </div>
                
                <div className="grid md:grid-cols-2 gap-x-20 gap-y-16">
                    {data.advancedProcedures.services.map((service, idx) => (
                        <div key={idx} className="fade-up flex gap-8 group">
                             <div className="w-24 h-24 relative flex-shrink-0 bg-white shadow-lg overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500 rounded-2xl">
                                <Image src={service.image} alt={service.title} fill className="object-cover" />
                             </div>
                             <div>
                                <h3 className="text-2xl font-serif text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">{service.title}</h3>
                                <p className="text-slate-500 mb-4 font-light text-sm leading-relaxed">{service.description}</p>
                                <div className="flex flex-wrap gap-2">
                                    {service.features.map((f, i) => (
                                        <span key={i} className="text-[10px] uppercase tracking-wider px-2 py-1 border border-slate-200 text-slate-400">
                                            {f}
                                        </span>
                                    ))}
                                </div>
                             </div>
                        </div>
                    ))}
                </div>
             </div>
        </section>

        <section className="border-t border-slate-200 bg-white">
             <WhyChooseUs />
        </section>

        {/* Final CTA - Minimalist */}
        <section className="py-32 px-6 bg-slate-900 text-white text-center">
             <div className="max-w-4xl mx-auto fade-up">
                <h2 className="text-5xl md:text-7xl font-light mb-12" style={{ fontFamily: 'var(--serif-font)' }}>
                    Ready for your <br/><span className="italic text-blue-400">new space?</span>
                </h2>
                <div className="flex flex-col sm:flex-row justify-center gap-6">
                    <Link href={`${basePath}/contact`} className="px-10 py-5 bg-white text-slate-900 text-sm font-bold uppercase tracking-widest hover:bg-blue-50 transition-colors">
                        Book Appointment
                    </Link>
                    <Link href={`tel:${contactData.whatsapp.phone}`} className="px-10 py-5 border border-white/20 text-white text-sm font-bold uppercase tracking-widest hover:bg-white/10 transition-colors">
                        Call Us Now
                    </Link>
                </div>
             </div>
        </section>

      </div>
    );
}

// Helper Components
function ServiceCard({ title, description, image, items }: { title: string, description: string, image: string, items: string[] }) {
    return null; // Not using this anymore, sticking to inline for specific layout control
}
