import { readSourceConfig } from '@/lib/dataBuilder';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Check, CheckCircle2, Layers, ShieldCheck, Clock, FileText, Sparkles, ArrowRight } from 'lucide-react';
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
import ScopeEstimator from '../ScopeEstimator';
import FAQAccordion, { FAQItem } from '../FAQAccordion';

type PageProps = { params: Promise<{ slug: string }> };

const SERVICE_FALLBACK_IMAGES = [
  '/images/architecture/villa-before-frame.webp',
  '/images/architecture/bim-3d-walkthrough.webp',
  '/images/architecture/cmda-sanction-drafting.webp',
  '/images/architecture/staad-structural-engineering.webp',
  '/images/architecture/courtyard-water-residence.webp',
  '/images/architecture/structural-construction-frame.webp',
];

const PACKAGES = [
  {
    tier: '3D Elevation & CMDA Approval Plan',
    tag: 'Design & Approvals',
    price: 'From ₹1.5L',
    desc: 'Realistic 3D exterior elevations, 100% Vaastu floor plans, and complete CMDA / Chennai Corporation plan approval filings.',
    features: [
      'Plot measurement and boundary setback study',
      '100% Vaastu compliant architectural floor plans',
      'Realistic 3D exterior elevations with day & night views',
      'Complete CMDA / GCC sanction plan drawings',
      'Rainwater harvesting and percolation pit layout',
      'Preliminary item-by-item construction cost estimate',
      'Government single-window portal submission support',
    ],
  },
  {
    tier: 'Complete Architectural & Structural Suite',
    tag: 'Most Popular',
    price: 'From ₹3.5L',
    desc: 'Full set of working drawings for construction: structural RCC columns, beams, electrical, and plumbing layouts.',
    features: [
      'Everything in 3D Elevation & CMDA Approval Plan',
      'STAAD-analyzed RCC structural drawings and column details',
      'Tata Tiscon steel bar bending schedules',
      'Complete electrical point layout and conduit planning',
      'Plumbing lines, septic tank, and water sump drawings',
      'Door, window, and joinery fabrication specifications',
      'Regular site engineer inspections at critical stages',
      'Direct coordination with your building contractor',
    ],
  },
  {
    tier: 'Turnkey Construction (Villas & Buildings)',
    tag: 'Full Execution',
    price: 'From ₹2,400/sq.ft',
    desc: 'End-to-end turnkey construction for luxury villas, residences, and commercial spaces with Tata Tiscon steel, UltraTech cement, and a 10-year warranty.',
    features: [
      'Complete architectural & structural drawings included',
      'Soil test matched foundation (Bored RCC Piles / Footings)',
      'Primary Tata Tiscon Fe550D steel & UltraTech Grade-53 cement',
      'Raised plinth height (3 to 4 feet) for complete flood protection',
      'Complete electrical, plumbing, flooring, and exterior finishes',
      'Weekly progress photo updates shared with clients',
      'Fixed cost guarantee with zero mid-construction price increase',
      '10-year structural warranty certificate upon key handover',
    ],
  },
];

