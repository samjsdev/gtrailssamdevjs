import { readSourceConfig } from '@/lib/dataBuilder';
import { cleanClinicName, cleanClinicDescription } from '@/lib/copyCleaner';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import CostCalculator from './CostCalculator';
import {
  Compass, Building, Sparkles, ShieldCheck, ArrowRight, Phone,
  CheckCircle2, HardHat, Ruler, FileCheck, Layers, Award,
  Clock, Check, MapPin, Calculator, Star, Users, CheckSquare
} from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function Template10HomePage({ params }: PageProps) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const data = await readSourceConfig(slug, 'template10');

  if (!data || !data.clinic) {
    notFound();
  }

  const clinicName = cleanClinicName(data.clinic.name);
  const clinicTagline = data.clinic.tagline || 'End-to-End Architectural Design, Turnkey Residential Construction & Luxury Interiors';
  const clinicDescription = cleanClinicDescription(data.clinic.description, data.clinic.name);
  const clinicPhone = data.clinic.contact?.phone || '+91 81100 00384';
  const clinicAddress = data.clinic.address?.full || 'Corporate Studio & Civil Engineering Center, Chennai & Bangalore';

  const doctorName = data.doctor?.name || 'Ar. Rajesh Varma & Team';
  const doctorExperience = data.doctor?.experience || '18+ Years';
  const doctorSpecialization = data.doctor?.specialization || 'Principal Architect & Senior Civil Engineer';

  const servicesList: string[] = (data.business?.services && data.business.services.length > 0)
    ? (data.business.services as string[])
    : [
        'Turnkey Residential House Construction',
        'Architectural Concept Design & 3D BIM Modeling',
        'Structural Engineering, Soil Tests & RCC Framed Blueprints',
        'Bespoke Luxury Interior Design & Custom Millwork',
        'Building Approvals, Plan Sanctions & Milestone Inspections',
        '400-Point Rigorous Quality Audits with Fixed Cost Guarantee'
      ];

  const highlightsList: string[] = (data.business?.highlights && data.business.highlights.length > 0)
    ? (data.business.highlights as string[])
    : [
        'Over 850+ Luxury Homes & Residential Villas Delivered On-Time',
        '10-Year Comprehensive Structural Warranty on All Civil Work',
        'Guaranteed Zero Cost Escalation with Itemised Milestone Billing',
        'Dedicated Senior Project Manager Assigned to Every Individual Site',
        'Lab-Certified Fe550D TMT Structural Steel & Tested Grade-53 Concrete',
        'Transparent Digital Stage Tracking with Weekly Photographic Audits'
      ];

  const media = data.media || {};
  const heroImage = media.clinicImages?.[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80';
  const secondaryImage = media.clinicImages?.[1] || 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80';
  const principalImage = media.otherImages?.[0] || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80';

  const projectImages = [
    media.otherImages?.[1] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    media.otherImages?.[2] || 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    media.otherImages?.[3] || 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
    media.otherImages?.[4] || 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80',
    media.otherImages?.[5] || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
    media.otherImages?.[6] || 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80',
  ];

  const basePath = `/designwebsite/template10/${slug}`;

  return (
    <div className="w-full bg-[#111111] text-[#F4F3EE]">
      {/* ─────────────────────────────────────────────────────────────
          SECTION 1: HERO SECTION
          Oversized condensed typography, burnt orange 3D block signage,
          charcoal surface, hard black directional shadow, live metrics
      ────────────────────────────────────────────────────────────── */}
      <section id="hero" className="relative min-h-[90vh] bg-[#111111] flex flex-col justify-center border-b-4 border-[#252A29] overflow-hidden">
        {/* Background Image with Charcoal Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src={heroImage}
            alt="Hero Architectural Construction Banner"
            fill
            priority
            className="object-cover opacity-25 filter grayscale contrast-125"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#111111] via-[#111111]/90 to-[#252A29]/70" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-16 sm:py-24 w-full">
          <div className="max-w-4xl">
            {/* Top Signage Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#E94B26] text-[#F4F3EE] text-xs font-black uppercase tracking-[0.2em] mb-6 border border-[#111111] shadow-[3px_3px_0px_#111111]">
              <HardHat className="w-4 h-4" />
              <span>A TURNKEY RESIDENTIAL CONSTRUCTION & ARCHITECTURE FIRM</span>
            </div>

            {/* Oversized Condensed Heavy Display Title */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase text-[#F4F3EE] tracking-tight leading-[0.95] mb-6 drop-shadow-md">
              END-TO-END <span className="text-[#E94B26]">ARCHITECTURAL DESIGN</span> & RESIDENTIAL CONSTRUCTION
            </h1>

            <p className="text-base sm:text-xl font-bold uppercase tracking-wider text-[#C8A84E] mb-4">
              {clinicTagline}
            </p>

            <p className="text-sm sm:text-base text-[#F4F3EE]/80 leading-relaxed font-sans max-w-2xl mb-8">
              {clinicDescription}
            </p>

            {/* Action Triggers */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href={`${basePath}#cost-calculator`}
                className="px-8 py-4 bg-[#E94B26] text-[#F4F3EE] font-black text-xs sm:text-sm uppercase tracking-widest border border-[#111111] shadow-[6px_6px_0px_#111111] hover:shadow-[2px_2px_0px_#111111] hover:translate-x-1 hover:translate-y-1 transition-all flex items-center gap-2.5"
              >
                <Calculator className="w-4 h-4" />
                <span>CALCULATE CONSTRUCTION COST</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href={`${basePath}/contact`}
                className="px-8 py-4 bg-[#252A29] text-[#F4F3EE] font-black text-xs sm:text-sm uppercase tracking-widest border-2 border-[#C8A84E] hover:bg-[#2e3433] hover:border-[#E94B26] transition-all flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#C8A84E]" />
                <span>BOOK FREE CONSULTATION</span>
              </Link>
            </div>
          </div>

          {/* 4 Hard Industrial Metric Pillars */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 pt-10 border-t-2 border-[#252A29]">
            <div className="bg-[#181B1A] p-5 border-2 border-[#252A29] shadow-[4px_4px_0px_#111111]">
              <span className="text-3xl sm:text-4xl font-black text-[#E94B26] tracking-tight block">
                {doctorExperience}
              </span>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#C8A84E] mt-1 block">
                CIVIL EXCELLENCE
              </span>
              <p className="text-[11px] text-[#F4F3EE]/60 font-mono mt-0.5">Established Heritage</p>
            </div>

            <div className="bg-[#181B1A] p-5 border-2 border-[#252A29] shadow-[4px_4px_0px_#111111]">
              <span className="text-3xl sm:text-4xl font-black text-[#F4F3EE] tracking-tight block">
                850+
              </span>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#C8A84E] mt-1 block">
                PROJECTS DELIVERED
              </span>
              <p className="text-[11px] text-[#F4F3EE]/60 font-mono mt-0.5">Villas & Homes</p>
            </div>

            <div className="bg-[#181B1A] p-5 border-2 border-[#252A29] shadow-[4px_4px_0px_#111111]">
              <span className="text-3xl sm:text-4xl font-black text-[#E94B26] tracking-tight block">
                100%
              </span>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#C8A84E] mt-1 block">
                ON-TIME HANDOVER
              </span>
              <p className="text-[11px] text-[#F4F3EE]/60 font-mono mt-0.5">Penalty Clause Guaranteed</p>
            </div>

            <div className="bg-[#181B1A] p-5 border-2 border-[#252A29] shadow-[4px_4px_0px_#111111]">
              <span className="text-3xl sm:text-4xl font-black text-[#F4F3EE] tracking-tight block">
                400+
              </span>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#C8A84E] mt-1 block">
                QUALITY AUDITS
              </span>
              <p className="text-[11px] text-[#F4F3EE]/60 font-mono mt-0.5">Rigorous Checklist</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 2: THREE INTEGRATED PILLARS
          Architectural Designs • Residential Construction • Turnkey Interiors
      ────────────────────────────────────────────────────────────── */}
      <section id="pillars" className="py-20 px-4 sm:px-8 bg-[#181B1A] border-b-4 border-[#252A29]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block px-3 py-1 bg-[#252A29] text-[#C8A84E] text-xs font-bold uppercase tracking-[0.25em] border border-[#C8A84E]/40 mb-3">
              END-TO-END EXECUTION SERVICES
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase text-[#F4F3EE] tracking-tight">
              OUR THREE CORE PILLARS
            </h2>
            <p className="text-xs sm:text-sm font-mono text-[#F4F3EE]/70 mt-2">
              SEAMLESS CONVERGENCE OF CREATIVE ARCHITECTURE, PRECISION CIVIL ENGINEERING, AND LUXURY INTERIOR CRAFTSMANSHIP
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pillar 1: Architectural Designs */}
            <div className="bg-[#111111] border-2 border-[#252A29] p-8 relative group hover:border-[#E94B26] transition-all shadow-[6px_6px_0px_#111111]">
              <div className="w-14 h-14 bg-[#252A29] text-[#E94B26] font-black text-2xl flex items-center justify-center border border-[#C8A84E]/40 group-hover:bg-[#E94B26] group-hover:text-[#F4F3EE] transition-colors mb-6">
                <Compass className="w-7 h-7" />
              </div>
              <span className="text-[10px] font-mono text-[#C8A84E] uppercase tracking-widest block mb-1">
                PILLAR 01
              </span>
              <h3 className="text-2xl font-black uppercase text-[#F4F3EE] tracking-tight mb-4">
                ARCHITECTURAL DESIGNS
              </h3>
              <p className="text-xs text-[#F4F3EE]/75 leading-relaxed mb-6 font-sans">
                Contemporary facade elevations, photorealistic 3D BIM visualization, structural floor plans, and 100% Vastu-aligned residential blueprints tailored to your plot geometry.
              </p>
              <ul className="space-y-2 border-t border-[#252A29] pt-4 text-xs font-mono text-[#F4F3EE]/80 mb-6">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#E94B26]" />
                  <span>3D Exterior Elevation Modeling</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#E94B26]" />
                  <span>Structural Framing & Soil Reports</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#E94B26]" />
                  <span>Municipal Sanction Drawings</span>
                </li>
              </ul>
              <Link
                href={`${basePath}/services`}
                className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#E94B26] hover:text-[#C8A84E] transition-colors"
              >
                <span>EXPLORE ARCHITECTURAL SCOPE</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Pillar 2: Residential Construction */}
            <div className="bg-[#252A29] border-2 border-[#E94B26] p-8 relative shadow-[6px_6px_0px_#E94B26]">
              <div className="absolute -top-3 right-4 bg-[#E94B26] text-[#F4F3EE] text-[9px] font-black uppercase px-2.5 py-0.5 tracking-widest">
                CORE CIVIL SPECIALTY
              </div>
              <div className="w-14 h-14 bg-[#E94B26] text-[#F4F3EE] font-black text-2xl flex items-center justify-center border border-[#111111] mb-6">
                <Building className="w-7 h-7" />
              </div>
              <span className="text-[10px] font-mono text-[#C8A84E] uppercase tracking-widest block mb-1">
                PILLAR 02
              </span>
              <h3 className="text-2xl font-black uppercase text-[#F4F3EE] tracking-tight mb-4">
                RESIDENTIAL CONSTRUCTION
              </h3>
              <p className="text-xs text-[#F4F3EE]/85 leading-relaxed mb-6 font-sans">
                Turnkey civil execution for luxury individual houses and modern duplex villas using premium Fe550D steel, high-grade certified concrete, and dedicated site project managers.
              </p>
              <ul className="space-y-2 border-t border-[#181B1A] pt-4 text-xs font-mono text-[#F4F3EE] mb-6">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#C8A84E]" />
                  <span>RCC Framed Robust Structure</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#C8A84E]" />
                  <span>400-Point Quality Audits</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#C8A84E]" />
                  <span>Guaranteed Fixed Timelines</span>
                </li>
              </ul>
              <Link
                href={`${basePath}/services`}
                className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#F4F3EE] hover:text-[#C8A84E] transition-colors"
              >
                <span>EXPLORE CIVIL PACKAGES</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Pillar 3: Interior Designs */}
            <div className="bg-[#111111] border-2 border-[#252A29] p-8 relative group hover:border-[#E94B26] transition-all shadow-[6px_6px_0px_#111111]">
              <div className="w-14 h-14 bg-[#252A29] text-[#C8A84E] font-black text-2xl flex items-center justify-center border border-[#C8A84E]/40 group-hover:bg-[#E94B26] group-hover:text-[#F4F3EE] transition-colors mb-6">
                <Sparkles className="w-7 h-7" />
              </div>
              <span className="text-[10px] font-mono text-[#C8A84E] uppercase tracking-widest block mb-1">
                PILLAR 03
              </span>
              <h3 className="text-2xl font-black uppercase text-[#F4F3EE] tracking-tight mb-4">
                INTERIOR DESIGNS
              </h3>
              <p className="text-xs text-[#F4F3EE]/75 leading-relaxed mb-6 font-sans">
                Full-home interior fit-outs, bespoke modular kitchens with Blum hardware, custom wardrobe joinery, architectural false ceilings, and integrated ambient lighting systems.
              </p>
              <ul className="space-y-2 border-t border-[#252A29] pt-4 text-xs font-mono text-[#F4F3EE]/80 mb-6">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#E94B26]" />
                  <span>Custom Modular Kitchen Joinery</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#E94B26]" />
                  <span>Designer Ceiling & Lighting</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#E94B26]" />
                  <span>Italian Marble & Premium Finishes</span>
                </li>
              </ul>
              <Link
                href={`${basePath}/services`}
                className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#E94B26] hover:text-[#C8A84E] transition-colors"
              >
                <span>EXPLORE INTERIOR WORKS</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 3: REAL-TIME COST ESTIMATION CALCULATOR
          Interactive slider, package switching, itemized cost split
      ────────────────────────────────────────────────────────────── */}
      <section id="cost-calculator" className="py-20 px-4 sm:px-8 bg-[#111111] border-b-4 border-[#252A29]">
        <div className="max-w-7xl mx-auto">
          <CostCalculator basePath={basePath} />
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 4: CONSTRUCTION PACKAGES COMPARISON
          Standard, Premium, Ultra-Luxury itemized technical specs
      ────────────────────────────────────────────────────────────── */}
      <section id="packages" className="py-20 px-4 sm:px-8 bg-[#181B1A] border-b-4 border-[#252A29]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block px-3 py-1 bg-[#252A29] text-[#C8A84E] text-xs font-bold uppercase tracking-[0.25em] border border-[#C8A84E]/40 mb-3">
              TRANSPARENT SPECIFICATIONS
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase text-[#F4F3EE] tracking-tight">
              OUR RESIDENTIAL CONSTRUCTION PACKAGES
            </h2>
            <p className="text-xs sm:text-sm font-mono text-[#F4F3EE]/70 mt-2">
              FIXED-COST CONTRACTS WITH CERTIFIED RAW MATERIALS & METICULOUS CIVIL CRAFTSMANSHIP
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Standard Package */}
            <div className="bg-[#111111] border-2 border-[#252A29] p-8 flex flex-col justify-between shadow-[6px_6px_0px_#111111]">
              <div>
                <div className="text-xs font-mono text-[#C8A84E] uppercase tracking-widest mb-1">
                  TIER 01 &bull; ESSENTIAL
                </div>
                <h3 className="text-2xl font-black uppercase text-[#F4F3EE] tracking-tight mb-2">
                  STANDARD PACKAGE
                </h3>
                <div className="text-3xl font-black text-[#E94B26] mb-6">
                  ₹2,150 <span className="text-xs font-normal text-[#F4F3EE]/60">/ sq.ft Built-Up</span>
                </div>

                <div className="space-y-4 text-xs font-mono text-[#F4F3EE]/80 border-t border-[#252A29] pt-6">
                  <div>
                    <span className="font-bold text-[#C8A84E] block mb-1">STRUCTURAL & CIVIL</span>
                    <p>Fe500 TMT Steel (Tata/JSW), UltraTech 53G Cement, Wire-cut red clay bricks.</p>
                  </div>
                  <div>
                    <span className="font-bold text-[#C8A84E] block mb-1">FLOORING & DADO</span>
                    <p>2x2 Double Charged Vitrified Tiles (Kajaria / Somany), Anti-skid ceramic in baths.</p>
                  </div>
                  <div>
                    <span className="font-bold text-[#C8A84E] block mb-1">PLUMBING & SANITARY</span>
                    <p>Parryware / Hindware wall-hung closets, CPVC Astral internal water piping.</p>
                  </div>
                  <div>
                    <span className="font-bold text-[#C8A84E] block mb-1">DOORS & WINDOWS</span>
                    <p>Teakwood main door frame, flush internal doors, powder-coated aluminium windows.</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[#252A29]">
                <Link
                  href={`${basePath}/contact?package=standard`}
                  className="w-full py-3.5 bg-[#252A29] text-[#F4F3EE] hover:bg-[#E94B26] font-black text-xs uppercase tracking-widest text-center block transition-colors border border-[#C8A84E]/40"
                >
                  SELECT STANDARD PLAN
                </Link>
              </div>
            </div>

            {/* Premium Package */}
            <div className="bg-[#252A29] border-2 border-[#E94B26] p-8 flex flex-col justify-between relative shadow-[8px_8px_0px_#E94B26]">
              <div className="absolute -top-3 right-6 bg-[#E94B26] text-[#F4F3EE] text-[9px] font-black uppercase px-3 py-1 tracking-widest">
                RECOMMENDED BESTSELLER
              </div>
              <div>
                <div className="text-xs font-mono text-[#C8A84E] uppercase tracking-widest mb-1">
                  TIER 02 &bull; PREMIUM ARCHITECTURAL
                </div>
                <h3 className="text-2xl font-black uppercase text-[#F4F3EE] tracking-tight mb-2">
                  PREMIUM PACKAGE
                </h3>
                <div className="text-3xl font-black text-[#E94B26] mb-6">
                  ₹2,750 <span className="text-xs font-normal text-[#F4F3EE]/60">/ sq.ft Built-Up</span>
                </div>

                <div className="space-y-4 text-xs font-mono text-[#F4F3EE] border-t border-[#181B1A] pt-6">
                  <div>
                    <span className="font-bold text-[#C8A84E] block mb-1">STRUCTURAL & CIVIL</span>
                    <p>Fe550D High-Corrosion Resistant Steel, M20 Grade RMC Ready-Mix Concrete, 9-inch solid AAC/Red brick masonry.</p>
                  </div>
                  <div>
                    <span className="font-bold text-[#C8A84E] block mb-1">FLOORING & DADO</span>
                    <p>4x2 Large Format Glazed Vitrified Tiles, Granite staircases with SS glass railings.</p>
                  </div>
                  <div>
                    <span className="font-bold text-[#C8A84E] block mb-1">PLUMBING & SANITARY</span>
                    <p>Jaquar / Kohler Concealed Diverters, Grohe bathroom fittings, solar water line.</p>
                  </div>
                  <div>
                    <span className="font-bold text-[#C8A84E] block mb-1">DOORS & WINDOWS</span>
                    <p>First-Grade First Class Teak main door, 3-track German UPVC soundproof windows with mesh.</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[#181B1A]">
                <Link
                  href={`${basePath}/contact?package=premium`}
                  className="w-full py-3.5 bg-[#E94B26] text-[#F4F3EE] hover:bg-[#d63d1a] font-black text-xs uppercase tracking-widest text-center block transition-colors border border-[#111111] shadow-[3px_3px_0px_#111111]"
                >
                  SELECT PREMIUM PLAN
                </Link>
              </div>
            </div>

            {/* Ultra Luxury Package */}
            <div className="bg-[#111111] border-2 border-[#252A29] p-8 flex flex-col justify-between shadow-[6px_6px_0px_#111111]">
              <div>
                <div className="text-xs font-mono text-[#C8A84E] uppercase tracking-widest mb-1">
                  TIER 03 &bull; VILLA BESPOKE
                </div>
                <h3 className="text-2xl font-black uppercase text-[#F4F3EE] tracking-tight mb-2">
                  ULTRA LUXURY
                </h3>
                <div className="text-3xl font-black text-[#E94B26] mb-6">
                  ₹3,500 <span className="text-xs font-normal text-[#F4F3EE]/60">/ sq.ft Built-Up</span>
                </div>

                <div className="space-y-4 text-xs font-mono text-[#F4F3EE]/80 border-t border-[#252A29] pt-6">
                  <div>
                    <span className="font-bold text-[#C8A84E] block mb-1">STRUCTURAL & CIVIL</span>
                    <p>Seismic Zone IV engineered foundation, complete waterproofing warranty, heat insulation.</p>
                  </div>
                  <div>
                    <span className="font-bold text-[#C8A84E] block mb-1">FLOORING & DADO</span>
                    <p>Imported Italian Marble in foyer, living & dining; engineered wooden flooring in suites.</p>
                  </div>
                  <div>
                    <span className="font-bold text-[#C8A84E] block mb-1">PLUMBING & SANITARY</span>
                    <p>Grohe / Toto Sensor Bathrooms, rain showers, pressure booster systems, smart automation lines.</p>
                  </div>
                  <div>
                    <span className="font-bold text-[#C8A84E] block mb-1">DOORS & WINDOWS</span>
                    <p>Solid Burma Teakwood frames throughout, double-glazed Schuco architectural windows.</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[#252A29]">
                <Link
                  href={`${basePath}/contact?package=luxury`}
                  className="w-full py-3.5 bg-[#252A29] text-[#F4F3EE] hover:bg-[#E94B26] font-black text-xs uppercase tracking-widest text-center block transition-colors border border-[#C8A84E]/40"
                >
                  SELECT ULTRA LUXURY PLAN
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 5: 5-STAGE TURNKEY BLUEPRINT ROADMAP
          From conceptual architecture to keys handover
      ────────────────────────────────────────────────────────────── */}
      <section id="roadmap" className="py-20 px-4 sm:px-8 bg-[#111111] border-b-4 border-[#252A29]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block px-3 py-1 bg-[#252A29] text-[#C8A84E] text-xs font-bold uppercase tracking-[0.25em] border border-[#C8A84E]/40 mb-3">
              EXECUTION DISCIPLINE
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase text-[#F4F3EE] tracking-tight">
              5-STAGE TURNKEY BLUEPRINT
            </h2>
            <p className="text-xs sm:text-sm font-mono text-[#F4F3EE]/70 mt-2">
              HOW WE TRANSFORM BARE LAND INTO AN ARCHITECTURAL MASTERPIECE WITH ZERO CONTRACTUAL DELAYS
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            {[
              {
                num: '01',
                title: 'SPATIAL & ARCHITECTURAL 3D',
                desc: 'Detailed site soil survey, Vastu layout mapping, photorealistic 3D elevations and municipal sanction clearance.',
                icon: Ruler,
              },
              {
                num: '02',
                title: 'STRUCTURAL ENGINEERING',
                desc: 'BIM modeling, structural column sizing, reinforcement schedules, and soil bearing capacity test audits.',
                icon: HardHat,
              },
              {
                num: '03',
                title: 'FOUNDATION & CIVIL SHELL',
                desc: 'Excavation, anti-termite treatment, plinth beam casting, Fe550D column framework and precision brickwork.',
                icon: Building,
              },
              {
                num: '04',
                title: 'MEP & INTERIOR JOINERY',
                desc: 'Concealed electrical conduits, plumbing pressure tests, flooring, false ceiling, and bespoke modular cabinetry.',
                icon: Layers,
              },
              {
                num: '05',
                title: '400-POINT AUDIT & KEYS',
                desc: 'Exhaustive 400-point structural inspection, deep clean styling, and turnkey keys handover with 10-year warranty.',
                icon: Award,
              },
            ].map((step, idx) => {
              const StepIcon = step.icon;
              return (
                <div
                  key={step.num}
                  className="bg-[#181B1A] border-2 border-[#252A29] p-6 relative flex flex-col justify-between hover:border-[#E94B26] transition-colors shadow-[4px_4px_0px_#111111]"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-black text-[#E94B26] font-mono">
                        {step.num}
                      </span>
                      <StepIcon className="w-5 h-5 text-[#C8A84E]" />
                    </div>
                    <h4 className="text-sm font-black uppercase text-[#F4F3EE] tracking-tight mb-2">
                      {step.title}
                    </h4>
                    <p className="text-xs text-[#F4F3EE]/70 font-sans leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-[#252A29] text-[10px] font-mono text-[#C8A84E]">
                    PHASE {idx + 1} OF 5
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 6: ENGINEERING STANDARDS & HIGHLIGHTS
          Dynamic highlights mapping with high contrast badges
      ────────────────────────────────────────────────────────────── */}
      <section id="highlights" className="py-20 px-4 sm:px-8 bg-[#181B1A] border-b-4 border-[#252A29]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-block px-3 py-1 bg-[#252A29] text-[#C8A84E] text-xs font-bold uppercase tracking-[0.25em] border border-[#C8A84E]/40">
                QUALITY ASSURANCE
              </div>
              <h2 className="text-3xl sm:text-5xl font-black uppercase text-[#F4F3EE] tracking-tight leading-none">
                WHY CHOOSE <span className="text-[#E94B26]">{clinicName}</span> FOR YOUR HOME
              </h2>
              <p className="text-xs sm:text-sm text-[#F4F3EE]/75 leading-relaxed font-sans">
                We eliminate the stress of residential construction through absolute technical transparency, fixed pricing, and uncompromising civil craftsmanship under senior registered structural engineers.
              </p>
              
              {/* Image box */}
              <div className="relative h-64 w-full border-4 border-[#252A29] overflow-hidden shadow-[6px_6px_0px_#111111]">
                <Image
                  src={secondaryImage}
                  alt="Quality Civil Engineering On-Site"
                  fill
                  className="object-cover grayscale contrast-125"
                  sizes="(max-width: 1024px) 100vw, 500px"
                />
                <div className="absolute bottom-3 left-3 bg-[#E94B26] text-[#F4F3EE] text-[10px] font-black uppercase tracking-widest px-3 py-1">
                  100% QUALITY AUDITED SITES
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {highlightsList.map((highlight, idx) => (
                <div
                  key={idx}
                  className="bg-[#111111] p-6 border-2 border-[#252A29] flex flex-col justify-between hover:border-[#C8A84E] transition-colors shadow-[4px_4px_0px_#111111]"
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#E94B26] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] font-mono text-[#C8A84E] uppercase tracking-wider block mb-1">
                        STANDARD ASSURANCE #{idx + 1}
                      </span>
                      <p className="text-xs font-bold text-[#F4F3EE] leading-relaxed">
                        {highlight}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 pt-2 border-t border-[#181B1A] flex justify-end">
                    <span className="text-[9px] font-mono text-[#F4F3EE]/40 uppercase">VERIFIED</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 7: FEATURED PROJECTS & SITES GALLERY
      ────────────────────────────────────────────────────────────── */}
      <section id="projects" className="py-20 px-4 sm:px-8 bg-[#111111] border-b-4 border-[#252A29]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
            <div>
              <div className="inline-block px-3 py-1 bg-[#252A29] text-[#C8A84E] text-xs font-bold uppercase tracking-[0.25em] border border-[#C8A84E]/40 mb-3">
                BUILT PORTFOLIO
              </div>
              <h2 className="text-3xl sm:text-5xl font-black uppercase text-[#F4F3EE] tracking-tight">
                RECENT ARCHITECTURAL & RESIDENTIAL PROJECTS
              </h2>
            </div>
            <Link
              href={`${basePath}/gallery`}
              className="px-6 py-3 bg-[#252A29] text-[#F4F3EE] hover:bg-[#E94B26] font-black text-xs uppercase tracking-widest border border-[#C8A84E]/40 transition-colors flex items-center gap-2"
            >
              <span>VIEW FULL PORTFOLIO</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'The Obsidian Grand Villa',
                category: 'RESIDENTIAL CONSTRUCTION',
                img: projectImages[0],
                location: 'Grand Enclave, 4,200 sq.ft',
              },
              {
                title: 'Monolith Architectural Residence',
                category: 'ARCHITECTURAL DESIGN',
                img: projectImages[1],
                location: 'Hilltop Avenue, 5,500 sq.ft',
              },
              {
                title: 'Vanguard Penthouse Interior',
                category: 'TURNKEY INTERIOR',
                img: projectImages[2],
                location: 'Prime Skyline, 3,600 sq.ft',
              },
              {
                title: 'The Courtyard Contemporary Villa',
                category: 'RESIDENTIAL CONSTRUCTION',
                img: projectImages[3],
                location: 'Palm Meadows, 4,800 sq.ft',
              },
              {
                title: 'Industrial Brutalist Elevation',
                category: 'ARCHITECTURAL DESIGN',
                img: projectImages[4],
                location: 'Boulevard Road, 6,100 sq.ft',
              },
              {
                title: 'Luxe Living Suite & Kitchen',
                category: 'TURNKEY INTERIOR',
                img: projectImages[5],
                location: 'Central Residency, 3,100 sq.ft',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="group bg-[#181B1A] border-2 border-[#252A29] hover:border-[#E94B26] overflow-hidden transition-all shadow-[4px_4px_0px_#111111]"
              >
                <div className="relative h-64 w-full overflow-hidden bg-[#111111]">
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                  <div className="absolute top-3 left-3 bg-[#111111]/90 text-[#C8A84E] text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 border border-[#C8A84E]/40">
                    {item.category}
                  </div>
                </div>
                <div className="p-5">
                  <h4 className="text-lg font-black uppercase text-[#F4F3EE] tracking-tight group-hover:text-[#E94B26] transition-colors mb-1">
                    {item.title}
                  </h4>
                  <p className="text-xs font-mono text-[#F4F3EE]/60">
                    {item.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 8: PRINCIPAL LEADERSHIP & ARCHITECT PROFILE
      ────────────────────────────────────────────────────────────── */}
      <section id="leadership" className="py-20 px-4 sm:px-8 bg-[#181B1A] border-b-4 border-[#252A29]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-[#111111] p-8 sm:p-12 border-4 border-[#252A29] shadow-[8px_8px_0px_#111111]">
            <div className="lg:col-span-4 relative h-80 sm:h-96 w-full border-2 border-[#C8A84E]">
              <Image
                src={principalImage}
                alt={doctorName}
                fill
                className="object-cover grayscale contrast-125"
                sizes="(max-width: 1024px) 100vw, 400px"
              />
              <div className="absolute bottom-3 left-3 bg-[#E94B26] text-[#F4F3EE] text-xs font-black uppercase tracking-widest px-3 py-1">
                CHIEF OF ARCHITECTURE
              </div>
            </div>

            <div className="lg:col-span-8 space-y-4">
              <div className="inline-block px-3 py-1 bg-[#252A29] text-[#C8A84E] text-xs font-bold uppercase tracking-[0.25em] border border-[#C8A84E]/40">
                LEADERSHIP & ENGINEERING CREED
              </div>
              <h3 className="text-3xl sm:text-4xl font-black uppercase text-[#F4F3EE] tracking-tight">
                {doctorName}
              </h3>
              <p className="text-xs font-mono text-[#E94B26] uppercase tracking-wider font-bold">
                {doctorSpecialization} &bull; {doctorExperience} OF TECHNICAL MASTERY
              </p>
              <p className="text-xs sm:text-sm text-[#F4F3EE]/80 leading-relaxed font-sans pt-2">
                &ldquo;True architectural elegance does not compromise structural durability. We approach every single home with the mathematical precision of structural engineering and the artistic vision of contemporary design. Our clients entrust us with their life&apos;s savings, and we deliver enduring spaces that stand firm for generations.&rdquo;
              </p>
              <div className="pt-4 flex flex-wrap gap-4 text-xs font-mono text-[#C8A84E]">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#E94B26]" />
                  Council of Architecture (COA) Accredited
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#E94B26]" />
                  Institution of Engineers (IEI) Fellow
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 9: CLIENT TESTIMONIALS & REVIEWS
      ────────────────────────────────────────────────────────────── */}
      <section id="reviews" className="py-20 px-4 sm:px-8 bg-[#111111] border-b-4 border-[#252A29]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block px-3 py-1 bg-[#252A29] text-[#C8A84E] text-xs font-bold uppercase tracking-[0.25em] border border-[#C8A84E]/40 mb-3">
              CLIENT EXPERIENCES
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase text-[#F4F3EE] tracking-tight">
              WHAT HOMEOWNERS SAY ABOUT OUR EXECUTION
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'K. Venkatesh & Family',
                role: '4,500 sq.ft Triplex Villa Homeowner',
                text: 'From the initial 3D elevation drawings to the final key handover, their civil engineering rigor was unmatched. Zero cost overruns and completed exactly in 11 months as promised in the contract.',
                rating: 5,
              },
              {
                name: 'Dr. Anita & Dr. Senthil',
                role: '5,200 sq.ft Contemporary Villa',
                text: 'The best decision we made for our home construction. The team maintained weekly site photo logs, tested every batch of concrete, and executed the architectural plan with 100% precision.',
                rating: 5,
              },
              {
                name: 'M. Ramesh Babu',
                role: 'Turnkey Residential Duplex',
                text: 'Their one-stop model combining architecture, civil construction, and modular interiors saved us months of coordination headaches. Truly a professional enterprise.',
                rating: 5,
              },
            ].map((review, idx) => (
              <div
                key={idx}
                className="bg-[#181B1A] border-2 border-[#252A29] p-8 flex flex-col justify-between shadow-[4px_4px_0px_#111111]"
              >
                <div>
                  <div className="flex items-center gap-1 text-[#C8A84E] mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#C8A84E]" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-[#F4F3EE]/80 leading-relaxed font-sans italic mb-6">
                    &ldquo;{review.text}&rdquo;
                  </p>
                </div>
                <div className="pt-4 border-t border-[#252A29]">
                  <span className="text-sm font-black uppercase text-[#F4F3EE] block">
                    {review.name}
                  </span>
                  <span className="text-[11px] font-mono text-[#E94B26]">
                    {review.role}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 10: HIGH-CONTRAST BURNT ORANGE INDUSTRIAL CTA BANNER
      ────────────────────────────────────────────────────────────── */}
      <section id="cta" className="py-16 px-4 sm:px-8 bg-[#E94B26] text-[#F4F3EE] border-b-4 border-[#111111]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-8">
          <div className="max-w-3xl">
            <span className="text-xs font-black uppercase tracking-[0.25em] bg-[#111111] text-[#C8A84E] px-3 py-1 inline-block mb-3">
              ZERO OBLIGATION CONSULTATION
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#F4F3EE] leading-none mb-3">
              READY TO CONSTRUCT YOUR RESIDENTIAL MASTERPIECE?
            </h2>
            <p className="text-xs sm:text-sm font-bold text-[#F4F3EE]/90 uppercase font-mono tracking-wider">
              GET A FREE PLOT FEASIBILITY AUDIT, 3D CONCEPT CONSULTATION, AND ITEMIZED CONSTRUCTION ESTIMATE.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href={`tel:${clinicPhone.replace(/[^0-9+]/g, '')}`}
              className="px-8 py-4 bg-[#111111] text-[#F4F3EE] font-black text-xs sm:text-sm uppercase tracking-widest border border-[#111111] shadow-[6px_6px_0px_#000000] hover:shadow-[2px_2px_0px_#000000] hover:translate-x-1 hover:translate-y-1 transition-all flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#E94B26]" />
              <span>CALL NOW: {clinicPhone}</span>
            </a>

            <Link
              href={`${basePath}/contact`}
              className="px-8 py-4 bg-[#F4F3EE] text-[#111111] font-black text-xs sm:text-sm uppercase tracking-widest border border-[#111111] shadow-[6px_6px_0px_#111111] hover:bg-[#F4F3EE]/90 transition-all flex items-center gap-2"
            >
              <span>BOOK SITE VISIT</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
