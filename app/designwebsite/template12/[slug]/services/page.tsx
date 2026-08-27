import { readSourceConfig } from '@/lib/dataBuilder';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Check, ArrowRight, ShieldCheck, Clock, CheckCircle2, Sparkles, Layers } from 'lucide-react';
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
    tag: 'Most Loved Choice',
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
    tag: 'Full Turnkey Execution',
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

export default async function Template12Services({ params }: PageProps) {
  const { slug } = await params;
  const basePath = `/designwebsite/template12/${slug}`;

  const data = await readSourceConfig(slug, 'template12');
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
      q: 'What is covered under your turnkey architectural and civil services?',
      a: 'We handle everything under a single contract: concept design and 3D BIM, structural and MEP drawings, CMDA/GCC sanction filing, soil-matched foundations, monolithic RCC construction, facade glazing, and final occupancy handover.',
      tag: 'Turnkey Scope',
    },
    {
      q: 'What are your payment milestones?',
      a: 'Payments are broken into transparent stages: a modest booking advance on design kickoff, stage-linked amounts on sanction approval and foundation completion, a material-linked milestone during superstructure, and the final balance upon keys handover with occupancy documentation.',
      tag: 'Milestones',
    },
    {
      q: 'Do you engineer for non-standard plot shapes and terrain?',
      a: 'Yes. Every foundation, retaining wall, structural column, and beam is site-engineered to your plot contours, soil report, and setback constraints, ensuring safe, zero-settlement performance.',
      tag: 'Custom Engineering',
    },
    {
      q: 'How do you keep civil timelines predictable?',
      a: 'Our in-house structural engineers and site supervisors work from a frozen BOQ and weekly photographic milestone audits, so concrete pours, steel, and facade work move forward without contractor chasing.',
      tag: 'Timeline',
    },
  ];

  return (
    <div>
      {/* PAGE HERO */}
      <section id="services-hero" className="bg-[#faf7f1] px-6 py-[clamp(60px,7vw,96px)]">
        <div className="max-w-[1240px] mx-auto">
          <Reveal>
            <span className="inline-flex items-center gap-2.5 bg-white border border-[#1b1b1b]/10 rounded-full px-4.5 py-2 text-[12px] font-bold tracking-[0.14em] uppercase text-[#0e5a43] mb-6 before:content-[''] before:w-2 before:h-2 before:rounded-full before:bg-[#f2a007]">
              Turnkey Disciplines
            </span>
            <h1 className="font-[family-name:var(--font-bricolage)] font-bold text-[clamp(34px,4.6vw,58px)] leading-[1.06] tracking-[-0.02em] max-w-[780px]">
              Everything your project needs, <mark className="bg-[linear-gradient(transparent_62%,#fdeecb_62%)] text-[#0e5a43] px-0.5">under one roof</mark>
            </h1>
            <p className="mt-5 max-w-[580px] text-[#6b6660] text-[16.5px] leading-[1.7] font-medium">
              From single-plot residential builds to complete turnkey architectural projects — {cleanName || 'our studio'} handles 3D design, certified materials, and punctual site execution in {city}.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ESTIMATOR */}
      <section id="estimator" className="px-6 py-[clamp(72px,8vw,110px)] bg-white border-b border-[#1b1b1b]/10">
        <div className="max-w-[1240px] mx-auto">
          <div className="bg-[#faf7f1] border border-[#1b1b1b]/10 rounded-[32px] p-6 sm:p-10 lg:p-12 shadow-[0_12px_40px_rgba(27,27,27,0.06)]">
            <Estimator basePath={basePath} city={city} />
          </div>
        </div>
      </section>

      {/* SERVICES LIST */}
      <section id="services-list" className="px-6 py-[clamp(72px,8vw,110px)] bg-[#faf7f1]">
        <div className="max-w-[1240px] mx-auto grid gap-8">
          {services.map((svc, idx) => (
            <Reveal key={svc.title}>
              <div className="grid lg:grid-cols-[0.85fr_1.15fr] border border-[#1b1b1b]/10 rounded-[26px] overflow-hidden bg-white transition-all duration-300 hover:shadow-[0_24px_60px_rgba(27,27,27,0.12)]">
                <div className="relative min-h-[260px] lg:min-h-full overflow-hidden">
                  <span className="absolute top-4 left-4 z-10 bg-white/95 rounded-full px-3.5 py-1.5 text-[11px] font-extrabold tracking-[0.1em] uppercase text-[#0e5a43]">
                    Service {String(idx + 1).padStart(2, '0')}
                  </span>
                  <img src={svc.img} alt={svc.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
                </div>

                <div className="px-7 sm:px-9 py-8">
                  <h2 className="font-[family-name:var(--font-bricolage)] font-bold text-[clamp(22px,2.6vw,30px)] tracking-[-0.01em] mb-1.5">
                    {svc.title}
                  </h2>
                  <p className="text-[14px] font-extrabold text-[#0e5a43] mb-4">{svc.tagline}</p>
                  <p className="text-[#6b6660] font-medium leading-[1.7] text-[14.5px] mb-6">{svc.desc}</p>

                  <div className="mb-7">
                    <span className="text-[12px] font-extrabold uppercase tracking-wider text-[#1b1b1b] block mb-3">
                      Included In Scope:
                    </span>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {svc.benefits.map((b: string) => (
                        <div key={b} className="flex gap-2.5 items-start bg-[#faf7f1] border border-[#1b1b1b]/8 rounded-xl px-3.5 py-3">
                          <Check className="w-[18px] h-[18px] text-[#0e5a43] shrink-0 mt-px" strokeWidth={2.2} />
                          <span className="text-[13px] font-semibold leading-snug">{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link
                    href={`${basePath}/contact`}
                    className="inline-flex items-center gap-2 font-extrabold text-[14px] text-[#0e5a43] border-b-[2.5px] border-[#f2a007] pb-1 hover:gap-3.5 transition-all"
                  >
                    Get a quote for this service <ArrowRight className="w-4 h-4" strokeWidth={2.4} />
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <PageNarrative page="services" studioName={cleanName} city={city} />

      {/* SERVICES FAQ */}
      <section className="px-6 py-[clamp(72px,8vw,110px)] bg-white border-t border-[#1b1b1b]/10">
        <div className="max-w-[900px] mx-auto">
          <Reveal className="text-center mb-12">
            <span className="inline-flex items-center gap-2.5 text-[12px] font-extrabold tracking-[0.28em] uppercase text-[#0e5a43] mb-3 before:content-[''] before:w-7 before:h-[2.5px] before:rounded-full before:bg-[#f2a007] after:content-[''] after:w-7 after:h-[2.5px] after:rounded-full after:bg-[#f2a007]">
              Scope FAQ
            </span>
            <h2 className="font-[family-name:var(--font-bricolage)] font-bold text-[clamp(28px,3.8vw,46px)] leading-[1.08] tracking-[-0.02em] mb-3">
              Turnkey services questions
            </h2>
            <p className="text-[#6b6660] text-[15px] font-medium">
              Understand our delivery timelines, milestone payments, and material certifications.
            </p>
          </Reveal>

          <Reveal>
            <FAQAccordion items={servicesFaqs} />
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section id="services-cta" className="px-6 py-[clamp(64px,7vw,96px)] bg-[#0e5a43] text-white">
        <Reveal className="max-w-[760px] mx-auto text-center">
          <h2 className="font-[family-name:var(--font-bricolage)] font-bold text-[clamp(28px,3.8vw,48px)] leading-[1.08] tracking-[-0.02em] mb-4">
            Not sure what your home needs? <mark className="bg-transparent text-[#f2a007]">Ask a designer.</mark>
          </h2>
          <p className="text-white/80 font-medium text-[16px] leading-[1.7] mb-8">
            Tell us about your rooms and budget — we&rsquo;ll map the right architectural scope in one free consultation.
          </p>
          <Link
            href={`${basePath}/contact`}
            className="inline-flex items-center justify-center gap-2 bg-[#f2a007] text-[#1b1b1b] font-bold text-[15px] px-9 py-4.5 rounded-[14px] hover:bg-[#e09500] hover:-translate-y-0.5 hover:shadow-[0_14px_28px_rgba(242,160,7,0.35)] transition-all duration-300"
          >
            Book Free Consultation
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
