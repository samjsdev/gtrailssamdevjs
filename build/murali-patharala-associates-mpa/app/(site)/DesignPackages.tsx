import Link from 'next/link';
import { ArrowRight, Check, Minus, Ruler, Sparkles } from 'lucide-react';
import ArchitecturalDiagramBg from '@/components/ArchitecturalDiagramBg';

type DesignPackage = {
  number: string;
  name: string;
  purpose: string;
  price: string;
  featured?: boolean;
  includes: boolean[];
};

const DELIVERABLES = [
  { name: 'Scheme drawing — all floors', format: '2D' },
  { name: 'Elevation design', format: '3D' },
  { name: 'Initial site assessment', format: 'Add-on' },
  { name: 'Structural drawings', format: 'Technical' },
  { name: 'Soil test report', format: 'Add-on' },
  { name: 'Elevation detail drawing', format: '2D' },
  { name: 'Working drawing — all floors', format: '2D' },
  { name: 'Electrical drawing — all floors', format: '2D' },
  { name: 'Plumbing drawing — all floors', format: '2D' },
  { name: 'Interior views — all rooms', format: '3D' },
  { name: 'Interior detailing — all rooms', format: '2D' },
  { name: 'Detailed construction estimate', format: 'BOQ' },
];

const PACKAGES: DesignPackage[] = [
  {
    number: '01',
    name: 'Concept Design',
    purpose: 'Visualize your home',
    price: '₹45',
    includes: [true, true, true, false, false, false, false, false, false, false, false, true],
  },
  {
    number: '02',
    name: 'Construction Design',
    purpose: 'Prepare your home for construction',
    price: '₹85',
    featured: true,
    includes: [true, true, true, true, true, true, true, true, true, false, false, true],
  },
  {
    number: '03',
    name: 'Complete Home Design',
    purpose: 'Complete architecture + interiors',
    price: '₹115',
    includes: DELIVERABLES.map(() => true),
  },
];

const whatsappHref = (name: string) =>
  `https://wa.me/919841098490?text=${encodeURIComponent(
    `Hi Murali Patharala & Associates (MPA), I would like to discuss the ${name} package for my home in Chennai.`
  )}`;

