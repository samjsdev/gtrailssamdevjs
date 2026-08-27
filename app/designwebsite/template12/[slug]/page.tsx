import { readSourceConfig } from '@/lib/dataBuilder';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Check, ShieldCheck, ArrowRight, Home, CheckCircle2 } from 'lucide-react';
import {
  cleanClinicName,
  cleanArchitectureTagline,
  cleanArchitectureDescription,
  cleanArchitectureServices,
  cleanArchitectureHighlights,
  cleanArchitectureSpecialization,
} from '@/lib/copyCleaner';
import {
  DEFAULT_ARCHITECTURE_REVIEWS,
  DEFAULT_ARCHITECTURE_SERVICES,
  DEFAULT_ARCHITECTURE_HIGHLIGHTS,
  getArchitectureServiceData,
  getArchitectureServiceImage,
  ARCHITECTURE_STOCK,
  previewMedia,
} from '@/lib/architectureContent';
import Reveal from './Reveal';
import LeadForm from './LeadForm';
import PackagesSection from './PackagesSection';
import BeforeAfter from './BeforeAfter';
import FAQAccordion, { FAQItem } from './FAQAccordion';
import HeroStats, { HeroStat } from './HeroStats';
import CountUp from '@/components/CountUp';

type PageProps = { params: Promise<{ slug: string }> };

const ROOM_FALLBACK_IMAGES = [
  '/images/architecture/civic-landmark-facade.webp',
  '/images/architecture/courtyard-water-residence.webp',
  '/images/architecture/modern-villa-duplex.webp',
  '/images/architecture/monolithic-brutalist-facade.webp',
  '/images/architecture/porotherm-clay-facade.webp',
  '/images/architecture/villa-after-finished.webp',
];

const STEPS = [
  { pct: 'Step 01', title: 'Plot Inspection & Budget Discussion', desc: 'Meet our architects on your plot or at our office. We check plot dimensions, road width, soil type, and discuss your family budget.' },
  { pct: 'Step 02', title: '3D Floor Plans & CMDA Approval', desc: 'Review realistic 3D exterior elevations and Vaastu floor plans. We handle complete municipal plan sanction approvals without delay.' },
  { pct: 'Step 03', title: 'Quality Construction & Daily Supervision', desc: 'Complete civil construction using Tata Tiscon steel, UltraTech cement, and quality brickwork under experienced site civil engineers.' },
  { pct: 'Step 04', title: 'Finishing, Quality Check & Key Handover', desc: 'Flooring, painting, electrical, and plumbing fittings followed by a 300-point quality check and key handover with a 10-year warranty.' },
];

const BRAND_PARTNERS = [
  { name: 'Tata Tiscon / JSW', role: 'Primary Fe550D TMT Earthquake Steel' },
  { name: 'UltraTech / ACC', role: 'Grade-53 Tested Ready-Mix Concrete' },
  { name: 'Saint-Gobain Solar', role: 'Double-Glazed Low-E Performance Curtain Walls' },
  { name: 'Schüco Systems', role: 'Engineered Minimal Thermal-Break Fenestrations' },
];

const PROJECT_STORY_COPY = [
  {
    label: 'Modern Luxury Villas',
    title: 'Spacious independent villas built for privacy and comfort',
    desc: 'Large glass windows, high ceilings, covered car parking, and beautiful garden spaces designed to catch cool breezes.',
    defaultImg: '/images/architecture/hero-villa-twilight.webp',
  },
  {
    label: 'Traditional Courtyard Homes',
    title: 'Natural open courtyards that keep your home cool',
    desc: 'Traditional open-to-sky courtyards (mutham) combined with bright, well-ventilated rooms for continuous fresh air and 100% Vaastu harmony.',
    defaultImg: '/images/architecture/courtyard-water-residence.webp',
  },
  {
    label: 'Commercial Buildings & Offices',
    title: 'Contemporary office complexes and retail spaces',
    desc: 'Optimized for maximum built-up area (FSI), customer parking, fire safety compliance, and attractive glass front elevations.',
    defaultImg: '/images/architecture/monolithic-brutalist-facade.webp',
  },
];

