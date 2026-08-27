import { readSourceConfig } from '@/lib/dataBuilder';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Check, ArrowRight, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';
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

const PACKAGES = [
  {
    name: 'Architectural Design & Sanctions',
    price: 'From ₹3.8 Lakhs',
    tag: 'Fast 40-Day Delivery',
    desc: 'Topographical study, 3D BIM models, and municipal sanction drawings strictly adhering to local bylaws.',
    features: [
      'Topographical Site Survey & Contour Model',
      'Solar Path & Microclimate Analysis',
      '3D Massing & BIM Digital Twin Model',
      'Municipal Sanction Drawing Dossier',
      'Detailed BOQ Preliminary Cost Plan',
      '100% Bylaw Compliance Guarantee',
    ],
  },
  {
    name: 'Structural & MEP Engineering',
    price: 'From ₹7.5 Lakhs',
    tag: 'Most Popular',
    desc: 'STAAD-analyzed RCC frame drawings, bar bending schedules, plumbing & HVAC integration blueprints.',
    features: [
      'Everything in Design & Sanctions',
      'Computerized STAAD Structural Analysis',
      'Rebar Detailing & Bar Bending Schedules',
      'Electrical, Plumbing & HVAC Blueprints',
      'Window & Curtain Wall Engineering Schematics',
      'Zero-Clash Multi-Discipline Coordination',
      'Site Inspections at Casting Milestones',
    ],
  },
  {
    name: 'Turnkey Architectural Build',
    price: 'From ₹65 Lakhs',
    tag: 'Complete Luxury',
    desc: 'Single-contract groundbreaking to keys handover: monolithic RCC casting, Low-E curtain walls, and 10-year warranty.',
    features: [
      'Everything in Structural & MEP Suite',
      'Earthwork, Foundation & Monolithic RCC Pours',
      'Primary Fe550D TMT Steel & Grade-53 Concrete',
      'High-Performance Low-E Curtain Walls',
      'Weekly Milestone Photographic Audits',
      'Final Snagging Audit & Keys Handover',
      '10-Year Comprehensive Structural Warranty',
    ],
  },
];

