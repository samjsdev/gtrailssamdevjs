'use client';

import { useState, useId } from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Clock, Check } from 'lucide-react';

interface ProjectType {
  id: string;
  name: string;
  sub: string;
  baseCost: number; // cost multiplier or base
}

const PROJECT_TYPES: ProjectType[] = [
  { id: 'villa', name: 'Luxury Villa', sub: 'Coastal & ECR plots', baseCost: 1.15 },
  { id: 'residential', name: 'Residential House', sub: 'G+1 / G+2 city homes', baseCost: 1.0 },
  { id: 'commercial', name: 'Commercial Building', sub: 'Offices, clinics & retail', baseCost: 1.1 },
  { id: 'courtyard', name: 'Courtyard Residence', sub: 'Traditional Vaastu layout', baseCost: 1.12 },
];

const SCOPES = [
  {
    id: 'design',
    name: 'Design & Approvals',
    rate: 85,
    unit: '₹85/sq.ft',
    desc: '3D elevation, Vaastu floor plans, CMDA/GCC sanction drawings & liaison.',
    timeline: '45 – 60 Days',
  },
  {
    id: 'structural',
    name: 'Structural Shell',
    rate: 1450,
    unit: '₹1,450/sq.ft',
    desc: 'Soil-matched foundations, Tata Tiscon Fe550D rebar, Grade-53 monolithic frame.',
    timeline: '6 – 8 Months',
  },
  {
    id: 'turnkey',
    name: 'Complete Turnkey',
    rate: 2350,
    unit: '₹2,350/sq.ft',
    desc: 'Turnkey architectural delivery: structure, MEP, joinery, and 10-year warranty.',
    timeline: '10 – 14 Months',
    popular: true,
  },
];

const PRESETS = [1600, 2400, 3200, 4800];

