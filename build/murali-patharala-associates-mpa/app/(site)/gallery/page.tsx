import type { Metadata } from 'next';
import { readSourceConfig } from '@/lib/sourceData';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import GalleryClient from '../GalleryClient';
import { Building2, Award, ShieldCheck, FileCheck2, ArrowDown } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Architectural & Interior Design Portfolio Chennai | MPA Projects',
  description:
    'Explore finished residential villas, contemporary facades, custom modular kitchens, and luxury living spaces designed by Murali Patharala & Associates across Chennai and Tamil Nadu.',
  keywords: [
    'architecture portfolio chennai',
    'villa design gallery chennai',
    'interior design photos chennai',
    'modern elevation gallery',
    'modular kitchen gallery chennai',
    'completed residential projects chennai',
  ],
  alternates: {
    canonical: '/gallery/',
  },
  openGraph: {
    title: 'Architectural & Interior Design Portfolio Chennai | MPA Projects',
    description:
      'Curated showcase of bespoke contemporary residences, interior styling, and structural execution by Murali Patharala & Associates.',
    url: 'https://muralipatharalaassociates.com/gallery/',
    images: [
      {
        url: '/images/architecture/tropical-modern-villa.webp',
        width: 1200,
        height: 630,
        alt: 'Murali Patharala & Associates Architectural Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Architectural & Interior Design Portfolio Chennai | MPA',
    description:
      'Showcase of contemporary villas, elevations, and luxury interior design across Chennai.',
    images: ['/images/architecture/tropical-modern-villa.webp'],
  },
};

interface PageProps {
  params?: any;
}

export default async function GalleryPage({ params }: PageProps) {
  const data = await readSourceConfig(undefined, 'template5');

  if (!data || !data.clinic) {
    notFound();
  }

  const displayPhone = '+91 98410 98490';
  const media = data.media || {};

  return (
    <div className="mpa-inner w-full bg-[#FAFAFA] text-[#111111]">
      {/* ── Breadcrumb Navigation ── */}
      <div className="bg-[#111214] px-6 py-3 md:px-12 border-b border-white/10">
        <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-white/60">
          <Link href="/" className="hover:text-[#EA580C] transition-colors">Home</Link>
          <span>/</span>
          <span className="text-[#EA580C]">Selected Portfolio</span>
        </nav>
      </div>

      {/* ── Dedicated Full-Bleed Architectural Hero Banner ── */}
      <section className="relative overflow-hidden border-b-4 border-[#111111] bg-[#121418] text-white pt-28 pb-20 md:pt-36 md:pb-28 px-6 md:px-12">
        {/* Authentic Background Architectural Villa Photography */}
        <Image
          src="/images/architecture/tropical-modern-villa.webp"
          alt="Contemporary luxury residential villa with cantilever balconies and tropical planting"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-90 pointer-events-none select-none"
        />
        {/* Directional scrim for sharp left-aligned readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#121418]/95 via-[#121418]/75 to-[#121418]/25 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121418]/70 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto space-y-8">
          {/* Eyebrow & Badges */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 bg-[#EA580C] text-[#111111] text-[11px] font-bold uppercase tracking-[0.2em]">
              Selected Portfolio
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-white/70">
              500+ Projects Completed Across Tamil Nadu
            </span>
          </div>

          {/* Main Title */}
          <div className="space-y-4">
            <h1
              className="text-4xl sm:text-6xl md:text-7xl font-bold font-serif leading-[1.05] tracking-tight text-white"
              style={{ fontFamily: "'Lora', serif" }}
            >
              Spaces with character. <br />
              <em className="text-[#EA580C] not-italic">Built with structural precision.</em>
            </h1>
            <p className="text-base sm:text-xl text-white/80 max-w-3xl font-medium leading-relaxed">
              From bespoke beachfront villas along the ECR to contemporary courtyard homes in Anna Nagar, explore completed residences designed by Murali Patharala &amp; Associates (MPA) and executed with turnkey civil engineering by ARCH Foundation.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y border-white/15">
            <div>
              <p className="text-2xl sm:text-3xl font-bold font-serif text-[#EA580C]">500+</p>
              <p className="text-[11px] uppercase tracking-wider text-white/70 font-semibold mt-0.5">Homes Delivered</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-bold font-serif text-[#EA580C]">1998</p>
              <p className="text-[11px] uppercase tracking-wider text-white/70 font-semibold mt-0.5">Established</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-bold font-serif text-[#EA580C]">100%</p>
              <p className="text-[11px] uppercase tracking-wider text-white/70 font-semibold mt-0.5">Fixed-Price BOQ</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-bold font-serif text-[#EA580C]">425+</p>
              <p className="text-[11px] uppercase tracking-wider text-white/70 font-semibold mt-0.5">Quality Audits</p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
            <a
              href="#portfolio-grid"
              className="w-full sm:w-auto justify-center px-5 py-3 bg-[#EA580C] text-[#111111] font-bold uppercase tracking-wider text-[11px] hover:bg-white transition-colors flex items-center gap-2"
            >
              <span>Explore All Projects</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </a>
            <Link
              href="/construction-package"
              className="w-full sm:w-auto text-center px-5 py-3 border border-white/40 text-white font-bold uppercase tracking-wider text-[11px] hover:bg-white hover:text-[#111111] transition-colors"
            >
              Compare Build Packages
            </Link>
            <Link
              href="/design-package"
              className="w-full sm:w-auto text-center px-4 py-2.5 text-white/80 hover:text-[#EA580C] font-bold uppercase tracking-wider text-[11px] transition-colors"
            >
              Design Packages &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ── Architectural Trust Bar ── */}
      <div className="bg-[#111111] text-white py-3.5 px-6 border-b border-[#222222] overflow-x-auto text-[11px] font-bold uppercase tracking-widest text-center">
        <div className="flex items-center justify-center gap-6 whitespace-nowrap text-white/80">
          <Link href="/services/turnkey-construction" className="hover:text-[#EA580C] transition-colors">Turnkey Civil Construction</Link>
          <span className="text-[#EA580C]">•</span>
          <Link href="/services/architectural-design" className="hover:text-[#EA580C] transition-colors">3D BIM Facade Modeling</Link>
          <span className="text-[#EA580C]">•</span>
          <Link href="/services/interior-design" className="hover:text-[#EA580C] transition-colors">Bespoke Burma Teak Joinery</Link>
          <span className="text-[#EA580C]">•</span>
          <Link href="/design-package" className="hover:text-[#EA580C] transition-colors">Design Packages</Link>
          <span className="text-[#EA580C]">•</span>
          <Link href="/construction-package" className="hover:text-[#EA580C] transition-colors">Construction Packages</Link>
        </div>
      </div>

      {/* ── Filterable Gallery Grid ── */}
      <section id="portfolio-grid" className="scroll-mt-20 py-16 md:py-24 px-6 md:px-12 bg-white border-b-4 border-[#111111]">
        <div className="max-w-7xl mx-auto">
          <GalleryClient images={media} />
        </div>
      </section>

      {/* ── Pre-Footer Action ── */}
      <section className="relative py-16 md:py-20 px-6 md:px-12 bg-[#121418] text-white text-center overflow-hidden">
        {/* Background Architectural Blueprint / Master Plan */}
        <Image
          src="/images/architecture/urban-master-plan.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-85 pointer-events-none select-none"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121418]/90 via-[#121418]/60 to-[#121418]/30 pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <h3
            className="text-2xl sm:text-4xl font-bold font-serif mb-4 text-[#EA580C] drop-shadow-md"
            style={{ fontFamily: "'Lora', serif" }}
          >
            Have an Architectural Concept in Mind?
          </h3>
          <p className="text-white/80 max-w-xl mx-auto mb-8 text-sm sm:text-base font-medium">
            Bring your plot sketches, floor plan ideas, or Pinterest moodboards to our Anna Nagar East studio for a free feasibility review.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact"
              className="px-5 py-3 bg-[#EA580C] text-[#111111] font-bold uppercase tracking-wider text-[11px] hover:bg-white transition-colors"
            >
              Book Free Feasibility
            </Link>
            <a
              href={`tel:${displayPhone}`}
              className="px-5 py-3 border border-[#EA580C] text-[#EA580C] font-bold uppercase tracking-wider text-[11px] hover:bg-[#EA580C] hover:text-[#111111] transition-colors"
            >
              Call {displayPhone}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
