import { readSourceConfig } from '@/lib/sourceData';
import {
  DEFAULT_INTERIOR_HIGHLIGHTS,
  DEFAULT_INTERIOR_REVIEWS,
  DEFAULT_INTERIOR_SERVICES,
  INTERIOR_HERO_IMAGES,
  getInteriorServiceSummary,
  getInteriorServiceData,
  getServiceImage,
  INTERIOR_FAQS,
} from "@/lib/interiorContent";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import WorkCycleTimeline from "./WorkCycleTimeline";
import type { Metadata } from 'next';

type PageProps = {
  params?: any;
};

export async function generateMetadata(): Promise<Metadata> {
  const data = await readSourceConfig(undefined, 'template4');
  const clinicName = data?.clinic?.name || "Waring Interior";
  const tagline = data?.clinic?.tagline || "Thoughtful Interiors for Everyday Living";
  const desc = data?.clinic?.description || "Refined, functional interiors tailored to your lifestyle, budget, and space.";

  return {
    title: `${clinicName} | ${tagline}`,
    description: desc,
    keywords: [
      "Interior Design Studio",
      "Interior Designer Chennai",
      "Modular Kitchen Design",
      "Living Room Styling",
      "Bedroom Makeovers",
      "Space Planning",
      "Custom Furniture",
      "Chennai interior design agency",
      clinicName
    ],
    openGraph: {
      title: `${clinicName} | ${tagline}`,
      description: desc,
      type: "website",
      locale: "en_IN",
      siteName: clinicName,
    },
  };
}

