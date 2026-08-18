import { readSourceConfig } from '@/lib/dataBuilder';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Check, ArrowRight, Sparkles, ShieldCheck, Clock, Layers } from 'lucide-react';
import { cleanClinicName } from '@/lib/copyCleaner';
import {
  DEFAULT_INTERIOR_SERVICES,
  getInteriorServiceData,
  getInteriorServiceSummary,
  getServiceImage,
  previewMedia,
} from '@/lib/interiorContent';
import Reveal from '../Reveal';
import PageNarrative from '../PageNarrative';
import SeriesScroll, { SeriesTheme } from '../SeriesScroll';
import FAQAccordion, { FAQItem } from '../FAQAccordion';

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

const SCOPE_TIERS = [
  {
    name: 'Atelier Concept & Styling',
    tag: 'Design Only',
    desc: 'Complete architectural layout planning, photoreal 3D renders, material moodboards, and MEP drawing packages.',
    inclusions: [
      'Spatial layout optimization & 2D floor plans',
      'Photorealistic 3D room renders',
      'Lighting, electrical & plumbing schematics',
      'Curated material & finish schedule',
    ],
  },
  {
    name: 'Turnkey Residential Atelier',
    tag: 'Signature Scope',
    desc: 'End-to-end design, factory joinery production, civil modifications, and white-glove site execution.',
    inclusions: [
      'Everything in Atelier Concept',
      'Custom modular kitchen & wardrobes',
      'BWP marine ply with Blum soft-close fittings',
      'False ceiling, profile lighting & painting',
      '10-Year Structural Woodwork Warranty',
      'Guaranteed 45 to 60-day handover',
    ],
  },
  {
    name: 'Haute Bespoke Estate',
    tag: 'Grand Residences',
    desc: 'Full architectural redesign with custom solid wood joinery, Italian marble inlays, and home automation.',
    inclusions: [
      'Everything in Turnkey Residential',
      'Smoked oak / walnut natural wood veneers',
      'Italian marble floor & feature wall cladding',
      'Custom furniture commissions & art curation',
      'Dedicated lead architect on site',
    ],
  },
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
        'Personalized 3D architectural renders',
        'BWP marine plywood construction',
        'Curated material moodboards & samples',
        'Direct site supervision & styling',
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

  const servicesFaqs: FAQItem[] = [
    {
      q: 'How does your turnkey execution work?',
      a: 'We manage every aspect from architectural design and lighting drawings to factory fabrication, civil work, installation, and deep cleaning under a single dedicated contract.',
      tag: 'Turnkey Scope',
    },
    {
      q: 'Can we select custom marble and veneer finishes?',
      a: 'Yes. We maintain a private materials library in our studio featuring over 200+ veneers, anti-fingerprint acrylics, and imported marble slabs for tactile touch-and-feel.',
      tag: 'Materials',
    },
    {
      q: 'What is the 10-year craft warranty?',
      a: 'We provide an unconditional 10-year structural warranty on all calibrated BWP marine plywood woodwork, accompanied by post-handover care inspections at 6 and 12 months.',
      tag: 'Warranty',
    },
  ];

  return (
    <div>
      {/* HERO */}
      <section className="py-[clamp(64px,7vw,96px)]">
        <div className="max-w-[1240px] mx-auto px-[30px]">
          <Reveal>
            <div className="flex items-center gap-3 text-[11.5px] font-semibold tracking-[0.3em] uppercase text-[#a4532f] before:content-[''] before:w-8 before:h-px before:bg-[#a4532f]">
              Our Disciplines
            </div>
            <h1 className="font-[family-name:var(--font-cormorant)] text-[clamp(36px,4.8vw,60px)] font-light leading-[1.08] mt-4 mb-3.5 max-w-[780px]">
              Every craft your residence deserves, <em className="italic text-[#a4532f]">under one signature</em>
            </h1>
            <p className="text-[#7a6f60] text-[16px] font-light max-w-[640px]">
              From bespoke room transformations to full turnkey architectural residences — {cleanName || 'our studio'} designs, builds, and styles across {city}.
            </p>
          </Reveal>
        </div>
      </section>

      {/* SCOPE TIERS */}
      <section className="py-20 bg-[#fbf8f1] border-y border-[#221c14]/12">
        <div className="max-w-[1240px] mx-auto px-[30px]">
          <Reveal className="text-center max-w-xl mx-auto mb-14">
            <div className="inline-flex items-center gap-3 text-[11.5px] font-semibold tracking-[0.3em] uppercase text-[#a4532f] before:content-[''] before:w-8 before:h-px before:bg-[#a4532f] after:content-[''] after:w-8 after:h-px after:bg-[#a4532f]">
              Scope Framework
            </div>
            <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(30px,4vw,48px)] font-semibold leading-[1.08] mt-3">
              Curated engagement tiers
            </h2>
          </Reveal>

          <div className="grid lg:grid-cols-3 gap-8">
            {SCOPE_TIERS.map((tier, idx) => (
              <Reveal key={tier.name} delay={idx * 80}>
                <div className={`p-8 sm:p-9 h-full flex flex-col justify-between border transition-all ${
                  idx === 1
                    ? 'bg-[#17130f] text-white border-[#b08d4f] shadow-xl relative'
                    : 'bg-white text-[#17130f] border-[#221c14]/12 hover:border-[#a4532f]'
                }`}>
                  {idx === 1 && (
                    <span className="absolute -top-3 right-6 bg-[#a4532f] text-white text-[10px] tracking-widest uppercase px-3 py-1 font-semibold">
                      {tier.tag}
                    </span>
                  )}
                  <div>
                    <span className={`text-[11px] tracking-widest uppercase block mb-2 font-semibold ${idx === 1 ? 'text-[#d9c49a]' : 'text-[#a4532f]'}`}>
                      {tier.tag}
                    </span>
                    <h3 className="font-[family-name:var(--font-cormorant)] text-[24px] font-semibold mb-3">
                      {tier.name}
                    </h3>
                    <p className={`text-[13.5px] font-light leading-relaxed mb-6 pb-5 border-b ${idx === 1 ? 'text-white/75 border-white/15' : 'text-[#7a6f60] border-[#221c14]/10'}`}>
                      {tier.desc}
                    </p>

                    <ul className="grid gap-2.5 mb-8">
                      {tier.inclusions.map((inc) => (
                        <li key={inc} className="flex items-start gap-2.5 text-[13px] font-light">
                          <Check className={`w-4 h-4 shrink-0 mt-0.5 ${idx === 1 ? 'text-[#d9c49a]' : 'text-[#a4532f]'}`} />
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    href={`${basePath}/contact`}
                    className={`inline-flex items-center justify-center gap-2 py-3.5 px-6 text-[12px] tracking-widest uppercase font-semibold transition-colors text-center ${
                      idx === 1
                        ? 'bg-[#a4532f] text-white hover:bg-[#854021]'
                        : 'bg-transparent text-[#17130f] border border-[#17130f] hover:bg-[#17130f] hover:text-white'
                    }`}
                  >
                    Discuss This Tier <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-[clamp(64px,7vw,96px)] bg-white">
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

      {/* SERIES THEMES */}
      <section className="py-24 bg-[#fbf8f1] border-t border-[#221c14]/12">
        <div className="max-w-[1240px] mx-auto px-[30px]">
          <Reveal className="mb-12">
            <div className="flex items-center gap-3 text-[11.5px] font-semibold tracking-[0.3em] uppercase text-[#a4532f] before:content-[''] before:w-8 before:h-px before:bg-[#a4532f]">
              Signature Series
            </div>
            <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(30px,4vw,46px)] font-semibold leading-[1.1] mt-3">
              Living themes tailored for you
            </h2>
          </Reveal>
          <Reveal>
            <SeriesScroll themes={themes} collection={basePath} />
          </Reveal>
        </div>
      </section>

      <PageNarrative page="services" studioName={cleanName} city={city} />

      {/* FAQ */}
      <section className="py-24 bg-white border-t border-[#221c14]/12">
        <div className="max-w-[860px] mx-auto px-[30px]">
          <Reveal className="text-center mb-12">
            <div className="inline-flex items-center gap-3 text-[11.5px] font-semibold tracking-[0.3em] uppercase text-[#a4532f] before:content-[''] before:w-8 before:h-px before:bg-[#a4532f] after:content-[''] after:w-8 after:h-px after:bg-[#a4532f]">
              Service FAQ
            </div>
            <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(30px,4vw,48px)] font-semibold leading-[1.08] mt-3">
              Questions on scope &amp; craftsmanship
            </h2>
          </Reveal>

          <Reveal>
            <FAQAccordion items={servicesFaqs} />
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[#17130f] text-white text-center">
        <div className="max-w-[720px] mx-auto px-[30px]">
          <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(30px,4vw,48px)] font-light mb-4">
            Not sure where to begin?
          </h2>
          <p className="text-white/75 text-[16px] font-light mb-8">
            Tell us about your residence — we&rsquo;ll map the right architectural scope in one free session.
          </p>
          <Link
            href={`${basePath}/contact`}
            className="inline-flex items-center gap-2 bg-[#a4532f] text-white text-[10.5px] sm:text-[11.5px] font-semibold tracking-[0.18em] uppercase px-5 py-3 sm:px-6 hover:bg-[#854021] transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
