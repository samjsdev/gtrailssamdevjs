import BrandText from '@/components/BrandText';
import type { Metadata } from 'next';
import { readSourceConfig } from '@/lib/sourceData';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import HeroSection from './HeroSection';
import StatsBand from './StatsBand';
import MarqueeBand from './MarqueeBand';
import ProjectCarousel from './ProjectCarousel';
import HomeStorySections from './HomeStorySections';
import ClientPortfolio from './ClientPortfolio';
import OfficeLocations from './OfficeLocations';
import ArchFoundationSpotlight from './ArchFoundationSpotlight';
import servicesStyles from './ServicesSection.module.css';
import ArchitecturalDiagramBg from '@/components/ArchitecturalDiagramBg';
import { siteAssets } from '@/lib/siteAssets';
import {
  ArrowUpRight,
  Calculator,
  ClipboardList,
  DraftingCompass,
  FileCheck2,
  FileSignature,
  HardHat,
  ScanLine,
  Workflow,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Architects & Builders in Chennai | Architecture, Construction & Interiors',
  description:
    'Architectural and interior design by Ar. Murali Patharala for residential, commercial and institutional projects, with construction and property development by ARCH foundations.',
  keywords: [
    'architectural design chennai',
    'residential architects anna nagar',
    'house construction chennai',
    'turnkey civil contractor chennai',
    'luxury home interiors chennai',
    'modular kitchen chennai',
    'vastu floor plans chennai',
    '3d elevation designs chennai',
    'murali patharala associates',
    'arch foundation construction',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Murali Patharala & Associates | Architecture, Construction & Interiors Chennai',
    description:
      'Architecture and interior design in Chennai since 1998, with construction and property development by ARCH foundations since 2005.',
    url: 'https://muralipatharalaassociates.com/',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Murali Patharala & Associates Architecture, Construction & Interiors',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Murali Patharala & Associates | Architecture, Construction & Interiors',
    description:
      'Bespoke architectural design, structural home construction with ARCH foundations, and luxury interiors in Chennai.',
    images: ['/og-image.png'],
  },
};

interface PageProps {
  params?: any;
}


const WHY_CHOOSE_PILLARS = [
  {
    "num": "01",
    "category": "DESIGN & DELIVERY",
    "title": "Architecture with construction understanding",
    "highlight": "MPA design · ARCH foundations construction",
    "specs": [
      "Architectural and interior design consultancy",
      "Civil works and structural engineering",
      "Turnkey project coordination"
    ],
    "iconType": "drafting"
  },
  {
    "num": "02",
    "category": "ENGINEERING COORDINATION",
    "title": "Resolve the technical details",
    "highlight": "Structure, services and architecture",
    "specs": [
      "Structural engineer collaboration",
      "Mechanical, electrical and plumbing integration",
      "Site supervision and quality checks"
    ],
    "iconType": "drafting"
  },
  {
    "num": "03",
    "category": "CLEAR DOCUMENTATION",
    "title": "Define the scope before tendering",
    "highlight": "Drawings, specifications and BOQs",
    "specs": [
      "Detailed working drawings and schedules",
      "Quantity take-offs and cost planning",
      "Comparable bids and contractor evaluation"
    ],
    "iconType": "drafting"
  },
  {
    "num": "04",
    "category": "PEOPLE & PLACE",
    "title": "Design with context and purpose",
    "highlight": "Tradition alongside contemporary needs",
    "specs": [
      "User-centred spatial planning",
      "Concept sketches and 3D massing",
      "Materials and architectural character"
    ],
    "iconType": "drafting"
  },
  {
    "num": "05",
    "category": "PROJECT DELIVERY",
    "title": "Carry design intent into construction",
    "highlight": "Coordination from drawings to handover",
    "specs": [
      "Project management and site supervision",
      "RFIs and change-order coordination",
      "Construction, fit-outs and utility installations"
    ],
    "iconType": "drafting"
  },
  {
    "num": "06",
    "category": "BUILDING PERFORMANCE",
    "title": "Consider the building in use",
    "highlight": "Technical and environmental support",
    "specs": [
      "Generator sizing and AC load calculations",
      "Green-building certification documentation",
      "Post-occupancy evaluation"
    ],
    "iconType": "drafting"
  }
];

