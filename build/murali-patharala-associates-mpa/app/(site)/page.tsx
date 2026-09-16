import { readSourceConfig } from '@/lib/sourceData';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import HeroSection from './HeroSection';
import StatsBand from './StatsBand';
import MarqueeBand from './MarqueeBand';
import ProjectCarousel from './ProjectCarousel';
import HomeStorySections from './HomeStorySections';
import OfficeLocations from './OfficeLocations';
import ArchFoundationSpotlight from './ArchFoundationSpotlight';
import servicesStyles from './ServicesSection.module.css';
import ArchitecturalDiagramBg from '@/components/ArchitecturalDiagramBg';
import {
  Calculator,
  ClipboardList,
  DraftingCompass,
  FileCheck2,
  FileSignature,
  HardHat,
  ScanLine,
  Workflow,
} from 'lucide-react';

interface PageProps {
  params?: any;
}

const STATS = [
  { value: '28+', label: 'Years Experience' },
  { value: '500+', label: 'Homes Delivered' },
  { value: '425+', label: 'Quality Checks' },
  { value: '10 Yr', label: 'Structural Warranty' },
];

const WHY_CHOOSE_PILLARS = [
  {
    num: '01',
    category: 'INTEGRATED EXPERTISE',
    title: 'MPA Architects & ARCH Foundation Engineers',
    highlight: 'Clear Design & Construction Accountability',
    specs: [
      'Architectural Design Led by MPA',
      'Construction Delivered by ARCH Foundation',
      'One Coordinated Project Workflow',
    ],
    iconType: 'drafting',
  },
  {
    num: '02',
    category: 'STRUCTURAL INTEGRITY',
    title: '425+ Quality Audits & Branded Steel',
    highlight: 'Tata Tiscon 550D & UltraTech 53-Grade',
    specs: [
      '7 & 28-Day Concrete Cube Strength Tests',
      'Primary Steel Only (Tata Tiscon / JSW)',
      '10-Year Structural Warranty Certificate',
    ],
    iconType: 'shield',
  },
  {
    num: '03',
    category: 'FINANCIAL TRANSPARENCY',
    title: '100% Fixed-Price Contract',
    highlight: 'Itemized BOQ & Zero Escalation',
    specs: [
      'Line-by-Line Itemized Material Specifications',
      '100% Price Lock Guarantee Against Inflation',
      'No Unplanned Contractor Surcharges',
    ],
    iconType: 'lock',
  },
  {
    num: '04',
    category: 'CLIMATIC & VASTU DESIGN',
    title: 'Custom 3D Elevation & Microclimate',
    highlight: '100% Vastu & Cross-Ventilation',
    specs: [
      'Photorealistic 3D Facade & Floorplan Renders',
      'Thermal Comfort & Natural Cross-Drafting',
      'Full GCC / CMDA Municipal Sanctions',
    ],
    iconType: 'compass',
  },
  {
    num: '05',
    category: 'TIMELY DELIVERY',
    title: 'Guaranteed On-Time Handover',
    highlight: 'Milestone-Linked Handover Schedule',
    specs: [
      'Legally Binding Completion Schedule',
      'Weekly Structural Inspection Audits',
      'Key Handover with Complete Documentation',
    ],
    iconType: 'calendar',
  },
  {
    num: '06',
    category: 'DIGITAL SURVEILLANCE',
    title: 'Tech-Driven Milestone Tracking',
    highlight: 'Verified Photo & Video Progress Logs',
    specs: [
      'Digital Daily Work & Material Logs',
      'Weekly High-Def Drone & Site Video Updates',
      'Direct WhatsApp Line with Lead Engineer',
    ],
    iconType: 'tech',
  },
];

