import { readSourceConfig } from '@/lib/dataBuilder';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Check, ArrowRight, ShieldCheck, Clock, CheckCircle2, Sparkles, Layers } from 'lucide-react';
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

const PACKAGES = [
  {
    name: 'Smart Essentials',
    price: 'From ₹6.2 Lakhs',
    tag: 'Fast 35-Day Delivery',
    desc: 'Complete woodwork with moisture-proof BWP marine ply, durable laminates, and soft-close hardware.',
    features: [
      'Modular Kitchen with Tandem Drawers',
      'Full-Height Wardrobes with Lofts',
      'Living Room TV Unit & Shoe Cabinet',
      'Warm LED False Ceiling & Cove Lights',
      'Asian Paints Royale Paint Application',
      '10-Year Woodwork Warranty',
    ],
  },
  {
    name: 'Premium Nordic',
    price: 'From ₹9.4 Lakhs',
    tag: 'Most Loved Choice',
    desc: 'Our flagship turnkey package featuring acrylic kitchen finishes, Blum hardware, and quartz counters.',
    features: [
      'Everything in Smart Essentials',
      'Anti-Fingerprint Acrylic or Matte PU Kitchen',
      'Blum Soft-Close Hinges & Lift-up Aventos',
      'Fluted Acoustic Panelling Highlights',
      'Quartz Countertops with Seamless Sink',
      'Bathroom Vanity Units & Mirrors',
      'Dedicated Site Project Manager',
    ],
  },
  {
    name: 'Luxe Bespoke',
    price: 'From ₹15.5 Lakhs',
    tag: 'Signature Luxury',
    desc: 'Full architectural redesign with natural wood veneers, Italian marble accents, and smart automation.',
    features: [
      'Everything in Premium Nordic',
      'Natural Smoked Wood Veneers with PU Finish',
      'Italian Marble Feature Walls & Accents',
      'Custom Solid Wood Joinery & Partitions',
      'Smart Lighting & Automation Provisioning',
      'Complete Deep Clean & Turnkey Styling',
    ],
  },
];

