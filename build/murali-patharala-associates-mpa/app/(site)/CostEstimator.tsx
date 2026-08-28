'use client';

import { useState, useMemo } from 'react';
import { 
  Calculator, ShieldCheck, ArrowRight, Check, 
  Home, Building2, Layers, Clock, MessageSquare,
  Sparkles, CheckCircle2, ChevronRight
} from 'lucide-react';

interface CostEstimatorProps {
  basePath?: string;
}

type ServiceMode = 'turnkey' | 'construction' | 'interiors';
type PackageLevel = 'standard' | 'premium' | 'luxury';

export default function CostEstimator({ basePath = '' }: CostEstimatorProps) {
  const [serviceMode, setServiceMode] = useState<ServiceMode>('turnkey');
  const [builtUpArea, setBuiltUpArea] = useState<number>(2400);
  const [floors, setFloors] = useState<number>(2); // 1 = G, 2 = G+1, 3 = G+2, 4 = G+3
  const [packageLevel, setPackageLevel] = useState<PackageLevel>('premium');

  // Rates per sq.ft based on service mode and package level
  const rateCards: Record<ServiceMode, Record<PackageLevel, {
    rate: number;
    title: string;
    description: string;
    steel: string;
    cement: string;
    flooring: string;
    fixtures: string;
    interiors: string;
    timeline: string;
    breakdown: { civil: number; finishing: number; mep: number; interiors: number };
  }>> = {
    turnkey: {
      standard: {
        rate: 2499,
        title: 'Standard Package',
        description: 'Complete home construction with essential quality branded materials and project management.',
        steel: 'Arun TMT / GBR or Equivalent (FE 550)',
        cement: 'Ramco / Dalmia 53-Grade Cement',
        flooring: '4x2 Vitrified Tiles (₹65/sq.ft, KAG / Sunheart)',
        fixtures: 'Parryware Sanitaryware & Ashirvad CPVC Pipes',
        interiors: 'Stainless Steel Sink & Modular Granite Platform',
        timeline: '7 – 9 Months Execution',
        breakdown: { civil: 48, finishing: 22, mep: 12, interiors: 18 },
      },
      premium: {
        rate: 2749,
        title: 'Premium Package (Most Popular)',
        description: 'Architect-engineered turnkey construction with wire-cut bricks, Jaquar fittings & Ghana teak doors.',
        steel: 'ARS / iSteel / Tata Tiscon Equivalent',
        cement: 'UltraTech / Ramco / Dalmia Supergrade',
        flooring: '4x2 Digital Vitrified Tiles (₹90/sq.ft) & Staircase Granite',
        fixtures: 'Jaquar Concealed Wall Mixers & Wall-Hung EWCs (₹30,000/bath)',
        interiors: 'Quartz Kitchen Sink, Granite Tops & Premium Enclosures',
        timeline: '8 – 11 Months Execution',
        breakdown: { civil: 44, finishing: 23, mep: 13, interiors: 20 },
      },
      luxury: {
        rate: 3499,
        title: 'Ultra Luxury Package',
        description: 'Signature architectural residence featuring Tata Tiscon 550D, 11ft ceiling, Quartz & Marble finishes.',
        steel: 'Tata Tiscon 550D + Anti-seismic frame design (1.5x strength)',
        cement: 'UltraTech Supergrade / Ramco / Dalmia',
        flooring: '6x6 Quartz Tiles (₹200/sq.ft) & Italian Marble Staircase (₹350/sq.ft)',
        fixtures: 'Kohler Designer Collection (₹60,000/bath) & Thermostatic Diverters',
        interiors: 'Designer Wood/Steel Entrance Doors, Multifunction Sink & Quartz Tops',
        timeline: '10 – 14 Months Execution',
        breakdown: { civil: 40, finishing: 25, mep: 13, interiors: 22 },
      },
    },
    construction: {
      standard: {
        rate: 1650,
        title: 'Standard Civil & Shell',
        description: 'Complete civil structure, masonry, plastering, plumbing, and basic flooring without woodwork.',
        steel: 'FE 550 Grade ISI TMT Steel',
        cement: 'Coromandel / Chettinad 53 Grade',
        flooring: 'Standard Vitrified Tiles',
        fixtures: 'Standard Sanitary & CP Fittings',
        interiors: 'Excludes modular woodwork',
        timeline: '6 – 8 Months Execution',
        breakdown: { civil: 60, finishing: 25, mep: 15, interiors: 0 },
      },
      premium: {
        rate: 1950,
        title: 'Premium Construction',
        description: 'High-strength RCC frame, Tata/JSW steel, exterior elevation textures, and luxury bathroom fittings.',
        steel: 'Tata Tiscon / JSW Neosteel 550D',
        cement: 'UltraTech / Ramco Supergrade',
        flooring: 'Large Format 4x2 Vitrified Tiles',
        fixtures: 'Kohler / Jaquar Fittings',
        interiors: 'Excludes modular woodwork',
        timeline: '7 – 9 Months Execution',
        breakdown: { civil: 55, finishing: 28, mep: 17, interiors: 0 },
      },
      luxury: {
        rate: 2450,
        title: 'Luxury Villa Shell',
        description: 'Anti-seismic heavy structural frame, double-height living casting, and premium facade cladding.',
        steel: 'Tata Tiscon 550D Fe-550',
        cement: 'UltraTech Supergrade',
        flooring: 'Granite & Large Vitrified Slabs',
        fixtures: 'Grohe / Kohler Concealed Systems',
        interiors: 'Excludes modular woodwork',
        timeline: '9 – 12 Months Execution',
        breakdown: { civil: 52, finishing: 30, mep: 18, interiors: 0 },
      },
    },
    interiors: {
      standard: {
        rate: 450,
        title: 'Essential Modular Interiors',
        description: 'Core cabinetry including modular kitchen, master bedroom wardrobes, and TV console.',
        steel: 'N/A (Interior Scope)',
        cement: 'N/A (Interior Scope)',
        flooring: 'N/A (Existing Tile Retention)',
        fixtures: 'Standard SS 304 Baskets & Hinges',
        interiors: 'Commercial MR Grade Plywood + 0.8mm Laminate',
        timeline: '30 – 45 Days Execution',
        breakdown: { civil: 0, finishing: 15, mep: 15, interiors: 70 },
      },
      premium: {
        rate: 750,
        title: 'Premium Designer Interiors',
        description: 'Full-house interiors with 100% BWR marine plywood, soft-close hardware, and false ceilings.',
        steel: 'N/A (Interior Scope)',
        cement: 'N/A (Interior Scope)',
        flooring: 'Quartz Kitchen Countertops Included',
        fixtures: 'Häfele / Blum Soft-Close Hinges & Tandem Drawers',
        interiors: '100% BWR Marine Plywood (IS:710) + Acrylic & Veneer',
        timeline: '45 – 60 Days Execution',
        breakdown: { civil: 0, finishing: 20, mep: 15, interiors: 65 },
      },
      luxury: {
        rate: 1250,
        title: 'Ultra Luxury Bespoke Interiors',
        description: 'Architectural joinery, Italian marble inlays, fluted glass wardrobes, and ambient smart lighting.',
        steel: 'N/A (Interior Scope)',
        cement: 'N/A (Interior Scope)',
        flooring: 'Italian Marble Wall Paneling & Quartz Island',
        fixtures: 'Blum Legrabox, Servo-Drive & Sensor Lighting',
        interiors: 'Birch Marine Plywood + Smoked Veneer + PU Lacquer',
        timeline: '60 – 90 Days Execution',
        breakdown: { civil: 0, finishing: 25, mep: 15, interiors: 60 },
      },
    },
  };

  const currentConfig = rateCards[serviceMode][packageLevel];
  const ratePerSqFt = currentConfig.rate;

  const totalCost = useMemo(() => {
    return builtUpArea * ratePerSqFt;
  }, [builtUpArea, ratePerSqFt]);

  // Format currency into Indian Lakhs / Crores
  const formatIndianCurrency = (val: number) => {
    if (val >= 10000000) {
      return `₹${(val / 10000000).toFixed(2)} Cr`;
    }
    return `₹${(val / 100000).toFixed(2)} L`;
  };

  const formatIndianFullNumber = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const calculatedCivil = Math.round((totalCost * currentConfig.breakdown.civil) / 100);
  const calculatedFinishing = Math.round((totalCost * currentConfig.breakdown.finishing) / 100);
  const calculatedMep = Math.round((totalCost * currentConfig.breakdown.mep) / 100);
  const calculatedInteriors = Math.round((totalCost * currentConfig.breakdown.interiors) / 100);

  const whatsappMessage = encodeURIComponent(
    `Hi ARCH Foundations & Murali Patharala Associates (MPA),\nI calculated my construction estimate on your website:\n- Scope: ${serviceMode === 'turnkey' ? 'Turnkey Home (Civil + Interiors)' : serviceMode === 'construction' ? 'Civil Construction Only' : 'Complete Interiors Only'}\n- Built-up Area: ${builtUpArea} Sq.Ft (${floors === 1 ? 'G' : floors === 2 ? 'G+1' : floors === 3 ? 'G+2' : 'G+3'})\n- Package: ${currentConfig.title} (₹${ratePerSqFt}/sq.ft)\n- Estimated Investment: ${formatIndianCurrency(totalCost)} (${formatIndianFullNumber(totalCost)})\nI would like to schedule a free site feasibility survey in Chennai.`
  );

  return (
    <div className="w-full border-4 border-[#111111] bg-white shadow-2xl overflow-hidden font-sans">
      {/* ── Top Header Strip ── */}
      <div className="bg-[#111111] text-white p-6 sm:p-8 border-b-4 border-[#111111] flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#EA580C] text-[#111111] font-bold flex items-center justify-center shrink-0">
            <Calculator className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#EA580C] block">
              Transparent Cost Engineering
            </span>
            <h3
              className="text-xl sm:text-2xl font-bold font-serif text-white tracking-tight leading-tight"
              style={{ fontFamily: "'Lora', serif" }}
            >
              Residential Construction &amp; Interior BOQ Calculator
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2 border border-[#333333] px-3.5 py-2 bg-[#1A1A1A]">
          <ShieldCheck className="w-4 h-4 text-[#EA580C]" />
          <span className="text-[11px] font-bold uppercase tracking-wider text-white/90">
            100% Fixed-Price &bull; Zero Escalation
          </span>
        </div>
      </div>

      {/* ── Main 2-Column Split Workbench ── */}
      <div className="grid lg:grid-cols-12 divide-y-4 lg:divide-y-0 lg:divide-x-4 divide-[#111111]">
        {/* ── Left Column: Configuration Controls (7 Cols) ── */}
        <div className="lg:col-span-7 p-6 sm:p-10 space-y-8 bg-white">
          {/* Step 1: Project Scope */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest text-[#757575] flex items-center gap-2">
                <span className="w-5 h-5 bg-[#111111] text-white text-[11px] font-bold flex items-center justify-center">1</span>
                <span>Select Project Scope</span>
              </span>
              <span className="text-[11px] font-bold uppercase text-[#EA580C]">
                {serviceMode === 'turnkey' ? 'Civil + Interiors' : serviceMode === 'construction' ? 'Civil Only' : 'Interiors Only'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'turnkey', label: 'Turnkey Residence', sub: 'Civil + Interiors', icon: <Home className="w-4 h-4" /> },
                { id: 'construction', label: 'Civil Construction', sub: 'RCC Shell + Masonry', icon: <Building2 className="w-4 h-4" /> },
                { id: 'interiors', label: 'Complete Interiors', sub: 'Factory Modular Woodwork', icon: <Layers className="w-4 h-4" /> },
              ].map((tab) => {
                const isActive = serviceMode === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setServiceMode(tab.id as ServiceMode)}
                    className={`p-4 border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isActive
                        ? 'border-[#111111] bg-[#111111] text-white shadow-md'
                        : 'border-[#E0E0E0] bg-[#FAFAFA] text-[#111111] hover:border-[#111111]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className={`p-1.5 ${isActive ? 'text-[#EA580C]' : 'text-[#757575]'}`}>
                        {tab.icon}
                      </div>
                      {isActive && (
                        <span className="w-2 h-2 bg-[#EA580C] rounded-full" />
                      )}
                    </div>
                    <div>
                      <p className="font-bold text-xs uppercase tracking-wider">{tab.label}</p>
                      <p className={`text-[11px] mt-0.5 ${isActive ? 'text-white/70' : 'text-[#757575]'}`}>{tab.sub}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Built-up Area Slider & Floor Selector */}
          <div className="space-y-4 pt-6 border-t-2 border-[#E0E0E0]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest text-[#757575] flex items-center gap-2">
                <span className="w-5 h-5 bg-[#111111] text-white text-[11px] font-bold flex items-center justify-center">2</span>
                <span>Built-Up Area &amp; Floors</span>
              </span>
              <div className="flex items-baseline gap-1">
                <span
                  className="text-3xl font-bold font-serif text-[#EA580C]"
                  style={{ fontFamily: "'Lora', serif" }}
                >
                  {builtUpArea.toLocaleString()}
                </span>
                <span className="text-xs font-bold uppercase text-[#111111]">Sq.Ft</span>
              </div>
            </div>

            {/* Slider */}
            <div className="space-y-2">
              <input
                type="range"
                min="1000"
                max="6500"
                step="50"
                value={builtUpArea}
                onChange={(e) => setBuiltUpArea(Number(e.target.value))}
                className="w-full h-3 bg-[#E0E0E0] appearance-none cursor-pointer accent-[#EA580C] border border-[#111111]"
                aria-label="Adjust built-up area in square feet"
              />
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-[#757575]">
                <span>1,000 Sq.Ft (Compact Villa)</span>
                <span>3,500 Sq.Ft</span>
                <span>6,500 Sq.Ft (Luxury Mansion)</span>
              </div>
            </div>

            {/* Quick Presets & Floor Buttons */}
            <div className="grid sm:grid-cols-12 gap-4 pt-2">
              <div className="sm:col-span-7 space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#757575] block">Quick Presets</span>
                <div className="flex flex-wrap gap-1.5">
                  {[1200, 1800, 2400, 3200, 4500].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setBuiltUpArea(preset)}
                      className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider border transition-colors cursor-pointer ${
                        builtUpArea === preset
                          ? 'border-[#111111] bg-[#111111] text-[#EA580C]'
                          : 'border-[#CCCCCC] bg-white text-[#111111] hover:border-[#111111]'
                      }`}
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>

              <div className="sm:col-span-5 space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#757575] block">Floors</span>
                <div className="grid grid-cols-4 gap-1">
                  {[
                    { val: 1, label: 'G' },
                    { val: 2, label: 'G+1' },
                    { val: 3, label: 'G+2' },
                    { val: 4, label: 'G+3' },
                  ].map((f) => (
                    <button
                      key={f.val}
                      type="button"
                      onClick={() => setFloors(f.val)}
                      className={`py-1.5 text-xs font-bold uppercase border transition-colors cursor-pointer ${
                        floors === f.val
                          ? 'border-[#111111] bg-[#111111] text-[#EA580C]'
                          : 'border-[#CCCCCC] bg-white text-[#111111] hover:border-[#111111]'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Step 3: Package Level Selector */}
          <div className="space-y-4 pt-6 border-t-2 border-[#E0E0E0]">
            <span className="text-xs font-bold uppercase tracking-widest text-[#757575] flex items-center gap-2">
              <span className="w-5 h-5 bg-[#111111] text-white text-[11px] font-bold flex items-center justify-center">3</span>
              <span>Specification Tier</span>
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {(['standard', 'premium', 'luxury'] as PackageLevel[]).map((pkg) => {
                const card = rateCards[serviceMode][pkg];
                const isSelected = packageLevel === pkg;
                return (
                  <button
                    key={pkg}
                    type="button"
                    onClick={() => setPackageLevel(pkg)}
                    className={`p-5 border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'border-[#111111] bg-[#111111] text-white shadow-lg'
                        : 'border-[#E0E0E0] bg-[#FAFAFA] text-[#111111] hover:border-[#111111]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider">{card.title.split(' ')[0]}</span>
                        {pkg === 'premium' && (
                          <span className="text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 bg-[#EA580C] text-[#111111]">
                            POPULAR
                          </span>
                        )}
                      </div>
                      <div className="flex items-baseline gap-1 my-1">
                        <span
                          className={`text-2xl font-bold font-serif ${isSelected ? 'text-[#EA580C]' : 'text-[#111111]'}`}
                          style={{ fontFamily: "'Lora', serif" }}
                        >
                          ₹{card.rate}
                        </span>
                        <span className={`text-[10px] font-bold uppercase ${isSelected ? 'text-white/60' : 'text-[#757575]'}`}>
                          /sqft
                        </span>
                      </div>
                      <p className={`text-[11px] leading-relaxed line-clamp-2 mt-2 ${isSelected ? 'text-white/80' : 'text-[#757575]'}`}>
                        {card.description}
                      </p>
                    </div>

                    <div className={`pt-3 mt-4 border-t text-[10px] space-y-1 ${isSelected ? 'border-white/20 text-white/70' : 'border-[#E0E0E0] text-[#757575]'}`}>
                      <p className="truncate"><strong>Steel:</strong> {card.steel.split('(')[0]}</p>
                      <p className="truncate"><strong>Finish:</strong> {card.flooring.split('(')[0]}</p>
                      <p className="font-bold text-[#EA580C] pt-1">{card.timeline}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Right Column: Live Architectural BOQ & Estimate Sheet (5 Cols) ── */}
        <div className="lg:col-span-5 bg-[#111111] text-white p-6 sm:p-10 flex flex-col justify-between space-y-8">
          {/* Top Estimate Summary */}
          <div className="space-y-6">
            <div className="border-b-2 border-white/20 pb-6 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#EA580C] block">
                Estimated Project Investment
              </span>
              <div
                className="text-4xl sm:text-6xl font-bold font-serif text-[#EA580C] tracking-tight"
                style={{ fontFamily: "'Lora', serif" }}
              >
                {formatIndianCurrency(totalCost)}
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-white/80 pt-1">
                <span>Total: <strong>{formatIndianFullNumber(totalCost)}</strong></span>
                <span>₹{ratePerSqFt}/sq.ft &times; {builtUpArea.toLocaleString()} sq.ft</span>
              </div>
            </div>

            {/* Itemized Stage Allocation Progress & Figures */}
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-white/90">
                <span>Itemized Stage Allocation</span>
                <span className="text-[#EA580C]">Indian BOQ Standards</span>
              </div>

              {/* Multi-segment visual bar */}
              <div className="h-3 w-full flex overflow-hidden border border-white/30">
                {currentConfig.breakdown.civil > 0 && (
                  <div
                    style={{ width: `${currentConfig.breakdown.civil}%` }}
                    className="bg-[#EA580C] h-full"
                    title={`Civil & Structural: ${currentConfig.breakdown.civil}%`}
                  />
                )}
                <div
                  style={{ width: `${currentConfig.breakdown.finishing}%` }}
                  className="bg-white h-full"
                  title={`Finishing: ${currentConfig.breakdown.finishing}%`}
                />
                <div
                  style={{ width: `${currentConfig.breakdown.mep}%` }}
                  className="bg-[#757575] h-full"
                  title={`MEP: ${currentConfig.breakdown.mep}%`}
                />
                {currentConfig.breakdown.interiors > 0 && (
                  <div
                    style={{ width: `${currentConfig.breakdown.interiors}%` }}
                    className="bg-[#E6C673] h-full"
                    title={`Modular Interiors: ${currentConfig.breakdown.interiors}%`}
                  />
                )}
              </div>

              {/* Breakdown Rows */}
              <div className="space-y-2.5 pt-2 text-xs">
                {currentConfig.breakdown.civil > 0 && (
                  <div className="flex items-center justify-between p-2.5 bg-[#181818] border border-white/10">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 bg-[#EA580C] inline-block shrink-0" />
                      <div>
                        <p className="font-bold uppercase text-white">Civil &amp; Structural ({currentConfig.breakdown.civil}%)</p>
                        <p className="text-[10px] text-white/50">Foundation, Steel, Cement, RCC Frame</p>
                      </div>
                    </div>
                    <span className="font-bold text-white font-mono">{formatIndianCurrency(calculatedCivil)}</span>
                  </div>
                )}

                <div className="flex items-center justify-between p-2.5 bg-[#181818] border border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-white inline-block shrink-0" />
                    <div>
                      <p className="font-bold uppercase text-white">Finishing &amp; Elevation ({currentConfig.breakdown.finishing}%)</p>
                      <p className="text-[10px] text-white/50">Flooring, Exterior Texture, Windows, Paint</p>
                    </div>
                  </div>
                  <span className="font-bold text-white font-mono">{formatIndianCurrency(calculatedFinishing)}</span>
                </div>

                <div className="flex items-center justify-between p-2.5 bg-[#181818] border border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-[#757575] inline-block shrink-0" />
                    <div>
                      <p className="font-bold uppercase text-white">MEP &amp; Sanitary ({currentConfig.breakdown.mep}%)</p>
                      <p className="text-[10px] text-white/50">Concealed Wiring, Plumbing, CP Diverters</p>
                    </div>
                  </div>
                  <span className="font-bold text-white font-mono">{formatIndianCurrency(calculatedMep)}</span>
                </div>

                {currentConfig.breakdown.interiors > 0 && (
                  <div className="flex items-center justify-between p-2.5 bg-[#181818] border border-white/10">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 bg-[#E6C673] inline-block shrink-0" />
                      <div>
                        <p className="font-bold uppercase text-white">Modular Interiors ({currentConfig.breakdown.interiors}%)</p>
                        <p className="text-[10px] text-white/50">100% BWR Marine Kitchen, Wardrobes</p>
                      </div>
                    </div>
                    <span className="font-bold text-white font-mono">{formatIndianCurrency(calculatedInteriors)}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Assurance Badges */}
            <div className="p-3 bg-[#181818] border border-[#333333] space-y-1.5 text-[11px] text-white/80">
              <div className="flex items-center gap-2 font-bold text-[#EA580C]">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>10-Year Written Structural Warranty Included</span>
              </div>
              <p className="text-white/60 leading-relaxed text-[10px]">
                Itemized BOQ with zero hidden inflation. Dedicated full-time site engineer with 400+ quality tests.
              </p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-3 pt-4 border-t-2 border-white/20">
            <a
              href={`https://wa.me/919841098490?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 bg-[#EA580C] hover:bg-white text-[#111111] font-bold text-xs uppercase tracking-widest transition-colors flex items-center justify-center gap-2 text-center"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Get Estimate on WhatsApp</span>
            </a>

            <a
              href="#quick-estimate"
              className="w-full py-3.5 border-2 border-white/40 hover:border-white text-white hover:bg-white hover:text-[#111111] font-bold text-xs uppercase tracking-widest transition-colors flex items-center justify-center gap-2 text-center"
            >
              <span>Book Site Feasibility Survey</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
