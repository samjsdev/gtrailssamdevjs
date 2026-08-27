import { readSourceConfig } from '@/lib/sourceData';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import GalleryClient from '../GalleryClient';
import ProjectCarousel from '../ProjectCarousel';
import {
  Building2, Compass, Layers, ShieldCheck,
  CheckCircle2, Ruler, ArrowRight, Phone, Palette, LayoutGrid, Sparkles
} from 'lucide-react';

interface PageProps {
  params?: any;
}

export default async function GalleryPage({ params }: PageProps) {
  const data = await readSourceConfig(undefined, 'template5');

  if (!data || !data.clinic) {
    notFound();
  }

  const clinicPhone = '98410 98490';
  const media = data.media || {};

  return (
    <div className="w-full bg-[#FAF9F7] text-[#1A1B1A] font-sans">
      {/* ─── Hero Banner Section ─── */}
      <section id="gallery-hero" className="relative py-20 sm:py-28 bg-[#1A1B1A] text-white overflow-hidden">
        <Image
          src="/images/clinicImages-1.jpg"
          alt="Completed villa at dusk by MPA"
          fill
          className="object-cover opacity-55"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1B1A]/75 via-[#1A1B1A]/35 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#E64D16]/20 border border-[#E64D16]/50 rounded-full text-xs font-bold text-[#E6C673] tracking-wide uppercase backdrop-blur-sm">
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Project Showcase &bull; Anna Nagar East Studio</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight leading-tight">
              Completed Sites &amp; <span className="text-[#E64D16]">3D Architectural Designs</span>
            </h1>
            <p className="text-sm sm:text-base text-stone-200 font-normal leading-relaxed">
              Explore independent villas, contemporary elevations, and luxury turnkey residences delivered by ARCH Foundations &amp; Murali Patharala Associates across Chennai.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Featured Carousel ─── */}
      <section className="py-16 sm:py-20 px-4 sm:px-8 bg-white border-b border-stone-200 overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-[3px] bg-[#E64D16]" />
            <span className="text-[11px] font-extrabold tracking-[0.22em] uppercase text-[#E64D16]">
              Featured Landmarks
            </span>
          </div>
          <ProjectCarousel />
        </div>
      </section>

      {/* ─── Interactive Gallery Portfolio ─── */}
      <section className="py-20 sm:py-24 px-4 sm:px-8 bg-[#FAF9F7] border-b border-stone-200">
        <div className="max-w-7xl mx-auto">
          <GalleryClient images={media} />
        </div>
      </section>

      {/* ─── Bottom CTA Banner ─── */}
      <section className="py-16 sm:py-20 px-4 sm:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-block px-3.5 py-1 bg-orange-50 border border-orange-200 rounded-full text-xs font-bold text-[#E64D16] tracking-wide uppercase">
            Turnkey Construction Excellence
          </div>
          <h3 className="text-2xl sm:text-4xl font-serif font-bold text-stone-900">
            Envisioning a similar home in Chennai?
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 max-w-xl mx-auto leading-relaxed">
            Our principal architects and civil engineers will meet you for a complimentary plot study and initial 3D elevation concept.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/#consultation-form"
              className="px-8 py-3.5 bg-[#E64D16] hover:bg-[#C93F0F] text-white font-bold text-xs uppercase tracking-widest rounded-md shadow-md transition-all"
            >
              Book Free Site Inspection
            </Link>
            <a
              href="tel:+919841098490"
              className="px-8 py-3.5 bg-[#1A1B1A] hover:bg-stone-800 text-white font-bold text-xs uppercase tracking-widest rounded-md transition-all"
            >
              Call: +91 98410 98490
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
