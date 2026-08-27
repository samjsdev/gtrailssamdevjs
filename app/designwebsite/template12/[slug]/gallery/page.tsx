import { readSourceConfig } from '@/lib/dataBuilder';
import { previewMedia } from '@/lib/architectureContent';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { cleanClinicName, cleanArchitectureDescription } from '@/lib/copyCleaner';
import { Clock, Check, ArrowRight, Home } from 'lucide-react';
import Reveal from '../Reveal';
import PageNarrative from '../PageNarrative';
import GalleryGrid, { GalleryItem } from './GalleryGrid';

type PageProps = { params: Promise<{ slug: string }> };

const GALLERY_FALLBACK = [
  '/images/architecture/hero-villa-twilight.webp',
  '/images/architecture/modern-villa-duplex.webp',
  '/images/architecture/civic-landmark-facade.webp',
  '/images/architecture/courtyard-water-residence.webp',
  '/images/architecture/porotherm-clay-facade.webp',
  '/images/architecture/monolithic-brutalist-facade.webp',
  '/images/architecture/villa-after-finished.webp',
  '/images/architecture/structural-construction-frame.webp',
  '/images/architecture/terrace-cool-roof.webp',
];

const PROJECT_SPOTLIGHTS = [
  {
    title: 'Modern Luxury Villa',
    specs: '4-BHK Individual Villa · 5,200 sq.ft',
    timeline: '11 Months',
    desc: 'Spacious independent villa with private swimming pool, double-height living room, and floor-to-ceiling glass sliding doors.',
    img: '/images/architecture/civic-landmark-facade.webp',
  },
  {
    title: 'Traditional Courtyard Home',
    specs: 'Independent House · 6,400 sq.ft',
    timeline: '14 Months',
    desc: 'Traditional open-to-sky courtyard with natural cross ventilation, heat-insulating brick masonry, and 100% Vaastu alignment.',
    img: '/images/architecture/courtyard-water-residence.webp',
  },
];

