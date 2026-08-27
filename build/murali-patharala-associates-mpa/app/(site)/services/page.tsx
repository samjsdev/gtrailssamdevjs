import { readSourceConfig } from '@/lib/sourceData';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

interface PageProps {
  params?: any;
}

const DETAILED_SERVICES = [
  {
    num: '01',
    title: 'Turnkey Residential Construction',
    badge: 'Core Competency',
    desc: 'From virgin soil testing and seismic-resistant RCC foundation to final marble polishing and keys in hand. We manage 100% of material procurement, heavy machinery, labor, and safety compliance with zero subcontractors.',
    deliverables: [
      'Seismic Zone III engineered RCC framed structure',
      'Tata Tiscon / JSW 550D TMT reinforcement steel',
      'UltraTech / Ramco Supergrade 53-grade certified cement',
      'Comprehensive 4-tier waterproofing (basement, wet areas, terrace)',
      'Multi-stage curing with daily recorded concrete cube strength tests',
      '10-year written structural guarantee certificate',
    ],
    image: '/images/stock/68b39046.webp',
  },
  {
    num: '02',
    title: 'Architectural Space Planning & 3D Elevations',
    badge: 'Licensed Architects',
    desc: 'Bespoke floor layouts engineered around natural cross-ventilation, seasonal sun tracking, and functional ergonomics. We produce photo-realistic 3D walkthroughs so you experience every corridor, ceiling height, and facade before pouring concrete.',
    deliverables: [
      'Comprehensive Vaastu-compliant spatial planning',
      'High-detail exterior 3D elevation renders and lighting plans',
      'Full MEP (Mechanical, Electrical, Plumbing) working blueprints',
      'Structural calculation sheets stamped by licensed engineers',
      'Floor-to-ceiling volume and cross-ventilation optimization',
      'Complete municipal submission drawing sets',
    ],
    image: '/images/stock/a151a9e5.webp',
  },
  {
    num: '03',
    title: 'Interior Architecture & Custom Joinery',
    badge: 'In-House Factory',
    desc: 'Concurrent interior planning during civil execution guarantees flush electrical points, concealed AC lines, and built-in niches without later hacking. Fabricated in our in-house factory using 100% BWR Marine Plywood (IS:710).',
    deliverables: [
      'Modular kitchens with soft-close German hardware (Blum / Hafele)',
      'Floor-to-ceiling wardrobes with integrated sensor LED illumination',
      'Acoustic ceiling drops and architectural magnetic track lighting',
      'Natural Italian marble inlays and custom hardwood door frames',
      'Bespoke TV consoles, study units, and vanity storage',
      '5-year written joinery warranty against delamination and termites',
    ],
    image: '/images/stock/bf333360.webp',
  },
  {
    num: '04',
    title: 'CMDA Approvals, Permits & Civic Liaison',
    badge: 'Zero Bureaucracy',
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
            End-to-End Capabilities
          </p>
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold font-serif leading-tight tracking-tight"
            style={{ fontFamily: "'Lora', serif" }}
          >
            Turnkey Construction, Architecture &amp; Interior Joinery.
          </h1>
          <p className="text-base sm:text-lg text-white/75 font-medium max-w-2xl mx-auto leading-relaxed">
            One single point of contact from virgin plot inspection to handover of keys. Everything handled in-house with zero subcontractor markups.
          </p>
        </div>
      </section>

      {/* ── Services Detailed Rows ── */}
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
                  <span className="text-[11px] font-bold tracking-widest uppercase bg-[#111111] text-white px-3 py-1">
                    {s.badge}
                  </span>
                </div>

                <h2
                  className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif text-[#111111] tracking-tight leading-tight"
                  style={{ fontFamily: "'Lora', serif" }}
                >
                  {s.title}
                </h2>

                <p className="text-sm sm:text-base text-[#757575] leading-relaxed font-medium">
                  {s.desc}
                </p>

                <div className="pt-4 border-t-2 border-[#E0E0E0]">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-[#111111] mb-4">
                    Key Deliverables &amp; Specifications:
                  </h4>
                  <ul className="grid sm:grid-cols-2 gap-3 text-xs sm:text-sm font-medium text-[#111111]">
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
                    className="object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                  <div className="absolute inset-0 bg-[#EA580C] mix-blend-overlay opacity-15 pointer-events-none" />
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* ── Pre-Footer CTA ── */}
      <section className="py-16 md:py-24 px-6 md:px-12 bg-[#111111] text-white border-t-4 border-[#111111] text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#EA580C]">
            Ready to Begin?
          </p>
          <h2
            className="text-3xl sm:text-5xl font-bold font-serif tracking-tight"
            style={{ fontFamily: "'Lora', serif" }}
          >
            Get a Detailed Itemized BOQ for Your Plot
          </h2>
          <p className="text-sm sm:text-base text-white/70 font-medium leading-relaxed">
            Every material brand, specification grade, and timeline milestone transparently laid out in black and white.
          </p>
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/#quick-estimate"
              className="px-8 py-4 bg-[#EA580C] text-[#111111] font-bold uppercase tracking-widest text-xs hover:bg-white transition-colors"
            >
              Get Free Estimate
            </Link>
            <a
              href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent('Hi Murali Patharala Associates, I would like to schedule a feasibility consultation for my plot.')}`}
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
