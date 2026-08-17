import { readSourceConfig } from '@/lib/dataBuilder';
import { previewMedia } from '@/lib/interiorContent';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { cleanClinicName, cleanClinicDescription } from '@/lib/copyCleaner';
import { ArrowRight, Clock, ShieldCheck } from 'lucide-react';
import Reveal from '../Reveal';
import PageNarrative from '../PageNarrative';
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
  'Modular Kitchen Suite',
  'Master Bedroom Retreat',
  'Dining & Glass Bar Niche',
  'Private Study Corner',
  'Walk-in Wardrobe Suite',
  'Foyer & Shoe Alcove',
  'Kids Creative Room',
  'Balcony Garden Nook',
];

const CURATED_STUDIES = [
  {
    title: 'The Contemporary Family Penthouse',
    specs: '3BHK Penthouse · 2,400 sq.ft',
    desc: 'Lyrical luxury palette with fluted oak wood panelling, concealed bar unit, bookmatched marble TV wall, and ambient cove lighting.',
    img: '/images/stock/a151a9e5.webp',
  },
  {
    title: 'The Modern Zen Villa Residence',
    specs: '4BHK Villa · 3,100 sq.ft',
    desc: 'Quiet architectural lines with natural smoked veneer woodwork, quartz island kitchen, and biophilic internal courtyard integration.',
    img: '/images/stock/bf333360.webp',
  },
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
              Living Portfolio
            </div>
            <h1 className="font-[family-name:var(--font-cormorant)] text-[clamp(36px,4.8vw,60px)] font-light leading-[1.08] mt-4 mb-3.5 max-w-[780px]">
              Residences by <em className="italic text-[#a4532f]">{cleanName || 'our studio'}</em>
            </h1>
            <p className="text-[#7a6f60] text-[16px] font-light max-w-[640px]">
              {cleanDesc || `Every photograph represents a genuine, delivered private home in ${city} — browse rooms we have designed, crafted, and styled.`}
            </p>
          </Reveal>
        </div>
      </section>

      {/* CURATED RESIDENCES */}
      <section className="py-20 bg-[#fbf8f1] border-b border-[#221c14]/12">
        <div className="max-w-[1240px] mx-auto px-[30px]">
          <Reveal className="mb-12">
            <div className="flex items-center gap-3 text-[11.5px] font-semibold tracking-[0.3em] uppercase text-[#a4532f] before:content-[''] before:w-8 before:h-px before:bg-[#a4532f]">
              Featured Residences
            </div>
            <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(30px,4vw,48px)] font-semibold leading-[1.08] mt-3">
              Spatial case studies in {city}
            </h2>
          </Reveal>

          <div className="grid lg:grid-cols-2 gap-8">
            {CURATED_STUDIES.map((study, idx) => (
              <Reveal key={study.title} delay={idx * 80}>
                <div className="bg-white border border-[#221c14]/12 overflow-hidden flex flex-col justify-between h-full shadow-[0_12px_28px_rgba(23,19,15,0.04)]">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img src={study.img} alt={study.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-8">
                    <span className="text-[11px] font-semibold tracking-widest uppercase text-[#a4532f] block mb-2">
                      {study.specs}
                    </span>
                    <h3 className="font-[family-name:var(--font-cormorant)] text-[24px] font-semibold text-[#17130f] mb-3">
                      {study.title}
                    </h3>
                    <p className="text-[14px] text-[#7a6f60] font-light leading-[1.7] mb-6">{study.desc}</p>
                    <Link
                      href={`${basePath}/contact`}
                      className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-widest uppercase text-[#a4532f] border-b border-[#a4532f] pb-0.5"
                    >
                      Enquire for your floor plan <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* GRID */}
      <section className="py-24">
        <div className="max-w-[1240px] mx-auto px-[30px]">
          <Reveal className="mb-10 text-center max-w-xl mx-auto">
            <div className="inline-flex items-center gap-3 text-[11.5px] font-semibold tracking-[0.3em] uppercase text-[#a4532f] before:content-[''] before:w-8 before:h-px before:bg-[#a4532f] after:content-[''] after:w-8 after:h-px after:bg-[#a4532f]">
              Room Archive
            </div>
            <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(30px,4vw,48px)] font-semibold leading-[1.08] mt-3">
              Explore spaces by room type
            </h2>
          </Reveal>

          <Reveal>
            <GalleryGrid items={items} />
          </Reveal>
        </div>
      </section>

      <PageNarrative page="gallery" studioName={cleanName} city={city} />

      {/* CTA */}
      <section className="pb-24">
        <div className="max-w-[1240px] mx-auto px-[30px]">
          <Reveal>
            <div className="bg-[#17130f] text-white px-8 py-16 sm:px-14 text-center">
              <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(28px,3.8vw,46px)] font-light leading-[1.12] mb-4">
                Your home could be <em className="italic text-[#d9c49a]">next</em>
              </h2>
              <p className="text-white/75 text-[16px] font-light max-w-[500px] mx-auto mb-8">
                Sit with our principal architect to begin planning your private residence.
              </p>
              <Link
                href={`${basePath}/contact`}
                className="inline-flex items-center gap-2.5 bg-[#a4532f] text-white text-[12.5px] font-semibold tracking-[0.18em] uppercase px-8 py-4 hover:bg-[#854021] transition-colors"
              >
                Request Studio Appointment
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