export default async function Template11Services({ params }: PageProps) {
  const { slug } = await params;
  const basePath = `/designwebsite/template11/${slug}`;

  const data = await readSourceConfig(slug, 'template11');
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
      desc: detail?.description || getArchitectureServiceSummary(svc),
      tagline: detail?.tagline || 'Planned for your plot, your family, and your budget.',
      benefits: detail?.benefits?.slice(0, 4) || [
        'Free site visit & plot study',
        'Certified structural drawings',
        '100% government rule compliance',
        'Daily site supervision',
      ],
      process: detail?.process || [
        'Site visit and family requirement discussion',
        '3D design, floor plans & structural drawings',
        'Government plan approval submission',
        'Construction with quality checks at every stage',
      ],
      img:
        getArchitectureServiceImage(svc, media) ||
        media.treatmentImages?.[idx] ||
        SERVICE_FALLBACK_IMAGES[idx % SERVICE_FALLBACK_IMAGES.length],
    };
  });

  const servicesFaqs: FAQItem[] = [
    {
      q: 'What is included in a turnkey construction package?',
      a: 'Everything: architectural floor plans, 3D elevation, structural drawings, CMDA/GCC plan approval, primary steel (Tata Tiscon), Grade-53 cement, labor, plumbing, electrical, and full site supervision until key handover.',
      tag: 'Turnkey Scope',
    },
    {
      q: 'Do you design and construct commercial buildings as well as villas?',
      a: 'Yes. We design and build luxury villas, independent residences, and commercial office complexes. For commercial buildings, we optimize usable floor space (FSI), parking layout, and fire safety clearances alongside modern facade aesthetics.',
      tag: 'Commercial & Villas',
    },
    {
      q: 'How are payments spread across the project milestones?',
      a: 'You pay in transparent stages linked directly to verified site progress: initial design, plan approval submission, foundation casting, lintel, roof slab casting, brickwork, and finishing. The final balance is paid only at key handover.',
      tag: 'Payments',
    },
    {
      q: 'Can we renovate or add additional floors to an existing structure?',
      a: 'Yes. Our licensed structural engineers inspect the existing foundation and column load capacity first, verify statutory setback norms, and prepare structural reinforcement plans before executing any vertical extension.',
      tag: 'Civil Scope',
    },
  ];

  return (
    <div>
      {/* PAGE HERO */}
      <section id="services-hero" className="bg-[#211a13] text-white px-6 lg:px-7 py-[clamp(70px,8vw,110px)]">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <span className="flex items-center gap-3.5 text-[12px] tracking-[0.38em] uppercase text-[#c9ab7c] mb-5 before:content-[''] before:w-10 before:h-px before:bg-[#c9ab7c]">
              Our Services
            </span>
            <h1 className="font-[family-name:var(--font-marcellus)] text-[clamp(38px,5vw,68px)] leading-[1.08] max-w-[800px]">
              All the help you need, <em className="not-italic italic font-light text-[#c9ab7c]">in one place</em>
            </h1>
            <p className="mt-6 max-w-[600px] text-[16.5px] font-light leading-[1.75] text-white/80">
              One team handles everything from first drawing to key handover — floor plans, approvals, construction, and finishes in {city}.
            </p>
          </Reveal>
        </div>
      </section>

      {/* INTERACTIVE SCOPE ESTIMATOR */}
      <section id="interactive-scope" className="py-[clamp(84px,9vw,130px)] px-6 lg:px-7 bg-[#211a13]">
        <div className="max-w-7xl mx-auto">
          <ScopeEstimator basePath={basePath} city={city} />
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
                    Service 0{idx + 1}
                  </span>
                  <h2 className="font-[family-name:var(--font-marcellus)] text-[clamp(28px,3.2vw,44px)] leading-[1.12] mb-3">
                    {svc.title}
                  </h2>
                  <p className="font-light italic text-[#a58150] text-[16px] mb-5">{svc.tagline}</p>
                  <p className="text-[#7d7264] leading-[1.85] font-light text-[15.5px] mb-7">{svc.desc}</p>

                  <div className="mb-7">
                    <span className="text-[12px] tracking-[0.18em] uppercase text-[#211a13] font-medium block mb-3">
                      What's Included:
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
                    Enquire About This Service &rarr;
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
              Common questions about <em className="not-italic italic font-light text-[#a58150]">work &amp; payments</em>
            </h2>
            <p className="text-[#7d7264] font-light text-[15px]">
              How we manage site work, quality checks, and warranty support.
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
              Not sure where to start? <em className="not-italic italic font-light text-[#c9ab7c]">Just talk to us.</em>
            </h2>
            <p className="text-white/75 font-light leading-[1.8] mb-9 text-[16px]">
              Tell us about your family's needs, your budget, and when you want to move in — we&rsquo;ll suggest the right plan for your home in one free consultation.
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
