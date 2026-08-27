import { readSourceConfig } from '@/lib/dataBuilder';
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
  params: Promise<{ slug: string }>;
}

export default async function Template5HomePage({ params }: PageProps) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const data = await readSourceConfig(slug, 'template5');

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

  const basePath = `/designwebsite/template5/${slug}`;

  return (
    <div className="w-full bg-[#F8F7F4] text-[#1E2322]">
      {/* ─── 1. Refined Architectural Hero Banner ─── */}
      <section id="hero" className="relative py-16 sm:py-24 px-4 sm:px-8 border-b border-[#1E2322]/15 bg-[#F8F7F4]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Col: Hero Narrative */}
            <div className="lg:col-span-7 space-y-6">
              {/* Discipline Pills */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 bg-white text-[#1E2322] text-xs font-mono font-medium uppercase tracking-wider border border-[#1E2322]/20 rounded-sm shadow-sm">
                  ARCHITECTURAL DESIGN
                </span>
                <span className="text-[#C85A32] font-bold">&bull;</span>
                <span className="px-3 py-1 bg-[#C85A32] text-white text-xs font-mono font-medium uppercase tracking-wider rounded-sm shadow-sm">
                  RESIDENTIAL CONSTRUCTION
                </span>
                <span className="text-[#C85A32] font-bold">&bull;</span>
                <span className="px-3 py-1 bg-[#1E2322] text-[#C49B45] text-xs font-mono font-medium uppercase tracking-wider rounded-sm shadow-sm">
                  INTERIOR FITOUTS
                </span>
              </div>

              {/* Main Refined Architectural Display Heading */}
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold uppercase text-[#1E2322] tracking-tight leading-[0.95]">
                ARCHITECTURAL <span className="text-[#C85A32]">RIGOR.</span> RESIDENTIAL CIVIL <span className="text-[#1E2322] underline decoration-[#C49B45] decoration-2 underline-offset-4">MASTERY.</span>
              </h1>

              <p className="text-sm sm:text-base text-[#1E2322]/85 font-sans leading-relaxed max-w-2xl">
                {clinicDescription} We integrate licensed architects, structural engineers, and bespoke interior craftsmen under one engineering roof—delivering end-to-end homes with a <strong>10-Year Structural Guarantee</strong> and <strong>Zero Cost Escalation</strong>.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href={`${basePath}#cost-calculator`}
                  className="px-6 py-3.5 bg-[#C85A32] hover:bg-[#B34D28] text-white font-semibold text-xs uppercase tracking-widest rounded-sm shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all flex items-center gap-2"
                >
                  <Calculator className="w-4 h-4" />
                  <span>CALCULATE CONSTRUCTION COST</span>
                </Link>

                <Link
                  href={`${basePath}#consultation-form`}
                  className="px-6 py-3.5 bg-[#1E2322] hover:bg-[#141716] text-white font-semibold text-xs uppercase tracking-widest rounded-sm border border-[#1E2322] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all flex items-center gap-2"
                >
                  <HardHat className="w-4 h-4 text-[#C49B45]" />
                  <span>REQUEST TECHNICAL SITE INSPECTION</span>
                </Link>
              </div>

              {/* 4 Live Verification Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-[#1E2322]/15 font-mono">
                <div className="bg-white p-3.5 border border-[#1E2322]/15 rounded-sm shadow-sm hover:border-[#C85A32]/40 transition-colors">
                  <span className="text-2xl font-bold text-[#C85A32] block">18+</span>
                  <span className="text-[10px] font-medium text-[#1E2322]/80 uppercase">YEARS MASTERY</span>
                </div>
                <div className="bg-white p-3.5 border border-[#1E2322]/15 rounded-sm shadow-sm hover:border-[#C85A32]/40 transition-colors">
                  <span className="text-2xl font-bold text-[#1E2322] block">850+</span>
                  <span className="text-[10px] font-medium text-[#1E2322]/80 uppercase">HOMES DELIVERED</span>
                </div>
                <div className="bg-white p-3.5 border border-[#1E2322]/15 rounded-sm shadow-sm hover:border-[#C85A32]/40 transition-colors">
                  <span className="text-2xl font-bold text-[#C85A32] block">10-YR</span>
                  <span className="text-[10px] font-medium text-[#1E2322]/80 uppercase">CIVIL WARRANTY</span>
                </div>
                <div className="bg-white p-3.5 border border-[#1E2322]/15 rounded-sm shadow-sm hover:border-[#C85A32]/40 transition-colors">
                  <span className="text-2xl font-bold text-[#1E2322] block">425+</span>
                  <span className="text-[10px] font-medium text-[#1E2322]/80 uppercase">QC AUDIT POINTS</span>
                </div>
              </div>
            </div>

            {/* Right Col: Hero Visual Image */}
            <div className="lg:col-span-5">
              <div className="relative h-96 sm:h-[500px] w-full border border-[#1E2322]/20 rounded-sm shadow-md bg-[#141716] overflow-hidden">
                <Image
                  src={heroImage}
                  alt="Architectural Villa Construction by Firm"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 600px"
                />

                {/* Top Badge */}
                <div className="absolute top-4 left-4 bg-[#181C1B]/90 backdrop-blur-sm text-white px-3.5 py-1.5 border border-white/10 rounded-sm shadow-sm flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#C85A32]" />
                  <span className="text-xs font-mono font-medium uppercase tracking-wider">
                    COA & IS 456 COMPLIANT
                  </span>
                </div>

                {/* Bottom Signage Bar */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm text-[#1E2322] p-4 border border-[#1E2322]/15 rounded-sm shadow-sm flex items-center justify-between">
                  <div>
                    <span className="text-[9px] font-mono font-bold text-[#C85A32] uppercase tracking-widest block">
                      FEATURED RESIDENCE PROJECT
                    </span>
                    <span className="text-sm font-bold uppercase tracking-tight">
                      CANTILEVER 4BHK LUXURY VILLA
                    </span>
                  </div>
                  <Link
                    href={`${basePath}/gallery`}
                    className="p-2 bg-[#1E2322] text-white hover:bg-[#C85A32] rounded-sm transition-colors"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2. The Three Core Disciplines ─── */}
      <section id="disciplines" className="py-24 px-4 sm:px-8 bg-white border-b border-[#1E2322]/15">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F8F7F4] text-[#C49B45] text-xs font-mono font-semibold uppercase tracking-[0.2em] border border-[#1E2322]/15 rounded-sm">
              <Compass className="w-3.5 h-3.5 text-[#C85A32]" />
              <span>THE THREE INTEGRATED PILLARS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold uppercase text-[#1E2322] tracking-tight">
              A ONE-STOP ARCHITECTURAL & CIVIL POWERHOUSE
            </h2>
            <p className="text-xs sm:text-sm text-[#1E2322]/75 font-sans">
              Unlike fragmented local contractors or pure interior decorators, we orchestrate the entire home journey from architectural 3D drawings through structural concrete pouring to bespoke interior fitouts.
            </p>
          </div>

          {/* 3 Pillars Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Pillar 1: Architectural Designs */}
            <div className="bg-[#F8F7F4] border border-[#1E2322]/15 rounded-sm shadow-sm flex flex-col justify-between overflow-hidden group hover:shadow-md hover:-translate-y-0.5 transition-all">
              <div>
                <div className="relative h-56 w-full bg-[#141716] border-b border-[#1E2322]/15">
                  <Image
                    src={architectureImage}
                    alt="Architectural 3D BIM & Elevations"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="400px"
                  />
                  <div className="absolute top-3 left-3 bg-[#181C1B]/90 backdrop-blur-sm text-white text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded-sm border border-white/10">
                    PILLAR 01
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <Compass className="w-5 h-5 text-[#C85A32]" />
                    <h3 className="text-xl font-bold uppercase text-[#1E2322] tracking-tight">
                      ARCHITECTURAL DESIGNS
                    </h3>
                  </div>
                  <p className="text-xs text-[#1E2322]/80 font-sans leading-relaxed">
                    Transforming your spatial ambitions into functional, aesthetically breathtaking blueprints with 100% Vaastu alignment and municipal compliance.
                  </p>

                  <ul className="space-y-2 pt-3 border-t border-[#1E2322]/10 text-xs font-mono text-[#1E2322]/85">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#C85A32] shrink-0 mt-0.5" />
                      <span>2D Vaastu Floor Schemes & Working Drawings</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#C85A32] shrink-0 mt-0.5" />
                      <span>Photorealistic 3D Elevations & Virtual Tours</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#C85A32] shrink-0 mt-0.5" />
                      <span>Structural Soil Audit & Load Bearing Calculation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#C85A32] shrink-0 mt-0.5" />
                      <span>CMDA / DTCP Sanction & Approval Coordination</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  href={`${basePath}/services`}
                  className="w-full py-2.5 bg-[#1E2322] hover:bg-[#C85A32] text-white font-semibold text-xs uppercase tracking-wider rounded-sm transition-colors flex items-center justify-center gap-2"
                >
                  <span>EXPLORE ARCHITECTURE</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Pillar 2: Residential Construction */}
            <div className="bg-white border border-[#C85A32] ring-1 ring-[#C85A32]/20 rounded-sm shadow-md flex flex-col justify-between overflow-hidden relative group hover:shadow-lg hover:-translate-y-0.5 transition-all">
              <div className="absolute top-0 right-0 bg-[#C85A32] text-white text-[9px] font-mono font-bold uppercase px-3 py-1 tracking-widest z-10 rounded-bl-sm">
                CORE EXPERTISE
              </div>

              <div>
                <div className="relative h-56 w-full bg-[#141716] border-b border-[#C85A32]/30">
                  <Image
                    src={constructionImage}
                    alt="Residential Civil Construction"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="400px"
                  />
                  <div className="absolute top-3 left-3 bg-[#C85A32] text-white text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded-sm shadow-sm">
                    PILLAR 02
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <HardHat className="w-5 h-5 text-[#C85A32]" />
                    <h3 className="text-xl font-bold uppercase text-[#1E2322] tracking-tight">
                      RESIDENTIAL CONSTRUCTION
                    </h3>
                  </div>
                  <p className="text-xs text-[#1E2322]/80 font-sans leading-relaxed">
                    End-to-end turnkey civil execution with certified raw materials, dedicated site engineers, and continuous on-site quality testing.
                  </p>

                  <ul className="space-y-2 pt-3 border-t border-[#1E2322]/10 text-xs font-mono text-[#1E2322]/85">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#C85A32] shrink-0 mt-0.5" />
                      <span>Fe550D TMT Steel & Grade-53 Heavy Duty Concrete</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#C85A32] shrink-0 mt-0.5" />
                      <span>425-Point Rigorous Quality Assurance Checks</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#C85A32] shrink-0 mt-0.5" />
                      <span>10-Year Comprehensive Structural Warranty</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#C85A32] shrink-0 mt-0.5" />
                      <span>Guaranteed Zero Cost Escalation with Escrow</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  href={`${basePath}/services`}
                  className="w-full py-2.5 bg-[#C85A32] hover:bg-[#B34D28] text-white font-semibold text-xs uppercase tracking-wider rounded-sm transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <span>EXPLORE CIVIL PACKAGES</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Pillar 3: Interior Designs */}
            <div className="bg-[#F8F7F4] border border-[#1E2322]/15 rounded-sm shadow-sm flex flex-col justify-between overflow-hidden group hover:shadow-md hover:-translate-y-0.5 transition-all">
              <div>
                <div className="relative h-56 w-full bg-[#141716] border-b border-[#1E2322]/15">
                  <Image
                    src={interiorImage}
                    alt="Luxury Interior Design and Fitouts"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="400px"
                  />
                  <div className="absolute top-3 left-3 bg-[#181C1B]/90 backdrop-blur-sm text-[#C49B45] text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded-sm border border-white/10">
                    PILLAR 03
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <Layers className="w-5 h-5 text-[#C85A32]" />
                    <h3 className="text-xl font-bold uppercase text-[#1E2322] tracking-tight">
                      INTERIOR DESIGNS
                    </h3>
                  </div>
                  <p className="text-xs text-[#1E2322]/80 font-sans leading-relaxed">
                    Tailored residential spaces with factory-crafted modular joinery, imported hardware, concealed ambient lighting, and bespoke luxury finishes.
                  </p>

                  <ul className="space-y-2 pt-3 border-t border-[#1E2322]/10 text-xs font-mono text-[#1E2322]/85">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#C85A32] shrink-0 mt-0.5" />
                      <span>Modular Kitchens with Hettich / Hafele Fittings</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#C85A32] shrink-0 mt-0.5" />
                      <span>Custom Wardrobes & Vanity Units in HDHMR / Plywood</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#C85A32] shrink-0 mt-0.5" />
                      <span>Designer False Ceiling & Architectural Lighting</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#C85A32] shrink-0 mt-0.5" />
                      <span>Italian Marble Polishing & Fluted Wall Paneling</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  href={`${basePath}/services`}
                  className="w-full py-2.5 bg-[#1E2322] hover:bg-[#C85A32] text-white font-semibold text-xs uppercase tracking-wider rounded-sm transition-colors flex items-center justify-center gap-2"
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
      <section id="cost-calculator" className="py-24 px-4 sm:px-8 bg-[#F8F7F4] border-b border-[#1E2322]/15">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#181C1B] text-[#C49B45] text-xs font-mono font-semibold uppercase tracking-[0.2em] rounded-sm">
              <Calculator className="w-3.5 h-3.5 text-[#C85A32]" />
              <span>TRANSPARENT FINANCIAL CALCULATOR</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold uppercase text-[#1E2322] tracking-tight">
              ESTIMATE YOUR RESIDENTIAL BUILD IN SECONDS
            </h2>
            <p className="text-xs sm:text-sm text-[#1E2322]/75 font-sans">
              Choose your built-up square footage, structural floors, specification package, and interior scope to calculate an immediate, itemized estimate.
            </p>
          </div>

          {/* Embedded Cost Estimator Component */}
          <CostEstimator basePath={basePath} />
        </div>
      </section>

      {/* ─── 4. The 7-Stage Construction & 425+ Quality Audit Framework ─── */}
      <section id="stages" className="py-24 px-4 sm:px-8 bg-white border-b border-[#1E2322]/15">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F8F7F4] text-[#C49B45] text-xs font-mono font-semibold uppercase tracking-[0.2em] border border-[#1E2322]/15 rounded-sm">
              <FileCheck className="w-3.5 h-3.5 text-[#C85A32]" />
              <span>THE 425-POINT QUALITY CHECK SYSTEM</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold uppercase text-[#1E2322] tracking-tight">
              OUR 7-STAGE RIGOROUS CONSTRUCTION TIMELINE
            </h2>
            <p className="text-xs sm:text-sm text-[#1E2322]/75 font-sans">
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
                className="bg-[#F8F7F4] p-6 border border-[#1E2322]/15 rounded-sm shadow-sm hover:shadow-md hover:border-[#C85A32]/40 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center border-b border-[#1E2322]/15 pb-2">
                    <span className="text-2xl font-bold font-mono text-[#C85A32]">STAGE {stage.num}</span>
                    <span className="text-[10px] font-mono font-medium uppercase text-[#C49B45] bg-[#181C1B] px-2 py-0.5 rounded-sm">
                      {stage.audit}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold uppercase text-[#1E2322] tracking-tight leading-snug">
                    {stage.title}
                  </h4>
                  <p className="text-xs text-[#1E2322]/75 font-sans leading-relaxed">
                    {stage.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#1E2322]/10 flex items-center gap-1.5 text-[10px] font-mono text-[#C85A32] font-semibold">
                  <BadgeCheck className="w-3.5 h-3.5" />
                  <span>MANDATORY QC AUDIT PASSED</span>
                </div>
              </div>
            ))}

            {/* Final CTA Box in the Grid */}
            <div className="bg-[#181C1B] text-white p-6 border border-[#2D3331] rounded-sm shadow-md flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <span className="text-[10px] font-mono text-[#C49B45] font-semibold uppercase tracking-widest block">
                  ZERO-RISK CLIENT ASSURANCE
                </span>
                <h4 className="text-xl font-bold uppercase text-white tracking-tight">
                  100% TRANSPARENT SITE AUDITING
                </h4>
                <p className="text-xs text-stone-300/80 font-sans leading-relaxed">
                  Every milestone is backed by itemized test reports and photo documentation delivered to you directly.
                </p>
              </div>

              <Link
                href={`${basePath}#consultation-form`}
                className="w-full py-2.5 bg-[#C85A32] hover:bg-[#B34D28] text-white font-semibold text-xs uppercase tracking-widest rounded-sm transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <span>BOOK SITE VISIT</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 5. Transparent Construction Packages Matrix ─── */}
      <section id="packages" className="py-24 px-4 sm:px-8 bg-[#F8F7F4] border-b border-[#1E2322]/15">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#181C1B] text-[#C49B45] text-xs font-mono font-semibold uppercase tracking-[0.2em] rounded-sm">
              <Ruler className="w-3.5 h-3.5 text-[#C85A32]" />
              <span>CLEAR SPECIFICATIONS &bull; NO HIDDEN CHARGES</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold uppercase text-[#1E2322] tracking-tight">
              CIVIL CONSTRUCTION PACKAGES
            </h2>
            <p className="text-xs sm:text-sm text-[#1E2322]/75 font-sans">
              Compare our standardized construction packages with clear, itemized specifications on steel, cement, flooring, fittings, and guarantees.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Package 1: Essential Civil */}
            <div className="bg-white border border-[#1E2322]/15 rounded-sm shadow-sm p-6 sm:p-8 flex flex-col justify-between space-y-6 hover:shadow-md transition-all">
              <div>
                <div className="flex justify-between items-start border-b border-[#1E2322]/15 pb-4">
                  <div>
                    <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[#C49B45] block">
                      STANDARD TIER
                    </span>
                    <h3 className="text-2xl font-bold uppercase text-[#1E2322] tracking-tight">
                      ESSENTIAL CIVIL
                    </h3>
                  </div>
                  <div className="text-right font-mono">
                    <span className="text-2xl font-bold text-[#C85A32]">₹1,850</span>
                    <span className="text-[10px] text-[#1E2322]/70 block">/ SQ.FT</span>
                  </div>
                </div>

                <ul className="mt-6 space-y-3 text-xs font-mono text-[#1E2322]/85">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#C85A32] shrink-0 mt-0.5" />
                    <span><strong>Steel:</strong> Fe500D TMT ISI Certified Brands</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#C85A32] shrink-0 mt-0.5" />
                    <span><strong>Cement:</strong> Grade 53 (Dalmia / Zuari / Priya)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#C85A32] shrink-0 mt-0.5" />
                    <span><strong>Masonry:</strong> Standard AAC Blocks with Joint Mortar</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#C85A32] shrink-0 mt-0.5" />
                    <span><strong>Flooring:</strong> Double Charge Vitrified Tiles (₹55/sq.ft)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#C85A32] shrink-0 mt-0.5" />
                    <span><strong>Plumbing:</strong> Astral CPVC & Parryware Sanitary</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#C85A32] shrink-0 mt-0.5" />
                    <span><strong>Warranty:</strong> 5-Year Structural Guarantee</span>
                  </li>
                </ul>
              </div>

              <Link
                href={`${basePath}#consultation-form`}
                className="w-full py-2.5 bg-[#1E2322] hover:bg-[#C85A32] text-white font-semibold text-xs uppercase tracking-wider rounded-sm transition-colors text-center"
              >
                SELECT ESSENTIAL
              </Link>
            </div>

            {/* Package 2: Premium Villa (Featured) */}
            <div className="bg-white border border-[#C85A32] ring-1 ring-[#C85A32]/30 rounded-sm shadow-md p-6 sm:p-8 flex flex-col justify-between space-y-6 relative hover:shadow-lg transition-all">
              <div className="absolute top-0 right-0 bg-[#C85A32] text-white text-[9px] font-mono font-bold uppercase px-3 py-1 tracking-widest rounded-bl-sm">
                RECOMMENDED
              </div>

              <div>
                <div className="flex justify-between items-start border-b border-[#C85A32]/30 pb-4">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#C85A32] block">
                      PREMIUM TIER
                    </span>
                    <h3 className="text-2xl font-bold uppercase text-[#1E2322] tracking-tight">
                      PREMIUM VILLA
                    </h3>
                  </div>
                  <div className="text-right font-mono">
                    <span className="text-2xl font-bold text-[#C85A32]">₹2,250</span>
                    <span className="text-[10px] text-[#1E2322]/70 block">/ SQ.FT</span>
                  </div>
                </div>

                <ul className="mt-6 space-y-3 text-xs font-mono text-[#1E2322]/85">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#C85A32] shrink-0 mt-0.5" />
                    <span><strong>Steel:</strong> Fe550D Tata Tiscon / JSW Neosteel</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#C85A32] shrink-0 mt-0.5" />
                    <span><strong>Cement:</strong> UltraTech / ACC Grade-53 High Early</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#C85A32] shrink-0 mt-0.5" />
                    <span><strong>Masonry:</strong> Wire-cut Red Bricks / Heavy Density AAC</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#C85A32] shrink-0 mt-0.5" />
                    <span><strong>Flooring:</strong> Glazed Vitrified 4x2 Slabs (₹85/sq.ft)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#C85A32] shrink-0 mt-0.5" />
                    <span><strong>Plumbing:</strong> Jaquar / Kohler Concealed Diverters</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#C85A32] shrink-0 mt-0.5" />
                    <span><strong>Paint:</strong> Asian Paints Royale Luxury Interior Emulsion</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#C85A32] shrink-0 mt-0.5" />
                    <span><strong>Warranty:</strong> 10-Year Comprehensive Structural Guarantee</span>
                  </li>
                </ul>
              </div>

              <Link
                href={`${basePath}#consultation-form`}
                className="w-full py-3 bg-[#C85A32] hover:bg-[#B34D28] text-white font-semibold text-xs uppercase tracking-widest rounded-sm transition-colors text-center shadow-sm"
              >
                SELECT PREMIUM VILLA
              </Link>
            </div>

            {/* Package 3: Elite Architectural */}
            <div className="bg-white border border-[#1E2322]/15 rounded-sm shadow-sm p-6 sm:p-8 flex flex-col justify-between space-y-6 hover:shadow-md transition-all">
              <div>
                <div className="flex justify-between items-start border-b border-[#1E2322]/15 pb-4">
                  <div>
                    <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[#C49B45] block">
                      LUXURY TIER
                    </span>
                    <h3 className="text-2xl font-bold uppercase text-[#1E2322] tracking-tight">
                      ELITE ARCHITECTURAL
                    </h3>
                  </div>
                  <div className="text-right font-mono">
                    <span className="text-2xl font-bold text-[#C85A32]">₹2,750</span>
                    <span className="text-[10px] text-[#1E2322]/70 block">/ SQ.FT</span>
                  </div>
                </div>

                <ul className="mt-6 space-y-3 text-xs font-mono text-[#1E2322]/85">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#C85A32] shrink-0 mt-0.5" />
                    <span><strong>Steel:</strong> Primary Fe550D + Epoxy Anti-Corrosion Coating</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#C85A32] shrink-0 mt-0.5" />
                    <span><strong>Cement:</strong> UltraTech Super / Coromandel King 53</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#C85A32] shrink-0 mt-0.5" />
                    <span><strong>Masonry:</strong> Wienerberger Porotherm Clay Thermal Blocks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#C85A32] shrink-0 mt-0.5" />
                    <span><strong>Flooring:</strong> Italian Marble / Nexion 6x4 Slabs (₹140+/sq.ft)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#C85A32] shrink-0 mt-0.5" />
                    <span><strong>Plumbing:</strong> Grohe / Bravat German Sanitaryware</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#C85A32] shrink-0 mt-0.5" />
                    <span><strong>Smart Home:</strong> Full IoT Conduiting & Solar Roof Provision</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#C85A32] shrink-0 mt-0.5" />
                    <span><strong>Warranty:</strong> 10-Year Full Structural + 2-Yr Maintenance</span>
                  </li>
                </ul>
              </div>

              <Link
                href={`${basePath}#consultation-form`}
                className="w-full py-2.5 bg-[#1E2322] hover:bg-[#C85A32] text-white font-semibold text-xs uppercase tracking-wider rounded-sm transition-colors text-center"
              >
                SELECT ELITE LUXURY
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 6. Client Reviews & Engineering Credibility ─── */}
      <section id="testimonials" className="py-24 px-4 sm:px-8 bg-white border-b border-[#1E2322]/15">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Rating Overview Box */}
            <div className="lg:col-span-4 bg-[#181C1B] text-white p-8 border border-[#2D3331] rounded-sm shadow-md space-y-6">
              <span className="text-xs font-mono font-semibold uppercase tracking-[0.2em] text-[#C49B45] block">
                AUDITED CLIENT REVIEWS
              </span>
              <div className="flex items-baseline gap-3">
                <span className="text-5xl font-bold font-mono text-white">{rating}</span>
                <span className="text-lg text-[#C49B45] font-semibold">/ 5.0</span>
              </div>

              <div className="flex gap-1 text-[#C85A32]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>

              <p className="text-xs text-stone-300/80 font-sans leading-relaxed">
                Over <strong>{reviewCount} verified home owners</strong> have trusted our integrated architectural and civil construction teams for their residences.
              </p>

              <div className="pt-4 border-t border-[#2D3331]">
                <span className="text-[10px] font-mono text-[#C49B45] uppercase tracking-wider block font-semibold">
                  VERIFIED GOOGLE MAPS SCORE
                </span>
              </div>
            </div>

            {/* Reviews Cards */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {reviews.slice(0, 4).map((rev, idx) => (
                <div
                  key={idx}
                  className="bg-[#F8F7F4] p-6 border border-[#1E2322]/15 rounded-sm shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md hover:border-[#C85A32]/40 transition-all"
                >
                  <div className="space-y-3">
                    <div className="flex gap-1 text-[#C85A32]">
                      {[...Array(rev.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <p className="text-xs text-[#1E2322]/85 font-sans leading-relaxed italic">
                      &ldquo;{rev.text}&rdquo;
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#1E2322]/10 flex items-center justify-between text-[11px] font-mono">
                    <span className="font-bold text-[#1E2322] uppercase">{rev.author_name}</span>
                    <span className="text-[#1E2322]/60">{rev.relative_time_description || 'Verified Client'}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── 7. Consultation Booking Section ─── */}
      <section id="consultation" className="py-24 px-4 sm:px-8 bg-[#F8F7F4]">
        <div className="max-w-7xl mx-auto">
          <ConsultationForm clinicName={clinicName} phone={clinicPhone} />
        </div>
      </section>
    </div>
  );
}
