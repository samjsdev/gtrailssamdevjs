'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

type ProjectType = {
  id: string;
  name: string;
  sub: string;
  defaultArea: number;
  factor: number;
};

type ScopeTier = {
  id: string;
  name: string;
  desc: string;
  rate: number;
  timeline: string;
  badge?: string;
};

const PROJECT_TYPES: ProjectType[] = [
  { id: 'villa', name: 'Luxury Villa', sub: 'Coastal & ECR plots', defaultArea: 3200, factor: 1.0 },
  { id: 'residential', name: 'Residential House', sub: 'G+1 / G+2 city homes', defaultArea: 2400, factor: 0.95 },
  { id: 'commercial', name: 'Commercial Building', sub: 'Offices, clinics & retail', defaultArea: 4500, factor: 1.15 },
  { id: 'courtyard', name: 'Courtyard Residence', sub: 'Traditional Vaastu layout', defaultArea: 2800, factor: 1.05 },
];

const SCOPE_TIERS: ScopeTier[] = [
  {
    id: 'design',
    name: 'Design & Approvals',
    desc: '3D elevations, Vaastu floor plans, structural designs & CMDA sanctions',
    rate: 85,
    timeline: '45 – 60 Days',
  },
  {
    id: 'structural',
    name: 'Structural Construction',
    desc: 'Foundation to RCC frame: Tata Tiscon Fe550D steel & Grade-53 cement',
    rate: 1450,
    timeline: '6 – 8 Months',
    badge: 'Popular',
  },
  {
    id: 'turnkey',
    name: 'Complete Turnkey',
    desc: 'End-to-end: civil structure, electrical, plumbing, flooring & key handover',
    rate: 2350,
    timeline: '10 – 14 Months',
  },
];

const AREA_PRESETS = [1600, 2400, 3200, 4800];
const MIN_AREA = 800;
const MAX_AREA = 10000;

const fmt = (n: number) => new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(Math.round(n));

