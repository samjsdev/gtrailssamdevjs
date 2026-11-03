import { CONTACT_LINKS } from '@/lib/contactLinks';
import type { Metadata } from 'next';
import { readSourceConfig } from '@/lib/sourceData';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import GalleryClient from '../GalleryClient';
import { siteAssets } from '@/lib/siteAssets';
import { getProjectArchiveImages } from '@/lib/projectArchive';
import { Building2, Award, ShieldCheck, FileCheck2, ArrowDown } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Architectural & Interior Design Portfolio Chennai | MPA Projects',
  description:
    'Explore residential exterior renders, architectural elevations, kitchen concepts, and completed interiors from the Murali Patharala & Associates project archive.',
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
      'Explore the image archive of residential exteriors, interiors, and design work by Murali Patharala & Associates.',
    url: 'https://muralipatharalaassociates.com/gallery/',
    images: [
      {
        url: siteAssets.exteriors.whiteDuplex,
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
    images: [siteAssets.exteriors.whiteDuplex],
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

  const archiveImages = await getProjectArchiveImages();

  return (
    <div className="mpa-inner w-full bg-surface-cream text-[#111111]">
      {/* ── Breadcrumb Navigation ── */}
      <div className="bg-[#111214] px-6 py-3 md:px-12 border-b border-white/10">
        <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-white/60">
          <Link href="/" className="hover:text-[#EA580C] transition-colors">Home</Link>
          <span>/</span>
          <span className="text-[#EA580C]">Projects</span>
        </nav>
      </div>

      {/* ── Dedicated Full-Bleed Architectural Hero Banner ── */}
      <section className="relative overflow-hidden border-b-4 border-[#111111] bg-[#121418] text-white pt-28 pb-20 md:pt-36 md:pb-28 px-6 md:px-12">
        {/* Project archive exterior visualization */}
        <Image
          src={siteAssets.exteriors.whiteDuplex}
          alt="Contemporary white duplex exterior design visualization"
          fill
          priority
          loading="eager"
          sizes="100vw"
          className="hidden object-cover opacity-90 pointer-events-none select-none md:block"
        />
        <Image
          src={siteAssets.exteriors.portraitBrickResidence}
          alt="Contemporary brick and concrete residence from the MPA project archive"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-90 pointer-events-none select-none md:hidden"
        />
        {/* Directional scrim for sharp left-aligned readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#121418]/95 via-[#121418]/75 to-[#121418]/25 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121418]/70 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto space-y-8">
          {/* Eyebrow & Badges */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 bg-[#EA580C] text-[#111111] text-[11px] font-bold uppercase tracking-[0.2em]">
              Project Archive
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-white/70">
              Architectural concepts & interior spaces
            </span>
          </div>

          {/* Main Title */}
          <div className="space-y-4">
            <h1
              className="text-4xl sm:text-6xl md:text-7xl font-bold font-serif leading-[1.05] tracking-tight text-white"
              style={{ fontFamily: "var(--font-content)" }}
            >
              Spaces with character. <br />
              <em className="text-[#EA580C] not-italic">Built with structural precision.</em>
            </h1>
            <p className="text-base sm:text-xl text-white/80 max-w-3xl font-medium leading-relaxed">
              Explore residential elevations, interior concepts, and completed spaces from the <span className="brand-name">Murali Patharala &amp; Associates</span> (MPA) project archive.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex flex-wrap gap-x-6 gap-y-3 border-y border-white/15 py-5 text-xs font-semibold uppercase tracking-wider text-white/75">
            <span>Architectural elevations</span><span>Interior concepts</span><span>Completed interiors</span>
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
              href="/contact#enquiry"
              className="w-full sm:w-auto text-center px-5 py-3 border border-white/40 text-white font-bold uppercase tracking-wider text-[11px] hover:bg-white hover:text-[#111111] transition-colors"
            >
              Discuss a Project
            </Link>
          </div>
        </div>
      </section>

      {/* ── Architectural Trust Bar ── */}
      <div className="bg-surface-sand text-[#302A20] py-3.5 px-6 border-b border-[#222222] overflow-x-auto text-[11px] font-bold uppercase tracking-widest text-center">
        <div className="flex items-center justify-center gap-6 whitespace-nowrap text-ink-muted">
          <Link href="/services/turnkey-construction" className="hover:text-[#703015] transition-colors">Turnkey Civil Construction</Link>
          <span className="text-[#703015]">•</span>
          <Link href="/services/architectural-design" className="hover:text-[#703015] transition-colors">3D BIM Facade Modeling</Link>
          <span className="text-[#703015]">•</span>
          <Link href="/services/interior-design" className="hover:text-[#703015] transition-colors">Bespoke Burma Teak Joinery</Link>
          <span className="text-[#703015]">•</span>
          <Link href="/design-package" className="hover:text-[#703015] transition-colors">Design Packages</Link>
          <span className="text-[#703015]">•</span>
          <Link href="/construction-package" className="hover:text-[#703015] transition-colors">Construction Packages</Link>
        </div>
      </div>

      {/* ── Filterable Gallery Grid ── */}
      <section id="portfolio-grid" className="scroll-mt-20 py-16 md:py-24 px-6 md:px-12 bg-surface-pale border-b-4 border-[#111111]">
        <div className="max-w-7xl mx-auto">
          <GalleryClient archiveImages={archiveImages} />
        </div>
      </section>

      {/* ── Pre-Footer Action ── */}
      <section className="relative py-16 md:py-20 px-6 md:px-12 bg-surface-sand text-[#302A20] text-center overflow-hidden">
        <div className="relative z-10 max-w-3xl mx-auto">
          <h3
            className="mpa-heading-section font-bold font-serif mb-4 text-[#703015] drop-shadow-md"
            style={{ fontFamily: "var(--font-content)" }}
          >
            Have an Architectural Concept in Mind?
          </h3>
          <p className="text-ink-muted max-w-xl mx-auto mb-8 text-sm sm:text-base font-medium">
            Bring your plot sketches, floor plan ideas, or Pinterest moodboards to our Anna Nagar East studio for a free feasibility review.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact"
              className="px-5 py-3 bg-[#EA580C] text-[#111111] font-bold uppercase tracking-wider text-[11px] hover:bg-surface-cream transition-colors"
            >
              Book Free Feasibility
            </Link>
            <a
              href={`${CONTACT_LINKS.whatsapp}?text=${encodeURIComponent('Hi Murali Patharala & Associates, I would like to discuss a project from your gallery.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 border border-[#EA580C] text-[#703015] font-bold uppercase tracking-wider text-[11px] hover:bg-[#EA580C] hover:text-[#111111] transition-colors"
            >
              WhatsApp the studio
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
