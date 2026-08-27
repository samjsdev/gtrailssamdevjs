import { readSourceConfig } from '@/lib/sourceData';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Building2, Compass, ShieldCheck, Award, Ruler, 
  ArrowRight, Phone, Users, Check, Layers, Sparkles, 
  Box, Palette, Star, CheckCircle2, HardHat, Clock, MapPin
} from 'lucide-react';

interface PageProps {
  params?: any;
}

export default async function AboutPage({ params }: PageProps) {
  const data = await readSourceConfig(undefined, 'template5');

  if (!data || !data.clinic) {
    notFound();
  }

  const clinicPhone = '98410 98490';
  const clinicAddress = 'W115A, 3rd Ave, Annanagar East, Chennai, Tamil Nadu 600040';

  const milestones = [
    { year: '1998', title: 'Foundation Laid in Chennai', desc: 'ARCH Foundations established with a dedication to uncompromised civil construction and transparent building practices in Chennai.' },
    { year: '2006', title: 'Expansion into Architectural Consulting', desc: 'Murali Patharala Associates (MPA) founded to seamlessly integrate avant-garde 3D architectural elevations and space planning with civil execution.' },
    { year: '2014', title: 'In-House Modular Joinery Factory', desc: 'Commissioned an advanced CNC joinery unit to build 100% BWR Marine Plywood modular kitchens and bespoke residential cabinetry.' },
    { year: '2026', title: '28+ Years & 500+ Residences', desc: 'Celebrated delivering over 500 bespoke villas, independent residences, and luxury interiors with a 100% fixed-price guarantee.' },
  ];

  return (
    <div className="w-full bg-[#FAF9F7] text-[#1A1B1A] font-sans">
      {/* ─── Hero Banner Section ─── */}
      <section id="about-hero" className="relative py-20 sm:py-28 bg-[#1A1B1A] text-white overflow-hidden">
        <Image
          src="/images/clinicImages-2.jpg"
          alt="MPA signature building facade"
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
              <span>Studio Profile &bull; Anna Nagar East, Chennai</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight leading-tight">
              28+ Years of Building Trust &amp; <span className="text-[#E64D16]">Architectural Excellence</span>
            </h1>
            <p className="text-sm sm:text-base text-stone-200 font-normal leading-relaxed">
              ARCH Foundations &amp; Murali Patharala Associates (MPA) has shaped prestigious homes across Chennai since 1998.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Narrative Section ─── */}
      <section className="py-20 sm:py-24 px-4 sm:px-8 bg-[#FAF9F7] border-b border-stone-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-block px-3.5 py-1 bg-white border border-stone-200 rounded-lg text-xs font-bold text-[#E64D16] uppercase tracking-wider shadow-2xs">
                Our Ethos &amp; Heritage
              </div>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight leading-tight">
                Where Civil Engineering Rigor Meets Creative Vision
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                Founded in 1998, <strong>ARCH Foundations</strong> and <strong>Murali Patharala Associates (MPA)</strong> was established to bridge a critical divide in Chennai’s real estate: the disconnect between design architects, civil building contractors, and interior craftsmen.
              </p>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                By bringing architectural design, structural engineering, civil turnkey construction, and factory-fabricated modular interiors under one unified roof, we ensure that the aesthetic vision on paper is translated to the millimeter in the final built structure — with zero cost escalations and absolute transparency.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-white border border-stone-200 rounded-md">
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#E64D16]">500+</div>
                  <div className="text-xs font-bold text-stone-900 mt-1">Residences Delivered</div>
                  <div className="text-[11px] text-stone-500">Across Chennai &amp; Tamil Nadu</div>
                </div>
                <div className="p-4 bg-white border border-stone-200 rounded-md">
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#C9A25C]">Since 1998</div>
                  <div className="text-xs font-bold text-stone-900 mt-1">28+ Years of Practice</div>
                  <div className="text-[11px] text-stone-500">Based in Anna Nagar East</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative aspect-4/3 w-full overflow-hidden">
                <Image
                  src="/images/clinicImages-3.jpg"
                  alt="MPA office building in Anna Nagar East"
                  fill
                  className="object-cover"
                  sizes="50vw"
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image src="/images/clinicImages-2.jpg" alt="MPA facade detail" fill className="object-cover" sizes="25vw" />
                </div>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image src="/images/stock/a151a9e5.webp" alt="Interior craftsmanship" fill className="object-cover" sizes="25vw" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Timeline / Milestones ─── */}
      <section className="py-20 sm:py-24 px-4 sm:px-8 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-block px-3.5 py-1 bg-orange-50 text-[#E64D16] text-xs font-bold uppercase tracking-wider rounded-lg border border-orange-200">
              Our Journey
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
              A Legacy of Craftsmanship
            </h2>
            <p className="text-sm text-stone-600">
              Key milestones shaping our reputation as Chennai’s premier turnkey construction and architecture atelier.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((m) => (
              <div key={m.year} className="p-6 bg-[#FAF9F7] rounded-md border border-stone-200 space-y-3 relative">
                <div className="text-2xl sm:text-3xl font-black text-[#E64D16]">{m.year}</div>
                <h3 className="text-sm font-bold text-stone-900">{m.title}</h3>
                <p className="text-xs text-stone-600 leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Studio Location & Direct Team Coordinates ─── */}
      <section className="py-20 sm:py-24 px-4 sm:px-8 bg-[#FAF9F7]">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#1A1B1A] text-white rounded-lg p-8 sm:p-12 border border-stone-800 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-block px-3 py-1 bg-orange-500/20 text-[#E64D16] text-[11px] font-bold uppercase tracking-wider rounded-md border border-orange-500/30">
                  Headquarters &amp; Studio
                </div>
                <h3 className="text-2xl sm:text-4xl font-bold tracking-tight">
                  Visit Our Design Studio in Anna Nagar East
                </h3>
                <p className="text-xs sm:text-sm text-stone-400 max-w-xl leading-relaxed">
                  Walk through physical material samples, live cross-sections of our RCC beam frameworks, and inspect full modular kitchen joinery swatches.
                </p>

                <div className="flex flex-wrap gap-4 pt-2 text-xs text-stone-300">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#E64D16]" />
                    <span>{clinicAddress}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#C9A25C]" />
                    <span>Mon – Sat: 9:30 AM – 7:30 PM</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
                <a
                  href={`tel:+919841098490`}
                  className="w-full py-3.5 px-6 bg-[#E64D16] hover:bg-[#C93F0F] text-white font-bold text-xs uppercase tracking-wider rounded-md transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call: +91 98410 98490</span>
                </a>
                <Link
                  href="/#consultation-form"
                  className="w-full py-3.5 px-6 bg-white/10 hover:bg-white/15 text-white font-semibold text-xs uppercase tracking-wider rounded-md border border-stone-700 transition-all text-center block"
                >
                  Book Studio Visit
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
