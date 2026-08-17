'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Check, ArrowRight, Sparkles, Clock, ShieldCheck } from 'lucide-react';

type ConfigOption = {
  label: string;
  sub: string;
  sqft: string;
  basePrice: number;
};

const CONFIGS: ConfigOption[] = [
  { label: '2 BHK', sub: 'Compact & Functional', sqft: '950 – 1,200 sq.ft', basePrice: 6.5 },
  { label: '3 BHK', sub: 'Spacious Family Home', sqft: '1,400 – 1,850 sq.ft', basePrice: 9.8 },
  { label: '4 BHK', sub: 'Grand Residence', sqft: '2,100 – 2,800 sq.ft', basePrice: 14.5 },
  { label: 'Villa / Penthouse', sub: 'Multi-Level Luxury', sqft: '3,000+ sq.ft', basePrice: 22.0 },
];

const TIERS = [
  {
    name: 'Essential Living',
    multiplier: 1.0,
    desc: 'BWP Marine Ply, Premium Laminates, Häfele Hardware, False Ceiling & Asian Paints Royale',
    timeline: '35 – 45 Days',
    features: [
      'Modular Kitchen with Tandem Drawers',
      'Full-height Wardrobes with Lofts',
      'Designer TV Unit & Foyer Niche',
      'LED Ambient False Ceiling',
      '100% Calibrated BWP Marine Ply',
    ],
  },
  {
    name: 'Signature Luxe',
    multiplier: 1.45,
    desc: 'Acrylic/PU Finishes, Fluted Panelling, Blum Soft-Close, Profile Lighting & Quartz Counters',
    timeline: '45 – 60 Days',
    features: [
      'Everything in Essential Living',
      'Acrylic / Matte PU Kitchen Finish',
      'Blum Aventos & Soft-close Fittings',
      'Fluted Acoustic Wall Panelling',
      'Quartz Countertops with Seamless Sink',
      'Cove Profile & Smart Ambient Lighting',
    ],
  },
  {
    name: 'Bespoke Atelier',
    multiplier: 2.1,
    desc: 'Veneer, Italian Marble Inlays, CNC Brass Accents, Custom Joinery & Full Home Automation',
    timeline: '60 – 75 Days',
    features: [
      'Everything in Signature Luxe',
      'Natural Smoked Veneer with PU Polish',
      'Italian Marble Wall & Floor Accents',
      'Custom Solid Wood Joinery & Furniture',
      'Smart Lighting & Automation Ready',
      'Dedicated Interior Architect on Site',
    ],
  },
];