const SERVICES = [
  {
    icon: '01',
    image: '/images/architecture/architectural-blueprint-draft.webp',
    title: 'Architectural Designs',
    ownership: 'Design by Murali Patharala & Associates',
    scope: ['Planning', 'Approvals', '3D visualisation'],
    desc: 'Custom floor plans, photorealistic 3D elevations, structural analysis, CMDA / GCC municipal sanction drawings, and Vastu spatial planning.',
    link: '/services/architectural-design',
    packageLink: '/design-package',
    packageText: 'Design Packages',
  },
  {
    icon: '02',
    image: '/images/architecture/structural-construction-frame.webp',
    title: 'Residential Construction',
    ownership: 'Construction by ARCH Foundation',
    scope: ['Structure', 'Materials', 'Site supervision'],
    desc: 'Delivered by ARCH Foundation from soil testing to key handover—seismic-resistant RCC framing, branded materials, 425+ quality tests, and dedicated site supervision.',
    link: '/services/residential-construction',
    packageLink: '/construction-package',
    packageText: 'Construction Packages',
  },
  {
    icon: '03',
    image: '/images/architecture/interior-double-height.webp',
    title: 'Interior Designs',
    ownership: 'Design by Murali Patharala & Associates',
    scope: ['Kitchens', 'Wardrobes', 'Lighting'],
    desc: 'Bespoke living spaces crafted in 100% BWR Marine Plywood (IS:710)—modular kitchens, floor-to-ceiling wardrobes, designer ceilings, and mood lighting.',
    link: '/services/interior-design',
    packageLink: '/design-package',
    packageText: 'Interior Packages',
  },
  {
    icon: '04',
    image: '/images/architecture/tropical-modern-villa.webp',
    title: 'Turnkey Construction Services',
    ownership: 'MPA design · ARCH Foundation construction',
    scope: ['Design', 'Build', 'Handover'],
    desc: 'Architecture and interiors by MPA, with civil construction delivered by ARCH Foundation under one coordinated contract and a 10-year structural warranty.',
    link: '/services/turnkey-construction',
    packageLink: '/construction-package',
    packageText: 'Turnkey Packages',
  },
];





const JOURNEY_STEPS = [
  {
    step: '01',
    Icon: ClipboardList,
    title: 'Tell Us Your Requirements',
    desc: 'We capture your plot dimensions, family lifestyle requirements, number of floors, preferred architectural style, budget parameters, and future expansion plans.',
  },
  {
    step: '02',
    Icon: ScanLine,
    title: 'Laser Site Assessment',
    desc: 'Our civil engineers conduct physical plot verification, boundary measurement, road width access checks, orientation sun-path analysis, and soil test investigation.',
  },
  {
    step: '03',
    Icon: DraftingCompass,
    title: 'Architectural Design',
    desc: 'Our architects develop custom 2D functional floor plans, furniture layouts, and photorealistic 3D elevations aligned with your preferences and Chennai climatic conditions.',
  },
  {
    step: '04',
    Icon: Workflow,
    title: 'Engineering & Detailed Drawings',
    desc: 'Comprehensive structural RCC drawings, beam-column schedules, electrical schematics, and plumbing lines are developed for municipal compliance and error-free execution.',
  },
  {
    step: '05',
    Icon: FileCheck2,
    title: 'Final Design & Built-Up Area',
    desc: 'The exact room dimensions, elevation specifications, and built-up area calculations are finalized and validated with you before estimating costs.',
  },
  {
    step: '06',
    Icon: Calculator,
    title: 'Detailed Construction Estimate',
    desc: 'We prepare an exhaustive, line-by-line Bill of Quantities (BOQ) covering every material brand, grade, quantity, and unit rate with total cost transparency.',
  },
  {
    step: '07',
    Icon: FileSignature,
    title: 'Construction Agreement',
    desc: 'The ARCH Foundation construction agreement freezes the price per sq.ft, material specifications, responsibilities, and milestone completion timelines.',
  },
  {
    step: '08',
    Icon: HardHat,
    title: 'Construction Begins',
    desc: 'With an ARCH Foundation site engineer in place, construction commences. You receive weekly milestone updates and documented quality records up to key handover.',
  },
];

