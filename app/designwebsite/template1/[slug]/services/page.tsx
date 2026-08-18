import { readSourceConfig } from '@/lib/dataBuilder';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Check, CheckCircle2, Layers, ShieldCheck, Clock, FileText, Sparkles, ArrowRight } from 'lucide-react';
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
    tier: 'Essential Living',
    tag: 'Functional Elegance',
    price: 'From ₹6.5L',
    desc: 'Perfect for contemporary apartment interiors with durable branded materials and fast delivery.',
    features: [
      'Modular Kitchen with Tandem Drawers',
      'Floor-to-Ceiling Wardrobes with Lofts',
      'Designer TV Unit & Foyer Wall Niche',
      'LED Ambient False Ceiling & Cove Lights',
      'Calibrated BWP Marine Ply & Anti-Scratch Laminates',
      '10-Year Structural Woodwork Warranty',
      '40-45 Days Handover Guarantee',
    ],
  },
  {
    tier: 'Signature Luxe',
    tag: 'Most Popular',
    price: 'From ₹9.8L',
    desc: 'Our flagship turnkey residential service combining acrylic/PU finishes, smart storage, and ambient lighting.',
    features: [
      'Everything in Essential Living',
      'Anti-Fingerprint Acrylic or Matte PU Kitchen',
      'Blum Aventos Bi-fold Lift-ups & Soft-Close',
      'Fluted Acoustic Panelling & Veneer Highlights',
      'Quartz Countertops with Under-Mount Sink',
      'Custom Vanity Units & Bathroom Glass Partitions',
      'Dedicated Interior Architect on Site',
      '45-55 Days Handover Guarantee',
    ],
  },
  {
    tier: 'Bespoke Atelier',
    tag: 'Ultra Luxury',
    price: 'From ₹16.5L',
    desc: 'Complete architectural interior transformations with Italian marble inlays, natural veneers, and home automation.',
    features: [
      'Everything in Signature Luxe',
      'Natural Smoked Wood Veneers with PU Polish',
      'Italian Marble Floor & Wall Feature Accents',
      'Custom Solid Wood Joinery & Furniture',
      'Smart Mood Lighting & Motorized Curtain Automation',
      'Full Civil, Plumbing & Electrical Overhauls',
      'Complete White-Glove Styling & Deep Clean',
      'Lifetime Hardware & 10-Year Wood Warranty',
    ],
  },
];

