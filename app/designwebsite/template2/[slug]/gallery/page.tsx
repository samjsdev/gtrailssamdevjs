import { readSourceConfig } from '@/lib/dataBuilder';
import { previewMedia } from '@/lib/interiorContent';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { cleanClinicName, cleanClinicDescription } from '@/lib/copyCleaner';
import Reveal from '../Reveal';
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

export default async function Template2Gallery({ params }: PageProps) {
  const { slug } = await params;
  const basePath = `/designwebsite/template2/${slug}`;

  const data = await readSourceConfig(slug, 'template2');
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
  const cats = ['Living Spaces', 'Kitchens & Storage', 'Bedrooms & More'];
  const items: GalleryItem[] = sourceImages.slice(0, 24).map((img, idx) => ({
    img,
    title: `Design ${String(idx + 1).padStart(2, '0')}`,
    cat: cats[idx % cats.length],
  }));

  return (
    <div>
      {/* PAGE HERO */}
      <section id="gallery-hero" className="bg-[#faf7f1] px-6 py-[clamp(60px,7vw,96px)]">
        <div className="max-w-[1240px] mx-auto text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2.5 bg-white border border-[#1b1b1b]/10 rounded-full px-4.5 py-2 text-[12px] font-bold tracking-[0.14em] uppercase text-[#0e5a43] mb-6 before:content-[''] before:w-2 before:h-2 before:rounded-full before:bg-[#f2a007]">
              Design gallery
            </span>
            <h1 className="font-[family-name:var(--font-bricolage)] font-bold text-[clamp(34px,4.6vw,58px)] leading-[1.06] tracking-[-0.02em] max-w-[760px] mx-auto">
              Real designs from <mark className="bg-[linear-gradient(transparent_62%,#fdeecb_62%)] text-[#0e5a43] px-0.5">{cleanName || 'our studio'}</mark>
            </h1>
            <p className="mt-5 max-w-[560px] mx-auto text-[#6b6660] text-[16.5px] leading-[1.7] font-medium">
              {cleanDesc || `Browse spaces we've designed across ${city} — then imagine yours.`}
            </p>
          </Reveal>
        </div>
      </section>

      {/* GRID */}
      <section id="gallery-grid" className="px-6 py-[clamp(56px,6vw,88px)] bg-white">
        <div className="max-w-[1240px] mx-auto">
          <Reveal>
            <GalleryGrid items={items} />
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section id="gallery-cta" className="px-6 py-[clamp(64px,7vw,96px)] bg-[#0e5a43] text-white">
        <Reveal className="max-w-[760px] mx-auto text-center">
          <h2 className="font-[family-name:var(--font-bricolage)] font-bold text-[clamp(28px,3.8vw,48px)] leading-[1.08] tracking-[-0.02em] mb-4">
            Want this for your home? <mark className="bg-transparent text-[#f2a007]">Let&rsquo;s talk.</mark>
          </h2>
          <p className="text-white/80 font-medium text-[16px] leading-[1.7] mb-8">
            Every project in this gallery began with a design consultation.
          </p>
          <Link
            href={`${basePath}/contact`}
            className="inline-flex items-center justify-center gap-2 bg-[#f2a007] text-[#1b1b1b] font-bold text-[15px] px-9 py-4.5 rounded-[14px] hover:bg-[#e09500] hover:-translate-y-0.5 hover:shadow-[0_14px_28px_rgba(242,160,7,0.35)] transition-all duration-300"
          >
            Book Consultation
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