export default async function Template12Home({ params }: PageProps) {
  const { slug } = await params;
  const basePath = `/designwebsite/template12/${slug}`;

  const data = await readSourceConfig(slug, 'template12');
  if (!data) return notFound();

  const { clinic, doctor, business } = data;

  const media = previewMedia(data.media);
  const baBefore = '/images/architecture/villa-before-frame.webp';
  const baAfter = '/images/architecture/villa-after-finished.webp';

  const cleanName = cleanClinicName(clinic.name);
  const city = clinic.address?.city || 'Chennai';
  const cleanDesc = cleanArchitectureDescription(clinic.description, clinic.name, city);
  const cleanTagline = cleanArchitectureTagline(clinic.tagline);
  const phone = clinic.contact?.phone || '';
  const waPhone = phone.replace(/\D/g, '') || '919751396117';

  const heroImage =
    media.clinicImages?.[0] ||
    '/images/architecture/modern-villa-duplex.webp';
  const whyImage =
    media.clinicImages?.[1] ||
    '/images/architecture/porotherm-clay-facade.webp';
  const servicesList: string[] = cleanArchitectureServices(business.services, DEFAULT_ARCHITECTURE_SERVICES);
  const highlights: string[] = cleanArchitectureHighlights(business.highlights, DEFAULT_ARCHITECTURE_HIGHLIGHTS);
  const doctorSpecialization = cleanArchitectureSpecialization(doctor?.specialization);
  const reviews = data.reviews?.length ? data.reviews : DEFAULT_ARCHITECTURE_REVIEWS;
  const rating = business.rating || '4.9';
  const reviewCount = parseInt(String(business.reviewCount || '').replace(/\D/g, ''), 10) || (reviews.length ? reviews.length * 15 : 140);
  const experienceYears = doctor?.experience?.replace(/\D/g, '') || '12';
  const servicesCount = servicesList.length || 6;

  const rooms = servicesList.slice(0, 6).map((svc: string, idx: number) => {
    const detail = getArchitectureServiceData(svc);
    return {
      title: svc,
      sub: detail?.tagline || 'Engineered for your plot topography and budget',
      img: media.treatmentImages?.[idx] || media.otherImages?.[6 + idx] || getArchitectureServiceImage(svc, media) || ROOM_FALLBACK_IMAGES[idx % ROOM_FALLBACK_IMAGES.length],
      tag: idx === 0 ? 'Flagship' : idx === 1 ? 'BIM Integrated' : idx === 2 ? 'Turnkey' : null,
    };
  });

  const projectImages = [
    ...(media.treatmentImages || []).slice(0, 3),
    ...(media.clinicImages || []).slice(1, 3),
    ...(media.otherImages || []).slice(6, 8),
  ].filter(Boolean);
  const projectStories = PROJECT_STORY_COPY.map((story, idx) => ({
    ...story,
    img: projectImages[idx] || story.defaultImg,
  }));

  const homeFaqs: FAQItem[] = [
    {
      q: `What makes ${cleanName || 'our team'} different from regular building contractors?`,
      a: 'We combine licensed architects with certified civil engineers under one company. This guarantees approved CMDA plans, realistic 3D designs, top-brand materials, and a legally binding 10-year structural warranty.',
      tag: 'Why Us',
    },
    {
      q: 'How does the plot and architectural consultation work?',
      a: 'In a 60-minute consultation, our architects analyze your plot boundaries, road width, and municipal setback rules, and present practical floor plan options aligned with your budget.',
      tag: 'Consultation',
    },
    {
      q: 'Are your construction prices fixed or will costs increase during the build?',
      a: 'Our quotation is completely itemised and contractually locked before breaking ground. We specify exact brands like Tata Tiscon steel and UltraTech cement with zero price escalation.',
      tag: 'Fixed Pricing',
    },
    {
      q: 'What structural warranty do you provide upon keys handover?',
      a: 'We provide an official 10-year structural warranty certificate covering foundation integrity, concrete columns and beams, and external waterproofing.',
      tag: 'Warranty',
    },
    {
      q: 'Can you work with narrow plots or difficult soil conditions?',
      a: 'Yes. Our civil engineers test the plot soil and design custom foundations—from deep concrete piles for clayey soil to solid footings for sandy soil.',
      tag: 'Engineering',
    },
  ];

  const heroStats: HeroStat[] = [
    {
      value: parseFloat(rating) || 4.9,
      decimals: 1,
      suffix: '★',
      label: 'Google Rating',
      sublabel: `${reviewCount} Verified Reviews`,
      icon: 'star',
    },
    {
      value: parseInt(experienceYears, 10) || 14,
      decimals: 0,
      suffix: '+ Yrs',
      label: 'Design & Build',
      sublabel: 'Chennai Operations',
      icon: 'award',
    },
    {
      value: servicesCount,
      decimals: 0,
      suffix: '+',
      label: 'Core Services',
      sublabel: 'From Design to Build',
      icon: 'layers',
    },
    {
      value: 150,
      decimals: 0,
      suffix: '+',
      label: 'Delivered Homes',
      sublabel: '10-Year Warranty',
      icon: 'home',
    },
  ];

  return (
    <div>
      {/* HERO */}
      <section id="hero" className="bg-[#faf7f1] overflow-hidden">
        <div className="max-w-[1240px] mx-auto px-6 pt-[clamp(44px,6vw,80px)] pb-12 sm:pb-16">
          <div className="grid lg:grid-cols-[1.02fr_0.98fr] gap-[clamp(34px,5vw,64px)] items-center">
            <div>
              <p className="font-[family-name:var(--font-bricolage)] font-bold text-[clamp(22px,2.4vw,28px)] text-[#0e5a43] mb-4 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#f2a007]" />
                {cleanName || 'Architects & Builders'} · {city}
              </p>
              <h1 className="font-[family-name:var(--font-bricolage)] font-bold text-[clamp(38px,4.8vw,62px)] leading-[1.05] tracking-[-0.02em]">
                {cleanTagline}
              </h1>
              <p className="mt-5 mb-8 max-w-[520px] text-[#6b6660] text-[16.5px] leading-[1.7] font-medium">
                {cleanDesc}
              </p>
              <div className="flex flex-wrap gap-3.5 items-center">
                <Link
                  href={`${basePath}/contact`}
                  className="inline-flex items-center justify-center gap-2 bg-[#0e5a43] text-white font-bold text-[14px] px-6.5 py-3.5 rounded-xl hover:bg-[#0a4232] hover:-translate-y-0.5 hover:shadow-[0_14px_28px_rgba(14,90,67,0.28)] transition-all duration-300"
                >
                  Book Consultation
                </Link>
                <Link
                  href={`${basePath}/gallery`}
                  className="inline-flex items-center justify-center gap-2 bg-transparent text-[#1b1b1b] font-bold text-[14px] px-6.5 py-3.5 rounded-xl border-[1.5px] border-[#1b1b1b] hover:bg-[#1b1b1b] hover:text-white transition-all duration-300"
                >
                  View Completed Projects
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -top-4 right-2 sm:-right-3 z-10 bg-white border border-[#1b1b1b]/10 rounded-2xl px-5 py-3.5 shadow-[0_24px_60px_rgba(27,27,27,0.12)] flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-[#fdeecb] grid place-items-center">
                  <Home className="w-5 h-5 text-[#f2a007]" strokeWidth={2} />
                </span>
                <span>
                  <b className="font-[family-name:var(--font-bricolage)] text-[17px] block leading-tight">
                    <CountUp value={experienceYears} suffix="+ years" />
                  </b>
                  <span className="text-[11px] text-[#6b6660] font-bold">practice in {city}</span>
                </span>
              </div>
              <div className="rounded-[26px] overflow-hidden aspect-[4/3.5] shadow-[0_24px_60px_rgba(27,27,27,0.12)]">
                <img src={heroImage} alt={`${cleanName || 'Our'} completed home`} className="w-full h-full object-cover" fetchPriority="high" />
              </div>
              <div className="mt-5 border-t border-[#1b1b1b]/12 pt-5">
                <p className="text-[11px] font-extrabold tracking-[0.2em] uppercase text-[#0e5a43] mb-3.5">
                  The {cleanName || 'Our'} Guarantee
                </p>
                <ul className="grid sm:grid-cols-3 gap-2.5">
                  {[
                    '10-Year Structural RCC Warranty',
                    '100% Municipal Sanctions Approved',
                    '0% Cost Escalation Lock',
                  ].map((item) => (
                    <li key={item} className="flex gap-2 items-center text-[12.5px] font-bold text-[#1b1b1b] bg-white/80 border border-[#1b1b1b]/8 rounded-xl px-3 py-2">
                      <Check className="w-4 h-4 text-[#0e5a43] shrink-0" strokeWidth={2.4} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* DEDICATED HERO NUMBERS SECTION */}
          <div className="mt-12 lg:mt-16">
            <HeroStats stats={heroStats} />
          </div>
        </div>
      </section>

      {/* BRAND PARTNERS & MATERIALS */}
      <section className="bg-white py-8 border-y border-[#1b1b1b]/10 px-6">
        <div className="max-w-[1240px] mx-auto">
          <p className="text-center text-[11px] font-extrabold tracking-[0.2em] uppercase text-[#6b6660] mb-6">
            Engineered with Certified Brand Partners
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {BRAND_PARTNERS.map((partner) => (
              <div key={partner.name} className="bg-[#faf7f1] border border-[#1b1b1b]/8 rounded-xl p-4 text-center">
                <b className="font-[family-name:var(--font-bricolage)] text-[15px] text-[#1b1b1b] block">{partner.name}</b>
                <span className="text-[11px] text-[#6b6660] font-medium block mt-0.5">{partner.role}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REAL TRANSFORMATION (BEFORE/AFTER) - SINGLE COLUMN IMMERSIVE */}
      <section className="px-6 py-[clamp(72px,8vw,100px)] max-w-[1240px] mx-auto text-center">
        <Reveal className="max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2.5 text-[12px] font-extrabold tracking-[0.28em] uppercase text-[#0e5a43] before:content-[''] before:w-7 before:h-[2.5px] before:rounded-full before:bg-[#f2a007] after:content-[''] after:w-7 after:h-[2.5px] after:rounded-full after:bg-[#f2a007] justify-center mb-3.5">
            Real Transformation
          </div>
          <h2 className="font-[family-name:var(--font-bricolage)] font-bold text-[clamp(28px,3.8vw,48px)] leading-[1.08] tracking-[-0.02em] mb-4">
            From raw topography to a <mark className="bg-[linear-gradient(transparent_62%,#fdeecb_62%)] text-[#0e5a43] px-0.5">completed landmark</mark>
          </h2>
          <p className="text-[#6b6660] text-[15.5px] leading-relaxed font-medium">
            See how our structural engineering, spacious shaded verandas, and double-glazed curtain walls transform raw topography into a luminous, climate-responsive estate.
          </p>
        </Reveal>

        <Reveal delay={100} className="max-w-[1100px] mx-auto w-full">
          <BeforeAfter
            beforeImage={baBefore}
            afterImage={baAfter}
            caption="Drag slider to compare raw structural RCC frame vs completed architectural landmark"
          />
        </Reveal>

        <Reveal delay={200} className="mt-9 flex flex-wrap items-center justify-center gap-5 sm:gap-8">
          <div className="inline-flex items-center gap-3 bg-[#faf7f1] border border-[#1b1b1b]/8 rounded-xl px-5 py-3 shadow-sm">
            <b className="font-[family-name:var(--font-bricolage)] text-[22px] font-bold text-[#0e5a43]">
              <CountUp value="10-Year" />
            </b>
            <span className="text-[12px] text-[#6b6660] font-bold tracking-wider uppercase">Structural Warranty</span>
          </div>
          <div className="inline-flex items-center gap-3 bg-[#faf7f1] border border-[#1b1b1b]/8 rounded-xl px-5 py-3 shadow-sm">
            <b className="font-[family-name:var(--font-bricolage)] text-[22px] font-bold text-[#0e5a43]">
              <CountUp value="100%" />
            </b>
            <span className="text-[12px] text-[#6b6660] font-bold tracking-wider uppercase">Fe550D TMT Steel</span>
          </div>
          <Link
            href={`${basePath}/contact`}
            className="inline-flex items-center gap-2 text-[13px] font-extrabold tracking-wider uppercase text-[#0e5a43] border-b-2 border-[#f2a007] pb-1 hover:gap-3.5 transition-all"
          >
            Get a feasibility report for your plot <ArrowRight className="w-4 h-4 text-[#0e5a43]" />
          </Link>
        </Reveal>
      </section>

      {/* ROOM BY ROOM DESIGN */}
      <section id="services" className="px-6 py-[clamp(72px,8vw,110px)] bg-[#faf7f1]">
        <div className="max-w-[1240px] mx-auto">
          <Reveal className="flex flex-wrap justify-between items-end gap-6 mb-12">
            <div>
              <span className="inline-flex items-center gap-2.5 text-[12px] font-extrabold tracking-[0.28em] uppercase text-[#0e5a43] mb-3 before:content-[''] before:w-7 before:h-[2.5px] before:rounded-full before:bg-[#f2a007]">
                Integrated Architectural Disciplines
              </span>
              <h2 className="font-[family-name:var(--font-bricolage)] font-bold text-[clamp(28px,3.8vw,48px)] leading-[1.08] tracking-[-0.02em]">
                Explore spaces designed for <mark className="bg-[linear-gradient(transparent_62%,#fdeecb_62%)] text-[#0e5a43] px-0.5">generational living</mark>
              </h2>
            </div>
            <Link
              href={`${basePath}/services`}
              className="inline-flex items-center gap-2 font-extrabold text-[14px] text-[#0e5a43] border-b-[2.5px] border-[#f2a007] pb-1 hover:gap-3.5 transition-all"
            >
              See All Turnkey Services <ArrowRight className="w-4 h-4" strokeWidth={2.4} />
            </Link>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map((room, idx) => (
              <Reveal key={room.title} delay={idx * 70}>
                <Link
                  href={`${basePath}/services`}
                  className="group block bg-white border border-[#1b1b1b]/10 rounded-[22px] overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_60px_rgba(27,27,27,0.12)]"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    {room.tag && (
                      <span className="absolute top-3.5 left-3.5 z-10 bg-[#0e5a43] text-white text-[10.5px] font-extrabold tracking-wider uppercase px-3 py-1 rounded-full shadow-md">
                        {room.tag}
                      </span>
                    )}
                    <img
                      src={room.img}
                      alt={room.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-[family-name:var(--font-bricolage)] font-bold text-[20px] text-[#1b1b1b] group-hover:text-[#0e5a43] transition-colors mb-1.5">
                      {room.title}
                    </h3>
                    <p className="text-[13.5px] text-[#6b6660] font-medium leading-relaxed">{room.sub}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PREMIUM MATERIALS */}
      <section className="bg-[#1b1b1b] py-[clamp(72px,8vw,110px)] px-6 text-white border-y border-[#1b1b1b]/10">
        <div className="max-w-[1240px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
            <Reveal className="max-w-3xl">
              <span className="inline-flex items-center gap-2.5 text-[12px] font-extrabold tracking-[0.28em] uppercase text-[#f2a007] mb-3 before:content-[''] before:w-7 before:h-[2.5px] before:rounded-full before:bg-[#f2a007] after:content-[''] after:w-7 after:h-[2.5px] after:rounded-full after:bg-[#f2a007]">
                Premium Materials
              </span>
              <h2 className="font-[family-name:var(--font-bricolage)] font-bold text-[clamp(32px,4vw,56px)] leading-[1.05] tracking-[-0.02em]">
                Uncompromising Quality <br className="hidden md:block"/> In Every Detail
              </h2>
            </Reveal>
            <Reveal delay={0.1} className="max-w-sm flex flex-col items-start gap-6">
              <p className="text-[15px] font-medium leading-[1.7] text-white/70 border-l-[2px] border-[#f2a007]/50 pl-5">
                For every residence we engineer and construct, we specify lab-tested structural steel, high-grade ready-mix concrete, thermal Porotherm blocks, and Low-E solar facades for generational durability.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.2} className="mt-14 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 border-l border-t border-white/10 bg-[#141414] rounded-2xl overflow-hidden shadow-2xl">
            {[
              { name: "Tata Tiscon Fe550D" },
              { name: "UltraTech Cement" },
              { name: "Saint-Gobain Solar" },
              { name: "Schüco Systems" },
              { name: "Porotherm Blocks" },
              { name: "Kajaria Ceramics" },
              { name: "Kohler Fixtures" },
              { name: "Schneider Electric" },
              { name: "Asian Paints Apex" },
              { name: "CoA Registered" }
            ].map((brand) => (
              <div key={brand.name} className="flex flex-col items-center justify-center p-6 border-r border-b border-white/10 min-h-[160px] h-full transition-all duration-300 hover:bg-[#1b1b1b] group">
                <ShieldCheck className="h-7 w-7 text-[#f2a007] mb-3 opacity-90 group-hover:scale-110 transition-transform duration-300" />
                <p className="text-[11.5px] font-extrabold uppercase tracking-[0.1em] text-white/90 group-hover:text-white transition-colors duration-300 text-center">
                  {brand.name}
                </p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* PROJECT STORIES */}
      <section id="projects" className="px-6 py-[clamp(72px,8vw,110px)] bg-white border-y border-[#1b1b1b]/10">
        <div className="max-w-[1240px] mx-auto">
          <Reveal className="flex flex-wrap justify-between items-end gap-6 mb-12">
            <div className="max-w-[650px]">
              <span className="inline-flex items-center gap-2.5 text-[12px] font-extrabold tracking-[0.28em] uppercase text-[#0e5a43] mb-3 before:content-[''] before:w-7 before:h-[2.5px] before:rounded-full before:bg-[#f2a007]">
                Real Residences, Real Routines
              </span>
              <h2 className="font-[family-name:var(--font-bricolage)] font-bold text-[clamp(28px,3.8vw,48px)] leading-[1.08] tracking-[-0.02em]">
                Designed for how a home is <mark className="bg-[linear-gradient(transparent_62%,#fdeecb_62%)] text-[#0e5a43] px-0.5">actually lived in</mark>
              </h2>
            </div>
            <Link
              href={`${basePath}/gallery`}
              className="inline-flex items-center gap-2 font-extrabold text-[14px] text-[#0e5a43] border-b-[2.5px] border-[#f2a007] pb-1 hover:gap-3.5 transition-all"
            >
              View More Completed Homes <ArrowRight className="w-4 h-4" strokeWidth={2.4} />
            </Link>
          </Reveal>

          <div className="grid lg:grid-cols-3 gap-6">
            {projectStories.map((story, idx) => (
              <Reveal key={story.title} delay={idx * 90}>
                <article className="group h-full bg-[#faf7f1] border border-[#1b1b1b]/10 rounded-[22px] overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_60px_rgba(27,27,27,0.1)]">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img src={story.img} alt={story.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]" />
                    <span className="absolute left-4 bottom-4 bg-white/95 text-[#0e5a43] rounded-full px-3 py-1.5 text-[10.5px] font-extrabold tracking-wider uppercase shadow-sm">
                      {story.label}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-[family-name:var(--font-bricolage)] font-bold text-[21px] leading-[1.12] text-[#1b1b1b] mb-3">{story.title}</h3>
                    <p className="text-[13.5px] text-[#6b6660] font-medium leading-[1.7]">{story.desc}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PACKAGES */}
      <PackagesSection basePath={basePath} />

      {/* 4-STEP PROCESS */}
      <section id="process" className="px-6 py-[clamp(72px,8vw,110px)] bg-[#faf7f1]">
        <div className="max-w-[1240px] mx-auto">
          <Reveal className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-flex items-center gap-2.5 text-[12px] font-extrabold tracking-[0.28em] uppercase text-[#0e5a43] mb-3 before:content-[''] before:w-7 before:h-[2.5px] before:rounded-full before:bg-[#f2a007] after:content-[''] after:w-7 after:h-[2.5px] after:rounded-full after:bg-[#f2a007]">
              Stress-Free Workflow
            </span>
            <h2 className="font-[family-name:var(--font-bricolage)] font-bold text-[clamp(28px,3.8vw,48px)] leading-[1.08] tracking-[-0.02em] mb-3">
              How your dream residence gets built
            </h2>
            <p className="text-[#6b6660] text-[15px] font-medium">
              We eliminated the headaches by organizing every step into a clear timeline.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((step, idx) => (
              <Reveal key={step.pct} delay={idx * 80}>
                <div className="bg-white border border-[#1b1b1b]/10 rounded-[22px] p-7 h-full flex flex-col justify-between transition-all duration-300 hover:shadow-[0_20px_50px_rgba(27,27,27,0.08)]">
                  <div>
                    <span className="font-[family-name:var(--font-bricolage)] font-extrabold text-[24px] text-[#f2a007] block mb-4">
                      {step.pct}
                    </span>
                    <h3 className="font-[family-name:var(--font-bricolage)] font-bold text-[19px] text-[#1b1b1b] mb-2.5">
                      {step.title}
                    </h3>
                    <p className="text-[13.5px] text-[#6b6660] font-medium leading-[1.65]">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section id="why" className="px-6 py-[clamp(72px,8vw,110px)] bg-white">
        <div className="max-w-[1240px] mx-auto grid lg:grid-cols-2 gap-[clamp(40px,5vw,72px)] items-center">
          <Reveal className="relative">
            <div className="rounded-[26px] overflow-hidden aspect-[4/3.6] shadow-[0_24px_60px_rgba(27,27,27,0.12)]">
              <img src={whyImage} alt={`Why choose ${cleanName || 'our team'}`} loading="lazy" className="w-full h-full object-cover" />
            </div>
            <div className="absolute left-5 bottom-5 bg-white rounded-2xl px-5.5 py-4 shadow-[0_24px_60px_rgba(27,27,27,0.12)]">
              <b className="font-[family-name:var(--font-bricolage)] text-[22px] text-[#0e5a43] block leading-none">140+ Points</b>
              <span className="text-[11px] font-extrabold tracking-[0.1em] uppercase text-[#6b6660]">Quality Inspected</span>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <span className="inline-flex items-center gap-2.5 text-[12px] font-extrabold tracking-[0.28em] uppercase text-[#0e5a43] mb-3.5 before:content-[''] before:w-7 before:h-[2.5px] before:rounded-full before:bg-[#f2a007]">
              Why Homeowners Trust Us
            </span>
            <h2 className="font-[family-name:var(--font-bricolage)] font-bold text-[clamp(28px,3.6vw,46px)] leading-[1.08] tracking-[-0.02em] mb-4.5">
              The reliability of a <mark className="bg-[linear-gradient(transparent_62%,#fdeecb_62%)] text-[#0e5a43] px-0.5">modern design-build practice</mark>
            </h2>
            <p className="text-[#6b6660] font-medium leading-[1.75] text-[15.5px] mb-7">
              {cleanDesc || `We removed contractor middleman friction by owning spatial design, structural engineering, and site management in ${city}.`}
            </p>

            <div className="grid gap-3.5">
              {highlights.slice(0, 4).map((h) => (
                <div key={h} className="flex gap-3 items-start bg-[#faf7f1] border border-[#1b1b1b]/8 rounded-xl p-4">
                  <CheckCircle2 className="w-5 h-5 text-[#0e5a43] shrink-0 mt-0.5" strokeWidth={2.4} />
                  <div>
                    <b className="font-[family-name:var(--font-bricolage)] text-[16px] text-[#1b1b1b] block">{h}</b>
                    <span className="text-[13px] text-[#6b6660] font-medium">Fully engineered with 10-year warranty documentation.</span>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="px-6 py-[clamp(72px,8vw,110px)] bg-[#faf7f1] border-y border-[#1b1b1b]/10">
        <div className="max-w-[1240px] mx-auto">
          <Reveal className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-flex items-center gap-2.5 text-[12px] font-extrabold tracking-[0.28em] uppercase text-[#0e5a43] mb-3 before:content-[''] before:w-7 before:h-[2.5px] before:rounded-full before:bg-[#f2a007] after:content-[''] after:w-7 after:h-[2.5px] after:rounded-full after:bg-[#f2a007]">
              Homeowner Reviews
            </span>
            <h2 className="font-[family-name:var(--font-bricolage)] font-bold text-[clamp(28px,3.8vw,48px)] leading-[1.08] tracking-[-0.02em] mb-3">
              Rated {rating}★ on Google across {city}
            </h2>
            <p className="text-[#6b6660] text-[15px] font-medium">
              Real reviews from real homeowners who trusted us with their residences.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {reviews.slice(0, 3).map((r: any, idx: number) => (
              <Reveal key={idx} delay={idx * 80}>
                <div className="bg-white border border-[#1b1b1b]/10 rounded-[22px] p-7 h-full flex flex-col justify-between shadow-[0_12px_28px_rgba(27,27,27,0.04)]">
                  <div>
                    <div className="text-[#f2a007] text-[15px] tracking-widest mb-3">★★★★★</div>
                    <blockquote className="text-[#1b1b1b] text-[15.5px] font-medium leading-[1.65] mb-6">
                      &ldquo;{r.text}&rdquo;
                    </blockquote>
                  </div>
                  <div className="border-t border-[#1b1b1b]/10 pt-4 flex items-center gap-3">
                    <span className="w-10 h-10 rounded-full bg-[#0e5a43] text-white font-bold grid place-items-center">
                      {(r.author || 'C').charAt(0)}
                    </span>
                    <div>
                      <b className="font-[family-name:var(--font-bricolage)] text-[15px] text-[#1b1b1b] block">{r.author || 'Happy Homeowner'}</b>
                      <span className="text-[11.5px] text-[#6b6660] font-semibold">Verified Homeowner · {city}</span>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="px-6 py-[clamp(72px,8vw,110px)] bg-white">
        <div className="max-w-[900px] mx-auto">
          <Reveal className="text-center mb-12">
            <span className="inline-flex items-center gap-2.5 text-[12px] font-extrabold tracking-[0.28em] uppercase text-[#0e5a43] mb-3 before:content-[''] before:w-7 before:h-[2.5px] before:rounded-full before:bg-[#f2a007] after:content-[''] after:w-7 after:h-[2.5px] after:rounded-full after:bg-[#f2a007]">
              Got Questions?
            </span>
            <h2 className="font-[family-name:var(--font-bricolage)] font-bold text-[clamp(28px,3.8vw,46px)] leading-[1.08] tracking-[-0.02em] mb-3">
              Frequently asked questions
            </h2>
            <p className="text-[#6b6660] text-[15px] font-medium">
              Everything you need to know about pricing, warranties, and timelines.
            </p>
          </Reveal>

          <Reveal>
            <FAQAccordion items={homeFaqs} />
          </Reveal>
        </div>
      </section>

      {/* LEAD CTA */}
      <section id="consult" className="px-6 py-[clamp(72px,8vw,110px)] bg-[#0e5a43] text-white">
        <div className="max-w-[1240px] mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-[clamp(36px,5vw,64px)] items-center">
          <Reveal>
            <span className="inline-flex items-center gap-2.5 bg-white/10 rounded-full px-4 py-1.5 text-[11px] font-extrabold tracking-widest uppercase text-[#f2a007] mb-5">
              Free 45-Min Session
            </span>
            <h2 className="font-[family-name:var(--font-bricolage)] font-bold text-[clamp(32px,4.4vw,56px)] leading-[1.08] tracking-[-0.02em] mb-4">
              Let&rsquo;s talk about your <mark className="bg-transparent text-[#f2a007]">dream residence</mark>
            </h2>
            <p className="text-white/80 text-[16px] leading-[1.7] font-medium max-w-[500px] mb-8">
              Sit with a senior architect in {city}. We&rsquo;ll review your plot and floor plan, provide 3D design direction, and share an exact cost estimate with zero obligation.
            </p>
            <div className="grid grid-cols-3 gap-3 max-w-[450px]">
              {[
                { v: '₹0', l: 'Consultation Fee' },
                { v: '45 Days', l: 'Handover Guarantee' },
                { v: '10 Yrs', l: 'Material Warranty' },
              ].map((b) => (
                <div key={b.l} className="bg-white/10 rounded-xl p-3.5 text-center">
                  <b className="font-[family-name:var(--font-bricolage)] text-[20px] text-[#f2a007] block">
                    <CountUp value={b.v} />
                  </b>
                  <span className="text-[10.5px] uppercase tracking-wider text-white/70 font-semibold">{b.l}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={120} className="bg-white text-[#1b1b1b] rounded-[24px] p-7 sm:p-9 shadow-[0_24px_60px_rgba(0,0,0,0.25)]">
            <LeadForm studioName={cleanName || 'our architects'} waPhone={waPhone} />
          </Reveal>
        </div>
      </section>
    </div>
  );
}
