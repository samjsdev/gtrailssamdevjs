import { readSourceConfig } from '@/lib/sourceData';
import { cleanClinicName, cleanClinicDescription } from '@/lib/copyCleaner';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import GalleryClient from '../GalleryClient';
import { 
  Building, Compass, Layers, ShieldCheck, HardHat, 
  CheckCircle2, Ruler, ArrowRight, Phone 
} from 'lucide-react';

interface PageProps {
  params?: any;
}

export default async function Template5GalleryPage({ params }: PageProps) {
  const slug = ''; // standalone: slug not needed for data loading
  const data = await readSourceConfig(undefined, 'template5');

  if (!data || !data.clinic) {
    notFound();
  }

  const clinicName = cleanClinicName(data.clinic.name);
  const clinicTagline = data.clinic.tagline || 'Integrated Architectural Design, Turnkey Residential Construction & Luxury Interiors';
  const clinicPhone = data.clinic.contact?.phone || '+91 81100 00384';

  const media = data.media || {};
  const basePath = ``;

  return (
    <div className="w-full bg-[#F4F3EE] text-[#252A29]">
      {/* ─── Hero Banner Section ─── */}
      <section id="gallery-hero" className="relative py-20 sm:py-28 bg-[#FFFFFF] border-b-4 border-[#252A29]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#E94B26] text-[#F4F3EE] text-xs font-mono font-bold uppercase tracking-[0.2em] border border-[#111111] shadow-[2px_2px_0px_#111111]">
              <Layers className="w-3.5 h-3.5" />
              <span>PROJECT BLUEPRINTS & SITE SHOWCASE</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-black uppercase text-[#252A29] tracking-tight leading-[0.95]">
              OUR COMPLETED <span className="text-[#E94B26]">RESIDENTIAL & CIVIL</span> WORKS
            </h1>
            <p className="text-sm sm:text-base font-bold uppercase tracking-wider text-[#C8A84E]">
              {clinicName} &bull; {clinicTagline}
            </p>
          </div>
        </div>
      </section>

      {/* ─── Interactive Gallery Portfolio ─── */}
      <section className="py-24 px-4 sm:px-8 bg-[#F4F3EE] border-b-4 border-[#252A29]">
        <div className="max-w-7xl mx-auto">
          <GalleryClient images={media} />
        </div>
      </section>

      {/* ─── Bottom CTA Banner ─── */}
      <section className="py-20 px-4 sm:px-8 bg-[#FFFFFF]">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-block px-3.5 py-1 bg-[#252A29] text-[#C8A84E] text-xs font-mono font-bold uppercase tracking-[0.25em] border border-[#111111]">
            TURNKEY QUALITY
          </div>
          <h3 className="text-3xl sm:text-5xl font-black uppercase text-[#252A29] tracking-tight">
            COMMISSION YOUR BESPOKE RESIDENCE
          </h3>
          <p className="text-xs sm:text-sm text-[#252A29]/75 font-sans max-w-xl mx-auto leading-relaxed">
            Schedule an on-site structural consultation and 3D architectural review with our engineering leadership.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href={`${basePath}#cost-calculator`}
              className="px-8 py-4 bg-[#E94B26] text-[#F4F3EE] font-black text-xs uppercase tracking-widest border-2 border-[#111111] shadow-[4px_4px_0px_#111111] hover:shadow-[1px_1px_0px_#111111] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
            >
              CALCULATE ESTIMATE
            </Link>

            <Link
              href={`${basePath}/contact`}
              className="px-8 py-4 bg-[#252A29] text-[#F4F3EE] font-black text-xs uppercase tracking-widest border-2 border-[#111111] shadow-[4px_4px_0px_#111111] hover:bg-[#111111] hover:shadow-[1px_1px_0px_#111111] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
            >
              SCHEDULE SITE SURVEY
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