export default function DesignPackages() {
  return (
    <section id="design-packages" className="relative overflow-hidden bg-[#FAFAF8] px-6 py-24 md:px-12 md:py-32 border-b border-[#111111]/15">
      <ArchitecturalDiagramBg variant="elevation" theme="light" opacity={0.11} showGrid={false} showCornerMarks={false} />
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[.7fr_1.3fr] gap-10 lg:gap-20 items-end mb-14 md:mb-20">
          <div>
            <div className="inline-flex items-center gap-2 text-[10px] font-mono tracking-[0.24em] uppercase text-[#777777]">
              <Ruler className="w-4 h-4 text-[#EA580C]" />
              Architectural scope / 2026
            </div>
            <h2 className="mt-5 text-4xl md:text-5xl font-bold tracking-tight leading-tight">
              Choose how far we take the design.
            </h2>
          </div>
          <p className="text-sm md:text-base leading-relaxed text-[#5F5F5F] max-w-2xl lg:justify-self-end">
            Every tier begins with a custom floor plan and exterior vision. Move up when you need construction-ready engineering, or choose the complete package to coordinate architecture and interiors before site work begins.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-5 mb-10">
          {PACKAGES.map((pkg) => (
            <article
              key={pkg.number}
              className={`relative flex flex-col border ${pkg.featured ? 'border-2 border-[#EA580C] bg-[#121418] text-white shadow-2xl lg:-translate-y-3' : 'border-[#111111]/20 bg-white text-[#111111]'}`}
            >
              <div className={`px-6 py-3 border-b flex items-center justify-between text-[10px] font-mono tracking-[0.18em] uppercase ${pkg.featured ? 'bg-[#EA580C] text-[#111111] border-[#EA580C]' : 'bg-[#F0ECE5] border-[#111111]/10 text-[#666666]'}`}>
                <span>Package {pkg.number}</span>
                <span>{pkg.featured ? 'Construction ready' : 'Design service'}</span>
              </div>
              <div className="p-7 md:p-8 flex flex-col flex-1">
                <h3 className="text-2xl font-bold">{pkg.name}</h3>
                <p className={`mt-2 text-sm ${pkg.featured ? 'text-white/60' : 'text-[#777777]'}`}>{pkg.purpose}</p>
                <div className="mt-7 flex items-baseline gap-2">
                  <span className={`text-5xl font-bold ${pkg.featured ? 'text-[#FB923C]' : 'text-[#111111]'}`}>{pkg.price}</span>
                  <span className={`text-xs font-bold uppercase tracking-wider ${pkg.featured ? 'text-white/55' : 'text-[#777777]'}`}>per sq.ft</span>
                </div>

                <div className={`my-7 h-px ${pkg.featured ? 'bg-white/15' : 'bg-[#111111]/12'}`} />
                <ul className="space-y-3 flex-1">
                  {DELIVERABLES.map((item, index) => pkg.includes[index] && (
                    <li key={item.name} className="flex items-start gap-3 text-xs leading-relaxed">
                      <Check className="w-4 h-4 text-[#EA580C] shrink-0 mt-0.5" strokeWidth={3} />
                      <span>{item.name}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={whatsappHref(pkg.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-8 py-4 px-5 inline-flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.16em] transition-colors ${pkg.featured ? 'bg-[#EA580C] text-[#111111] hover:bg-white' : 'bg-[#111111] text-white hover:bg-[#EA580C] hover:text-[#111111]'}`}
                >
                  Enquire about this package <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="hidden lg:block border border-[#111111]/20 bg-white overflow-hidden">
          <div className="grid grid-cols-[1.5fr_repeat(3,1fr)] bg-[#111111] text-white">
            <div className="p-5 text-xs font-bold uppercase tracking-[0.18em]">Full deliverables comparison</div>
            {PACKAGES.map((pkg) => (
              <div key={pkg.number} className="p-5 border-l border-white/15 text-center text-xs font-bold uppercase tracking-wide">{pkg.name}</div>
            ))}
          </div>
          {DELIVERABLES.map((item, rowIndex) => (
            <div key={item.name} className={`grid grid-cols-[1.5fr_repeat(3,1fr)] ${rowIndex % 2 ? 'bg-[#F5F2EC]' : 'bg-white'} border-t border-[#111111]/10`}>
              <div className="p-4 flex items-center justify-between gap-4 text-xs font-semibold">
                <span>{item.name}</span>
                <span className="font-mono text-[9px] text-[#8A8A8A] uppercase">{item.format}</span>
              </div>
              {PACKAGES.map((pkg) => (
                <div key={pkg.number} className="p-4 border-l border-[#111111]/10 flex justify-center items-center" aria-label={`${pkg.includes[rowIndex] ? 'Included in' : 'Not included in'} ${pkg.name}`}>
                  {pkg.includes[rowIndex] ? <Check className="w-5 h-5 text-[#EA580C]" strokeWidth={3} /> : <Minus className="w-4 h-4 text-[#B0B0B0]" />}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col md:flex-row md:items-center justify-between gap-6 border border-[#111111]/15 bg-[#E8E2D9] p-6 md:p-8">
          <div className="flex items-start gap-4">
            <Sparkles className="w-6 h-6 text-[#EA580C] shrink-0" />
            <div>
              <h3 className="text-lg font-bold">Building with MPA after design?</h3>
              <p className="text-sm text-[#666666] mt-1">See the turnkey construction standards, material brands and fixed rates.</p>
            </div>
          </div>
          <Link href="/construction-package" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#111111] text-white text-xs font-bold uppercase tracking-[0.15em] hover:bg-[#EA580C] hover:text-[#111111] transition-colors shrink-0">
            View construction packages <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <p className="mt-5 text-[11px] text-[#777777] leading-relaxed">
          * Initial site assessment and soil testing are charged separately where required. Final scope and professional fees are confirmed after plot and project review.
        </p>
      </div>
    </section>
  );
}
