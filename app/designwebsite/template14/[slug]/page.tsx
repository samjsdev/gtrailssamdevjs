import { readSourceConfig } from '@/lib/dataBuilder';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Clock, Users, Heart, ShieldCheck, ArrowRight, Sparkles, Compass, Layers } from 'lucide-react';
import {
  cleanClinicName,
  cleanArchitectureTagline,
  cleanArchitectureDescription,
  cleanArchitectureServices,
  cleanArchitectureHighlights,
} from '@/lib/copyCleaner';
import { DEFAULT_ARCHITECTURE_REVIEWS, previewMedia } from '@/lib/architectureContent';
import Reveal from './Reveal';
import SeriesScroll, { SeriesTheme } from './SeriesScroll';
import TestimonialRotator, { Testimonial } from './TestimonialRotator';
import VisitForm from './VisitForm';
import FAQAccordion, { FAQItem } from './FAQAccordion';
import CountUp from '@/components/CountUp';
import PackagesSection from './PackagesSection';
import BeforeAfter from './BeforeAfter';

type PageProps = { params: Promise<{ slug: string }> };

const THEME_IMAGES = [
  '/images/architecture/civic-landmark-facade.webp',
  '/images/architecture/courtyard-water-residence.webp',
  '/images/architecture/porotherm-clay-facade.webp',
  '/images/architecture/monolithic-brutalist-facade.webp',
  '/images/architecture/modern-villa-duplex.webp',
];

const THEMES = [
  { name: 'Modern Beachfront Villas', desc: 'Spacious open balconies, private swimming pools, and floor-to-ceiling glass doors catching cool coastal sea breezes' },
  { name: 'Traditional Courtyard Homes', desc: 'Central open-to-sky courtyards (mutham) that naturally ventilate and cool your home with 100% Vaastu compliance' },
  { name: 'Heat-Proof Cool Brick Homes', desc: 'High-quality clay bricks, shaded verandas, and terracotta screens that keep indoor rooms 3°C to 5°C cooler' },
  { name: 'Independent Residential Houses', desc: 'Strong structural foundations, quality cement and steel, modern elevations, and low maintenance durability' },
  { name: 'City Duplex & Multi-Storey Homes', desc: 'Multi-generational G+2 luxury homes with covered car parking, lift provision, and private terrace gardens' },
];

const TACTILE_MATERIALS = [
  {
    title: 'Heat-Insulating Clay Bricks',
    desc: 'Hollow clay bricks with natural air pockets that reduce summer heat inside rooms by over 40% in Chennai.',
  },
  {
    title: 'Solid Granite Plinths & Teakwood Doors',
    desc: 'Granite stone plinths raised 3 to 4 feet high for total flood safety, and first-quality teakwood entrance doors.',
  },
  {
    title: 'Large Sound-Proof Glass Windows',
    desc: 'High-performance double-glazed glass that keeps out city noise and harsh afternoon heat while letting in daylight.',
  },
  {
    title: 'Terrace Heat-Reflective Cool Tiles',
    desc: 'White ceramic cool-roof tiles with waterproof coating that protect top-floor bedrooms from intense summer heat and monsoon leaks.',
  },
];

const ATELIER_VISIT = [
  {
    icon: Compass,
    number: '01',
    title: 'Plot Measurement & Rules Check',
    desc: 'We inspect your plot boundaries, road width, and municipal setback rules before drawing floor plans.',
  },
  {
    icon: Layers,
    number: '02',
    title: '100% Vaastu & 3D Elevation',
    desc: 'We place pooja room, kitchen, and bedrooms as per authentic Vaastu rules and design a realistic 3D exterior view.',
  },
  {
    icon: Sparkles,
    number: '03',
    title: 'Fixed Cost Estimate & Approvals',
    desc: 'You receive clear architectural drawings, municipal plan approval roadmap, and an itemised budget with zero hidden costs.',
  },
];

