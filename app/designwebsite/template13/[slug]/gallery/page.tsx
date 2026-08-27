import { readSourceConfig } from '@/lib/dataBuilder';
import { previewMedia } from '@/lib/architectureContent';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Check, ArrowRight, Clock, ShieldCheck } from 'lucide-react';
import { cleanClinicName, cleanArchitectureDescription } from '@/lib/copyCleaner';
import Reveal from '../Reveal';
import PageNarrative from '../PageNarrative';
import BeforeAfter from '../BeforeAfter';
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
  '/images/architecture/living-room-double-height.webp',
  '/images/architecture/terrace-cool-roof.webp',
];

const CASE_STUDIES = [
  {
    title: 'Modern Beachfront Villa',
    specs: '5,400 sq.ft · 4-BHK Luxury Villa · 12 Months',
    desc: 'Engineered with marine-grade steel, shaded open balconies, large glass sliding doors, and a swimming pool.',
    img: '/images/architecture/civic-landmark-facade.webp',
  },
  {
    title: 'Traditional Open Courtyard Home',
    specs: '6,800 sq.ft · Independent House · 14 Months',
    desc: 'Built around an open-to-sky central courtyard with natural cross ventilation, heat-insulating brick walls, and 100% Vaastu alignment.',
    img: '/images/architecture/courtyard-water-residence.webp',
  },
];

