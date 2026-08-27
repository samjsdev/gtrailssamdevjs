'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Calculator, Check, ArrowRight, ShieldCheck, Building, Sparkles, Sliders, CheckCircle2, Layers } from 'lucide-react';

interface CostCalculatorProps {
  basePath: string;
}

const PACKAGES = [
  {
    id: 'standard',
    name: 'STANDARD CIVIL & ARCHITECTURE',
    rate: 2150,
    tag: 'ESSENTIAL HOMES',
    popular: false,
    color: '#252A29',
    specs: [
      'Architectural 2D Working Plan & 3D Facade Elevation',
      'Fe500 Grade TMT Steel (Tata Tiscon / JSW Neosteel)',
      'UltraTech / Ramco 53-Grade High-Strength Cement',
      'First-Quality Wire-Cut Red Clay Bricks & River Sand',
      'Kajaria / Somany 2x2 Double Charged Vitrified Tiles',
      'Parryware / Hindware Sanitary & CP Fixtures',
    ],
  },
  {
    id: 'premium',
    name: 'PREMIUM ARCHITECTURAL TURNKEY',
    rate: 2750,
    tag: 'MOST POPULAR TIER',
    popular: true,
    color: '#E94B26',
    specs: [
      'Complete 3D BIM Architectural Blueprint & Vastu Coordination',
      'Fe550D Seismic & Corrosion-Resistant Structural TMT Steel',
      'M20 Grade Ready-Mix Concrete with 28-Day Strength Lab Reports',
      '4x2 Large Format Glazed Vitrified Tiles (GVT/PGVT)',
      'Jaquar / Kohler Concealed Diverters & Designer Fixtures',
      'German Profile Soundproof UPVC Windows with Mesh',
      'Custom Modular Kitchen Baseline Provision & 400-Point Audit',
    ],
  },
  {
    id: 'luxury',
    name: 'ULTRA LUXURY VILLA BESPOKE',
    rate: 3500,
    tag: 'SIGNATURE VILLA',
    popular: false,
    color: '#C8A84E',
    specs: [
      'Cinematic 3D Video Walkthroughs & Photoreal Interior Renderings',
      'Imported Bookmatched Italian Marble in Living, Foyer & Dining',
      'Grohe / Toto Sensor-Activated Luxury Bathrooms & Rain Showers',
      'Solid First-Grade Burma Teakwood Doors & Custom Heavy Frames',
      'Full-Scale Luxury Modular Kitchen with Blum Motorized Hardware',
      'Concealed VRV Air-Conditioning & Smart Automation Conduits',
      'Dedicated Senior Project Manager with Daily High-Res Video Logs',
    ],
  },
];