export default async function Template14Home({ params }: PageProps) {
  const { slug } = await params;
  const basePath = `/designwebsite/template14/${slug}`;

  const data = await readSourceConfig(slug, 'template14');
  if (!data) return notFound();

  const { clinic } = data;

  const media = previewMedia(data.media);
  const cleanName = cleanClinicName(clinic.name);
  const city = clinic.address?.city || 'Chennai';
  const cleanDesc = cleanArchitectureDescription(clinic.description, clinic.name, city);
  const cleanTagline = cleanArchitectureTagline(clinic.tagline);
  const phone = clinic.contact?.phone || '';
  const waPhone = phone.replace(/\D/g, '') || '919751396117';

  const heroImage =
    media.clinicImages?.[0] ||
    '/images/architecture/hero-villa-twilight.webp';
  const baBefore = '/images/architecture/villa-before-frame.webp';
  const baAfter = '/images/architecture/villa-after-finished.webp';

  const themes: SeriesTheme[] = THEMES.map((theme, idx) => ({
    ...theme,
    img: media.treatmentImages?.[idx] || THEME_IMAGES[idx],
  }));

  const reviewsSource = data.reviews?.length ? data.reviews : DEFAULT_ARCHITECTURE_REVIEWS;
  const testimonials: Testimonial[] = reviewsSource.slice(0, 3).map((review: any) => ({
    text: review.text || review.review || '',
    author: review.author || review.name || 'An estate patron',
    detail: `Commissioned Landmark · ${city}`,
  }));

  const philosophy = [
    {
      icon: Clock,
      title: 'Sunlight & Cross Ventilation',
      desc: 'East-facing verandas and large windows placed to capture natural morning light and evening sea breezes.',
    },
    {
      icon: Users,
      title: 'Multi-Generational Living',
      desc: 'Ground-floor elder-friendly bedrooms paired with spacious family living areas and private upper suites.',
    },
    {
      icon: Heart,
      title: 'Cool Courtyards & Greenery',
      desc: 'Open central courtyards and rainwater harvesting pits that naturally cool your home in Chennai heat.',
    },
    {
      icon: ShieldCheck,
      title: 'Primary Steel & Tested Concrete',
      desc: 'Tata Tiscon Fe550D reinforcement steel and UltraTech Grade-53 cement engineered for a lifetime of strength.',
    },
  ];

  const transformations = [
    {
      quote: '"A modern villa that gives us complete privacy, open garden views, and sea breeze."',
      title: 'Modern Beachfront Villa',
      desc: 'A luxury 4-BHK villa on ECR with private swimming pool, shaded balconies, sound-proof glass sliding doors, and lush garden landscape.',
      specs: [
        { b: '5,400 sq.ft', s: 'Built Area' },
        { b: '12 Months', s: 'Build Time' },
        { b: 'Modern Villa', s: 'Typology' },
        { b: city, s: 'Location' },
      ],
      img: media.treatmentImages?.[0] || '/images/architecture/civic-landmark-facade.webp',
      tag: 'Delivered · 12 Months',
    },
    {
      quote: '"The open central courtyard keeps our entire home naturally cool all summer."',
      title: 'Traditional Open Courtyard Home',
      desc: 'Organized around an open-to-sky central courtyard with natural cross ventilation, heat-insulating brick walls, and 100% Vaastu alignment.',
      specs: [
        { b: '6,800 sq.ft', s: 'Built Area' },
        { b: '14 Months', s: 'Build Time' },
        { b: 'Courtyard Home', s: 'Typology' },
        { b: city, s: 'Location' },
      ],
      img: media.treatmentImages?.[1] || '/images/architecture/courtyard-water-residence.webp',
      tag: 'Delivered · 14 Months',
    },
  ];

  const journey = [
    { title: 'Plot Inspection & Dialogue', desc: 'A personal consultation regarding plot size, road width, and municipal rules.' },
    { title: '3D Elevation & Floor Plans', desc: 'Realistic 3D views and 100% Vaastu compliant floor plans tailored to your family.' },
    { title: 'CMDA Approvals & Engineering', desc: 'Government building plan sanction filing and structural engineering calculations.' },
    { title: 'Quality Civil Construction', desc: 'Primary Tata Tiscon steel, UltraTech Grade-53 cement, and daily engineer supervision.' },
    { title: 'Key Handover & 10-Year Warranty', desc: 'A completed dream home backed by our 10-year comprehensive structural warranty.' },
  ];

  const homeFaqs: FAQItem[] = [
    {
      q: `How is ${cleanName || 'our atelier'} different from commercial contracting firms?`,
      a: 'We limit our active commissions each year so our principal architect and senior structural engineers personally oversee every foundation pour, curtain wall detail, and site milestone.',
      tag: 'Atelier Approach',
    },
    {
      q: 'Can we experience physical material samples before commissioning?',
      a: `Yes. During your atelier visit in ${city}, you will examine board-marked concrete mockups, Low-E solar glass panels, natural granite slabs, and 3D printed massing models.`,
      tag: 'Materials Library',
    },
    {
      q: 'What is your structural warranty and post-handover commitment?',
      a: 'We provide an unconditional 10-year structural warranty certificate covering deep RCC foundations and external waterproofing integrity.',
      tag: '10-Year Warranty',
    },
    {
      q: 'How are civil budgets and scope managed?',
      a: 'Every project receives an exhaustive line-item Bill of Quantities (BOQ). Once approved, the budget is contractually locked with zero cost escalations.',
      tag: 'Price Guarantee',
    },
  ];

  return (
    <div>
      {/* HERO */}
      <section className="relative min-h-[90vh] py-24 sm:py-32 flex items-center text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt={`Architectural landmarks designed by ${cleanName || 'our atelier'}`}
            className="w-full h-full object-cover animate-[t4zoom_22s_ease-in-out_infinite_alternate]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(23,19,15,0.4)_0%,rgba(23,19,15,0.25)_45%,rgba(23,19,15,0.94)_100%)]" />
        </div>
        <div className="relative w-full max-w-[1240px] mx-auto px-[30px]">
          <div className="flex items-center gap-3 text-[11.5px] font-semibold tracking-[0.3em] uppercase text-[#d9c49a] before:content-[''] before:w-8 before:h-px before:bg-[#d9c49a]">
            Architectural Design &amp; Turnkey Construction · {city}
          </div>
          <h1 className="font-[family-name:var(--font-cormorant)] text-[clamp(44px,6.2vw,86px)] font-light leading-[1.02] mt-4 mb-5 max-w-[820px]">
            {cleanTagline}
          </h1>
          <p className="text-white/85 text-[17px] font-light max-w-[560px] leading-relaxed mb-9">
            {cleanDesc}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href={`${basePath}/contact`}
              className="inline-flex items-center gap-2 bg-[#a4532f] text-white text-[10.5px] sm:text-[11.5px] font-semibold tracking-[0.18em] uppercase px-5 py-3 sm:px-6 transition-all duration-300 hover:bg-[#854021] hover:-translate-y-0.5"
            >
              Book Consultation <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </Link>
            <Link
              href={`${basePath}/gallery`}
              className="inline-flex items-center gap-2 bg-transparent text-white text-[10.5px] sm:text-[11.5px] font-semibold tracking-[0.18em] uppercase px-5 py-3 sm:px-6 border border-white/40 transition-all duration-300 hover:bg-white/10"
            >
              View Completed Projects
            </Link>
          </div>
        </div>
      </section>

      {/* REAL TRANSFORMATION (BEFORE/AFTER) - SINGLE COLUMN IMMERSIVE */}
      <section className="py-24 px-[30px] bg-[#fbf8f1] border-b border-[#221c14]/12">
        <div className="max-w-[1100px] mx-auto text-center">
          <Reveal className="max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-3 text-[11.5px] font-semibold tracking-[0.3em] uppercase text-[#a4532f] before:content-[''] before:w-8 before:h-px before:bg-[#a4532f] after:content-[''] after:w-8 after:h-px after:bg-[#a4532f] mb-3">
              Real Transformation
            </div>
            <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(32px,4.5vw,52px)] font-light leading-[1.08] mb-4">
              From raw topography to a <em className="italic font-normal text-[#a4532f]">completed landmark</em>
            </h2>
            <p className="text-[#7a6f60] text-[15.5px] font-light leading-[1.8]">
              See how our structural engineering, spacious shaded verandas, and double-glazed curtain walls transform raw topography into a luminous, climate-responsive estate.
            </p>
          </Reveal>

          <Reveal delay={100} className="w-full">
            <BeforeAfter
              beforeImage={baBefore}
              afterImage={baAfter}
              caption="Drag slider to compare raw structural RCC frame vs completed architectural landmark"
            />
          </Reveal>

          <Reveal delay={200} className="mt-9 flex flex-wrap items-center justify-center gap-5 sm:gap-8">
            <div className="inline-flex items-center gap-3 bg-white border border-[#221c14]/10 px-5 py-3 shadow-sm">
              <b className="font-[family-name:var(--font-cormorant)] [font-variant-numeric:lining-nums] text-[24px] font-semibold text-[#a4532f]">
                <CountUp value="10-Year" />
              </b>
              <span className="text-[11.5px] text-[#7a6f60] font-light tracking-wider uppercase">Structural Warranty</span>
            </div>
            <div className="inline-flex items-center gap-3 bg-white border border-[#221c14]/10 px-5 py-3 shadow-sm">
              <b className="font-[family-name:var(--font-cormorant)] [font-variant-numeric:lining-nums] text-[24px] font-semibold text-[#a4532f]">
                <CountUp value="100%" />
              </b>
              <span className="text-[11.5px] text-[#7a6f60] font-light tracking-wider uppercase">Fe550D TMT Steel</span>
            </div>
            <Link
              href={`${basePath}/contact`}
              className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-[0.18em] uppercase text-[#a4532f] border-b border-[#a4532f] pb-1 hover:gap-3.5 transition-all"
            >
              Get a feasibility report for your plot <ArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ATELIER VISIT */}
      <section className="py-24 bg-white border-b border-[#221c14]/12">
        <div className="max-w-[1240px] mx-auto px-[30px] grid lg:grid-cols-[0.82fr_1.18fr] gap-12 lg:gap-20 items-start">
          <Reveal className="lg:sticky lg:top-28">
            <div className="flex items-center gap-3 text-[11.5px] font-semibold tracking-[0.3em] uppercase text-[#a4532f] before:content-[''] before:w-8 before:h-px before:bg-[#a4532f]">
              Your First Visit
            </div>
            <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(34px,4.5vw,54px)] font-semibold leading-[1.04] mt-3.5 mb-4">
              A conversation before the <em className="italic text-[#a4532f]">commitment</em>
            </h2>
            <p className="text-[#7a6f60] text-[15.5px] font-light leading-[1.8] max-w-[440px] mb-8">
              The best homes begin with attentive listening. Bring your plot Patta or FMB sketch, zoning parameters, and spatial wishlist for an exact feasibility, FSI, and microclimate analysis.
            </p>
            <Link
              href={`${basePath}/contact`}
              className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-widest uppercase text-[#a4532f] border-b border-[#a4532f] pb-0.5 hover:gap-3 transition-all"
            >
              Arrange a Studio Visit <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </Reveal>

          <div className="grid gap-4">
            {ATELIER_VISIT.map((item, idx) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.number} delay={idx * 90}>
                  <article className="grid sm:grid-cols-[78px_1fr_auto] gap-5 sm:items-center bg-[#fbf8f1] border border-[#221c14]/12 p-6 sm:p-7 transition-all duration-300 hover:border-[#a4532f]/45 hover:shadow-[0_16px_38px_rgba(23,19,15,0.06)]">
                    <span className="w-14 h-14 rounded-full bg-white border border-[#a4532f]/22 text-[#a4532f] grid place-items-center">
                      <Icon className="w-5 h-5" strokeWidth={1.7} />
                    </span>
                    <div>
                      <span className="text-[10.5px] font-semibold tracking-[0.22em] uppercase text-[#a4532f]">Chapter {item.number}</span>
                      <h3 className="font-[family-name:var(--font-cormorant)] text-[25px] font-semibold text-[#17130f] mt-1 mb-1.5">{item.title}</h3>
                      <p className="text-[13.5px] text-[#7a6f60] font-light leading-[1.7]">{item.desc}</p>
                    </div>
                    <span className="hidden sm:block font-[family-name:var(--font-cormorant)] text-[30px] text-[#a4532f]/55">/{item.number}</span>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* SERIES THEMES */}
      <section className="py-24 bg-[#fbf8f1] border-b border-[#221c14]/12">
        <div className="max-w-[1240px] mx-auto px-[30px]">
          <Reveal className="flex flex-wrap justify-between items-end gap-6 mb-12">
            <div>
              <div className="flex items-center gap-3 text-[11.5px] font-semibold tracking-[0.3em] uppercase text-[#a4532f] before:content-[''] before:w-8 before:h-px before:bg-[#a4532f]">
                Design Series
              </div>
              <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(32px,4.5vw,52px)] font-semibold leading-[1.08] mt-3">
                Five distinct <em className="italic text-[#a4532f]">living narratives</em>
              </h2>
            </div>
            <p className="text-[#7a6f60] text-[15px] font-light max-w-[420px]">
              Every home starts from an architectural dialogue — here are five themes we frequently tailor for {city} residences.
            </p>
          </Reveal>

          <Reveal>
            <SeriesScroll themes={themes} collection="Architectural Series" />
          </Reveal>
        </div>
      </section>

      {/* TACTILE MATERIALS ATELIER */}
      <section className="py-24 bg-[#17130f] text-white">
        <div className="max-w-[1240px] mx-auto px-[30px]">
          <Reveal className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-3 text-[11.5px] font-semibold tracking-[0.3em] uppercase text-[#d9c49a] before:content-[''] before:w-8 before:h-px before:bg-[#d9c49a] after:content-[''] after:w-8 after:h-px after:bg-[#d9c49a]">
              The Material Palette
            </div>
            <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(32px,4.5vw,52px)] font-light leading-[1.08] mt-3 mb-4">
              Tactile luxury, <em className="italic text-[#d9c49a]">honestly sourced</em>
            </h2>
              <p className="text-white/70 font-light text-[15.5px]">
              We select materials that age with grace. Board-marked concrete, natural stone, and brushed brass that feel rich to the touch.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TACTILE_MATERIALS.map((mat, idx) => (
              <Reveal key={mat.title} delay={idx * 80}>
                <div className="bg-[#221c16] border border-[#b08d4f]/25 p-8 h-full flex flex-col justify-between hover:border-[#d9c49a] transition-colors">
                  <div>
                    <span className="font-[family-name:var(--font-cormorant)] text-[22px] text-[#d9c49a] block mb-3">
                      0{idx + 1}
                    </span>
                    <h3 className="font-[family-name:var(--font-cormorant)] text-[22px] text-white font-semibold mb-2.5">
                      {mat.title}
                    </h3>
                    <p className="text-[13.5px] font-light text-white/70 leading-[1.7]">
                      {mat.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="py-24 bg-white">
        <div className="max-w-[1240px] mx-auto px-[30px]">
          <Reveal className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-3 text-[11.5px] font-semibold tracking-[0.3em] uppercase text-[#a4532f] before:content-[''] before:w-8 before:h-px before:bg-[#a4532f] after:content-[''] after:w-8 after:h-px after:bg-[#a4532f]">
              Spatial Ethos
            </div>
            <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(32px,4.5vw,52px)] font-semibold leading-[1.08] mt-3 mb-4">
              Homes tuned to <em className="italic text-[#a4532f]">how you live</em>
            </h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {philosophy.map((item, idx) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.title} delay={idx * 80}>
                  <div className="bg-[#fbf8f1] border border-[#221c14]/12 p-8 h-full flex flex-col justify-between">
                    <div>
                      <span className="w-12 h-12 rounded-full bg-[#f5f1e8] grid place-items-center mb-5 text-[#a4532f]">
                        <Icon className="w-5 h-5" strokeWidth={1.8} />
                      </span>
                      <h3 className="font-[family-name:var(--font-cormorant)] text-[22px] font-semibold mb-2.5">{item.title}</h3>
                      <p className="text-[13.5px] text-[#7a6f60] font-light leading-[1.65]">{item.desc}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* TRANSFORMATIONS */}
      <section className="py-24 bg-[#fbf8f1] border-y border-[#221c14]/12">
        <div className="max-w-[1240px] mx-auto px-[30px]">
          <Reveal className="mb-14">
            <div className="flex items-center gap-3 text-[11.5px] font-semibold tracking-[0.3em] uppercase text-[#a4532f] before:content-[''] before:w-8 before:h-px before:bg-[#a4532f]">
              Completed Commissions
            </div>
            <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(32px,4.5vw,52px)] font-semibold leading-[1.08] mt-3">
              Stories from our delivered residences
            </h2>
          </Reveal>

          <div className="grid lg:grid-cols-2 gap-10">
            {transformations.map((t, idx) => (
              <Reveal key={t.title} delay={idx * 100}>
                <div className="bg-white border border-[#221c14]/12 overflow-hidden flex flex-col justify-between h-full shadow-[0_16px_40px_rgba(23,19,15,0.06)]">
                  <div className="aspect-[16/10] overflow-hidden relative">
                    <span className="absolute top-4 left-4 z-10 bg-[#17130f] text-[#d9c49a] text-[10.5px] tracking-wider uppercase px-3 py-1 font-semibold">
                      {t.tag}
                    </span>
                    <img src={t.img} alt={t.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-8">
                    <blockquote className="font-[family-name:var(--font-cormorant)] italic text-[22px] text-[#a4532f] mb-2">
                      {t.quote}
                    </blockquote>
                    <h3 className="font-[family-name:var(--font-cormorant)] text-[24px] font-semibold text-[#17130f] mb-3">
                      {t.title}
                    </h3>
                    <p className="text-[14px] text-[#7a6f60] font-light leading-[1.7] mb-6">
                      {t.desc}
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-[#221c14]/10 pt-4 mb-6">
                      {t.specs.map((sp) => (
                        <div key={sp.s}>
                          <b className="font-[family-name:var(--font-cormorant)] text-[16px] font-semibold block leading-tight">{sp.b}</b>
                          <span className="text-[10px] tracking-wider uppercase text-[#7a6f60]">{sp.s}</span>
                        </div>
                      ))}
                    </div>
                    <Link
                      href={`${basePath}/contact`}
                      className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-widest uppercase text-[#a4532f] border-b border-[#a4532f] pb-0.5"
                    >
                      Enquire for your home <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PACKAGES */}
      <PackagesSection basePath={basePath} />

      {/* 5-STEP JOURNEY */}
      <section className="py-24 bg-[#17130f] text-white">
        <div className="max-w-[1240px] mx-auto px-[30px]">
          <Reveal className="mb-14 text-center max-w-xl mx-auto">
            <div className="inline-flex items-center gap-3 text-[11.5px] font-semibold tracking-[0.3em] uppercase text-[#d9c49a] before:content-[''] before:w-8 before:h-px before:bg-[#d9c49a] after:content-[''] after:w-8 after:h-px after:bg-[#d9c49a]">
              The Process
            </div>
            <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(32px,4.5vw,52px)] font-light leading-[1.08] mt-3">
              The five movements of our craft
            </h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {journey.map((j, idx) => (
              <Reveal key={j.title} delay={idx * 70}>
                <div className="bg-[#221c16] border border-[#b08d4f]/25 p-7 h-full flex flex-col justify-between">
                  <div>
                    <span className="font-[family-name:var(--font-cormorant)] text-[26px] text-[#d9c49a] block mb-3">
                      0{idx + 1}
                    </span>
                    <h3 className="font-[family-name:var(--font-cormorant)] text-[20px] font-semibold text-white mb-2">
                      {j.title}
                    </h3>
                    <p className="text-[13px] font-light text-white/70 leading-[1.65]">{j.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 bg-white">
        <div className="max-w-[1240px] mx-auto px-[30px]">
          <Reveal className="mb-12 text-center max-w-xl mx-auto">
            <div className="inline-flex items-center gap-3 text-[11.5px] font-semibold tracking-[0.3em] uppercase text-[#a4532f] before:content-[''] before:w-8 before:h-px before:bg-[#a4532f] after:content-[''] after:w-8 after:h-px after:bg-[#a4532f]">
              Voices
            </div>
            <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(32px,4.5vw,52px)] font-semibold leading-[1.08] mt-3">
              Kind words from our patrons
            </h2>
          </Reveal>

          <Reveal>
            <TestimonialRotator items={testimonials} />
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-[#fbf8f1] border-t border-[#221c14]/12">
        <div className="max-w-[860px] mx-auto px-[30px]">
          <Reveal className="text-center mb-12">
            <div className="inline-flex items-center gap-3 text-[11.5px] font-semibold tracking-[0.3em] uppercase text-[#a4532f] before:content-[''] before:w-8 before:h-px before:bg-[#a4532f] after:content-[''] after:w-8 after:h-px after:bg-[#a4532f]">
              Good Inquiries
            </div>
            <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(30px,4vw,48px)] font-semibold leading-[1.08] mt-3">
              Questions before embarking
            </h2>
          </Reveal>

          <Reveal>
            <FAQAccordion items={homeFaqs} />
          </Reveal>
        </div>
      </section>

      {/* APPOINTMENT FORM */}
      <section id="appointment" className="py-24 bg-[#17130f] text-white">
        <div className="max-w-[1240px] mx-auto px-[30px] grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
          <Reveal>
            <div className="flex items-center gap-3 text-[11.5px] font-semibold tracking-[0.3em] uppercase text-[#d9c49a] before:content-[''] before:w-8 before:h-px before:bg-[#d9c49a]">
              Private Consultation
            </div>
            <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(34px,4.8vw,58px)] font-light leading-[1.08] mt-4 mb-4">
              Begin your residence with a <em className="italic text-[#d9c49a]">quiet conversation</em>
            </h2>
            <p className="text-white/80 text-[16px] font-light leading-relaxed max-w-[500px] mb-8">
              A private 45-minute studio meeting with our principal architect — site and bylaw audit, 3D massing direction, and a clear itemised budget for your {city} property.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-[450px]">
              <div className="bg-white/10 p-3.5 text-center">
                <b className="font-[family-name:var(--font-cormorant)] text-[22px] text-[#d9c49a] block">
                  1-on-1
                </b>
                <span className="text-[10px] uppercase tracking-wider text-white/70 font-semibold">With Architect</span>
              </div>
              <div className="bg-white/10 p-3.5 text-center">
                <b className="font-[family-name:var(--font-cormorant)] [font-variant-numeric:lining-nums] text-[22px] text-[#d9c49a] block">
                  10-Year
                </b>
                <span className="text-[10px] uppercase tracking-wider text-white/70 font-semibold">Craft Warranty</span>
              </div>
              <div className="bg-white/10 p-3.5 text-center">
                <b className="font-[family-name:var(--font-outfit)] text-[20px] font-medium text-[#d9c49a] block">
                  ₹0
                </b>
                <span className="text-[10px] uppercase tracking-wider text-white/70 font-semibold">Consultation Fee</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120} className="bg-white text-[#17130f] p-8 sm:p-10 shadow-[0_24px_60px_rgba(0,0,0,0.35)] border border-[#b08d4f]/30">
            <VisitForm studioName={cleanName || 'the studio'} waPhone={waPhone} dark={false} />
          </Reveal>
        </div>
      </section>
    </div>
  );
}
