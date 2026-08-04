import { readSourceConfig } from '@/lib/dataBuilder';
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

export default async function Template1Gallery({ params }: PageProps) {
  const { slug } = await params;
  const basePath = `/designwebsite/template1/${slug}`;

  const data = await readSourceConfig(slug, 'template1');
  if (!data) return notFound();

  const { clinic, media } = data;
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
  const cats = ['Residential', 'Kitchens & Storage', 'Commercial & Detail'];
  const items: GalleryItem[] = sourceImages.slice(0, 24).map((img, idx) => ({
    img,
    title: `Project Space ${String(idx + 1).padStart(2, '0')}`,
    cat: cats[idx % cats.length],
  }));

  return (
    <div>
      {/* PAGE HERO */}
      <section id="gallery-hero" className="bg-[#211a13] text-white px-6 lg:px-7 py-[clamp(70px,8vw,110px)]">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <span className="flex items-center gap-3.5 text-[12px] tracking-[0.38em] uppercase text-[#c9ab7c] mb-5 before:content-[''] before:w-10 before:h-px before:bg-[#c9ab7c]">
              Selected work
            </span>
            <h1 className="font-[family-name:var(--font-marcellus)] text-[clamp(38px,5vw,68px)] leading-[1.08] max-w-[760px]">
              The {cleanName || 'studio'} <em className="not-italic italic font-light text-[#c9ab7c]">portfolio</em>
            </h1>
            <p className="mt-6 max-w-[560px] text-[16.5px] font-light leading-[1.75] text-white/75">
              {cleanDesc || `A selection of homes and spaces designed and built across ${city}. Every photograph is a real project.`}
            </p>
          </Reveal>
        </div>
      </section>

      {/* GRID */}
      <section id="gallery-grid" className="py-[clamp(64px,7vw,100px)] px-6 lg:px-7">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <GalleryGrid items={items} />
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section id="gallery-cta" className="bg-[#fdfbf6] border-t border-[#211a13]/10 px-6 lg:px-7 py-[clamp(64px,7vw,100px)]">
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <h2 className="font-[family-name:var(--font-marcellus)] text-[clamp(30px,3.8vw,50px)] leading-[1.12] mb-6">
              Picture your home <em className="not-italic italic font-light text-[#a58150]">on this page</em>
            </h2>
            <p className="text-[#7d7264] font-light leading-[1.8] mb-9">
              Every project here began with one free consultation. Yours can too.
            </p>
            <Link
              href={`${basePath}/contact`}
              className="inline-flex items-center gap-3 bg-[#211a13] text-white px-8 py-4 text-[12.5px] tracking-[0.2em] uppercase font-medium border border-[#211a13] hover:bg-[#a58150] hover:border-[#a58150] transition-colors duration-300"
            >
              Start Your Project
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