export default async function Template1Services({ params }: PageProps) {
  const { slug } = await params;
  const basePath = `/designwebsite/template1/${slug}`;

  const data = await readSourceConfig(slug, 'template1');
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
      desc: detail?.description || getInteriorServiceSummary(svc),
      tagline: detail?.tagline || 'A personalized design service shaped around your home.',
      benefits: detail?.benefits?.slice(0, 4) || [
        'Personalized 3D design & space audit',
        'Curated BWP marine ply & premium finishes',
        'Clear itemised bill of quantities (BOQ)',
        'Dedicated site engineer & punctual handover',
      ],
      process: detail?.process || [
        'Spatial Measurement & Client Brief',
        'Photorealistic 3D Concept Review',
        'Factory Precision Joinery Fabrication',
        'On-site White-Glove Installation & Styling',
      ],
      img:
        getServiceImage(svc, media) ||
        media.treatmentImages?.[idx] ||
        SERVICE_FALLBACK_IMAGES[idx % SERVICE_FALLBACK_IMAGES.length],
    };
  });

  const servicesFaqs: FAQItem[] = [
    {
      q: 'What is included in a turnkey interior package?',
      a: 'Our turnkey service covers end-to-end design, 3D photoreal renders, MEP (electrical and plumbing) drawings, factory-manufactured modular woodwork, false ceilings, lighting fixtures, civil modifications, painting, deep cleaning, and final styling.',
      tag: 'Turnkey Scope',
    },
    {
      q: 'How are payment milestones structured?',
      a: 'We operate on transparent milestone stages linked to tangible project progress: 10% on booking & design kickoff, 40% upon 3D approval before factory production, 40% upon material delivery at site, and the final 10% on quality inspection and handover.',
      tag: 'Payments',
    },
    {
      q: 'Can we retain or modify existing civil structures?',
      a: 'Yes. Our senior architects assess structural walls and plumbing alignments during the site audit, advising on civil alterations, partition removals, or layout optimisations to maximize natural ventilation and light.',
      tag: 'Civil Scope',
    },
    {
      q: 'How do you handle changes requested midway through construction?',
      a: 'Any revisions are documented immediately with clear timeline and cost addendums for your written approval before execution. We ensure zero surprise bills at the end of the project.',
      tag: 'Revisions',
    },
  ];

  return (
    <div>
      {/* PAGE HERO */}
      <section id="services-hero" className="bg-[#211a13] text-white px-6 lg:px-7 py-[clamp(70px,8vw,110px)]">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <span className="flex items-center gap-3.5 text-[12px] tracking-[0.38em] uppercase text-[#c9ab7c] mb-5 before:content-[''] before:w-10 before:h-px before:bg-[#c9ab7c]">
              Turnkey Disciplines
            </span>
            <h1 className="font-[family-name:var(--font-marcellus)] text-[clamp(38px,5vw,68px)] leading-[1.08] max-w-[800px]">
              End-to-end interior services, <em className="not-italic italic font-light text-[#c9ab7c]">under one roof</em>
            </h1>
            <p className="mt-6 max-w-[600px] text-[16.5px] font-light leading-[1.75] text-white/80">
              One unified team from architectural concept to key handover — spatial planning, factory woodwork, MEP engineering, and styling with {cleanName || 'our studio'} in {city}.
            </p>
          </Reveal>
        </div>
      </section>

      {/* PACKAGES MATRIX */}
      <section className="py-[clamp(84px,9vw,120px)] px-6 lg:px-7 bg-[#fdfbf6] border-b border-[#211a13]/10">
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-flex items-center gap-3.5 text-[12px] tracking-[0.38em] uppercase text-[#a58150] mb-4 before:content-[''] before:w-10 before:h-px before:bg-[#a58150] after:content-[''] after:w-10 after:h-px after:bg-[#a58150]">
              Turnkey Tiers
            </span>
            <h2 className="font-[family-name:var(--font-marcellus)] text-[clamp(32px,4vw,52px)] leading-[1.12] mb-4">
              Curated packages tailored to <em className="not-italic italic font-light text-[#a58150]">your vision</em>
            </h2>
            <p className="text-[#7d7264] font-light text-[15.5px]">
              Fully itemised estimates with frozen prices, branded hardware, and guaranteed completion schedules.
            </p>
          </Reveal>

          <div className="grid lg:grid-cols-3 gap-8">
            {PACKAGES.map((pkg, idx) => (
              <Reveal key={pkg.tier} delay={idx * 90}>
                <div className={`p-8 sm:p-10 h-full flex flex-col justify-between border transition-all duration-300 ${
                  idx === 1
                    ? 'bg-[#211a13] text-white border-[#a58150] shadow-[0_20px_50px_rgba(33,26,19,0.25)] relative'
                    : 'bg-[#f6f1e8] text-[#211a13] border-[#211a13]/10 hover:border-[#a58150]'
                }`}>
                  {idx === 1 && (
                    <span className="absolute -top-3.5 right-8 bg-[#a58150] text-white text-[10px] tracking-[0.2em] uppercase px-3 py-1 font-semibold">
                      {pkg.tag}
                    </span>
                  )}
                  <div>
                    <span className={`text-[11px] tracking-[0.25em] uppercase block mb-2 ${idx === 1 ? 'text-[#c9ab7c]' : 'text-[#a58150]'}`}>
                      {pkg.tag}
                    </span>
                    <h3 className="font-[family-name:var(--font-marcellus)] text-[26px] mb-2 leading-tight">
                      {pkg.tier}
                    </h3>
                    <b className={`font-[family-name:var(--font-marcellus)] text-[22px] block mb-4 ${idx === 1 ? 'text-[#c9ab7c]' : 'text-[#a58150]'}`}>
                      {pkg.price}
                    </b>
                    <p className={`text-[13.5px] font-light leading-[1.65] mb-8 pb-6 border-b ${idx === 1 ? 'text-white/75 border-white/15' : 'text-[#7d7264] border-[#211a13]/10'}`}>
                      {pkg.desc}
                    </p>

                    <ul className="grid gap-3 mb-8">
                      {pkg.features.map((feat) => (
                        <li key={feat} className="flex items-start gap-3 text-[13.5px] font-light leading-snug">
                          <Check className={`w-4 h-4 shrink-0 mt-0.5 ${idx === 1 ? 'text-[#c9ab7c]' : 'text-[#a58150]'}`} />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    href={`${basePath}/contact`}
                    className={`inline-flex items-center justify-center gap-2 py-4 px-6 text-[12px] tracking-[0.2em] uppercase font-medium transition-colors duration-300 text-center ${
                      idx === 1
                        ? 'bg-[#a58150] text-white border border-[#a58150] hover:bg-white hover:text-[#211a13] hover:border-white'
                        : 'bg-transparent text-[#211a13] border border-[#211a13] hover:bg-[#211a13] hover:text-white'
                    }`}
                  >
                    Select This Package <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES DETAILED LIST */}
      <section id="services-list" className="py-[clamp(84px,9vw,130px)] px-6 lg:px-7">
        <div className="max-w-7xl mx-auto flex flex-col gap-[clamp(64px,7vw,100px)]">
          {services.map((svc, idx) => (
            <Reveal key={svc.title}>
              <div className={`grid lg:grid-cols-2 gap-[clamp(36px,5vw,72px)] items-center`}>
                <div className={`relative ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="relative before:content-[''] before:absolute before:-left-3.5 before:-top-3.5 before:right-12 before:bottom-12 before:border before:border-[#a58150]">
                    <div className="overflow-hidden aspect-[4/3.1] group">
                      <img
                        src={svc.img}
                        alt={svc.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(.19,1,.22,1)] group-hover:scale-[1.04]"
                      />
                    </div>
                  </div>
                  <span
                    className="absolute -bottom-6 right-4 font-[family-name:var(--font-marcellus)] text-[80px] leading-none text-transparent select-none"
                    style={{ WebkitTextStroke: '1px #a58150' }}
                  >
                    0{idx + 1}
                  </span>
                </div>

                <div className={idx % 2 === 1 ? 'lg:order-1' : ''}>
                  <span className="flex items-center gap-3.5 text-[12px] tracking-[0.38em] uppercase text-[#a58150] mb-4 before:content-[''] before:w-10 before:h-px before:bg-[#a58150]">
                    Service Discipline 0{idx + 1}
                  </span>
                  <h2 className="font-[family-name:var(--font-marcellus)] text-[clamp(28px,3.2vw,44px)] leading-[1.12] mb-3">
                    {svc.title}
                  </h2>
                  <p className="font-light italic text-[#a58150] text-[16px] mb-5">{svc.tagline}</p>
                  <p className="text-[#7d7264] leading-[1.85] font-light text-[15.5px] mb-7">{svc.desc}</p>

                  <div className="mb-7">
                    <span className="text-[12px] tracking-[0.18em] uppercase text-[#211a13] font-medium block mb-3">
                      Key Inclusions:
                    </span>
                    <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3.5">
                      {svc.benefits.map((b: string) => (
                        <li key={b} className="flex items-start gap-3 text-[14px] font-light text-[#211a13]">
                          <span className="w-6 h-6 shrink-0 border border-[#a58150] grid place-items-center mt-0.5">
                            <Check className="w-3.5 h-3.5 text-[#a58150]" strokeWidth={2} />
                          </span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    href={`${basePath}/contact`}
                    className="inline-flex items-center gap-3 text-[12.5px] tracking-[0.2em] uppercase font-medium text-[#211a13] border-b border-[#a58150] pb-1.5 hover:text-[#a58150] transition-colors"
                  >
                    Discuss Scope for This Service &rarr;
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <PageNarrative page="services" studioName={cleanName} city={city} />

      {/* SERVICES FAQ */}
      <section className="py-[clamp(84px,9vw,120px)] px-6 lg:px-7 bg-[#fdfbf6] border-t border-[#211a13]/10">
        <div className="max-w-4xl mx-auto">
          <Reveal className="text-center mb-12">
            <span className="inline-flex items-center gap-3.5 text-[12px] tracking-[0.38em] uppercase text-[#a58150] mb-4 before:content-[''] before:w-10 before:h-px before:bg-[#a58150] after:content-[''] after:w-10 after:h-px after:bg-[#a58150]">
              Service Questions
            </span>
            <h2 className="font-[family-name:var(--font-marcellus)] text-[clamp(30px,3.6vw,48px)] leading-[1.12] mb-3">
              Common questions on <em className="not-italic italic font-light text-[#a58150]">execution &amp; scope</em>
            </h2>
            <p className="text-[#7d7264] font-light text-[15px]">
              How we coordinate site work, quality control, and warranty assurances.
            </p>
          </Reveal>

          <Reveal>
            <FAQAccordion items={servicesFaqs} />
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section id="services-cta" className="bg-[#211a13] text-white px-6 lg:px-7 py-[clamp(70px,8vw,100px)]">
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <h2 className="font-[family-name:var(--font-marcellus)] text-[clamp(30px,3.8vw,50px)] leading-[1.12] mb-6">
              Not sure where to start? <em className="not-italic italic font-light text-[#c9ab7c]">Start with a conversation.</em>
            </h2>
            <p className="text-white/75 font-light leading-[1.8] mb-9 text-[16px]">
              Tell us about your rooms, your target budget, and your possession timeline — we&rsquo;ll map the right architectural scope for your home in one free consultation session.
            </p>
            <Link
              href={`${basePath}/contact`}
              className="inline-flex items-center gap-2 bg-[#a58150] text-white px-5 py-3 sm:px-6 sm:py-3.5 text-[10.5px] sm:text-[11.5px] tracking-[0.2em] uppercase font-medium border border-[#a58150] hover:bg-white hover:text-[#211a13] hover:border-white transition-colors duration-300"
            >
              Contact Us
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
