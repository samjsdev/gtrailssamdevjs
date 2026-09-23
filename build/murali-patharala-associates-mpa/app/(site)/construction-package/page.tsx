import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowDown, ArrowRight, ArrowUpRight, CheckCircle2, FileText, ShieldCheck, Building2, DraftingCompass } from 'lucide-react';
import ConstructionPackages from '../ConstructionPackages';

export const metadata: Metadata = {
  title: 'Fixed-Price Home Construction Packages in Chennai | ARCH Foundation',
  description:
    'Compare Classic, Premium, and Supreme residential construction packages with 100% frozen pricing, Tata Tiscon 550D steel, UltraTech cement, 425+ quality audits, and 10-year structural warranty in Chennai.',
  keywords: [
    'home construction packages chennai',
    'fixed price house construction chennai',
    'construction cost per sq ft chennai',
    'civil contractors anna nagar',
    'arch foundation construction packages',
    'turnkey builders chennai',
    'tata tiscon 550d house builders',
    '10 year warranty home construction',
  ],
  alternates: {
    canonical: '/construction-package/',
  },
  openGraph: {
    title: 'Fixed-Price Home Construction Packages in Chennai | ARCH Foundation',
    description:
      'Compare transparent building specifications, itemized BOQ inclusions, primary steel specifications, and zero escalation contracts from ARCH Foundation Chennai.',
    url: 'https://muralipatharalaassociates.com/construction-package/',
    images: [
      {
        url: '/images/architecture/structural-construction-frame.webp',
        width: 1200,
        height: 630,
        alt: 'Residential Construction Packages by ARCH Foundation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Home Construction Packages in Chennai | ARCH Foundation',
    description:
      'Fixed-price home construction packages with branded materials, 425+ quality audits, and zero cost escalation.',
    images: ['/images/architecture/structural-construction-frame.webp'],
  },
};

const PACKAGE_PROMISES = [
  { icon: FileText, label: 'Itemized BOQ', detail: 'Every material, brand and grade documented' },
  { icon: ShieldCheck, label: 'Price Freeze', detail: 'No hidden civil or material escalation' },
  { icon: CheckCircle2, label: '425+ Checks', detail: 'Stage-wise quality control and reporting' },
];

export default function ConstructionPackagePage() {
  return (
    <div className="w-full bg-[#FAFAF8] text-[#111111]">
      {/* ── Breadcrumb Navigation ── */}
      <div className="bg-[#111214] px-6 py-3 md:px-12 border-b border-white/10">
        <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-white/60">
          <Link href="/" className="hover:text-[#EA580C] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/services" className="hover:text-[#EA580C] transition-colors">Services</Link>
          <span>/</span>
          <span className="text-[#EA580C]">Residential Construction Packages</span>
        </nav>
      </div>

      {/* ── Hero Section ── */}
      <section className="relative min-h-[570px] bg-[#121418] text-white overflow-hidden border-b-4 border-[#EA580C] px-6 md:px-12 py-20 md:py-28 flex items-center">
        {/* Background Engineered RCC Construction Frame */}
        <Image
          src="/images/architecture/structural-construction-frame.webp"
          alt="ARCH Foundation Residential Construction Site"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-90 pointer-events-none select-none"
        />
        {/* Calibrated Scrim: dark on text side (left), transparent on photo side (right) */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#121418]/95 via-[#121418]/70 to-[#121418]/20 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121418]/70 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto w-full grid lg:grid-cols-[1.35fr_.65fr] gap-14 items-end">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 text-[11px] font-bold tracking-[0.24em] uppercase text-[#FB923C] mb-7">
              <span className="w-10 h-px bg-[#EA580C]" />
              Residential construction by ARCH Foundation / Chennai
            </div>
            <h1
              className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.02] drop-shadow-md"
              style={{ fontFamily: "var(--font-lora), serif" }}
            >
              Construction packages,<br />
              <em className="font-normal text-[#FB923C]">specified in full.</em>
            </h1>
            <p className="mt-7 max-w-2xl text-base md:text-lg leading-relaxed text-white/85 drop-shadow-sm font-medium">
              Compare three turnkey build standards with clear rates, named material brands,
              engineering oversight and a written scope before work begins.
            </p>
          </div>

          <div className="border-l border-white/20 pl-7 space-y-6">
            <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/60">ARCH Foundation Specification Schedule / 2026</p>
            <p className="text-sm leading-relaxed text-white/85">
              From RCC structure to switches and sanitaryware, each package makes the finish level and project responsibility visible upfront.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="#packages"
                className="inline-flex items-center gap-2.5 px-6 py-3 bg-[#EA580C] text-[#111111] text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors"
              >
                Compare Packages <ArrowDown className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/design-package"
                className="inline-flex items-center gap-2 border border-white/30 px-5 py-3 text-xs font-bold uppercase tracking-wider text-white hover:border-[#FB923C] hover:text-[#FB923C] transition-colors"
              >
                Design Packages &rarr;
              </Link>
            </div>
            <div className="pt-2 flex flex-wrap gap-4 text-[10px] font-bold uppercase tracking-[0.16em] text-white/70">
              <Link href="/services/residential-construction" className="hover:text-white transition-colors">
                Civil Construction Guide &rarr;
              </Link>
              <Link href="/services/turnkey-construction" className="hover:text-white transition-colors">
                Turnkey Workflow &rarr;
              </Link>
              <Link href="/gallery" className="hover:text-white transition-colors">
                Delivered Sites Gallery ↗
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Design Cross-Link Ribbon ── */}
      <div className="bg-[#111111] text-white py-4 px-6 md:px-12 border-b border-[#222222]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium">
          <div className="flex items-center gap-3 text-white/85">
            <span className="w-2 h-2 bg-[#EA580C] rounded-full inline-block shrink-0" />
            <span>
              <strong>Don&apos;t have architectural or structural drawings yet?</strong>{' '}
              Murali Patharala &amp; Associates (MPA) prepares custom 2D floor plans, 3D BIM elevations, and CMDA sanction sets.
            </span>
          </div>
          <Link
            href="/design-package"
            className="shrink-0 text-[#FB923C] hover:text-white font-bold uppercase tracking-wider text-[11px] flex items-center gap-1.5"
          >
            <span>Compare Architectural Design Packages</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* ── Assurances ── */}
      <section aria-label="Construction package assurances" className="border-b border-[#111111]/15 bg-[#E8E2D9] px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#111111]/15">
          {PACKAGE_PROMISES.map(({ icon: Icon, label, detail }) => (
            <div key={label} className="py-7 md:px-8 first:pl-0 flex items-center gap-4">
              <span className="w-11 h-11 bg-[#111111] text-[#FB923C] flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5" />
              </span>
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wide">{label}</h2>
                <p className="text-xs text-[#666666] mt-1">{detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <ConstructionPackages phone="09841098490" variant="full" />

      {/* ── Above-Footer Pre-Footer CTA ── */}
      <section className="relative overflow-hidden bg-[#121418] text-white px-6 py-20 md:px-12 md:py-24 text-center">
        {/* Background Handover & Quality Assurance */}
        <Image
          src="/images/architecture/turnkey-key-handover.webp"
          alt="Residential Handover by ARCH Foundation"
          fill
          sizes="100vw"
          className="object-cover opacity-85 pointer-events-none select-none"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121418]/90 via-[#121418]/60 to-[#121418]/30 pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <p className="text-xs font-bold tracking-[0.22em] uppercase text-[#FB923C]">
            Ready to Build in Chennai?
          </p>
          <h2
            className="text-3xl sm:text-5xl font-bold font-serif tracking-tight drop-shadow-md"
            style={{ fontFamily: "var(--font-lora), serif" }}
          >
            Get an Itemized BOQ &amp; Site Feasibility for Your Plot
          </h2>
          <p className="text-sm sm:text-base text-white/85 font-medium leading-relaxed max-w-xl mx-auto drop-shadow-sm">
            Share your plot dimensions and location. Our senior civil engineers will inspect your site, evaluate soil conditions, and prepare a 100% price-frozen specification sheet.
          </p>
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="#packages"
              className="px-5 py-3 bg-[#EA580C] text-[#111111] font-bold uppercase tracking-wider text-[11px] hover:bg-white transition-colors shadow-md"
            >
              Review Packages Above
            </Link>
            <Link
              href="/design-package"
              className="px-5 py-3 border border-[#EA580C] text-[#EA580C] font-bold uppercase tracking-wider text-[11px] hover:bg-[#EA580C] hover:text-[#111111] transition-colors"
            >
              Need Design Drawings First?
            </Link>
            <a
              href="https://wa.me/919841098490?text=Hi%20ARCH%20Foundation%2C%20I%20would%20like%20to%20schedule%20a%20site%20feasibility%20inspection%20for%20my%20plot."
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 border border-white/40 text-white font-bold uppercase tracking-wider text-[11px] hover:bg-white hover:text-[#111111] transition-colors"
            >
              WhatsApp Senior Engineer
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
