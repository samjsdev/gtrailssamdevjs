import { readSourceConfig } from '@/lib/sourceData';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import ConstructionPackages from '../ConstructionPackages';

interface PageProps {
  params?: any;
}

const DETAILED_SERVICES = [
  {
    num: '01',
    title: 'Turnkey Residential Construction',
    badge: 'Core Competency &bull; 425+ QC Checks',
    desc: 'From virgin soil testing and seismic-resistant RCC foundation to final marble polishing and keys in hand. We manage 100% of material procurement, heavy machinery, labor, and safety compliance with zero third-party subcontracting. Every project is overseen by a dedicated full-time site engineer and backed by our legally binding 10-year structural warranty.',
    deliverables: [
      'Seismic Zone III engineered RCC framed structure with design-mix concrete',
      'Primary reinforcement steel (Tata Tiscon 550D / JSW Neosteel)',
      'UltraTech / Ramco Supergrade 53-grade certified cement',
      'Comprehensive 4-tier waterproofing (basement, wet areas, sunken slabs, terrace)',
      'Daily documented concrete compressive cube tests and moisture curing logs',
      'Dedicated full-time Site Engineer on site every single day',
      'Weekly milestone progress reports with photographic and video verification',
      'Legally binding 10-year written structural warranty certificate',
    ],
    image: '/images/stock/68b39046.webp',
  },
  {
    num: '02',
    title: 'Architectural Space Planning & 3D Elevations',
    badge: 'Licensed Architects & 3D BIM',
    desc: 'Our in-house architects design custom floor plans and stunning 3D elevations tailored to your plot, maximizing natural daylight and cross-ventilation. We provide comprehensive 3D walkthroughs so you experience every corridor, ceiling height, and facade before pouring concrete.',
    deliverables: [
      'Vaastu-aligned spatial planning and room ergonomics',
      'Photorealistic 3D exterior elevations and facade lighting schematics',
      'Complete structural calculation sheets stamped by licensed engineers',
      'Detailed working drawings (Scheme 2D plans for all floors)',
      'Complete MEP (Mechanical, Electrical, Plumbing) coordinate blueprints',
      'Floor-to-ceiling volume optimization and seasonal sun-path tracking',
      'Municipal sanction submission drawings (CMDA & Greater Chennai Corporation)',
      'Itemized Bill of Quantities (BOQ) with guaranteed price freeze',
    ],
    image: '/images/stock/a151a9e5.webp',
  },
  {
    num: '03',
    title: 'End-to-End Signature Luxury Interiors',
    badge: 'In-House Joinery & 100% Marine Ply',
    desc: 'Concurrent interior planning during civil execution guarantees flush electrical points, concealed AC lines, and built-in niches without later hacking. Fabricated in our in-house facility using 100% BWR Marine Plywood (IS:710) and premium hardware.',
    deliverables: [
      'Modular kitchens with soft-close German hardware (Blum / Häfele)',
      'Floor-to-ceiling wardrobes with integrated sensor LED illumination',
      'Acoustic ceiling drops and architectural magnetic track lighting systems',
      'Natural Italian marble inlays and custom hardwood door frames',
      'Bespoke TV consoles, study suites, crockery cabinets, and pooja units',
      '5-year written joinery warranty against delamination, borer, and termites',
      '2-year complimentary maintenance support on fittings and accessories',
      'Custom color palettes and designer wall panelling',
    ],
    image: '/images/stock/bf333360.webp',
  },
  {
    num: '04',
    title: 'CMDA Approvals, Permits & Civic Liaison',
    badge: 'Zero Bureaucracy in Chennai',
    desc: 'We navigate Chennai municipal paperwork so you never lose sleep over statutory compliance. From land survey verification and CMDA plan sanctions to temporary TNEB power and Metro Water connections.',
    deliverables: [
      'Detailed site boundary and land document legal review',
      'CMDA / Greater Chennai Corporation sanctioned plan approval',
      'Temporary construction electricity (TNEB) and water sanction',
      'Structural stability certificates and fire safety clearances where required',
      'Final completion certificate (CC) liaison support',
      'Regular compliance audits during execution',
    ],
    image: '/images/stock/84fea9c5.webp',
  },
];