export default function Estimator({
  basePath,
  city = 'Chennai',
}: {
  basePath: string;
  city?: string;
}) {
  const [selectedType, setSelectedType] = useState<string>('villa');
  const [area, setArea] = useState<number>(3200);
  const [selectedScope, setSelectedScope] = useState<string>('turnkey');
  const areaInputId = useId();

  const currentType = PROJECT_TYPES.find((t) => t.id === selectedType) || PROJECT_TYPES[0];
  const currentScope = SCOPES.find((s) => s.id === selectedScope) || SCOPES[2];

  const totalMid = area * currentScope.rate * currentType.baseCost;
  const minEstimate = Math.round((totalMid * 0.93) / 100000);
  const maxEstimate = Math.round((totalMid * 1.07) / 100000);

  const formatLakhs = (val: number) => {
    if (val >= 100) {
      return (
        <>
          <span className="font-sans font-normal">₹</span>
          <span className="[font-variant-numeric:lining-nums]">{(val / 100).toFixed(2)}</span> Cr
        </>
      );
    }
    return (
      <>
        <span className="font-sans font-normal">₹</span>
        <span className="[font-variant-numeric:lining-nums]">{val}</span> Lakhs
      </>
    );
  };

  return (
    <div className="bg-[#17130f] text-white border border-[#b08d4f]/30 p-8 sm:p-12 lg:p-14">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-6 pb-8 border-b border-white/10 mb-10">
        <div>
          <span className="inline-flex items-center gap-3 text-[11px] font-semibold tracking-[0.28em] uppercase text-[#d9c49a] mb-2 before:content-[''] before:w-6 before:h-px before:bg-[#d9c49a]">
            Preliminary Budget Planner
          </span>
          <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(28px,3.6vw,46px)] font-light leading-tight">
            Estimate Your Construction Investment
          </h2>
        </div>
        <p className="text-[13.5px] text-white/60 font-light max-w-sm">
          Indicative turnkey &amp; architectural ranges based on active {city} building parameters.
        </p>
      </div>

      <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 items-start">
        {/* Controls */}
        <div className="space-y-9">
          {/* 01. Typology */}
          <div>
            <div className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] uppercase text-[#d9c49a] mb-3">
              <span>01</span>
              <span>Select Project Typology</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {PROJECT_TYPES.map((t) => {
                const active = t.id === selectedType;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setSelectedType(t.id)}
                    className={`text-left p-3.5 sm:p-4 border transition-all duration-200 ${
                      active
                        ? 'bg-[#221c16] border-[#d9c49a] shadow-[0_10px_25px_rgba(0,0,0,0.3)]'
                        : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className={`text-[13.5px] font-medium leading-snug ${active ? 'text-white' : 'text-white/85'}`}>
                      {t.name}
                    </div>
                    <div className="text-[11px] text-white/50 font-light mt-1">{t.sub}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 02. Area */}
          <div>
            <div className="flex items-center justify-between gap-4 mb-3">
              <div className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] uppercase text-[#d9c49a]">
                <span>02</span>
                <label htmlFor={areaInputId} className="cursor-pointer">
                  Total Built-Up Area
                </label>
              </div>
              <span className="font-[family-name:var(--font-cormorant)] text-[26px] font-semibold text-[#d9c49a]">
                {area.toLocaleString('en-IN')} <span className="text-[13px] font-light text-white/60">sq.ft</span>
              </span>
            </div>

            <input
              id={areaInputId}
              type="range"
              min={600}
              max={10000}
              step={100}
              value={area}
              onChange={(e) => setArea(Number(e.target.value))}
              className="w-full h-1.5 bg-white/15 rounded-lg appearance-none cursor-pointer accent-[#d9c49a]"
            />

            <div className="flex flex-wrap items-center justify-between gap-2 mt-3 text-[11.5px] text-white/50 font-light">
              <div className="flex gap-2">
                {PRESETS.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setArea(p)}
                    className={`px-2.5 py-1 text-[11px] border transition-all ${
                      area === p
                        ? 'border-[#d9c49a] text-[#d9c49a] bg-white/[0.05]'
                        : 'border-white/10 text-white/60 hover:text-white'
                    }`}
                  >
                    {p.toLocaleString('en-IN')} sf
                  </button>
                ))}
              </div>
              <span>600 – 10,000 sq.ft range</span>
            </div>
          </div>

          {/* 03. Scope */}
          <div>
            <div className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] uppercase text-[#d9c49a] mb-3">
              <span>03</span>
              <span>Engagement Scope</span>
            </div>
            <div className="grid sm:grid-cols-3 gap-3">
              {SCOPES.map((s) => {
                const active = s.id === selectedScope;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSelectedScope(s.id)}
                    className={`text-left p-4 border relative transition-all duration-200 ${
                      active
                        ? 'bg-[#221c16] border-[#d9c49a] shadow-[0_10px_25px_rgba(0,0,0,0.3)]'
                        : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                    }`}
                  >
                    {s.popular && (
                      <span className="absolute -top-2.5 right-3 bg-[#a4532f] text-white text-[9px] font-semibold tracking-wider uppercase px-2 py-0.5">
                        Popular
                      </span>
                    )}
                    <div className={`text-[13.5px] font-medium leading-snug ${active ? 'text-white' : 'text-white/85'}`}>
                      {s.name}
                    </div>
                    <div className="text-[12.5px] font-semibold text-[#d9c49a] mt-1">
                      <span className="font-sans font-normal">₹</span>
                      <span className="[font-variant-numeric:lining-nums]">{s.rate.toLocaleString('en-IN')}</span>/sq.ft
                    </div>
                    <div className="text-[11px] text-white/50 font-light mt-2 leading-relaxed line-clamp-2">
                      {s.desc}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Summary Card */}
        <div className="bg-[#221c16] border border-[#b08d4f]/35 p-7 sm:p-9 flex flex-col justify-between">
          <div>
            <div className="text-[10.5px] font-semibold tracking-[0.26em] uppercase text-[#d9c49a] mb-3">
              Investment Estimate
            </div>
            <div className="font-[family-name:var(--font-cormorant)] text-[clamp(34px,4vw,50px)] font-light text-white leading-none mb-1">
              {formatLakhs(minEstimate)} – {formatLakhs(maxEstimate)}
            </div>
            <p className="text-[12px] text-white/50 font-light mb-7">
              Indicative range including architectural coordination &amp; civil execution.
            </p>

            <div className="space-y-3 py-5 border-y border-white/10 text-[13px] font-light">
              <div className="flex justify-between">
                <span className="text-white/60">Typology</span>
                <span className="font-medium text-white">{currentType.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Area</span>
                <span className="font-medium text-white">{area.toLocaleString('en-IN')} sq.ft</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Scope</span>
                <span className="font-medium text-white">{currentScope.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Expected Timeline</span>
                <span className="font-medium text-[#d9c49a]">{currentScope.timeline}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Warranty</span>
                <span className="font-medium text-white">10-Year Structural RCC</span>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <Link
              href={`${basePath}/contact`}
              className="w-full inline-flex items-center justify-center gap-2.5 bg-[#a4532f] text-white text-[11px] font-semibold tracking-[0.2em] uppercase py-4 px-6 hover:bg-[#884121] transition-all"
            >
              Get Exact Floor-Plan Quote <ArrowRight className="w-4 h-4" />
            </Link>
            <p className="text-center text-[11px] text-white/40 font-light mt-3">
              Fixed line-item BOQ contract with zero cost escalations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