export default async function Template13Gallery({ params }: PageProps) {
  const { slug } = await params;
  const basePath = `/designwebsite/template13/${slug}`;

  const data = await readSourceConfig(slug, 'template13');
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
  const cats = ['Residential Villas', 'Courtyard & Facade', 'Structural & Interiors'];
  const items: GalleryItem[] = sourceImages.slice(0, 24).map((img, idx) => ({
    img,
    title: `Project Residence ${String(idx + 1).padStart(2, '0')}`,
    cat: cats[idx % cats.length],
    sub: `${city} · Designed by ${cleanName || 'our studio'}`,
  }));

  const baImage =
    media.treatmentImages?.[0] ||
    media.clinicImages?.[0] ||
    '/images/architecture/civic-landmark-facade.webp';

  return (
    <div>
      {/* HERO */}
      <section id="gallery-hero" className="px-7 py-[clamp(56px,7vw,88px)] bg-[#fbf7f2]">
        <div className="max-w-[1220px] mx-auto">
          <Reveal>
            <div className="flex items-center gap-2.5 text-[12px] font-extrabold tracking-[0.22em] uppercase text-[#d8442c] before:content-[''] before:w-6 before:h-[2.5px] before:rounded before:bg-[#d8442c]">
              Real Homes, Real {city}
            </div>
            <h1 className="text-[clamp(32px,4.6vw,54px)] font-extrabold mt-3.5 tracking-[-0.02em] max-w-[780px] leading-[1.12]">
              Delivered residences by{' '}
              <span className="font-[family-name:var(--font-newsreader)] italic font-medium text-[#d8442c]">
                {cleanName || 'our studio'}
              </span>
            </h1>
            <p className="mt-4.5 max-w-[640px] text-[#6d6259] text-[16px]">
              {cleanDesc || `Browse our delivered projects across ${city} — every photograph is a real home built with factory precision.`}
            </p>
          </Reveal>
        </div>
      </section>

      {/* FEATURED CASE STUDIES */}
      <section className="px-7 py-[clamp(56px,7vw,88px)] bg-white border-b border-[#241f1a]/10">
        <div className="max-w-[1220px] mx-auto">
          <Reveal className="mb-11">
            <div className="flex items-center gap-2.5 text-[12px] font-extrabold tracking-[0.22em] uppercase text-[#d8442c] before:content-[''] before:w-6 before:h-[2.5px] before:rounded before:bg-[#d8442c]">
              Project Spotlights
            </div>
            <h2 className="text-[clamp(26px,3.6vw,42px)] font-extrabold mt-3.5 tracking-[-0.02em]">
              Signature transformations in {city}
            </h2>
          </Reveal>

          <div className="grid lg:grid-cols-2 gap-8">
            {CASE_STUDIES.map((study, idx) => (
              <Reveal key={study.title} delay={idx * 80}>
                <div className="bg-[#fbf7f2] border border-[#241f1a]/10 rounded-2xl overflow-hidden flex flex-col justify-between h-full">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img src={study.img} alt={study.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-7">
                    <span className="text-[11.5px] font-extrabold tracking-wider uppercase text-[#d8442c] block mb-2">
                      {study.specs}
                    </span>
                    <h3 className="text-[22px] font-extrabold text-[#1d1713] mb-2">{study.title}</h3>
                    <p className="text-[14px] text-[#6d6259] font-medium leading-[1.65] mb-5">{study.desc}</p>
                    <Link
                      href={`${basePath}/contact`}
                      className="inline-flex items-center gap-2 text-[12.5px] font-extrabold uppercase tracking-wider text-[#d8442c] border-b-2 border-[#d8442c] pb-0.5"
                    >
                      Get quote for similar home <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* BEFORE / AFTER */}
      <section id="transformations" className="px-7 py-[clamp(56px,7vw,88px)] bg-[#fbf7f2]">
        <div className="max-w-[1220px] mx-auto grid lg:grid-cols-2 gap-11 lg:gap-14 items-center">
          <Reveal>
            <BeforeAfter image={baImage} caption="Drag slider to compare raw structural frame vs completed residence" />
          </Reveal>
          <Reveal delay={120}>
            <div className="flex items-center gap-2.5 text-[12px] font-extrabold tracking-[0.22em] uppercase text-[#d8442c] before:content-[''] before:w-6 before:h-[2.5px] before:rounded before:bg-[#d8442c]">
              Interactive Preview
            </div>
            <h2 className="text-[clamp(26px,3.4vw,40px)] font-extrabold mt-3.5 mb-4 tracking-[-0.02em]">
              The power of good finishing
            </h2>
            <p className="text-[#6d6259] text-[15.5px] leading-relaxed mb-6">
              Notice how precise structural lines, natural light, and tailored storage eliminate dead corners and make residences feel 30% larger.
            </p>
            <div className="grid grid-cols-2 gap-3 mb-7">
              {['10-Year Warranty', 'Fe550D TMT Steel', 'Grade-53 Concrete', 'Milestone Handover'].map((b) => (
                <div key={b} className="flex gap-2 items-center text-[13px] font-bold text-[#1d1713]">
                  <Check className="w-4 h-4 text-[#d8442c]" strokeWidth={2.4} />
                  <span>{b}</span>
                </div>
              ))}
            </div>
            <Link
              href={`${basePath}/contact`}
              className="inline-flex items-center gap-2 bg-[#d8442c] text-white font-extrabold text-[14px] px-7 py-3.5 rounded-xl hover:bg-[#b93320] transition-colors"
            >
              Start your residential project
            </Link>
          </Reveal>
        </div>
      </section>

      {/* GRID */}
      <section id="gallery-grid" className="px-7 py-[clamp(56px,7vw,88px)] bg-white border-t border-[#241f1a]/10">
        <div className="max-w-[1220px] mx-auto">
          <Reveal className="mb-10 text-center max-w-xl mx-auto">
            <div className="inline-flex items-center gap-2.5 text-[12px] font-extrabold tracking-[0.22em] uppercase text-[#d8442c] mb-3 before:content-[''] before:w-6 before:h-[2.5px] before:rounded before:bg-[#d8442c] after:content-[''] after:w-6 after:h-[2.5px] after:rounded after:bg-[#d8442c]">
              Gallery Archive
            </div>
            <h2 className="text-[clamp(28px,3.8vw,46px)] font-extrabold tracking-[-0.02em]">
              Explore by room space
            </h2>
          </Reveal>

          <Reveal>
            <GalleryGrid items={items} />
          </Reveal>
        </div>
      </section>

      <PageNarrative page="gallery" studioName={cleanName} city={city} />

      {/* CTA */}
      <section className="px-7 py-[clamp(56px,7vw,88px)] bg-[#1d1713] text-white text-center">
        <Reveal className="max-w-[720px] mx-auto">
          <h2 className="text-[clamp(28px,3.8vw,44px)] font-extrabold mb-4">
            Picture your home in our gallery
          </h2>
          <p className="text-white/80 text-[16px] mb-8">
            Every home here began with one design consultation. Let&rsquo;s start yours today.
          </p>
          <Link
            href={`${basePath}/contact`}
            className="inline-flex items-center gap-2 bg-[#d8442c] text-white font-extrabold text-[15px] px-8 py-4 rounded-xl hover:bg-[#b93320] transition-colors"
          >
            Book Free Consultation
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
