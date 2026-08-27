import Link from 'next/link';
import { Check, ArrowRight } from 'lucide-react';
import Reveal from './Reveal';

export const TEMPLATE14_PACKAGES = [
  {
    name: '3D Elevation & CMDA Approval Plan',
    tag: 'Design & Approvals',
    prefix: 'From',
    amount: '1.5L',
    unit: '',
    desc: 'Plot measurement, 100% Vaastu compliant floor plans, realistic 3D exterior elevations, and complete government building permit drawings.',
    inclusions: [
      'Plot measurement and municipal setback calculation',
      '100% Vaastu compliant 2D architectural floor plans',
      'Realistic 3D elevations with day & night lighting views',
      'Complete CMDA / GCC permit drawings & liaison',
      'Rainwater percolation and site grading layout',
      'Preliminary itemised BOQ construction budget',
    ],
  },
  {
    name: 'Architectural & Structural Working Suite',
    tag: 'Structural & Working Drawings',
    prefix: 'From',
    amount: '3.5L',
    unit: '',
    desc: 'Complete engineering documentation for contractor execution: RCC structural columns, beams, plumbing, and electrical conduit drawings.',
    inclusions: [
      'Everything in 3D Elevation & CMDA Approval Plan',
      'STAAD-analyzed RCC structural drawings and column details',
      'Tata Tiscon steel bar bending schedules (BBS)',
      'Complete electrical point conduit & distribution schematics',
      'Plumbing lines, septic tank, and underground sump drawings',
      'Door, window, and grill joinery fabrication specifications',
    ],
  },
  {
    name: 'Turnkey Construction (Villas & Buildings)',
    tag: 'Turnkey Construction',
    prefix: 'From',
    amount: '2,400',
    unit: '/sq.ft',
    desc: 'Single-contract groundbreaking to keys handover: Tata Tiscon steel, Grade-53 cement, daily site supervision, and 10-year structural warranty.',
    inclusions: [
      'Complete architectural & structural drawings included',
      'Soil test matched foundation (Bored RCC Piles / Footings)',
      'Primary Tata Tiscon Fe550D steel & UltraTech Grade-53 cement',
      'Raised plinth height (3 to 4 feet) for flood protection',
      'Daily site supervision by qualified civil engineers',
      '10-Year Comprehensive Structural Warranty Certificate',
    ],
  },
];

export default function PackagesSection({ basePath }: { basePath: string }) {
  return (
    <section id="packages" className="py-24 bg-[#fbf8f1] border-y border-[#221c14]/12 text-[#17130f]">
      <div className="max-w-[1240px] mx-auto px-[30px]">
        <Reveal className="mb-14 text-center max-w-xl mx-auto">
          <div className="inline-flex items-center gap-3 text-[11.5px] font-semibold tracking-[0.3em] uppercase text-[#a4532f] before:content-[''] before:w-8 before:h-px before:bg-[#a4532f] after:content-[''] after:w-8 after:h-px after:bg-[#a4532f]">
            Curated Scope
          </div>
          <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(32px,4.5vw,52px)] font-light leading-[1.08] mt-3">
            Curated engagement tiers
          </h2>
          <p className="text-[#7a6f60] text-[15px] font-light mt-3">
            Transparent civil &amp; architectural scopes with fixed pricing and guaranteed timelines.
          </p>
        </Reveal>

        <div className="grid lg:grid-cols-3 gap-6 items-stretch">
          {TEMPLATE14_PACKAGES.map((tier, idx) => {
            const isFeatured = idx === 1;
            return (
              <Reveal key={tier.name} delay={idx * 80}>
                <div
                  className={`p-8 sm:p-9 h-full flex flex-col justify-between border transition-all duration-300 ${
                    isFeatured
                      ? 'bg-[#17130f] text-white border-[#b08d4f] shadow-[0_24px_60px_rgba(23,19,15,0.25)] relative'
                      : 'bg-white text-[#17130f] border-[#221c14]/12 hover:border-[#a4532f]/40 shadow-sm'
                  }`}
                >
                  {isFeatured && (
                    <span className="absolute -top-3 right-6 bg-[#a4532f] text-white text-[10.5px] font-semibold tracking-[0.16em] uppercase px-3 py-0.5 shadow-md">
                      Most Selected
                    </span>
                  )}
                  <div>
                    <span
                      className={`text-[10.5px] font-semibold tracking-[0.26em] uppercase block mb-2 ${
                        isFeatured ? 'text-[#d9c49a]' : 'text-[#a4532f]'
                      }`}
                    >
                      {tier.tag}
                    </span>
                    <h3
                      className={`font-[family-name:var(--font-cormorant)] text-[26px] font-medium leading-snug mb-2 ${
                        isFeatured ? 'text-white' : 'text-[#17130f]'
                      }`}
                    >
                      {tier.name}
                    </h3>
                    <div
                      className={`flex items-baseline gap-1 font-[family-name:var(--font-cormorant)] text-[24px] font-semibold mb-3 ${
                        isFeatured ? 'text-[#d9c49a]' : 'text-[#a4532f]'
                      }`}
                    >
                      <span className="text-[14px] font-normal uppercase tracking-wider text-[#7a6f60]">
                        {tier.prefix}
                      </span>
                      <span className="font-sans font-normal text-[20px]">₹</span>
                      <span className="[font-variant-numeric:lining-nums]">{tier.amount}</span>
                      {tier.unit && (
                        <span className="text-[13px] font-normal text-[#7a6f60] font-sans">
                          {tier.unit}
                        </span>
                      )}
                    </div>
                    <p
                      className={`text-[13.5px] font-light leading-relaxed mb-6 pb-5 border-b ${
                        isFeatured ? 'text-white/75 border-white/10' : 'text-[#7a6f60] border-[#221c14]/10'
                      }`}
                    >
                      {tier.desc}
                    </p>

                    <ul className="grid gap-2.5 mb-8">
                      {tier.inclusions.map((inc) => (
                        <li
                          key={inc}
                          className={`flex items-start gap-2.5 text-[13px] font-light ${
                            isFeatured ? 'text-white/90' : 'text-[#221c14]/85'
                          }`}
                        >
                          <Check
                            className={`w-4 h-4 shrink-0 mt-0.5 ${
                              isFeatured ? 'text-[#d9c49a]' : 'text-[#a4532f]'
                            }`}
                          />
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    href={`${basePath}/contact`}
                    className={`inline-flex items-center justify-center gap-2 py-3.5 px-6 text-[11px] font-semibold tracking-[0.18em] uppercase transition-all text-center ${
                      isFeatured
                        ? 'bg-[#a4532f] text-white hover:bg-[#884121]'
                        : 'bg-[#17130f] text-white hover:bg-[#a4532f]'
                    }`}
                  >
                    Discuss This Tier <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
