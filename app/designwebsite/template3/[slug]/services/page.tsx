import { readSourceConfig } from '@/lib/dataBuilder';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Check, ArrowRight, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';
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
import Estimator from '../Estimator';
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
    tag: '35-Day Delivery',
    desc: 'Functional, high-durability woodwork with calibrated BWP marine ply, premium laminates, and soft-close hardware.',
    features: [
      'Modular Kitchen with tandem pull-outs',
      'Floor-to-ceiling wardrobes with lofts',
      'Designer living room TV unit & foyer',
      'Warm LED ambient false ceiling',
      'Asian Paints Royale finish',
      '10-Year Woodwork Warranty',
    ],
  },
  {
    name: 'Signature Turnkey',
    price: 'From ₹9.4 Lakhs',
    tag: 'Most Popular',
    desc: 'Our flagship turnkey residential service featuring acrylic kitchen finishes, Blum hardware, and quartz counters.',
    features: [
      'Everything in Smart Essentials',
      'Anti-fingerprint acrylic or PU kitchen finish',
      'Blum Aventos bi-fold lift-ups & hinges',
      'Fluted acoustic wall panelling accents',
      'Quartz countertop with under-mount sink',
      'Bathroom vanity units & glass partitions',
      'Dedicated project engineer on site',
    ],
  },
  {
    name: 'Bespoke Craft',
    price: 'From ₹15.5 Lakhs',
    tag: 'Complete Luxury',
    desc: 'Full architectural redesign with natural wood veneers, Italian marble highlights, and smart automation.',
    features: [
      'Everything in Signature Turnkey',
      'Natural smoked wood veneers with PU polish',
      'Italian marble wall & floor feature inlays',
      'Custom solid wood furniture & joinery',
      'Smart lighting & motorized automation provision',
      'Complete white-glove styling & deep clean',
    ],
  },
];

export default async function Template3Services({ params }: PageProps) {
  const { slug } = await params;
  const basePath = `/designwebsite/template3/${slug}`;

  const data = await readSourceConfig(slug, 'template3');
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
        'Custom 3D photoreal design',
        '100% Calibrated BWP marine ply',
        'Transparent itemised BOQ quotation',
        'Dedicated site engineer & 45-day handover',
      ],
      process: detail?.process?.slice(0, 4) || [
        'Spatial survey & measurement',
        '3D photoreal concept signoff',
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

      {/* PACKAGES */}
      <section className="px-7 py-[clamp(56px,7vw,88px)] bg-white border-b border-[#241f1a]/10">
        <div className="max-w-[1220px] mx-auto">
          <Reveal className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2.5 text-[12px] font-extrabold tracking-[0.22em] uppercase text-[#d8442c] mb-3 before:content-[''] before:w-6 before:h-[2.5px] before:rounded before:bg-[#d8442c] after:content-[''] after:w-6 after:h-[2.5px] after:rounded after:bg-[#d8442c]">
              Turnkey Tiers
            </div>
            <h2 className="text-[clamp(28px,3.8vw,46px)] font-extrabold tracking-[-0.02em]">
              Transparent turnkey packages
            </h2>
            <p className="text-[#6d6259] text-[15px] mt-2">
              Fixed pricing, BWP marine plywood, and 45-day guaranteed handover.
            </p>
          </Reveal>

          <div className="grid lg:grid-cols-3 gap-6">
            {PACKAGES.map((pkg, idx) => (
              <Reveal key={pkg.name} delay={idx * 80}>
                <div className={`border rounded-2xl p-7 sm:p-8 h-full flex flex-col justify-between transition-all ${
                  idx === 1
                    ? 'bg-[#fbf7f2] border-[#d8442c] shadow-[0_16px_40px_rgba(216,68,44,0.12)] relative'
                    : 'bg-white border-[#241f1a]/10 hover:border-[#d8442c]/40'
                }`}>
                  {idx === 1 && (
                    <span className="absolute -top-3 right-6 bg-[#d8442c] text-white text-[10.5px] font-extrabold uppercase px-3 py-0.5 rounded-full">
                      {pkg.tag}
                    </span>
                  )}
                  <div>
                    <span className="text-[11px] font-extrabold tracking-wider uppercase text-[#d8442c] block mb-1">
                      {pkg.tag}
                    </span>
                    <h3 className="text-[22px] font-extrabold text-[#1d1713] mb-1">{pkg.name}</h3>
                    <b className="text-[20px] font-extrabold text-[#d8442c] block mb-3">{pkg.price}</b>
                    <p className="text-[13.5px] text-[#6d6259] font-medium leading-relaxed mb-6 pb-5 border-b border-[#241f1a]/10">
                      {pkg.desc}
                    </p>

                    <ul className="grid gap-2.5 mb-7">
                      {pkg.features.map((f) => (
                        <li key={f} className="flex items-start gap-2.5 text-[13.5px] text-[#1d1713] font-semibold">
                          <Check className="w-4 h-4 text-[#d8442c] shrink-0 mt-0.5" strokeWidth={2.4} />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    href={`${basePath}/contact`}
                    className={`inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-extrabold text-[13px] transition-all text-center ${
                      idx === 1
                        ? 'bg-[#d8442c] text-white hover:bg-[#b93320]'
                        : 'bg-[#fbf7f2] text-[#1d1713] border border-[#241f1a]/15 hover:bg-[#1d1713] hover:text-white'
                    }`}
                  >
                    Select This Package <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
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

      {/* ESTIMATOR */}
      <section id="estimator" className="px-7 py-[clamp(56px,7vw,88px)] bg-white border-y border-[#241f1a]/10">
        <div className="max-w-[1220px] mx-auto">
          <Reveal>
            <Estimator contactPath={`${basePath}/contact`} />
          </Reveal>
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
