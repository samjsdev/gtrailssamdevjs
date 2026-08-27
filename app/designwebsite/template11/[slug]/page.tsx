import { readSourceConfig } from '@/lib/dataBuilder';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  ShieldCheck, FileText, Clock, BadgeCheck, CheckCircle2,
  Sparkles, Layers, Hammer, Compass, Award, ArrowRight
} from 'lucide-react';
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
  getArchitectureServiceSummary,
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

type PageProps = {
  params: Promise<{ slug: string }>;
};

const SERVICE_FALLBACK_IMAGES = [
  '/images/architecture/villa-before-frame.webp',
  '/images/architecture/bim-3d-walkthrough.webp',
  '/images/architecture/cmda-sanction-drafting.webp',
  '/images/architecture/staad-structural-engineering.webp',
];

const PORTFOLIO_FALLBACK_IMAGES = [
  '/images/architecture/hero-villa-twilight.webp',
  '/images/architecture/modern-villa-duplex.webp',
  '/images/architecture/civic-landmark-facade.webp',
  '/images/architecture/courtyard-water-residence.webp',
  '/images/architecture/porotherm-clay-facade.webp',
  '/images/architecture/monolithic-brutalist-facade.webp',
];

const PROCESS_STEPS = [
  {
    title: 'Plot Visit & Requirement Discussion',
    desc: 'Meet our architects directly on your plot. We check road width, boundary measurements, soil condition, and understand your family requirements.',
  },
  {
    title: '3D Elevation & CMDA Plan Approval',
    desc: 'We create realistic 3D exterior elevation views and detailed floor plans. We prepare and submit all drawings for quick CMDA and Corporation approval.',
  },
  {
    title: 'Structural Engineering & Quality Materials',
    desc: 'Complete structural calculations for safe foundations, Tata Tiscon Fe550D steel detailing, and clear electrical and plumbing plans.',
  },
  {
    title: 'Quality Civil Construction & Key Handover',
    desc: 'Daily site supervision, tested cement and steel, quality brickwork, regular photo updates, and key handover with a 10-year structural warranty.',
  },
];

const DESIGN_PILLARS = [
  {
    icon: Compass,
    title: 'Natural Sunlight & Fresh Air',
    desc: 'Smart window and door placement that brings in bright morning light while keeping rooms cool and naturally ventilated during hot Chennai summers.',
  },
  {
    icon: Hammer,
    title: 'Strong Foundations & Quality Materials',
    desc: 'Tested Tata Tiscon steel, UltraTech cement, and solid granite stone plinths built 3 to 4 feet high for total flood and rain protection.',
  },
  {
    icon: Layers,
    title: 'Traditional Open Courtyard',
    desc: 'Modern open courtyards that draw out hot air and bring in cool breezes, keeping living areas naturally comfortable all year round.',
  },
  {
    icon: Sparkles,
    title: 'Villas, Residential & Commercial',
    desc: 'Purpose-planned architecture with efficient floor plans, high ceilings, and smart space planning tailored for luxury villas, independent residences, and commercial buildings.',
  },
];

