import { readSourceConfig } from '@/lib/dataBuilder';
import { cleanClinicName, cleanClinicDescription } from '@/lib/copyCleaner';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import GalleryClient from '../GalleryClient';
import { 
  Building, Compass, Layers, ShieldCheck, HardHat, 
  CheckCircle2, Ruler, ArrowRight, Phone 
} from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function Template5GalleryPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const data = await readSourceConfig(slug, 'template5');

  if (!data || !data.clinic) {
    notFound();
  }

  const clinicName = cleanClinicName(data.clinic.name);
  const clinicTagline = data.clinic.tagline || 'Integrated Architectural Design, Turnkey Residential Construction & Luxury Interiors';
  const clinicPhone = data.clinic.contact?.phone || '+91 81100 00384';

  const media = data.media || {};
  const basePath = `/designwebsite/template5/${slug}`;

  return (
    <div className="w-full bg-[#F8F7F4] text-[#1E2322]">
      {/* ─── Hero Banner Section ─── */}
      <section id="gallery-hero" className="relative py-20 sm:py-28 bg-white border-b border-[#1E2322]/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#181C1B] text-[#C49B45] text-xs font-mono font-semibold uppercase tracking-[0.2em] rounded-sm">
              <Layers className="w-3.5 h-3.5 text-[#C85A32]" />
              <span>PROJECT BLUEPRINTS & SITE SHOWCASE</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold uppercase text-[#1E2322] tracking-tight leading-[0.95]">
              OUR COMPLETED <span className="text-[#C85A32]">RESIDENTIAL & CIVIL</span> WORKS
            </h1>
            <p className="text-sm sm:text-base font-semibold uppercase tracking-wider text-[#C49B45]">
              {clinicName} &bull; {clinicTagline}
            </p>
          </div>
        </div>
      </section>

      {/* ─── Interactive Gallery Portfolio ─── */}
      <section className="py-24 px-4 sm:px-8 bg-[#F8F7F4] border-b border-[#1E2322]/15">
        <div className="max-w-7xl mx-auto">
          <GalleryClient images={media} />
        </div>
      </section>

      {/* ─── Bottom CTA Banner ─── */}
      <section className="py-20 px-4 sm:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-block px-3.5 py-1 bg-[#181C1B] text-[#C49B45] text-xs font-mono font-semibold uppercase tracking-[0.2em] rounded-sm">
            TURNKEY QUALITY
          </div>
          <h3 className="text-3xl sm:text-5xl font-bold uppercase text-[#1E2322] tracking-tight">
            COMMISSION YOUR BESPOKE RESIDENCE
          </h3>
          <p className="text-xs sm:text-sm text-[#1E2322]/75 font-sans max-w-xl mx-auto leading-relaxed">
            Schedule an on-site structural consultation and 3D architectural review with our engineering leadership.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href={`${basePath}#cost-calculator`}
              className="px-8 py-3.5 bg-[#C85A32] hover:bg-[#B34D28] text-white font-semibold text-xs uppercase tracking-widest rounded-sm shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
              CALCULATE ESTIMATE
            </Link>

            <Link
              href={`${basePath}/contact`}
              className="px-8 py-3.5 bg-[#1E2322] hover:bg-[#141716] text-white font-semibold text-xs uppercase tracking-widest rounded-sm shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
              SCHEDULE SITE SURVEY
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
