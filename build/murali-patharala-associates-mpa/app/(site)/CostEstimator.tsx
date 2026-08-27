'use client';

import { useState, useMemo } from 'react';
import { 
  Calculator, CheckCircle2, ArrowRight, ShieldCheck, 
  Sparkles, Check, Home, Clock, Ruler, Compass, MessageSquare,
  Building2, Layers, HardHat, FileText, ChevronRight
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
        rate: 2050,
        title: 'Standard Turnkey',
        description: 'Complete end-to-end home construction with essential modular interiors for budget-conscious families.',
        steel: 'FE 550 Grade ISI TMT Steel (Kamachi / ARS)',
        cement: '53-Grade PPC (Coromandel / Chettinad)',
        flooring: '2x2 Premium Vitrified Tiles (Somany / Kajaria)',
        fixtures: 'Parryware / Cera Ceramic Fittings',
        interiors: 'ISI Commercial Plywood Modular Kitchen & Wardrobes',
        timeline: '7 - 9 Months Execution',
        breakdown: { civil: 48, finishing: 22, mep: 12, interiors: 18 },
      },
      premium: {
        rate: 2450,
        title: 'Premium Turnkey (Most Popular)',
        description: 'Architect-designed luxury home construction with high-grade materials and bespoke modular interiors.',
        steel: 'Primary TMT Steel (Tata Tiscon / JSW Neosteel)',
        cement: 'UltraTech / Ramco Supergrade 53-Grade',
        flooring: '4x2 Glazed Vitrified Tiles or Spanish Granite',
        fixtures: 'Jaquar / Kohler Concealed Diverters & Wall-Hung EWCs',
        interiors: '100% BWR Marine Plywood (IS:710) Acrylic Kitchen & Veneer Paneling',
        timeline: '8 - 11 Months Execution',
        breakdown: { civil: 44, finishing: 23, mep: 13, interiors: 20 },
      },
      luxury: {
        rate: 2950,
        title: 'Ultra Luxury Villa',
        description: 'Bespoke architectural residence featuring imported Italian marble, automated systems, and artisan interiors.',
        steel: 'Corrosion-Resistant Tata Tiscon 550D TMT',
        cement: 'UltraTech Super / Coromandel King',
        flooring: 'Imported Italian Marble / Engineered Hardwood',
        fixtures: 'Grohe / Bravat / Kohler Rose Gold Collections',
        interiors: 'Birch Marine Plywood + Smoked Oak Veneer + Fluted Glass Island',
        timeline: '10 - 14 Months Execution',
        breakdown: { civil: 40, finishing: 25, mep: 13, interiors: 22 },
      },
    },
    construction: {
      standard: {
        rate: 1650,
        title: 'Standard Civil & Shell',
        description: 'Complete civil structure, masonry, plastering, plumbing, and basic flooring without interior cabinetry.',
        steel: 'FE 550 Grade ISI TMT Steel',
        cement: 'Coromandel / Chettinad 53 Grade',
        flooring: 'Standard Vitrified Tiles',
        fixtures: 'Standard Sanitary & CP Fittings',
        interiors: 'Excludes modular woodwork',
        timeline: '6 - 8 Months Execution',
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
        timeline: '7 - 9 Months Execution',
        breakdown: { civil: 55, finishing: 28, mep: 17, interiors: 0 },
      },
      luxury: {
        rate: 2450,
        title: 'Luxury Villa Construction',
        description: 'Architectural structural engineering, cantilevered balconies, double-height ceilings, and thermal insulation.',
        steel: 'Tata Tiscon Super-Ductile 550D',
        cement: 'UltraTech Premium Ready-Mix / Grade 53',
        flooring: 'Italian Marble Provision & Premium Granites',
        fixtures: 'Grohe / Bravat Concealed Cisterns',
        interiors: 'Excludes modular woodwork',
        timeline: '9 - 12 Months Execution',
        breakdown: { civil: 52, finishing: 30, mep: 18, interiors: 0 },
      },
    },
    interiors: {
      standard: {
        rate: 1150,
        title: 'Essential Modular Interior',
        description: 'Functional modular kitchen, wardrobes in 2 bedrooms, TV console, and basic false ceiling with LED strips.',
        steel: 'Hardware: Hettich Standard Soft-Close',
        cement: 'Wall Finishes: Asian Paints Tractor Emulsion',
        flooring: 'Existing Flooring Retained',
        fixtures: 'Sink & Faucets: Carysil Quartz',
        interiors: 'ISI BWP Hardwood Plywood + 0.8mm Laminates',
        timeline: '30 - 35 Working Days',
        breakdown: { civil: 0, finishing: 15, mep: 10, interiors: 75 },
      },
      premium: {
        rate: 1650,
        title: 'Designer Residence Interior',
        description: '100% BWR Marine Plywood kitchen with quartz counter, acrylic wardrobes, designer false ceilings, and fluted paneling.',
        steel: 'Hardware: Häfele Soft-Close Tandem Boxes',
        cement: 'Wall Finishes: Asian Paints Royale Luxury Emulsion',
        flooring: 'Accent Wooden / Tile Inlays',
        fixtures: 'Quartz Countertops & Under-Mount Sink',
        interiors: '100% BWR Marine Plywood (IS:710) + Acrylic & Veneer',
        timeline: '40 - 45 Working Days',
        breakdown: { civil: 0, finishing: 18, mep: 12, interiors: 70 },
      },
      luxury: {
        rate: 2350,
        title: 'Bespoke Luxury Interior',
        description: 'Full architectural millwork, smoked oak veneers, Italian marble highlights, walk-in closets, and smart mood lighting.',
        steel: 'Hardware: Blum Servo-Drive Motorized Opening',
        cement: 'Wall Finishes: Italian Stucco / Microcement',
        flooring: 'Italian Marble Re-Polishing & Inlays',
        fixtures: 'Designer Matt Black / Gold Fixtures',
        interiors: 'European Birch Ply + Smoked Oak Veneer + Tinted Glass',
        timeline: '55 - 65 Working Days',
        breakdown: { civil: 0, finishing: 20, mep: 15, interiors: 65 },
      },
    },
  };

  const currentConfig = rateCards[serviceMode][packageLevel];
  const ratePerSqFt = currentConfig.rate;

  // Floor adjustment factor: G is 1.0, G+1 has slight structural efficiency, but total area multiplies
  const totalCost = useMemo(() => {
    return builtUpArea * ratePerSqFt;
  }, [builtUpArea, ratePerSqFt]);

  // Format currency into Indian Lakhs / Crores
  const formatIndianCurrency = (val: number) => {
    if (val >= 10000000) {
      return `₹${(val / 10000000).toFixed(2)} Crores`;
    }
    return `₹${(val / 100000).toFixed(2)} Lakhs`;
  };

  const calculatedCivil = Math.round((totalCost * currentConfig.breakdown.civil) / 100);
  const calculatedFinishing = Math.round((totalCost * currentConfig.breakdown.finishing) / 100);
  const calculatedMep = Math.round((totalCost * currentConfig.breakdown.mep) / 100);
  const calculatedInteriors = Math.round((totalCost * currentConfig.breakdown.interiors) / 100);

  const whatsappMessage = encodeURIComponent(
    `Hi ARCH Foundations & Murali Patharala Associates,\nI calculated my estimate on your website:\n- Service: ${serviceMode === 'turnkey' ? 'Turnkey Construction + Interiors' : serviceMode === 'construction' ? 'Civil Construction' : 'Interior Design'}\n- Built-up Area: ${builtUpArea} Sq.Ft (${floors === 1 ? 'G' : floors === 2 ? 'G+1' : floors === 3 ? 'G+2' : 'G+3'})\n- Package: ${currentConfig.title} (₹${ratePerSqFt}/sq.ft)\n- Estimated Investment: ${formatIndianCurrency(totalCost)}\nI would like to schedule a site inspection in Chennai.`
  );

  return (
    <div className="w-full bg-white border border-stone-200 rounded-lg shadow-md overflow-hidden font-sans">
      {/* Header strip */}
      <div className="bg-[#FAF9F7] text-stone-900 p-6 sm:p-8 border-b border-stone-200">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-50 border border-orange-200 rounded-full text-xs font-semibold text-[#E64D16] uppercase tracking-wider">
              <Calculator className="w-3.5 h-3.5 text-[#E64D16]" />
              <span>Chennai Market Rates (2026 Edition)</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900">
              Home Construction &amp; Interior Cost Calculator
            </h3>
            <p className="text-xs sm:text-sm text-stone-500 font-normal">
              Transparent, itemized pricing based on 28+ years of construction data in Chennai. No hidden charges.
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-3 bg-white border border-stone-200 px-4 py-2.5 rounded-md shadow-xs">
            <ShieldCheck className="w-6 h-6 text-[#E64D16]" />
            <div className="text-left text-xs">
              <div className="text-stone-900 font-bold">100% Fixed-Price</div>
              <div className="text-stone-500 text-[11px]">Zero Cost Overruns</div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 sm:p-10 space-y-10">
        {/* ─── Step 1: Select Service Scope ─── */}
        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-stone-500 block">
            Step 1: Choose Your Project Scope
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              type="button"
              onClick={() => setServiceMode('turnkey')}
              className={`p-4 rounded-md border-2 text-left transition-all relative ${
                serviceMode === 'turnkey'
                  ? 'border-[#E64D16] bg-orange-50/50 shadow-sm'
                  : 'border-stone-200 hover:border-stone-300 bg-stone-50/50'
              }`}
            >
              {serviceMode === 'turnkey' && (
                <span className="absolute top-3 right-3 w-5 h-5 rounded-full bg-[#E64D16] text-white flex items-center justify-center text-xs">
                  ✓
                </span>
              )}
              <div className="w-9 h-9 rounded-md bg-orange-100 text-[#E64D16] flex items-center justify-center mb-2 font-bold">
                <Home className="w-5 h-5" />
              </div>
              <div className="font-bold text-sm text-stone-900">Turnkey Home (Civil + Interior)</div>
              <div className="text-xs text-stone-600 mt-1">
                Complete solution from foundation to key handover with modular woodwork.
              </div>
            </button>

            <button
              type="button"
              onClick={() => setServiceMode('construction')}
              className={`p-4 rounded-md border-2 text-left transition-all relative ${
                serviceMode === 'construction'
                  ? 'border-[#E64D16] bg-orange-50/50 shadow-sm'
                  : 'border-stone-200 hover:border-stone-300 bg-stone-50/50'
              }`}
            >
              {serviceMode === 'construction' && (
                <span className="absolute top-3 right-3 w-5 h-5 rounded-full bg-[#E64D16] text-white flex items-center justify-center text-xs">
                  ✓
                </span>
              )}
              <div className="w-9 h-9 rounded-md bg-amber-100 text-[#C9A25C] flex items-center justify-center mb-2 font-bold">
                <Building2 className="w-5 h-5" />
              </div>
              <div className="font-bold text-sm text-stone-900">Residential Construction Only</div>
              <div className="text-xs text-stone-600 mt-1">
                Foundation, RCC framing, brickwork, plastering, plumbing, electrical &amp; flooring.
              </div>
            </button>

            <button
              type="button"
              onClick={() => setServiceMode('interiors')}
              className={`p-4 rounded-md border-2 text-left transition-all relative ${
                serviceMode === 'interiors'
                  ? 'border-[#E64D16] bg-orange-50/50 shadow-sm'
                  : 'border-stone-200 hover:border-stone-300 bg-stone-50/50'
              }`}
            >
              {serviceMode === 'interiors' && (
                <span className="absolute top-3 right-3 w-5 h-5 rounded-full bg-[#E64D16] text-white flex items-center justify-center text-xs">
                  ✓
                </span>
              )}
              <div className="w-9 h-9 rounded-md bg-stone-200 text-stone-800 flex items-center justify-center mb-2 font-bold">
                <Layers className="w-5 h-5" />
              </div>
              <div className="font-bold text-sm text-stone-900">Complete Interiors Only</div>
              <div className="text-xs text-stone-600 mt-1">
                Modular kitchen, bedroom wardrobes, false ceiling, painting &amp; lighting.
              </div>
            </button>
          </div>
        </div>

        {/* ─── Step 2: Area Slider & Floor Selector ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 bg-stone-50/80 border border-stone-200 rounded-md">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-600">
                Step 2: Total Built-up Area
              </label>
              <div className="text-right">
                <span className="text-2xl font-bold text-[#E64D16]">{builtUpArea.toLocaleString()}</span>
                <span className="text-xs font-semibold text-stone-600 ml-1">Sq.Ft</span>
              </div>
            </div>

            <input
              type="range"
              min="1000"
              max="6500"
              step="50"
              value={builtUpArea}
              onChange={(e) => setBuiltUpArea(Number(e.target.value))}
              className="w-full h-2.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-[#E64D16]"
              aria-label="Adjust built-up area in square feet"
            />

            {/* Quick Presets */}
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="text-[11px] font-semibold text-stone-500 self-center">Presets:</span>
              {[1200, 1800, 2400, 3200, 4500].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setBuiltUpArea(preset)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    builtUpArea === preset
                      ? 'bg-[#242624] text-white'
                      : 'bg-white text-stone-700 border border-stone-200 hover:border-stone-400'
                  }`}
                >
                  {preset} Sq.Ft
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 space-y-3 lg:border-l lg:border-stone-200 lg:pl-6">
            <label className="text-xs font-bold uppercase tracking-wider text-stone-600 block">
              Floor Configuration
            </label>
            <div className="grid grid-cols-4 gap-2">
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
                  className={`py-2 rounded-md text-xs font-bold transition-all text-center ${
                    floors === f.val
                      ? 'bg-[#E64D16] text-white shadow-xs'
                      : 'bg-white text-stone-700 border border-stone-200 hover:border-stone-400'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <div className="text-[11px] text-stone-500">
              {floors === 1 ? 'Ground floor independent home' : `${floors - 1} Upper floor(s) duplex/villa structure`}
            </div>
          </div>
        </div>

        {/* ─── Step 3: Package Level ─── */}
        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-stone-500 block">
            Step 3: Choose Specification Tier
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {(['standard', 'premium', 'luxury'] as PackageLevel[]).map((pkg) => {
              const card = rateCards[serviceMode][pkg];
              const isSelected = packageLevel === pkg;
              return (
                <button
                  key={pkg}
                  type="button"
                  onClick={() => setPackageLevel(pkg)}
                  className={`p-5 rounded-md border-2 text-left transition-all relative ${
                    isSelected
                      ? 'border-[#E64D16] bg-orange-50/40 shadow-md ring-2 ring-orange-500/20'
                      : 'border-stone-200 hover:border-stone-300 bg-white'
                  }`}
                >
                  {pkg === 'premium' && (
                    <span className="absolute -top-3 left-4 px-2.5 py-0.5 bg-[#E64D16] text-white text-[10px] font-extrabold uppercase tracking-wider rounded-full shadow-xs">
                      Recommended
                    </span>
                  )}
                  <div className="flex items-baseline justify-between gap-2">
                    <div className="font-bold text-base text-stone-900">{card.title}</div>
                    <div className="text-right">
                      <span className="text-lg font-black text-[#E64D16]">₹{card.rate}</span>
                      <span className="text-[10px] text-stone-500 font-semibold">/sqft</span>
                    </div>
                  </div>

                  <p className="text-xs text-stone-600 mt-2 font-normal leading-relaxed">
                    {card.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-stone-100 space-y-1.5 text-[11px] text-stone-700">
                    <div className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#E64D16] shrink-0 mt-0.5" />
                      <span><strong>Steel/Frame:</strong> {card.steel}</span>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#E64D16] shrink-0 mt-0.5" />
                      <span><strong>Finishes:</strong> {card.flooring}</span>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#C9A25C] shrink-0 mt-0.5" />
                      <span>{card.timeline}</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 4: Estimated investment & live breakdown */}
        <div className="bg-[#E64D16] text-white rounded-lg p-6 sm:p-8 shadow-xl space-y-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_80%_20%,#fff,transparent_50%)] pointer-events-none" />
          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Grand total */}
            <div className="lg:col-span-6 space-y-2">
              <div className="text-xs uppercase tracking-widest text-[#FAD4C0] font-bold">
                Estimated Project Investment
              </div>
              <div className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                {formatIndianCurrency(totalCost)}
              </div>
              <div className="text-xs text-white/85">
                Calculated at <span className="font-semibold text-white">₹{ratePerSqFt} per Sq.Ft</span> for{' '}
                <strong className="text-white">{builtUpArea.toLocaleString()} Sq.Ft</strong> built-up area.
              </div>
            </div>

            {/* Actions */}
            <div className="lg:col-span-6 flex flex-wrap items-center gap-3 lg:justify-end relative">
              <a
                href={`https://wa.me/919841098490?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-white hover:bg-stone-100 text-[#A6340C] font-bold text-xs uppercase tracking-wider rounded-md transition-all shadow-md flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Send Estimate via WhatsApp</span>
              </a>

              <a
                href="#consultation-form"
                className="px-6 py-3.5 bg-[#242624] hover:bg-[#1A1B1A] text-white font-bold text-xs uppercase tracking-wider rounded-md transition-all shadow-md flex items-center gap-2"
              >
                <span>Book Site Survey</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Itemized budget breakdown bars */}
          <div className="relative pt-4 border-t border-white/25 space-y-4">
            <div className="text-xs uppercase tracking-wider text-[#FAD4C0] font-semibold flex items-center justify-between">
              <span>Itemized Stage Allocation</span>
              <span>Based on Standard PWD / Indian Architectural BOQ</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {currentConfig.breakdown.civil > 0 && (
                <div className="p-3 bg-white/10 border border-white/20 rounded-md space-y-1">
                  <div className="text-[11px] text-white/80 font-medium">Civil &amp; Structural ({currentConfig.breakdown.civil}%)</div>
                  <div className="text-base font-bold text-white">{formatIndianCurrency(calculatedCivil)}</div>
                  <div className="text-[10px] text-white/60">Foundation, Steel, Cement, RCC Frame</div>
                </div>
              )}

              <div className="p-3 bg-white/10 border border-white/20 rounded-md space-y-1">
                <div className="text-[11px] text-white/80 font-medium">Finishing &amp; Elevation ({currentConfig.breakdown.finishing}%)</div>
                <div className="text-base font-bold text-white">{formatIndianCurrency(calculatedFinishing)}</div>
                <div className="text-[10px] text-white/60">Flooring, Exterior Plaster, Windows, Paint</div>
              </div>

              <div className="p-3 bg-white/10 border border-white/20 rounded-md space-y-1">
                <div className="text-[11px] text-white/80 font-medium">MEP &amp; Sanitary ({currentConfig.breakdown.mep}%)</div>
                <div className="text-base font-bold text-white">{formatIndianCurrency(calculatedMep)}</div>
                <div className="text-[10px] text-white/60">Concealed Wiring, Plumbing, CP Fittings</div>
              </div>

              {currentConfig.breakdown.interiors > 0 && (
                <div className="p-3 bg-white/10 border border-white/20 rounded-md space-y-1">
                  <div className="text-[11px] text-white font-medium">Modular Interiors ({currentConfig.breakdown.interiors}%)</div>
                  <div className="text-base font-bold text-white">{formatIndianCurrency(calculatedInteriors)}</div>
                  <div className="text-[10px] text-white/60">BWR Kitchen, Wardrobes, False Ceiling</div>
                </div>
              )}
            </div>
          </div>

          {/* Guarantees note */}
          <div className="relative pt-2 flex flex-wrap items-center justify-between gap-4 text-[11px] text-white/85">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Includes 10-Year Structural Guarantee &bull; Dedicated Site Engineer &bull; 400+ Quality Checks</span>
            </div>
            <div className="text-[#FAD4C0]">
              * Exact investment varies based on soil bearing capacity &amp; site conditions.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
