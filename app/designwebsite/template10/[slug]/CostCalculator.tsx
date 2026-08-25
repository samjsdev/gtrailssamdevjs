'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Calculator, Check, ArrowRight, ShieldCheck, Building2, Sparkles, Sliders } from 'lucide-react';

interface CostCalculatorProps {
  basePath: string;
}

const PACKAGES = [
  {
    id: 'standard',
    name: 'STANDARD CIVIL & DESIGN',
    rate: 2150,
    tag: 'ESSENTIAL HOMES',
    popular: false,
    specs: [
      'Architectural 2D Plan & 3D Front Elevation',
      'Fe500 Grade TMT Steel (Tata / JSW)',
      'UltraTech / Ramco 53-Grade Cement',
      'First-Quality Wire-Cut Red Bricks',
      'Somany / Kajaria 2x2 Vitrified Tiles',
      'Parryware / Hindware Sanitary Fittings',
    ],
  },
  {
    id: 'premium',
    name: 'PREMIUM ARCHITECTURAL',
    rate: 2750,
    tag: 'MOST POPULAR TIER',
    popular: true,
    specs: [
      'Comprehensive 3D BIM & Vastu Architectural Blueprint',
      'Fe550D Seismic Corrosion-Resistant TMT Steel',
      '4x2 Large Format Glazed Vitrified Tiles',
      'Jaquar / Kohler Concealed Diverters & CP Fittings',
      'German Profile Soundproof UPVC Windows',
      'Custom Modular Kitchen Baseline Provision',
      'Complete 400-Point Civil Quality Audit',
    ],
  },
  {
    id: 'luxury',
    name: 'ULTRA LUXURY TURNKEY',
    rate: 3500,
    tag: 'VILLA SPECIAL',
    popular: false,
    specs: [
      'Full Cinematic 3D Walkthrough & Interior Rendering',
      'Imported Italian Marble in Living & Dining Spaces',
      'Grohe / Toto Sensor Bath Fixtures',
      'First-Grade Burma Teakwood Doors & Heavy Frames',
      'Complete Luxury Modular Kitchen & Wardrobe Joinery',
      'VRV Air Conditioning & Smart Home Automation Wiring',
      'Dedicated Senior Project Manager & Daily Video Audits',
    ],
  },
];

