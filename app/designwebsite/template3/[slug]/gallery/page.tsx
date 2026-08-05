import { readSourceConfig } from '@/lib/dataBuilder';
import { previewMedia } from '@/lib/interiorContent';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { cleanClinicName, cleanClinicDescription } from '@/lib/copyCleaner';
import Reveal from '../Reveal';
import BeforeAfter from '../BeforeAfter';
import GalleryGrid, { GalleryItem } from './GalleryGrid';

type PageProps = { params: Promise<{ slug: string }> };

const GALLERY_FALLBACK = [
  '/images/stock/68b39046.webp',
  '/images/stock/a0e0726f.webp',
  '/images/stock/dc1759ad.webp',
  '/images/stock/f23e9dc6.webp',
  '/images/stock/615f9d34.webp',
  '/images/stock/6dcb103c.webp',
  '/images/stock/a151a9e5.webp',
  '/images/stock/bf333360.webp',
  '/images/stock/84fea9c5.webp',
];

export default async function Template3Gallery({ params }: PageProps) {
  const { slug } = await params;
  const basePath = `/designwebsite/template3/${slug}`;

  const data = await readSourceConfig(slug, 'template3');
  if (!data) return notFound();

  const { clinic } = data;

  const media = previewMedia(data.media);
  const cleanName = cleanClinicName(clinic.name);
  const cleanDesc = cleanClinicDescription(clinic.description, clinic.name);
  const city = clinic.address?.city || 'Chennai';

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
  const cats = ['Living Spaces', 'Kitchens', 'Bedrooms & More'];
  const items: GalleryItem[] = sourceImages.slice(0, 24).map((img, idx) => ({
    img,
    title: `Project ${String(idx + 1).padStart(2, '0')}`,
    cat: cats[idx % cats.length],
    sub: `${city} · Designed by ${cleanName || 'our studio'}`,
  }));

  const baImage =
    media.treatmentImages?.[0] ||
    media.clinicImages?.[0] ||
    '/images/stock/284d6d29.webp';

  return (
    <div>
      {/* HERO */}
      <section id="gallery-hero" className="px-7 py-[clamp(56px,7vw,88px)]">
        <div className="max-w-[1220px] mx-auto">
          <Reveal>
            <div className="flex items-center gap-2.5 text-[12px] font-extrabold tracking-[0.22em] uppercase text-[#d8442c] before:content-[''] before:w-6 before:h-[2.5px] before:rounded before:bg-[#d8442c]">
              Real homes, real {city}
            </div>
            <h1 className="text-[clamp(32px,4.6vw,54px)] font-extrabold mt-3.5 tracking-[-0.02em] max-w-[780px] leading-[1.12]">
              Projects by{' '}
              <span className="font-[family-name:var(--font-newsreader)] italic font-medium text-[#d8442c]">
                {cleanName || 'our studio'}
              </span>
            </h1>
            <p className="mt-4.5 max-w-[640px] text-[#6d6259] text-[16px]">
              {cleanDesc || 'Browse our delivered projects — every photograph is a real home.'}
            </p>
          </Reveal>
        </div>
      </section>

      {/* GRID */}
      <section id="gallery-grid" className="px-7 py-[clamp(40px,5vw,64px)] bg-white">
        <div className="max-w-[1220px] mx-auto">
          <Reveal>
            <GalleryGrid items={items} />
          </Reveal>
        </div>
      </section>

      {/* BEFORE / AFTER */}
      <section id="transformations" className="px-7 py-[clamp(56px,7vw,88px)]">
        <div className="max-w-[1220px] mx-auto grid lg:grid-cols-2 gap-11 lg:gap-14 items-center">
          <Reveal>
            <BeforeAfter image={baImage} caption="Drag to compare — see how finishing transforms a space" />
          </Reveal>
          <Reveal delay={120}>
            <div className="flex items-center gap-2.5 text-[12px] font-extrabold tracking-[0.22em] uppercase text-[#d8442c] before:content-[''] before:w-6 before:h-[2.5px] before:rounded before:bg-[#d8442c]">
              Transformations that tell a story
            </div>
            <h2 className="text-[clamp(26px,3.6vw,42px)] font-extrabold mt-3.5 mb-3 tracking-[-0.02em]">
              Same walls.{' '}
              <span className="font-[family-name:var(--font-newsreader)] italic font-medium text-[#d8442c]">New life.</span>
            </h2>
            <p className="text-[#6d6259] text-[15.5px] mb-6 max-w-[560px]">
              Our renovation work covers everything — repair, electrical, surfaces and fresh interiors — while you carry on with life.
            </p>
            <ul className="list-none grid gap-4 mb-7">
              {[
                'Site repair and prep included in scope, not extra',
                'Dust-controlled work with daily clean-up',
                'Phased room-by-room option so you can stay put',
                'Clear weekly progress updates with photos',
              ].map((li) => (
                <li key={li} className="flex gap-3.5 text-[15px] font-semibold">
                  <Check className="w-5 h-5 text-[#d8442c] shrink-0 mt-0.5" strokeWidth={2.4} />
                  {li}
                </li>
              ))}
            </ul>
            <Link
              href={`${basePath}/contact`}
              className="inline-flex items-center justify-center bg-[#d8442c] text-white font-extrabold text-[15px] px-7 py-3.5 rounded-xl hover:bg-[#b93320] hover:-translate-y-0.5 hover:shadow-[0_12px_26px_rgba(216,68,44,0.3)] transition-all duration-250"
            >
              Get My Renovation Plan
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