export default function CostCalculator({ basePath }: CostCalculatorProps) {
  const [selectedPkg, setSelectedPkg] = useState(PACKAGES[1]);
  const [builtUpArea, setBuiltUpArea] = useState<number>(2500);
  const [floors, setFloors] = useState<number>(2);

  const totalSqFt = builtUpArea;
  const estimatedCost = totalSqFt * selectedPkg.rate;

  const civilCost = Math.round(estimatedCost * 0.52);
  const finishingCost = Math.round(estimatedCost * 0.26);
  const interiorCost = Math.round(estimatedCost * 0.16);
  const designCost = Math.round(estimatedCost * 0.06);

  const formatLakhs = (val: number) => {
    if (val >= 10000000) {
      return `₹${(val / 10000000).toFixed(2)} Cr`;
    }
    return `₹${(val / 100000).toFixed(2)} Lakhs`;
  };

  return (
    <div className="w-full bg-[#252A29] border-4 border-[#111111] p-6 sm:p-10 shadow-[10px_10px_0px_#111111] text-[#F4F3EE] relative overflow-hidden">
      {/* Decorative Blueprint Corner Mark */}
      <div className="absolute top-0 right-0 w-24 h-24 border-b-2 border-l-2 border-[#C8A84E]/30 pointer-events-none" />

      {/* Header Band */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-[#111111] pb-6 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#E94B26] text-[#F4F3EE] text-xs font-black uppercase tracking-[0.2em] mb-2.5 border border-[#111111] shadow-[2px_2px_0px_#111111]">
            <Calculator className="w-3.5 h-3.5" />
            <span>INTERACTIVE ESTIMATION ENGINE</span>
          </div>
          <h3 className="text-2xl sm:text-4xl font-black uppercase text-[#F4F3EE] tracking-tight">
            RESIDENTIAL CONSTRUCTION & DESIGN COST CALCULATOR
          </h3>
          <p className="text-xs sm:text-sm text-[#C8A84E] font-mono mt-1 tracking-wider uppercase">
            CALCULATE YOUR ESTIMATED TURNKEY BUDGET BASED ON BUILT-UP AREA & ARCHITECTURAL PACKAGE TIER
          </p>
        </div>

        <div className="text-right bg-[#1A1E1D] p-3 border border-[#C8A84E]/40">
          <span className="text-[10px] font-mono text-[#C8A84E] uppercase tracking-widest block font-bold">
            SCHEDULE: 2026 FIXED-RATES
          </span>
          <span className="text-xs font-black text-[#F4F3EE] uppercase tracking-wide">
            ZERO COST ESCALATION
          </span>
        </div>
      </div>

      {/* STEP 1: Package Selection */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <label className="text-xs font-black uppercase tracking-[0.2em] text-[#C8A84E]">
            STEP 1: SELECT CONSTRUCTION & DESIGN TIER
          </label>
          <span className="text-[11px] font-mono text-[#F4F3EE]/60">INCLUDES 10-YEAR STRUCTURAL WARRANTY</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {PACKAGES.map((pkg) => {
            const isSelected = selectedPkg.id === pkg.id;
            return (
              <button
                key={pkg.id}
                type="button"
                onClick={() => setSelectedPkg(pkg)}
                className={`text-left p-6 transition-all relative border-2 flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#1A1E1D] border-[#E94B26] shadow-[6px_6px_0px_#E94B26]'
                    : 'bg-[#1A1E1D]/80 border-[#111111] hover:border-[#C8A84E]/70 hover:bg-[#1A1E1D]'
                }`}
              >
                {pkg.popular && (
                  <span className="absolute top-0 right-0 bg-[#E94B26] text-[#F4F3EE] text-[9px] font-black uppercase px-2.5 py-1 tracking-widest border-l border-b border-[#111111]">
                    {pkg.tag}
                  </span>
                )}
                {!pkg.popular && (
                  <span className="absolute top-0 right-0 bg-[#252A29] text-[#C8A84E] text-[9px] font-bold uppercase px-2.5 py-1 tracking-widest border-l border-b border-[#111111]">
                    {pkg.tag}
                  </span>
                )}

                <div>
                  <div className="text-xs font-black text-[#F4F3EE] uppercase tracking-wider mb-2 mt-2">
                    {pkg.name}
                  </div>
                  <div className="text-3xl font-black text-[#E94B26] tracking-tight">
                    ₹{pkg.rate.toLocaleString()}{' '}
                    <span className="text-xs font-normal text-[#F4F3EE]/70 font-mono">/ sq.ft Built-Up</span>
                  </div>
                </div>

                <ul className="mt-5 space-y-2 border-t border-[#252A29] pt-4 text-[11px] font-sans text-[#F4F3EE]/85">
                  {pkg.specs.slice(0, 4).map((spec, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#C8A84E] shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{spec}</span>
                    </li>
                  ))}
                </ul>
              </button>
            );
          })}
        </div>
      </div>

      {/* STEP 2: Built-Up Area & Floors */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8 bg-[#1A1E1D] p-6 sm:p-8 border-2 border-[#111111]">
        <div className="lg:col-span-7">
          <div className="flex items-center justify-between mb-3">
            <label className="text-xs font-black uppercase tracking-[0.2em] text-[#C8A84E] flex items-center gap-2">
              <Sliders className="w-4 h-4 text-[#E94B26]" />
              STEP 2: TOTAL BUILT-UP AREA (SQ.FT)
            </label>
            <span className="text-2xl font-black text-[#F4F3EE] bg-[#252A29] px-4 py-1.5 border border-[#C8A84E]/50 font-mono shadow-[2px_2px_0px_#111111]">
              {builtUpArea.toLocaleString()} sq.ft
            </span>
          </div>

          <input
            type="range"
            min={1000}
            max={8000}
            step={100}
            value={builtUpArea}
            onChange={(e) => setBuiltUpArea(Number(e.target.value))}
            className="w-full h-3.5 bg-[#252A29] rounded-none appearance-none cursor-pointer accent-[#E94B26] mt-4 border border-[#111111]"
          />
          <div className="flex justify-between text-[11px] font-mono text-[#F4F3EE]/60 mt-2 font-bold">
            <span>1,000 sq.ft</span>
            <span>2,500 sq.ft</span>
            <span>5,000 sq.ft</span>
            <span>8,000 sq.ft</span>
          </div>
        </div>

        <div className="lg:col-span-5">
          <label className="text-xs font-black uppercase tracking-[0.2em] text-[#C8A84E] block mb-3">
            STRUCTURE ELEVATION
          </label>
          <div className="grid grid-cols-3 gap-2.5">
            {[
              { label: 'G + 1 FLOOR', num: 2 },
              { label: 'G + 2 FLOORS', num: 3 },
              { label: 'G + 3 FLOORS', num: 4 },
            ].map((item) => (
              <button
                key={item.num}
                type="button"
                onClick={() => setFloors(item.num)}
                className={`py-3 text-center text-xs font-black uppercase tracking-wider transition-all border ${
                  floors === item.num
                    ? 'bg-[#E94B26] text-[#F4F3EE] border-[#E94B26] shadow-[3px_3px_0px_#111111]'
                    : 'bg-[#252A29] text-[#F4F3EE]/75 border-[#111111] hover:text-[#F4F3EE] hover:border-[#C8A84E]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <p className="text-[11px] text-[#F4F3EE]/60 mt-3 font-mono">
            Includes deep excavation, anti-termite plinth beams, column framing, and perimeter boundary.
          </p>
        </div>
      </div>

      {/* Output Total & Breakdown Card */}
      <div className="bg-[#1A1E1D] p-6 sm:p-8 border-2 border-[#C8A84E] relative shadow-[6px_6px_0px_#111111]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Total Number */}
          <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-[#252A29] pb-6 lg:pb-0 lg:pr-6">
            <span className="text-xs font-mono text-[#C8A84E] uppercase tracking-widest block font-bold mb-1">
              TOTAL ESTIMATED PROJECT BUDGET
            </span>
            <div className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#F4F3EE] tracking-tight">
              {formatLakhs(estimatedCost)}
            </div>
            <div className="text-xs font-mono text-[#F4F3EE]/70 mt-2">
              Exact Approx: ₹{estimatedCost.toLocaleString()} (Turnkey Civil + Finishes + Architecture)
            </div>
          </div>

          {/* Itemized Deliverables */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            <div className="bg-[#252A29] p-3.5 border border-[#111111]">
              <span className="text-[10px] font-mono text-[#C8A84E] uppercase tracking-wider block font-bold">
                CIVIL STRUCTURE (52%)
              </span>
              <span className="text-lg font-black text-[#E94B26] block mt-1">
                {formatLakhs(civilCost)}
              </span>
              <span className="text-[10px] text-[#F4F3EE]/50 font-mono">Steel, RCC, Bricks</span>
            </div>

            <div className="bg-[#252A29] p-3.5 border border-[#111111]">
              <span className="text-[10px] font-mono text-[#C8A84E] uppercase tracking-wider block font-bold">
                FINISHING & MEP (26%)
              </span>
              <span className="text-lg font-black text-[#F4F3EE] block mt-1">
                {formatLakhs(finishingCost)}
              </span>
              <span className="text-[10px] text-[#F4F3EE]/50 font-mono">Plumbing, Tiles, Paint</span>
            </div>

            <div className="bg-[#252A29] p-3.5 border border-[#111111]">
              <span className="text-[10px] font-mono text-[#C8A84E] uppercase tracking-wider block font-bold">
                INTERIORS (16%)
              </span>
              <span className="text-lg font-black text-[#C8A84E] block mt-1">
                {formatLakhs(interiorCost)}
              </span>
              <span className="text-[10px] text-[#F4F3EE]/50 font-mono">Kitchen & Wardrobes</span>
            </div>

            <div className="bg-[#252A29] p-3.5 border border-[#111111]">
              <span className="text-[10px] font-mono text-[#C8A84E] uppercase tracking-wider block font-bold">
                ARCHITECTURAL (6%)
              </span>
              <span className="text-lg font-black text-[#F4F3EE] block mt-1">
                {formatLakhs(designCost)}
              </span>
              <span className="text-[10px] text-[#F4F3EE]/50 font-mono">3D BIM & Approvals</span>
            </div>
          </div>
        </div>

        {/* CTA Strip */}
        <div className="mt-8 pt-6 border-t border-[#252A29] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-mono text-[#F4F3EE]/80">
            <ShieldCheck className="w-4 h-4 text-[#C8A84E]" />
            <span>Includes Milestone-Based Payments & 100% On-Time Completion Guarantee</span>
          </div>

          <Link
            href={`${basePath}/contact?area=${builtUpArea}&package=${selectedPkg.id}`}
            className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#E94B26] text-[#F4F3EE] font-black text-xs uppercase tracking-widest border border-[#111111] shadow-[4px_4px_0px_#111111] hover:shadow-[1px_1px_0px_#111111] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
          >
            <span>GET DETAILED ITEMISED BOQ & SITE AUDIT</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
