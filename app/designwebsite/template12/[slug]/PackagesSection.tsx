import Link from 'next/link';
import { Check, ArrowRight } from 'lucide-react';
import Reveal from './Reveal';

export const TEMPLATE12_PACKAGES = [
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
    tag: 'Most Loved Choice',
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
    tag: 'Full Turnkey Execution',
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
    <section id="packages" className="py-[clamp(80px,8vw,120px)] px-6 sm:px-8 lg:px-12 bg-[#121c17] text-white">
      <div className="max-w-[1240px] mx-auto">
        <Reveal className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[12px] font-extrabold tracking-[0.16em] uppercase text-[#a3f0c4] block mb-2">
            Clear Investment Tiers
          </span>
          <h2 className="font-[family-name:var(--font-bricolage)] font-bold text-[clamp(28px,3.8vw,46px)] tracking-[-0.02em]">
            Transparent Architectural Packages
          </h2>
          <p className="text-white/70 text-[15px] mt-2">
            Choose the engagement tier matched to your build stage, approvals, and construction requirements.
          </p>
        </Reveal>

        <div className="grid lg:grid-cols-3 gap-8 items-stretch">
          {TEMPLATE12_PACKAGES.map((pkg, idx) => (
            <Reveal key={pkg.name} delay={idx * 80}>
              <div
                className={`p-8 sm:p-9 rounded-[26px] h-full flex flex-col justify-between border transition-all duration-300 ${
                  idx === 1
                    ? 'bg-[#1b2a23] border-[#0e5a43] shadow-[0_20px_50px_rgba(14,90,67,0.3)] relative'
                    : 'bg-white/[0.04] border-white/10 hover:border-white/25'
                }`}
              >
                {idx === 1 && (
                  <span className="absolute -top-3.5 right-6 bg-[#0e5a43] text-white text-[11px] font-extrabold uppercase px-3.5 py-1 rounded-full shadow-md">
                    {pkg.tag}
                  </span>
                )}
                <div>
                  <span className="text-[11px] font-extrabold tracking-wider uppercase text-[#a3f0c4] block mb-2">
                    {pkg.tag}
                  </span>
                  <h3 className="font-[family-name:var(--font-bricolage)] font-bold text-[24px] text-white mb-1">
                    {pkg.name}
                  </h3>
                  <b className="font-[family-name:var(--font-bricolage)] font-bold text-[22px] text-[#a3f0c4] block mb-4">
                    {pkg.price}
                  </b>
                  <p className="text-[13.5px] text-white/70 font-medium leading-relaxed mb-6 pb-5 border-b border-white/10">
                    {pkg.desc}
                  </p>

                  <ul className="grid gap-2.5 mb-8">
                    {pkg.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-[13.5px] text-white/90 font-medium">
                        <Check className="w-4 h-4 text-[#a3f0c4] shrink-0 mt-0.5" strokeWidth={2.4} />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href={`${basePath}/contact`}
                  className={`inline-flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-bold text-[13.5px] transition-all text-center ${
                    idx === 1
                      ? 'bg-[#0e5a43] text-white hover:bg-[#137456]'
                      : 'bg-white/10 text-white border border-white/15 hover:bg-white hover:text-[#121c17]'
                  }`}
                >
                  Select This Scope <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
