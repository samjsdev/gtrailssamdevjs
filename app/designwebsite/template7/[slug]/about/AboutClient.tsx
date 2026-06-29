"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import CTASection from '../components/CTASection/CTASection';
import WhyChooseUs from '../components/WhyChooseUs/WhyChooseUs';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTemplateData } from '../context/TemplateContext';

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { data } = useTemplateData();

    useGSAP(() => {
        // Header Animations
        const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

        tl.from('.header-title', {
                y: 50,
                opacity: 0,
                duration: 1.2
            }, '-=0.8')
            .from('.header-desc', {
                y: 30,
                opacity: 0,
                duration: 1
            }, '-=0.8');

        // Journey Image
        const journeyImages = gsap.utils.toArray<HTMLElement>('.journey-img');
        journeyImages.forEach((img, i) => {
            gsap.fromTo(img, 
                { y: 60, opacity: 0 },
                {
                    scrollTrigger: {
                        trigger: img,
                        start: 'top 85%',
                        toggleActions: 'play none none none' // Changed to play once
                    },
                    y: 0,
                    opacity: 1,
                    duration: 1.2,
                    delay: i * 0.15,
                    ease: 'power4.out',
                    onStart: () => { gsap.set(img, { willChange: 'transform, opacity' }); },
                    onComplete: () => { gsap.set(img, { willChange: 'auto' }); }
                }
            );
        });

        // Timeline Items
        const timelineItems = gsap.utils.toArray<HTMLElement>('.timeline-item');
        timelineItems.forEach((item) => {
            gsap.fromTo(item, 
                { x: 50, opacity: 0 },
                {
                    scrollTrigger: {
                        trigger: item,
                        start: 'top 85%',
                        toggleActions: 'play none none none'
                    },
                    x: 0,
                    opacity: 1,
                    duration: 1,
                    ease: 'power4.out'
                }
            );
        });

        // Philosophy Grid
        gsap.fromTo('.philosophy-item', 
            { y: 28, opacity: 0, scale: 0.95 },
            {
                scrollTrigger: {
                    trigger: '.philosophy-grid',
                    start: 'top 70%', // Adjusted start
                    toggleActions: 'play none none none'
                },
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.85,
                stagger: 0.1,
                ease: 'power3.out'
            }
        );

        // Founder Section
        const founderTl = gsap.timeline({
            scrollTrigger: {
                trigger: '.founder-section',
                start: 'top 70%',
                toggleActions: 'play none none none'
            }
        });

        founderTl.fromTo('.founder-img', 
            { scale: 1.15, opacity: 0 },
            { 
                scale: 1, 
                opacity: 1, 
                duration: 1.5, 
                ease: 'power4.out' 
            }
        )
        .fromTo('.founder-content > *',
            { y: 40, opacity: 0 },
            { 
                y: 0, 
                opacity: 1, 
                duration: 1, 
                stagger: 0.15, 
                ease: 'power4.out' 
            }, '<0.3');

        // Specialists Header Animation
        gsap.fromTo('.specialists-header > *',
            { y: 30, opacity: 0 },
            {
                scrollTrigger: {
                    trigger: '.specialists-header',
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                y: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.1,
                ease: 'power3.out'
            }
        );

        // Specialists Cards Animation
        gsap.fromTo('.specialist-card', 
            { y: 60, opacity: 0 },
            {
                scrollTrigger: {
                    trigger: '.specialists-grid',
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                },
                y: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.15,
                ease: 'power4.out',
                clearProps: 'transform' // Clear transform to avoid conflicts with hover effects
            }
        );

        // Force a refresh after a slight delay to ensure layout is settled
        const timer = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 100);
        
        return () => clearTimeout(timer);
    }, { scope: containerRef });

    const heroSubtitle = data?.about?.hero?.subtitle || 'ABOUT US';
    const heroTitle = data?.about?.hero?.title || 'About Interior Design Studio';
    const heroDesc = data?.about?.hero?.description || 'Interior Design Studio is a full-service design studio serving the city, committed to excellence.';

    const journeyTitle = data?.about?.journey?.title || 'Growing with care,\nstaying personal.';
    const defaultYears = ['2014', '2017', '2020', 'TODAY'];
    const defaultMilestoneTitles = ['Inception', 'Expansion', 'Growing Reach', 'Comprehensive Design'];
    const defaultDesc = [
        'Our studio was founded with a mission to provide high-quality, accessible interior design services.',
        'We expanded our reach by opening a new studio, serving a wider range of clients and projects.',
        'Continuing our commitment, we established another studio to provide comprehensive design services to more families.',
        'We are now a full-service design studio offering all specialties under one roof.'
    ];
    
    const journeyYears = data?.about?.journey?.years || defaultYears;
    const journeyMilestoneTitles = data?.about?.journey?.milestoneTitles || defaultMilestoneTitles;
    const journeyDescriptions = data?.about?.journey?.descriptions || defaultDesc;

    const journeyMilestones = journeyYears.map((year: string, index: number) => ({
        year,
        title: journeyMilestoneTitles[index] || '',
        description: journeyDescriptions[index] || ''
    }));

    const philosophyTitle = data?.about?.philosophy?.title || 'How we care for you';
    const philosophyDesc = data?.about?.philosophy?.description || 'A client-first practice built on empathy, clarity, and modern design that keeps every interaction comfortable and transparent.';
    const defaultPoints = ['Empathy', 'Convenience', 'Innovation', 'Integrity'];
    const defaultPointDescs = [
        'Every client deserves warm, attentive care — delivered with patience, listening, and kindness.',
        'Comprehensive care in one place, coordinated schedules, and clear guidance so visits stay simple.',
        'Modern diagnostics, gentle techniques, and technology-forward treatments for precise, comfortable outcomes.',
        'Transparent plans, clear pricing, and honest guidance-no surprises, just trust.'
    ];
    const philosophyPoints = data?.about?.philosophy?.points || defaultPoints;
    const philosophyPointDescs = data?.about?.philosophy?.pointDescriptions || defaultPointDescs;

    const philosophyPrinciples = philosophyPoints.map((title: string, index: number) => ({
        id: `0${index + 1}`,
        title,
        description: philosophyPointDescs[index] || ''
    }));

    const founderName = data?.doctor?.name || 'Founder Name';
    const founderDegrees = data?.doctor?.degrees || 'B.Arch, M.Des (Interior Architecture)';
    const founderQuote = data?.doctor?.quote || 'Experience-led design with clarity and trust.';
    const founderBio = data?.doctor?.bio || 'Our founder established the studio with over 12 years of experience. They specialize in spatial design and provide expert consultation for residential and commercial projects.';
    const founderSpecializations = data?.doctor?.specializations || [
        'Residential Design', 'Commercial Spaces', 'Sustainable Design', 'Full Renovations',
        'Color Consultation', 'Space Planning', 'Custom Furniture', 'Smart Homes'
    ];
    const founderEducation = data?.doctor?.education || [
        'B.Arch - Prestigious Architecture College',
        'M.Des - Institute of Design Studies'
    ];
    const founderImage = data?.media?.otherImages?.[0] || 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=2000&q=80';

    const teamTitle = data?.about?.team?.title || 'Expert Designers';
    const teamDesc = data?.about?.team?.description || 'A multidisciplinary team of designers dedicated to complex projects, ensuring every client receives expert design tailored to their unique needs.';
    const teamNames = data?.about?.team?.names || ['John Smith', 'Alice Brown'];
    const teamRoles = data?.about?.team?.roles || ['LEAD ARCHITECT', 'SENIOR STYLIST'];
    const teamBios = data?.about?.team?.bios || [
        'Residential layouts, sustainable architecture, adaptive reuse.',
        'Color palettes, material selection, furniture curation.'
    ];
    const teamImages = [
        data?.media?.otherImages?.[1] || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=2000&q=80',
        data?.media?.otherImages?.[2] || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=2000&q=80'
    ];

    const specialists = teamNames.map((name: string, index: number) => ({
        name,
        role: teamRoles[index] || 'DESIGNER',
        qualification: '', 
        image: teamImages[index] || teamImages[0],
        focus: teamBios[index] || ''
    }));

    return (
        <div ref={containerRef} className="min-h-screen bg-[#eaf6ff] text-[var(--text)] overflow-hidden">

            <main className="pt-32 pb-24 relative">
                
                 {/* Background - Soft Blue Gradient Match Home */}
                <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#eaf6ff] via-[#e2f1ff] to-[#f0f9ff] opacity-100 pointer-events-none" />

                 {/* Massive Background Watermark */}
                <div className="absolute top-[2%] left-0 right-0 z-0 overflow-hidden pointer-events-none select-none flex justify-center">
                    <h1 className="text-[18vw] leading-none font-bold text-white opacity-40 text-center uppercase tracking-tighter whitespace-nowrap"
                        style={{ 
                            textShadow: '0 4px 20px rgba(186, 219, 255, 0.4)',
                            WebkitTextStroke: '2px rgba(255,255,255,0.8)'
                        }}>
                    {heroSubtitle}
                    </h1>
                </div>

                {/* Header */}
                <section className="px-6 mb-24 relative z-10">
                    <div className="max-w-[1200px] mx-auto">
                        <div className="flex flex-col items-start max-w-4xl pt-20">


                            <h1 className="header-title text-5xl md:text-7xl font-light leading-[1.1] mb-8 text-slate-900" style={{ fontFamily: 'var(--serif-font)' }}>
                                {heroTitle.split(' ').map((word: string, i: number) => i === 0 ? <React.Fragment key={i}>{word} </React.Fragment> : <span key={i} className="text-slate-900 font-medium">{word} </span>)}
                            </h1>

                            <p className="header-desc text-xl leading-relaxed text-slate-600 max-w-2xl border-l-4 border-blue-200 pl-6">
                                {heroDesc}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Origin, Philosophy, Founder, and Specialists */}
                {/* NEW DESIGN STARTS HERE */}
                {/* 1. Journey Timeline - Clean Vertical with Iconography */}
                <section className="px-6 mb-32 relative z-10">
                    <div className="max-w-[1000px] mx-auto">
                         <div className="text-center mb-16">
                            <span className="font-mono text-xs text-[var(--muted)] tracking-widest uppercase">Our Journey</span>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl mt-4 font-light text-[var(--text)] whitespace-pre-line" style={{ fontFamily: 'var(--serif-font)' }}>
                                {journeyTitle.split('\n').map((line: string, i: number) => i === 1 ? <span key={i} className="italic text-[var(--accent)]">{line}</span> : <React.Fragment key={i}>{line}<br/></React.Fragment>)}
                            </h2>
                         </div>

                        <div className="relative border-l border-[var(--border)] ml-6 md:ml-0 md:border-l-0">
                            {/* Central Line for Desktop */}
                            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-[var(--border)] -translate-x-1/2"></div>

                            {journeyMilestones.map((item: any, index: number) => (
                                <div key={item.year} className={`relative mb-16 md:mb-24 last:mb-0 md:flex ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} justify-between items-center group`}>
                                    
                                    {/* Timeline Dot */}
                                    <div className="absolute left-[-25px] md:left-1/2 md:-translate-x-1/2 top-1 md:top-1/2 md:-translate-y-1/2 w-3 h-3 rounded-full bg-[var(--accent)] outline outline-4 outline-[var(--bg)] z-10 transition-transform duration-500 group-hover:scale-150"></div>
                                    
                                    {/* Content Side */}
                                    <div className="pl-6 md:pl-0 md:w-[42%]">
                                        <div className={`p-8 rounded-[2rem] bg-[var(--surface)] border border-[var(--border)] transition-all duration-500 hover:shadow-xl hover:border-[var(--accent)]/30 ${index % 2 === 0 ? 'md:bg-gradient-to-br md:from-[var(--surface)] md:to-[var(--surface-2)]/50' : ''}`}>
                                            <span className="font-mono text-6xl text-[var(--accent-2)]/10 font-bold absolute top-4 right-6 select-none">{item.year}</span>
                                            <div className="relative z-10">
                                                <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase mb-4 ${item.year === 'TODAY' ? 'bg-[var(--text)] text-[var(--bg)]' : 'bg-[var(--surface-2)] text-[var(--muted)]'}`}>
                                                    {item.year}
                                                </span>
                                                <h3 className="text-2xl font-medium mb-3 text-[var(--text)]" style={{ fontFamily: 'var(--serif-font)' }}>{item.title}</h3>
                                                <p className="text-[var(--muted)] leading-relaxed">{item.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Empty Side for layout balance */}
                                    <div className="hidden md:block md:w-[42%]"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 2. Philosophy - Minimalist Grid */}
                <section className="py-24 bg-[var(--surface)] relative overflow-hidden mb-32">
                    {/* Decorative Blobs */}
                    <div className="absolute -left-32 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[var(--glow)] rounded-full blur-[100px] opacity-40"></div>
                    <div className="absolute -right-32 top-0 w-[400px] h-[400px] bg-[var(--glow-2)] rounded-full blur-[100px] opacity-30"></div>

                    <div className="max-w-[1240px] mx-auto px-6 relative z-10">
                        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
                            <div className="lg:col-span-4">
                                <span className="font-mono text-xs text-[var(--accent)] tracking-widest uppercase block mb-4">Our Philosophy</span>
                                <h2 className="text-4xl md:text-5xl font-light mb-8 text-[var(--text)] leading-tight whitespace-pre-line" style={{ fontFamily: 'var(--serif-font)' }}>
                                    {philosophyTitle}
                                </h2>
                                <p className="text-lg text-[var(--muted)] leading-relaxed mb-8 whitespace-pre-wrap">
                                    {philosophyDesc}
                                </p>
                                <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-[var(--surface-2)] border border-[var(--border)]">
                                    <div className="w-2 h-2 rounded-full bg-[var(--accent-2)] animate-pulse"></div>
                                    <span className="text-xs font-mono uppercase tracking-wider text-[var(--text)]">Client-first mindset</span>
                                </div>
                            </div>
                            
                            <div className="lg:col-span-8 grid sm:grid-cols-2 gap-4">
                                {philosophyPrinciples.map((item: any) => (
                                    <div key={item.id} className="group p-8 rounded-[2rem] bg-[var(--bg)] border border-[var(--border)] hover:border-[var(--accent)]/40 transition-all duration-300 hover:-translate-y-1">
                                        <div className="flex justify-between items-start mb-6">
                                            <span className="font-mono text-xs text-[var(--muted-2)] tracking-widest border border-[var(--border)] px-2 py-1 rounded-md group-hover:bg-[var(--accent)] group-hover:text-white transition-colors">{item.id}</span>
                                            <div className="w-8 h-8 rounded-full bg-[var(--surface-2)] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-[var(--accent)]">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                                            </div>
                                        </div>
                                        <h3 className="text-xl font-medium mb-3 text-[var(--text)]">{item.title}</h3>
                                        <p className="text-sm text-[var(--muted)] leading-relaxed">{item.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. Founder - Redesigned Boutique Layout */}
                <section className="founder-section px-6 mb-32">
                    <div className="max-w-[1240px] mx-auto">
                        <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-20 items-center">
                            
                            {/* Image Side */}
                            <div className="founder-img relative group">
                                <div className="absolute inset-0 bg-[var(--accent-2)]/20 rounded-[40px] transform rotate-3 scale-[1.02] transition-transform duration-500 group-hover:rotate-6"></div>
                                <div className="relative h-[600px] rounded-[40px] overflow-hidden shadow-2xl">
                                    <Image
                                        src={founderImage}
                                        alt={founderName}
                                        fill
                                        className="object-cover"
                                    />
                                    {/* Overlay Gradient for Text Readability if needed */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)]/10 to-transparent"></div>
                                </div>
                                {/* Floating Badge */}
                                <div className="absolute bottom-10 -right-6 md:-right-10 bg-[var(--surface)] p-6 rounded-2xl shadow-xl border border-[var(--border)] max-w-[200px] backdrop-blur-sm hidden md:block">
                                    <p className="text-[4rem] leading-none font-serif text-[var(--accent)] opacity-20 absolute top-2 left-4">“</p>
                                    <p className="relative z-10 text-sm italic text-[var(--muted)] pt-6 text-center">
                                        Founded on trust, led by experience.
                                    </p>
                                </div>
                            </div>

                            {/* Content Side */}
                            <div className="founder-content flex flex-col">
                                <span className="font-mono text-xs text-[var(--accent)] tracking-[0.2em] uppercase mb-4">Founder Profile</span>
                                
                                <h2 className="text-4xl lg:text-5xl font-light mb-2 text-[var(--text)]" style={{ fontFamily: 'var(--serif-font)' }}>
                                    {founderName}
                                </h2>
                                <p className="text-sm font-mono uppercase text-[var(--muted-2)] mb-8 tracking-wider">{founderDegrees}</p>

                                <blockquote className="relative mb-8 pl-6 border-l-2 border-[var(--accent)]">
                                    <p className="text-2xl md:text-3xl font-light italic text-[var(--muted)] leading-relaxed">
                                        "{founderQuote}"
                                    </p>
                                </blockquote>

                                <div className="prose prose-lg text-[var(--muted)] mb-10 whitespace-pre-wrap">
                                    <p>
                                        {founderBio}
                                    </p>
                                </div>

                                {/* Specializations Tags */}
                                <div className="mb-10">
                                    <h4 className="text-xs font-mono uppercase text-[var(--muted-2)] mb-4">Core Specializations</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {founderSpecializations.map((tag: any) => (
                                            <span key={tag} className="px-4 py-2 rounded-lg bg-[var(--surface-2)] text-[var(--text)] text-sm border border-[var(--border)] hover:border-[var(--accent)] transition-colors cursor-default">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Details Grid */}
                                <div className="grid sm:grid-cols-2 gap-8 py-8 border-t border-b border-[var(--border)]">
                                    <div>
                                        <h4 className="flex items-center gap-2 font-medium text-[var(--text)] mb-3">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]"></span>
                                            Education
                                        </h4>
                                        <ul className="text-sm text-[var(--muted)] space-y-2">
                                            {founderEducation.map((edu: any, i: number) => (
                                                <li key={i}>{edu}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="flex items-center gap-2 font-medium text-[var(--text)] mb-3">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]"></span>
                                            Philosophy
                                        </h4>
                                        <p className="text-sm text-[var(--muted)] leading-relaxed">
                                            Compassionate care, transparency, and no hidden charges.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 4. Specialists - Redesigned Detail Cards */}
                <section className="px-6 mb-32 relative z-10">
                    <div className="max-w-[1240px] mx-auto">
                        <div className="specialists-header flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                            <div>
                                <span className="font-mono text-xs text-blue-900 tracking-[0.2em] uppercase mb-4 block">Design Team</span>
                                <h2 className="text-4xl md:text-5xl font-light text-slate-900 whitespace-pre-line" style={{ fontFamily: 'var(--serif-font)' }}>{teamTitle}</h2>
                                <p className="text-slate-600 mt-5 max-w-md leading-relaxed whitespace-pre-wrap">
                                    {teamDesc}
                                </p>
                            </div>
                            <div className="hidden md:block">
                                <div className="p-3 border rounded-full border-slate-200">
                                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-500"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg>
                                </div>
                            </div>
                        </div>

                        <div className="specialists-grid grid md:grid-cols-2 gap-8">
                            {specialists.map((doctor: any, idx: number) => (
                                <div key={doctor.name} className="specialist-card group bg-[var(--surface)] border border-[var(--border)] rounded-[24px] overflow-hidden hover:shadow-xl hover:border-[var(--accent)]/30 transition-all duration-500">
                                    
                                    <div className="aspect-[4/5] overflow-hidden bg-[var(--surface-2)] relative">
                                        <Image 
                                            src={doctor.image} 
                                            alt={doctor.name} 
                                            fill 
                                            className="object-cover transition-transform duration-700 group-hover:scale-105" 
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    </div>
                                    
                                    <div className="p-8 relative">
                                        <div className="absolute -top-6 right-6">
                                             <span className="bg-[var(--accent)] text-white text-[10px] font-mono uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">
                                                {doctor.role}
                                             </span>
                                        </div>

                                        <h3 className="text-2xl font-light text-[var(--text)] mb-2" style={{ fontFamily: 'var(--serif-font)' }}>{doctor.name}</h3>
                                        <p className="text-xs font-mono text-[var(--accent-2)] uppercase tracking-wider mb-4">{doctor.qualification}</p>
                                        
                                        <div className="pt-4 border-t border-[var(--border)] border-dashed">
                                            <p className="text-sm text-[var(--muted)] leading-relaxed group-hover:text-[var(--text)] transition-colors">
                                                {doctor.focus}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <WhyChooseUs data={data} />

                <CTASection data={data} />
            </main>

        </div>
    );
}
