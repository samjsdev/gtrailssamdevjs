'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Check, ArrowRight, Sparkles, Clock, ShieldCheck, Calculator } from 'lucide-react';

const CONFIGS = [
  { label: '1 BHK', area: '550 – 700 sq.ft', base: 3.8 },
  { label: '2 BHK', area: '900 – 1,200 sq.ft', base: 6.2 },
  { label: '3 BHK', area: '1,350 – 1,800 sq.ft', base: 9.4 },
  { label: '4 BHK / Villa', area: '2,200+ sq.ft', base: 14.8 },
];

const PACKAGES = [
  {
    name: 'Smart Essentials',
    factor: 1.0,
    time: '35 – 40 Days',
    desc: 'Marine Ply base, textured laminates, soft-close hardware, false ceiling with warm LEDs.',
    highlights: ['Modular Kitchen with tandem boxes', 'Wardrobes with internal drawers', 'Living room TV unit', 'Asian Paints Royale paint finish'],
  },
  {
    name: 'Premium Nordic',
    factor: 1.4,
    time: '45 – 50 Days',
    desc: 'Acrylic/anti-fingerprint finishes, Blum lift-ups, quartz kitchen counter, profile lighting.',
    highlights: ['Everything in Essentials', 'Anti-fingerprint acrylic kitchen', 'Blum soft-close & tandem units', 'Quartz countertop with under-mount sink', 'Designer master bedroom panelling'],
  },
  {
    name: 'Luxe Bespoke',
    factor: 2.0,
    time: '55 – 65 Days',
    desc: 'PU polish, natural wood veneers, fluted acoustic wall features, smart home integration.',
    highlights: ['Everything in Premium Nordic', 'Natural smoked wood veneers with PU', 'Fluted accent wall panelling', 'Custom solid wood furniture pieces', 'Dedicated site project manager'],
  },
];