export default function CostCalculator({ basePath }: CostCalculatorProps) {
  const [selectedPkg, setSelectedPkg] = useState(PACKAGES[1]);
  const [builtUpArea, setBuiltUpArea] = useState<number>(2400);
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
    <div className="w-full bg-[#181B1A] border-4 border-[#252A29] p-6 sm:p-10 shadow-[8px_8px_0px_#111111]">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-[#252A29] pb-6 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#E94B26] text-[#F4F3EE] text-xs font-black uppercase tracking-widest mb-2 border border-[#111111]">
            <Calculator className="w-3.5 h-3.5" />
            <span>REAL-TIME ESTIMATOR</span>
          </div>
          <h3 className="text-2xl sm:text-4xl font-black uppercase text-[#F4F3EE] tracking-tight">
            RESIDENTIAL CONSTRUCTION & DESIGN COST CALCULATOR
          </h3>
          <p className="text-xs sm:text-sm text-[#F4F3EE]/70 font-mono mt-1">
            ESTIMATE YOUR TURNKEY ARCHITECTURAL & RESIDENTIAL CONSTRUCTION BUDGET TRANSPARENTLY
          </p>
        </div>
        <div className="text-right">
          <span className="text-[11px] font-mono text-[#C8A84E] uppercase tracking-widest block">
            ESTIMATION STANDARD: 2026
          </span>
          <span className="text-xs font-bold text-[#F4F3EE] bg-[#252A29] px-2.5 py-1 inline-block mt-1">
            ZERO COST ESCALATION
          </span>
        </div>
      </div>

      {/* Package Selection Tabs */}
      <div className="mb-8">
        <label className="block text-xs font-black uppercase tracking-widest text-[#C8A84E] mb-3">
          STEP 1: SELECT CONSTRUCTION PACKAGE TIER
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PACKAGES.map((pkg) => {
            const isSelected = selectedPkg.id === pkg.id;
            return (
              <button
                key={pkg.id}
                type="button"
                onClick={() => setSelectedPkg(pkg)}
                className={`text-left p-5 transition-all relative border-2 ${
                  isSelected
                    ? 'bg-[#252A29] border-[#E94B26] shadow-[4px_4px_0px_#E94B26]'
                    : 'bg-[#111111] border-[#252A29] hover:border-[#C8A84E]/60'
                }`}
              >
                {pkg.popular && (
                  <span className="absolute top-0 right-0 bg-[#E94B26] text-[#F4F3EE] text-[9px] font-black uppercase px-2 py-0.5 tracking-widest">
                    {pkg.tag}
                  </span>
                )}
                {!pkg.popular && (
                  <span className="absolute top-0 right-0 bg-[#252A29] text-[#C8A84E] text-[9px] font-bold uppercase px-2 py-0.5 tracking-widest border-l border-b border-[#181B1A]">
                    {pkg.tag}
                  </span>
                )}

                <div className="text-xs font-black text-[#F4F3EE] uppercase tracking-wider mb-1 mt-1">
                  {pkg.name}
                </div>
                <div className="text-2xl font-black text-[#E94B26] tracking-tight">
                  ₹{pkg.rate.toLocaleString()}{' '}
                  <span className="text-xs font-normal text-[#F4F3EE]/60">/ sq.ft</span>
                </div>
                <ul className="mt-4 space-y-1.5 border-t border-[#252A29] pt-3 text-[11px] text-[#F4F3EE]/80">
                  {pkg.specs.slice(0, 3).map((spec, i) => (
                    <li key={i} className="flex items-start gap-1.5">
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

      {/* Built-up Area & Floors Slider */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 bg-[#111111] p-6 border-2 border-[#252A29]">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-black uppercase tracking-widest text-[#C8A84E] flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5" />
              TOTAL BUILT-UP AREA (SQ.FT)
            </label>
            <span className="text-xl font-black text-[#F4F3EE] bg-[#252A29] px-3 py-1 border border-[#C8A84E]/40 font-mono">
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
            className="w-full h-3 bg-[#252A29] rounded-none appearance-none cursor-pointer accent-[#E94B26] mt-4"
          />
          <div className="flex justify-between text-[10px] font-mono text-[#F4F3EE]/50 mt-2">
            <span>1,000 sq.ft</span>
            <span>3,000 sq.ft</span>
            <span>5,000 sq.ft</span>
            <span>8,000 sq.ft</span>
          </div>
        </div>

        <div>
          <label className="text-xs font-black uppercase tracking-widest text-[#C8A84E] block mb-3">
            ESTIMATED ELEVATION STRUCTURE
          </label>
          <div className="grid grid-cols-3 gap-3">
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
                    ? 'bg-[#E94B26] text-[#F4F3EE] border-[#E94B26] shadow-[2px_2px_0px_#111111]'
                    : 'bg-[#252A29] text-[#F4F3EE]/70 border-[#252A29] hover:text-[#F4F3EE]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <p className="text-[11px] text-[#F4F3EE]/60 mt-3 font-mono">
            Includes complete foundation footing, RCC structural framing, and external facade masonry.
          </p>
        </div>
      </div>

      {/* Output Budget Breakdown */}
      <div className="bg-[#252A29] p-6 sm:p-8 border-2 border-[#C8A84E] relative">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          {/* Main Total Result */}
          <div className="lg:col-span-1 border-b lg:border-b-0 lg:border-r border-[#181B1A] pb-6 lg:pb-0 lg:pr-6">
            <span className="text-[11px] font-mono text-[#C8A84E] uppercase tracking-widest block mb-1">
              ESTIMATED PROJECT BUDGET
            </span>
            <div className="text-4xl sm:text-5xl font-black text-[#F4F3EE] tracking-tight">
              {formatLakhs(estimatedCost)}
            </div>
            <div className="text-xs font-mono text-[#F4F3EE]/70 mt-1">
              Exact Approx: ₹{estimatedCost.toLocaleString()} (Excl. Govt Permits & Taxes)
            </div>
          </div>

          {/* Breakdown Items */}
          <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
            <div className="bg-[#181B1A] p-3 border border-[#111111]">
              <span className="text-[10px] font-mono text-[#F4F3EE]/60 uppercase block">
                CIVIL STRUCTURE (52%)
              </span>
              <span className="text-base sm:text-lg font-bold text-[#E94B26]">
                {formatLakhs(civilCost)}
              </span>
            </div>
            <div className="bg-[#181B1A] p-3 border border-[#111111]">
              <span className="text-[10px] font-mono text-[#F4F3EE]/60 uppercase block">
                FINISHING & MEP (26%)
              </span>
              <span className="text-base sm:text-lg font-bold text-[#F4F3EE]">
                {formatLakhs(finishingCost)}
              </span>
            </div>
            <div className="bg-[#181B1A] p-3 border border-[#111111]">
              <span className="text-[10px] font-mono text-[#F4F3EE]/60 uppercase block">
                INTERIORS (16%)
              </span>
              <span className="text-base sm:text-lg font-bold text-[#C8A84E]">
                {formatLakhs(interiorCost)}
              </span>
            </div>
            <div className="bg-[#181B1A] p-3 border border-[#111111]">
              <span className="text-[10px] font-mono text-[#F4F3EE]/60 uppercase block">
                ARCHITECTURAL (6%)
              </span>
              <span className="text-base sm:text-lg font-bold text-[#F4F3EE]">
                {formatLakhs(designCost)}
              </span>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-6 pt-6 border-t border-[#181B1A] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-[#F4F3EE]/80">
            <ShieldCheck className="w-4 h-4 text-[#C8A84E]" />
            <span>Includes 10-Year Structural Warranty & 400-Point Milestone Audits</span>
          </div>

          <Link
            href={`${basePath}/contact?area=${builtUpArea}&package=${selectedPkg.id}`}
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#E94B26] text-[#F4F3EE] font-black text-xs uppercase tracking-widest border border-[#111111] shadow-[4px_4px_0px_#111111] hover:shadow-[1px_1px_0px_#111111] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
          >
            <span>GET DETAILED ITEMISED BOQ & SITE VISIT</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
