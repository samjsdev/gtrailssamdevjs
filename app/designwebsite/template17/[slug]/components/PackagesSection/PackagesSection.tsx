'use client';

import React from 'react';
import Link from 'next/link';
import { Check, ArrowRight } from 'lucide-react';
import { useTemplateData } from '../../context/TemplateContext';

export const TEMPLATE17_PACKAGES = [
  {
    name: '3D Design & CMDA Approvals',
    price: 'From ₹1.5 Lakhs',
    tag: 'Design & Approvals',
    desc: '3D exterior elevation, Vaastu floor plans, and municipal sanction drawings strictly adhering to CMDA & GCC bylaws.',
    features: [
      'Site Boundary Survey & Setback Analysis',
      '100% Vaastu Compliant Floor Plans',
      'Realistic 3D Elevations (Day & Dusk Views)',
      'CMDA / GCC Municipal Sanction Dossier',
      'Rainwater Harvesting & Drainage Schematics',
      'Preliminary Line-Item Construction BOQ',
    ],
  },
  {
    name: 'Structural & MEP Suite',
    price: 'From ₹3.5 Lakhs',
    tag: 'Most Popular',
    desc: 'Comprehensive engineering package for contractor build: STAAD-analyzed RCC frame, plumbing, and electrical drawings.',
    features: [
      'Everything in Design & Approvals Package',
      'STAAD Structural Analysis & Soil-Matched Design',
      'Tata Tiscon Steel Bar Bending Schedules',
      'Concealed Electrical & Plumbing Blueprints',
      'Underground Sump & Septic Tank Drawings',
      'Site Engineer Milestone Quality Audits',
    ],
  },
  {
    name: 'Turnkey Architectural Build',
    price: 'From ₹2,400 / sq.ft',
    tag: 'Full Turnkey Build',
    desc: 'Single-contract groundbreaking to keys handover: Tata Tiscon Fe550D steel, UltraTech cement, and 10-year warranty.',
    features: [
      'Complete 3D Architecture & Structural Design',
      'Soil Tested Deep Foundations & Raised Plinth',
      'Primary Tata Tiscon Steel & Grade-53 Concrete',
      'Electrical, Plumbing, Flooring & Premium Fixtures',
      'Weekly Milestone Photographic Site Reports',
      '10-Year Comprehensive Structural Warranty',
    ],
  },
];

export default function PackagesSection({ data }: { data?: any }) {
  const { basePath } = useTemplateData();

  return (
    <section id="packages" className="py-24 px-6 bg-[var(--bg)] text-[var(--text)] relative overflow-hidden">
      <div className="max-w-[1280px] mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[var(--border)] bg-[var(--surface-2)] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2563eb]" />
            <span className="font-mono text-[11px] text-[var(--muted)] tracking-widest uppercase">
              Transparent Pricing
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-light tracking-tight text-[var(--text)] mb-4" style={{ fontFamily: 'var(--serif-font)' }}>
            Curated Architectural Packages
          </h2>
          <p className="text-[var(--muted)] text-base md:text-lg">
            Fixed rates, branded quality materials, and transparent line-item contracts without surprise charges.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-stretch">
          {TEMPLATE17_PACKAGES.map((pkg, idx) => (
            <div
              key={pkg.name}
              className={`rounded-3xl p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 relative border ${
                idx === 1
                  ? 'bg-[var(--surface-card)] border-[#2563eb] shadow-[0_20px_50px_rgba(37,99,235,0.18)]'
                  : 'bg-[var(--surface-card)] border-[var(--border)] hover:border-[#2563eb]/50 hover:shadow-lg'
              }`}
            >
              {idx === 1 && (
                <span className="absolute -top-3 right-8 bg-[#2563eb] text-white text-[10px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md">
                  {pkg.tag}
                </span>
              )}

              <div>
                <span className={`text-xs font-bold uppercase tracking-wider block mb-2 ${idx === 1 ? 'text-[#2563eb]' : 'text-[var(--muted)]'}`}>
                  {pkg.tag}
                </span>
                <h3 className="text-2xl font-semibold text-[var(--text)] mb-2" style={{ fontFamily: 'var(--serif-font)' }}>
                  {pkg.name}
                </h3>
                <b className="text-2xl font-bold text-[#2563eb] block mb-4">
                  {pkg.price}
                </b>
                <p className="text-[var(--muted)] text-sm leading-relaxed mb-6 pb-6 border-b border-[var(--border)]">
                  {pkg.desc}
                </p>

                <ul className="space-y-3 mb-8">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-[var(--text)] font-medium">
                      <Check className="w-4 h-4 text-[#2563eb] shrink-0 mt-0.5" strokeWidth={2.5} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href={`${basePath}/appointment`}
                className={`w-full py-3.5 px-6 rounded-xl text-center text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                  idx === 1
                    ? 'bg-[#2563eb] hover:bg-[#1d4ed8] text-white shadow-lg shadow-blue-600/30'
                    : 'bg-[var(--surface-2)] hover:bg-[#2563eb] text-[var(--text)] hover:text-white border border-[var(--border)]'
                }`}
              >
                Select Package <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