export default function ScopeEstimator({ basePath, city }: { basePath: string; city: string }) {
  const [selectedType, setSelectedType] = useState<ProjectType>(PROJECT_TYPES[0]);
  const [selectedScope, setSelectedScope] = useState<ScopeTier>(SCOPE_TIERS[2]);
  const [area, setArea] = useState<number>(PROJECT_TYPES[0].defaultArea);

  const { loLakhs, hiLakhs } = useMemo(() => {
    const base = area * selectedScope.rate * selectedType.factor;
    const lo = (base * 0.92) / 100000;
    const hi = (base * 1.12) / 100000;
    return {
      loLakhs: lo >= 100 ? `₹${(lo / 100).toFixed(2)} Cr` : `₹${fmt(lo)}L`,
      hiLakhs: hi >= 100 ? `₹${(hi / 100).toFixed(2)} Cr` : `₹${fmt(hi)}L`,
    };
  }, [area, selectedScope, selectedType]);

  const handleTypeChange = (t: ProjectType) => {
    setSelectedType(t);
    setArea(t.defaultArea);
  };

  return (
    <div className="text-white">
      {/* SECTION HEADER */}
      <div className="flex flex-wrap items-end justify-between gap-6 mb-10 pb-7 border-b border-white/10">
        <div>
          <span className="text-[11px] tracking-[0.32em] uppercase text-[#c9ab7c] font-medium block mb-3">
            Budget Planner · {city}
          </span>
          <h3 className="font-[family-name:var(--font-marcellus)] text-[clamp(26px,3.2vw,42px)] leading-tight text-white">
            Estimate your construction cost
          </h3>
        </div>
        <span className="text-[11px] tracking-[0.18em] uppercase text-white/60 border border-white/10 px-3.5 py-1.5 font-light">
          Current rates across {city}
        </span>
      </div>

      <div className="grid lg:grid-cols-[1.18fr_0.82fr] gap-8 lg:gap-12 items-start">
        {/* LEFT: STEP CONTROLS */}
        <div className="space-y-9">
          {/* 1. PROJECT TYPE */}
          <div>
            <span className="text-[11px] tracking-[0.24em] uppercase text-[#c9ab7c] font-medium block mb-3.5">
              01 / Select Project Type
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {PROJECT_TYPES.map((t) => {
                const active = selectedType.id === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => handleTypeChange(t)}
                    aria-pressed={active}
                    className={`p-3.5 sm:p-4 text-left transition-all duration-200 border ${
                      active
                        ? 'border-[#a58150] bg-[#a58150]/15 text-white'
                        : 'border-white/10 bg-white/[0.02] hover:border-white/25 text-white/80'
                    }`}
                  >
                    <span className="font-[family-name:var(--font-marcellus)] text-[15px] sm:text-[16px] block leading-snug">
                      {t.name}
                    </span>
                    <span className="text-[11px] text-white/50 block mt-1 font-light leading-snug">
                      {t.sub}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. BUILT-UP AREA */}
          <div>
            <div className="flex items-center justify-between gap-4 mb-3.5">
              <span className="text-[11px] tracking-[0.24em] uppercase text-[#c9ab7c] font-medium">
                02 / Built-Up Area
              </span>
              <span className="font-[family-name:var(--font-marcellus)] text-[22px] sm:text-[26px] text-[#c9ab7c] tabular-nums">
                {fmt(area)} <span className="text-[13px] text-white/50 font-sans">sq.ft</span>
              </span>
            </div>

            <input
              type="range"
              min={MIN_AREA}
              max={MAX_AREA}
              step={100}
              value={area}
              onChange={(e) => setArea(parseInt(e.target.value, 10))}
              aria-label={`Built-up area: ${area} square feet`}
              className="w-full accent-[#a58150] cursor-pointer"
            />

            <div className="flex items-center justify-between mt-2.5 text-[11px] text-white/45">
              <span>{fmt(MIN_AREA)} sq.ft</span>
              <div className="flex gap-1.5">
                {AREA_PRESETS.map((p) => (
                  <button
                    key={p}
                    onClick={() => setArea(p)}
                    className={`px-2 py-0.5 border text-[10.5px] transition-colors ${
                      area === p
                        ? 'border-[#a58150] text-[#c9ab7c] bg-[#a58150]/15'
                        : 'border-white/10 hover:border-white/30 text-white/60'
                    }`}
                  >
                    {fmt(p)}
                  </button>
                ))}
              </div>
              <span>{fmt(MAX_AREA)} sq.ft</span>
            </div>
          </div>

          {/* 3. WORK SCOPE */}
          <div>
            <span className="text-[11px] tracking-[0.24em] uppercase text-[#c9ab7c] font-medium block mb-3.5">
              03 / Select Work Scope
            </span>
            <div className="grid gap-2.5">
              {SCOPE_TIERS.map((s) => {
                const active = selectedScope.id === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => setSelectedScope(s)}
                    aria-pressed={active}
                    className={`p-4 sm:p-5 text-left transition-all duration-200 border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      active
                        ? 'border-[#a58150] bg-[#a58150]/15'
                        : 'border-white/10 bg-white/[0.02] hover:border-white/25'
                    }`}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2.5">
                        <span className="font-[family-name:var(--font-marcellus)] text-[16px] text-white">
                          {s.name}
                        </span>
                        {s.badge && (
                          <span className="text-[9px] uppercase tracking-wider bg-[#a58150] text-white px-2 py-0.5 font-semibold">
                            {s.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-[12px] text-white/55 mt-1 font-light leading-relaxed">
                        {s.desc}
                      </p>
                    </div>
                    <div className="sm:text-right shrink-0">
                      <span className="text-[16px] font-[family-name:var(--font-marcellus)] text-[#c9ab7c]">
                        ₹{fmt(s.rate)}<span className="text-[11px] font-sans text-white/45">/sq.ft</span>
                      </span>
                      <span className="block text-[10.5px] text-white/40 mt-0.5">
                        {s.timeline}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT: CLEAN MINIMAL SUMMARY */}
        <aside className="p-7 sm:p-8 bg-white/[0.03] border border-white/10 lg:sticky lg:top-28">
          <span className="text-[11px] tracking-[0.24em] uppercase text-[#c9ab7c] font-medium block mb-5">
            Estimated Investment
          </span>

          <div className="mb-6">
            <span className="font-[family-name:var(--font-marcellus)] text-[clamp(32px,3.6vw,44px)] text-white block leading-none tracking-tight">
              {loLakhs} – {hiLakhs}
            </span>
            <span className="text-[12px] text-white/55 block mt-2 font-light">
              Indicative cost for {fmt(area)} sq.ft · {selectedType.name}
            </span>
          </div>

          <div className="border-t border-white/10 pt-4 space-y-2.5 text-[12.5px] text-white/70 mb-7">
            <div className="flex justify-between">
              <span className="text-white/45">Typology</span>
              <span className="text-white font-medium">{selectedType.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/45">Area</span>
              <span className="text-white font-medium">{fmt(area)} sq.ft</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/45">Scope</span>
              <span className="text-white font-medium">{selectedScope.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/45">Timeline</span>
              <span className="text-white font-medium">{selectedScope.timeline}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/45">Warranty</span>
              <span className="text-[#c9ab7c] font-medium">10-Year Structural</span>
            </div>
          </div>

          <Link
            href={`${basePath}/contact`}
            className="w-full inline-flex items-center justify-center gap-2 bg-[#a58150] hover:bg-[#8f6e40] text-white py-3.5 px-5 text-[11px] tracking-[0.2em] uppercase font-medium transition-colors duration-200 shadow-md shadow-black/20"
          >
            Get Exact Quote <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <p className="mt-4 text-[10.5px] text-white/40 text-center font-light leading-relaxed">
            *Fixed contract pricing finalized following complimentary site visit in {city}.
          </p>
        </aside>
      </div>
    </div>
  );
}
