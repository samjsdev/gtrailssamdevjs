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

const ROOM_NAMES = [
  'Layered Living Room',
  'Modular Kitchen',
  'Bedroom Retreat',
  'Dining & Crockery',
  'Study Corner',
  'Wardrobe Suite',
  'Foyer & Entry',
  'Kids Room',
  'Balcony Nook',
];

export default async function Template4Gallery({ params }: PageProps) {
  const { slug } = await params;
  const basePath = `/designwebsite/template4/${slug}`;

  const data = await readSourceConfig(slug, 'template4');
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
  const items: GalleryItem[] = sourceImages.slice(0, 24).map((img, idx) => ({
    img,
    title: ROOM_NAMES[idx % ROOM_NAMES.length],
    sub: `${city} · By ${cleanName || 'our studio'}`,
  }));

  return (
    <div>
      {/* HERO */}
      <section className="py-[clamp(64px,7vw,96px)]">
        <div className="max-w-[1240px] mx-auto px-[30px]">
          <Reveal>
            <div className="flex items-center gap-3 text-[11.5px] font-semibold tracking-[0.3em] uppercase text-[#a4532f] before:content-[''] before:w-8 before:h-px before:bg-[#a4532f]">
              Real homes, real families
            </div>
            <h1 className="font-[family-name:var(--font-cormorant)] text-[clamp(34px,4.6vw,56px)] font-semibold leading-[1.12] mt-4 mb-3.5 max-w-[760px]">
              Homes by <em className="italic text-[#a4532f]">{cleanName || 'our studio'}</em>
            </h1>
            <p className="text-[#7a6f60] text-[16px] font-light max-w-[620px]">
              {cleanDesc || 'Every photograph is a real, delivered home — browse rooms we have designed, built and styled.'}
            </p>
          </Reveal>
        </div>
      </section>

      {/* GRID */}
      <section className="pb-[clamp(48px,6vw,80px)]">
        <div className="max-w-[1240px] mx-auto px-[30px]">
          <Reveal>
            <GalleryGrid items={items} />
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24">
        <div className="max-w-[1240px] mx-auto px-[30px]">
          <Reveal>
            <div className="bg-[#17130f] text-white px-8 py-14 sm:px-14 text-center">
              <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(28px,3.6vw,44px)] font-semibold leading-[1.12] mb-4">
                Your home could be <em className="italic text-[#d9c49a]">next</em>
              </h2>
              <p className="text-white/75 text-[15px] font-light mb-8 max-w-[520px] mx-auto">
                A free consultation is all it takes to see your floor plan transformed in 3D — before a single nail goes in.
              </p>
              <Link
                href={`${basePath}/contact`}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 text-[13px] font-semibold tracking-[0.14em] uppercase bg-[#b08d4f] text-[#17130f] hover:bg-[#c5a266] hover:-translate-y-0.5 hover:shadow-[0_14px_28px_rgba(176,141,79,0.3)] transition-all duration-300"
              >
                Book a Private Consultation
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
