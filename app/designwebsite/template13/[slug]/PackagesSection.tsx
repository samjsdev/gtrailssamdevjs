import Link from 'next/link';
import { Check, ArrowRight } from 'lucide-react';
import Reveal from './Reveal';

export const TEMPLATE13_PACKAGES = [
  {
    name: 'Architectural Design & Sanctions',
    price: 'From ₹3.8 Lakhs',
    tag: 'Fast 40-Day Delivery',
    desc: 'Topographical study, 3D BIM models, and municipal sanction drawings strictly adhering to local bylaws.',
    features: [
      'Topographical Site Survey & Contour Model',
      'Solar Path & Microclimate Analysis',
      '3D Massing & BIM Digital Twin Model',
      'Municipal Sanction Drawing Dossier',
      'Detailed BOQ Preliminary Cost Plan',
      '100% Bylaw Compliance Guarantee',
    ],
  },
  {
    name: 'Structural & MEP Engineering',
    price: 'From ₹7.5 Lakhs',
    tag: 'Most Popular',
    desc: 'STAAD-analyzed RCC frame drawings, bar bending schedules, plumbing & HVAC integration blueprints.',
    features: [
      'Everything in Design & Sanctions',
      'Computerized STAAD Structural Analysis',
      'Rebar Detailing & Bar Bending Schedules',
      'Electrical, Plumbing & HVAC Blueprints',
      'Window & Curtain Wall Engineering Schematics',
      'Zero-Clash Multi-Discipline Coordination',
      'Site Inspections at Casting Milestones',
    ],
  },
  {
    name: 'Turnkey Architectural Build',
    price: 'From ₹65 Lakhs',
    tag: 'Complete Luxury',
    desc: 'Single-contract groundbreaking to keys handover: monolithic RCC casting, Low-E curtain walls, and 10-year warranty.',
    features: [
      'Everything in Structural & MEP Suite',
      'Earthwork, Foundation & Monolithic RCC Pours',
      'Primary Fe550D TMT Steel & Grade-53 Concrete',
      'High-Performance Low-E Curtain Walls',
      'Weekly Milestone Photographic Audits',
      'Final Snagging Audit & Keys Handover',
      '10-Year Comprehensive Structural Warranty',
    ],
  },
];

export default function PackagesSection({ basePath }: { basePath: string }) {
  return (
    <section id="packages" className="py-24 bg-[#1d1713] text-white">
      <div className="max-w-[1240px] mx-auto px-7">
        <Reveal className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2.5 text-[12px] font-extrabold tracking-[0.22em] uppercase text-[#f4b942] mb-3 before:content-[''] before:w-6 before:h-[2.5px] before:rounded before:bg-[#f4b942] after:content-[''] after:w-6 after:h-[2.5px] after:rounded after:bg-[#f4b942]">
            Engagement Tiers
          </div>
          <h2 className="text-[clamp(30px,4vw,52px)] font-extrabold tracking-[-0.02em] leading-[1.08]">
            Architectural Packages &amp; Pricing
          </h2>
          <p className="text-white/70 text-[15.5px] mt-3">
            Single-point accountability from schematic design to certified structural build.
          </p>
        </Reveal>

        <div className="grid lg:grid-cols-3 gap-8">
          {TEMPLATE13_PACKAGES.map((pkg, idx) => (
            <Reveal key={pkg.name} delay={idx * 80}>
              <div
                className={`rounded-[26px] p-8 sm:p-10 h-full flex flex-col justify-between border-[2px] transition-all duration-300 ${
                  idx === 1
                    ? 'bg-[#2a211b] border-[#d8442c] shadow-[0_24px_60px_rgba(216,68,44,0.18)] relative'
                    : 'bg-white/[0.03] border-white/10 hover:border-white/20'
                }`}
              >
                {idx === 1 && (
                  <span className="absolute -top-3.5 right-6 bg-[#d8442c] text-white text-[11px] font-extrabold uppercase px-3.5 py-1 rounded-full shadow-md">
                    {pkg.tag}
                  </span>
                )}
                <div>
                  <span className="text-[11px] font-extrabold tracking-wider uppercase text-[#f4b942] block mb-2">
                    {pkg.tag}
                  </span>
                  <h3 className="font-extrabold text-[24px] text-white mb-1">
                    {pkg.name}
                  </h3>
                  <b className="font-extrabold text-[22px] text-[#f4b942] block mb-4">
                    {pkg.price}
                  </b>
                  <p className="text-[13.5px] text-white/70 font-medium leading-relaxed mb-6 pb-5 border-b border-white/10">
                    {pkg.desc}
                  </p>

                  <ul className="grid gap-3 mb-8">
                    {pkg.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-[13.5px] text-white/85 font-medium">
                        <Check className="w-4 h-4 text-[#d8442c] shrink-0 mt-0.5" strokeWidth={2.4} />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href={`${basePath}/contact`}
                  className={`inline-flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-extrabold text-[13.5px] transition-all text-center ${
                    idx === 1
                      ? 'bg-[#d8442c] text-white hover:bg-[#bd3823]'
                      : 'bg-transparent text-white border border-white/20 hover:bg-white hover:text-[#1d1713]'
                  }`}
                >
                  Select Package <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
