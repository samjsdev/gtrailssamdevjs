'use client';

import { NICHES, REGIONS, type SiteCopy } from '@/lib/niches';

type NichePickerProps = {
  nicheIds: string[];
  subNicheIds: string[];
  regionIds?: string[];
  voice: SiteCopy | null;
  onToggleNiche: (id: string) => void;
  onToggleSub: (nicheId: string, subId: string) => void;
  onToggleRegion?: (id: string) => void;
};

export default function NichePicker({
  nicheIds,
  subNicheIds,
  regionIds = [],
  voice,
  onToggleNiche,
  onToggleSub,
  onToggleRegion,
}: NichePickerProps) {
  const selected = new Set(nicheIds);
  const selectedSubs = new Set(subNicheIds);
  const selectedRegions = new Set(regionIds);

  return (
    <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-6 py-5 border-b border-slate-100 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-lg font-extrabold text-slate-900">Niches</h2>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl">
            Check every niche this business should speak as. Combinations are allowed — services, description, and photos blend across the boxes you leave on. Save, then open View Site.
          </p>
        </div>
        <p className="text-xs font-semibold text-slate-400 md:text-right">
          Photos: <span className="font-mono text-slate-500">public/images/niches</span>
        </p>
      </div>

      {/* Target Region Checkboxes */}
      <div className="px-6 py-4 bg-slate-50/80 border-b border-slate-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-700">Target Region (Market & Climate)</h3>
            <p className="text-xs text-slate-500">
              Select your operating region to automatically adapt building codes, statutory highlights, and localized photography.
            </p>
          </div>
          <span className="text-[11px] font-semibold text-slate-400">
            Regional photos: <span className="font-mono text-slate-500">public/images/niches/regions/</span>
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {REGIONS.map((region) => {
            const isRegOn = selectedRegions.has(region.id);
            return (
              <label
                key={region.id}
                className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                  isRegOn
                    ? 'border-emerald-400 bg-emerald-50/70 shadow-xs ring-1 ring-emerald-300'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <input
                  type="checkbox"
                  checked={isRegOn}
                  onChange={() => onToggleRegion && onToggleRegion(region.id)}
                  className="mt-0.5 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-extrabold text-slate-900">{region.label}</span>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                      {region.country}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5">{region.tagline}</p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {region.highlights.map((h, i) => (
                      <span
                        key={i}
                        className={`text-[10px] font-medium px-2 py-0.5 rounded-md ${
                          isRegOn ? 'bg-emerald-100/80 text-emerald-800' : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </label>
            );
          })}
        </div>
      </div>

      <div className="p-4 md:p-6 grid grid-cols-1 lg:grid-cols-2 gap-3">
        {NICHES.map((niche) => {
          const on = selected.has(niche.id);
          return (
            <div
              key={niche.id}
              className={`rounded-xl border p-4 transition-colors ${
                on ? 'border-indigo-300 bg-indigo-50/60' : 'border-slate-200 bg-slate-50/40'
              }`}
            >
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={on}
                  onChange={() => onToggleNiche(niche.id)}
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span>
                  <span className="block text-sm font-bold text-slate-900">
                    {niche.label}
                    {typeof niche.leads === 'number' && (
                      <span className="ml-2 text-[11px] font-semibold text-slate-400">{niche.leads} leads</span>
                    )}
                  </span>
                  <span className="block text-xs text-slate-500 mt-1">{niche.tagline}</span>
                </span>
              </label>

              <div className={`mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 ${on ? '' : 'opacity-70'}`}>
                {niche.subNiches.map((sub) => (
                  <label key={sub.id} className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedSubs.has(sub.id)}
                      onChange={() => onToggleSub(niche.id, sub.id)}
                      className="h-3.5 w-3.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span>
                      {sub.label}
                      {typeof sub.leads === 'number' && (
                        <span className="text-slate-400"> · {sub.leads}</span>
                      )}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {voice && (
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 text-sm text-slate-700">
          <p className="font-semibold text-slate-900">{voice.tagline}</p>
          <p className="mt-2 text-slate-600">{voice.services.join(' · ')}</p>
          <p className="mt-2 text-xs text-slate-500">
            Add images in {voice.nicheIds.map((id) => `public/images/niches/${id}`).join(', ')} under heroes, gallery, services, about, and people. Empty folders keep a built-in photo for that niche.
          </p>
        </div>
      )}
    </section>
  );
}
