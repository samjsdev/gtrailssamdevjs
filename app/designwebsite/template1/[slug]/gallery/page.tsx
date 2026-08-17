import { readSourceConfig } from '@/lib/dataBuilder';
import { previewMedia } from '@/lib/interiorContent';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { cleanClinicName, cleanClinicDescription } from '@/lib/copyCleaner';
import { Sparkles, MapPin, Clock, ArrowRight } from 'lucide-react';
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

const CASE_STUDIES = [
  {
    title: 'The Contemporary Family Residence',
    sqft: '2,200 sq.ft · 3BHK',
    timeline: '48 Days',
    theme: 'Warm Minimalist',
    challenge: 'A compact floor plan needing abundant concealed storage without blocking natural window light.',
    solution: 'Designed full-height fluted panelling concealing a walk-in shoe closet, paired with an open-concept acrylic modular kitchen and profile cove lighting.',
    img: '/images/stock/a151a9e5.webp',
  },
  {
    title: 'The Urban Penthouse Villa',
    sqft: '3,400 sq.ft · 4BHK Duplex',
    timeline: '65 Days',
    theme: 'Luxe Contemporary',
    challenge: 'Creating seamless architectural transition between double-height living areas and private master suites.',
    solution: 'Integrated natural smoked oak veneers, bookmatched Italian marble feature walls, and acoustic wood slat ceiling treatments.',
    img: '/images/stock/bf333360.webp',
  },
];

const DESIGN_STYLES = [
  {
    name: 'Modern Contemporary',
    desc: 'Clean horizontal lines, neutral beige and charcoal palettes, concealed handles, and ambient cove illumination.',
  },
  {
    name: 'Warm Minimalist',
    desc: 'Uncluttered open spaces, natural blonde timbers, tactile linen textures, and breathing room for daily tranquility.',
  },
  {
    name: 'Heritage Fusion',
    desc: 'Rich teakwood joinery, brass hardware inlays, traditional courtyard niches, and bespoke hand-crafted details.',
  },
  {
    name: 'Luxe Biophilic',
    desc: 'Indoor botanical niches, natural slate stone accents, daylight optimization, and non-toxic organic materials.',
  },
];

