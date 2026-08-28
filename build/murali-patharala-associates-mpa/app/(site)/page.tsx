import { readSourceConfig } from '@/lib/sourceData';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import HeroSection from './HeroSection';
import StatsBand from './StatsBand';
import MarqueeBand from './MarqueeBand';
import ProjectCarousel from './ProjectCarousel';
import BeforeAfter from './BeforeAfter';
import ConstructionPackages from './ConstructionPackages';

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
    category: 'IN-HOUSE MASTERY',
    title: 'Licensed Architects & Civil Engineers',
    highlight: 'Zero Subcontracting Guarantee',
    specs: [
      'Council of Architecture (COA) Registered',
      'Dedicated Daily Site Engineer Oversight',
      '500+ Luxury Homes Delivered in Chennai',
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
    title: 'Architectural Designs',
    desc: 'Custom floor plans, photorealistic 3D elevations, structural analysis, CMDA / GCC municipal sanction drawings, and Vastu spatial planning.',
    link: '/services#architecture',
  },
  {
    icon: '02',
    title: 'Residential Construction',
    desc: 'Soil testing to key handover—earthwork, seismic-resistant RCC framing, branded materials, 425+ quality tests, and dedicated full-time site supervision.',
    link: '/services#construction',
  },
  {
    icon: '03',
    title: 'Interior Designs',
    desc: 'Bespoke living spaces crafted in 100% BWR Marine Plywood (IS:710)—modular kitchens, floor-to-ceiling wardrobes, designer ceilings, and mood lighting.',
    link: '/services#interiors',
  },
  {
    icon: '04',
    title: 'Turnkey Construction Services',
    desc: 'One-stop solution combining architecture, civil engineering, and interior joinery under a single contract with a 10-year structural warranty.',
    link: '/services#turnkey',
  },
];





const JOURNEY_STEPS = [
  {
    step: '01',
    title: 'Tell Us Your Requirements',
    desc: 'We capture your plot dimensions, family lifestyle requirements, number of floors, preferred architectural style, budget parameters, and future expansion plans.',
  },
  {
    step: '02',
    title: 'Laser Site Assessment',
    desc: 'Our civil engineers conduct physical plot verification, boundary measurement, road width access checks, orientation sun-path analysis, and soil test investigation.',
  },
  {
    step: '03',
    title: 'Architectural Design',
    desc: 'Our architects develop custom 2D functional floor plans, furniture layouts, and photorealistic 3D elevations aligned with your preferences and Chennai climatic conditions.',
  },
  {
    step: '04',
    title: 'Engineering & Detailed Drawings',
    desc: 'Comprehensive structural RCC drawings, beam-column schedules, electrical schematics, and plumbing lines are developed for municipal compliance and error-free execution.',
  },
  {
    step: '05',
    title: 'Final Design & Built-Up Area',
    desc: 'The exact room dimensions, elevation specifications, and built-up area calculations are finalized and validated with you before estimating costs.',
  },
  {
    step: '06',
    title: 'Detailed Construction Estimate',
    desc: 'We prepare an exhaustive, line-by-line Bill of Quantities (BOQ) covering every material brand, grade, quantity, and unit rate with total cost transparency.',
  },
  {
    step: '07',
    title: 'Construction Agreement',
    desc: 'A legally binding agreement is signed freezing the price per sq.ft, material specifications, and milestone completion timelines. Zero hidden costs.',
  },
  {
    step: '08',
    title: 'Construction Begins',
    desc: 'With your dedicated site engineer in place, construction commences. You receive weekly milestone tracking updates and 425+ documented quality test records up to key handover.',
  },
];

