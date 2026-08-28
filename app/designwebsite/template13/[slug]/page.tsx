import { readSourceConfig } from '@/lib/dataBuilder';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, ClipboardCheck, ShieldCheck, Check, X, Clock, Sparkles, Layers } from 'lucide-react';
import {
  cleanClinicName,
  cleanArchitectureTagline,
  cleanArchitectureDescription,
  cleanArchitectureServices,
  cleanArchitectureHighlights,
} from '@/lib/copyCleaner';
import {
  DEFAULT_ARCHITECTURE_REVIEWS,
  DEFAULT_ARCHITECTURE_SERVICES,
  getArchitectureServiceData,
  getArchitectureServiceImage,
  ARCHITECTURE_STOCK,
  previewMedia,
} from '@/lib/architectureContent';
import Reveal from './Reveal';
import LeadForm from './LeadForm';
import BeforeAfter from './BeforeAfter';
import PackagesSection from './PackagesSection';
import FAQAccordion, { FAQItem } from './FAQAccordion';
import HeroStats, { HeroStat } from './HeroStats';
import CountUp from '@/components/CountUp';

type PageProps = { params: Promise<{ slug: string }> };

const OFFERING_FALLBACK_IMAGES = [
  '/images/architecture/civic-landmark-facade.webp',
  '/images/architecture/courtyard-water-residence.webp',
  '/images/architecture/modern-villa-duplex.webp',
  '/images/architecture/monolithic-brutalist-facade.webp',
  '/images/architecture/porotherm-clay-facade.webp',
  '/images/architecture/villa-after-finished.webp',
];

const PROJECT_FALLBACK_IMAGES = [
  '/images/architecture/hero-villa-twilight.webp',
  '/images/architecture/modern-villa-duplex.webp',
  '/images/architecture/monolithic-brutalist-facade.webp',
  '/images/architecture/civic-landmark-facade.webp',
  '/images/architecture/porotherm-clay-facade.webp',
  '/images/architecture/villa-after-finished.webp',
];

const PROCESS = [
  { num: 1, title: 'Plot Inspection & Discussion', desc: 'Book a consultation on your plot or at our studio to review plot size, road width, and municipal rules.' },
  { num: 2, title: 'Sunlight & Vaastu Planning', desc: 'Our team analyzes sunlight angles, wind flow, and 100% Vaastu directional alignment for every room.' },
  { num: 3, title: '3D Elevation & Fixed Estimate', desc: 'Detailed 3D exterior elevation views, realistic walkthroughs, and a fixed itemised cost estimate with no hidden costs.' },
  { num: 4, title: 'CMDA & Municipal Approvals', desc: 'Complete building plan sanction preparation and submission through the government single-window portal.' },
  { num: 5, title: 'Quality Construction & Daily Oversight', desc: 'Soil-tested foundations, Tata Tiscon steel, UltraTech cement, and daily civil engineer supervision.' },
  { num: 6, title: 'Key Handover & 10-Year Warranty', desc: 'Final 300-point inspection, keys handover, and an official 10-year structural warranty certificate.' },
];

const COMPARISON_POINTS = [
  { feature: 'Construction Contract', studio: 'Fixed price contract with item-by-item material list', contractor: 'Vague lump-sum quotes leading to 20-30% cost overruns' },
  { feature: 'Engineering Standards', studio: 'Engineered drawings with tested concrete cube strength reports', contractor: 'Uncalculated thumb-rule estimates with zero structural checks' },
  { feature: 'Steel & Concrete Brands', studio: 'Primary Tata Tiscon Fe550D steel & UltraTech Grade-53 cement', contractor: 'Uncertified secondary steel and local unbranded cement' },
  { feature: 'CMDA & Corporation Approval', studio: '100% legal building permit with zero setback violation risk', contractor: 'Unapproved deviations risking corporation stop-work notices' },
  { feature: 'Structural Warranty', studio: '10-Year Comprehensive Structural Warranty Certificate', contractor: 'No legal guarantee or support once final payment is made' },
];