const TESTIMONIALS = [
  {
    name: 'S. Rajagopalan',
    area: 'Anna Nagar East, Chennai',
    project: '4,400 Sq.Ft Contemporary Villa',
    text: 'MPA resolved the design beautifully, and ARCH Foundation delivered the construction exactly as agreed. The documented quality checks and daily engineer presence meant I never had to worry while sitting in my office.',
  },
  {
    name: 'Priya & Balaji',
    area: 'Kilpauk, Chennai',
    project: '3,850 Sq.Ft Duplex Residence',
    text: 'The 100% fixed-price contract is genuine. We made custom tweaks to our finishes, but there were zero hidden civil surcharges or material price escalations. A truly stress-free turnkey experience.',
  },
  {
    name: 'Dr. K. Venkataraman',
    area: 'Boat Club Road, Chennai',
    project: '5,200 Sq.Ft Bespoke Residence',
    text: 'Having MPA architects and ARCH Foundation engineers in one coordinated workflow made all the difference. The transition from 3D drawings to the physical villa was flawless.',
  },
];

export default async function HomePage({ params }: PageProps) {
  const data = await readSourceConfig(undefined, 'template5');

  if (!data || !data.clinic) {
    notFound();
  }

  const phone = '09841098490';
  const displayPhone = '+91 98410 98490';
  const rawDigits = phone.replace(/\D/g, '');
  const cleanPhone = rawDigits.startsWith('91') ? rawDigits : `91${rawDigits.replace(/^0+/, '')}`;

  return (
    <div className="mpa-home w-full bg-[#FAFAFA] text-[#111111]">
      {/* 1. Hero Section */}
      <HeroSection phone={phone} />

      {/* 2. Numbers / Credentials Section (Brought Down with Count-Up Animation) */}
      <StatsBand />

      {/* 3. Infinite Continuous Marquee Ribbon */}
      <MarqueeBand />

      <HomeStorySections pillars={WHY_CHOOSE_PILLARS} phone={cleanPhone} />

      {/* 5. Integrated Studio Capabilities */}
      <section id="services" className={servicesStyles.section}>
        <ArchitecturalDiagramBg variant="master-plan" theme="dark" opacity={0.1} showGrid={false} showCornerMarks={false} />
        <div className={servicesStyles.shell}>
          <header data-motion-reveal className={servicesStyles.intro}>
            <div>
              <p className={servicesStyles.eyebrow}>Our services — design to handover</p>
              <h2 className={servicesStyles.title}>
                Everything your home needs,
                <em>under one roof.</em>
              </h2>
            </div>
            <div className={servicesStyles.summary}>
              <p>
                Start where you are — a bare plot, approved drawings, or a home ready for
                interiors. Each service has its own team, process, and detailed guide.
              </p>
              <Link href="/services" className={servicesStyles.summaryLink}>
                View the complete service guide
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </header>

          <div data-motion-group className={servicesStyles.grid}>
            {SERVICES.map((service) => (
              <article key={service.title} className={servicesStyles.card}>
                <Link
                  href={service.link}
                  aria-label={`Learn more about ${service.title}`}
                  className={servicesStyles.mediaWrap}
                  tabIndex={-1}
                >
                  <div className={servicesStyles.media}>
                    <Image
                      src={service.image}
                      alt=""
                      fill
                      sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                    />
                  </div>
                  <span className={servicesStyles.number}>{service.icon}</span>
                </Link>
                <div className={servicesStyles.cardBody}>
                  <p className={servicesStyles.ownership}>{service.ownership}</p>
                  <h3 className={servicesStyles.serviceTitle}>
                    <Link href={service.link} className={servicesStyles.titleLink}>
                      {service.title}
                    </Link>
                  </h3>
                  <p className={servicesStyles.description}>{service.desc}</p>
                  <ul className={servicesStyles.scope} aria-label="Included capabilities">
                    {service.scope.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                  <div className="flex items-center justify-between pt-4 mt-auto border-t border-[#111111]/10">
                    <Link
                      href={service.link}
                      aria-label={`Learn more about ${service.title}`}
                      className="text-xs font-bold uppercase tracking-wider text-[#C2410C] hover:text-[#111111] flex items-center gap-1"
                    >
                      <span>Guide</span>
                      <span aria-hidden="true">&rarr;</span>
                    </Link>
                    <Link
                      href={service.packageLink}
                      className="text-[11px] font-bold uppercase tracking-wider text-[#111111] hover:text-[#C2410C] flex items-center gap-1 px-2.5 py-1 bg-[#F4EFEA] border border-[#111111]/10 hover:border-[#C2410C] transition-colors"
                    >
                      <span>{service.packageText}</span>
                      <span aria-hidden="true">↗</span>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div data-motion-reveal className={servicesStyles.assurance}>
            <span>Fixed-price BOQ</span>
            <i aria-hidden="true" />
            <span>Dedicated site engineer</span>
            <i aria-hidden="true" />
            <span>10-year structural warranty</span>
          </div>

          {/* Transparent Packages & Pricing Bridge Card */}
          <div className="mt-12 p-6 sm:p-8 bg-[#181818] border border-[#2A2A2A] text-white flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center md:text-left">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#EA580C] block">
                Transparent Estimation &amp; Scope
              </span>
              <h4 className="text-xl sm:text-2xl font-bold font-serif text-white" style={{ fontFamily: "'Lora', serif" }}>
                Explore Standard Packages &amp; Fixed-Price Estimates
              </h4>
              <p className="text-xs sm:text-sm text-white/70 font-medium">
                Compare architectural drawing tiers from MPA or fixed-price civil construction packages from ARCH Foundation.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                href="/design-package"
                className="px-5 py-3 bg-white text-[#111111] text-xs font-bold uppercase tracking-wider hover:bg-[#EA580C] hover:text-[#111111] transition-colors"
              >
                Design Packages &rarr;
              </Link>
              <Link
                href="/construction-package"
                className="px-5 py-3 bg-[#EA580C] text-[#111111] text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors"
              >
                Construction Packages &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Architectural Design — main MPA service */}
      <ArchFoundationSpotlight />

      {/* 7. Eight-stage project sequence */}
      <section id="process" className="mpa-process relative py-24 md:py-32 px-6 md:px-12 border-b border-[#111111]/15 overflow-hidden">
        <ArchitecturalDiagramBg variant="structural" theme="light" opacity={0.09} showGrid={true} showCornerMarks={true} />
        <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          <header data-motion-reveal className="lg:col-span-4 lg:sticky lg:top-32">
            <p className="text-xs font-bold tracking-[0.24em] uppercase text-[#C2410C] mb-4">The MPA build sequence</p>
            <h2
              className="text-4xl md:text-6xl font-bold font-serif text-[#111111] tracking-[-0.04em] leading-[1.03]"
              style={{ fontFamily: "var(--font-lora), serif" }}
            >
              From a blank plot<br />
              <em className="font-normal text-[#C2410C]">to the turn of a key.</em>
            </h2>
            <p className="text-sm md:text-base text-[#4B4B48] leading-relaxed mt-7 max-w-md font-medium">
              Eight defined milestones. Every decision reviewed, every specification documented and every stage supervised by one accountable team.
            </p>
            <div className="mt-8 flex max-w-md items-end justify-between border-l-2 border-[#C2410C] bg-white/45 px-5 py-4">
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#6F6D67]">Current milestone</span>
              <strong data-process-current className="font-mono text-xl font-bold tracking-[-0.04em] text-[#C2410C]">01 / 08</strong>
            </div>
            <div className="mt-9 pt-6 border-t border-[#111111]/20 flex items-center justify-between max-w-md font-mono text-[10px] font-bold tracking-[0.18em] uppercase text-[#6F6D67]">
              <span>Brief</span>
              <span className="h-[2px] flex-1 mx-4 bg-[#111111]/15 relative overflow-hidden rounded-full" aria-hidden="true">
                <span data-process-header-rail className="absolute inset-y-0 left-0 w-full origin-left scale-x-0 bg-[#C2410C]" aria-hidden="true" />
              </span>
              <span>Handover</span>
            </div>
          </header>

          <div data-motion-reveal className="lg:col-span-8 relative">
            {/* Guide track and active drawing progress line container */}
            <div className="absolute left-8 md:left-11 top-0 bottom-0 pointer-events-none" aria-hidden="true">
              <div data-process-track className="absolute -translate-x-1/2 w-[2px] bg-[#111111]/15" />
              <div data-process-progress className="absolute -translate-x-1/2 w-[2px] bg-gradient-to-b from-[#C2410C] to-[#EA580C] origin-top shadow-[0_0_12px_rgba(194,65,12,0.4)]" />
            </div>

            <ol data-process-steps className="border-t border-[#111111]/20">
              {JOURNEY_STEPS.map((step) => {
                const StepIcon = step.Icon;

                return (
                  <li
                    data-process-step
                    key={step.step}
                    className="group relative grid grid-cols-[64px_1fr] md:grid-cols-[88px_minmax(180px,0.8fr)_minmax(0,1.4fr)] gap-x-5 md:gap-x-7 py-7 md:py-8 border-b border-[#111111]/20 transition-all duration-300"
                  >
                    <div className="relative z-10 flex justify-center">
                      <span
                        data-process-icon
                        className="relative"
                      >
                        <StepIcon size={27} strokeWidth={1.5} aria-hidden="true" />
                        <span data-process-badge>
                          {step.step}
                        </span>
                      </span>
                    </div>
                    <h3
                      data-process-title
                      className="self-start pt-1 text-base md:text-lg font-bold text-[#171717] leading-snug transition-colors duration-300"
                    >
                      {step.title}
                    </h3>
                    <p
                      data-process-copy
                      className="col-start-2 md:col-start-3 mt-3 md:mt-0 text-xs md:text-sm text-[#5E5D58] leading-relaxed font-medium pr-2 md:pr-6 transition-colors duration-300"
                    >
                      {step.desc}
                    </p>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>

      {/* 9. Portfolio Showcase */}
      <ProjectCarousel />

      {/* 10. Client Proof / Testimonials */}
      <section className="mpa-testimonials relative py-24 md:py-32 px-6 md:px-12 border-b border-[#111111]/15 bg-[#FAFAF8] overflow-hidden">
        {/* Authentic Facade Elevation Linework Background */}
        <ArchitecturalDiagramBg variant="elevation" theme="light" opacity={0.07} showGrid={false} showCornerMarks={false} />
        <div className="relative z-10 max-w-7xl mx-auto">
          <div data-motion-reveal className="mb-16 text-center max-w-2xl mx-auto">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#EA580C] mb-3">CLIENT TESTIMONIALS</p>
            <h2
              className="text-3xl md:text-5xl font-bold font-serif text-[#111111] tracking-tight"
              style={{ fontFamily: "var(--font-lora), serif" }}
            >
              Rated 4.9 / 5.0 by Chennai Homeowners
            </h2>
            <p className="text-sm md:text-base text-[#666666] mt-3 font-medium">
              Feedback from families whose homes were designed by MPA and constructed by ARCH Foundation.
            </p>
          </div>

          <div data-motion-group className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="mpa-quote p-8 border border-[#111111]/15 bg-white flex flex-col justify-between hover:border-[#EA580C]/40 hover:shadow-lg transition-all">
                <div>
                  <div className="flex gap-1 text-[#EA580C] mb-4 text-base">
                    <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                  </div>
                  <p
                    className="text-sm sm:text-base font-medium leading-relaxed mb-6 font-serif italic text-[#111111]"
                    style={{ fontFamily: "var(--font-lora), serif" }}
                  >
                    &ldquo;{t.text}&rdquo;
                  </p>
                </div>
                <div className="pt-4 border-t border-[#111111]/10">
                  <p className="text-xs font-bold uppercase tracking-widest text-[#111111]">{t.name}</p>
                  <p className="text-[11px] text-[#EA580C] font-semibold">{t.project}</p>
                  <p className="text-xs text-[#757575] uppercase mt-0.5">{t.area}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. Multi-city office network — after reviews */}
      <OfficeLocations phone={displayPhone} />
    </div>
  );
}