export default async function DesignStudioHome({ params }: PageProps) {
  const slug = ''; // standalone: slug not needed for data loading
  const basePath = ``;

  const data = await readSourceConfig(undefined, 'template4');
  if (!data) return notFound();

  const { clinic, business, doctor, media, reviews } = data;
  const heroImage = "/treatmentImages-1.jpg";
  
  const doctorImage = "/clinicImages-1.jpg";

  const services = business?.services?.length
    ? business.services
    : DEFAULT_INTERIOR_SERVICES;

  const highlights = business?.highlights?.length
    ? business.highlights.slice(0, 4)
    : DEFAULT_INTERIOR_HIGHLIGHTS;

  const waphone = clinic.contact?.phone?.replace(/\D/g, "") || "919751396117";
  const watext = `Hi, I'm interested in booking a design consultation at ${clinic.name || "your studio"}!`;
  const walink = `https://wa.me/${waphone}?text=${encodeURIComponent(watext)}`;

  return (
    <>
      {/* HERO SECTION */}
      <section className="relative h-screen min-h-[600px] w-full flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0" data-gsap="hero-bg">
          <img
            src={heroImage}
            alt={clinic.name || "Interior design studio"}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center pt-20">
          <p className="text-white/80 uppercase tracking-[0.3em] text-xs md:text-sm font-semibold mb-6" data-gsap="hero-sub">
            {clinic.name || "INTERIOR STUDIO"}
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white leading-tight mb-8" data-gsap="hero-title">
            {clinic.tagline || "Elevating spaces. Inspiring lives."}
          </h1>
          <a
            id="hero-start-project-button"
            href={walink}
            target="_blank"
            rel="noreferrer"
            className="px-8 py-4 bg-white text-stone-900 border border-white uppercase tracking-widest text-sm hover:bg-transparent hover:text-white transition-all duration-300"
            data-gsap="hero-btn"
          >
            Start Your Project
          </a>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-24 md:py-32 px-6 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="w-full lg:w-1/2" data-gsap="reveal">
            <div className="relative aspect-[3/4] w-full max-w-md mx-auto lg:ml-0 overflow-hidden" data-gsap="parallax-container">
              <img 
                src={doctorImage} 
                alt="Lead designer" 
                className="w-full h-full object-cover"
                data-gsap="parallax-img"
              />
            </div>
          </div>
          <div className="w-full lg:w-1/2 space-y-8" data-gsap="reveal">
            <p className="uppercase tracking-[0.2em] text-sm text-stone-500 font-semibold">— Our Philosophy</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-stone-900 leading-tight">
              {doctor?.name || "The Design Vision"}
            </h2>
            <p className="text-lg text-stone-600 font-light leading-relaxed">
              {clinic.description ||
                "We believe in the power of spaces to transform how we live and work. By blending meticulous planning with curated materials, we craft environments that feel both timeless and deeply personal."}
            </p>
            <p className="text-stone-500 font-light">
               {doctor?.specialization || "Residential & Commercial Interior Planning"}
            </p>
          </div>
        </div>
      </section>

      {/* HIGHLIGHTS SECTION */}
      <section className="py-24 px-6 bg-stone-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="uppercase tracking-[0.2em] text-sm text-stone-500 font-semibold mb-4">— Why Us</p>
            <h2 className="text-3xl md:text-4xl font-light text-stone-900">Precision in Every Detail</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12" data-gsap="stagger-container">
            {highlights.map((highlight: string, index: number) => (
              <div key={index} className="flex flex-col text-center" data-gsap="stagger-item">
                <span className="text-stone-300 text-5xl font-light mb-4">0{index + 1}</span>
                <p className="text-stone-800 font-medium tracking-wide uppercase text-sm">{highlight}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="py-24 md:py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-stone-900 mb-6">Our Expertise</h2>
            <p className="text-stone-500 font-light max-w-2xl mx-auto">Comprehensive interior solutions tailored to elevate your environment.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10" data-gsap="stagger-container">
            {services.map((svc: string, index: number) => {
              const svcData = getInteriorServiceData(svc);
              const svcImage = getServiceImage(svc, media) || svcData?.image || INTERIOR_HERO_IMAGES.services;
              return (
                <div key={index} className="group cursor-pointer" data-gsap="stagger-item">
                  <div className="aspect-[4/5] overflow-hidden mb-6 relative">
                    <img 
                      src={svcImage} 
                      alt={svc} 
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <h3 className="text-xl font-medium text-stone-900 mb-3 tracking-wide">{svc}</h3>
                  <p className="text-stone-600 font-light leading-relaxed text-sm">
                    {svcData?.description || getInteriorServiceSummary(svc)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <WorkCycleTimeline />

      {/* TRUST STRIP / PARTNERS */}
      <section className="py-16 bg-stone-900 text-stone-400 border-t border-b border-stone-850">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-center text-stone-500 mb-8">
            TRUSTED BY DESIGN ENTHUSIASTS WORLDWIDE
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center text-center font-semibold text-[10px] md:text-xs tracking-[0.25em] text-stone-400 uppercase">
            <span className="hover:text-stone-100 transition-colors cursor-default">ARCHITECTURAL ARCHIVE</span>
            <span className="hover:text-stone-100 transition-colors cursor-default">FINE MATERIAL CO.</span>
            <span className="hover:text-stone-100 transition-colors cursor-default">LUXE INTERIOR LAB</span>
            <span className="hover:text-stone-100 transition-colors cursor-default">TIMBER & MASON</span>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="py-24 md:py-32 px-6 bg-stone-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <p className="uppercase tracking-[0.2em] text-xs text-stone-500 font-semibold mb-4">— Client Stories</p>
            <h2 className="text-3xl md:text-5xl font-light text-stone-900 leading-tight">What Our Clients Say</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" data-gsap="stagger-container">
            {(reviews?.length ? reviews : DEFAULT_INTERIOR_REVIEWS).slice(0, 6).map((review: any, index: number) => (
              <div key={index} className="bg-white p-8 border border-stone-200/60 shadow-xs flex flex-col justify-between" data-gsap="stagger-item">
                <div className="space-y-6">
                  <div className="flex gap-1 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-stone-600 font-light leading-relaxed italic text-sm">
                    &ldquo;{review.text}&rdquo;
                  </p>
                </div>
                <div className="pt-6 mt-8 border-t border-stone-100 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-stone-900 text-stone-100 flex items-center justify-center font-bold text-xs uppercase">
                    {review.author?.charAt(0) || "C"}
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-stone-900 uppercase tracking-wider">{review.author || "Client"}</h3>
                    <p className="text-[10px] text-stone-400 uppercase tracking-widest">{review.role || "Homeowner"}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* INSTAGRAM FEED SECTION */}
      <section className="py-24 bg-white border-t border-stone-200/80 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6" data-gsap="reveal">
            <div>
              <p className="uppercase tracking-[0.2em] text-xs text-stone-500 font-semibold mb-4">— Social</p>
              <h2 className="text-3xl md:text-5xl font-light text-stone-900 leading-tight">Follow Our Journey</h2>
            </div>
            <a 
              href="https://www.instagram.com/waringinteriors/" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 border border-stone-200 text-stone-900 hover:bg-stone-900 hover:text-white transition-colors duration-300 uppercase tracking-widest text-xs font-semibold group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
              @waringinteriors
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6" data-gsap="stagger-container">
            {[
              "C9iFWf5IpqR",
              "C8nL-dco2Nw",
              "C8XaAIKI0Kl",
            ].map((postId, index) => (
              <div 
                key={index}
                className="bg-white shadow-sm rounded-sm overflow-hidden flex justify-center w-full"
                data-gsap="stagger-item"
              >
                <blockquote 
                  className="instagram-media" 
                  data-instgrm-captioned 
                  data-instgrm-permalink={`https://www.instagram.com/reel/${postId}/?utm_source=ig_embed&amp;utm_campaign=loading`} 
                  data-instgrm-version="14" 
                  style={{ background:'#FFF', border:'0', borderRadius:'3px', boxShadow:'0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)', margin: '1px', maxWidth:'540px', minWidth:'326px', padding:'0', width:'99.375%' }}
                >
                  <div style={{ padding: '16px' }}>
                    <a href={`https://www.instagram.com/reel/${postId}/?utm_source=ig_embed&amp;utm_campaign=loading`} style={{ background:'#FFFFFF', lineHeight:0, padding:'0 0', textAlign:'center', textDecoration:'none', width:'100%' }} target="_blank" rel="noreferrer">
                      View this post on Instagram
                    </a>
                  </div>
                </blockquote>
              </div>
            ))}
          </div>
          <Script async src="//www.instagram.com/embed.js" strategy="lazyOnload" />
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-24 md:py-32 px-6 bg-white border-t border-stone-200/80" data-gsap="reveal">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <p className="uppercase tracking-[0.2em] text-xs text-stone-500 font-semibold mb-4">— Client Queries</p>
            <h2 className="text-3xl md:text-5xl font-light text-stone-900 leading-tight">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {INTERIOR_FAQS.map((faq, i) => (
              <details key={i} className="group border border-stone-200 bg-stone-50 overflow-hidden transition-all duration-300" open={i === 0}>
                <summary className="flex justify-between items-center font-semibold text-stone-850 text-sm md:text-base cursor-pointer list-none p-6 hover:text-stone-600 transition-colors uppercase tracking-wider">
                  {faq.q}
                  <span className="transition-transform duration-300 group-open:rotate-180 text-stone-400">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </span>
                </summary>
                <div className="text-stone-600 font-light text-sm leading-relaxed border-t border-stone-200/60 p-6 bg-white">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* DESIGN CONSULTATION FORM SECTION */}
      <section id="consultation" className="py-24 md:py-32 px-6 bg-stone-50 border-t border-stone-200">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <p className="uppercase tracking-[0.2em] text-xs text-stone-500 font-semibold mb-2">— Start Your Journey</p>
          <h2 className="text-3xl md:text-5xl font-light text-stone-900 leading-tight">Book a Consultation</h2>
          <p className="text-stone-600 font-light max-w-2xl mx-auto text-sm leading-relaxed">
            Fill out our design inquiry form below to share details about your space, style preference, and project timeline.
          </p>
          <div className="w-full max-w-3xl mx-auto bg-white border border-stone-200 shadow-sm p-4 md:p-8 overflow-hidden relative">
            <iframe 
              id="design-consultation-iframe"
              src="https://docs.google.com/forms/d/e/1FAIpQLSeeLybDJF0OYiQWTSme00qv8c0jB6_I4eIBjbHqOKhr1ru-Bw/viewform?embedded=true" 
              width="100%" 
              height="961" 
              className="w-full border-0 relative z-10"
              title="Design Consultation Form"
            >
              Loading…
            </iframe>
          </div>
        </div>
      </section>

      {/* COLLABORATION / CONTACT CALLOUT SECTION */}
      <section className="py-24 px-6 bg-stone-900 text-white text-center space-y-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <p className="uppercase tracking-[0.3em] text-xs text-stone-400 font-semibold">— Let's Collaborate</p>
          <h2 className="text-3xl md:text-5xl font-light leading-tight max-w-2xl mx-auto tracking-wide">
            Ready to design your private sanctuary?
          </h2>
          <p className="text-stone-400 max-w-md mx-auto font-light text-sm leading-relaxed">
            Schedule a showroom visit, view physical materials, or speak with our architects.
          </p>
          <div className="pt-4">
            <Link
              href={`${basePath}/contact`}
              className="px-8 py-4 bg-white text-stone-900 border border-white uppercase tracking-widest text-sm hover:bg-transparent hover:text-white transition-all duration-300 inline-block font-semibold"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