export default function Estimator({ basePath, city }: { basePath: string; city: string }) {
  const [configIdx, setConfigIdx] = useState(1);
  const [packageIdx, setPackageIdx] = useState(1);

  const currentConfig = CONFIGS[configIdx];
  const currentPackage = PACKAGES[packageIdx];

  const minPrice = (currentConfig.base * currentPackage.factor).toFixed(1);
  const maxPrice = (currentConfig.base * currentPackage.factor * 1.22).toFixed(1);

  return (
    <div className="bg-white border border-[#1b1b1b]/10 rounded-[28px] p-6 sm:p-10 shadow-[0_24px_60px_rgba(27,27,27,0.06)]">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-[#1b1b1b]/10">
        <div>
          <span className="inline-flex items-center gap-2 text-[12px] font-extrabold tracking-[0.14em] uppercase text-[#0e5a43] mb-1.5">
            <Calculator className="w-4 h-4 text-[#f2a007]" /> Cost Transparency
          </span>
          <h3 className="font-[family-name:var(--font-bricolage)] font-bold text-[24px] sm:text-[28px] text-[#1b1b1b]">
            Interior Cost &amp; Timeline Estimator
          </h3>
        </div>
        <span className="text-[12px] font-bold text-[#0e5a43] bg-[#fdeecb] px-3.5 py-1.5 rounded-full">
          Tailored for {city}
        </span>
      </div>

      {/* Select layout */}
      <div className="mb-7">
        <label className="text-[12.5px] font-extrabold tracking-[0.1em] uppercase text-[#6b6660] block mb-3">
          1. Choose Your Floor Plan
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {CONFIGS.map((c, i) => (
            <button
              key={c.label}
              onClick={() => setConfigIdx(i)}
              className={`p-4 rounded-2xl text-left border-[2px] transition-all duration-250 ${
                configIdx === i
                  ? 'bg-[#faf7f1] border-[#0e5a43] shadow-[0_8px_20px_rgba(14,90,67,0.12)]'
                  : 'bg-white border-[#1b1b1b]/10 hover:border-[#1b1b1b]/30'
              }`}
            >
              <b className="font-[family-name:var(--font-bricolage)] text-[18px] text-[#1b1b1b] block">{c.label}</b>
              <span className="text-[12px] text-[#6b6660] font-semibold block mt-0.5">{c.area}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Select package tier */}
      <div className="mb-8">
        <label className="text-[12.5px] font-extrabold tracking-[0.1em] uppercase text-[#6b6660] block mb-3">
          2. Choose Material &amp; Finish Standard
        </label>
        <div className="grid sm:grid-cols-3 gap-3">
          {PACKAGES.map((pkg, i) => (
            <button
              key={pkg.name}
              onClick={() => setPackageIdx(i)}
              className={`p-4.5 rounded-2xl text-left border-[2px] transition-all duration-250 ${
                packageIdx === i
                  ? 'bg-[#faf7f1] border-[#0e5a43] shadow-[0_8px_20px_rgba(14,90,67,0.12)]'
                  : 'bg-white border-[#1b1b1b]/10 hover:border-[#1b1b1b]/30'
              }`}
            >
              <div className="flex justify-between items-center mb-1">
                <b className="font-[family-name:var(--font-bricolage)] text-[16px] text-[#1b1b1b]">{pkg.name}</b>
                {i === 1 && (
                  <span className="text-[10px] font-extrabold uppercase bg-[#f2a007] text-[#1b1b1b] px-2 py-0.5 rounded-md">
                    Popular
                  </span>
                )}
              </div>
              <p className="text-[12px] text-[#6b6660] font-medium line-clamp-2 leading-relaxed">{pkg.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Result Card */}
      <div className="bg-[#faf7f1] border border-[#0e5a43]/20 rounded-2xl p-6 sm:p-8 grid lg:grid-cols-[1.2fr_0.8fr] gap-8 items-center">
        <div>
          <span className="text-[12px] font-extrabold tracking-wider uppercase text-[#0e5a43] block mb-1">
            Estimated Budget Range
          </span>
          <div className="font-[family-name:var(--font-bricolage)] font-bold text-[34px] sm:text-[42px] text-[#0e5a43] leading-none mb-3">
            ₹{minPrice} – ₹{maxPrice} <span className="text-[18px] text-[#1b1b1b] font-medium">Lakhs*</span>
          </div>
          <p className="text-[13.5px] text-[#6b6660] font-medium leading-relaxed mb-4">
            Includes 100% moisture-proof plywood, precision factory joinery, complete on-site installation, and final deep clean.
          </p>
          <div className="flex flex-wrap gap-5 text-[12.5px] font-bold text-[#1b1b1b]">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#f2a007]" /> Handover in <b>{currentPackage.time}</b>
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#0e5a43]" /> <b>10-Year Warranty</b>
            </span>
          </div>
        </div>

        <div className="lg:border-l lg:border-[#1b1b1b]/10 lg:pl-8 flex flex-col gap-3">
          <b className="text-[12px] uppercase tracking-wider text-[#1b1b1b] font-bold">Package Highlights:</b>
          <ul className="grid gap-2 mb-4">
            {currentPackage.highlights.slice(0, 4).map((h) => (
              <li key={h} className="flex items-start gap-2.5 text-[13px] text-[#1b1b1b] font-semibold">
                <Check className="w-4 h-4 text-[#0e5a43] shrink-0 mt-0.5" strokeWidth={2.4} />
                <span>{h}</span>
              </li>
            ))}
          </ul>
          <Link
            href={`${basePath}/contact`}
            className="inline-flex items-center justify-center gap-2 bg-[#0e5a43] text-white font-bold text-[13.5px] py-3.5 px-6 rounded-xl hover:bg-[#0a4232] transition-colors text-center"
          >
            Get Detailed Floor Plan Quote <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
      <p className="text-[11.5px] text-[#6b6660] text-center mt-4 font-medium">
        * Final quotation is based on exact on-site measurements and custom hardware choices. Zero hidden charges once approved.
      </p>
    </div>
  );
}