const SERVICES = [
  {
    image: siteAssets.exteriors.geometricFacade,
    title: 'Architectural Design',
    desc: 'Plans, approvals and coordinated design for your project.',
    link: '/services/architectural-design',
  },
  {
    image: '/images/architecture/structural-construction-frame.webp',
    title: 'Residential Construction',
    desc: 'Quality construction, with every stage carefully supervised.',
    link: '/services/residential-construction',
  },
  {
    image: siteAssets.interiors.livingRoom,
    title: 'Interior Design',
    desc: 'Thoughtful interiors for the way you live and work.',
    link: '/services/interior-design',
  },
  {
    image: siteAssets.exteriors.modernResidenceRender,
    title: 'Turnkey Construction',
    desc: 'One team, from the first design to final handover.',
    link: '/services/turnkey-construction',
  },
];





const JOURNEY_STEPS = [
  {step: "01", Icon: ClipboardList, title: "Project Brief & Feasibility", desc: "Review the site, intended use, zoning, budget and project viability."},
  {step: "02", Icon: ScanLine, title: "Conceptual Design", desc: "Explore sketches, mood boards and spatial planning to capture the project vision."},
  {step: "03", Icon: DraftingCompass, title: "Schematic Design", desc: "Develop floor plans, elevations and basic 3D massing to define layout and form."},
  {step: "04", Icon: Workflow, title: "Design Development", desc: "Refine drawings and materials, coordinating structural and building-service requirements."},
  {step: "05", Icon: FileCheck2, title: "Construction Documentation", desc: "Prepare detailed working drawings, schedules, specifications and quantity take-offs."},
  {step: "06", Icon: Calculator, title: "Tendering & Negotiation", desc: "Support contractor selection, compare bids and assist with contract finalisation."},
  {step: "07", Icon: FileSignature, title: "Construction Administration", desc: "Coordinate site visits, quality checks, RFIs and change orders with the construction team."},
  {step: "08", Icon: HardHat, title: "Handover & Building Use", desc: "Coordinate completion and review building performance and user satisfaction through post-occupancy evaluation where commissioned."}
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
    <div className="mpa-home w-full bg-surface-cream text-[#111111]">
      {/* 1. Hero Section */}
      <HeroSection phone={phone} />

      {/* 2. Numbers / Credentials Section (Brought Down with Count-Up Animation) */}
      <StatsBand />

      {/* 3. Infinite Continuous Marquee Ribbon */}
      <MarqueeBand />

      <HomeStorySections pillars={WHY_CHOOSE_PILLARS} phone={cleanPhone} />

      {/* 5. Integrated Studio Capabilities */}
      <section id="services" className={servicesStyles.section}>
        <ArchitecturalDiagramBg variant="master-plan" theme="light" opacity={0.1} showGrid={false} showCornerMarks={false} />
        <div className={servicesStyles.shell}>
          <header data-motion-reveal className={servicesStyles.intro}>
            <div>
              <p className={servicesStyles.eyebrow}>Our services — design to handover</p>
              <h2 className={servicesStyles.title}>
                Design and delivery,
                <em>with a connected approach.</em>
              </h2>
            </div>
            <div className={servicesStyles.summary}>
              <p>
                Explore architectural consultancy, interiors, civil construction and turnkey services. Our work spans homes, commercial buildings and institutions.
              </p>
              <Link href="/services" className="mpa-outline-cta mpa-outline-cta--accent mt-6">
                View the complete service guide
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </header>

          <div data-motion-group className={servicesStyles.grid}>
            {SERVICES.map((service) => (
              <article key={service.title} className={servicesStyles.card}>
                <Link href={service.link} className={servicesStyles.cardLink}>
                  <div className={servicesStyles.cardBody}>
                    <div className={servicesStyles.cardTop}>
                      <h3 className={servicesStyles.serviceTitle}>{service.title}</h3>
                      <ArrowUpRight className={servicesStyles.cardArrow} size={22} aria-hidden="true" />
                    </div>
                    <p className={servicesStyles.description}>{service.desc}</p>
                  </div>
                  <div className={servicesStyles.media}>
                    <Image
                      src={service.image}
                      alt=""
                      fill
                      sizes="(max-width: 1023px) calc(100vw - 48px), (max-width: 1376px) calc((100vw - 116px) / 2), 630px"
                    />
                  </div>
                </Link>
              </article>
            ))}
          </div>

          <div data-motion-reveal className={servicesStyles.assurance}>
            <span>Detailed documentation</span>
            <i aria-hidden="true" />
            <span>Site supervision</span>
            <i aria-hidden="true" />
            <span>Design coordination</span>
          </div>

          {/* Transparent Packages & Pricing Bridge Card */}
          <div className="mt-12 p-6 sm:p-8 bg-surface-linen border border-[#2A2A2A] text-[#302A20] flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center md:text-left">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#703015] block">
                Transparent Estimation &amp; Scope
              </span>
              <h4 className="text-xl sm:text-2xl font-bold font-serif text-[#302A20]" style={{ fontFamily: "var(--font-content)" }}>
                Explore Design &amp; Construction Scopes
              </h4>
              <p className="text-xs sm:text-sm text-ink-muted font-medium">
                Explore the professional services and construction scope that your project may need.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                href="/design-package"
                className="px-5 py-3 bg-surface-cream text-[#111111] text-xs font-bold uppercase tracking-wider hover:bg-[#EA580C] hover:text-[#111111] transition-colors"
              >
                Design Packages &rarr;
              </Link>
              <Link
                href="/construction-package"
                className="px-5 py-3 bg-[#EA580C] text-[#111111] text-xs font-bold uppercase tracking-wider hover:bg-surface-cream transition-colors"
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
            <p className="text-xs font-bold tracking-[0.24em] uppercase text-[#C2410C] mb-4">From brief to building</p>
            <h2
              className="text-4xl md:text-6xl font-bold font-serif text-[#111111] tracking-[-0.04em] leading-[1.03]"
              style={{ fontFamily: "var(--font-content)" }}
            >
              From the first idea<br />
              <em className="font-normal text-[#C2410C]">to a place in use.</em>
            </h2>
            <p className="text-sm md:text-base text-[#4B4B48] leading-relaxed mt-7 max-w-md font-medium">
              Design, documentation and execution each need the right information. We coordinate the stages around your project and the services commissioned.
            </p>
            <div className="mt-8 flex max-w-md items-end justify-between border-l-2 border-[#C2410C] bg-surface-cream/45 px-5 py-4">
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#6F6D67]">Current milestone</span>
              <strong data-process-current className="font-mono text-xl font-bold tracking-[-0.04em] text-[#C2410C]">01 / 08</strong>
            </div>
            <div className="mt-9 pt-6 border-t border-[#111111]/20 flex items-center justify-between max-w-md font-mono text-[10px] font-bold tracking-[0.18em] uppercase text-[#6F6D67]">
              <span>Brief</span>
              <span className="h-[2px] flex-1 mx-4 bg-[#5D5140]/15 relative overflow-hidden rounded-full" aria-hidden="true">
                <span data-process-header-rail className="absolute inset-y-0 left-0 w-full origin-left scale-x-0 bg-[#C2410C]" aria-hidden="true" />
              </span>
              <span>Handover</span>
            </div>
          </header>

          <div data-motion-reveal className="lg:col-span-8 relative">
            {/* Guide track and active drawing progress line container */}
            <div className="absolute left-8 md:left-11 top-0 bottom-0 pointer-events-none" aria-hidden="true">
              <div data-process-track className="absolute -translate-x-1/2 w-[2px] bg-[#5D5140]/15" />
              <div data-process-progress className="absolute -translate-x-1/2 w-[2px] bg-gradient-to-b from-[#C2410C] to-[#EA580C] origin-top shadow-[0_0_12px_rgba(194,65,12,0.4)]" />
            </div>

            <ol data-process-steps className="border-t border-[#111111]/20">
              {JOURNEY_STEPS.map((step) => {
                const StepIcon = step.Icon;

                return (
                  <li
                    data-process-step
                    key={step.step}
                    className="group relative grid grid-cols-[64px_minmax(0,1fr)] md:grid-cols-[88px_minmax(0,1fr)] gap-x-5 md:gap-x-7 py-11 md:py-14 border-b border-[#111111]/20"
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
                    <div className="min-w-0 max-w-xl pt-1">
                      <h3
                        data-process-title
                        className="text-base md:text-lg font-bold text-[#171717] leading-snug"
                      >
                        {step.title}
                      </h3>
                      <p
                        data-process-copy
                        className="mt-3 text-sm text-[#5E5D58] leading-relaxed font-medium pr-2 md:pr-6"
                      >
                        {step.desc}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>

      {/* 9. Portfolio Showcase */}
      <ProjectCarousel />

      <ClientPortfolio />

      {/* 11. Multi-city office network — after reviews */}
      <OfficeLocations phone={displayPhone} />
    </div>
  );
}