export default async function ServicesPage({ params }: PageProps) {
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
      {/* ── Hero Banner ── */}
      <section className="py-20 md:py-28 bg-[#111111] text-white border-b-4 border-[#111111] px-6 md:px-12 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <p className="text-xs font-bold tracking-[0.25em] uppercase text-[#EA580C]">
            One-Stop Solution &bull; What We Do
          </p>
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold font-serif leading-tight tracking-tight"
            style={{ fontFamily: "'Lora', serif" }}
          >
            Services We Offer. <br />
            Turnkey Construction &amp; Architecture.
          </h1>
          <p className="text-base sm:text-lg text-white/75 font-medium max-w-2xl mx-auto leading-relaxed">
            One single point of contact from virgin plot inspection to keys in hand. Design, civil engineering, and bespoke luxury interiors handled under one roof with zero subcontractor markups.
          </p>
        </div>
      </section>

      {/* ── Detailed Services Rows ── */}
      <div className="divide-y-4 divide-[#111111] bg-white">
        {DETAILED_SERVICES.map((s, idx) => (
          <section key={s.num} className="py-16 md:py-24 px-6 md:px-12">
            <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-12 items-center">
              {/* Text Specs */}
              <div className={`md:col-span-7 space-y-6 ${idx % 2 === 1 ? 'md:order-2' : ''}`}>
                <div className="flex items-center gap-3">
                  <span
                    className="text-4xl font-bold font-serif text-[#EA580C]"
                    style={{ fontFamily: "'Lora', serif" }}
                  >
                    {s.num}
                  </span>
                  <span 
                    className="text-[11px] font-bold tracking-widest uppercase bg-[#111111] text-white px-3 py-1"
                    dangerouslySetInnerHTML={{ __html: s.badge }}
                  />
                </div>

                <h2
                  className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif text-[#111111] tracking-tight leading-tight"
                  style={{ fontFamily: "'Lora', serif" }}
                >
                  {s.title}
                </h2>

                <p className="text-sm sm:text-base text-[#666666] leading-relaxed font-medium">
                  {s.desc}
                </p>

                <div className="pt-4 border-t-2 border-[#E0E0E0]">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-[#111111] mb-4">
                    Key Deliverables &amp; Technical Specifications:
                  </h4>
                  <ul className="grid sm:grid-cols-2 gap-3 text-xs sm:text-sm font-medium text-[#222222]">
                    {s.deliverables.map((item, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2">
                        <span className="text-[#EA580C] font-bold shrink-0">■</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Visual Frame */}
              <div className={`md:col-span-5 ${idx % 2 === 1 ? 'md:order-1' : ''}`}>
                <div className="relative aspect-[4/3] border-4 border-[#111111] bg-[#181818] overflow-hidden shadow-xl group">
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    className="object-cover grayscale-[0.15] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                  <div className="absolute inset-0 bg-[#EA580C] mix-blend-overlay opacity-15 pointer-events-none" />
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* ── Full Detailed Construction Packages (9 Categories) ── */}
      <ConstructionPackages phone={phone} variant="full" />

      {/* ── Signature Luxury Interiors • End-to-End Solutions ── */}
      <section className="border-b-4 border-[#111111] bg-[#111111] text-white">
        <div className="p-8 md:p-16 bg-[#151515]">
          <div className="max-w-5xl mx-auto space-y-6">
            <div className="inline-block px-3 py-1 bg-[#EA580C]/20 border border-[#EA580C] text-[#EA580C] text-[11px] font-bold uppercase tracking-widest">
              Signature Luxury Interiors &bull; End-to-End Solutions
            </div>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-white tracking-tight leading-tight"
              style={{ fontFamily: "'Lora', serif" }}
            >
              Your Dream Home Isn&apos;t a &lsquo;One-Size-Fits-All&rsquo; Scenario.
            </h2>
            <p className="text-white/80 text-sm sm:text-base leading-relaxed font-medium">
              You must have seen those tempting ads from assembly-line vendors: <em>&ldquo;Get your full-home interior package for just 6.5 Lakhs!&rdquo;</em> where they promise a cookie-cutter kitchen and identical wardrobes. But let&apos;s face it—in the real world, one-size-fits-all interior packages are more myth than magic. Settling for a standard catalog package is like wearing someone else&apos;s shoes: uncomfortable, ill-fitting, and compromised.
            </p>
            <p className="text-white/70 text-sm sm:text-base leading-relaxed font-medium">
              At Murali Patharala Associates (MPA), we don&apos;t just install cupboards and countertops; we curate bespoke architectural living environments. Every millwork joint, fabric texture, lighting channel, and material finish is tailored to your family&apos;s specific daily rhythm, ceiling height, and floor plan.
            </p>

            {/* Scope of Interior Elements Grid */}
            <div className="pt-4">
              <p className="text-xs font-bold uppercase tracking-widest text-[#EA580C] mb-4">
                Comprehensive In-House Interior Capabilities:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  'Modular Kitchen',
                  'Storage & Wardrobes',
                  'False Ceiling & Lights',
                  'TV Units & Wall Paneling',
                  'Crockery & Bar Units',
                  'Study & Home Office',
                  'Pooja Units',
                  'Shoe Racks & Foyers',
                ].map((srv, idx) => (
                  <div key={idx} className="p-3 bg-[#1F1F1F] border border-[#333333] flex items-center gap-2">
                    <span className="text-[#EA580C] text-xs font-bold">✔</span>
                    <span className="text-xs font-semibold text-white/90">{srv}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
 
      {/* ── Pre-Footer CTA ── */}
      <section className="py-16 md:py-24 px-6 md:px-12 bg-[#111111] text-white border-t-4 border-[#111111] text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#EA580C]">
            Ready to Build Your Dream Home?
          </p>
          <h2
            className="text-3xl sm:text-5xl font-bold font-serif tracking-tight"
            style={{ fontFamily: "'Lora', serif" }}
          >
            Get a Detailed Itemized BOQ for Your Plot
          </h2>
          <p className="text-sm sm:text-base text-white/70 font-medium leading-relaxed">
            Every material brand, specification grade, and timeline milestone transparently laid out in black and white with our 100% price freeze guarantee.
          </p>
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/#quick-estimate"
              className="px-8 py-4 bg-[#EA580C] text-[#111111] font-bold uppercase tracking-widest text-xs hover:bg-white transition-colors"
            >
              Get Free Estimate
            </Link>
            <a
              href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent('Hi Murali Patharala Associates, I would like to schedule a site feasibility consultation for my plot.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 border-2 border-[#EA580C] text-[#EA580C] font-bold uppercase tracking-widest text-xs hover:bg-[#EA580C] hover:text-[#111111] transition-colors"
            >
              WhatsApp Studio
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
