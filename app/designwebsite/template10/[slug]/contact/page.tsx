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
    <div className="w-full bg-[#111111] text-[#F4F3EE]">
      {/* ─── Hero Banner Section ─── */}
      <section id="contact-hero" className="relative py-20 sm:py-28 bg-[#181B1A] border-b-4 border-[#252A29]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#E94B26] text-[#F4F3EE] text-xs font-black uppercase tracking-widest mb-4 border border-[#111111]">
              <HardHat className="w-3.5 h-3.5" />
              <span>DIRECT TECHNICAL ENQUIRY & ESTIMATES</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-black uppercase text-[#F4F3EE] tracking-tight leading-none mb-4">
              CONNECT WITH OUR <span className="text-[#E94B26]">ENGINEERING DESK</span>
            </h1>
            <p className="text-sm sm:text-base font-bold uppercase tracking-wider text-[#C8A84E]">
              {clinicName} &bull; {clinicTagline}
            </p>
          </div>
        </div>
      </section>

      {/* ─── Contact Details & Form Section ─── */}
      <section id="contact-details" className="py-20 px-4 sm:px-8 bg-[#111111] border-b-4 border-[#252A29]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left: Office Coordinates & Credentials */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <div className="inline-block px-3 py-1 bg-[#252A29] text-[#C8A84E] text-xs font-bold uppercase tracking-[0.25em] border border-[#C8A84E]/40 mb-3">
                  CENTRAL COORDINATES
                </div>
                <h2 className="text-3xl font-black uppercase text-[#F4F3EE] tracking-tight">
                  CORPORATE STUDIO & SITE OFFICE
                </h2>
                <p className="text-xs text-[#F4F3EE]/70 font-mono mt-2">
                  SCHEDULE AN IN-PERSON SPATIAL BLUEPRINT REVIEW WITH OUR CHIEF ARCHITECTS
                </p>
              </div>

              <div className="space-y-6 text-xs font-mono text-[#F4F3EE]/90">
                <div className="bg-[#181B1A] p-6 border-2 border-[#252A29] flex items-start gap-4">
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

                <div className="bg-[#181B1A] p-6 border-2 border-[#252A29] flex items-start gap-4">
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
                    <p className="text-[11px] text-[#F4F3EE]/60 mt-0.5">Available Mon to Sat (09:00 AM - 07:30 PM)</p>
                  </div>
                </div>

                <div className="bg-[#181B1A] p-6 border-2 border-[#252A29] flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#252A29] text-[#E94B26] flex items-center justify-center shrink-0 border border-[#C8A84E]/40">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase text-[#C8A84E] tracking-widest block mb-1">
                      PROJECT ESTIMATIONS & TENDERS
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

              <div className="p-6 bg-[#252A29] border border-[#C8A84E]/50">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C8A84E] mb-2">
                  <ShieldCheck className="w-4 h-4 text-[#E94B26]" />
                  <span>OUR FIXED COMMITMENTS</span>
                </div>
                <p className="text-xs text-[#F4F3EE]/80 font-sans leading-relaxed">
                  We guarantee 100% fixed pricing with no escalations during construction, milestone-based payment schedules, and a legally bonded 10-year structural warranty.
                </p>
              </div>
            </div>

            {/* Right: Technical Consultation Request Form */}
            <div className="lg:col-span-7 bg-[#181B1A] p-8 sm:p-10 border-4 border-[#252A29] shadow-[8px_8px_0px_#111111]">
              <div className="border-b-2 border-[#252A29] pb-4 mb-6">
                <span className="text-xs font-mono text-[#C8A84E] uppercase tracking-widest block mb-1">
                  STAGE 01 ENQUIRY
                </span>
                <h3 className="text-2xl sm:text-3xl font-black uppercase text-[#F4F3EE] tracking-tight">
                  REQUEST DETAILED ESTIMATE & FREE SITE AUDIT
                </h3>
              </div>

              <form className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-mono text-[#C8A84E] uppercase tracking-wider mb-2">
                      YOUR FULL NAME *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Anand Kumar"
                      className="w-full bg-[#111111] border-2 border-[#252A29] focus:border-[#E94B26] p-3.5 text-xs text-[#F4F3EE] font-mono focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#C8A84E] uppercase tracking-wider mb-2">
                      PHONE NUMBER *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98400 12345"
                      className="w-full bg-[#111111] border-2 border-[#252A29] focus:border-[#E94B26] p-3.5 text-xs text-[#F4F3EE] font-mono focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-mono text-[#C8A84E] uppercase tracking-wider mb-2">
                      PLOT / PROJECT LOCATION *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. ECR / Anna Nagar"
                      className="w-full bg-[#111111] border-2 border-[#252A29] focus:border-[#E94B26] p-3.5 text-xs text-[#F4F3EE] font-mono focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#C8A84E] uppercase tracking-wider mb-2">
                      APPROX. BUILT-UP AREA (SQ.FT)
                    </label>
                    <input
                      type="number"
                      defaultValue={defaultArea}
                      placeholder="e.g. 2400"
                      className="w-full bg-[#111111] border-2 border-[#252A29] focus:border-[#E94B26] p-3.5 text-xs text-[#F4F3EE] font-mono focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#C8A84E] uppercase tracking-wider mb-2">
                    PRIMARY SERVICE REQUIREMENT
                  </label>
                  <select
                    defaultValue={defaultPackage === 'luxury' ? 'villa' : 'turnkey'}
                    className="w-full bg-[#111111] border-2 border-[#252A29] focus:border-[#E94B26] p-3.5 text-xs text-[#F4F3EE] font-mono focus:outline-none"
                  >
                    <option value="turnkey">Turnkey Residential Construction (Civil + Design + MEP)</option>
                    <option value="architecture">Architectural Blueprint & 3D BIM Elevations Only</option>
                    <option value="villa">Ultra-Luxury Villa Turnkey Execution</option>
                    <option value="interior">Luxury Interior Fit-out & Modular Woodwork</option>
                    <option value="consultation">Site Soil Audit & Feasibility Assessment</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#C8A84E] uppercase tracking-wider mb-2">
                    PROJECT NOTES / TIMELINE REQUIREMENTS
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Describe your plot dimensions, expected start date, architectural style preferences..."
                    className="w-full bg-[#111111] border-2 border-[#252A29] focus:border-[#E94B26] p-3.5 text-xs text-[#F4F3EE] font-mono focus:outline-none"
                  ></textarea>
                </div>

                <button
                  type="button"
                  className="w-full py-4 bg-[#E94B26] text-[#F4F3EE] font-black text-xs uppercase tracking-widest border border-[#111111] shadow-[4px_4px_0px_#111111] hover:shadow-[1px_1px_0px_#111111] hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center justify-center gap-2"
                >
                  <span>SUBMIT FOR FREE CONSULTATION & BOQ</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-[11px] text-[#F4F3EE]/50 font-mono text-center">
                  Your project information is protected under standard non-disclosure policy. No marketing spam.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
