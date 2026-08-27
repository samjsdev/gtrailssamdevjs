'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Check, ArrowRight, Clock, ShieldCheck, Ruler, Calculator } from 'lucide-react';

type HomeType = {
  label: string;
  sub: string;
  defaultArea: number;
  factor: number;
};

type Package = {
  name: string;
  desc: string;
  ratePerSqft: number;
  time: string;
  highlights: string[];
  popular?: boolean;
};

const HOME_TYPES: HomeType[] = [
  { label: 'ECR Coastal Villa', sub: 'Beachside & resort plots', defaultArea: 3200, factor: 1.05 },
  { label: 'City Duplex Home', sub: 'G+1 / G+2 urban plots', defaultArea: 2400, factor: 0.95 },
  { label: 'Chettinad Courtyard Estate', sub: 'Traditional mutham home', defaultArea: 4200, factor: 1.12 },
  { label: 'OMR Green Compound', sub: 'Solar & rainwater ready', defaultArea: 3600, factor: 1.0 },
];

const PACKAGES: Package[] = [
  {
    name: 'Design & Sanctions',
    desc: 'BIM 3D model, STAAD drawings, CMDA/GCC online sanctions & MEP coordination.',
    ratePerSqft: 85,
    time: '40 – 50 Days',
    highlights: [
      'Contour analysis & solar path study',
      'STAAD finite element structural blueprints',
      'Complete CMDA/GCC sanction filing',
      '100% Vaastu-compliant space planning',
    ],
  },
  {
    name: 'Structural Shell',
    desc: 'Soil-matched foundations (Piles/Raft), Tata Tiscon Fe550D TMT & Porotherm walls.',
    ratePerSqft: 1450,
    time: '6 – 8 Months',
    popular: true,
    highlights: [
      'Geotechnical soil-matched foundation',
      'Tested UltraTech Grade-53 monolithic RCC casting',
      'Wienerberger Porotherm thermal hollow blockwork',
      'Weekly engineer site inspections',
    ],
  },
  {
    name: 'Complete Turnkey',
    desc: 'Full build: RCC structure, Low-E glass, cool roof, finishes & 10-yr warranty.',
    ratePerSqft: 2350,
    time: '10 – 14 Months',
    highlights: [
      'Everything in Structural Shell',
      'Saint-Gobain double-glazed Low-E glass',
      'Terrace cool roof tiles & waterproofing',
      'Mandatory GCC rainwater harvesting pit',
      '10-Year Structural Warranty',
    ],
  },
];

const MIN_AREA = 600;
const MAX_AREA = 10000;

const fmt = (n: number) => new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(Math.round(n));