export default async function Template1Gallery({ params }: PageProps) {
  const { slug } = await params;
  const basePath = `/designwebsite/template1/${slug}`;

  const data = await readSourceConfig(slug, 'template1');
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
  const cats = ['Residential Living', 'Modular Kitchens & Dining', 'Bedrooms & Storage'];
  const items: GalleryItem[] = sourceImages.slice(0, 24).map((img, idx) => ({
    img,
    title: `Project Residence ${String(idx + 1).padStart(2, '0')}`,
    cat: cats[idx % cats.length],
  }));

  return (
    <div>
      {/* PAGE HERO */}
      <section id="gallery-hero" className="bg-[#211a13] text-white px-6 lg:px-7 py-[clamp(70px,8vw,110px)]">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <span className="flex items-center gap-3.5 text-[12px] tracking-[0.38em] uppercase text-[#c9ab7c] mb-5 before:content-[''] before:w-10 before:h-px before:bg-[#c9ab7c]">
              Delivered Projects
            </span>
            <h1 className="font-[family-name:var(--font-marcellus)] text-[clamp(38px,5vw,68px)] leading-[1.08] max-w-[760px]">
              The {cleanName || 'studio'} <em className="not-italic italic font-light text-[#c9ab7c]">portfolio</em>
            </h1>
            <p className="mt-6 max-w-[580px] text-[16.5px] font-light leading-[1.75] text-white/80">
              {cleanDesc || `A curated portfolio of delivered homes across ${city}. Every photograph represents genuine craftsmanship, precise joinery, and tailored spatial planning.`}
            </p>
          </Reveal>
        </div>
      </section>

      {/* FEATURED CASE STUDIES */}
      <section className="py-[clamp(70px,8vw,110px)] px-6 lg:px-7 bg-[#fdfbf6] border-b border-[#211a13]/10">
        <div className="max-w-7xl mx-auto">
          <Reveal className="mb-12">
            <span className="flex items-center gap-3.5 text-[12px] tracking-[0.38em] uppercase text-[#a58150] mb-4 before:content-[''] before:w-10 before:h-px before:bg-[#a58150]">
              Case Studies
            </span>
            <h2 className="font-[family-name:var(--font-marcellus)] text-[clamp(30px,3.8vw,48px)] leading-[1.12]">
              Inside our signature <em className="not-italic italic font-light text-[#a58150]">transformations</em>
            </h2>
          </Reveal>

          <div className="grid lg:grid-cols-2 gap-10">
            {CASE_STUDIES.map((study, idx) => (
              <Reveal key={study.title} delay={idx * 100}>
                <div className="bg-[#f6f1e8] border border-[#211a13]/10 overflow-hidden flex flex-col justify-between h-full">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img src={study.img} alt={study.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-8">
                    <div className="flex flex-wrap gap-4 text-[12px] text-[#a58150] uppercase tracking-[0.15em] font-medium mb-3">
                      <span>{study.sqft}</span>
                      <span>·</span>
                      <span>{study.timeline}</span>
                      <span>·</span>
                      <span>{study.theme}</span>
                    </div>
                    <h3 className="font-[family-name:var(--font-marcellus)] text-[24px] mb-3 text-[#211a13]">
                      {study.title}
                    </h3>
                    <p className="text-[14px] text-[#7d7264] font-light leading-[1.7] mb-4">
                      <b className="text-[#211a13] font-medium">Brief:</b> {study.challenge}
                    </p>
                    <p className="text-[14px] text-[#7d7264] font-light leading-[1.7] mb-6">
                      <b className="text-[#211a13] font-medium">Solution:</b> {study.solution}
                    </p>
                    <Link
                      href={`${basePath}/contact`}
                      className="inline-flex items-center gap-2 text-[12px] tracking-[0.2em] uppercase font-medium text-[#211a13] border-b border-[#a58150] pb-1 hover:text-[#a58150]"
                    >
                      Enquire for Similar Space &rarr;
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* DESIGN STYLES EXPLORER */}
      <section className="py-[clamp(70px,8vw,110px)] px-6 lg:px-7 bg-[#211a13] text-white">
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-flex items-center gap-3.5 text-[12px] tracking-[0.38em] uppercase text-[#c9ab7c] mb-4 before:content-[''] before:w-10 before:h-px before:bg-[#c9ab7c] after:content-[''] after:w-10 after:h-px after:bg-[#c9ab7c]">
              Aesthetic Directions
            </span>
            <h2 className="font-[family-name:var(--font-marcellus)] text-[clamp(32px,3.8vw,52px)] leading-[1.12] mb-4">
              Explore design styles for <em className="not-italic italic font-light text-[#c9ab7c]">your home</em>
            </h2>
            <p className="text-white/70 font-light text-[15px]">
              Every residence is customized to harmonise with your personal aesthetic and architectural structure.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {DESIGN_STYLES.map((style, idx) => (
              <Reveal key={style.name} delay={idx * 80}>
                <div className="bg-[#2c231a] border border-[#a58150]/25 p-7 h-full flex flex-col justify-between">
                  <div>
                    <span className="font-[family-name:var(--font-marcellus)] text-[22px] text-[#c9ab7c] block mb-3">
                      0{idx + 1}
                    </span>
                    <h3 className="font-[family-name:var(--font-marcellus)] text-[20px] text-white mb-2.5">
                      {style.name}
                    </h3>
                    <p className="text-[13px] font-light text-white/65 leading-[1.7]">
                      {style.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* GRID */}
      <section id="gallery-grid" className="py-[clamp(84px,9vw,120px)] px-6 lg:px-7">
        <div className="max-w-7xl mx-auto">
          <Reveal className="mb-10">
            <span className="flex items-center gap-3.5 text-[12px] tracking-[0.38em] uppercase text-[#a58150] mb-4 before:content-[''] before:w-10 before:h-px before:bg-[#a58150]">
              Full Gallery Archive
            </span>
            <h2 className="font-[family-name:var(--font-marcellus)] text-[clamp(30px,3.6vw,48px)] leading-[1.12]">
              Filter by space &amp; <em className="not-italic italic font-light text-[#a58150]">room typology</em>
            </h2>
          </Reveal>

          <Reveal>
            <GalleryGrid items={items} />
          </Reveal>
        </div>
      </section>

      <PageNarrative page="gallery" studioName={cleanName} city={city} />

      {/* CTA */}
      <section id="gallery-cta" className="bg-[#fdfbf6] border-t border-[#211a13]/10 px-6 lg:px-7 py-[clamp(64px,7vw,100px)]">
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <h2 className="font-[family-name:var(--font-marcellus)] text-[clamp(30px,3.8vw,50px)] leading-[1.12] mb-6">
              Picture your home <em className="not-italic italic font-light text-[#a58150]">on this page</em>
            </h2>
            <p className="text-[#7d7264] font-light leading-[1.8] mb-9 text-[16px]">
              Every home here began with an open conversation over floor plans and coffee. Let&rsquo;s craft yours.
            </p>
            <Link
              href={`${basePath}/contact`}
              className="inline-flex items-center gap-3 bg-[#211a13] text-white px-8 py-4 text-[12.5px] tracking-[0.2em] uppercase font-medium border border-[#211a13] hover:bg-[#a58150] hover:border-[#a58150] transition-colors duration-300"
            >
              Start Your Project Consultation
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
