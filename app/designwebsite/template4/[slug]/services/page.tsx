import { readSourceConfig } from '@/lib/dataBuilder';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Check, ArrowRight } from 'lucide-react';
import { cleanClinicName } from '@/lib/copyCleaner';
import {
  DEFAULT_INTERIOR_SERVICES,
  getInteriorServiceData,
  getInteriorServiceSummary,
  getServiceImage,
  previewMedia,
} from '@/lib/interiorContent';
import Reveal from '../Reveal';
import SeriesScroll, { SeriesTheme } from '../SeriesScroll';

type PageProps = { params: Promise<{ slug: string }> };

const SERVICE_FALLBACK_IMAGES = [
  '/images/stock/68b39046.webp',
  '/images/stock/a0e0726f.webp',
  '/images/stock/dc1759ad.webp',
  '/images/stock/f23e9dc6.webp',
  '/images/stock/615f9d34.webp',
  '/images/stock/6dcb103c.webp',
];

const THEME_IMAGES = [
  '/images/stock/a151a9e5.webp',
  '/images/stock/bf333360.webp',
  '/images/stock/84fea9c5.webp',
  '/images/stock/284d6d29.webp',
  '/images/stock/36e83915.webp',
];

const THEMES = [
  { name: 'Lyrical Luxury', desc: 'Warm cove light, velvet & brass — quiet opulence' },
  { name: 'Modern Zen', desc: 'Bare essentials, breathing room, morning light' },
  { name: 'European Reverie', desc: 'Panelled walls, antique mirrors, Parisian restraint' },
  { name: 'Chettinad Contemporary', desc: 'Heritage wood & athangudi soul, modern lines' },
  { name: 'Coastal Calm', desc: 'Rattan, indigo & sea-breeze ease for coastal homes' },
];

export default async function Template4Services({ params }: PageProps) {
  const { slug } = await params;
  const basePath = `/designwebsite/template4/${slug}`;

  const data = await readSourceConfig(slug, 'template4');
  if (!data) return notFound();

  const { clinic, business } = data;

  const media = previewMedia(data.media);
  const cleanName = cleanClinicName(clinic.name);
  const city = clinic.address?.city || 'Chennai';
  const servicesList: string[] = business.services?.length ? business.services : DEFAULT_INTERIOR_SERVICES;

  const services = servicesList.map((svc: string, idx: number) => {
    const detail = getInteriorServiceData(svc);
    return {
      title: svc,
      tagline: detail?.tagline || 'Designed and built around your home.',
      desc: detail?.description || getInteriorServiceSummary(svc),
      benefits: detail?.benefits?.slice(0, 4) || [
        'Personalized design direction',
        'Curated material selections',
        'Clear budgets and timelines',
        'Coordinated execution and styling',
      ],
      img:
        getServiceImage(svc, media) ||
        media.treatmentImages?.[idx] ||
        SERVICE_FALLBACK_IMAGES[idx % SERVICE_FALLBACK_IMAGES.length],
    };
  });

  const themes: SeriesTheme[] = THEMES.map((theme, idx) => ({
    ...theme,
    img: media.treatmentImages?.[idx] || THEME_IMAGES[idx],
  }));

  return (
    <div>
      {/* HERO */}
      <section className="py-[clamp(64px,7vw,96px)]">
        <div className="max-w-[1240px] mx-auto px-[30px]">
          <Reveal>
            <div className="flex items-center gap-3 text-[11.5px] font-semibold tracking-[0.3em] uppercase text-[#a4532f] before:content-[''] before:w-8 before:h-px before:bg-[#a4532f]">
              Our services
            </div>
            <h1 className="font-[family-name:var(--font-cormorant)] text-[clamp(34px,4.6vw,56px)] font-semibold leading-[1.12] mt-4 mb-3.5 max-w-[760px]">
              Every craft your home deserves, <em className="italic text-[#a4532f]">under one signature</em>
            </h1>
            <p className="text-[#7a6f60] text-[16px] font-light max-w-[620px]">
              From single rooms to complete turnkey residences — {cleanName || 'our studio'} designs, builds and styles
              across {city}.
            </p>
          </Reveal>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-[clamp(48px,6vw,80px)] bg-[#fbf8f1]">
        <div className="max-w-[1240px] mx-auto px-[30px] flex flex-col gap-[clamp(64px,7vw,96px)]">
          {services.map((svc, idx) => (
            <Reveal key={svc.title}>
              <div className="grid lg:grid-cols-2 gap-[52px] lg:gap-[70px] items-center">
                <div className={`relative ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div
                    className={`absolute border border-[#b08d4f] ${
                      idx % 2 === 1 ? '-top-4 -right-4 bottom-4 left-4' : '-top-4 right-4 bottom-4 -left-4'
                    }`}
                  />
                  <img src={svc.img} alt={svc.title} loading="lazy" className="relative z-[1] w-full aspect-[4/3.1] object-cover" />
                  <div className="absolute z-[2] -bottom-[18px] left-8 bg-[#17130f] text-white px-6 py-3.5 text-[11px] tracking-[0.18em] uppercase">
                    Service · <b className="text-[#d9c49a]">{String(idx + 1).padStart(2, '0')}</b>
                  </div>
                </div>

                <div className={idx % 2 === 1 ? 'lg:order-1' : ''}>
                  <span className="font-[family-name:var(--font-cormorant)] italic text-[20px] text-[#a4532f]">{svc.tagline}</span>
                  <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(28px,3.4vw,40px)] font-semibold leading-[1.12] mt-2.5 mb-3.5">
                    {svc.title}
                  </h2>
                  <p className="text-[#7a6f60] text-[15.5px] font-light mb-6">{svc.desc}</p>

                  <ul className="grid sm:grid-cols-2 gap-3 mb-7">
                    {svc.benefits.map((b: string) => (
                      <li key={b} className="flex gap-2.5 items-start text-[13.5px] font-normal">
                        <Check className="w-[17px] h-[17px] text-[#b08d4f] shrink-0 mt-0.5" strokeWidth={2.2} />
                        {b}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={`${basePath}/contact`}
                    className="group inline-flex items-center gap-2.5 text-[12.5px] font-semibold tracking-[0.18em] uppercase text-[#a4532f]"
                  >
                    Discuss this service
                    <ArrowRight className="w-4 h-4 transition-transform duration-250 group-hover:translate-x-1.5" strokeWidth={2.2} />
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SIGNATURE SERIES */}
      <section className="py-24">
        <div className="max-w-[1240px] mx-auto px-[30px]">
          <Reveal>
            <div className="flex items-center gap-3 text-[11.5px] font-semibold tracking-[0.3em] uppercase text-[#a4532f] before:content-[''] before:w-8 before:h-px before:bg-[#a4532f]">
              The Signature Series
            </div>
            <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(30px,4vw,46px)] font-semibold leading-[1.12] mt-4 mb-8">
              Pick a world, <em className="italic text-[#a4532f]">make it yours</em>
            </h2>
            <SeriesScroll themes={themes} collection="The Signature Series" />
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24">
        <div className="max-w-[1240px] mx-auto px-[30px]">
          <Reveal>
            <div className="bg-[#17130f] text-white px-8 py-14 sm:px-14 text-center">
              <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(28px,3.6vw,44px)] font-semibold leading-[1.12] mb-4">
                Not sure where to <em className="italic text-[#d9c49a]">begin?</em>
              </h2>
              <p className="text-white/75 text-[15px] font-light mb-8 max-w-[520px] mx-auto">
                Start with a free consultation. We&apos;ll walk your floor plan together and map what your home needs — no
                commitment.
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
