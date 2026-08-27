import { readSourceConfig } from '@/lib/dataBuilder';
import { cleanClinicName, cleanClinicDescription } from '@/lib/copyCleaner';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Building, Compass, Layers, ShieldCheck, HardHat, 
  CheckCircle2, Ruler, ArrowRight, Phone, Check, Wrench,
  Hammer, Sparkles, FileText, Zap, Award
} from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function Template5ServicesPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const data = await readSourceConfig(slug, 'template5');

  if (!data || !data.clinic) {
    notFound();
  }

  const clinicName = cleanClinicName(data.clinic.name);
  const clinicTagline = data.clinic.tagline || 'Integrated Architectural Design, Turnkey Residential Construction & Luxury Interiors';
  const clinicPhone = data.clinic.contact?.phone || '+91 81100 00384';

  const media = data.media || {};
  const archImg = media.clinicImages?.[1] || 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80';
  const civilImg = media.treatmentImages?.[0] || 'https://images.unsplash.com/photo-1541888946425-d0fbb18f15f6?auto=format&fit=crop&w=1200&q=80';
  const interiorImg = media.otherImages?.[0] || 'https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=1200&q=80';

  const basePath = `/designwebsite/template5/${slug}`;

  return (
    <div className="w-full bg-[#F8F7F4] text-[#1E2322]">
      {/* ─── Hero Banner Section ─── */}
      <section id="services-hero" className="relative py-20 sm:py-28 bg-white border-b border-[#1E2322]/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#181C1B] text-[#C49B45] text-xs font-mono font-semibold uppercase tracking-[0.2em] rounded-sm">
              <Compass className="w-3.5 h-3.5 text-[#C85A32]" />
              <span>END-TO-END CIVIL & ARCHITECTURAL SCOPE</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold uppercase text-[#1E2322] tracking-tight leading-[0.95]">
              OUR THREE CORE <span className="text-[#C85A32]">DISCIPLINES</span> & SPECIALIZATIONS
            </h1>
            <p className="text-sm sm:text-base font-semibold uppercase tracking-wider text-[#C49B45]">
              {clinicName} &bull; {clinicTagline}
            </p>
          </div>
        </div>
      </section>

      {/* ─── Discipline 1: Architectural Design ─── */}
      <section id="architecture-discipline" className="py-24 px-4 sm:px-8 bg-[#F8F7F4] border-b border-[#1E2322]/15">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-block px-3.5 py-1 bg-[#181C1B] text-[#C49B45] text-xs font-mono font-semibold uppercase tracking-[0.2em] rounded-sm">
                DISCIPLINE 01
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold uppercase text-[#1E2322] tracking-tight">
                ARCHITECTURAL DESIGNS & 3D BIM MODELING
              </h2>
              <p className="text-xs sm:text-sm text-[#1E2322]/85 font-sans leading-relaxed">
                Our licensed architectural studio develops tailor-made floor plans and 3D elevations based on functional ergonomics, micro-climate orientation, Vaastu guidelines, and your aesthetic desires.
              </p>

              <div className="space-y-3 pt-2">
                {[
                  { title: '2D Schematic & Vaastu Floor Plans', desc: 'Optimized space layouts ensuring maximum natural ventilation, sunlight, and seamless flow between zones.' },
                  { title: 'Photorealistic 3D Exterior Elevations', desc: 'Full high-definition 3D rendering with exact cladding textures, lighting fixtures, and landscape visualization.' },
                  { title: 'Structural Engineering & Soil Analysis', desc: 'IS 456 compliant column-beam schedules, foundation load calculations, and seismic reinforcement design.' },
                  { title: 'Municipal Approvals & Sanction Drawings', desc: 'End-to-end liaison with CMDA, DTCP, or municipal bodies for hassle-free building permits.' },
                ].map((item, idx) => (
                  <div key={idx} className="bg-white p-4 border border-[#1E2322]/15 rounded-sm shadow-sm hover:shadow-md hover:border-[#C85A32]/40 transition-all">
                    <h4 className="text-xs font-bold uppercase text-[#1E2322] tracking-tight">{item.title}</h4>
                    <p className="text-[11px] text-[#1E2322]/75 font-sans mt-1">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative h-96 sm:h-[500px] w-full border border-[#1E2322]/15 rounded-sm shadow-md bg-[#141716] overflow-hidden">
                <Image
                  src={archImg}
                  alt="Architectural BIM Design"
                  fill
                  className="object-cover"
                  sizes="600px"
                />
                <div className="absolute bottom-4 left-4 bg-[#181C1B]/90 backdrop-blur-sm text-[#C49B45] text-xs font-mono font-semibold uppercase tracking-widest px-4 py-2 border border-white/10 rounded-sm">
                  100% IN-HOUSE ARCHITECTURAL DESIGN
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Discipline 2: Residential Construction ─── */}
      <section id="construction-discipline" className="py-24 px-4 sm:px-8 bg-white border-b border-[#1E2322]/15">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 order-2 lg:order-1">
              <div className="relative h-96 sm:h-[500px] w-full border border-[#C85A32]/40 ring-1 ring-[#C85A32]/20 rounded-sm shadow-md bg-[#141716] overflow-hidden">
                <Image
                  src={civilImg}
                  alt="Civil Construction Execution"
                  fill
                  className="object-cover"
                  sizes="600px"
                />
                <div className="absolute bottom-4 left-4 bg-[#181C1B]/90 backdrop-blur-sm text-[#C49B45] text-xs font-mono font-semibold uppercase tracking-widest px-4 py-2 border border-white/10 rounded-sm">
                  LAB-TESTED MATERIALS & 10-YR GUARANTEE
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
              <div className="inline-block px-3.5 py-1 bg-[#C85A32] text-white text-xs font-mono font-semibold uppercase tracking-[0.2em] rounded-sm shadow-sm">
                DISCIPLINE 02
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold uppercase text-[#1E2322] tracking-tight">
                TURNKEY RESIDENTIAL CIVIL CONSTRUCTION
              </h2>
              <p className="text-xs sm:text-sm text-[#1E2322]/85 font-sans leading-relaxed">
                We handle the entire physical build from initial site excavation and foundation reinforcement through structural framing, masonry, electrical plumbing conduits, to pristine paint finishing.
              </p>

              <div className="space-y-3 pt-2">
                {[
                  { title: 'Sub-structure & Anti-Termite Foundation', desc: 'Raft/Isolated RCC footings with chemical termite barriers and high-density plinth beams.' },
                  { title: 'Fe550D TMT Reinforcement & Grade-53 Concrete', desc: 'Strict mix ratios, slump tests, and standard 21-day pond curing for maximum compressive strength.' },
                  { title: 'AAC Blocks / Wire-Cut Red Brick Masonry', desc: 'Precision straight-edge masonry with chicken mesh plastering to prevent shrinkage cracks.' },
                  { title: 'Concealed MEP with Pressure Testing', desc: 'Finolex FRLS electrical wiring, Astral CPVC pipes tested under 10-bar hydrostatic pressure.' },
                ].map((item, idx) => (
                  <div key={idx} className="bg-[#F8F7F4] p-4 border border-[#1E2322]/15 rounded-sm shadow-sm hover:shadow-md hover:border-[#C85A32]/40 transition-all">
                    <h4 className="text-xs font-bold uppercase text-[#1E2322] tracking-tight">{item.title}</h4>
                    <p className="text-[11px] text-[#1E2322]/75 font-sans mt-1">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Discipline 3: Interior Designs ─── */}
      <section id="interiors-discipline" className="py-24 px-4 sm:px-8 bg-[#F8F7F4] border-b border-[#1E2322]/15">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-block px-3.5 py-1 bg-[#181C1B] text-[#C49B45] text-xs font-mono font-semibold uppercase tracking-[0.2em] rounded-sm">
                DISCIPLINE 03
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold uppercase text-[#1E2322] tracking-tight">
                BESPOKE LUXURY INTERIOR FITOUTS
              </h2>
              <p className="text-xs sm:text-sm text-[#1E2322]/85 font-sans leading-relaxed">
                Our interior division works hand-in-hand with the civil engineering team from day one, eliminating costly rework and ensuring flawless integration of conduits, false ceiling pockets, and custom millwork.
              </p>

              <div className="space-y-3 pt-2">
                {[
                  { title: 'Modular Kitchens with Acrylic / PU Finish', desc: 'Precision CNC-cut BWR plywood cabinets with Hettich/Hafele soft-close fittings and quartz counters.' },
                  { title: 'Custom Wardrobes & Vanity Storage', desc: 'Floor-to-ceiling sliding/hinged wardrobes with integrated LED profiling and organizer trays.' },
                  { title: 'False Ceiling & Architectural Lighting', desc: 'Gypsum grid ceilings with concealed warm ambient profiles and magnetic track spotlights.' },
                  { title: 'Italian Marble & Designer Flooring', desc: 'Mirror-polished imported Italian marble, hardwood parquet, and designer Nexion vitrified slabs.' },
                ].map((item, idx) => (
                  <div key={idx} className="bg-white p-4 border border-[#1E2322]/15 rounded-sm shadow-sm hover:shadow-md hover:border-[#C85A32]/40 transition-all">
                    <h4 className="text-xs font-bold uppercase text-[#1E2322] tracking-tight">{item.title}</h4>
                    <p className="text-[11px] text-[#1E2322]/75 font-sans mt-1">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative h-96 sm:h-[500px] w-full border border-[#1E2322]/15 rounded-sm shadow-md bg-[#141716] overflow-hidden">
                <Image
                  src={interiorImg}
                  alt="Luxury Interior Fitouts"
                  fill
                  className="object-cover"
                  sizes="600px"
                />
                <div className="absolute bottom-4 left-4 bg-[#181C1B]/90 backdrop-blur-sm text-[#C49B45] text-xs font-mono font-semibold uppercase tracking-widest px-4 py-2 border border-white/10 rounded-sm">
                  FACTORY-FINISHED MODULAR JOINERY
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Bottom CTA Banner ─── */}
      <section className="py-20 px-4 sm:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-block px-3.5 py-1 bg-[#181C1B] text-[#C49B45] text-xs font-mono font-semibold uppercase tracking-[0.2em] rounded-sm">
            LET&apos;S BUILD TOGETHER
          </div>
          <h3 className="text-3xl sm:text-5xl font-bold uppercase text-[#1E2322] tracking-tight">
            READY TO START YOUR RESIDENTIAL PROJECT?
          </h3>
          <p className="text-xs sm:text-sm text-[#1E2322]/75 font-sans max-w-xl mx-auto leading-relaxed">
            Get an itemized civil and interior estimate with zero cost escalation guarantee.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href={`${basePath}#cost-calculator`}
              className="px-8 py-3.5 bg-[#C85A32] hover:bg-[#B34D28] text-white font-semibold text-xs uppercase tracking-widest rounded-sm shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
              CALCULATE PROJECT COST
            </Link>

            <Link
              href={`${basePath}/contact`}
              className="px-8 py-3.5 bg-[#1E2322] hover:bg-[#141716] text-white font-semibold text-xs uppercase tracking-widest rounded-sm shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
              BOOK SITE INSPECTION
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