const TESTIMONIALS = [
  {
    name: 'S. Rajagopalan',
    area: 'Anna Nagar East, Chennai',
    project: '4,400 Sq.Ft Contemporary Villa',
    text: 'Murali Patharala Associates delivered exactly what they promised, on the exact date agreed in the contract. The 425-point QC checks and daily engineer presence meant I never had to worry while sitting in my office.',
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
    text: 'Having in-house architects and civil engineers under one roof made all the difference. The transition from 3D conceptual drawings to the physical villa was flawless. Exceptional structural and interior craftsmanship.',
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
    <div className="w-full bg-[#FAFAFA] text-[#111111]">
      {/* 1. Hero Section */}
      <HeroSection phone={phone} />

      {/* 2. Numbers / Credentials Section (Brought Down with Count-Up Animation) */}
      <StatsBand />

      {/* 3. Infinite Continuous Marquee Ribbon */}
      <MarqueeBand />

      {/* Real Transformation (Before / After Comparison) */}
      <section id="transformations" className="py-20 md:py-28 px-6 md:px-12 border-b-4 border-[#111111] bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <div className="max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#EA580C] inline-block border-b-2 border-[#EA580C] pb-1 mb-4">
              Real Transformation
            </span>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-[#111111] tracking-tight leading-tight mb-4"
              style={{ fontFamily: "'Lora', serif" }}
            >
              From Plan Sketch to <span className="text-[#EA580C]">Completed Project</span>
            </h2>
            <p className="text-sm sm:text-base text-[#555555] leading-relaxed font-medium">
              See how our architectural blueprints, structural engineering, and precision construction transform a 2D plan sketch and raw structural shell into a luminous, climate-responsive completed landmark.
            </p>
          </div>

          <div className="w-full">
            <BeforeAfter
              beforeImage="/images/architecture/villa-plan-sketch.webp"
              afterImage="/images/architecture/villa-after-finished.webp"
              caption="Drag slider to compare 2D plan sketch vs completed project"
            />
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-8">
            <div className="inline-flex items-center gap-3 bg-[#FAFAFA] border-2 border-[#111111] px-5 py-3 shadow-sm">
              <span className="text-xl sm:text-2xl font-bold font-serif text-[#EA580C]" style={{ fontFamily: "'Lora', serif" }}>
                10-Year
              </span>
              <span className="text-[11px] font-bold text-[#111111] uppercase tracking-wider">Structural Warranty</span>
            </div>
            <div className="inline-flex items-center gap-3 bg-[#FAFAFA] border-2 border-[#111111] px-5 py-3 shadow-sm">
              <span className="text-xl sm:text-2xl font-bold font-serif text-[#EA580C]" style={{ fontFamily: "'Lora', serif" }}>
                425+
              </span>
              <span className="text-[11px] font-bold text-[#111111] uppercase tracking-wider">Quality Audits</span>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#EA580C] hover:text-[#111111] transition-colors border-b-2 border-[#EA580C] pb-0.5"
            >
              Get a Feasibility Report for Your Plot &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Why Choose MPA - 6 Core Architectural Pillars */}
      <section id="why-choose" className="border-b-4 border-[#111111] bg-[#FAFAFA] py-20 md:py-28 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8 pb-8 border-b-2 border-[#111111]/15">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="w-2.5 h-2.5 bg-[#EA580C]"></span>
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#EA580C]">
                  Why Choose Murali Patharala Associates
                </span>
              </div>
              <h2
                className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-[#111111] tracking-tight leading-tight"
                style={{ fontFamily: "'Lora', serif" }}
              >
                Engineered for Certainty. <br />
                <span className="text-[#EA580C]">Architected</span> for Generations.
              </h2>
            </div>
            <div className="max-w-md">
              <p className="text-sm sm:text-base text-[#555555] font-medium leading-relaxed">
                Building a private home in Chennai is a major life milestone. We replace contractor ambiguity with architectural discipline, fixed pricing, and uncompromising engineering rigor.
              </p>
            </div>
          </div>

          {/* 3-Column Grid of 6 Distinct Architectural Pillar Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {WHY_CHOOSE_PILLARS.map((pillar) => (
              <div
                key={pillar.num}
                className="group bg-white border-2 border-[#111111] p-7 sm:p-8 flex flex-col justify-between hover:border-[#EA580C] hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
              >
                {/* Top Accent Line on Hover */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#EA580C] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

                <div className="space-y-6">
                  {/* Card Header: Editorial Number & Category Badge */}
                  <div className="flex items-center justify-between">
                    <span
                      className="text-4xl sm:text-5xl font-bold font-serif text-[#111111]/20 group-hover:text-[#EA580C] transition-colors"
                      style={{ fontFamily: "'Lora', serif" }}
                    >
                      {pillar.num}
                    </span>
                    <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#EA580C] bg-[#EA580C]/10 border border-[#EA580C]/25 px-2.5 py-1">
                      {pillar.category}
                    </span>
                  </div>

                  {/* Descriptive Architectural SVG Illustration Centerpiece */}
                  <div className="w-20 h-20 bg-[#FAFAFA] border-2 border-[#111111] p-3.5 flex items-center justify-center group-hover:border-[#EA580C] group-hover:bg-[#111111] transition-all duration-300 shadow-sm">
                    {pillar.iconType === 'drafting' && (
                      <svg viewBox="0 0 64 64" className="w-12 h-12 stroke-current text-[#111111] group-hover:text-white transition-colors" fill="none" strokeWidth="1.75">
                        <rect x="8" y="8" width="48" height="48" rx="3" className="stroke-[#111111]/25 group-hover:stroke-white/30" strokeDasharray="3 3" />
                        <path d="M14 50L46 50L14 18Z" className="stroke-[#111111] group-hover:stroke-white" fill="currentColor" fillOpacity="0.05" />
                        <path d="M20 44L34 44L20 30Z" className="stroke-[#EA580C]" fill="currentColor" fillOpacity="0.15" />
                        <path d="M18 50v-3m6 3v-2m6 3v-3m6 3v-2m6 3v-3" className="stroke-[#111111] group-hover:stroke-white" strokeLinecap="round" />
                        <path d="M42 14L46 10L50 14" className="stroke-[#EA580C]" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M46 10v6" className="stroke-[#EA580C]" strokeLinecap="round" />
                        <circle cx="46" cy="18" r="2.5" className="stroke-[#EA580C] fill-[#EA580C]" />
                        <path d="M44 20L34 40M48 20L54 36" className="stroke-[#EA580C]" strokeLinecap="round" />
                        <path d="M38 30h12" className="stroke-[#EA580C]" strokeDasharray="2 2" />
                      </svg>
                    )}
                    {pillar.iconType === 'shield' && (
                      <svg viewBox="0 0 64 64" className="w-12 h-12 stroke-current text-[#111111] group-hover:text-white transition-colors" fill="none" strokeWidth="1.75">
                        <path d="M32 6L12 14v18c0 14 8.5 22 20 26 11.5-4 20-12 20-26V14L32 6Z" className="stroke-[#111111] group-hover:stroke-white" fill="currentColor" fillOpacity="0.05" />
                        <path d="M22 22h20M22 30h20M22 38h20" className="stroke-[#111111]/30 group-hover:stroke-white/40" strokeLinecap="round" />
                        <path d="M26 18v24M38 18v24" className="stroke-[#111111]/30 group-hover:stroke-white/40" strokeLinecap="round" />
                        <rect x="24" y="24" width="16" height="16" rx="2" className="stroke-[#EA580C] fill-[#EA580C]/15" />
                        <path d="M28 32l3 3 6-6" className="stroke-[#EA580C]" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.25" />
                        <circle cx="32" cy="13" r="1.5" className="fill-[#EA580C] stroke-none" />
                        <circle cx="26" cy="15" r="1.2" className="fill-[#EA580C] stroke-none" />
                        <circle cx="38" cy="15" r="1.2" className="fill-[#EA580C] stroke-none" />
                      </svg>
                    )}
                    {pillar.iconType === 'lock' && (
                      <svg viewBox="0 0 64 64" className="w-12 h-12 stroke-current text-[#111111] group-hover:text-white transition-colors" fill="none" strokeWidth="1.75">
                        <rect x="12" y="10" width="28" height="42" rx="2.5" className="stroke-[#111111] group-hover:stroke-white" fill="currentColor" fillOpacity="0.05" />
                        <path d="M18 18h16M18 24h12M18 30h16M18 36h10M18 42h8" className="stroke-[#111111]/30 group-hover:stroke-white/40" strokeLinecap="round" />
                        <circle cx="24" cy="42" r="3.5" className="stroke-[#EA580C] fill-[#EA580C]/15" />
                        <rect x="32" y="28" width="22" height="24" rx="3" className="stroke-[#EA580C] fill-[#FAFAFA] group-hover:fill-[#1A1A1A]" strokeWidth="2" />
                        <path d="M37 28v-7a6 6 0 0112 0v7" className="stroke-[#EA580C]" strokeWidth="2" strokeLinecap="round" />
                        <circle cx="43" cy="38" r="2.5" className="stroke-[#EA580C] fill-[#EA580C]" />
                        <path d="M43 40.5v4" className="stroke-[#EA580C]" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    )}
                    {pillar.iconType === 'compass' && (
                      <svg viewBox="0 0 64 64" className="w-12 h-12 stroke-current text-[#111111] group-hover:text-white transition-colors" fill="none" strokeWidth="1.75">
                        <path d="M32 10L14 20v22l18 10 18-10V20L32 10Z" className="stroke-[#111111] group-hover:stroke-white" fill="currentColor" fillOpacity="0.04" />
                        <path d="M32 10v42M32 32L14 20M32 32l18-12" className="stroke-[#111111]/30 group-hover:stroke-white/40" />
                        <circle cx="48" cy="14" r="5" className="stroke-[#EA580C] fill-[#EA580C]/20" />
                        <path d="M48 6v2m0 12v2m-8-8h2m12 0h2m-7-5l1.5 1.5m-11 11l1.5 1.5m0-14l-1.5 1.5m11 11l-1.5 1.5" className="stroke-[#EA580C]" strokeLinecap="round" />
                        <path d="M8 28c8-3 14 1 20-1s8-5 14-3" className="stroke-[#EA580C]" strokeLinecap="round" strokeDasharray="3 2" />
                        <path d="M8 36c8-3 14 1 20-1s8-5 14-3" className="stroke-[#EA580C]" strokeLinecap="round" strokeDasharray="3 2" />
                        <path d="M32 26l3 6-3-2-3 2 3-6Z" className="stroke-[#EA580C] fill-[#EA580C]" />
                      </svg>
                    )}
                    {pillar.iconType === 'calendar' && (
                      <svg viewBox="0 0 64 64" className="w-12 h-12 stroke-current text-[#111111] group-hover:text-white transition-colors" fill="none" strokeWidth="1.75">
                        <circle cx="28" cy="34" r="18" className="stroke-[#111111] group-hover:stroke-white" fill="currentColor" fillOpacity="0.05" />
                        <path d="M28 20v-4m-4 0h8" className="stroke-[#111111] group-hover:stroke-white" strokeLinecap="round" />
                        <path d="M41 21l3-3" className="stroke-[#111111] group-hover:stroke-white" strokeLinecap="round" />
                        <path d="M28 22v3m0 15v3m-11-9h3m15 0h3" className="stroke-[#111111]/30 group-hover:stroke-white/40" strokeLinecap="round" />
                        <path d="M28 34l6-6" className="stroke-[#EA580C]" strokeWidth="2.25" strokeLinecap="round" />
                        <circle cx="28" cy="34" r="2.5" className="stroke-[#EA580C] fill-[#EA580C]" />
                        <circle cx="48" cy="24" r="6" className="stroke-[#EA580C] fill-[#FAFAFA] group-hover:fill-[#1A1A1A]" strokeWidth="2" />
                        <circle cx="48" cy="24" r="2.5" className="stroke-[#EA580C]" />
                        <path d="M48 30v20m0 0l-3-3m3 3l3-3m-3-9h4m-4 4h3" className="stroke-[#EA580C]" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                    {pillar.iconType === 'tech' && (
                      <svg viewBox="0 0 64 64" className="w-12 h-12 stroke-current text-[#111111] group-hover:text-white transition-colors" fill="none" strokeWidth="1.75">
                        <rect x="10" y="14" width="30" height="42" rx="3" className="stroke-[#111111] group-hover:stroke-white" fill="currentColor" fillOpacity="0.05" />
                        <path d="M22 51h6" className="stroke-[#111111]/40 group-hover:stroke-white/40" strokeLinecap="round" />
                        <path d="M16 26l9-5 9 5v12l-9 5-9-5V26Z" className="stroke-[#EA580C]/70" fill="none" strokeDasharray="2 1.5" />
                        <path d="M25 21v22M25 32l9-5M25 32l-9-5" className="stroke-[#EA580C]/50" />
                        <path d="M42 14h14M38 18l4-4 4 4M52 10l4 4-4 4" className="stroke-[#EA580C]" strokeLinecap="round" strokeLinejoin="round" />
                        <circle cx="49" cy="14" r="3" className="stroke-[#EA580C] fill-[#EA580C]" />
                        <path d="M44 20L36 34m18-14l6 14" className="stroke-[#EA580C]/40" strokeDasharray="2 2" />
                        <path d="M41 26c3 1 7 1 10 0" className="stroke-[#EA580C]" strokeLinecap="round" />
                        <path d="M38 31c5 1.5 11 1.5 16 0" className="stroke-[#EA580C]" strokeLinecap="round" />
                      </svg>
                    )}
                  </div>

                  {/* Title */}
                  <h3
                    className="text-xl sm:text-2xl font-bold font-serif text-[#111111] leading-snug group-hover:text-[#EA580C] transition-colors"
                    style={{ fontFamily: "'Lora', serif" }}
                  >
                    {pillar.title}
                  </h3>

                  {/* Itemized Deliverables & Specs */}
                  <div className="space-y-2 pt-2 border-t border-[#F0F0F0]">
                    {pillar.specs.map((spec, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-[#444444] font-medium">
                        <span className="text-[#EA580C] font-bold mt-0.5">✓</span>
                        <span className="leading-snug">{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Footer Badge */}
                <div className="mt-8 pt-4 border-t-2 border-[#111111]/10 flex items-center justify-between">
                  <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#111111] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#EA580C] animate-pulse"></span>
                    {pillar.highlight}
                  </span>
                  <span className="text-xs text-[#EA580C] font-bold group-hover:translate-x-1 transition-transform">
                    &rarr;
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Grand MPA Assurance Banner */}
          <div className="mt-12 bg-[#111111] border-2 border-[#111111] text-white p-8 sm:p-10 md:p-12 shadow-2xl relative overflow-hidden">
            <div className="grid lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#EA580C]/20 border border-[#EA580C] text-[#EA580C] text-[11px] font-bold uppercase tracking-widest">
                  <span>The MPA Assurance</span>
                  <span>&bull;</span>
                  <span>Anna Nagar, Chennai</span>
                </div>
                <h3
                  className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif text-white leading-tight"
                  style={{ fontFamily: "'Lora', serif" }}
                >
                  10-Year Structural Warranty &bull; Zero Compromise
                </h3>
                <p className="text-sm sm:text-base text-white/80 leading-relaxed font-medium max-w-2xl">
                  Every home we build undergoes 425+ documented quality inspections—from soil bearing analysis to compressive cube testing. Backed by our legally binding 10-year structural warranty and full-time site supervision.
                </p>
                <div className="flex flex-wrap gap-x-8 gap-y-2 pt-2 text-xs font-bold text-[#EA580C] uppercase tracking-wider">
                  <span>28+ Years Experience</span>
                  <span>500+ Homes Handed Over</span>
                  <span>100% Fixed-Price Contract</span>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3.5 justify-center">
                <a
                  href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent('Hi Murali Patharala Associates, I would like to schedule a free site consultation.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#EA580C] text-[#111111] font-bold uppercase tracking-widest text-xs hover:bg-white transition-colors text-center shadow-lg group"
                >
                  <span>Consult Senior Architect</span>
                  <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Scope of Services We Offer */}
      <section id="services" className="py-20 md:py-28 px-6 md:px-12 border-b-4 border-[#111111] bg-[#111111] text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#EA580C] mb-3">WHAT WE DO</p>
              <h2
                className="text-3xl md:text-5xl font-bold font-serif text-white tracking-tight"
                style={{ fontFamily: "'Lora', serif" }}
              >
                Services We Offer
              </h2>
            </div>
            <Link
              href="/services"
              className="text-xs font-bold uppercase tracking-widest text-[#EA580C] hover:text-white transition-colors"
            >
              Explore Detailed Service Specifications &rarr;
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 border-2 border-white/20 divide-y-2 md:divide-y-0 md:divide-x-2 divide-white/20">
            {SERVICES.map((s, idx) => (
              <div key={idx} className="p-8 flex flex-col justify-between space-y-8 bg-[#181818] hover:bg-[#222222] transition-colors">
                <div>
                  <span
                    className="text-4xl font-bold font-serif text-[#EA580C] block mb-6"
                    style={{ fontFamily: "'Lora', serif" }}
                  >
                    {s.icon}
                  </span>
                  <h3 className="text-base font-bold uppercase tracking-wider mb-3 text-white">
                    {s.title}
                  </h3>
                  <p className="text-xs text-white/70 leading-relaxed font-medium">
                    {s.desc}
                  </p>
                </div>
                <Link
                  href={s.link}
                  className="text-[11px] font-bold uppercase tracking-wider text-[#EA580C] hover:text-white transition-colors"
                >
                  View Specifications &rarr;
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Fixed-Price Construction Packages (Simple Summary) */}
      <div id="quick-estimate" className="relative -top-24" />
      <ConstructionPackages phone={phone} variant="simple" />

      {/* 7. How It Works: 8-Stage Turnkey Journey */}
      <section id="process" className="py-20 md:py-28 px-6 md:px-12 border-b-4 border-[#111111] bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#EA580C] mb-3">HOW IT WORKS</p>
            <h2
              className="text-3xl md:text-5xl font-bold font-serif text-[#111111] tracking-tight"
              style={{ fontFamily: "'Lora', serif" }}
            >
              Your Home Construction Journey
            </h2>
            <p className="text-sm md:text-base text-[#666666] max-w-2xl mt-3 font-medium">
              From understanding your initial lifestyle requirements to pouring foundations and turning the key—every stage is engineered and executed with total clarity.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {JOURNEY_STEPS.map((step) => (
              <div key={step.step} className="p-8 border-2 border-[#111111] bg-white space-y-4 hover:border-[#EA580C] transition-colors flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 bg-[#111111] text-[#EA580C] font-bold text-sm flex items-center justify-center mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-base font-bold uppercase tracking-wider text-[#111111] mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-[#666666] leading-relaxed font-medium">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Portfolio Showcase */}
      <ProjectCarousel />



      {/* 10. Client Proof / Testimonials */}
      <section className="py-20 md:py-28 px-6 md:px-12 border-b-4 border-[#111111] bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center max-w-2xl mx-auto">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#EA580C] mb-3">CLIENT TESTIMONIALS</p>
            <h2
              className="text-3xl md:text-5xl font-bold font-serif text-[#111111] tracking-tight"
              style={{ fontFamily: "'Lora', serif" }}
            >
              Rated 4.9 / 5.0 by Chennai Homeowners
            </h2>
            <p className="text-sm md:text-base text-[#666666] mt-3 font-medium">
              Read authentic feedback from families who built their lifelong residences with Murali Patharala Associates.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="p-8 border-2 border-[#111111] bg-white flex flex-col justify-between">
                <div>
                  <div className="flex gap-1 text-[#EA580C] mb-4 text-base">
                    <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                  </div>
                  <p
                    className="text-sm sm:text-base font-medium leading-relaxed mb-6 font-serif italic text-[#111111]"
                    style={{ fontFamily: "'Lora', serif" }}
                  >
                    &ldquo;{t.text}&rdquo;
                  </p>
                </div>
                <div className="pt-4 border-t border-[#E0E0E0]">
                  <p className="text-xs font-bold uppercase tracking-widest text-[#111111]">{t.name}</p>
                  <p className="text-[11px] text-[#EA580C] font-semibold">{t.project}</p>
                  <p className="text-xs text-[#757575] uppercase mt-0.5">{t.area}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