export default async function Template2Services({ params }: PageProps) {
  const { slug } = await params;
  const basePath = `/designwebsite/template2/${slug}`;

  const data = await readSourceConfig(slug, 'template2');
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
      tagline: detail?.tagline || 'Personalised to your floor plan and budget.',
      desc: detail?.description || getInteriorServiceSummary(svc),
      benefits: detail?.benefits?.slice(0, 4) || [
        'Custom 3D design & space planning',
        'BWP Marine Plywood construction',
        'Clear itemised BOQ quotation',
        'Coordinated site execution & styling',
      ],
      steps: detail?.process?.slice(0, 4) || [
        'Floor plan review & measurement',
        '3D photorealistic design signoff',
        'Automated factory fabrication',
        'On-site installation & deep clean',
      ],
      img:
        getServiceImage(svc, media) ||
        media.treatmentImages?.[idx] ||
        SERVICE_FALLBACK_IMAGES[idx % SERVICE_FALLBACK_IMAGES.length],
    };
  });

  const servicesFaqs: FAQItem[] = [
    {
      q: 'What is covered under your turnkey interior services?',
      a: 'We handle everything under a single contract: 3D concept designs, electrical & plumbing drawings, false ceiling & lighting, modular kitchen & wardrobe woodwork, wall finishes, and post-installation deep cleaning.',
      tag: 'Turnkey Scope',
    },
    {
      q: 'What are your payment milestones?',
      a: 'Payments are broken into transparent stages: 10% on initial booking & 3D design kickoff, 40% on 3D approval before factory production begins, 40% on material delivery at site, and the remaining 10% upon final inspection & keys handover.',
      tag: 'Milestones',
    },
    {
      q: 'Do you offer custom sizes for non-standard room layouts?',
      a: 'Yes. Every cabinet, wardrobe, and modular unit is custom-fabricated in our factory to your room’s exact millimeter dimensions, ensuring seamless zero-gap finishing.',
      tag: 'Custom Sizes',
    },
    {
      q: 'How do you guarantee a 45-day handover?',
      a: 'Because our woodwork is pre-fabricated with automated CNC machines in a controlled factory environment while civil site preparation runs simultaneously, we cut on-site assembly time down to just a few days.',
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
              Everything your home needs, <mark className="bg-[linear-gradient(transparent_62%,#fdeecb_62%)] text-[#0e5a43] px-0.5">under one roof</mark>
            </h1>
            <p className="mt-5 max-w-[580px] text-[#6b6660] text-[16.5px] leading-[1.7] font-medium">
              From single-room modular transformations to complete turnkey home interiors — {cleanName || 'our studio'} handles 3D design, certified materials, and punctual site execution in {city}.
            </p>
          </Reveal>
        </div>
      </section>

      {/* PACKAGES MATRIX */}
      <section className="px-6 py-[clamp(72px,8vw,110px)] bg-white border-b border-[#1b1b1b]/10">
        <div className="max-w-[1240px] mx-auto">
          <Reveal className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-flex items-center gap-2.5 text-[12px] font-extrabold tracking-[0.28em] uppercase text-[#0e5a43] mb-3 before:content-[''] before:w-7 before:h-[2.5px] before:rounded-full before:bg-[#f2a007] after:content-[''] after:w-7 after:h-[2.5px] after:rounded-full after:bg-[#f2a007]">
              Turnkey Packages
            </span>
            <h2 className="font-[family-name:var(--font-bricolage)] font-bold text-[clamp(28px,3.8vw,48px)] leading-[1.08] tracking-[-0.02em] mb-3">
              Fixed-price packages for every budget
            </h2>
            <p className="text-[#6b6660] text-[15px] font-medium">
              All packages include 100% moisture-resistant marine ply, German hardware, and a 10-year warranty.
            </p>
          </Reveal>

          <div className="grid lg:grid-cols-3 gap-7">
            {PACKAGES.map((pkg, idx) => (
              <Reveal key={pkg.name} delay={idx * 80}>
                <div className={`rounded-[26px] p-8 sm:p-9 h-full flex flex-col justify-between border-[2px] transition-all duration-300 ${
                  idx === 1
                    ? 'bg-[#faf7f1] border-[#0e5a43] shadow-[0_20px_50px_rgba(14,90,67,0.12)] relative'
                    : 'bg-white border-[#1b1b1b]/10 hover:border-[#0e5a43]/40'
                }`}>
                  {idx === 1 && (
                    <span className="absolute -top-3.5 right-6 bg-[#0e5a43] text-white text-[11px] font-extrabold uppercase px-3.5 py-1 rounded-full shadow-md">
                      {pkg.tag}
                    </span>
                  )}
                  <div>
                    <span className="text-[11px] font-extrabold tracking-wider uppercase text-[#0e5a43] block mb-2">
                      {pkg.tag}
                    </span>
                    <h3 className="font-[family-name:var(--font-bricolage)] font-bold text-[24px] text-[#1b1b1b] mb-1">
                      {pkg.name}
                    </h3>
                    <b className="font-[family-name:var(--font-bricolage)] font-bold text-[22px] text-[#0e5a43] block mb-4">
                      {pkg.price}
                    </b>
                    <p className="text-[13.5px] text-[#6b6660] font-medium leading-relaxed mb-6 pb-5 border-b border-[#1b1b1b]/10">
                      {pkg.desc}
                    </p>

                    <ul className="grid gap-2.5 mb-8">
                      {pkg.features.map((f) => (
                        <li key={f} className="flex items-start gap-2.5 text-[13.5px] text-[#1b1b1b] font-semibold">
                          <Check className="w-4 h-4 text-[#0e5a43] shrink-0 mt-0.5" strokeWidth={2.4} />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    href={`${basePath}/contact`}
                    className={`inline-flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-bold text-[13.5px] transition-all text-center ${
                      idx === 1
                        ? 'bg-[#0e5a43] text-white hover:bg-[#0a4232]'
                        : 'bg-[#faf7f1] text-[#1b1b1b] border border-[#1b1b1b]/15 hover:bg-[#1b1b1b] hover:text-white'
                    }`}
                  >
                    Select This Scope <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </Reveal>
            ))}
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