export default function ScopeEstimator({ basePath, city }: { basePath: string; city: string }) {
  const [selectedConfig, setSelectedConfig] = useState(1);
  const [selectedTier, setSelectedTier] = useState(1);

  const cfg = CONFIGS[selectedConfig];
  const tier = TIERS[selectedTier];

  const estimatedMin = (cfg.basePrice * tier.multiplier).toFixed(1);
  const estimatedMax = (cfg.basePrice * tier.multiplier * 1.25).toFixed(1);

  return (
    <div className="bg-[#211a13] text-white border border-[#a58150]/30 p-7 sm:p-10 lg:p-12">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-[#f6f1e8]/15">
        <div>
          <span className="text-[11px] tracking-[0.3em] uppercase text-[#c9ab7c] block mb-1.5">
            Transparent Planning
          </span>
          <h3 className="font-[family-name:var(--font-marcellus)] text-[24px] sm:text-[30px]">
            Interactive Scope &amp; Budget Planner
          </h3>
        </div>
        <span className="inline-flex items-center gap-2 text-[12px] tracking-[0.15em] uppercase text-white/70 bg-white/5 border border-white/10 px-4 py-2">
          <Sparkles className="w-3.5 h-3.5 text-[#c9ab7c]" /> Accurate for {city}
        </span>
      </div>

      {/* Step 1: Configuration */}
      <div className="mb-8">
        <label className="text-[12px] tracking-[0.2em] uppercase text-[#c9ab7c] block mb-3 font-medium">
          1. Select Home Layout
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {CONFIGS.map((c, idx) => (
            <button
              key={c.label}
              onClick={() => setSelectedConfig(idx)}
              className={`p-4 text-left border transition-all duration-300 ${
                selectedConfig === idx
                  ? 'bg-[#a58150]/20 border-[#a58150] shadow-[0_0_20px_rgba(165,129,80,0.15)]'
                  : 'bg-white/5 border-white/10 hover:border-white/25'
              }`}
            >
              <b className="font-[family-name:var(--font-marcellus)] text-[18px] block text-white">{c.label}</b>
              <span className="text-[11px] text-white/60 block mt-1">{c.sqft}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Step 2: Finish Tier */}
      <div className="mb-10">
        <label className="text-[12px] tracking-[0.2em] uppercase text-[#c9ab7c] block mb-3 font-medium">
          2. Select Finish &amp; Material Tier
        </label>
        <div className="grid sm:grid-cols-3 gap-3">
          {TIERS.map((t, idx) => (
            <button
              key={t.name}
              onClick={() => setSelectedTier(idx)}
              className={`p-4.5 text-left border transition-all duration-300 ${
                selectedTier === idx
                  ? 'bg-[#a58150]/20 border-[#a58150] shadow-[0_0_20px_rgba(165,129,80,0.15)]'
                  : 'bg-white/5 border-white/10 hover:border-white/25'
              }`}
            >
              <div className="flex justify-between items-center mb-1">
                <b className="font-[family-name:var(--font-marcellus)] text-[16px] text-white">{t.name}</b>
                {idx === 1 && (
                  <span className="text-[9.5px] uppercase tracking-wider bg-[#a58150] text-white px-2 py-0.5 font-medium">
                    Most Popular
                  </span>
                )}
              </div>
              <p className="text-[12px] text-white/65 font-light line-clamp-2 leading-relaxed">{t.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Output card */}
      <div className="bg-[#2c231a] border border-[#a58150]/40 p-6 sm:p-8 grid lg:grid-cols-[1.2fr_0.8fr] gap-8 items-center">
        <div>
          <div className="flex flex-wrap gap-4 items-baseline mb-3">
            <span className="text-[12px] tracking-[0.2em] uppercase text-[#c9ab7c]">Estimated Range:</span>
            <b className="font-[family-name:var(--font-marcellus)] text-[34px] sm:text-[42px] text-white leading-none">
              ₹{estimatedMin} – ₹{estimatedMax} <span className="text-[18px] text-[#c9ab7c] font-normal">Lakhs*</span>
            </b>
          </div>
          <p className="text-[13px] text-white/70 font-light mb-5 leading-relaxed">
            Includes complete material sourcing, precision joinery, on-site execution, lighting, and deep-clean handover.
          </p>

          <div className="flex flex-wrap gap-6 text-[12.5px] text-white/80">
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#c9ab7c]" /> Handover: <b>{tier.timeline}</b>
            </span>
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#c9ab7c]" /> <b>10-Year Warranty</b>
            </span>
          </div>
        </div>

        <div className="lg:border-l lg:border-[#f6f1e8]/15 lg:pl-8 flex flex-col gap-3">
          <span className="text-[11.5px] tracking-[0.18em] uppercase text-[#c9ab7c] font-medium block">
            Scope Highlights:
          </span>
          <ul className="grid gap-2 mb-4">
            {tier.features.slice(0, 4).map((feat) => (
              <li key={feat} className="flex items-start gap-2.5 text-[13px] text-white/85 font-light">
                <Check className="w-3.5 h-3.5 text-[#c9ab7c] shrink-0 mt-0.5" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>

          <Link
            href={`${basePath}/contact`}
            className="inline-flex items-center justify-center gap-2.5 bg-[#a58150] text-white py-3.5 px-6 text-[12px] tracking-[0.2em] uppercase font-medium border border-[#a58150] hover:bg-white hover:text-[#211a13] hover:border-white transition-colors duration-300 text-center"
          >
            Get Detailed Floor Plan Quote <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
      <p className="mt-4 text-[11px] text-white/40 text-center font-light">
        * Estimates are indicative and vary based on exact floor plan dimensions, hardware selections, and civil alterations.
      </p>
    </div>
  );
}
