'use client';

const INTERIOR_SERVICES = [
  'Modular Kitchen',
  'Storage & Wardrobes',
  'False Ceiling & Lights',
  'TV Units & Wall Paneling',
  'Crockery & Bar Units',
  'Study & Home Office',
  'Pooja Units',
  'Shoe Racks & Foyers',
];

export default function InteriorSwitcher() {
  return (
    <section className="border-b-4 border-[#111111] bg-surface-sand text-[#302A20]">
      {/* ── Anti-Cookie-Cutter Package Manifesto ── */}
      <div className="p-8 md:p-16 bg-surface-linen">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="inline-block px-3 py-1 bg-[#EA580C]/20 border border-[#EA580C] text-[#703015] text-[11px] font-bold uppercase tracking-widest">
            Signature Luxury Interiors &bull; End-to-End Solutions
          </div>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-[#302A20] tracking-tight leading-tight"
            style={{ fontFamily: "var(--font-content)" }}
          >
            Package..? Seriously..? <br />
            <span className="text-[#703015]">Your Dream Home Isn&apos;t a &lsquo;One-Size-Fits-All&rsquo; Scenario.</span>
          </h2>
          <p className="text-ink-muted text-sm sm:text-base leading-relaxed font-medium">
            You must have seen those tempting ads from assembly-line vendors: <em>&ldquo;Get your full-home interior package for just 6.5 Lakhs!&rdquo;</em> where they promise a cookie-cutter kitchen and identical wardrobes. But let&apos;s face it—in the real world, one-size-fits-all interior packages are more myth than magic. Settling for a standard catalog package is like wearing someone else&apos;s shoes: uncomfortable, ill-fitting, and compromised.
          </p>
          <p className="text-ink-muted text-sm sm:text-base leading-relaxed font-medium">
            At <span className="brand-name">Murali Patharala & Associates</span> (MPA), we don&apos;t just install cupboards and countertops; we curate bespoke architectural living environments. Every millwork joint, fabric texture, lighting channel, and material finish is tailored to your family&apos;s specific daily rhythm, ceiling height, and floor plan.
          </p>

          {/* Scope of Interior Elements Grid */}
          <div className="pt-4">
            <p className="text-xs font-bold uppercase tracking-widest text-[#703015] mb-4">
              Comprehensive In-House Interior Capabilities:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {INTERIOR_SERVICES.map((srv, idx) => (
                <div key={idx} className="p-3 bg-surface-linen border border-[#333333] flex items-center gap-2">
                  <span className="text-[#703015] text-xs font-bold">✔</span>
                  <span className="text-xs font-semibold text-ink-muted">{srv}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