export default async function Template11Home({ params }: PageProps) {
  const { slug } = await params;
  const basePath = `/designwebsite/template11/${slug}`;

  const data = await readSourceConfig(slug, 'template11');
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
    '/images/architecture/hero-villa-twilight.webp';
  const aboutImage =
    media.clinicImages?.[1] ||
    '/images/architecture/architectural-atelier-studio.webp';
  const whyImage =
    media.treatmentImages?.[0] ||
    '/images/architecture/porotherm-clay-facade.webp';
  const ctaImage =
    media.otherImages?.[0] ||
    '/images/architecture/modern-villa-duplex.webp';

  const servicesList: string[] = cleanArchitectureServices(business.services, DEFAULT_ARCHITECTURE_SERVICES);
  const highlights: string[] = cleanArchitectureHighlights(business.highlights, DEFAULT_ARCHITECTURE_HIGHLIGHTS);
  const doctorSpecialization = cleanArchitectureSpecialization(doctor?.specialization);
  const reviews = data.reviews?.length ? data.reviews : DEFAULT_ARCHITECTURE_REVIEWS;
  const rating = business.rating || '4.9';
  const reviewCount = parseInt(String(business.reviewCount || '').replace(/\D/g, ''), 10) || (reviews.length ? reviews.length * 15 : 120);
  const experienceYears = doctor?.experience?.replace(/\D/g, '') || '14';
  const servicesCount = servicesList.length || 6;

  const services = servicesList.slice(0, 6).map((svc: string, idx: number) => {
    const detail = getArchitectureServiceData(svc);
    return {
      title: svc,
      tagline: detail?.tagline || 'Custom built for your family with fixed cost and 10-year warranty.',
      desc: detail?.description || getArchitectureServiceSummary(svc),
      img:
        media.treatmentImages?.[idx] ||
        media.otherImages?.[6 + idx] ||
        getArchitectureServiceImage(svc, media) ||
        SERVICE_FALLBACK_IMAGES[idx % SERVICE_FALLBACK_IMAGES.length],
      benefits: detail?.benefits || [
        'Council of Architecture registered architects and civil engineers',
        'Direct supervision with daily site progress updates',
        '100% compliance with Chennai municipal building setback rules',
      ],
      process: detail?.process || [
        'Plot inspection and family requirement discussion',
        '3D elevation design, structural drawings, and municipal approval',
        'Civil construction, quality inspection, and key handover',
      ],
    };
  });

  const gallery = (
    media.clinicImages?.length ? media.clinicImages : PORTFOLIO_FALLBACK_IMAGES
  ).slice(0, 6);

  const heroStats: HeroStat[] = [
    { value: parseFloat(experienceYears) || 14, suffix: '+ Yrs', label: 'In Chennai' },
    { value: Math.max(reviewCount, 150), suffix: '+', label: 'Delivered Projects' },
    { value: parseFloat(rating) || 4.9, decimals: 1, suffix: '★', label: 'Client Rating' },
    { value: 100, suffix: '%', label: 'CMDA Approved' },
  ];

  const whyChecks = [
    { icon: ShieldCheck, title: highlights[0] || 'Licensed Architects & Civil Engineers', desc: 'Council of Architecture registered professionals managing your project from soil testing to key handover.' },
    { icon: FileText, title: highlights[1] || '100% CMDA & Corporation Plan Approvals', desc: 'Fast building plan approvals adhering strictly to Chennai setback and road width rules.' },
    { icon: Clock, title: highlights[2] || 'Tata Tiscon Steel & Grade-53 Cement', desc: 'Tested corrosion-resistant primary steel and certified ready-mix concrete with lab strength reports.' },
    { icon: BadgeCheck, title: highlights[3] || '100% Vaastu & Smart Natural Ventilation', desc: 'Auspicious room placement with open courtyards that keep your home naturally cool in summer.' },
  ];

  const homeFaqs: FAQItem[] = [
    {
      q: `How does the architectural consultation work in ${city}?`,
      a: `Our initial consultation is held at our office or directly on your plot. We inspect your Patta and FMB sketch, review CMDA/DTCP rules, analyze plot orientation, and show you practical floor plan options.`,
      tag: 'Consultation',
    },
    {
      q: 'How long does it take to obtain CMDA or Chennai Corporation building permits?',
      a: `Building sanction drawings compliant with Tamil Nadu rules are completed within 10 to 14 days. Government online single-window approval usually takes 4 to 6 weeks, during which we finalize your 3D views and structural drawings.`,
      tag: 'Plan Approvals',
    },
    {
      q: 'Do you design 100% Vaastu-compliant layouts for Chennai homes?',
      a: `Yes. We place the pooja room and underground water sump in the North-East (Eesanyan), the kitchen in the South-East (Agni), and master bedroom in the South-West (Niruthi), while keeping the rooms modern, spacious, and bright.`,
      tag: 'Vaastu Planning',
    },
    {
      q: 'How do you engineer foundations for Chennai soils (ECR sand vs. OMR/Velachery clay)?',
      a: `We always conduct a soil test first. For sandy soil on ECR, we use reinforced raft footings. For clayey soil and high water tables in OMR, Velachery, and Tambaram, we use deep pile foundations so your house never develops cracks.`,
      tag: 'Soil & Foundations',
    },
    {
      q: 'How do you prevent construction cost increases during building?',
      a: `Every material—from Tata Tiscon 550D steel and UltraTech cement to plumbing and electricals—is clearly listed with fixed rates in a signed contract before starting work. We guarantee zero price increases on approved drawings.`,
      tag: 'Budget Guarantee',
    },
  ];

  return (
    <div>
      {/* HERO */}
      <section id="hero" className="relative min-h-[82vh] lg:min-h-[88vh] flex items-center text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt={`${cleanName || 'Our'} completed architectural project`}
            className="w-full h-full object-cover"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#120d09]/92 via-[#120d09]/65 to-transparent" />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-24 w-full">
          <div className="max-w-2xl">
            <span className="text-[11px] sm:text-[12px] tracking-[0.32em] uppercase text-[#c9ab7c] font-medium block mb-4">
              Architecture &amp; Turnkey Construction · {city}
            </span>

            <h1 className="font-[family-name:var(--font-marcellus)] text-[clamp(36px,4.8vw,64px)] leading-[1.12] text-white">
              {cleanTagline}
            </h1>

            <p className="mt-5 mb-8 max-w-xl text-[16px] sm:text-[17.5px] font-light leading-[1.7] text-white/85">
              {cleanDesc}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href={`${basePath}/contact`}
                className="inline-flex items-center justify-center bg-[#a58150] text-white px-7 py-3.5 text-[11px] sm:text-[11.5px] tracking-[0.2em] uppercase font-medium hover:bg-[#8f6e40] transition-colors duration-300 shadow-md shadow-black/30"
              >
                Book Consultation
              </Link>
              <Link
                href={`${basePath}/gallery`}
                className="inline-flex items-center justify-center bg-white/5 backdrop-blur-sm text-white px-7 py-3.5 text-[11px] sm:text-[11.5px] tracking-[0.2em] uppercase font-medium border border-white/30 hover:border-white hover:bg-white/15 transition-all duration-300"
              >
                View Completed Projects
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-[#18120c] border-b border-[#211a13]/20">
        <HeroStats stats={heroStats} />
      </section>

      {/* REAL TRANSFORMATION (BEFORE/AFTER) - SINGLE COLUMN IMMERSIVE */}
      <section className="py-[clamp(72px,8vw,110px)] px-6 lg:px-7 bg-[#fdfbf6] border-b border-[#211a13]/10">
        <div className="max-w-[1100px] mx-auto text-center">
          <Reveal className="max-w-2xl mx-auto mb-10">
            <span className="inline-flex items-center gap-3.5 text-[12px] tracking-[0.38em] uppercase text-[#a58150] mb-4 before:content-[''] before:w-10 before:h-px before:bg-[#a58150] after:content-[''] after:w-10 after:h-px after:bg-[#a58150]">
              Real Transformation
            </span>
            <h2 className="font-[family-name:var(--font-marcellus)] text-[clamp(30px,3.8vw,50px)] leading-[1.12] mb-4">
              From raw topography to a{' '}
              <em className="not-italic italic font-light text-[#a58150]">completed landmark</em>
            </h2>
            <p className="text-[#7d7264] leading-[1.85] font-light text-[15.5px]">
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
            <div className="inline-flex items-center gap-3 bg-white border border-[#211a13]/10 px-5 py-3 shadow-sm">
              <b className="font-[family-name:var(--font-marcellus)] text-[24px] font-normal text-[#a58150]">
                <CountUp value="10-Year" />
              </b>
              <span className="text-[11.5px] text-[#7d7264] tracking-wider uppercase font-light">Structural Warranty</span>
            </div>
            <div className="inline-flex items-center gap-3 bg-white border border-[#211a13]/10 px-5 py-3 shadow-sm">
              <b className="font-[family-name:var(--font-marcellus)] text-[24px] font-normal text-[#a58150]">
                <CountUp value="100%" />
              </b>
              <span className="text-[11.5px] text-[#7d7264] tracking-wider uppercase font-light">Fe550D TMT Steel</span>
            </div>
            <Link
              href={`${basePath}/contact`}
              className="inline-flex items-center gap-2 text-[12px] font-medium tracking-[0.2em] uppercase text-[#211a13] border-b-2 border-[#a58150] pb-1 hover:text-[#a58150] hover:border-[#211a13] transition-all"
            >
              Get a feasibility report for your plot <ArrowRight className="w-4 h-4 text-[#a58150]" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ABOUT STUDIO */}
      <section id="about" className="py-[clamp(84px,9vw,130px)] px-6 lg:px-7">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.05fr_0.95fr] gap-[clamp(44px,6vw,90px)] items-center">
          <Reveal>
            <div className="relative before:content-[''] before:absolute before:-left-4 before:-top-4 before:right-14 before:bottom-14 before:border before:border-[#a58150]">
              <div className="overflow-hidden aspect-[4/4.7] group">
                <img
                  src={aboutImage}
                  alt={`${cleanName || 'Architects'} office and project models`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(.19,1,.22,1)] group-hover:scale-[1.04]"
                />
              </div>
              <div className="absolute -right-2 sm:-right-4 bottom-11 bg-[#211a13] text-white px-8 py-7 shadow-[0_30px_60px_rgba(33,26,19,0.3)]">
                <b className="font-[family-name:var(--font-marcellus)] font-normal text-[44px] text-[#c9ab7c] block leading-none">
                  <CountUp value={experienceYears} suffix="+" />
                </b>
                <span className="text-[11px] tracking-[0.3em] uppercase text-white/65">Years in {city}</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <span className="flex items-center gap-3.5 text-[12px] tracking-[0.38em] uppercase text-[#a58150] mb-4 before:content-[''] before:w-10 before:h-px before:bg-[#a58150]">
              About Our Studio
            </span>
            <h2 className="font-[family-name:var(--font-marcellus)] text-[clamp(32px,3.8vw,52px)] leading-[1.12] mb-6">
              Quality architectural design and{' '}
              <em className="not-italic font-light italic text-[#a58150]">trusted construction</em>
            </h2>
            <p className="text-[#7d7264] leading-[1.85] font-light mb-4.5 text-[15.5px]">
              {cleanDesc}
            </p>
            <p className="text-[#7d7264] leading-[1.85] font-light text-[15.5px]">
              Led by {doctor?.name || 'our Principal Architect & Senior Civil Engineers'} ({doctorSpecialization}), we provide complete single-point service: custom 3D elevations, CMDA approved plans, soil-tested foundations, and turnkey civil construction with zero budget increases.
            </p>
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-5 my-8">
              {highlights.slice(0, 4).map((h) => (
                <div key={h} className="border-t border-[#211a13]/10 pt-4">
                  <b className="font-[family-name:var(--font-marcellus)] font-normal text-[17px] block mb-1.5">{h}</b>
                  <span className="text-[13px] text-[#7d7264] font-light">Built strictly as per government regulations and engineering standards.</span>
                </div>
              ))}
            </div>
            <Link
              href={`${basePath}/about`}
              className="inline-flex items-center gap-2 bg-transparent text-[#211a13] px-5 py-3 sm:px-6 sm:py-3.5 text-[10.5px] sm:text-[11.5px] tracking-[0.2em] uppercase font-medium border border-[#211a13] hover:bg-[#211a13] hover:text-white transition-colors duration-300"
            >
              Our Philosophy
            </Link>
          </Reveal>
        </div>
      </section>

      {/* DESIGN PILLARS */}
      <section className="py-[clamp(84px,9vw,120px)] px-6 lg:px-7 bg-[#211a13] text-white">
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center max-w-3xl mx-auto mb-[clamp(44px,5vw,72px)]">
            <span className="inline-flex items-center gap-3.5 text-[12px] tracking-[0.38em] uppercase text-[#c9ab7c] mb-4 before:content-[''] before:w-10 before:h-px before:bg-[#c9ab7c] after:content-[''] after:w-10 after:h-px after:bg-[#c9ab7c]">
              Why Our Homes Are Different
            </span>
            <h2 className="font-[family-name:var(--font-marcellus)] text-[clamp(34px,4.2vw,56px)] leading-[1.1] mb-5">
              Four things we follow <em className="not-italic italic font-light text-[#c9ab7c]">in every home</em>
            </h2>
            <p className="text-white/70 font-light text-[15.5px] leading-relaxed">
              Every plan we draw follows four simple rules, so your home stays comfortable in summer, safe during heavy rain, and strong for generations.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {DESIGN_PILLARS.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <Reveal key={pillar.title} delay={idx * 80}>
                  <div className="bg-[#2c231a] border border-[#a58150]/20 p-8 h-full flex flex-col justify-between transition-all duration-300 hover:border-[#a58150] hover:-translate-y-1">
                    <div>
                      <span className="w-12 h-12 border border-[#a58150] grid place-items-center mb-6 text-[#c9ab7c]">
                        <Icon className="w-5 h-5" strokeWidth={1.8} />
                      </span>
                      <h3 className="font-[family-name:var(--font-marcellus)] font-normal text-[20px] mb-3 text-white">
                        {pillar.title}
                      </h3>
                      <p className="text-[13.5px] font-light text-white/70 leading-[1.7]">
                        {pillar.desc}
                      </p>
                    </div>
                    <span className="font-[family-name:var(--font-marcellus)] text-[14px] text-[#a58150] mt-6 block">
                      0{idx + 1}
                    </span>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-[clamp(84px,9vw,130px)] px-6 lg:px-7 bg-[#fdfbf6] border-y border-[#211a13]/10">
        <div className="max-w-7xl mx-auto">
          <Reveal className="flex flex-wrap justify-between items-end gap-10 mb-[clamp(44px,5vw,68px)]">
            <div>
              <span className="flex items-center gap-3.5 text-[12px] tracking-[0.38em] uppercase text-[#a58150] mb-4 before:content-[''] before:w-10 before:h-px before:bg-[#a58150]">
                What We Do
              </span>
              <h2 className="font-[family-name:var(--font-marcellus)] text-[clamp(34px,4.2vw,58px)] leading-[1.1]">
                Complete design and <em className="not-italic italic font-light text-[#a58150]">construction services</em>
              </h2>
            </div>
            <p className="max-w-[440px] text-[#7d7264] leading-[1.8] text-[15.5px] font-light">
              From floor plans and government approvals to strong concrete construction and quality finishes — all handled by one team under one contract.
            </p>
          </Reveal>

          <Reveal className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.slice(0, 4).map((svc: any, idx: number) => (
              <Link key={svc.title} href={`${basePath}/services`} className="group relative overflow-hidden aspect-[3/4] flex items-end text-white">
                <img
                  src={svc.img}
                  alt={svc.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(.19,1,.22,1)] group-hover:scale-[1.07]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(24,18,12,0.9)_0%,rgba(24,18,12,0.32)_45%,rgba(24,18,12,0.06)_70%)]" />
                <div className="relative z-10 p-6">
                  <small className="text-[10.5px] tracking-[0.3em] uppercase text-[#c9ab7c] block mb-2.5">
                    0{idx + 1} — Service
                  </small>
                  <h3 className="font-[family-name:var(--font-marcellus)] font-normal text-[22px] mb-2.5">{svc.title}</h3>
                  <p className="text-[13px] font-light text-white/85 leading-[1.6] max-h-0 opacity-0 overflow-hidden transition-all duration-500 group-hover:max-h-[120px] group-hover:opacity-100 group-hover:mb-1">
                    {svc.desc}
                  </p>
                </div>
              </Link>
            ))}
          </Reveal>

          <Reveal className="text-center mt-12">
            <Link
              href={`${basePath}/services`}
              className="inline-flex items-center gap-3 text-[12.5px] tracking-[0.2em] uppercase font-medium text-[#211a13] border-b border-[#a58150] pb-1.5 hover:text-[#a58150] transition-colors"
            >
              See All Our Services &rarr;
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ARCHITECTURAL MATERIALS */}
      <section className="bg-[#1b150f] py-[clamp(84px,9vw,130px)] px-6 lg:px-7 text-white border-y border-[#211a13]/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
            <Reveal className="max-w-3xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-10 bg-[#c9ab7c]"></div>
                <span className="text-[12px] font-black uppercase tracking-[0.38em] text-[#c9ab7c]">Strong Materials</span>
              </div>
              <h2 className="font-[family-name:var(--font-marcellus)] text-[clamp(34px,4.2vw,56px)] leading-[1.1]">
                Strong Foundations <br className="hidden md:block"/> In Every Home We Build
              </h2>
            </Reveal>
            <Reveal delay={0.1} className="max-w-sm flex flex-col items-start gap-6">
              <p className="text-[15.5px] font-light leading-[1.85] text-white/70 border-l border-[#c9ab7c]/30 pl-6">
                In every home we build, we use tested steel and cement from top brands, so your house stays strong for decades without repair costs.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.2} className="mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 border-l border-t border-[#c9ab7c]/10">
            {[
              { name: "Tata Tiscon Fe550D" },
              { name: "UltraTech Cement" },
              { name: "Saint-Gobain Glass" },
              { name: "Schüco Facades" },
              { name: "Kohler Fixtures" },
              { name: "Grohe Systems" },
              { name: "BriteLite Profiles" },
              { name: "Asian Paints Apex" },
              { name: "Schneider Electric" },
              { name: "CoA Certified" }
            ].map((brand) => (
              <div key={brand.name} className="flex flex-col items-center justify-center p-6 sm:p-8 border-r border-b border-[#c9ab7c]/10 min-h-[150px] sm:min-h-[200px] h-full transition-all duration-500 hover:bg-[#211a13] hover:-translate-y-1 relative group">
                <ShieldCheck className="h-8 w-8 text-[#c9ab7c] mb-3 opacity-80 group-hover:scale-110 transition-transform duration-500" />
                <p className="text-[11px] font-black uppercase tracking-[0.1em] text-white/80 group-hover:text-white transition-colors duration-500 text-center">
                  {brand.name}
                </p>
                <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.2em] text-[#c9ab7c]/60">Certified</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* PACKAGES */}
      <PackagesSection basePath={basePath} dark={true} />

      {/* PORTFOLIO */}
      <section id="work" className="py-[clamp(84px,9vw,130px)] px-6 lg:px-7 bg-[#fdfbf6] border-y border-[#211a13]/10">
        <div className="max-w-7xl mx-auto">
          <Reveal className="flex flex-wrap justify-between items-end gap-10 mb-[clamp(44px,5vw,68px)]">
            <div>
              <span className="flex items-center gap-3.5 text-[12px] tracking-[0.38em] uppercase text-[#a58150] mb-4 before:content-[''] before:w-10 before:h-px before:bg-[#a58150]">
                Our Recent Projects
              </span>
              <h2 className="font-[family-name:var(--font-marcellus)] text-[clamp(34px,4.2vw,58px)] leading-[1.1]">
                Projects delivered across <em className="not-italic italic font-light text-[#a58150]">{city}</em>
              </h2>
            </div>
            <p className="max-w-[430px] text-[#7d7264] leading-[1.8] text-[15.5px] font-light">
              Every photo here is a real project completed across {city}. See how thoughtful planning keeps each building functional, bright, and built to last.
            </p>
          </Reveal>

          <div className="grid grid-cols-12 gap-5">
            {gallery.map((img, idx) => {
              const spans = ['col-span-12 md:col-span-7 aspect-[16/10.5]', 'col-span-12 md:col-span-5 aspect-[4/3.36]', 'col-span-12 md:col-span-5 aspect-[4/3.36]', 'col-span-12 md:col-span-7 aspect-[16/10.5]', 'col-span-12 md:col-span-6 aspect-[16/10]', 'col-span-12 md:col-span-6 aspect-[16/10]'];
              return (
                <Reveal key={idx} className={spans[idx % 6]} delay={(idx % 3) * 80}>
                  <Link href={`${basePath}/gallery`} className="group relative overflow-hidden flex items-end text-white w-full h-full">
                    <img
                      src={img}
                      alt={`${cleanName || 'Our'} project ${idx + 1}`}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(.19,1,.22,1)] group-hover:scale-[1.06]"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(24,18,12,0.85)_0%,transparent_46%)]" />
                    <div className="relative z-10 flex justify-between items-end w-full px-6 py-6">
                      <div>
                        <span className="text-[11px] tracking-[0.24em] uppercase text-[#c9ab7c]">{city}</span>
                        <b className="font-[family-name:var(--font-marcellus)] font-normal text-[20px] block">Project Portfolio {String(idx + 1).padStart(2, '0')}</b>
                      </div>
                      <span className="font-[family-name:var(--font-marcellus)] text-[15px] text-white/55">/ 0{idx + 1}</span>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="py-[clamp(84px,9vw,130px)] px-6 lg:px-7 bg-[#211a13] text-white">
        <div className="max-w-7xl mx-auto">
          <Reveal className="flex flex-wrap justify-between items-end gap-10 mb-[clamp(44px,5vw,68px)]">
            <div>
              <span className="flex items-center gap-3.5 text-[12px] tracking-[0.38em] uppercase text-[#c9ab7c] mb-4 before:content-[''] before:w-10 before:h-px before:bg-[#c9ab7c]">
                The Journey
              </span>
              <h2 className="font-[family-name:var(--font-marcellus)] text-[clamp(34px,4.2vw,58px)] leading-[1.1]">
                From first sketch to <em className="not-italic italic font-light text-[#c9ab7c]">housewarming</em>
              </h2>
            </div>
            <p className="max-w-[430px] text-white/60 leading-[1.8] text-[15.5px] font-light">
              A clear step-by-step plan with regular updates — you always know what is happening on your site.
            </p>
          </Reveal>

          <Reveal className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#f6f1e8]/15 border border-[#f6f1e8]/15">
            {PROCESS_STEPS.map((step, idx) => (
              <div key={step.title} className="bg-[#211a13] hover:bg-[#2c231a] transition-colors duration-400 px-7 py-9">
                <span
                  className="font-[family-name:var(--font-marcellus)] text-[52px] block mb-5 text-transparent"
                  style={{ WebkitTextStroke: '1px #a58150' }}
                >
                  0{idx + 1}
                </span>
                <h3 className="font-[family-name:var(--font-marcellus)] font-normal text-[21px] mb-3">{step.title}</h3>
                <p className="text-[13.5px] font-light text-white/65 leading-[1.7]">{step.desc}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* WHY US */}
      <section id="why" className="py-[clamp(84px,9vw,130px)] px-6 lg:px-7">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[0.95fr_1.05fr] gap-[clamp(44px,6vw,90px)] items-center">
          <Reveal className="relative overflow-hidden aspect-[4/4.4]">
            <img src={whyImage} alt="Design and material planning" loading="lazy" className="w-full h-full object-cover" />
          </Reveal>

          <Reveal delay={120}>
            <span className="flex items-center gap-3.5 text-[12px] tracking-[0.38em] uppercase text-[#a58150] mb-4 before:content-[''] before:w-10 before:h-px before:bg-[#a58150]">
              Why Clients Choose Us
            </span>
            <h2 className="font-[family-name:var(--font-marcellus)] text-[clamp(32px,3.8vw,52px)] leading-[1.12] mb-6">
              Trusted by property owners for <em className="not-italic italic font-light text-[#a58150]">quality and honest pricing</em>
            </h2>
            <p className="text-[#7d7264] leading-[1.85] font-light text-[15.5px] mb-7">
              Most building projects go wrong because architects, engineers, and contractors blame each other. We solved this by keeping designers, structural engineers, government approval work, and site supervision in one company.
            </p>
            <div>
              {whyChecks.map((check, idx) => {
                const Icon = check.icon;
                return (
                  <div key={idx} className={`flex gap-5 py-5 border-b border-[#211a13]/10 items-start ${idx === 0 ? 'border-t' : ''}`}>
                    <span className="w-10 h-10 shrink-0 border border-[#a58150] grid place-items-center">
                      <Icon className="w-[18px] h-[18px] text-[#a58150]" strokeWidth={1.8} />
                    </span>
                    <div>
                      <b className="font-[family-name:var(--font-marcellus)] font-normal text-[17px] block mb-1">{check.title}</b>
                      <span className="text-[13.5px] text-[#7d7264] font-light leading-[1.6]">{check.desc}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="reviews" className="py-[clamp(84px,9vw,130px)] px-6 lg:px-7 bg-[#fdfbf6] border-y border-[#211a13]/10">
        <div className="max-w-7xl mx-auto">
          <Reveal className="flex flex-wrap justify-between items-end gap-10 mb-[clamp(44px,5vw,68px)]">
            <div>
              <span className="flex items-center gap-3.5 text-[12px] tracking-[0.38em] uppercase text-[#a58150] mb-4 before:content-[''] before:w-10 before:h-px before:bg-[#a58150]">
                Client Stories
              </span>
              <h2 className="font-[family-name:var(--font-marcellus)] text-[clamp(34px,4.2vw,58px)] leading-[1.1]">
                Kind words from clients <em className="not-italic italic font-light text-[#a58150]">across {city}</em>
              </h2>
            </div>
            <p className="max-w-[430px] text-[#7d7264] leading-[1.8] text-[15.5px] font-light">
              {rating} star rating from our clients — their trust matters most to us.
            </p>
          </Reveal>

          <Reveal className="grid md:grid-cols-3 gap-6">
            {reviews.slice(0, 3).map((review: any, i: number) => (
              <div
                key={i}
                className="bg-[#f6f1e8] border border-[#211a13]/10 px-8 py-9 flex flex-col gap-5 transition-all duration-300 hover:border-[#a58150] hover:-translate-y-1.5"
              >
                <span className="text-[#a58150] tracking-[5px] text-[14px]">
                  {'★'.repeat(Math.max(1, Math.min(5, parseInt(String(review.rating)) || 5)))}
                </span>
                <blockquote className="font-[family-name:var(--font-marcellus)] text-[17.5px] leading-[1.65] flex-1">
                  &ldquo;{review.text}&rdquo;
                </blockquote>
                <div className="flex items-center gap-3.5 border-t border-[#211a13]/10 pt-5">
                  <span className="w-[46px] h-[46px] rounded-full bg-[#211a13] text-[#c9ab7c] grid place-items-center font-[family-name:var(--font-marcellus)] text-[18px]">
                    {(review.author || 'C').charAt(0)}
                  </span>
                  <div>
                    <b className="block text-[14.5px] font-medium">{review.author || 'Estate Owner'}</b>
                    <span className="text-[12px] text-[#7d7264] tracking-[0.08em]">New Home · {city}</span>
                  </div>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* HOME FAQ */}
      <section id="faqs" className="py-[clamp(84px,9vw,130px)] px-6 lg:px-7">
        <div className="max-w-4xl mx-auto">
          <Reveal className="text-center mb-12">
            <span className="inline-flex items-center gap-3.5 text-[12px] tracking-[0.38em] uppercase text-[#a58150] mb-4 before:content-[''] before:w-10 before:h-px before:bg-[#a58150] after:content-[''] after:w-10 after:h-px after:bg-[#a58150]">
              Questions Answered
            </span>
            <h2 className="font-[family-name:var(--font-marcellus)] text-[clamp(32px,3.8vw,52px)] leading-[1.12] mb-4">
              Everything you need to know <em className="not-italic italic font-light text-[#a58150]">before you build</em>
            </h2>
            <p className="text-[#7d7264] font-light text-[15.5px]">
              Clear answers about approvals, materials, timelines, and fixed pricing.
            </p>
          </Reveal>

          <Reveal>
            <FAQAccordion items={homeFaqs} />
          </Reveal>
        </div>
      </section>

      {/* PROJECT ESTIMATE (FINAL SECTION) */}
      <section id="estimator" className="relative py-[clamp(84px,9vw,130px)] px-6 lg:px-7 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img src={ctaImage} alt="" loading="lazy" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(24,18,12,0.95)_0%,rgba(24,18,12,0.85)_55%,rgba(24,18,12,0.55)_100%)]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-[1.05fr_0.95fr] gap-[clamp(44px,6vw,90px)] items-center">
          <Reveal>
            <span className="flex items-center gap-3.5 text-[12px] tracking-[0.38em] uppercase text-[#c9ab7c] mb-4 before:content-[''] before:w-10 before:h-px before:bg-[#c9ab7c]">
              GET STARTED
            </span>
            <h2 className="font-[family-name:var(--font-marcellus)] text-[clamp(34px,4.4vw,58px)] leading-[1.1] mb-5">
              Clear Fixed Pricing,<br />
              <em className="not-italic italic font-light text-[#c9ab7c]">No Hidden Costs</em>
            </h2>
            <p className="text-white/80 font-light leading-[1.8] max-w-[500px] mb-7">
              Share your plot details and requirements. Our architects will call you back with a free discussion of plan options and an approximate cost estimate.
            </p>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 border-t border-white/15 pt-8">
              <div>
                <h3 className="text-[17px] font-medium text-[#c9ab7c] mb-2">01 / Share Your Plot Details</h3>
                <p className="text-[14px] text-white/70 font-light leading-[1.6]">
                  Tell us your locality, plot size, and whether you are planning a villa, residential home, or commercial building.
                </p>
              </div>
              <div>
                <h3 className="text-[17px] font-medium text-[#c9ab7c] mb-2">02 / Get Estimate</h3>
                <p className="text-[14px] text-white/70 font-light leading-[1.6]">
                  Get a clear design plan and a fixed item-by-item price with no hidden charges.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <LeadForm studioName={cleanName || 'our architects'} waPhone={waPhone} phoneDisplay={phone} />
          </Reveal>
        </div>
      </section>
    </div>
  );
}