export default async function Template13Services({ params }: PageProps) {
  const { slug } = await params;
  const basePath = `/designwebsite/template13/${slug}`;

  const data = await readSourceConfig(slug, 'template13');
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
      steps: detail?.process?.slice(0, 4) || [
        'Plot survey & microclimate audit',
        '3D BIM schematic signoff',
        'Structural & municipal engineering',
        'On-site casting, facade build & handover',
      ],
      img:
        getArchitectureServiceImage(svc, media) ||
        media.treatmentImages?.[idx] ||
        SERVICE_FALLBACK_IMAGES[idx % SERVICE_FALLBACK_IMAGES.length],
    };
  });

  const servicesFaqs: FAQItem[] = [
    {
      q: 'What is included in your turnkey contract?',
      a: 'We handle complete architectural 3D designs, electrical and plumbing drawings, factory-manufactured modular woodwork, false ceilings, lighting, civil alterations, and deep cleaning before key handover.',
      tag: 'Turnkey Scope',
    },
    {
      q: 'How do you guarantee fixed pricing with no escalations?',
      a: 'Every line item, material specification, and hardware brand is clearly itemised in your initial Bill of Quantities (BOQ). Once approved, your project price is frozen with our 0% Cost Overrun Guarantee.',
      tag: 'Fixed Pricing',
    },
    {
      q: 'Can we customize kitchen counter materials and laminate textures?',
      a: 'Yes! You can choose from over 250+ laminate textures, anti-fingerprint matte acrylics, natural veneers, and quartz stone countertops in our studio material library.',
      tag: 'Customization',
    },
    {
      q: 'What is the standard warranty period?',
      a: 'All our woodwork carries an unconditional 10-year warranty against termite attack and delamination. German hardware from Blum and Häfele carries its manufacturer warranty.',
      tag: 'Warranty',
    },
  ];

  return (
    <div>
      {/* HERO */}
      <section id="services-hero" className="px-7 py-[clamp(56px,7vw,88px)] bg-[#fbf7f2]">
        <div className="max-w-[1220px] mx-auto">
          <Reveal>
            <div className="flex items-center gap-2.5 text-[12px] font-extrabold tracking-[0.22em] uppercase text-[#d8442c] before:content-[''] before:w-6 before:h-[2.5px] before:rounded before:bg-[#d8442c]">
              Turnkey Disciplines
            </div>
            <h1 className="text-[clamp(32px,4.6vw,54px)] font-extrabold mt-3.5 tracking-[-0.02em] max-w-[780px] leading-[1.12]">
              Everything your home needs,{' '}
              <span className="font-[family-name:var(--font-newsreader)] italic font-medium text-[#d8442c]">under one roof</span>
            </h1>
            <p className="mt-4.5 max-w-[640px] text-[#6d6259] text-[16px]">
              From modular kitchens to complete turnkey residences — {cleanName || 'our studio'} designs, manufactures, and executes across {city}.
            </p>
          </Reveal>
        </div>
      </section>

      {/* COST ESTIMATOR */}
      <section id="estimator" className="px-7 py-[clamp(56px,7vw,88px)] bg-white border-b border-[#241f1a]/10">
        <div className="max-w-[1220px] mx-auto">
          <Reveal>
            <Estimator contactPath={`${basePath}/contact`} />
          </Reveal>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services-list" className="px-7 py-[clamp(64px,7vw,96px)] bg-[#fbf7f2]">
        <div className="max-w-[1220px] mx-auto flex flex-col gap-[clamp(52px,6vw,80px)]">
          {services.map((svc, idx) => (
            <Reveal key={svc.title}>
              <div className="grid lg:grid-cols-2 gap-9 lg:gap-14 items-center">
                <div className={`relative ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="rounded-[20px] overflow-hidden aspect-[4/3.1] shadow-[0_30px_60px_-24px_rgba(29,23,19,0.4)]">
                    <img src={svc.img} alt={svc.title} loading="lazy" className="w-full h-full object-cover" />
                  </div>
                  <span className="absolute -top-4 left-6 bg-[#d8442c] text-white text-[11px] font-extrabold tracking-[0.12em] uppercase px-4 py-2 rounded-full">
                    Offering {String(idx + 1).padStart(2, '0')}
                  </span>
                </div>

                <div className={idx % 2 === 1 ? 'lg:order-1' : ''}>
                  <h2 className="text-[clamp(24px,3vw,36px)] font-extrabold tracking-[-0.02em] mb-1.5">{svc.title}</h2>
                  <p className="font-[family-name:var(--font-newsreader)] italic text-[#d8442c] text-[18px] mb-4">{svc.tagline}</p>
                  <p className="text-[#6d6259] text-[14.5px] leading-[1.7] mb-6">{svc.desc}</p>

                  <div className="grid sm:grid-cols-2 gap-3 mb-6">
                    {svc.benefits.map((b: string) => (
                      <div key={b} className="flex gap-2.5 items-start bg-white border border-[#241f1a]/8 rounded-xl px-3.5 py-3">
                        <Check className="w-[18px] h-[18px] text-[#d8442c] shrink-0 mt-px" strokeWidth={2.4} />
                        <span className="text-[13px] font-bold leading-snug">{b}</span>
                      </div>
                    ))}
                  </div>

                  <Link
                    href={`${basePath}/contact`}
                    className="inline-flex items-center gap-2 text-[12.5px] font-extrabold tracking-[0.18em] uppercase text-[#d8442c] group"
                  >
                    Get my quote for this offering
                    <ArrowRight className="w-4 h-4 transition-transform duration-250 group-hover:translate-x-1.5" strokeWidth={2.4} />
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>


      <PageNarrative page="services" studioName={cleanName} city={city} />

      {/* SERVICES FAQ */}
      <section className="px-7 py-[clamp(56px,7vw,88px)] bg-[#fbf7f2]">
        <div className="max-w-[900px] mx-auto">
          <Reveal className="text-center mb-12">
            <div className="inline-flex items-center gap-2.5 text-[12px] font-extrabold tracking-[0.22em] uppercase text-[#d8442c] mb-3 before:content-[''] before:w-6 before:h-[2.5px] before:rounded before:bg-[#d8442c] after:content-[''] after:w-6 after:h-[2.5px] after:rounded after:bg-[#d8442c]">
              Service Questions
            </div>
            <h2 className="text-[clamp(28px,3.8vw,46px)] font-extrabold tracking-[-0.02em]">
              Turnkey execution &amp; scope
            </h2>
          </Reveal>

          <Reveal>
            <FAQAccordion items={servicesFaqs} />
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="px-7 py-[clamp(56px,7vw,88px)] bg-[#1d1713] text-white text-center">
        <Reveal className="max-w-[720px] mx-auto">
          <h2 className="text-[clamp(28px,3.8vw,44px)] font-extrabold mb-4">
            Not sure where to begin?
          </h2>
          <p className="text-white/80 text-[16px] mb-8">
            Tell us about your floor plan and budget — we&rsquo;ll map the right scope in one free session.
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
