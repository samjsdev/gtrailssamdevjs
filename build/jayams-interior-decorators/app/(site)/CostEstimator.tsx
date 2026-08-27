'use client';

import { useState, useMemo } from 'react';
import { 
  Calculator, CheckCircle2, ArrowRight, ShieldCheck, 
  Building2, Layers, HardHat, FileText, Sparkles, Check
} from 'lucide-react';

interface CostEstimatorProps {
  basePath: string;
}

export default function CostEstimator({ basePath }: CostEstimatorProps) {
  const [area, setArea] = useState<number>(2400);
  const [floors, setFloors] = useState<string>('g1');
  const [packageType, setPackageType] = useState<'standard' | 'premium' | 'luxury'>('premium');
  const [includeInterior, setIncludeInterior] = useState<boolean>(true);
  const [interiorTier, setInteriorTier] = useState<'essential' | 'premium' | 'luxury'>('premium');

  const packages = {
    standard: {
      name: 'ESSENTIAL CIVIL',
      rate: 1850,
      badge: 'AFFORDABLE RIGOR',
      steel: 'Fe500D TMT ISI Certified',
      cement: 'Grade 53 PPC Cement (Dalmia/Zuari)',
      masonry: 'Standard AAC Lightweight Blocks',
      flooring: 'Vitrified Double Charge Tiles (₹55/sq.ft)',
      warranty: '5-Year Structural Warranty',
    },
    premium: {
      name: 'PREMIUM VILLA',
      rate: 2250,
      badge: 'MOST POPULAR',
      steel: 'Fe550D Tata Tiscon / JSW Neosteel',
      cement: 'UltraTech / ACC Grade-53 High Early Strength',
      masonry: 'Wire-cut Red Bricks / Heavy Duty AAC',
      flooring: 'Vitrified Glazed 4x2 Tiles (₹85/sq.ft)',
      warranty: '10-Year Structural Warranty',
    },
    luxury: {
      name: 'ELITE ARCHITECTURAL',
      rate: 2750,
      badge: 'BESPOKE OPULENCE',
      steel: 'Fe550D Primary TMT + Corrosion Ingress Protection',
      cement: 'UltraTech Super / Coromandel King 53',
      masonry: 'Wienerberger Porotherm Clay Thermal Blocks',
      flooring: 'Italian Marble / Nexion 6x4 Slabs (₹140+/sq.ft)',
      warranty: '10-Year Comprehensive Structural Guarantee',
    },
  };

  const floorMultiplier = useMemo(() => {
    switch (floors) {
      case 'g': return 1.0;
      case 'g1': return 1.0;
      case 'g2': return 1.02; // slight structural surcharge for G+2
      case 'g3': return 1.05; // structural reinforcement for G+3
      default: return 1.0;
    }
  }, [floors]);

  const interiorRates = {
    essential: 450, // per sqft
    premium: 750,   // per sqft
    luxury: 1200,   // per sqft
  };

  const civilCost = useMemo(() => {
    const baseRate = packages[packageType].rate;
    return Math.round(area * baseRate * floorMultiplier);
  }, [area, packageType, floorMultiplier]);

  const interiorCost = useMemo(() => {
    if (!includeInterior) return 0;
    return Math.round(area * interiorRates[interiorTier]);
  }, [area, includeInterior, interiorTier]);

  const totalCost = civilCost + interiorCost;

  const formatINR = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="w-full bg-[#FFFFFF] border-4 border-[#252A29] shadow-[8px_8px_0px_#252A29] p-6 sm:p-10">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b-2 border-[#252A29]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#E94B26] text-[#F4F3EE] flex items-center justify-center font-black border border-[#111111] shadow-[2px_2px_0px_#111111]">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-[#C8A84E] block">
              ESTIMATION ENGINE V2.4
            </span>
            <h3 className="text-xl sm:text-2xl font-black uppercase text-[#252A29] tracking-tight">
              CONSTRUCTION & INTERIOR COST ESTIMATOR
            </h3>
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#252A29] text-[#C8A84E] text-[11px] font-mono font-bold border border-[#111111]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#E94B26]" />
          <span>ZERO COST ESCALATION GUARANTEED</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
        {/* Left Column: Sliders & Selectors */}
        <div className="lg:col-span-7 space-y-6">
          {/* Area Slider */}
          <div className="bg-[#F4F3EE] p-5 border-2 border-[#252A29]">
            <div className="flex justify-between items-center mb-3">
              <label htmlFor="built-up-area-slider" className="text-xs font-mono font-bold uppercase tracking-wider text-[#252A29]">
                1. Total Built-Up Area (Sq.Ft)
              </label>
              <div className="px-3 py-1 bg-[#252A29] text-[#F4F3EE] font-mono font-bold text-sm border border-[#111111]">
                {area.toLocaleString()} SQ.FT
              </div>
            </div>
            <input
              id="built-up-area-slider"
              type="range"
              min="800"
              max="10000"
              step="100"
              value={area}
              onChange={(e) => setArea(Number(e.target.value))}
              aria-label="Total Built-Up Area in Square Feet"
              className="w-full h-2 bg-[#252A29]/20 rounded-none appearance-none cursor-pointer accent-[#E94B26]"
            />
            <div className="flex justify-between text-[10px] font-mono text-[#252A29]/60 mt-2 font-bold">
              <span>800 SQ.FT (Compact Villa)</span>
              <span>4,000 SQ.FT (Grand Villa)</span>
              <span>10,000+ SQ.FT (Mansion)</span>
            </div>
          </div>

          {/* Floor Elevation Selector */}
          <div>
            <span className="block text-xs font-mono font-bold uppercase tracking-wider text-[#252A29] mb-3">
              2. Structural Elevation (Floors)
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { id: 'g', label: 'Ground Floor', sub: 'Independent' },
                { id: 'g1', label: 'G + 1 Floor', sub: 'Duplex Villa' },
                { id: 'g2', label: 'G + 2 Floors', sub: 'Triplex Residence' },
                { id: 'g3', label: 'G + 3 Floors', sub: 'Multi-Unit House' },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFloors(f.id)}
                  type="button"
                  className={`p-3 text-left border-2 transition-all ${
                    floors === f.id
                      ? 'bg-[#252A29] text-[#F4F3EE] border-[#111111] shadow-[3px_3px_0px_#E94B26]'
                      : 'bg-[#FFFFFF] text-[#252A29] border-[#252A29]/30 hover:border-[#252A29]'
                  }`}
                >
                  <span className="block font-black text-xs uppercase tracking-tight">{f.label}</span>
                  <span className={`text-[10px] font-mono block mt-0.5 ${floors === f.id ? 'text-[#C8A84E]' : 'text-[#252A29]/60'}`}>
                    {f.sub}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Construction Specification Package */}
          <div>
            <span className="block text-xs font-mono font-bold uppercase tracking-wider text-[#252A29] mb-3">
              3. Civil Specification Tier
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {(Object.keys(packages) as Array<keyof typeof packages>).map((key) => {
                const pkg = packages[key];
                const isSelected = packageType === key;
                return (
                  <button
                    key={key}
                    onClick={() => setPackageType(key)}
                    type="button"
                    className={`p-4 text-left border-2 relative transition-all ${
                      isSelected
                        ? 'bg-[#FFFFFF] border-[#E94B26] ring-2 ring-[#E94B26] shadow-[4px_4px_0px_#252A29]'
                        : 'bg-[#F4F3EE] border-[#252A29]/30 hover:border-[#252A29]'
                    }`}
                  >
                    <span className="inline-block px-2 py-0.5 bg-[#E94B26] text-[#F4F3EE] text-[9px] font-black uppercase tracking-wider mb-2">
                      {pkg.badge}
                    </span>
                    <h4 className="text-sm font-black uppercase text-[#252A29] tracking-tight">{pkg.name}</h4>
                    <span className="text-base font-black font-mono text-[#E94B26] block mt-1">
                      ₹{pkg.rate} <span className="text-[10px] font-normal text-[#252A29]">/ sq.ft</span>
                    </span>
                    <ul className="mt-3 space-y-1.5 text-[10px] font-mono text-[#252A29]/80 border-t border-[#252A29]/10 pt-2">
                      <li className="flex items-center gap-1.5">
                        <Check className="w-3 h-3 text-[#E94B26] shrink-0" />
                        <span>{pkg.steel}</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <Check className="w-3 h-3 text-[#E94B26] shrink-0" />
                        <span>{pkg.warranty}</span>
                      </li>
                    </ul>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interior Fitout Toggle */}
          <div className="bg-[#F4F3EE] p-5 border-2 border-[#252A29]">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="block text-xs font-mono font-bold uppercase tracking-wider text-[#252A29]">
                  4. Turnkey Interior Fitout Scope
                </span>
                <span className="text-[11px] text-[#252A29]/70">
                  Includes modular kitchen, wardrobes, false ceiling & architectural lighting.
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIncludeInterior(!includeInterior)}
                className={`px-4 py-2 text-xs font-black uppercase font-mono tracking-wider border-2 transition-all ${
                  includeInterior
                    ? 'bg-[#E94B26] text-[#F4F3EE] border-[#111111] shadow-[2px_2px_0px_#111111]'
                    : 'bg-[#FFFFFF] text-[#252A29] border-[#252A29]'
                }`}
              >
                {includeInterior ? 'INTERIOR INCLUDED' : 'CIVIL ONLY'}
              </button>
            </div>

            {includeInterior && (
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#252A29]/20">
                {[
                  { id: 'essential', label: 'Essential Interior', rate: '₹450/sq.ft' },
                  { id: 'premium', label: 'Premium Veneer & Acrylic', rate: '₹750/sq.ft' },
                  { id: 'luxury', label: 'Ultra Luxury & Automation', rate: '₹1,200/sq.ft' },
                ].map((tier) => (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => setInteriorTier(tier.id as any)}
                    className={`p-2.5 text-left border-2 text-xs transition-all ${
                      interiorTier === tier.id
                        ? 'bg-[#252A29] text-[#F4F3EE] border-[#111111]'
                        : 'bg-[#FFFFFF] text-[#252A29] border-[#252A29]/30'
                    }`}
                  >
                    <span className="block font-bold text-[11px] leading-tight">{tier.label}</span>
                    <span className={`text-[10px] font-mono block mt-1 ${interiorTier === tier.id ? 'text-[#C8A84E]' : 'text-[#E94B26]'}`}>
                      {tier.rate}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Estimated Financial Summary */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div className="bg-[#252A29] text-[#F4F3EE] p-6 sm:p-8 border-4 border-[#111111] shadow-[6px_6px_0px_#E94B26] space-y-6">
            <div className="border-b-2 border-[#111111] pb-4">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#C8A84E] block font-bold">
                ESTIMATED TURNKEY INVESTMENT
              </span>
              <div className="text-3xl sm:text-4xl font-black font-mono text-[#F4F3EE] mt-1 tracking-tight">
                {formatINR(totalCost)}
              </div>
              <span className="text-xs font-mono text-[#E94B26] font-bold block mt-1">
                Approx. ₹{Math.round(totalCost / area).toLocaleString()}/sq.ft Complete Turnkey
              </span>
            </div>

            {/* Breakdown Items */}
            <div className="space-y-3 font-mono text-xs">
              <div className="flex justify-between py-2 border-b border-[#F4F3EE]/10">
                <span className="text-[#F4F3EE]/70">Civil Construction ({packages[packageType].name}):</span>
                <span className="font-bold text-[#F4F3EE]">{formatINR(civilCost)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#F4F3EE]/10">
                <span className="text-[#F4F3EE]/70">Interior Execution ({includeInterior ? interiorTier.toUpperCase() : 'NONE'}):</span>
                <span className="font-bold text-[#F4F3EE]">{formatINR(interiorCost)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#F4F3EE]/10 text-[#C8A84E]">
                <span>Architectural 3D BIM & Approvals:</span>
                <span className="font-bold uppercase">100% REBATED</span>
              </div>
              <div className="flex justify-between py-2 text-[#C8A84E]">
                <span>Structural Warranty Duration:</span>
                <span className="font-bold">{packages[packageType].warranty}</span>
              </div>
            </div>

            <div className="bg-[#181B1A] p-4 border border-[#C8A84E]/30 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#F4F3EE]">
                <Sparkles className="w-4 h-4 text-[#E94B26]" />
                <span>INCLUDED AT NO ADDITIONAL COST:</span>
              </div>
              <p className="text-[11px] text-[#F4F3EE]/75 font-sans leading-relaxed">
                Soil Bearing Test, 2D Working Plans, 3D Elevation Views, Structural Engineer Site Visits, 425-Point QC Inspections, and Milestone Escrow Safety.
              </p>
            </div>

            <a
              href={`${basePath}#consultation-form`}
              className="w-full py-4 bg-[#E94B26] hover:bg-[#d43d1a] text-[#F4F3EE] font-black text-xs uppercase tracking-widest border-2 border-[#111111] shadow-[4px_4px_0px_#111111] hover:shadow-[1px_1px_0px_#111111] hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4" />
              <span>REQUEST DETAILED BOQ & QUOTATION</span>
            </a>
          </div>

          <div className="mt-4 p-3 bg-[#F4F3EE] border border-[#252A29]/20 text-[10px] font-mono text-[#252A29]/70 flex items-center justify-between">
            <span>*Rates are indicative based on standard soil and municipal norms.</span>
            <span className="font-bold text-[#E94B26]">NO HIDDEN ESCALATIONS</span>
          </div>
        </div>
      </div>
    </div>
  );
}