export default function Estimator({ basePath, city }: { basePath: string; city: string }) {
  const [typeIdx, setTypeIdx] = useState(0);
  const [pkgIdx, setPkgIdx] = useState(2);
  const [area, setArea] = useState(HOME_TYPES[0].defaultArea);

  const type = HOME_TYPES[typeIdx];
  const pkg = PACKAGES[pkgIdx];

  const { lo, hi } = useMemo(() => {
    const base = area * pkg.ratePerSqft * type.factor;
    return { lo: base * 0.9, hi: base * 1.15 };
  }, [area, pkg, type]);

  const selectType = (idx: number) => {
    setTypeIdx(idx);
    setArea(HOME_TYPES[idx].defaultArea);
  };

  return (
    <div>
      {/* HEADER */}
      <div className="flex flex-wrap items-end justify-between gap-4 mb-8 pb-6 border-b border-[#1b1b1b]/10">
        <div>
          <span className="inline-flex items-center gap-2 text-[12px] font-extrabold tracking-[0.14em] uppercase text-[#0e5a43] mb-1.5">
            <Calculator className="w-4 h-4 text-[#f2a007]" /> Cost Transparency
          </span>
          <h3 className="font-[family-name:var(--font-bricolage)] font-bold text-[clamp(24px,2.8vw,34px)] text-[#1b1b1b] leading-tight">
            Estimate your construction cost
          </h3>
        </div>
        <span className="text-[12px] font-bold text-[#0e5a43] bg-[#fdeecb] px-3.5 py-1.5 rounded-full">
          Rates valid across {city}
        </span>
      </div>

      <div className="grid lg:grid-cols-[1fr_360px] gap-[clamp(28px,4vw,48px)] items-start">
        {/* LEFT: STEPS */}
        <div className="flex flex-col gap-8">
          {/* STEP 1 */}
          <div>
            <span className="text-[12.5px] font-extrabold tracking-[0.1em] uppercase text-[#6b6660] block mb-3.5">
              1. Choose your home type
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {HOME_TYPES.map((t, i) => (
                <button
                  key={t.label}
                  onClick={() => selectType(i)}
                  aria-pressed={typeIdx === i}
                  className={`relative p-4 pt-5 rounded-2xl text-left border-[2px] transition-all duration-250 ${
                    typeIdx === i
                      ? 'bg-[#faf7f1] border-[#0e5a43] shadow-[0_8px_20px_rgba(14,90,67,0.12)]'
                      : 'bg-white border-[#1b1b1b]/10 hover:border-[#1b1b1b]/30'
                  }`}
                >
                  <span
                    className={`absolute top-3 right-3 w-5 h-5 grid place-items-center rounded-full border-[2px] transition-all duration-250 ${
                      typeIdx === i ? 'bg-[#0e5a43] border-[#0e5a43]' : 'border-[#1b1b1b]/25'
                    }`}
                  >
                    {typeIdx === i && <Check className="w-3 h-3 text-white" strokeWidth={3.5} />}
                  </span>
                  <b className="font-[family-name:var(--font-bricolage)] font-bold text-[16.5px] text-[#1b1b1b] leading-snug block pr-5">
                    {t.label}
                  </b>
                  <span className="text-[11.5px] text-[#6b6660] font-semibold block mt-1">{t.sub}</span>
                </button>
              ))}
            </div>
          </div>

          {/* STEP 2 */}
          <div>
            <div className="flex items-end justify-between gap-4 mb-3.5">
              <span className="text-[12.5px] font-extrabold tracking-[0.1em] uppercase text-[#6b6660]">
                2. Total built-up area
              </span>
              <b className="font-[family-name:var(--font-bricolage)] font-bold text-[26px] sm:text-[30px] text-[#0e5a43] whitespace-nowrap tabular-nums leading-none">
                {fmt(area)} <span className="text-[14px] text-[#6b6660] font-semibold">sq.ft</span>
              </b>
            </div>
            <input
              type="range"
              min={MIN_AREA}
              max={MAX_AREA}
              step={100}
              value={area}
              onChange={(e) => setArea(parseInt(e.target.value, 10))}
              aria-label={`Built-up area in square feet: ${area}`}
              className="w-full accent-[#0e5a43] cursor-pointer"
            />
            <div className="flex justify-between mt-2 text-[11px] font-bold tracking-[0.08em] uppercase text-[#6b6660]">
              <span>{fmt(MIN_AREA)} sq.ft</span>
              <span className="hidden sm:inline">Typical family homes: 1,200 – 4,000</span>
              <span>{fmt(MAX_AREA)} sq.ft</span>
            </div>
          </div>

          {/* STEP 3 */}
          <div>
            <span className="text-[12.5px] font-extrabold tracking-[0.1em] uppercase text-[#6b6660] block mb-3.5">
              3. Choose work scope
            </span>
            <div className="flex flex-col gap-3">
              {PACKAGES.map((p, i) => (
                <button
                  key={p.name}
                  onClick={() => setPkgIdx(i)}
                  aria-pressed={pkgIdx === i}
                  className={`flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-left px-5 sm:px-6 py-4.5 rounded-2xl border-[2px] transition-all duration-250 ${
                    pkgIdx === i
                      ? 'bg-[#faf7f1] border-[#0e5a43] shadow-[0_8px_20px_rgba(14,90,67,0.12)]'
                      : 'bg-white border-[#1b1b1b]/10 hover:border-[#1b1b1b]/30'
                  }`}
                >
                  <span className="flex items-center gap-3 sm:min-w-[220px]">
                    <span
                      className={`shrink-0 grid place-items-center rounded-full border-[2px] transition-all duration-250 ${
                        pkgIdx === i ? 'bg-[#0e5a43] border-[#0e5a43]' : 'border-[#1b1b1b]/25'
                      }`}
                      style={{ width: 19, height: 19 }}
                    >
                      {pkgIdx === i && <Check className="w-2.5 h-2.5 text-white" strokeWidth={4} />}
                    </span>
                    <b className="font-[family-name:var(--font-bricolage)] font-bold text-[17px] text-[#1b1b1b] whitespace-nowrap">
                      {p.name}
                    </b>
                    {p.popular && (
                      <span className="hidden xl:inline text-[10px] font-extrabold uppercase bg-[#f2a007] text-[#1b1b1b] px-2 py-0.5 rounded-md">
                        Popular
                      </span>
                    )}
                  </span>
                  <span className="text-[12.5px] text-[#6b6660] font-medium leading-relaxed flex-1">{p.desc}</span>
                  <span className="text-[13.5px] font-bold text-[#0e5a43] whitespace-nowrap sm:text-right shrink-0">
                    ₹{fmt(p.ratePerSqft)}<span className="text-[#6b6660] font-semibold">/sq.ft</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: LIVE SUMMARY */}
        <aside className="lg:sticky lg:top-28 bg-[#0e5a43] text-white rounded-[24px] p-7 sm:p-8 shadow-[0_24px_60px_rgba(14,90,67,0.3)]">
          <span className="text-[11px] font-extrabold tracking-[0.22em] uppercase text-white/60 block mb-5">
            Your Estimate
          </span>

          <div className="space-y-3 mb-7">
            {[
              ['Home Type', type.label],
              ['Area', `${fmt(area)} sq.ft`],
              ['Scope', pkg.name],
            ].map(([label, value]) => (
              <div key={label} className="flex items-center justify-between gap-4 text-[13px] border-b border-white/15 pb-2.5">
                <span className="uppercase tracking-[0.1em] text-[10.5px] font-bold text-white/55">{label}</span>
                <b className="font-bold text-right">{value}</b>
              </div>
            ))}
          </div>

          <b className="font-[family-name:var(--font-bricolage)] font-bold text-[34px] sm:text-[38px] leading-none block tabular-nums">
            ₹{fmt(lo / 100000)}L – ₹{fmt(hi / 100000)}L
          </b>
          <p className="text-[11.5px] text-white/70 mt-2 font-semibold">
            Indicative range including materials &amp; labour*
          </p>

          <div className="flex flex-wrap gap-x-5 gap-y-2.5 mt-7 pt-6 border-t border-white/15 text-[12.5px] font-semibold">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#f2a007]" /> Handover <b className="font-bold">{pkg.time}</b>
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#f2a007]" /> <b className="font-bold">10-Year Warranty</b>
            </span>
            <span className="flex items-center gap-1.5">
              <Ruler className="w-4 h-4 text-[#f2a007]" /> Fixed <b className="font-bold">₹{fmt(pkg.ratePerSqft)}/sq.ft basis</b>
            </span>
          </div>

          <Link
            href={`${basePath}/contact`}
            className="mt-8 inline-flex items-center justify-center gap-2 w-full bg-[#f2a007] text-[#1b1b1b] font-bold text-[13.5px] py-3.5 px-6 rounded-xl hover:bg-white transition-colors text-center"
          >
            Get Detailed Floor Plan Quote <ArrowRight className="w-4 h-4" />
          </Link>

          <p className="mt-4 text-[10.5px] text-white/55 text-center font-medium leading-relaxed">
            *Final quotation based on exact on-site measurements &amp; soil report. Zero hidden charges once approved.
          </p>
        </aside>
      </div>
    </div>
  );
}
