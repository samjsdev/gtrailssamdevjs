import { readSourceConfig } from '@/lib/sourceData';
import { cleanClinicName, cleanClinicDescription } from '@/lib/copyCleaner';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import CostEstimator from './CostEstimator';
import ConsultationForm from './ConsultationForm';
import { 
  Building, Compass, ShieldCheck, Award, HardHat, 
  CheckCircle2, Ruler, ArrowRight, Phone, Users, FileCheck, 
  Star, Layers, Sparkles, Check, ChevronRight, Calculator,
  Home, Hammer, Wrench, Shield, Zap, BadgeCheck
} from 'lucide-react';

interface PageProps {
  params?: any;
}

export default async function Template5HomePage({ params }: PageProps) {
  const slug = ''; // standalone: slug not needed for data loading
  const data = await readSourceConfig(undefined, 'template5');

  if (!data || !data.clinic) {
    notFound();
  }

  const clinicName = cleanClinicName(data.clinic.name);
  const clinicTagline = data.clinic.tagline || 'Integrated Architectural Design, Turnkey Residential Construction & Luxury Interiors';
  const clinicDescription = cleanClinicDescription(data.clinic.description, data.clinic.name);
  const clinicPhone = data.clinic.contact?.phone || '+91 81100 00384';

  const media = data.media || {};
  const heroImage = media.clinicImages?.[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80';
  const architectureImage = media.clinicImages?.[1] || 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80';
  const constructionImage = media.treatmentImages?.[0] || 'https://images.unsplash.com/photo-1541888946425-d0fbb18f15f6?auto=format&fit=crop&w=1200&q=80';
  const interiorImage = media.otherImages?.[0] || 'https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=1200&q=80';

  const rating = data.business?.rating || '4.9';
  const reviewCount = data.business?.reviewCount || '380+';
  const reviews = Array.isArray(data.reviews) && data.reviews.length > 0 ? data.reviews : [
    {
      author_name: 'Dr. Suresh Ramachandran',
      rating: 5,
      text: 'Built our 4,200 sq.ft duplex villa in ECR. The 100% turnkey execution with in-house architects, structural engineers, and interior designers ensured zero stress. Handover was on the exact committed date with zero budget creep.',
      relative_time_description: '3 months ago',
    },
    {
      author_name: 'Priya & Vignesh Iyer',
      rating: 5,
      text: 'The 425-point quality audit and weekly engineering reports gave us immense confidence. Their interior team designed our modular kitchen and acoustic living room seamlessly alongside the civil build.',
      relative_time_description: '1 month ago',
    },
    {
      author_name: 'K. Senthil Kumar (Civil Entreprenuer)',
      rating: 5,
      text: 'As an engineer myself, I audited their concrete mix ratios and Fe550D steel certifications. Uncompromising structural rigor and top-tier architectural elevation design. Highly recommended!',
      relative_time_description: '5 months ago',
    },
  ];

  const basePath = ``;

  return (
    <div className="w-full bg-[#F4F3EE] text-[#252A29]">
      {/* ─── 1. Heavy Industrial Hero Banner ─── */}
      <section id="hero" className="relative py-16 sm:py-24 px-4 sm:px-8 border-b-4 border-[#252A29] bg-[#F4F3EE]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Col: Hero Narrative */}
            <div className="lg:col-span-7 space-y-6">
              {/* Discipline Pills */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 bg-[#252A29] text-[#F4F3EE] text-xs font-mono font-bold uppercase tracking-wider border border-[#111111] shadow-[2px_2px_0px_#111111]">
                  ARCHITECTURAL DESIGN
                </span>
                <span className="text-[#E94B26] font-bold">&bull;</span>
                <span className="px-3 py-1 bg-[#E94B26] text-[#F4F3EE] text-xs font-mono font-bold uppercase tracking-wider border border-[#111111] shadow-[2px_2px_0px_#111111]">
                  RESIDENTIAL CONSTRUCTION
                </span>
                <span className="text-[#E94B26] font-bold">&bull;</span>
                <span className="px-3 py-1 bg-[#252A29] text-[#C8A84E] text-xs font-mono font-bold uppercase tracking-wider border border-[#111111] shadow-[2px_2px_0px_#111111]">
                  INTERIOR FITOUTS
                </span>
              </div>

              {/* Main Heavy Condensed Display Heading */}
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase text-[#252A29] tracking-tight leading-[0.92]">
                ARCHITECTURAL <span className="text-[#E94B26]">RIGOR.</span> RESIDENTIAL CIVIL <span className="text-[#252A29] underline decoration-[#C8A84E] decoration-4 underline-offset-8">MASTERY.</span>
              </h1>

              <p className="text-sm sm:text-base text-[#252A29]/85 font-sans leading-relaxed max-w-2xl">
                {clinicDescription} We integrate licensed architects, structural engineers, and bespoke interior craftsmen under one engineering roof—delivering end-to-end homes with a <strong>10-Year Structural Guarantee</strong> and <strong>Zero Cost Escalation</strong>.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href={`${basePath}#cost-calculator`}
                  className="px-6 py-4 bg-[#E94B26] text-[#F4F3EE] font-black text-xs uppercase tracking-widest border-2 border-[#111111] shadow-[4px_4px_0px_#111111] hover:shadow-[1px_1px_0px_#111111] hover:translate-x-[3px] hover:translate-y-[3px] transition-all flex items-center gap-2"
                >
                  <Calculator className="w-4 h-4" />
                  <span>CALCULATE CONSTRUCTION COST</span>
                </Link>

                <Link
                  href={`${basePath}#consultation-form`}
                  className="px-6 py-4 bg-[#252A29] text-[#F4F3EE] font-black text-xs uppercase tracking-widest border-2 border-[#111111] shadow-[4px_4px_0px_#111111] hover:bg-[#111111] hover:shadow-[1px_1px_0px_#111111] hover:translate-x-[3px] hover:translate-y-[3px] transition-all flex items-center gap-2"
                >
                  <HardHat className="w-4 h-4 text-[#C8A84E]" />
                  <span>REQUEST TECHNICAL SITE INSPECTION</span>
                </Link>
              </div>

              {/* 4 Live Verification Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t-2 border-[#252A29]/20 font-mono">
                <div className="bg-[#FFFFFF] p-3 border-2 border-[#252A29] shadow-[3px_3px_0px_#252A29]">
                  <span className="text-2xl font-black text-[#E94B26] block">18+</span>
                  <span className="text-[10px] font-bold text-[#252A29] uppercase">YEARS MASTERY</span>
                </div>
                <div className="bg-[#FFFFFF] p-3 border-2 border-[#252A29] shadow-[3px_3px_0px_#252A29]">
                  <span className="text-2xl font-black text-[#252A29] block">850+</span>
                  <span className="text-[10px] font-bold text-[#252A29] uppercase">HOMES DELIVERED</span>
                </div>
                <div className="bg-[#FFFFFF] p-3 border-2 border-[#252A29] shadow-[3px_3px_0px_#252A29]">
                  <span className="text-2xl font-black text-[#E94B26] block">10-YR</span>
                  <span className="text-[10px] font-bold text-[#252A29] uppercase">CIVIL WARRANTY</span>
                </div>
                <div className="bg-[#FFFFFF] p-3 border-2 border-[#252A29] shadow-[3px_3px_0px_#252A29]">
                  <span className="text-2xl font-black text-[#252A29] block">425+</span>
                  <span className="text-[10px] font-bold text-[#252A29] uppercase">QC AUDIT POINTS</span>
                </div>
              </div>
            </div>

            {/* Right Col: Hero Visual Image with Painted Signage Dimensionality */}
            <div className="lg:col-span-5">
              <div className="relative h-96 sm:h-[500px] w-full border-4 border-[#252A29] shadow-[10px_10px_0px_#252A29] bg-[#111111] overflow-hidden">
                <Image
                  src={heroImage}
                  alt="Architectural Villa Construction by Firm"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 600px"
                />

                {/* Top Badge */}
                <div className="absolute top-4 left-4 bg-[#252A29] text-[#F4F3EE] px-4 py-2 border border-[#111111] shadow-[3px_3px_0px_#111111] flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#E94B26]" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider">
                    COA & IS 456 COMPLIANT
                  </span>
                </div>

                {/* Bottom Signage Bar */}
                <div className="absolute bottom-4 left-4 right-4 bg-[#FFFFFF] text-[#252A29] p-4 border-2 border-[#252A29] shadow-[4px_4px_0px_#252A29] flex items-center justify-between">
                  <div>
                    <span className="text-[9px] font-mono font-bold text-[#E94B26] uppercase tracking-widest block">
                      FEATURED RESIDENCE PROJECT
                    </span>
                    <span className="text-sm font-black uppercase tracking-tight">
                      CANTILEVER 4BHK LUXURY VILLA
                    </span>
                  </div>
                  <Link
                    href={`${basePath}/gallery`}
                    className="p-2 bg-[#252A29] text-[#F4F3EE] hover:bg-[#E94B26] transition-colors"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2. The Three Core Disciplines (Deejos Architecture + Construction + Interiors) ─── */}
      <section id="disciplines" className="py-24 px-4 sm:px-8 bg-[#FFFFFF] border-b-4 border-[#252A29]">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F4F3EE] text-[#C8A84E] text-xs font-mono font-bold uppercase tracking-[0.25em] border border-[#252A29]">
              <Compass className="w-3.5 h-3.5 text-[#E94B26]" />
              <span>THE THREE INTEGRATED PILLARS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase text-[#252A29] tracking-tight">
              A ONE-STOP ARCHITECTURAL & CIVIL POWERHOUSE
            </h2>
            <p className="text-xs sm:text-sm text-[#252A29]/75 font-sans">
              Unlike fragmented local contractors or pure interior decorators, we orchestrate the entire home journey from architectural 3D drawings through structural concrete pouring to bespoke interior fitouts.
            </p>
          </div>

          {/* 3 Pillars Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Pillar 1: Architectural Designs */}
            <div className="bg-[#F4F3EE] border-4 border-[#252A29] shadow-[6px_6px_0px_#252A29] flex flex-col justify-between overflow-hidden group hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#252A29] transition-all">
              <div>
                <div className="relative h-56 w-full bg-[#111111] border-b-2 border-[#252A29]">
                  <Image
                    src={architectureImage}
                    alt="Architectural 3D BIM & Elevations"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="400px"
                  />
                  <div className="absolute top-3 left-3 bg-[#252A29] text-[#F4F3EE] text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 border border-[#111111]">
                    PILLAR 01
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <Compass className="w-5 h-5 text-[#E94B26]" />
                    <h3 className="text-xl font-black uppercase text-[#252A29] tracking-tight">
                      ARCHITECTURAL DESIGNS
                    </h3>
                  </div>
                  <p className="text-xs text-[#252A29]/80 font-sans leading-relaxed">
                    Transforming your spatial ambitions into functional, aesthetically breathtaking blueprints with 100% Vaastu alignment and municipal compliance.
                  </p>

                  <ul className="space-y-2 pt-3 border-t border-[#252A29]/15 text-xs font-mono text-[#252A29]/85">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#E94B26] shrink-0 mt-0.5" />
                      <span>2D Vaastu Floor Schemes & Working Drawings</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#E94B26] shrink-0 mt-0.5" />
                      <span>Photorealistic 3D Elevations & Virtual Tours</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#E94B26] shrink-0 mt-0.5" />
                      <span>Structural Soil Audit & Load Bearing Calculation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#E94B26] shrink-0 mt-0.5" />
                      <span>CMDA / DTCP Sanction & Approval Coordination</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  href={`${basePath}/services`}
                  className="w-full py-3 bg-[#252A29] text-[#F4F3EE] font-black text-xs uppercase tracking-widest border border-[#111111] hover:bg-[#E94B26] transition-colors flex items-center justify-center gap-2"
                >
                  <span>EXPLORE ARCHITECTURE</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Pillar 2: Residential Construction */}
            <div className="bg-[#FFFFFF] border-4 border-[#E94B26] shadow-[8px_8px_0px_#252A29] flex flex-col justify-between overflow-hidden relative">
              <div className="absolute top-0 right-0 bg-[#E94B26] text-[#F4F3EE] text-[9px] font-mono font-black uppercase px-3 py-1 tracking-widest z-10">
                CORE EXPERTISE
              </div>

              <div>
                <div className="relative h-56 w-full bg-[#111111] border-b-2 border-[#E94B26]">
                  <Image
                    src={constructionImage}
                    alt="Residential Civil Construction"
                    fill
                    className="object-cover"
                    sizes="400px"
                  />
                  <div className="absolute top-3 left-3 bg-[#E94B26] text-[#F4F3EE] text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 border border-[#111111]">
                    PILLAR 02
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <HardHat className="w-5 h-5 text-[#E94B26]" />
                    <h3 className="text-xl font-black uppercase text-[#252A29] tracking-tight">
                      RESIDENTIAL CONSTRUCTION
                    </h3>
                  </div>
                  <p className="text-xs text-[#252A29]/80 font-sans leading-relaxed">
                    End-to-end turnkey civil execution with certified raw materials, dedicated site engineers, and continuous on-site quality testing.
                  </p>

                  <ul className="space-y-2 pt-3 border-t border-[#252A29]/15 text-xs font-mono text-[#252A29]/85">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#E94B26] shrink-0 mt-0.5" />
                      <span>Fe550D TMT Steel & Grade-53 Heavy Duty Concrete</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#E94B26] shrink-0 mt-0.5" />
                      <span>425-Point Rigorous Quality Assurance Checks</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#E94B26] shrink-0 mt-0.5" />
                      <span>10-Year Comprehensive Structural Warranty</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#E94B26] shrink-0 mt-0.5" />
                      <span>Guaranteed Zero Cost Escalation with Escrow</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  href={`${basePath}/services`}
                  className="w-full py-3 bg-[#E94B26] text-[#F4F3EE] font-black text-xs uppercase tracking-widest border border-[#111111] hover:bg-[#d43d1a] transition-colors flex items-center justify-center gap-2 shadow-[2px_2px_0px_#111111]"
                >
                  <span>EXPLORE CIVIL PACKAGES</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Pillar 3: Interior Designs */}
            <div className="bg-[#F4F3EE] border-4 border-[#252A29] shadow-[6px_6px_0px_#252A29] flex flex-col justify-between overflow-hidden group hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#252A29] transition-all">
              <div>
                <div className="relative h-56 w-full bg-[#111111] border-b-2 border-[#252A29]">
                  <Image
                    src={interiorImage}
                    alt="Luxury Interior Design and Fitouts"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="400px"
                  />
                  <div className="absolute top-3 left-3 bg-[#252A29] text-[#C8A84E] text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 border border-[#111111]">
                    PILLAR 03
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <Layers className="w-5 h-5 text-[#E94B26]" />
                    <h3 className="text-xl font-black uppercase text-[#252A29] tracking-tight">
                      INTERIOR DESIGNS
                    </h3>
                  </div>
                  <p className="text-xs text-[#252A29]/80 font-sans leading-relaxed">
                    Tailored residential spaces with factory-crafted modular joinery, imported hardware, concealed ambient lighting, and bespoke luxury finishes.
                  </p>

                  <ul className="space-y-2 pt-3 border-t border-[#252A29]/15 text-xs font-mono text-[#252A29]/85">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#E94B26] shrink-0 mt-0.5" />
                      <span>Modular Kitchens with Hettich / Hafele Fittings</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#E94B26] shrink-0 mt-0.5" />
                      <span>Custom Wardrobes & Vanity Units in HDHMR / Plywood</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#E94B26] shrink-0 mt-0.5" />
                      <span>Designer False Ceiling & Architectural Lighting</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#E94B26] shrink-0 mt-0.5" />
                      <span>Italian Marble Polishing & Fluted Wall Paneling</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  href={`${basePath}/services`}
                  className="w-full py-3 bg-[#252A29] text-[#F4F3EE] font-black text-xs uppercase tracking-widest border border-[#111111] hover:bg-[#E94B26] transition-colors flex items-center justify-center gap-2"
                >
                  <span>EXPLORE INTERIORS</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 3. Interactive Construction & Interior Cost Estimator ─── */}
      <section id="cost-calculator" className="py-24 px-4 sm:px-8 bg-[#F4F3EE] border-b-4 border-[#252A29]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#252A29] text-[#C8A84E] text-xs font-mono font-bold uppercase tracking-[0.25em] border border-[#111111]">
              <Calculator className="w-3.5 h-3.5 text-[#E94B26]" />
              <span>TRANSPARENT FINANCIAL CALCULATOR</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase text-[#252A29] tracking-tight">
              ESTIMATE YOUR RESIDENTIAL BUILD IN SECONDS
            </h2>
            <p className="text-xs sm:text-sm text-[#252A29]/75 font-sans">
              Choose your built-up square footage, structural floors, specification package, and interior scope to calculate an immediate, itemized estimate.
            </p>
          </div>

          {/* Embedded Cost Estimator Component */}
          <CostEstimator basePath={basePath} />
        </div>
      </section>

      {/* ─── 4. The 7-Stage Construction & 425+ Quality Audit Framework ─── */}
      <section id="stages" className="py-24 px-4 sm:px-8 bg-[#FFFFFF] border-b-4 border-[#252A29]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F4F3EE] text-[#C8A84E] text-xs font-mono font-bold uppercase tracking-[0.25em] border border-[#252A29]">
              <FileCheck className="w-3.5 h-3.5 text-[#E94B26]" />
              <span>THE 425-POINT QUALITY CHECK SYSTEM</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase text-[#252A29] tracking-tight">
              OUR 7-STAGE RIGOROUS CONSTRUCTION TIMELINE
            </h2>
            <p className="text-xs sm:text-sm text-[#252A29]/75 font-sans">
              Every phase requires formal sign-off from our Quality Control Department before subsequent work commences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                num: '01',
                title: 'SOIL TEST & ARCHITECTURAL 3D SCHEME',
                desc: 'Geo-technical soil bearing capacity analysis, structural framing calculations, and 3D elevation renders.',
                audit: '45 QC Checkpoints',
              },
              {
                num: '02',
                title: 'SUB-STRUCTURE & FOUNDATION',
                desc: 'Excavation, anti-termite barrier treatment, isolated/raft footings, and plinth beam tie-ins with lab-certified steel.',
                audit: '60 QC Checkpoints',
              },
              {
                num: '03',
                title: 'SUPER-STRUCTURE & RCC FRAMING',
                desc: 'Columns, beams, and roof slabs cast using Grade-53 concrete with slump tests and strict 21-day pond curing.',
                audit: '80 QC Checkpoints',
              },
              {
                num: '04',
                title: 'AAC / RED BRICK MASONRY & PLASTERING',
                desc: 'Precision block masonry with chicken mesh plaster reinforcements to eliminate structural hairline shrinkage cracks.',
                audit: '65 QC Checkpoints',
              },
              {
                num: '05',
                title: 'CONCEALED MEP & WATERPROOFING',
                desc: 'Finolex/Havells wiring, Astral CPVC plumbing with 10-bar hydrostatic pressure testing and membrane waterproofing.',
                audit: '75 QC Checkpoints',
              },
              {
                num: '06',
                title: 'FLOORING, JOINERY & LUXURY INTERIORS',
                desc: 'Teak wood main entrance doors, 4x2 vitrified/marble flooring, modular kitchen cabinets, and Asian Paints Royale.',
                audit: '70 QC Checkpoints',
              },
              {
                num: '07',
                title: 'FINAL 425-POINT AUDIT & HANDOVER',
                desc: 'Comprehensive deep cleaning, electrical load test, fixture certification, and handover of 10-Year Warranty documentation.',
                audit: '30 Final Checkpoints',
              },
            ].map((stage, idx) => (
              <div
                key={idx}
                className="bg-[#F4F3EE] p-6 border-4 border-[#252A29] shadow-[4px_4px_0px_#252A29] flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center border-b-2 border-[#252A29] pb-2">
                    <span className="text-2xl font-black font-mono text-[#E94B26]">STAGE {stage.num}</span>
                    <span className="text-[10px] font-mono font-bold uppercase text-[#C8A84E] bg-[#252A29] px-2 py-0.5 border border-[#111111]">
                      {stage.audit}
                    </span>
                  </div>
                  <h4 className="text-sm font-black uppercase text-[#252A29] tracking-tight leading-snug">
                    {stage.title}
                  </h4>
                  <p className="text-xs text-[#252A29]/75 font-sans leading-relaxed">
                    {stage.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#252A29]/15 flex items-center gap-1.5 text-[10px] font-mono text-[#E94B26] font-bold">
                  <BadgeCheck className="w-3.5 h-3.5" />
                  <span>MANDATORY QC AUDIT PASSED</span>
                </div>
              </div>
            ))}

            {/* Final CTA Box in the Grid */}
            <div className="bg-[#252A29] text-[#F4F3EE] p-6 border-4 border-[#111111] shadow-[6px_6px_0px_#E94B26] flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-[10px] font-mono text-[#C8A84E] font-bold uppercase tracking-widest block">
                  ZERO-RISK CLIENT ASSURANCE
                </span>
                <h4 className="text-xl font-black uppercase text-[#F4F3EE] tracking-tight">
                  100% TRANSPARENT SITE AUDITING
                </h4>
                <p className="text-xs text-[#F4F3EE]/80 font-sans leading-relaxed">
                  Every milestone is backed by itemized test reports and photo documentation delivered to you directly.
                </p>
              </div>

              <Link
                href={`${basePath}#consultation-form`}
                className="w-full mt-4 py-3 bg-[#E94B26] text-[#F4F3EE] font-black text-xs uppercase tracking-widest border border-[#111111] hover:bg-[#d43d1a] transition-colors flex items-center justify-center gap-2"
              >
                <span>BOOK SITE VISIT</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 5. Transparent Construction Packages Matrix ─── */}
      <section id="packages" className="py-24 px-4 sm:px-8 bg-[#F4F3EE] border-b-4 border-[#252A29]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#252A29] text-[#C8A84E] text-xs font-mono font-bold uppercase tracking-[0.25em] border border-[#111111]">
              <Ruler className="w-3.5 h-3.5 text-[#E94B26]" />
              <span>CLEAR SPECIFICATIONS &bull; NO HIDDEN CHARGES</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase text-[#252A29] tracking-tight">
              CIVIL CONSTRUCTION PACKAGES
            </h2>
            <p className="text-xs sm:text-sm text-[#252A29]/75 font-sans">
              Compare our standardized construction packages with clear, itemized specifications on steel, cement, flooring, fittings, and guarantees.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Package 1: Essential Civil */}
            <div className="bg-[#FFFFFF] border-4 border-[#252A29] shadow-[6px_6px_0px_#252A29] p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex justify-between items-start border-b-2 border-[#252A29] pb-4">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#C8A84E] block">
                      STANDARD TIER
                    </span>
                    <h3 className="text-2xl font-black uppercase text-[#252A29] tracking-tight">
                      ESSENTIAL CIVIL
                    </h3>
                  </div>
                  <div className="text-right font-mono">
                    <span className="text-2xl font-black text-[#E94B26]">₹1,850</span>
                    <span className="text-[10px] text-[#252A29] block">/ SQ.FT</span>
                  </div>
                </div>

                <ul className="mt-6 space-y-3 text-xs font-mono text-[#252A29]/85">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#E94B26] shrink-0 mt-0.5" />
                    <span><strong>Steel:</strong> Fe500D TMT ISI Certified Brands</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#E94B26] shrink-0 mt-0.5" />
                    <span><strong>Cement:</strong> Grade 53 (Dalmia / Zuari / Priya)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#E94B26] shrink-0 mt-0.5" />
                    <span><strong>Masonry:</strong> Standard AAC Blocks with Joint Mortar</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#E94B26] shrink-0 mt-0.5" />
                    <span><strong>Flooring:</strong> Double Charge Vitrified Tiles (₹55/sq.ft)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#E94B26] shrink-0 mt-0.5" />
                    <span><strong>Plumbing:</strong> Astral CPVC & Parryware Sanitary</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#E94B26] shrink-0 mt-0.5" />
                    <span><strong>Warranty:</strong> 5-Year Structural Guarantee</span>
                  </li>
                </ul>
              </div>

              <Link
                href={`${basePath}#consultation-form`}
                className="w-full py-3 bg-[#252A29] text-[#F4F3EE] font-black text-xs uppercase tracking-widest border border-[#111111] hover:bg-[#E94B26] transition-colors text-center"
              >
                SELECT ESSENTIAL
              </Link>
            </div>

            {/* Package 2: Premium Villa (Featured) */}
            <div className="bg-[#FFFFFF] border-4 border-[#E94B26] shadow-[8px_8px_0px_#252A29] p-6 sm:p-8 flex flex-col justify-between space-y-6 relative">
              <div className="absolute top-0 right-0 bg-[#E94B26] text-[#F4F3EE] text-[9px] font-mono font-black uppercase px-3 py-1 tracking-widest">
                RECOMMENDED
              </div>

              <div>
                <div className="flex justify-between items-start border-b-2 border-[#E94B26] pb-4">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#E94B26] block">
                      PREMIUM TIER
                    </span>
                    <h3 className="text-2xl font-black uppercase text-[#252A29] tracking-tight">
                      PREMIUM VILLA
                    </h3>
                  </div>
                  <div className="text-right font-mono">
                    <span className="text-2xl font-black text-[#E94B26]">₹2,250</span>
                    <span className="text-[10px] text-[#252A29] block">/ SQ.FT</span>
                  </div>
                </div>

                <ul className="mt-6 space-y-3 text-xs font-mono text-[#252A29]/85">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#E94B26] shrink-0 mt-0.5" />
                    <span><strong>Steel:</strong> Fe550D Tata Tiscon / JSW Neosteel</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#E94B26] shrink-0 mt-0.5" />
                    <span><strong>Cement:</strong> UltraTech / ACC Grade-53 High Early</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#E94B26] shrink-0 mt-0.5" />
                    <span><strong>Masonry:</strong> Wire-cut Red Bricks / Heavy Density AAC</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#E94B26] shrink-0 mt-0.5" />
                    <span><strong>Flooring:</strong> Glazed Vitrified 4x2 Slabs (₹85/sq.ft)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#E94B26] shrink-0 mt-0.5" />
                    <span><strong>Plumbing:</strong> Jaquar / Kohler Concealed Diverters</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#E94B26] shrink-0 mt-0.5" />
                    <span><strong>Paint:</strong> Asian Paints Royale Luxury Interior Emulsion</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#E94B26] shrink-0 mt-0.5" />
                    <span><strong>Warranty:</strong> 10-Year Comprehensive Structural Guarantee</span>
                  </li>
                </ul>
              </div>

              <Link
                href={`${basePath}#consultation-form`}
                className="w-full py-3.5 bg-[#E94B26] text-[#F4F3EE] font-black text-xs uppercase tracking-widest border border-[#111111] hover:bg-[#d43d1a] transition-colors text-center shadow-[3px_3px_0px_#111111]"
              >
                SELECT PREMIUM VILLA
              </Link>
            </div>

            {/* Package 3: Elite Architectural */}
            <div className="bg-[#FFFFFF] border-4 border-[#252A29] shadow-[6px_6px_0px_#252A29] p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex justify-between items-start border-b-2 border-[#252A29] pb-4">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#C8A84E] block">
                      LUXURY TIER
                    </span>
                    <h3 className="text-2xl font-black uppercase text-[#252A29] tracking-tight">
                      ELITE ARCHITECTURAL
                    </h3>
                  </div>
                  <div className="text-right font-mono">
                    <span className="text-2xl font-black text-[#E94B26]">₹2,750</span>
                    <span className="text-[10px] text-[#252A29] block">/ SQ.FT</span>
                  </div>
                </div>

                <ul className="mt-6 space-y-3 text-xs font-mono text-[#252A29]/85">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#E94B26] shrink-0 mt-0.5" />
                    <span><strong>Steel:</strong> Primary Fe550D + Epoxy Anti-Corrosion Coating</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#E94B26] shrink-0 mt-0.5" />
                    <span><strong>Cement:</strong> UltraTech Super / Coromandel King 53</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#E94B26] shrink-0 mt-0.5" />
                    <span><strong>Masonry:</strong> Wienerberger Porotherm Clay Thermal Blocks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#E94B26] shrink-0 mt-0.5" />
                    <span><strong>Flooring:</strong> Italian Marble / Nexion 6x4 Slabs (₹140+/sq.ft)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#E94B26] shrink-0 mt-0.5" />
                    <span><strong>Plumbing:</strong> Grohe / Bravat German Sanitaryware</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#E94B26] shrink-0 mt-0.5" />
                    <span><strong>Smart Home:</strong> Full IoT Conduiting & Solar Roof Provision</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#E94B26] shrink-0 mt-0.5" />
                    <span><strong>Warranty:</strong> 10-Year Full Structural + 2-Yr Maintenance</span>
                  </li>
                </ul>
              </div>

              <Link
                href={`${basePath}#consultation-form`}
                className="w-full py-3 bg-[#252A29] text-[#F4F3EE] font-black text-xs uppercase tracking-widest border border-[#111111] hover:bg-[#E94B26] transition-colors text-center"
              >
                SELECT ELITE LUXURY
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 6. Client Reviews & Engineering Credibility ─── */}
      <section id="testimonials" className="py-24 px-4 sm:px-8 bg-[#FFFFFF] border-b-4 border-[#252A29]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Rating Overview Box */}
            <div className="lg:col-span-4 bg-[#252A29] text-[#F4F3EE] p-8 border-4 border-[#111111] shadow-[8px_8px_0px_#E94B26] space-y-6">
              <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#C8A84E] block">
                AUDITED CLIENT REVIEWS
              </span>
              <div className="flex items-baseline gap-3">
                <span className="text-5xl font-black font-mono text-[#F4F3EE]">{rating}</span>
                <span className="text-lg text-[#C8A84E] font-bold">/ 5.0</span>
              </div>

              <div className="flex gap-1 text-[#E94B26]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>

              <p className="text-xs text-[#F4F3EE]/80 font-sans leading-relaxed">
                Over <strong>{reviewCount} verified home owners</strong> have trusted our integrated architectural and civil construction teams for their residences.
              </p>

              <div className="pt-4 border-t border-[#F4F3EE]/15">
                <span className="text-[10px] font-mono text-[#C8A84E] uppercase tracking-wider block font-bold">
                  VERIFIED GOOGLE MAPS SCORE
                </span>
              </div>
            </div>

            {/* Reviews Cards */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {reviews.slice(0, 4).map((rev, idx) => (
                <div
                  key={idx}
                  className="bg-[#F4F3EE] p-6 border-2 border-[#252A29] shadow-[4px_4px_0px_#252A29] flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex gap-1 text-[#E94B26]">
                      {[...Array(rev.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <p className="text-xs text-[#252A29]/85 font-sans leading-relaxed italic">
                      &ldquo;{rev.text}&rdquo;
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#252A29]/15 flex items-center justify-between text-[11px] font-mono">
                    <span className="font-black text-[#252A29] uppercase">{rev.author_name}</span>
                    <span className="text-[#252A29]/60">{rev.relative_time_description || 'Verified Client'}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── 7. Consultation Booking Section ─── */}
      <section id="consultation" className="py-24 px-4 sm:px-8 bg-[#F4F3EE]">
        <div className="max-w-7xl mx-auto">
          <ConsultationForm clinicName={clinicName} phone={clinicPhone} />
        </div>
      </section>
    </div>
  );
}
