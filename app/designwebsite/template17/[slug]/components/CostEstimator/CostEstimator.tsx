'use client';

import React, { useState, useId } from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Clock, Check } from 'lucide-react';
import { useTemplateData } from '../../context/TemplateContext';

const PROJECT_TYPES = [
  { id: 'villa', name: 'Luxury Villa', sub: 'Coastal & ECR Plots', multiplier: 1.15 },
  { id: 'residential', name: 'Residential House', sub: 'G+1 / G+2 City Homes', multiplier: 1.0 },
  { id: 'commercial', name: 'Commercial Building', sub: 'Offices, Clinics & Retail', multiplier: 1.1 },
  { id: 'courtyard', name: 'Courtyard Residence', sub: 'Traditional Vaastu Layout', multiplier: 1.12 },
];

const SCOPES = [
  {
    id: 'design',
    name: 'Design & Approvals',
    rate: 85,
    unit: '₹85 / sq.ft',
    desc: '3D elevations, Vaastu floor plans, and CMDA/GCC municipal sanction dossier.',
    timeline: '45 Days',
  },
  {
    id: 'structural',
    name: 'Structural Shell',
    rate: 1450,
    unit: '₹1,450 / sq.ft',
    desc: 'Deep foundations, Tata Tiscon Fe550D rebar, Grade-53 monolithic RCC frame.',
    timeline: '6 – 8 Months',
  },
  {
    id: 'turnkey',
    name: 'Complete Turnkey',
    rate: 2350,
    unit: '₹2,350 / sq.ft',
    desc: 'Groundbreaking to handover: structure, electrical, plumbing, flooring & 10-year warranty.',
    timeline: '10 – 14 Months',
    popular: true,
  },
];

const PRESETS = [1600, 2400, 3200, 4800];

