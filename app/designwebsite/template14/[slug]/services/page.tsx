import { readSourceConfig } from '@/lib/dataBuilder';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Check, ArrowRight, Sparkles, ShieldCheck, Clock, Layers } from 'lucide-react';
import { cleanClinicName, cleanArchitectureServices } from '@/lib/copyCleaner';
import {
  DEFAULT_ARCHITECTURE_SERVICES,
  getArchitectureServiceData,
  getArchitectureServiceSummary,
  getArchitectureServiceImage,
  previewMedia,
} from '@/lib/architectureContent';
import Reveal from '../Reveal';
import PageNarrative from '../PageNarrative';
import SeriesScroll, { SeriesTheme } from '../SeriesScroll';
import Estimator from '../Estimator';
import FAQAccordion, { FAQItem } from '../FAQAccordion';

type PageProps = { params: Promise<{ slug: string }> };

const SERVICE_FALLBACK_IMAGES = [
  '/images/architecture/architectural-blueprint-draft.webp',
  '/images/architecture/structural-construction-frame.webp',
  '/images/architecture/architect-studio-model.webp',
  '/images/architecture/civic-landmark-facade.webp',
  '/images/architecture/glass-curtain-wall.webp',
  '/images/architecture/urban-master-plan.webp',
];

const THEME_IMAGES = [
  '/images/architecture/civic-landmark-facade.webp',
  '/images/architecture/courtyard-water-residence.webp',
  '/images/architecture/porotherm-clay-facade.webp',
  '/images/architecture/monolithic-brutalist-facade.webp',
  '/images/architecture/modern-villa-duplex.webp',
];

const THEMES = [
  { name: 'Modern Beachfront Villas', desc: 'Spacious open balconies, private swimming pools, and floor-to-ceiling glass doors catching cool sea breezes' },
  { name: 'Traditional Courtyard Homes', desc: 'Central open-to-sky courtyards (mutham) that naturally ventilate and cool your home with 100% Vaastu compliance' },
  { name: 'Heat-Proof Cool Brick Homes', desc: 'High-quality clay bricks, shaded verandas, and terracotta screens that keep indoor rooms 3°C to 5°C cooler' },
  { name: 'Independent Residential Houses', desc: 'Strong structural foundations, quality cement and steel, modern elevations, and low maintenance durability' },
  { name: 'City Duplex & Multi-Storey Homes', desc: 'Multi-generational G+2 luxury homes with covered car parking, lift provision, and private terrace gardens' },
];

const SCOPE_TIERS = [
  {
    name: '3D Elevation & CMDA Approval Plan',
    tag: 'Design & Approvals',
    desc: 'Plot measurement, 100% Vaastu compliant floor plans, realistic 3D exterior elevations, and complete government building permit drawings.',
    inclusions: [
      'Plot boundary check & setback calculations',
      '100% Vaastu compliant 2D floor plans',
      'Realistic 3D exterior elevation views',
      'CMDA / Corporation sanction drawing set',
      'Preliminary itemised construction estimate',
    ],
  },
  {
    name: 'Complete Architectural & Structural Suite',
    tag: 'Detailed Engineering',
    desc: 'Engineered structural drawings, steel reinforcement bar bending schedules, electrical and plumbing layouts, and site engineer visits.',
    inclusions: [
      'Everything in 3D Elevation & CMDA Plan',
      'Structural safety calculations & beam details',
      'Bar bending schedules for steel purchase',
      'Electrical, plumbing & drainage layout drawings',
      'Doors, windows & joinery specification sheets',
      'Site engineer inspections during foundation & roof casting',
    ],
  },
  {
    name: 'Turnkey House Construction',
    tag: 'Complete Build',
    desc: 'End-to-end house construction under one fixed contract: soil-tested foundations, Tata Tiscon steel, UltraTech cement, daily supervision, and a 10-year warranty.',
    inclusions: [
      'Everything in Architectural & Structural Suite',
      'Complete civil construction from foundation to roof',
      'Primary Tata Tiscon Fe550D steel & UltraTech cement',
      'Quality vitrified tiles, teakwood doors & electrical fittings',
      'Daily site supervision by qualified civil engineers',
      '10-Year Comprehensive Structural Warranty Certificate',
    ],
  },
];

export default async function Template14Services({ params }: PageProps) {
  const { slug } = await params;
  const basePath = `/designwebsite/template14/${slug}`;

  const data = await readSourceConfig(slug, 'template14');
  if (!data) return notFound();

  const { clinic, business } = data;

  const media = previewMedia(data.media);
  const cleanName = cleanClinicName(clinic.name);
  const city = clinic.address?.city || 'Chennai';
  const servicesList: string[] = cleanArchitectureServices(business.services, DEFAULT_ARCHITECTURE_SERVICES);

  const services = servicesList.map((svc: string, idx: number) => {
    const detail = getArchitectureServiceData(svc);
    return {
      title: svc,
      tagline: detail?.tagline || 'Engineered for your plot topography and budget.',
      desc: detail?.description || getArchitectureServiceSummary(svc),
      benefits: detail?.benefits?.slice(0, 4) || [
        'Custom 3D massing & site planning',
        'Certified structural drawings',
        'Clear itemised BOQ quotation',
        'Coordinated site execution & supervision',
      ],
      img:
        getArchitectureServiceImage(svc, media) ||
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
              From bespoke room transformations to full turnkey architectural residences — {cleanName || 'our studio'} designs, engineers, and builds across {city}.
            </p>
          </Reveal>
        </div>
      </section>

      {/* COST ESTIMATOR */}
      <section id="estimator" className="py-20 bg-[#fbf8f1] border-y border-[#221c14]/12">
        <div className="max-w-[1240px] mx-auto px-[30px]">
          <Reveal>
            <Estimator basePath={basePath} city={city} />
          </Reveal>
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
