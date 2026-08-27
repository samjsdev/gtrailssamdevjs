import Link from 'next/link';
import { Check, ArrowRight } from 'lucide-react';
import Reveal from './Reveal';

export const ARCHITECTURE_PACKAGES = [
  {
    tier: '3D Elevation & CMDA Approval Plan',
    tag: 'Design & Approvals',
    price: 'From ₹1.5L',
    desc: 'Realistic 3D exterior elevations, 100% Vaastu floor plans, and complete CMDA / Chennai Corporation plan approval filings.',
    features: [
      'Plot measurement and boundary setback study',
      '100% Vaastu compliant architectural floor plans',
      'Realistic 3D exterior elevations with day & night views',
      'Complete CMDA / GCC sanction plan drawings',
      'Rainwater harvesting and percolation pit layout',
      'Preliminary item-by-item construction cost estimate',
      'Government single-window portal submission support',
    ],
  },
  {
    tier: 'Complete Architectural & Structural Suite',
    tag: 'Most Popular',
    price: 'From ₹3.5L',
    desc: 'Full set of working drawings for construction: structural RCC columns, beams, electrical, and plumbing layouts.',
    features: [
      'Everything in 3D Elevation & CMDA Approval Plan',
      'STAAD-analyzed RCC structural drawings and column details',
      'Tata Tiscon steel bar bending schedules',
      'Complete electrical point layout and conduit planning',
      'Plumbing lines, septic tank, and water sump drawings',
      'Door, window, and joinery fabrication specifications',
      'Regular site engineer inspections at critical stages',
      'Direct coordination with your building contractor',
    ],
  },
  {
    tier: 'Turnkey Construction (Villas & Buildings)',
    tag: 'Full Execution',
    price: 'From ₹2,400/sq.ft',
    desc: 'End-to-end turnkey construction for luxury villas, residences, and commercial spaces with Tata Tiscon steel, UltraTech cement, and a 10-year warranty.',
    features: [
      'Complete architectural & structural drawings included',
      'Soil test matched foundation (Bored RCC Piles / Footings)',
      'Primary Tata Tiscon Fe550D steel & UltraTech Grade-53 cement',
      'Raised plinth height (3 to 4 feet) for complete flood protection',
      'Complete electrical, plumbing, flooring, and exterior finishes',
      'Weekly progress photo updates shared with clients',
      'Fixed cost guarantee with zero mid-construction price increase',
      '10-year structural warranty certificate upon key handover',
    ],
  },
];

export default function PackagesSection({
  basePath,
  dark = false,
}: {
  basePath: string;
  dark?: boolean;
}) {
  return (
    <section id="packages" className={`py-[clamp(84px,9vw,130px)] px-6 lg:px-7 ${dark ? 'bg-[#18130e] text-white' : 'bg-[#f6f2ec] text-[#211a13]'}`}>
      <div className="max-w-7xl mx-auto">
        <Reveal className="text-center max-w-2xl mx-auto mb-[clamp(48px,5vw,72px)]">
          <span className="flex items-center justify-center gap-3.5 text-[12px] tracking-[0.38em] uppercase text-[#a58150] mb-4 before:content-[''] before:w-10 before:h-px before:bg-[#a58150] after:content-[''] after:w-10 after:h-px after:bg-[#a58150]">
            Transparent Investment
          </span>
          <h2 className="font-[family-name:var(--font-marcellus)] text-[clamp(32px,3.8vw,52px)] leading-[1.1] mb-4">
            Curated Architectural Packages
          </h2>
          <p className={`${dark ? 'text-white/70' : 'text-[#7d7264]'} font-light text-[15.5px]`}>
            Clear item-by-item pricing with fixed rates, quality branded materials, and guaranteed timelines.
          </p>
        </Reveal>

        <div className="grid lg:grid-cols-3 gap-8">
          {ARCHITECTURE_PACKAGES.map((pkg, idx) => (
            <Reveal key={pkg.tier} delay={idx * 90}>
              <div
                className={`p-8 sm:p-10 h-full flex flex-col justify-between border transition-all duration-300 ${
                  idx === 1
                    ? 'bg-[#211a13] text-white border-[#a58150] shadow-[0_20px_50px_rgba(33,26,19,0.35)] relative'
                    : dark
                    ? 'bg-white/[0.03] text-white border-white/10 hover:border-[#a58150]'
                    : 'bg-[#f6f1e8] text-[#211a13] border-[#211a13]/10 hover:border-[#a58150]'
                }`}
              >
                {idx === 1 && (
                  <span className="absolute -top-3.5 right-8 bg-[#a58150] text-white text-[10px] tracking-[0.2em] uppercase px-3 py-1 font-semibold">
                    {pkg.tag}
                  </span>
                )}
                <div>
                  <span
                    className={`text-[11px] tracking-[0.25em] uppercase block mb-2 ${
                      idx === 1 ? 'text-[#c9ab7c]' : 'text-[#a58150]'
                    }`}
                  >
                    {pkg.tag}
                  </span>
                  <h3 className="font-[family-name:var(--font-marcellus)] text-[26px] mb-2 leading-tight">
                    {pkg.tier}
                  </h3>
                  <b
                    className={`font-[family-name:var(--font-marcellus)] text-[22px] block mb-4 ${
                      idx === 1 ? 'text-[#c9ab7c]' : 'text-[#a58150]'
                    }`}
                  >
                    {pkg.price}
                  </b>
                  <p
                    className={`text-[13.5px] font-light leading-[1.65] mb-8 pb-6 border-b ${
                      idx === 1
                        ? 'text-white/75 border-white/15'
                        : dark
                        ? 'text-white/65 border-white/10'
                        : 'text-[#7d7264] border-[#211a13]/10'
                    }`}
                  >
                    {pkg.desc}
                  </p>

                  <ul className="grid gap-3 mb-8">
                    {pkg.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-3 text-[13.5px] font-light leading-snug">
                        <Check
                          className={`w-4 h-4 shrink-0 mt-0.5 ${
                            idx === 1 ? 'text-[#c9ab7c]' : 'text-[#a58150]'
                          }`}
                        />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href={`${basePath}/contact`}
                  className={`inline-flex items-center justify-center gap-2 py-4 px-6 text-[12px] tracking-[0.2em] uppercase font-medium transition-colors duration-300 text-center ${
                    idx === 1
                      ? 'bg-[#a58150] text-white border border-[#a58150] hover:bg-white hover:text-[#211a13] hover:border-white'
                      : dark
                      ? 'bg-transparent text-white border border-white/25 hover:bg-white hover:text-[#211a13]'
                      : 'bg-transparent text-[#211a13] border border-[#211a13] hover:bg-[#211a13] hover:text-white'
                  }`}
                >
                  Select This Package <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