export default function CostEstimator() {
  const { basePath } = useTemplateData();
  const [selectedType, setSelectedType] = useState('villa');
  const [area, setArea] = useState(3200);
  const [selectedScope, setSelectedScope] = useState('turnkey');
  const areaId = useId();

  const currentType = PROJECT_TYPES.find((t) => t.id === selectedType) || PROJECT_TYPES[0];
  const currentScope = SCOPES.find((s) => s.id === selectedScope) || SCOPES[2];

  const totalMid = area * currentScope.rate * currentType.multiplier;
  const minEstimate = Math.round((totalMid * 0.93) / 100000);
  const maxEstimate = Math.round((totalMid * 1.07) / 100000);

  const formatPrice = (val: number) => {
    if (val >= 100) return `₹${(val / 100).toFixed(2)} Cr`;
    return `₹${val} Lakhs`;
  };

  return (
    <section id="estimator" className="py-24 px-6 bg-[var(--bg)] text-[var(--text)] relative overflow-hidden border-t border-[var(--border)]">
      <div className="max-w-[1280px] mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[var(--border)] bg-[var(--surface-2)] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2563eb]" />
            <span className="font-mono text-[11px] text-[var(--muted)] tracking-widest uppercase">
              Interactive Cost Planner
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-light tracking-tight text-[var(--text)] mb-4" style={{ fontFamily: 'var(--serif-font)' }}>
            Estimate Your Construction Cost
          </h2>
          <p className="text-[var(--muted)] text-base md:text-lg">
            Real-time transparent architectural and civil estimates based on active Chennai market parameters.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-10 items-start">
          {/* Controls */}
          <div className="space-y-8 bg-[var(--surface-card)] border border-[var(--border)] p-8 sm:p-10 rounded-3xl shadow-sm">
            {/* 1. Typology */}
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#2563eb] mb-3 flex items-center gap-2">
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
                      className={`text-left p-3.5 rounded-2xl border transition-all duration-200 ${
                        active
                          ? 'bg-blue-500/15 border-[#2563eb] text-[var(--text)] shadow-sm'
                          : 'bg-[var(--surface-2)] border-[var(--border)] text-[var(--muted)] hover:text-[var(--text)] hover:border-[#2563eb]/40'
                      }`}
                    >
                      <div className="text-sm font-semibold text-[var(--text)]">{t.name}</div>
                      <div className="text-xs text-[var(--muted)] mt-1">{t.sub}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Built-Up Area */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="text-xs font-bold uppercase tracking-wider text-[#2563eb] flex items-center gap-2">
                  <span>02</span>
                  <label htmlFor={areaId} className="cursor-pointer">
                    Total Built-Up Area
                  </label>
                </div>
                <span className="text-2xl font-bold text-[var(--text)]">
                  {area.toLocaleString('en-IN')} <span className="text-sm font-normal text-[var(--muted)]">sq.ft</span>
                </span>
              </div>

              <input
                id={areaId}
                type="range"
                min={600}
                max={10000}
                step={100}
                value={area}
                onChange={(e) => setArea(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#2563eb]"
              />

              <div className="flex flex-wrap items-center justify-between gap-3 mt-3 text-xs text-[var(--muted)]">
                <div className="flex gap-2">
                  {PRESETS.map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setArea(p)}
                      className={`px-3 py-1 rounded-lg border text-xs transition-all ${
                        area === p
                          ? 'border-[#2563eb] bg-blue-500/15 text-[#2563eb] font-semibold'
                          : 'border-[var(--border)] bg-[var(--surface-2)] text-[var(--muted)] hover:text-[var(--text)]'
                      }`}
                    >
                      {p.toLocaleString('en-IN')} sf
                    </button>
                  ))}
                </div>
                <span>600 – 10,000 sq.ft</span>
              </div>
            </div>

            {/* 3. Scope */}
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#2563eb] mb-3 flex items-center gap-2">
                <span>03</span>
                <span>Select Work Scope</span>
              </div>
              <div className="grid sm:grid-cols-3 gap-3">
                {SCOPES.map((s) => {
                  const active = s.id === selectedScope;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSelectedScope(s.id)}
                      className={`text-left p-4 rounded-2xl border relative transition-all duration-200 ${
                        active
                          ? 'bg-blue-500/15 border-[#2563eb] text-[var(--text)] shadow-sm'
                          : 'bg-[var(--surface-2)] border-[var(--border)] text-[var(--muted)] hover:text-[var(--text)] hover:border-[#2563eb]/40'
                      }`}
                    >
                      {s.popular && (
                        <span className="absolute -top-2.5 right-3 bg-[#2563eb] text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded-full">
                          Popular
                        </span>
                      )}
                      <div className="text-sm font-semibold text-[var(--text)]">{s.name}</div>
                      <div className="text-xs font-bold text-[#2563eb] mt-1">{s.unit}</div>
                      <div className="text-xs text-[var(--muted)] mt-2 leading-relaxed line-clamp-2">{s.desc}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Investment Summary */}
          <div className="bg-[var(--surface-card)] border-2 border-[#2563eb] p-8 sm:p-10 rounded-3xl shadow-xl flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#2563eb] block mb-2">
                Estimated Investment
              </span>
              <div className="text-4xl sm:text-5xl font-bold text-[var(--text)] mb-2" style={{ fontFamily: 'var(--serif-font)' }}>
                {formatPrice(minEstimate)} – {formatPrice(maxEstimate)}
              </div>
              <p className="text-xs text-[var(--muted)] mb-6">
                Indicative range including quality materials, labour, and engineering supervision*.
              </p>

              <div className="space-y-3 py-5 border-y border-[var(--border)] text-sm">
                <div className="flex justify-between">
                  <span className="text-[var(--muted)]">Typology</span>
                  <span className="font-semibold text-[var(--text)]">{currentType.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--muted)]">Area</span>
                  <span className="font-semibold text-[var(--text)]">{area.toLocaleString('en-IN')} sq.ft</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--muted)]">Scope</span>
                  <span className="font-semibold text-[var(--text)]">{currentScope.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--muted)]">Handover Timeline</span>
                  <span className="font-semibold text-[#2563eb]">{currentScope.timeline}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--muted)]">Warranty</span>
                  <span className="font-semibold text-[var(--text)]">10-Year Comprehensive</span>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <Link
                href={`${basePath}/appointment`}
                className="w-full py-4 px-6 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-semibold text-sm transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2"
              >
                Get Exact Floor-Plan Quote <ArrowRight className="w-4 h-4" />
              </Link>
              <p className="text-center text-xs text-[var(--muted)] mt-3">
                Transparent line-item quotation with 0% cost escalation guarantee.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
