import { readSourceConfig } from '@/lib/dataBuilder';
import { cleanClinicName } from '@/lib/copyCleaner';
import { notFound } from 'next/navigation';
import { 
  Phone, Mail, MapPin, Clock, ShieldCheck, 
  Building, Compass, ArrowRight, CheckCircle2, HardHat 
} from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ area?: string; package?: string }>;
}

export default async function Template10ContactPage({ params, searchParams }: PageProps) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const data = await readSourceConfig(slug, 'template10');

  if (!data || !data.clinic) {
    notFound();
  }

  const clinicName = cleanClinicName(data.clinic.name);
  const clinicTagline = data.clinic.tagline || 'Direct Engineering Coordination & Technical Consultation';
  const clinicPhone = data.clinic.contact?.phone || '+91 81100 00384';
  const clinicEmail = data.clinic.contact?.email || 'contact@architecturalconstruction.com';
  const clinicAddress = data.clinic.address?.full || 'Engineering Center & Corporate Studio, Prime City Road';

  const defaultArea = resolvedSearchParams?.area || '2400';
  const defaultPackage = resolvedSearchParams?.package || 'premium';

  return (
    <div className="w-full bg-[#252A29] text-[#F4F3EE]">
      {/* ─── Hero Banner Section ─── */}
      <section id="contact-hero" className="relative py-24 sm:py-32 bg-[#1A1E1D] border-b-4 border-[#111111]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#E94B26] text-[#F4F3EE] text-xs font-black uppercase tracking-[0.2em] mb-4 border border-[#111111] shadow-[3px_3px_0px_#111111]">
              <HardHat className="w-3.5 h-3.5" />
              <span>DIRECT TECHNICAL ENQUIRY & ESTIMATES</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-black uppercase text-[#F4F3EE] tracking-tight leading-[0.95] mb-4">
              CONNECT WITH OUR <span className="text-[#E94B26]">ENGINEERING DESK</span>
            </h1>
            <p className="text-sm sm:text-base font-bold uppercase tracking-wider text-[#C8A84E]">
              {clinicName} &bull; {clinicTagline}
            </p>
          </div>
        </div>
      </section>

      {/* ─── Contact Details & Form Section ─── */}
      <section id="contact-details" className="py-24 px-4 sm:px-8 bg-[#252A29] border-b-4 border-[#111111]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left: Office Coordinates & Credentials */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <div className="inline-block px-3.5 py-1 bg-[#1A1E1D] text-[#C8A84E] text-xs font-black uppercase tracking-[0.25em] border border-[#C8A84E]/40 mb-3">
                  CENTRAL COORDINATES
                </div>
                <h2 className="text-3xl font-black uppercase text-[#F4F3EE] tracking-tight">
                  CORPORATE STUDIO & SITE OFFICE
                </h2>
                <p className="text-xs text-[#F4F3EE]/70 font-mono mt-2 uppercase tracking-wider">
                  SCHEDULE AN IN-PERSON SPATIAL BLUEPRINT REVIEW WITH OUR CHIEF ARCHITECTS
                </p>
              </div>

              <div className="space-y-6 text-xs font-mono text-[#F4F3EE]">
                <div className="bg-[#1A1E1D] p-6 border-2 border-[#111111] shadow-[4px_4px_0px_#111111] flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#252A29] text-[#E94B26] flex items-center justify-center shrink-0 border border-[#C8A84E]/40">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase text-[#C8A84E] tracking-widest block mb-1">
                      STUDIO & CIVIL HQ
                    </span>
                    <p className="font-sans text-sm text-[#F4F3EE] leading-snug">
                      {clinicAddress}
                    </p>
                  </div>
                </div>

                <div className="bg-[#1A1E1D] p-6 border-2 border-[#111111] shadow-[4px_4px_0px_#111111] flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#252A29] text-[#E94B26] flex items-center justify-center shrink-0 border border-[#C8A84E]/40">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase text-[#C8A84E] tracking-widest block mb-1">
                      DIRECT CONSULTATION HOTLINE
                    </span>
                    <a
                      href={`tel:${clinicPhone.replace(/[^0-9+]/g, '')}`}
                      className="text-lg font-black text-[#E94B26] hover:underline"
                    >
                      {clinicPhone}
                    </a>
                    <p className="text-[11px] text-[#F4F3EE]/60 mt-0.5 font-mono">Available Mon to Sat (09:00 AM - 07:30 PM)</p>
                  </div>
                </div>

                <div className="bg-[#1A1E1D] p-6 border-2 border-[#111111] shadow-[4px_4px_0px_#111111] flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#252A29] text-[#E94B26] flex items-center justify-center shrink-0 border border-[#C8A84E]/40">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase text-[#C8A84E] tracking-widest block mb-1">
                      ENGINEERING & ESTIMATES EMAIL
                    </span>
                    <a
                      href={`mailto:${clinicEmail}`}
                      className="text-sm font-bold text-[#F4F3EE] hover:text-[#E94B26]"
                    >
                      {clinicEmail}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Technical Consultation Form */}
            <div className="lg:col-span-7 bg-[#1A1E1D] border-4 border-[#111111] p-8 sm:p-10 shadow-[8px_8px_0px_#111111]">
              <div className="border-b-2 border-[#252A29] pb-4 mb-6">
                <span className="text-xs font-mono text-[#C8A84E] uppercase tracking-widest font-bold">
                  PROJECT SPECIFICATIONS & BOQ REQUEST
                </span>
                <h3 className="text-2xl font-black uppercase text-[#F4F3EE] tracking-tight mt-1">
                  REQUEST A FREE SITE VISIT & QUOTATION
                </h3>
              </div>

              <form className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-[#C8A84E] font-bold mb-1">
                      FULL NAME *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rajesh Kumar"
                      className="w-full bg-[#252A29] border-2 border-[#111111] focus:border-[#E94B26] p-3 text-xs text-[#F4F3EE] font-sans placeholder-[#F4F3EE]/30 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-[#C8A84E] font-bold mb-1">
                      CONTACT PHONE *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      className="w-full bg-[#252A29] border-2 border-[#111111] focus:border-[#E94B26] p-3 text-xs text-[#F4F3EE] font-sans placeholder-[#F4F3EE]/30 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-[#C8A84E] font-bold mb-1">
                      PLOT / SITE LOCATION *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. OMR, Anna Nagar, Whitefield"
                      className="w-full bg-[#252A29] border-2 border-[#111111] focus:border-[#E94B26] p-3 text-xs text-[#F4F3EE] font-sans placeholder-[#F4F3EE]/30 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-[#C8A84E] font-bold mb-1">
                      ESTIMATED BUILT-UP AREA (SQ.FT)
                    </label>
                    <input
                      type="text"
                      defaultValue={defaultArea}
                      placeholder="e.g. 2500 sq.ft"
                      className="w-full bg-[#252A29] border-2 border-[#111111] focus:border-[#E94B26] p-3 text-xs text-[#F4F3EE] font-sans placeholder-[#F4F3EE]/30 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-[#C8A84E] font-bold mb-1">
                      PRIMARY SERVICE REQUIREMENT
                    </label>
                    <select className="w-full bg-[#252A29] border-2 border-[#111111] focus:border-[#E94B26] p-3 text-xs text-[#F4F3EE] font-sans focus:outline-none">
                      <option value="turnkey">Turnkey Civil Construction + Architecture</option>
                      <option value="architecture">Architectural Concept & 3D BIM Only</option>
                      <option value="interiors">Luxury Interior Design Fitout</option>
                      <option value="all">Full Turnkey Package (All 3 Pillars)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-[#C8A84E] font-bold mb-1">
                      PREFERRED PACKAGE TIER
                    </label>
                    <select
                      defaultValue={defaultPackage}
                      className="w-full bg-[#252A29] border-2 border-[#111111] focus:border-[#E94B26] p-3 text-xs text-[#F4F3EE] font-sans focus:outline-none"
                    >
                      <option value="standard">Standard Package (₹2,150/sq.ft)</option>
                      <option value="premium">Premium Architectural (₹2,750/sq.ft)</option>
                      <option value="luxury">Ultra Luxury Villa (₹3,500/sq.ft)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#C8A84E] font-bold mb-1">
                    PROJECT NOTES / SPECIFIC REQUIREMENTS
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your plot dimensions, number of floors, timeline, and design inspirations..."
                    className="w-full bg-[#252A29] border-2 border-[#111111] focus:border-[#E94B26] p-3 text-xs text-[#F4F3EE] font-sans placeholder-[#F4F3EE]/30 focus:outline-none"
                  ></textarea>
                </div>

                <button
                  type="button"
                  className="w-full py-4 bg-[#E94B26] text-[#F4F3EE] font-black text-xs uppercase tracking-widest border border-[#111111] shadow-[4px_4px_0px_#111111] hover:shadow-[1px_1px_0px_#111111] hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center justify-center gap-2"
                >
                  <span>SUBMIT FOR ARCHITECTURAL REVIEW & BOQ</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="text-center pt-2">
                  <span className="text-[10px] font-mono text-[#F4F3EE]/60">
                    &bull; 100% Privacy Guaranteed &bull; Zero Spam &bull; Confidential Blueprint Protection &bull;
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
