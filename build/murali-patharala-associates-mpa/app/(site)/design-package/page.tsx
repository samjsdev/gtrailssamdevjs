import { CONTACT_LINKS } from '@/lib/contactLinks';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowDown, ArrowRight, DraftingCompass, FileSearch, Home, WalletCards } from 'lucide-react';
import DesignPackages from '../DesignPackages';

export const metadata: Metadata = {
  title: 'Architectural Design Packages in Chennai | Murali Patharala & Associates',
  description:
    'Compare Concept, Construction-Ready, and Complete Home Design packages with custom 2D floor plans, photorealistic 3D elevations, structural engineering drawings, and itemized BOQ estimates in Chennai.',
  keywords: [
    'architectural design packages chennai',
    'house plan packages chennai',
    '3d elevation package chennai',
    'structural drawings cost chennai',
    'cmda sanction approval plans',
    'vastu floor plan packages',
    'architect cost per sq ft chennai',
  ],
  alternates: {
    canonical: '/design-package/',
  },
  openGraph: {
    title: 'Architectural Design Packages in Chennai | Murali Patharala & Associates',
    description:
      'Plan your home with complete clarity. Compare transparent 2D floor planning, 3D exterior elevations, structural sets, and itemized construction estimates before you build.',
    url: 'https://muralipatharalaassociates.com/design-package/',
    images: [
      {
        url: '/images/architecture/architectural-blueprint-draft.webp',
        width: 1200,
        height: 630,
        alt: 'Architectural Design Packages by Murali Patharala & Associates',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Architectural Design Packages in Chennai | MPA',
    description:
      'Transparent design packages covering 2D plans, 3D elevations, and engineering drawings before construction.',
    images: ['/images/architecture/architectural-blueprint-draft.webp'],
  },
};

const DESIGN_SEQUENCE = [
  { num: '01', icon: DraftingCompass, title: 'Design', text: 'Plan the home around your land, family and way of living.' },
  { num: '02', icon: FileSearch, title: 'Finalise', text: 'Coordinate structure, services, elevation and essential details.' },
  { num: '03', icon: WalletCards, title: 'Estimate', text: 'Price the actual design with a clear construction scope.' },
  { num: '04', icon: Home, title: 'Construct', text: 'Build from resolved drawings with fewer changes on site.' },
];

export default function DesignPackagePage() {
  return (
    <div className="mpa-package-page w-full bg-surface-cream text-[#202B29]">
      {/* ── Breadcrumb Navigation ── */}
      <div className="bg-[#172320] px-6 py-3 md:px-12 border-b border-white/10">
        <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-white/60">
          <Link href="/" className="hover:text-[#A94F2D] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/services" className="hover:text-[#A94F2D] transition-colors">Services</Link>
          <span>/</span>
          <span className="text-[#F3B687]">Architectural Design Packages</span>
        </nav>
      </div>

      {/* ── Hero Section ── */}
      <section className="relative overflow-hidden bg-[#1C2927] text-white border-b-4 border-[#A94F2D] px-6 py-20 md:px-12 md:py-28">
        {/* Background Architectural Blueprint & Drafting Table */}
        <Image
          src="/images/architecture/architectural-blueprint-draft.webp"
          alt="Architectural Blueprint Design by Murali Patharala & Associates"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-90 pointer-events-none select-none"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1C2927]/95 via-[#1C2927]/70 to-[#1C2927]/20 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C2927]/70 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-[1.2fr_.8fr] gap-14 items-end min-h-[410px]">
          <div>
            <p className="mb-6 text-[11px] font-bold uppercase tracking-[0.2em] text-[#F3B687]">Design packages / <span className="brand-name">Murali Patharala &amp; Associates</span></p>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.02] drop-shadow-md">
              Design it first.<br />
              <em className="font-normal text-[#F3B687]">Build with certainty.</em>
            </h1>
          </div>
          <div className="border-l border-white/20 pl-7 pb-1 space-y-5">
            <p className="text-base leading-relaxed text-white/80">
              Know what your home will look like, how it will work and what it will take to build—before construction begins.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link href="#design-packages" className="mpa-outline-cta mpa-outline-cta--dark">
                Compare Packages <ArrowDown className="w-3.5 h-3.5" />
              </Link>
              <Link href="/contact#enquiry" className="mpa-outline-cta mpa-outline-cta--dark">
                Discuss your design
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Design Sequence ── */}
      <section className="bg-surface-oat border-b border-[#202B29]/15 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:gap-px bg-[#5D5140]/15">
          {DESIGN_SEQUENCE.map(({ num, icon: Icon, title, text }) => (
            <div key={num} className="bg-surface-oat py-8 sm:px-7 first:pl-0">
              <div className="flex items-center justify-between mb-5">
                <Icon className="w-5 h-5 text-[#A94F2D]" />
                <span className="font-mono text-[10px] text-[#777777]">/{num}</span>
              </div>
              <h2 className="mpa-heading-compact font-bold">{title}</h2>
              <p className="text-xs leading-relaxed text-[#666666] mt-2">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <DesignPackages />

      {/* ── Pre-Footer Interlink CTA ── */}
      <section className="relative overflow-hidden bg-surface-sand text-[#302A20] px-6 py-20 md:px-12 md:py-24 text-center">
        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <p className="text-[11px] font-bold tracking-[0.22em] uppercase text-[#703015]">
            Start with your plot and requirements
          </p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight drop-shadow-md">
            Every good home starts with a resolved design.
          </h2>
          <p className="text-sm md:text-base text-ink-muted leading-relaxed max-w-xl mx-auto">
            Share your land dimensions, family needs and approximate budget. Our architects will help you choose the right level of design documentation.
          </p>
          <div className="pt-4 flex flex-wrap justify-center gap-3">
            <a
              href={`${CONTACT_LINKS.whatsapp}?text=${encodeURIComponent('Hi Murali Patharala & Associates (MPA), I would like to start the architectural design for my home in Chennai.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mpa-outline-cta mpa-outline-cta--accent"
            >
              Start My Home Design <ArrowRight className="w-3.5 h-3.5" />
            </a>
            <Link
              href="/contact#enquiry"
              className="mpa-outline-cta mpa-outline-cta--accent"
            >
              Book a Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
