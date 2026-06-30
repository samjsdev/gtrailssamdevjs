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
    const { data, basePath } = useTemplateData();
    const contactPhone = data?.clinic?.contact?.phone || '+1 (555) 123-4567';

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

    // --- Hero Section Data ---
    const heroTitle = data?.services?.hero?.title || 'Curated Designs';
    const heroSubtitle = data?.services?.hero?.subtitle || 'World Class Design';
    const heroDesc = data?.services?.hero?.description || 'Comprehensive design solutions delivered with precision, creativity, and care under one roof.';
    const heroHighlights = data?.services?.hero?.highlights || ['Residential', 'Commercial', 'Hospitality', 'Retail'];

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
                    {heroSubtitle}
                </p>
                <h1 className="text-6xl md:text-8xl lg:text-9xl font-light tracking-tight leading-[0.9] mb-12 text-slate-900" style={{ fontFamily: 'var(--serif-font)' }}>
                    {heroTitle.split(' ').map((word: string, i: number, arr: string[]) => 
                        i === arr.length - 1 ? (
                            <span key={i} className="italic font-serif text-blue-600/90 relative inline-block">
                                {word}
                                <svg className="absolute -bottom-2 md:-bottom-4 left-0 w-full h-3 md:h-6 text-blue-200/50 -z-10" viewBox="0 0 100 20" preserveAspectRatio="none">
                                     <path d="M0 10 Q 50 20 100 10" stroke="currentColor" strokeWidth="4" fill="none" />
                                </svg>
                            </span>
                        ) : (
                            <React.Fragment key={i}>{word} </React.Fragment>
                        )
                    )}
                </h1>
                <p className="text-xl md:text-2xl text-slate-500 max-w-2xl mx-auto font-light leading-relaxed mb-12">
                    {heroDesc}
                </p>
                
                <div className="flex flex-wrap justify-center gap-8 text-sm font-medium text-slate-400 uppercase tracking-widest">
                    {heroHighlights.map((hl: string, i: number) => (
                        <React.Fragment key={i}>
                            <span>{hl}</span>
                            {i < heroHighlights.length - 1 && <span className="w-1.5 h-1.5 rounded-full bg-blue-200 self-center" />}
                        </React.Fragment>
                    ))}
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

        {(() => {
            const essTitle = data?.services?.essential?.title || 'Essential Styling';
            const essSteps = data?.services?.essential?.steps || ['Space Planning', 'Color Consultation', 'Furnishing'];
            const essDescs = data?.services?.essential?.stepDescriptions || [
                'The foundation of a beautiful home starts with smart layout and color choices.',
                'Maximize your living space with our expert layout configurations.',
                'Find the perfect palette to match your style and set the right mood.'
            ];
            const sub1 = data?.services?.essential?.subItems?.slice(0, 3) || ['Floor Plans', 'Furniture Layouts', 'Flow Optimization'];
            const sub2 = data?.services?.essential?.subItems?.slice(3, 6) || ['Paint Selection', 'Material Palettes', 'Lighting Integration'];
            const sub3 = data?.services?.essential?.subItems?.slice(6, 9) || ['Custom Furniture', 'Upholstery', 'Decor Selection'];
            const allSubs = [sub1, sub2, sub3];

            return (
                <section className="treatment-section py-32 px-6 bg-white relative">
                    <div className="max-w-[1400px] mx-auto">
                        <div className="grid lg:grid-cols-12 gap-16 items-start">
                            <div className="lg:col-span-4 lg:sticky lg:top-32 fade-up">
                                <span className="text-9xl font-light text-slate-100 absolute -top-16 -left-8 -z-10 select-none">01</span>
                                <h2 className="text-5xl font-light mb-8 text-slate-900" style={{ fontFamily: 'var(--serif-font)' }}>
                                    {essTitle}
                                </h2>
                                <p className="text-lg text-slate-500 leading-relaxed mb-12 max-w-sm">
                                    {essDescs[0]}
                                </p>
                                <div className="hidden lg:block w-px h-32 bg-slate-200" />
                            </div>
                            
                            <div className="lg:col-span-8 grid md:grid-cols-2 lg:grid-cols-2 gap-8">
                                {essSteps.map((title: string, idx: number) => (
                                    <div key={idx} className={`fade-up group p-10 bg-slate-50 border border-slate-100 hover:border-blue-100 transition-colors duration-500 rounded-3xl ${idx === 2 ? 'md:col-span-2' : ''}`}>
                                        <div className="mb-8 relative w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-500">
                                            {idx === 0 ? '📐' : idx === 1 ? '🎨' : '🛋️'}
                                        </div>
                                        <h3 className="text-2xl font-light mb-4 text-slate-900" style={{ fontFamily: 'var(--serif-font)' }}>
                                            {title}
                                        </h3>
                                        <p className="text-slate-500 mb-8 leading-relaxed font-light">
                                            {essDescs[idx]}
                                        </p>
                                        <ul className="space-y-3 border-t border-slate-200/50 pt-6">
                                            {allSubs[idx]?.map((f: any, i: number) => (
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
            );
        })()}

        {/* 2. Transformations - Renovations */}
        {(() => {
            const rTitle = data?.services?.renovations?.title || 'Full Renovations';
            const rSub = data?.services?.renovations?.subtitle || '02 — Transformations';
            const rDesc = data?.services?.renovations?.description || 'Complete overhauls of your living spaces. We manage everything from demolition to final styling.';
            const rBullets = data?.services?.renovations?.bullets || ['Structural Changes', 'Project Management', 'Turnkey Solutions'];
            const rImg = data?.media?.clinicImages?.[9] || 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80';

            return (
                <section className="treatment-section py-32 px-6 bg-slate-50 border-t border-slate-200/50">
                    <div className="max-w-[1400px] mx-auto">
                        <div className="flex flex-col lg:flex-row gap-20 items-center">
                            <div className="lg:w-1/2 fade-up">
                                 <div className="relative aspect-[4/5] md:aspect-square w-full">
                                    <div className="absolute inset-4 border border-slate-300 z-10 rounded-2xl" />
                                    <div className="relative h-full w-full overflow-hidden shadow-2xl bg-white rounded-2xl">
                                        <Image 
                                            src={rImg} 
                                            alt={rTitle} 
                                            fill 
                                            className="object-cover scale-105" 
                                        />
                                    </div>
                                    <div className="absolute -bottom-8 -right-8 bg-white p-8 shadow-xl max-w-xs z-20 hidden md:block rounded-xl">
                                        <p className="font-serif italic text-xl text-slate-800 mb-2">"Elegance in every detail."</p>
                                        <p className="text-xs text-slate-400 uppercase tracking-widest">Award Winning Studio</p>
                                    </div>
                                 </div>
                            </div>
                            <div className="lg:w-1/2 fade-up">
                                 <span className="text-sm font-mono text-blue-600 mb-6 block uppercase tracking-widest">{rSub}</span>
                                 <h2 className="text-5xl md:text-7xl font-light mb-8 text-slate-900" style={{ fontFamily: 'var(--serif-font)' }}>
                                    {rTitle}
                                 </h2>
                                 <p className="text-xl text-slate-500 mb-12 font-light leading-relaxed max-w-xl">
                                    {rDesc}
                                 </p>
                                 
                                 <div className="space-y-8">
                                    {rBullets.map((feature: string, i: number) => (
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
            );
        })()}

        {/* 3. Kitchen & Bath - Dark Section */}
        {(() => {
            const kbTitle = data?.services?.kitchenBath?.title || 'Kitchen & Bath';
            const kbSub = data?.services?.kitchenBath?.subtitle || '03 — Restoration';
            const kbDesc = data?.services?.kitchenBath?.description || 'Specialized designs for the most important rooms in your house, blending functionality with luxury.';
            const kbBullets = data?.services?.kitchenBath?.bullets || ['Custom Cabinetry', 'High-end Fixtures', 'Smart Storage'];
            const kbImg = data?.media?.clinicImages?.[10] || 'https://images.unsplash.com/photo-1556910103-1c02745a872f?auto=format&fit=crop&w=800&q=80';

            return (
                <section className="treatment-section py-32 px-6 bg-slate-900 text-white relative overflow-hidden">
                    {/* Texture */}
                     <div className="absolute inset-0 opacity-20 bg-[url('/noise.png')]" />
                     
                    <div className="max-w-[1400px] mx-auto relative z-10">
                        <div className="grid lg:grid-cols-2 gap-20 items-center">
                            <div className="order-2 lg:order-1 fade-up">
                                <span className="text-sm font-mono text-blue-300 mb-6 block uppercase tracking-widest">{kbSub}</span>
                                <h2 className="text-5xl md:text-7xl font-light mb-8" style={{ fontFamily: 'var(--serif-font)' }}>
                                    {kbTitle}
                                </h2>
                                <div className="w-24 h-px bg-blue-500 mb-10" />
                                <p className="text-xl text-slate-300 mb-12 font-light leading-relaxed max-w-xl">
                                    {kbDesc}
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-16 border-t border-slate-800 pt-10">
                                    {kbBullets.map((f: string, i: number) => (
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
                                    src={kbImg} 
                                    alt={kbTitle} 
                                    fill 
                                    className="object-cover" 
                                />
                                <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
                            </div>
                        </div>
                    </div>
                </section>
            );
        })()}

        {/* 4. Commercial - Gallery Style */}
        {(() => {
            const comTitle = data?.services?.commercial?.title || 'Commercial Spaces';
            const comSub = data?.services?.commercial?.subtitle || '04 — Aesthetics';
            const comPts = data?.services?.commercial?.pointTitles || ['Custom Furniture', 'Bespoke Design', 'Lighting & Decor'];
            const comDescs = data?.services?.commercial?.pointDescriptions || [
                'Inspiring workspaces, retail environments, and hospitality venues designed for success.',
                'Tailored specifically to your vision and functional needs.',
                'Expertly curated lighting and decor for immediate, brilliant results.'
            ];
            const comImg = data?.media?.clinicImages?.[11] || 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80';

            return (
                <section className="treatment-section py-32 px-6 bg-white relative">
                    <div className="max-w-[1400px] mx-auto text-center fade-up mb-20">
                        <span className="text-sm font-mono text-blue-600 mb-6 block uppercase tracking-widest">{comSub}</span>
                        <h2 className="text-5xl md:text-7xl font-light mb-8 text-slate-900" style={{ fontFamily: 'var(--serif-font)' }}>
                            {comTitle}
                        </h2>
                        <p className="text-xl text-slate-500 font-light max-w-2xl mx-auto">
                             {comDescs[0]}
                        </p>
                    </div>

                    <div className="max-w-[1600px] mx-auto px-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[600px]">
                            <div className="md:col-span-2 relative fade-up overflow-hidden group rounded-3xl">
                                <Image 
                                    src={comImg} 
                                    alt={comTitle} 
                                    fill 
                                    className="object-cover transition-transform duration-1000 group-hover:scale-105" 
                                />
                                <div className="absolute bottom-0 left-0 p-8 w-full bg-gradient-to-t from-black/60 to-transparent">
                                    <h3 className="text-white text-2xl font-serif">{comPts[0] || 'Custom Furniture'}</h3>
                                </div>
                            </div>
                            <div className="grid grid-rows-2 gap-4">
                                <div className="relative bg-slate-100 p-8 flex flex-col justify-center fade-up rounded-3xl">
                                    <h4 className="text-xl font-serif text-slate-900 mb-4">{comPts[1] || 'Bespoke Design'}</h4>
                                    <p className="text-slate-500 text-sm leading-relaxed">{comDescs[1]}</p>
                                </div>
                                <div className="relative bg-blue-50 p-8 flex flex-col justify-center fade-up rounded-3xl">
                                    <h4 className="text-xl font-serif text-blue-900 mb-4">{comPts[2] || 'Lighting & Decor'}</h4>
                                    <p className="text-blue-700/70 text-sm leading-relaxed">{comDescs[2]}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            );
        })()}

        {/* 5. Advanced Procedures */}
        {(() => {
            const advTitle = data?.services?.advanced?.title || 'Advanced Services';
            const advTitles = data?.services?.advanced?.serviceTitles || ['Smart Home Integration', 'Sustainable Design'];
            const advDescs = data?.services?.advanced?.serviceDescriptions || [
                'Seamlessly incorporate the latest technology into your interior design.',
                'Eco-friendly materials and energy-efficient solutions for a greener home.'
            ];
            const advSubs = data?.services?.advanced?.subItems || [
                'Automated Lighting', 'Climate Control', 'Security Systems',
                'Green Materials', 'Energy Efficiency', 'Indoor Air Quality'
            ];
            const advImg1 = data?.media?.clinicImages?.[12] || 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80';
            const advImg2 = data?.media?.clinicImages?.[13] || 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80';
            
            const features1 = advSubs.slice(0, 3);
            const features2 = advSubs.slice(3, 6);

            const advServices = [
                { title: advTitles[0], description: advDescs[0], image: advImg1, features: features1 },
                { title: advTitles[1], description: advDescs[1], image: advImg2, features: features2 }
            ];

            return (
                <section className="treatment-section py-32 px-6 bg-slate-50 border-t border-slate-200">
                     <div className="max-w-[1200px] mx-auto">
                        <div className="mb-20 fade-up">
                            <h2 className="text-3xl font-light text-slate-900 mb-4" style={{ fontFamily: 'var(--serif-font)' }}>
                                {advTitle}
                            </h2>
                             <div className="h-px w-full bg-slate-300" />
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-x-20 gap-y-16">
                            {advServices.map((service, idx) => (
                                <div key={idx} className="fade-up flex gap-8 group">
                                     <div className="w-24 h-24 relative flex-shrink-0 bg-white shadow-lg overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500 rounded-2xl">
                                        <Image src={service.image} alt={service.title} fill className="object-cover" />
                                     </div>
                                     <div>
                                        <h3 className="text-2xl font-serif text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">{service.title}</h3>
                                        <p className="text-slate-500 mb-4 font-light text-sm leading-relaxed">{service.description}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {service.features.map((f: string, i: number) => (
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
            );
        })()}

        <section className="border-t border-slate-200 bg-white">
             <WhyChooseUs data={data} />
        </section>

        {/* Final CTA - Minimalist */}
        {(() => {
            const ctaTitle = data?.cta?.title || 'Ready for your\nnew space?';
            const btnAppt = data?.cta?.buttonText || 'Book Appointment';
            const btnCall = data?.cta?.description || 'Call Us Now'; 
            return (
                <section className="py-32 px-6 bg-slate-900 text-white text-center">
                     <div className="max-w-4xl mx-auto fade-up">
                        <h2 className="text-5xl md:text-7xl font-light mb-12 whitespace-pre-line" style={{ fontFamily: 'var(--serif-font)' }}>
                            {ctaTitle.split('\n').map((line: any, i: number) => i === 1 ? <span key={i} className="block italic font-serif text-[var(--accent)]">{line}</span> : <React.Fragment key={i}>{line}<br/></React.Fragment>)}
                        </h2>
                        <div className="flex flex-col sm:flex-row justify-center gap-6">
                            <Link href={`${basePath}/contact`} className="px-10 py-5 bg-white text-slate-900 text-sm font-bold uppercase tracking-widest hover:bg-blue-50 transition-colors">
                                {btnAppt}
                            </Link>
                            <Link href={`tel:${contactPhone.replace(/[^0-9+]/g, '')}`} className="px-10 py-5 border border-white/20 text-white text-sm font-bold uppercase tracking-widest hover:bg-white/10 transition-colors">
                                {btnCall} {contactPhone}
                            </Link>
                        </div>
                     </div>
                </section>
            );
        })()}

      </div>
    );
}

// Helper Components
function ServiceCard({ title, description, image, items }: { title: string, description: string, image: string, items: string[] }) {
    return null; // Not using this anymore, sticking to inline for specific layout control
}
