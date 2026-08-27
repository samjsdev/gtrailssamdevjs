import { readSourceConfig } from '@/lib/sourceData';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import GalleryClient from '../GalleryClient';

interface PageProps {
  params?: any;
}

export default async function GalleryPage({ params }: PageProps) {
  const data = await readSourceConfig(undefined, 'template5');

  if (!data || !data.clinic) {
    notFound();
  }

  const phone = '09841098490';
  const displayPhone = '+91 98410 98490';
  const media = data.media || {};

  return (
    <div className="w-full bg-[#FAFAFA] text-[#111111]">
      {/* ── Hero Banner ── */}
      <section className="py-20 md:py-28 bg-[#111111] text-white border-b-4 border-[#111111] px-6 md:px-12 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <p className="text-xs font-bold tracking-[0.25em] uppercase text-[#EA580C]">
            Visual Portfolio &bull; 850+ Projects Handled
          </p>
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold font-serif leading-tight tracking-tight"
            style={{ fontFamily: "'Lora', serif" }}
          >
            Signature Residences &amp; Architectural Designs.
          </h1>
          <p className="text-base sm:text-lg text-white/75 font-medium max-w-2xl mx-auto leading-relaxed">
            Explore independent villas, contemporary 3D elevations, and turnkey modular interiors executed by Murali Patharala Associates across Chennai.
          </p>
        </div>
      </section>

      {/* ── Filterable Gallery Grid ── */}
      <section className="py-16 md:py-24 px-6 md:px-12 bg-white border-b-4 border-[#111111]">
        <div className="max-w-7xl mx-auto">
          <GalleryClient images={media} />
        </div>
      </section>

      {/* ── Pre-Footer Action ── */}
      <section className="py-16 md:py-20 px-6 md:px-12 bg-[#111111] text-white text-center">
        <h3
          className="text-2xl sm:text-4xl font-bold font-serif mb-4 text-[#EA580C]"
          style={{ fontFamily: "'Lora', serif" }}
        >
          Have an Architectural Concept in Mind?
        </h3>
        <p className="text-white/70 max-w-xl mx-auto mb-8 text-sm sm:text-base font-medium">
          Bring your site sketches, floor plan ideas, or Pinterest moodboards to our Anna Nagar studio.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/contact"
            className="px-8 py-4 bg-[#EA580C] text-[#111111] font-bold uppercase tracking-widest text-xs hover:bg-white transition-colors"
          >
            Book Free Feasibility
          </Link>
          <a
            href={`tel:${displayPhone}`}
            className="px-8 py-4 border-2 border-[#EA580C] text-[#EA580C] font-bold uppercase tracking-widest text-xs hover:bg-[#EA580C] hover:text-[#111111] transition-colors"
          >
            Call {displayPhone}
          </a>
        </div>
      </section>
    </div>
  );
}
