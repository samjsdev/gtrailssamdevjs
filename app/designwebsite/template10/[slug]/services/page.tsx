import { readSourceConfig } from '@/lib/dataBuilder';
import { cleanClinicName, cleanClinicDescription } from '@/lib/copyCleaner';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Compass, Building, Sparkles, HardHat, Check, 
  ArrowRight, ShieldCheck, Ruler, Layers, CheckCircle2, Phone 
} from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function Template10ServicesPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const data = await readSourceConfig(slug, 'template10');

  if (!data || !data.clinic) {
    notFound();
  }

  const clinicName = cleanClinicName(data.clinic.name);
  const clinicTagline = data.clinic.tagline || 'Integrated Architectural Design, Turnkey Civil Construction & Luxury Fitouts';
  const clinicDescription = cleanClinicDescription(data.clinic.description, data.clinic.name);
  const clinicPhone = data.clinic.contact?.phone || '+91 81100 00384';

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
        'Lab-Certified Fe550D TMT Structural Steel & Tested Grade-53 Concrete'
      ];

  const media = data.media || {};
  const heroImage = media.clinicImages?.[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80';
  const secondaryImage = media.clinicImages?.[1] || 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80';

  const basePath = `/designwebsite/template10/${slug}`;

  return (
    <div className="w-full bg-[#111111] text-[#F4F3EE]">
      {/* ─── Hero Banner Section ─── */}
      <section id="services-hero" className="relative py-20 sm:py-28 bg-[#181B1A] border-b-4 border-[#252A29]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#E94B26] text-[#F4F3EE] text-xs font-black uppercase tracking-widest mb-4 border border-[#111111]">
              <Compass className="w-3.5 h-3.5" />
              <span>COMPREHENSIVE CIVIL & DESIGN CAPABILITIES</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-black uppercase text-[#F4F3EE] tracking-tight leading-none mb-4">
              OUR COMPLETE <span className="text-[#E94B26]">TURNKEY SERVICES</span> & PILLARS
            </h1>
            <p className="text-sm sm:text-base font-bold uppercase tracking-wider text-[#C8A84E]">
              {clinicName} &bull; {clinicTagline}
            </p>
          </div>
        </div>
      </section>

      {/* ─── Our Services Grid Section ─── */}
      <section id="services-list" className="py-20 px-4 sm:px-8 bg-[#111111] border-b-4 border-[#252A29]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block px-3 py-1 bg-[#252A29] text-[#C8A84E] text-xs font-bold uppercase tracking-[0.25em] border border-[#C8A84E]/40 mb-3">
              END-TO-END OFFERINGS
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase text-[#F4F3EE] tracking-tight">
              DESIGN, CIVIL ENGINEERING & FIT-OUT SERVICES
            </h2>
            <p className="text-xs sm:text-sm font-mono text-[#F4F3EE]/70 mt-2">
              EVERY STAGE OF YOUR RESIDENTIAL PROJECT MANAGED UNDER RIGOROUS METRIC QUALITY STANDARDS
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesList.map((service, idx) => (
              <div
                key={idx}
                className="bg-[#181B1A] border-2 border-[#252A29] p-8 hover:border-[#E94B26] transition-all shadow-[4px_4px_0px_#111111] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xl font-black text-[#E94B26] font-mono">
                      0{idx + 1}
                    </span>
                    <Building className="w-5 h-5 text-[#C8A84E]" />
                  </div>
                  <h3 className="text-xl font-black uppercase text-[#F4F3EE] tracking-tight mb-3">
                    {service}
                  </h3>
                  <p className="text-xs text-[#F4F3EE]/75 leading-relaxed font-sans">
                    Precision planning, transparent bill of quantities, high-grade certified construction materials, and continuous on-site civil supervisor oversight.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#252A29] flex items-center justify-between text-xs font-mono text-[#C8A84E]">
                  <span>TECHNICAL SERVICE #{idx + 1}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#E94B26]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Highlights Section ─── */}
      <section id="services-highlights" className="py-20 px-4 sm:px-8 bg-[#181B1A] border-b-4 border-[#252A29]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-block px-3 py-1 bg-[#252A29] text-[#C8A84E] text-xs font-bold uppercase tracking-[0.25em] border border-[#C8A84E]/40">
                CERTIFIED STANDARDS
              </div>
              <h2 className="text-3xl sm:text-4xl font-black uppercase text-[#F4F3EE] tracking-tight">
                GUARANTEED FIXED-COST & ZERO-DEFECT QUALITY
              </h2>
              <p className="text-xs sm:text-sm text-[#F4F3EE]/80 leading-relaxed font-sans">
                Our standardized construction practices are governed by National Building Code (NBC 2016) and IS 456 standards, ensuring seismic structural durability and leakproof longevity.
              </p>
              <div className="relative h-64 w-full border-4 border-[#252A29] overflow-hidden shadow-[6px_6px_0px_#111111]">
                <Image
                  src={secondaryImage}
                  alt="Certified Construction Specifications"
                  fill
                  className="object-cover grayscale contrast-125"
                  sizes="(max-width: 1024px) 100vw, 500px"
                />
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {highlightsList.map((highlight, idx) => (
                <div
                  key={idx}
                  className="bg-[#111111] p-6 border-2 border-[#252A29] hover:border-[#C8A84E] transition-colors shadow-[4px_4px_0px_#111111]"
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#E94B26] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] font-mono text-[#C8A84E] uppercase tracking-wider block mb-1">
                        ASSURANCE CLAUSE #{idx + 1}
                      </span>
                      <p className="text-xs font-bold text-[#F4F3EE] leading-relaxed">
                        {highlight}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA Banner Section ─── */}
      <section id="services-cta" className="py-16 px-4 sm:px-8 bg-[#E94B26] text-[#F4F3EE]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-6">
          <div>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#F4F3EE]">
              NEED AN ACCURATE BILL OF QUANTITIES (BOQ)?
            </h2>
            <p className="text-xs font-mono text-[#F4F3EE]/90 uppercase mt-1">
              Direct Hotline: {clinicPhone} &bull; Turnkey Fixed Price Estimate
            </p>
          </div>
          <Link
            href={`${basePath}/contact`}
            className="px-8 py-4 bg-[#111111] text-[#F4F3EE] font-black text-xs uppercase tracking-widest border border-[#111111] shadow-[4px_4px_0px_#000000] hover:bg-[#181B1A] transition-all flex items-center gap-2"
          >
            <span>GET CUSTOM ESTIMATE</span>
            <ArrowRight className="w-4 h-4 text-[#E94B26]" />
          </Link>
        </div>
      </section>
    </div>
  );
}
