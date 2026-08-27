import { readSourceConfig } from '@/lib/sourceData';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Building2, Compass, Layers, ShieldCheck, 
  CheckCircle2, Ruler, ArrowRight, Phone, Check, 
  Sparkles, Box, Palette, LayoutGrid, HardHat, FileText
} from 'lucide-react';

interface PageProps {
  params?: any;
}

export default async function ServicesPage({ params }: PageProps) {
  const data = await readSourceConfig(undefined, 'template5');

  if (!data || !data.clinic) {
    notFound();
  }

  const clinicPhone = '98410 98490';
  const media = data.media || {};

  return (
    <div className="w-full bg-[#FAF9F7] text-[#1A1B1A] font-sans">
      {/* ─── Hero Banner Section ─── */}
      <section id="services-hero" className="relative py-20 sm:py-28 bg-[#1A1B1A] text-white overflow-hidden">
        <Image
          src="/images/stock/6dcb103c.webp"
          alt="Architectural design and construction services"
          fill
          className="object-cover opacity-55"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1B1A]/75 via-[#1A1B1A]/35 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#E64D16]/20 border border-[#E64D16]/50 rounded-full text-xs font-bold text-[#E6C673] tracking-wide uppercase backdrop-blur-sm">
              <Compass className="w-3.5 h-3.5" />
              <span>Full-Scope Services &bull; Anna Nagar East Studio</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight leading-tight">
              Architectural Design, Construction &amp; <span className="text-[#E64D16]">Bespoke Interiors</span>
            </h1>
            <p className="text-sm sm:text-base text-stone-200 font-normal leading-relaxed">
              ARCH Foundations &amp; Murali Patharala Associates (MPA) provides an integrated, one-stop building experience across Chennai since 1998.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Discipline 1: Architectural Design & 3D Elevations ─── */}
      <section id="architecture" className="py-20 sm:py-24 px-4 sm:px-8 bg-[#FAF9F7] border-b border-stone-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-block px-3.5 py-1 bg-white border border-stone-200 rounded-lg text-xs font-bold text-[#E64D16] uppercase tracking-wider shadow-2xs">
                Discipline 01
              </div>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight leading-tight">
                Architectural Design &amp; 3D Photorealistic Elevations
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 font-normal leading-relaxed">
                Before a single brick is laid, our architects craft tailored spatial concepts, solar shading calculations, and photorealistic 3D elevations. Every residence is harmonized with modern aesthetics and strict Vastu Shastra principles.
              </p>

              <div className="space-y-3 pt-2 text-xs">
                {[
                  { title: 'Custom 2D Floor Plans & Furniture Layouts', desc: 'Optimized space flow, ventilation shafts, and room dimensions mapped to your family lifestyle.' },
                  { title: '3D Exterior Elevations & Color Schemes', desc: 'Realistic daylight and night-lit architectural renderings visualizing your complete facade.' },
                  { title: 'CMDA & DTCP Sanction Plan Drawings', desc: 'Statutory compliance drawings prepared and processed with local municipal authorities in Chennai.' },
                  { title: 'Structural & Foundation Engineering', desc: 'Precision structural drawings detailing column sizes, footing depth, and beam rebar spacing.' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3.5 bg-white border border-stone-200 rounded-md">
                    <div className="w-5 h-5 rounded-full bg-orange-100 text-[#E64D16] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      ✓
                    </div>
                    <div>
                      <h4 className="font-bold text-stone-900">{item.title}</h4>
                      <p className="text-stone-600 mt-0.5 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <Link
                  href="/#consultation-form"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#E64D16] hover:bg-[#C93F0F] text-white font-bold text-xs uppercase tracking-wider rounded-md transition-all shadow-xs"
                >
                  <span>Book Architectural Consultation</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative aspect-4/3 w-full overflow-hidden">
                <Image
                  src="/images/stock/1c7b75e9.webp"
                  alt="Architectural Design and 3D Elevation by MPA"
                  fill
                  className="object-cover"
                  sizes="50vw"
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image src="/images/stock/13246fc0.webp" alt="3D facade study" fill className="object-cover" sizes="25vw" />
                </div>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image src="/images/stock/704fc1ee.webp" alt="Villa elevation design" fill className="object-cover" sizes="25vw" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Discipline 2: Turnkey Residential Construction ─── */}
      <section id="construction" className="py-20 sm:py-24 px-4 sm:px-8 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 order-2 lg:order-1">
              <div className="relative aspect-4/3 w-full overflow-hidden">
                <Image
                  src="/images/clinicImages-1.jpg"
                  alt="Turnkey civil construction by ARCH Foundations"
                  fill
                  className="object-cover"
                  sizes="50vw"
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image src="/images/clinicImages-3.jpg" alt="Completed MPA building" fill className="object-cover" sizes="25vw" />
                </div>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image src="/images/stock/57b78bb7.webp" alt="Delivered modern villa" fill className="object-cover" sizes="25vw" />
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
              <div className="inline-block px-3.5 py-1 bg-orange-50 border border-orange-200 rounded-lg text-xs font-bold text-[#E64D16] uppercase tracking-wider shadow-2xs">
                Discipline 02 &bull; Core Specialty
              </div>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight leading-tight">
                Turnkey Residential Construction
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 font-normal leading-relaxed">
                Led by <strong>ARCH Foundations</strong> with over 28 years of civil contracting pedigree. We construct independent houses, duplex villas, and premium residential buildings with zero compromise on raw material standards.
              </p>

              <div className="space-y-3 pt-2 text-xs">
                {[
                  { title: 'Primary Brand Materials Only', desc: 'Tata Tiscon / JSW Neosteel TMT steel, UltraTech/Ramco 53-grade certified cement, and river sand/clean M-sand.' },
                  { title: 'Full-Time Dedicated Civil Engineer', desc: 'On-site technical supervision monitoring every batch of concrete, curing period, and steel binding.' },
                  { title: '400+ Quality Checklist & Compression Tests', desc: 'Third-party accredited laboratory compressive cube tests for every RCC roof slab poured.' },
                  { title: '10-Year Structural Guarantee Certificate', desc: 'A legally binding warranty issued upon completion protecting foundation, columns, and slabs.' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3.5 bg-[#FAF9F7] border border-stone-200 rounded-md">
                    <div className="w-5 h-5 rounded-full bg-orange-100 text-[#E64D16] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      ✓
                    </div>
                    <div>
                      <h4 className="font-bold text-stone-900">{item.title}</h4>
                      <p className="text-stone-600 mt-0.5 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex items-center gap-4">
                <Link
                  href="/#packages"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#1A1B1A] hover:bg-stone-800 text-white font-bold text-xs uppercase tracking-wider rounded-md transition-all shadow-xs"
                >
                  <span>View Construction Packages</span>
                  <ArrowRight className="w-4 h-4 text-[#E64D16]" />
                </Link>
                <Link
                  href="/#cost-calculator"
                  className="text-xs font-bold text-[#E64D16] hover:underline"
                >
                  Calculate Construction Budget &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Discipline 3: Bespoke Interior Design ─── */}
      <section id="interiors" className="py-20 sm:py-24 px-4 sm:px-8 bg-[#FAF9F7] border-b border-stone-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-block px-3.5 py-1 bg-white border border-stone-200 rounded-lg text-xs font-bold text-[#E64D16] uppercase tracking-wider shadow-2xs">
                Discipline 03
              </div>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight leading-tight">
                Modular Kitchens &amp; Luxury Interior Architecture
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 font-normal leading-relaxed">
                Factory-finished modular joinery designed to withstand Chennai’s coastal climate. Built strictly with 100% Boiling Water Resistant (BWR IS:710) Marine Plywood and premium European hardware.
              </p>

              <div className="space-y-3 pt-2 text-xs">
                {[
                  { title: 'Modular Kitchens with Quartz Countertops', desc: 'Seamless Calacatta quartz countertops, soft-close tandem boxes, and anti-fingerprint acrylic/PU shutters.' },
                  { title: 'Floor-to-Ceiling Wardrobes & Walk-ins', desc: 'Custom master bedroom wardrobes with tinted fluted glass, concealed profile LEDs, and accessory trays.' },
                  { title: 'Architectural False Ceilings & Magnetic Tracks', desc: 'Gyproc false ceilings with DALI/dimmable smart illumination and magnetic track spotlighting.' },
                  { title: '10-Year Cabinetry & Hardware Warranty', desc: 'Long-term peace of mind protecting against delamination, moisture warpage, and hinge defects.' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3.5 bg-white border border-stone-200 rounded-md">
                    <div className="w-5 h-5 rounded-full bg-orange-100 text-[#E64D16] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      ✓
                    </div>
                    <div>
                      <h4 className="font-bold text-stone-900">{item.title}</h4>
                      <p className="text-stone-600 mt-0.5 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <Link
                  href="/gallery"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#E64D16] hover:bg-[#C93F0F] text-white font-bold text-xs uppercase tracking-wider rounded-md transition-all shadow-xs"
                >
                  <span>View Completed Interior Works</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative aspect-4/3 w-full overflow-hidden">
                <Image
                  src="/images/stock/c87d10e5.webp"
                  alt="Modular Kitchen Interior by Murali Patharala Associates"
                  fill
                  className="object-cover"
                  sizes="50vw"
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image src="/images/stock/0d97766b.webp" alt="Master bedroom wardrobe" fill className="object-cover" sizes="25vw" />
                </div>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image src="/images/stock/65d3ec82.webp" alt="Living room false ceiling and lighting" fill className="object-cover" sizes="25vw" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Bottom CTA Banner ─── */}
      <section className="py-16 sm:py-20 px-4 sm:px-8 bg-white text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="inline-block px-3.5 py-1 bg-orange-50 text-[#E64D16] text-xs font-bold uppercase tracking-wider rounded-lg border border-orange-200">
            Start Your Journey
          </div>
          <h3 className="text-2xl sm:text-4xl font-serif font-bold text-stone-900">
            Have a project in mind for your property in Chennai?
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 max-w-xl mx-auto leading-relaxed">
            Schedule a site survey or visit our studio in Anna Nagar East. We will provide an initial 2D plan and transparent, itemized BOQ quote at zero obligation.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/#consultation-form"
              className="px-8 py-3.5 bg-[#E64D16] hover:bg-[#C93F0F] text-white font-bold text-xs uppercase tracking-widest rounded-md shadow-md transition-all"
            >
              Book Free Site Survey
            </Link>
            <a
              href="tel:+919841098490"
              className="px-8 py-3.5 bg-[#1A1B1A] hover:bg-stone-800 text-white font-bold text-xs uppercase tracking-widest rounded-md transition-all"
            >
              Call: +91 98410 98490
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
