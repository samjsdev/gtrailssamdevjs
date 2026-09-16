import { readSourceConfig } from '@/lib/dataBuilder';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  Compass,
  Building2,
  Palette,
  Trees,
  ShieldCheck,
  FileCheck,
  CheckCircle2,
  ArrowRight,
  ArrowUpRight,
} from 'lucide-react';
import { cleanClinicName } from '@/lib/copyCleaner';
import { ARCHITECTURE_STOCK } from '@/lib/architectureContent';
import Reveal from '../Reveal';
import { Cinzel } from 'next/font/google';

const cinzel = Cinzel({ subsets: ['latin'], weight: ['600', '700', '800'] });

type PageProps = { params: Promise<{ slug: string }> };

const DETAILED_SERVICES = [
  {
    id: 'residential-architecture',
    icon: Compass,
    title: 'Iconic Residential Architecture',
    tagline: 'Custom Ultra-Luxury Villas, Duplex Residences & Private Estates',
    description:
      'We orchestrate every line, volume, and shadow to forge a residence uniquely tailored to your site and lifestyle. From micro-climate sun-path optimization to monumental double-height living areas and cantilevered terraces, our designs are timeless and unforced.',
    image: '/images/architecture/cantilever-garden-overhang.webp',
    deliverables: [
      'Comprehensive 3D BIM Architectural Model & VR Walkthrough',
      'Detailed Working Architectural Drawings & Structural Coordination',
      'Sun-Path, Daylighting & Cross-Ventilation Simulation Studies',
      '100% Vaastu-Compliant Spatial & Room Orientations',
    ],
    specifications: [
      { label: 'Scope', value: 'Complete Architectural Commission' },
      { label: 'Footprint', value: '3,000 to 25,000+ sq.ft' },
      { label: 'Deliverables', value: 'Working GFC (Good-For-Construction) Drawings' },
    ],
  },
  {
    id: 'turnkey-construction',
    icon: Building2,
    title: 'Turnkey Civil Construction',
    tagline: 'Reinforced Concrete Framing & Complete Engineering Execution',
    description:
      'Zero budget overruns. Guaranteed handover milestones. We provide turnkey civil construction using high-grade primary steel (Tata Tiscon Fe550D) and UltraTech cement. Every stage is overseen daily by resident licensed civil engineers.',
    image: '/images/architecture/structural-construction-frame.webp',
    deliverables: [
      'IS-456 Structural Concrete Footings, Plinth & Slab Castings',
      'Engineered Plinth Elevation (3 to 4 ft above road) for Flood Safety',
      'Daily Photo & Engineering Log Updates on Material Quality',
      '10-Year Comprehensive Structural Concrete Warranty',
    ],
    specifications: [
      { label: 'Contract', value: 'Guaranteed Maximum Price (GMP) Fixed Budget' },
      { label: 'Supervision', value: 'Daily Resident Site Civil Engineer' },
      { label: 'Testing', value: 'Third-Party Cube & Steel Tensile Audits' },
    ],
  },
  {
    id: 'haute-interiors',
    icon: Palette,
    title: 'Haute Interior Architecture',
    tagline: 'Sculptural Atriums, Italian Marble & Bespoke Teak Joinery',
    description:
      'Interior architecture that flows organically from the building envelope. We hand-select rare imported marbles, design acoustic timber paneling, integrate concealed ambient illumination, and curate bespoke furnishings.',
    image: '/images/architecture/living-room-double-height.webp',
    deliverables: [
      'Custom Millwork, Wardrobe & Teak Joinery Detailing Plans',
      'Bookmatched Italian Marble Selection & Dry-Lay Inspection',
      'Concealed Architectural Lighting & Automation Integration',
      'Complete Sanitaryware, Hardware & Fixture Procurement',
    ],
    specifications: [
      { label: 'Aesthetic', value: 'Warm Monolithic Architectural Luxury' },
      { label: 'Materials', value: 'Statuario Marble, Teak, Fluted Glass' },
      { label: 'Execution', value: 'Turnkey Millwork & On-Site Joinery' },
    ],
  },
  {
    id: 'biophilic-landscape',
    icon: Trees,
    title: 'Landscape & Biophilic Architecture',
    tagline: 'Open Courtyards, Reflection Pools & Shaded Pergolas',
    description:
      'We blur the boundary between indoors and outdoors. Sculptural water bodies that lower ambient tropical heat, private zen courtyards, native drought-tolerant trees, and automated micro-drip irrigation systems.',
    image: '/images/architecture/courtyard-water-residence.webp',
    deliverables: [
      'Central Courtyard Open-Air Water Feature & Fountain Design',
      'Terrace Cool-Roof Planters & Thermal Heat Insulation',
      'Granite Stone Paving & Ambient Evening Garden Illumination',
      'Subsurface Rainwater Harvesting & Groundwater Recharge Pits',
    ],
    specifications: [
      { label: 'Irrigation', value: 'Multi-Zone Automated Drip System' },
      { label: 'Climate Impact', value: 'Reduces Indoor Temperatures by 3°–5°C' },
      { label: 'Plantings', value: 'Indigenous Drought-Resistant Tropicals' },
    ],
  },
  {
    id: 'structural-engineering',
    icon: ShieldCheck,
    title: 'Structural & MEP Engineering',
    tagline: 'Computerized STAAD.Pro Calculations & Soil-Tested Piles',
    description:
      'Engineered for maximum seismic and coastal resilience. We conduct rigorous plot soil testing before designing foundations — deep bored RCC piles for clayey or water-heavy plots, and reinforced raft footings for coastal sands.',
    image: '/images/architecture/staad-structural-engineering.webp',
    deliverables: [
      'Soil Stratum Investigation & Foundation Selection Report',
      'STAAD.Pro 3D Structural Load Calculations & Shear Wall Detailing',
      'Concealed In-Wall Low-Noise Drainage & Plumbing Conduits',
      'Phase-Balanced Electrical Distribution & EV Ready Infrastructure',
    ],
    specifications: [
      { label: 'Codes', value: 'IS 456, IS 1893 (Seismic Zone III)' },
      { label: 'Redundancy', value: 'Engineered with 1.5x Structural Safety Margin' },
      { label: 'Foundation', value: 'Bored RCC Piles / Isolated Raft Footings' },
    ],
  },
  {
    id: 'cmda-sanctions',
    icon: FileCheck,
    title: 'CMDA & Statutory Building Sanctions',
    tagline: 'Expedited Online Single-Window Approval Management',
    description:
      'Navigating government regulatory frameworks without delay or uncertainty. We verify road width alignments, maximize legitimate FSI, prepare compliant sanction drawings, and secure your official building permit.',
    image: '/images/architecture/cmda-sanction-drafting.webp',
    deliverables: [
      'Development Control Rules (DCR) Compliance & FSI Analysis',
      'Complete CMDA / DTCP / Corporation Sanction Drawing Sets',
      'Structural Stability & Boundary Level Verification Certificates',
      'Building Permit & Assessment Order Handover',
    ],
    specifications: [
      { label: 'Jurisdiction', value: 'Greater Chennai Corporation & CMDA Area' },
      { label: 'Process', value: 'Single-Window Online Clearance' },
      { label: 'Record', value: '100% First-Time Compliance Track Record' },
    ],
  },
];

