import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowDown, ArrowRight, ArrowUpRight, DraftingCompass, FileSearch, Home, WalletCards, Building2, ShieldCheck, CheckCircle2 } from 'lucide-react';
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
    <div className="w-full bg-[#FAFAF8] text-[#111111]">
      {/* ── Breadcrumb Navigation ── */}
      <div className="bg-[#111214] px-6 py-3 md:px-12 border-b border-white/10">
        <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-white/60">
          <Link href="/" className="hover:text-[#EA580C] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/services" className="hover:text-[#EA580C] transition-colors">Services</Link>
          <span>/</span>
          <span className="text-[#EA580C]">Architectural Design Packages</span>
        </nav>
      </div>

      {/* ── Hero Section ── */}
      <section className="relative overflow-hidden bg-[#121418] text-white border-b-4 border-[#EA580C] px-6 py-20 md:px-12 md:py-28">
        {/* Background Architectural Blueprint & Drafting Table */}
        <Image
          src="/images/architecture/architectural-blueprint-draft.webp"
          alt="Architectural Blueprint Design by Murali Patharala & Associates"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-90 pointer-events-none select-none"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#121418]/95 via-[#121418]/70 to-[#121418]/20 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121418]/70 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-[1.2fr_.8fr] gap-14 items-end min-h-[410px]">
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="px-3 py-1 bg-[#EA580C] text-[#111111] text-[10px] font-bold uppercase tracking-[0.2em]">
                Murali Patharala &amp; Associates
              </span>
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#FB923C]">
                Design Packages / Chennai
              </span>
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.02] drop-shadow-md">
              Design it first.<br />
              <em className="font-normal text-[#FB923C]">Build with certainty.</em>
            </h1>
          </div>
          <div className="border-l border-white/20 pl-7 pb-1 space-y-5">
            <p className="text-base leading-relaxed text-white/80">
              Know what your home will look like, how it will work and what it will take to build—before construction begins.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link href="#design-packages" className="inline-flex items-center gap-2 px-6 py-3 bg-[#EA580C] text-[#111111] text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors">
                Compare Packages <ArrowDown className="w-3.5 h-3.5" />
              </Link>
              <Link href="/construction-package" className="inline-flex items-center gap-2 border border-white/30 px-5 py-3 text-xs font-bold uppercase tracking-wider text-white hover:border-[#FB923C] hover:text-[#FB923C] transition-colors">
                Construction Packages &rarr;
              </Link>
            </div>
            <div className="pt-2 flex flex-wrap gap-4 text-[10px] font-bold uppercase tracking-[0.16em] text-white/60">
              <Link href="/services/architectural-design" className="hover:text-[#FB923C] transition-colors">
                Architecture Process Guide &rarr;
              </Link>
              <Link href="/gallery" className="hover:text-[#FB923C] transition-colors">
                View 3D Elevation Portfolio ↗
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Construction Cross-Link Ribbon ── */}
      <div className="bg-[#111111] text-white py-4 px-6 md:px-12 border-b border-[#222222]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium">
          <div className="flex items-center gap-3 text-white/85">
            <span className="w-2 h-2 bg-[#EA580C] rounded-full inline-block shrink-0" />
            <span>
              <strong>Planning to build after finalizing drawings?</strong> ARCH Foundation executes turnkey civil construction with zero price escalation.
            </span>
          </div>
          <Link
            href="/construction-package"
            className="shrink-0 text-[#FB923C] hover:text-white font-bold uppercase tracking-wider text-[11px] flex items-center gap-1.5"
          >
            <span>Compare Construction Packages</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* ── Design Sequence ── */}
      <section className="bg-[#E8E2D9] border-b border-[#111111]/15 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:gap-px bg-[#111111]/15">
          {DESIGN_SEQUENCE.map(({ num, icon: Icon, title, text }) => (
            <div key={num} className="bg-[#E8E2D9] py-8 sm:px-7 first:pl-0">
              <div className="flex items-center justify-between mb-5">
                <Icon className="w-5 h-5 text-[#EA580C]" />
                <span className="font-mono text-[10px] text-[#777777]">/{num}</span>
              </div>
              <h2 className="text-lg font-bold">{title}</h2>
              <p className="text-xs leading-relaxed text-[#666666] mt-2">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <DesignPackages />

      {/* ── Pre-Footer Interlink CTA ── */}
      <section className="relative overflow-hidden bg-[#121418] text-white px-6 py-20 md:px-12 md:py-24 text-center">
        {/* Background Architectural Interior */}
        <Image
          src="/images/architecture/monolithic-concrete-atrium.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-85 pointer-events-none select-none"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121418]/90 via-[#121418]/60 to-[#121418]/30 pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <p className="text-[11px] font-bold tracking-[0.22em] uppercase text-[#FB923C]">
            Start with your plot and requirements
          </p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight drop-shadow-md">
            Every good home starts with a resolved design.
          </h2>
          <p className="text-sm md:text-base text-white/75 leading-relaxed max-w-xl mx-auto">
            Share your land dimensions, family needs and approximate budget. Our architects will help you choose the right level of design documentation.
          </p>
          <div className="pt-4 flex flex-wrap justify-center gap-3">
            <a
              href={`https://wa.me/919841098490?text=${encodeURIComponent('Hi Murali Patharala & Associates (MPA), I would like to start the architectural design for my home in Chennai.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 bg-[#EA580C] text-[#111111] text-[11px] font-bold uppercase tracking-wider hover:bg-white transition-colors"
            >
              Start My Home Design <ArrowRight className="w-3.5 h-3.5" />
            </a>
            <Link
              href="/construction-package"
              className="inline-flex items-center gap-2 border border-[#EA580C] text-[#EA580C] px-5 py-3 text-[11px] font-bold uppercase tracking-wider hover:bg-[#EA580C] hover:text-[#111111] transition-colors"
            >
              View Construction Packages
            </Link>
            <Link
              href="/contact#enquiry"
              className="inline-flex items-center gap-2 border border-white/30 px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-white hover:bg-white hover:text-[#111111] transition-colors"
            >
              Book a Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