export default async function Template12Gallery({ params }: PageProps) {
  const { slug } = await params;
  const basePath = `/designwebsite/template12/${slug}`;

  const data = await readSourceConfig(slug, 'template12');
  if (!data) return notFound();

  const { clinic } = data;

  const media = previewMedia(data.media);
  const cleanName = cleanClinicName(clinic.name);
  const city = clinic.address?.city || 'Chennai';
  const cleanDesc = cleanArchitectureDescription(clinic.description, clinic.name, city);

  const uniqueImages = Array.from(
    new Set(
      [
        ...(media.clinicImages || []),
        ...(media.treatmentImages || []),
        ...(media.otherImages || []),
      ].filter(Boolean)
    )
  ) as string[];

  const sourceImages = uniqueImages.length > 0 ? uniqueImages : GALLERY_FALLBACK;
  const cats = ['Residential Villas', 'Courtyard & Facade', 'Construction Stages'];
  const items: GalleryItem[] = sourceImages.slice(0, 24).map((img, idx) => ({
    img,
    title: `Delivered Home ${String(idx + 1).padStart(2, '0')}`,
    cat: cats[idx % cats.length],
  }));

  return (
    <div>
      {/* PAGE HERO */}
      <section id="gallery-hero" className="bg-[#faf7f1] px-6 py-[clamp(60px,7vw,96px)]">
        <div className="max-w-[1240px] mx-auto text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2.5 bg-white border border-[#1b1b1b]/10 rounded-full px-4.5 py-2 text-[12px] font-bold tracking-[0.14em] uppercase text-[#0e5a43] mb-6 before:content-[''] before:w-2 before:h-2 before:rounded-full before:bg-[#f2a007]">
              Design Gallery
            </span>
            <h1 className="font-[family-name:var(--font-bricolage)] font-bold text-[clamp(34px,4.6vw,58px)] leading-[1.06] tracking-[-0.02em] max-w-[780px] mx-auto">
              Real delivered homes by <mark className="bg-[linear-gradient(transparent_62%,#fdeecb_62%)] text-[#0e5a43] px-0.5">{cleanName || 'our practice'}</mark>
            </h1>
            <p className="mt-5 max-w-[580px] mx-auto text-[#6b6660] text-[16.5px] leading-[1.7] font-medium">
              {cleanDesc || `Browse real residences designed and delivered across ${city}. High-precision engineering, climate-responsive design, and honest quality in every build.`}
            </p>
          </Reveal>
        </div>
      </section>

      {/* FEATURED ROOM SPOTLIGHTS */}
      <section className="px-6 py-[clamp(72px,8vw,110px)] bg-white border-b border-[#1b1b1b]/10">
        <div className="max-w-[1240px] mx-auto">
          <Reveal className="mb-12">
            <span className="inline-flex items-center gap-2.5 text-[12px] font-extrabold tracking-[0.28em] uppercase text-[#0e5a43] mb-3 before:content-[''] before:w-7 before:h-[2.5px] before:rounded-full before:bg-[#f2a007]">
              Featured Transformations
            </span>
            <h2 className="font-[family-name:var(--font-bricolage)] font-bold text-[clamp(28px,3.8vw,46px)] leading-[1.08] tracking-[-0.02em]">
              Inside delivered projects across {city}
            </h2>
          </Reveal>

          <div className="grid lg:grid-cols-2 gap-8">
            {PROJECT_SPOTLIGHTS.map((spot, idx) => (
              <Reveal key={spot.title} delay={idx * 90}>
                <div className="bg-[#faf7f1] border border-[#1b1b1b]/10 rounded-[24px] overflow-hidden flex flex-col justify-between h-full shadow-[0_12px_30px_rgba(27,27,27,0.04)]">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img src={spot.img} alt={spot.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-7 sm:p-8">
                    <div className="flex flex-wrap gap-3 text-[12px] font-extrabold uppercase text-[#0e5a43] tracking-wider mb-2.5">
                      <span>{spot.specs}</span>
                      <span>·</span>
                      <span className="text-[#f2a007]">{spot.timeline} Handover</span>
                    </div>
                    <h3 className="font-[family-name:var(--font-bricolage)] font-bold text-[22px] text-[#1b1b1b] mb-3">
                      {spot.title}
                    </h3>
                    <p className="text-[14px] text-[#6b6660] font-medium leading-[1.7] mb-6">
                      {spot.desc}
                    </p>
                    <Link
                      href={`${basePath}/contact`}
                      className="inline-flex items-center gap-2 font-bold text-[13.5px] text-[#0e5a43] border-b-[2px] border-[#f2a007] pb-0.5 hover:gap-3 transition-all"
                    >
                      Enquire for your home <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* GRID */}
      <section id="gallery-grid" className="px-6 py-[clamp(72px,8vw,110px)] bg-[#faf7f1]">
        <div className="max-w-[1240px] mx-auto">
          <Reveal className="mb-10 text-center max-w-xl mx-auto">
            <span className="inline-flex items-center gap-2.5 text-[12px] font-extrabold tracking-[0.28em] uppercase text-[#0e5a43] mb-3 before:content-[''] before:w-7 before:h-[2.5px] before:rounded-full before:bg-[#f2a007] after:content-[''] after:w-7 after:h-[2.5px] after:rounded-full after:bg-[#f2a007]">
              Gallery Archive
            </span>
            <h2 className="font-[family-name:var(--font-bricolage)] font-bold text-[clamp(28px,3.8vw,46px)] leading-[1.08] tracking-[-0.02em]">
              Browse delivered spaces
            </h2>
          </Reveal>

          <Reveal>
            <GalleryGrid items={items} />
          </Reveal>
        </div>
      </section>

      <PageNarrative page="gallery" studioName={cleanName} city={city} />

      {/* CTA */}
      <section id="gallery-cta" className="px-6 py-[clamp(64px,7vw,96px)] bg-[#0e5a43] text-white">
        <Reveal className="max-w-[760px] mx-auto text-center">
          <h2 className="font-[family-name:var(--font-bricolage)] font-bold text-[clamp(28px,3.8vw,48px)] leading-[1.08] tracking-[-0.02em] mb-4">
            Want this for your home? <mark className="bg-transparent text-[#f2a007]">Let&rsquo;s talk.</mark>
          </h2>
          <p className="text-white/80 font-medium text-[16px] leading-[1.7] mb-8">
            Every project in this gallery began with a free 45-minute design consultation.
          </p>
          <Link
            href={`${basePath}/contact`}
            className="inline-flex items-center justify-center gap-2 bg-[#f2a007] text-[#1b1b1b] font-bold text-[15px] px-9 py-4.5 rounded-[14px] hover:bg-[#e09500] hover:-translate-y-0.5 hover:shadow-[0_14px_28px_rgba(242,160,7,0.35)] transition-all duration-300"
          >
            Book Free Consultation
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