export default async function Template10Services({ params }: PageProps) {
  const { slug } = await params;
  const basePath = `/designwebsite/template10/${slug}`;

  const data = await readSourceConfig(slug, 'template10');
  if (!data) return notFound();

  const { clinic } = data;
  const cleanName = cleanClinicName(clinic.name);

  return (
    <div className="bg-[#faf8f5]">
      {/* Header Banner */}
      <section className="py-20 sm:py-28 bg-[#111111] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-25 pointer-events-none">
          <Image
            src={ARCHITECTURE_STOCK.services[0]}
            alt="Services Monograph"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="relative z-10 max-w-[1360px] mx-auto px-5 sm:px-8 text-center flex flex-col items-center">
          <span className="text-[11px] tracking-[0.35em] uppercase font-bold text-[#c5a47e] mb-3">
            Atelier Disciplines & Capabilities
          </span>
          <h1
            className={`${cinzel.className} text-[34px] sm:text-[48px] lg:text-[58px] font-bold text-white tracking-tight leading-tight max-w-4xl`}
          >
            Multi-Disciplinary Architectural Practice
          </h1>
          <p className="mt-5 text-[15px] sm:text-[17px] text-[#cfcac2] max-w-2xl font-light leading-relaxed">
            From initial sketch and structural soil calculation to turnkey civil handover and bespoke interior joinery.
          </p>
        </div>
      </section>

      {/* Services List Section */}
      <section className="py-20 sm:py-28">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8 space-y-20">
          {DETAILED_SERVICES.map((srv, idx) => {
            const isEven = idx % 2 === 1;
            const Icon = srv.icon;

            return (
              <div
                key={srv.id}
                id={srv.id}
                className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center bg-[#f5f2ea] border border-[#141414]/10 p-6 sm:p-10 lg:p-12 shadow-sm"
              >
                {/* Visual */}
                <div className={`lg:col-span-6 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="relative aspect-[4/3] w-full overflow-hidden border border-[#141414]/15 shadow-xl group">
                    <Image
                      src={srv.image}
                      alt={srv.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute top-4 left-4 bg-[#141414]/85 text-[#faf8f5] text-[10px] tracking-[0.2em] uppercase font-bold px-3 py-1 border border-white/10">
                      Discipline 0{idx + 1}
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className={`lg:col-span-6 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div className="flex items-center gap-2 text-[#b89568] text-[11px] tracking-[0.25em] uppercase font-bold mb-2">
                    <Icon className="w-4 h-4" />
                    <span>{srv.tagline}</span>
                  </div>

                  <h2
                    className={`${cinzel.className} text-[24px] sm:text-[32px] font-bold text-[#141414] leading-tight`}
                  >
                    {srv.title}
                  </h2>

                  <p className="mt-4 text-[14.5px] sm:text-[15.5px] text-[#5a544c] leading-relaxed">
                    {srv.description}
                  </p>

                  {/* Deliverables */}
                  <div className="mt-6 space-y-2.5">
                    {srv.deliverables.map((del) => (
                      <div key={del} className="flex items-start gap-2.5 text-[13px] sm:text-[14px] text-[#24201a]">
                        <CheckCircle2 className="w-4 h-4 text-[#c5a47e] shrink-0 mt-0.5" />
                        <span>{del}</span>
                      </div>
                    ))}
                  </div>

                  {/* Specs Strip */}
                  <div className="mt-8 pt-6 border-t border-[#141414]/10 grid grid-cols-3 gap-4">
                    {srv.specifications.map((spec) => (
                      <div key={spec.label}>
                        <div className="text-[9.5px] tracking-[0.18em] uppercase text-[#7a746d] font-bold">
                          {spec.label}
                        </div>
                        <div className="mt-1 text-[12px] font-semibold text-[#141414] leading-tight">
                          {spec.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8">
                    <Link
                      href={`${basePath}/contact?service=${encodeURIComponent(srv.title)}`}
                      className="inline-flex items-center gap-3 bg-[#141414] text-[#faf8f5] px-6 py-3.5 text-[11px] tracking-[0.22em] uppercase font-bold hover:bg-[#c5a47e] hover:text-[#141414] transition-colors group"
                    >
                      <span>Commission {srv.title}</span>
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 bg-[#111111] text-white">
        <div className="max-w-[1000px] mx-auto px-5 sm:px-8 text-center flex flex-col items-center">
          <h2
            className={`${cinzel.className} text-[28px] sm:text-[38px] font-bold text-white leading-tight`}
          >
            Request a Plot Feasibility Consultation
          </h2>
          <p className="mt-4 text-[15px] text-[#cfcac2] max-w-xl">
            Our principal architects and structural engineers will examine your plot boundaries, road width, and soil parameters.
          </p>
          <div className="mt-8">
            <Link
              href={`${basePath}/contact`}
              className="bg-[#c5a47e] text-[#111111] px-8 py-4 text-[11px] tracking-[0.22em] uppercase font-bold hover:bg-[#d9bb93] transition-colors shadow-lg"
            >
              Initiate Discussion
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