const CONSULTATION_OUTPUTS = [
  {
    icon: ClipboardCheck,
    number: '01',
    title: 'Plot & Municipal Rules Check',
    desc: 'We calculate exact legal built-up area (FSI), required front and side setbacks, and road width ratios.',
  },
  {
    icon: Layers,
    number: '02',
    title: 'Room Layout & Vaastu Harmony',
    desc: 'Explore optimal room placement—pooja room, kitchen, and bedrooms aligned with Vaastu and natural daylight.',
  },
  {
    icon: Sparkles,
    number: '03',
    title: 'Modern Villa & House Design',
    desc: 'We design modern elevations with large windows, covered parking, open verandas, and flood-safe raised plinths.',
  },
];

export default async function Template13Home({ params }: PageProps) {
  const { slug } = await params;
  const basePath = `/designwebsite/template13/${slug}`;

  const data = await readSourceConfig(slug, 'template13');
  if (!data) return notFound();

  const { clinic, business, doctor } = data;

  const media = previewMedia(data.media);

  const cleanName = cleanClinicName(clinic.name);
  const city = clinic.address?.city || 'Chennai';
  const cleanDesc = cleanArchitectureDescription(clinic.description, clinic.name, city);
  const cleanTagline = cleanArchitectureTagline(clinic.tagline);
  const phone = clinic.contact?.phone || '';
  const waPhone = phone.replace(/\D/g, '') || '919751396117';
  const rating = business.rating || '4.9';
  const reviewCount = parseInt(String(business.reviewCount || '').replace(/\D/g, ''), 10) || 120;
  const experienceYears = doctor?.experience?.replace(/\D/g, '') || '14';
  const servicesList: string[] = cleanArchitectureServices(business.services, DEFAULT_ARCHITECTURE_SERVICES);
  const servicesCount = servicesList.length || 6;

  const heroImage =
    media.clinicImages?.[0] ||
    '/images/architecture/hero-villa-twilight.webp';
  const baPlan = '/images/architecture/villa-plan-sketch.webp';
  const baBefore = '/images/architecture/villa-before-frame.webp';
  const baAfter = '/images/architecture/villa-after-finished.webp';

  const reviews = data.reviews?.length ? data.reviews : DEFAULT_ARCHITECTURE_REVIEWS;

  const offerings = servicesList.slice(0, 6).map((svc: string, idx: number) => {
    const detail = getArchitectureServiceData(svc);
    return {
      title: svc,
      sub: detail?.tagline || 'Single-contract turnkey execution with itemised BOQ and 10-year warranty',
      img: media.treatmentImages?.[idx] || media.otherImages?.[6 + idx] || getArchitectureServiceImage(svc, media) || OFFERING_FALLBACK_IMAGES[idx % OFFERING_FALLBACK_IMAGES.length],
    };
  });

  const projectImages = [
    ...(media.treatmentImages || []).slice(2),
    ...(media.clinicImages || []).slice(1),
    ...(media.otherImages || []).slice(6),
  ].filter(Boolean);
  const projects = (projectImages.length >= 6 ? projectImages.slice(0, 6) : PROJECT_FALLBACK_IMAGES).map(
    (img: string, idx: number) => ({
      img,
      tag: ['Modern Luxury Villa', 'Independent Residence', 'Commercial Complex', 'Traditional Courtyard Home', 'Contemporary Duplex', 'Modern Villa'][idx % 6],
      title: `Project ${String(idx + 1).padStart(2, '0')} — ${city}`,
      sub: `Turnkey construction by ${cleanName || 'our team'}`,
    })
  );

  const homeFaqs: FAQItem[] = [
    {
      q: `How does ${cleanName || 'our atelier'} ensure 0% cost escalation on civil builds?`,
      a: 'We prepare a legally frozen Bill of Quantities (BOQ) covering structural RCC, rebar tonnage, double glazing, and masonry before breaking ground. We guarantee 0% cost escalation on approved blueprints.',
      tag: 'Turnkey Delivery',
    },
    {
      q: 'Can we visit your architectural atelier and review material mockups?',
      a: `Yes! Our atelier in ${city} features physical mockups: board-marked concrete samples, double-glazed Low-E panels, natural stone facades, and 3D printed architectural massing models.`,
      tag: 'Atelier Visit',
    },
    {
      q: 'What is included in your 10-year structural warranty?',
      a: 'Our 10-year warranty covers deep RCC foundation integrity, load-bearing columns and beams, moisture barrier membranes, and roof slab waterproofing.',
      tag: 'Warranty',
    },
    {
      q: 'How does the preliminary plot and zoning consultation work?',
      a: 'Our architects review your plot survey, calculate statutory FSI/FAR limits and setback rules, and present preliminary volumetric massing models.',
      tag: 'Consultation',
    },
  ];

  const heroStats: HeroStat[] = [
    {
      value: rating,
      decimals: 1,
      suffix: '★',
      label: 'Patron Rating',
      sublabel: `${reviewCount}+ verified reviews`,
      icon: 'star',
    },
    {
      value: experienceYears,
      suffix: '+ Yrs',
      label: 'Architectural Practice',
      sublabel: `Atelier in ${city}`,
      icon: 'award',
    },
    {
      value: servicesCount,
      suffix: '+',
      label: 'Disciplines',
      sublabel: 'BIM & Turnkey',
      icon: 'layers',
    },
    {
      value: Math.max(reviewCount, 50),
      suffix: '+',
      label: 'Delivered Landmarks',
      sublabel: '10-Year RCC Warranty',
      icon: 'shield',
    },
  ];

  return (
    <div>
      {/* HERO */}
      <section id="hero" className="relative min-h-[92vh] flex items-end text-white overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt={`${cleanName || 'Studio'} architecture`} className="w-full h-full object-cover" fetchPriority="high" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,14,10,0.38)_0%,rgba(20,14,10,0.6)_45%,rgba(20,14,10,0.94)_100%)]" />
        </div>

        <div className="relative max-w-[1220px] mx-auto px-7 w-full pt-[120px] pb-[70px] lg:pb-[90px]">
          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-16 items-end">
            <Reveal>
              <p className="font-[family-name:var(--font-newsreader)] italic text-[clamp(28px,3.5vw,40px)] text-[#f4b942] leading-none mb-4">
                {cleanName || 'Architectural Atelier'} · {city}
              </p>
              <h1 className="text-[clamp(40px,5.6vw,68px)] font-extrabold leading-[1.08] tracking-[-0.02em] max-w-[660px]">
                {cleanTagline}
              </h1>
              <p className="mt-5 text-[17px] text-white/85 max-w-[500px] leading-relaxed">
                {cleanDesc}
              </p>
              <div className="mt-8 flex flex-wrap gap-3.5">
                <Link
                  href={`${basePath}/contact`}
                  className="inline-flex items-center gap-2 bg-[#d8442c] text-white font-extrabold text-[15px] px-7 py-3.5 rounded-xl hover:bg-[#b93320] hover:-translate-y-0.5 transition-all duration-250 shadow-lg"
                >
                  Book Consultation
                </Link>
                <Link
                  href={`${basePath}/gallery`}
                  className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white font-bold text-[15px] px-7 py-3.5 rounded-xl border border-white/25 hover:bg-white/20 transition-all duration-250"
                >
                  View Completed Projects
                </Link>
              </div>
            </Reveal>

            {/* Quick trust card */}
            <Reveal delay={120}>
              <div className="bg-[#1d1713]/85 backdrop-blur-xl border border-white/15 rounded-2xl p-7 text-white">
                <div className="text-[11px] font-extrabold tracking-[0.2em] uppercase text-[#f4b942] mb-3">
                  The {cleanName || 'Atelier'} Commitment
                </div>
                <div className="grid gap-3.5">
                  {[
                    '100% Municipal Plan Sanction Guarantee',
                    'Primary Fe550D Steel & Grade-53 Concrete',
                    'Fixed Cost Contract with 0% Escalation',
                    '10-Year Structural RCC Warranty Certificate',
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3 text-[14px] font-semibold text-white/90">
                      <span className="w-5 h-5 rounded-full bg-[#d8442c] grid place-items-center shrink-0">
                        <Check className="w-3 h-3 text-white stroke-[3]" />
                      </span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* DEDICATED HERO NUMBERS SECTION */}
      <section className="bg-[#1d1713] text-white py-12 px-7 border-b border-white/10">
        <div className="max-w-[1220px] mx-auto">
          <HeroStats stats={heroStats} />
        </div>
      </section>

      {/* REAL TRANSFORMATION (BEFORE/AFTER) - SINGLE COLUMN IMMERSIVE */}
      <section className="py-[clamp(64px,7vw,96px)] px-7 bg-white border-y border-[#241f1a]/10">
        <div className="max-w-[1100px] mx-auto text-center">
          <Reveal className="max-w-2xl mx-auto mb-10">
            <span className="inline-flex items-center gap-2.5 text-[12px] font-extrabold tracking-[0.22em] uppercase text-[#d8442c] mb-4 before:content-[''] before:w-6 before:h-[2.5px] before:rounded before:bg-[#d8442c] after:content-[''] after:w-6 after:h-[2.5px] after:rounded after:bg-[#d8442c]">
              Real Transformation
            </span>
            <h2 className="text-[clamp(28px,3.6vw,44px)] font-extrabold mb-4 tracking-[-0.02em]">
              From plan sketch to a <span className="font-[family-name:var(--font-newsreader)] italic font-medium text-[#d8442c]">completed project</span>
            </h2>
            <p className="text-[#6d6259] text-[15.5px] leading-relaxed">
              See how our architectural blueprints, structural engineering, and precision construction transform a 2D plan sketch into a luminous, climate-responsive completed landmark.
            </p>
          </Reveal>

          <Reveal delay={100} className="w-full">
            <BeforeAfter
              beforeImage={baPlan}
              afterImage={baAfter}
              caption="Drag slider to compare 2D plan sketch vs completed project"
            />
          </Reveal>

          <Reveal delay={200} className="mt-9 flex flex-wrap items-center justify-center gap-5 sm:gap-8">
            <div className="inline-flex items-center gap-3 bg-white border border-[#241f1a]/10 px-5 py-3 shadow-sm">
              <b className="text-[24px] font-extrabold text-[#d8442c]">
                <CountUp value="10-Year" />
              </b>
              <span className="text-[11.5px] text-[#6d6259] tracking-wider uppercase font-semibold">Structural Warranty</span>
            </div>
            <div className="inline-flex items-center gap-3 bg-white border border-[#241f1a]/10 px-5 py-3 shadow-sm">
              <b className="text-[24px] font-extrabold text-[#d8442c]">
                <CountUp value="100%" />
              </b>
              <span className="text-[11.5px] text-[#6d6259] tracking-wider uppercase font-semibold">Fe550D TMT Steel</span>
            </div>
            <Link
              href={`${basePath}/contact`}
              className="inline-flex items-center gap-2 text-[13px] font-extrabold tracking-wider uppercase text-[#d8442c] border-b-2 border-[#d8442c] pb-1 hover:gap-3 transition-all"
            >
              Get a feasibility report for your plot <ArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* CONSULTATION OUTPUTS */}
      <section className="px-7 py-[clamp(64px,7vw,96px)] bg-white border-y border-[#241f1a]/10">
        <div className="max-w-[1220px] mx-auto grid lg:grid-cols-[0.78fr_1.22fr] gap-10 lg:gap-16 items-start">
          <Reveal className="lg:sticky lg:top-28">
            <div className="flex items-center gap-2.5 text-[12px] font-extrabold tracking-[0.22em] uppercase text-[#d8442c] before:content-[''] before:w-6 before:h-[2.5px] before:rounded before:bg-[#d8442c]">
              Before the First Drawing
            </div>
            <h2 className="text-[clamp(28px,3.8vw,46px)] font-extrabold mt-3.5 mb-4 tracking-[-0.02em] leading-[1.08]">
              Bring your plot sketch. Leave with <span className="font-[family-name:var(--font-newsreader)] italic font-medium text-[#d8442c]">statutory FSI clarity.</span>
            </h2>
            <p className="text-[#6d6259] text-[15.5px] leading-relaxed max-w-[430px] mb-7">
              Our principal architects evaluate your plot boundaries, road width, and soil strata to provide clear CMDA setback calculations, preliminary 3D massing, and a realistic civil budget.
            </p>
            <Link
              href={`${basePath}/contact`}
              className="inline-flex items-center gap-2 text-[13px] font-extrabold tracking-wider uppercase text-[#d8442c] border-b-2 border-[#d8442c] pb-1 hover:gap-3 transition-all"
            >
              Book Your Planning Session <ArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>

          <div className="grid gap-4">
            {CONSULTATION_OUTPUTS.map((item, idx) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.number} delay={idx * 90}>
                  <article className="grid sm:grid-cols-[66px_1fr] gap-5 bg-[#fbf7f2] border border-[#241f1a]/10 rounded-2xl p-6 sm:p-7 transition-all duration-300 hover:border-[#d8442c]/35 hover:shadow-[0_16px_38px_rgba(36,31,26,0.07)]">
                    <span className="w-14 h-14 bg-white border border-[#d8442c]/25 rounded-xl grid place-items-center text-[#d8442c]">
                      <Icon className="w-5 h-5" strokeWidth={2} />
                    </span>
                    <div>
                      <span className="text-[10.5px] font-extrabold tracking-[0.2em] uppercase text-[#d8442c]">Consultation output {item.number}</span>
                      <h3 className="text-[21px] font-extrabold text-[#1d1713] mt-1.5 mb-2">{item.title}</h3>
                      <p className="text-[13.5px] text-[#6d6259] font-medium leading-[1.7]">{item.desc}</p>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* OFFERINGS */}
      <section id="services" className="px-7 py-[clamp(64px,7vw,96px)] bg-white border-y border-[#241f1a]/10">
        <div className="max-w-[1220px] mx-auto">
          <Reveal className="flex flex-wrap justify-between items-end gap-6 mb-12">
            <div>
              <div className="flex items-center gap-2.5 text-[12px] font-extrabold tracking-[0.22em] uppercase text-[#d8442c] before:content-[''] before:w-6 before:h-[2.5px] before:rounded before:bg-[#d8442c]">
                Turnkey Disciplines
              </div>
              <h2 className="text-[clamp(28px,3.8vw,46px)] font-extrabold mt-3.5 tracking-[-0.02em]">
                What we build for you
              </h2>
            </div>
            <Link
              href={`${basePath}/services`}
              className="text-[13px] font-extrabold tracking-[0.16em] uppercase text-[#d8442c] hover:underline"
            >
              Explore all offerings &rarr;
            </Link>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {offerings.map((off, idx) => (
              <Reveal key={off.title} delay={idx * 70}>
                <Link
                  href={`${basePath}/services`}
                  className="group block bg-[#fbf7f2] border border-[#241f1a]/10 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(29,23,19,0.1)]"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={off.img}
                      alt={off.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-[20px] font-extrabold text-[#1d1713] mb-1 group-hover:text-[#d8442c] transition-colors">
                      {off.title}
                    </h3>
                    <p className="text-[13.5px] text-[#6d6259] font-medium leading-relaxed">{off.sub}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TURNKEY STUDIO VS LOCAL CONTRACTOR COMPARISON */}
      <section className="px-7 py-[clamp(64px,7vw,96px)] bg-[#fbf7f2]">
        <div className="max-w-[1220px] mx-auto">
          <Reveal className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2.5 text-[12px] font-extrabold tracking-[0.22em] uppercase text-[#d8442c] mb-3 before:content-[''] before:w-6 before:h-[2.5px] before:rounded before:bg-[#d8442c] after:content-[''] after:w-6 after:h-[2.5px] after:rounded after:bg-[#d8442c]">
              Why Choose an Organized Studio
            </div>
            <h2 className="text-[clamp(28px,3.8vw,46px)] font-extrabold tracking-[-0.02em]">
              {cleanName || 'Our Studio'} vs. Local Contractors
            </h2>
            <p className="text-[#6d6259] text-[15px] mt-2 font-medium">
              See why homeowners switch to our factory-precision delivery model.
            </p>
          </Reveal>

          <Reveal>
            <div className="bg-white border border-[#241f1a]/10 rounded-2xl overflow-hidden shadow-sm">
              <div className="grid grid-cols-12 bg-[#1d1713] text-white p-4.5 sm:p-5 text-[13px] font-extrabold tracking-wider uppercase">
                <div className="col-span-4 sm:col-span-3">Feature</div>
                <div className="col-span-4 sm:col-span-5 text-[#f4b942]">{cleanName || 'Our Studio'}</div>
                <div className="col-span-4 sm:col-span-4 text-white/60">Local Carpenter</div>
              </div>
              <div className="divide-y divide-[#241f1a]/8">
                {COMPARISON_POINTS.map((pt) => (
                  <div key={pt.feature} className="grid grid-cols-12 p-4.5 sm:p-5 items-center text-[13.5px]">
                    <div className="col-span-4 sm:col-span-3 font-extrabold text-[#1d1713]">{pt.feature}</div>
                    <div className="col-span-4 sm:col-span-5 font-bold text-[#d8442c] flex items-center gap-2">
                      <Check className="w-4 h-4 shrink-0 text-[#d8442c]" strokeWidth={2.4} />
                      <span>{pt.studio}</span>
                    </div>
                    <div className="col-span-4 sm:col-span-4 text-[#6d6259] flex items-center gap-2">
                      <X className="w-4 h-4 shrink-0 text-red-400" strokeWidth={2.4} />
                      <span>{pt.contractor}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PREMIUM MATERIALS */}
      <section className="bg-[#1d1713] py-[clamp(64px,7vw,96px)] px-7 text-white border-y border-[#241f1a]/10">
        <div className="max-w-[1220px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
            <Reveal className="max-w-3xl">
              <div className="inline-flex items-center gap-2.5 text-[12px] font-extrabold tracking-[0.22em] uppercase text-[#f4b942] mb-3 before:content-[''] before:w-6 before:h-[2.5px] before:rounded before:bg-[#f4b942] after:content-[''] after:w-6 after:h-[2.5px] after:rounded after:bg-[#f4b942]">
                Premium Materials
              </div>
              <h2 className="text-[clamp(32px,4vw,56px)] font-extrabold tracking-[-0.02em] leading-[1.05]">
                Uncompromising Quality <br className="hidden md:block"/> In Every Detail
              </h2>
            </Reveal>
            <Reveal delay={0.1} className="max-w-sm flex flex-col items-start gap-6">
              <p className="text-[16px] font-medium leading-[1.7] text-white/70 border-l-[3px] border-[#f4b942] pl-5">
                For all the spaces we design and execute, we exclusively use premium, certified materials and hardware to ensure generational durability and timeless elegance.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.2} className="mt-14 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 border-l border-t border-white/10">
            {[
              { name: "CenturyPly" },
              { name: "Asian Paints" },
              { name: "Hettich" },
              { name: "Hafele" },
              { name: "Saint-Gobain" },
              { name: "Legrand" },
              { name: "Godrej Locks" },
              { name: "Kohler" },
              { name: "Kajaria" },
              { name: "Premium Assured" }
            ].map((brand) => (
              <div key={brand.name} className="flex flex-col items-center justify-center p-6 border-r border-b border-white/10 min-h-[160px] h-full transition-all duration-300 hover:bg-[#2a221b] group">
                <ShieldCheck className="h-7 w-7 text-[#f4b942] mb-3 opacity-90 group-hover:scale-110 transition-transform duration-300" />
                <p className="text-[11.5px] font-extrabold uppercase tracking-[0.1em] text-white/90 group-hover:text-white transition-colors duration-300 text-center">
                  {brand.name}
                </p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* PACKAGES */}
      <PackagesSection basePath={basePath} />

      {/* 6-STEP PROCESS */}
      <section id="process" className="px-7 py-[clamp(64px,7vw,96px)] bg-[#fbf7f2]">
        <div className="max-w-[1220px] mx-auto">
          <Reveal className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2.5 text-[12px] font-extrabold tracking-[0.22em] uppercase text-[#d8442c] mb-3 before:content-[''] before:w-6 before:h-[2.5px] before:rounded before:bg-[#d8442c] after:content-[''] after:w-6 after:h-[2.5px] after:rounded after:bg-[#d8442c]">
              6-Step Blueprint
            </div>
            <h2 className="text-[clamp(28px,3.8vw,46px)] font-extrabold tracking-[-0.02em]">
              From first sketch to happy housewarming
            </h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROCESS.map((p) => (
              <Reveal key={p.num} delay={p.num * 60}>
                <div className="bg-white border border-[#241f1a]/10 rounded-2xl p-7 h-full flex flex-col justify-between shadow-[0_10px_24px_rgba(29,23,19,0.04)]">
                  <div>
                    <span className="w-10 h-10 rounded-xl bg-[#d8442c] text-white font-extrabold text-[16px] grid place-items-center mb-4">
                      {p.num}
                    </span>
                    <h3 className="text-[19px] font-extrabold text-[#1d1713] mb-2">{p.title}</h3>
                    <p className="text-[13.5px] text-[#6d6259] font-medium leading-[1.65]">{p.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* DELIVERED HOMES GALLERY */}
      <section id="projects" className="px-7 py-[clamp(64px,7vw,96px)] bg-white border-y border-[#241f1a]/10">
        <div className="max-w-[1220px] mx-auto">
          <Reveal className="flex flex-wrap justify-between items-end gap-6 mb-12">
            <div>
              <div className="flex items-center gap-2.5 text-[12px] font-extrabold tracking-[0.22em] uppercase text-[#d8442c] before:content-[''] before:w-6 before:h-[2.5px] before:rounded before:bg-[#d8442c]">
                Delivered Projects
              </div>
              <h2 className="text-[clamp(28px,3.8vw,46px)] font-extrabold mt-3.5 tracking-[-0.02em]">
                Homes delivered across {city}
              </h2>
            </div>
            <Link href={`${basePath}/gallery`} className="text-[13px] font-extrabold tracking-[0.16em] uppercase text-[#d8442c] hover:underline">
              View full gallery &rarr;
            </Link>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((proj, idx) => (
              <Reveal key={proj.title} delay={idx * 70}>
                <Link
                  href={`${basePath}/gallery`}
                  className="group block bg-[#fbf7f2] border border-[#241f1a]/10 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(29,23,19,0.1)]"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={proj.img} alt={proj.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="p-6">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#d8442c] block mb-1">
                      {proj.tag}
                    </span>
                    <h3 className="text-[19px] font-extrabold text-[#1d1713] mb-1">{proj.title}</h3>
                    <p className="text-[13px] text-[#6d6259] font-medium">{proj.sub}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="px-7 py-[clamp(64px,7vw,96px)] bg-[#fbf7f2]">
        <div className="max-w-[1220px] mx-auto">
          <Reveal className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2.5 text-[12px] font-extrabold tracking-[0.22em] uppercase text-[#d8442c] mb-3 before:content-[''] before:w-6 before:h-[2.5px] before:rounded before:bg-[#d8442c] after:content-[''] after:w-6 after:h-[2.5px] after:rounded after:bg-[#d8442c]">
              Homeowner Stories
            </div>
            <h2 className="text-[clamp(28px,3.8vw,46px)] font-extrabold tracking-[-0.02em]">
              Rated {rating}★ on Google in {city}
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {reviews.slice(0, 3).map((r: any, idx: number) => (
              <Reveal key={idx} delay={idx * 80}>
                <div className="bg-white border border-[#241f1a]/10 rounded-2xl p-7 h-full flex flex-col justify-between shadow-[0_10px_24px_rgba(29,23,19,0.04)]">
                  <div>
                    <div className="flex gap-1 text-[#f4b942] mb-3 text-[14px]">★★★★★</div>
                    <blockquote className="text-[#1d1713] text-[15px] font-medium leading-[1.65] mb-6">
                      &ldquo;{r.text}&rdquo;
                    </blockquote>
                  </div>
                  <div className="border-t border-[#241f1a]/10 pt-4 flex items-center gap-3">
                    <span className="w-10 h-10 rounded-full bg-[#1d1713] text-[#f4b942] font-extrabold grid place-items-center">
                      {(r.author || 'C').charAt(0)}
                    </span>
                    <div>
                      <b className="text-[14.5px] font-extrabold text-[#1d1713] block">{r.author || 'Homeowner'}</b>
                      <span className="text-[11.5px] text-[#6d6259] font-semibold">{city} Residence</span>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ ACCORDION */}
      <section id="faq" className="px-7 py-[clamp(64px,7vw,96px)] bg-white border-t border-[#241f1a]/10">
        <div className="max-w-[900px] mx-auto">
          <Reveal className="text-center mb-12">
            <div className="inline-flex items-center gap-2.5 text-[12px] font-extrabold tracking-[0.22em] uppercase text-[#d8442c] mb-3 before:content-[''] before:w-6 before:h-[2.5px] before:rounded before:bg-[#d8442c] after:content-[''] after:w-6 after:h-[2.5px] after:rounded after:bg-[#d8442c]">
              Questions Answered
            </div>
            <h2 className="text-[clamp(28px,3.8vw,46px)] font-extrabold tracking-[-0.02em]">
              Frequently asked questions
            </h2>
          </Reveal>

          <Reveal>
            <FAQAccordion items={homeFaqs} />
          </Reveal>
        </div>
      </section>

      {/* CTA / LEAD FORM */}
      <section id="consult" className="px-7 py-[clamp(72px,8vw,110px)] bg-[#1d1713] text-white">
        <div className="max-w-[1220px] mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
          <Reveal>
            <div className="flex items-center gap-2.5 text-[12px] font-extrabold tracking-[0.22em] uppercase text-[#f4b942] before:content-[''] before:w-6 before:h-[2.5px] before:rounded before:bg-[#f4b942]">
              Free Consultation
            </div>
            <h2 className="text-[clamp(32px,4.4vw,56px)] font-extrabold mt-3.5 mb-4 leading-[1.08]">
              Ready to build your <span className="font-[family-name:var(--font-newsreader)] italic font-medium text-[#f4b942]">dream home?</span>
            </h2>
            <p className="text-white/80 text-[16px] leading-relaxed max-w-[500px] mb-8">
              Sit down with our interior architects. We&rsquo;ll review your floor plan, give 3D direction, and quote an exact itemised estimate for your {city} property.
            </p>
            <div className="grid grid-cols-3 gap-3 max-w-[460px]">
              {[
                { v: '45 Days', l: 'Handover Guarantee' },
                { v: '10 Yrs', l: 'Structural Warranty' },
                { v: '₹0', l: 'Consultation Fee' },
              ].map((b) => (
                <div key={b.l} className="bg-white/10 rounded-xl p-3.5 text-center">
                  <b className="text-[20px] font-extrabold text-[#f4b942] block">
                    <CountUp value={b.v} />
                  </b>
                  <span className="text-[10.5px] uppercase tracking-wider text-white/70 font-bold">{b.l}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={120} className="bg-white text-[#1d1713] rounded-2xl p-7 sm:p-9 shadow-2xl">
            <LeadForm studioName={cleanName || 'the studio'} waPhone={waPhone} city={city} />
          </Reveal>
        </div>
      </section>
    </div>
  );
}
