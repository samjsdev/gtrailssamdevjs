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
    <div className="w-full bg-[#252A29] text-[#F4F3EE]">
      {/* ─── Hero Banner Section ─── */}
      <section id="services-hero" className="relative py-24 sm:py-32 bg-[#1A1E1D] border-b-4 border-[#111111]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#E94B26] text-[#F4F3EE] text-xs font-black uppercase tracking-[0.2em] mb-4 border border-[#111111] shadow-[3px_3px_0px_#111111]">
              <Compass className="w-3.5 h-3.5" />
              <span>COMPREHENSIVE CIVIL & DESIGN CAPABILITIES</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-black uppercase text-[#F4F3EE] tracking-tight leading-[0.95] mb-4">
              OUR COMPLETE <span className="text-[#E94B26]">TURNKEY SERVICES</span> & CORE DISCIPLINES
            </h1>
            <p className="text-sm sm:text-base font-bold uppercase tracking-wider text-[#C8A84E]">
              {clinicName} &bull; {clinicTagline}
            </p>
          </div>
        </div>
      </section>

      {/* ─── Our Services Grid Section ─── */}
      <section id="services-list" className="py-24 px-4 sm:px-8 bg-[#252A29] border-b-4 border-[#111111]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block px-3.5 py-1 bg-[#1A1E1D] text-[#C8A84E] text-xs font-black uppercase tracking-[0.25em] border border-[#C8A84E]/40 mb-3">
              END-TO-END OFFERINGS
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase text-[#F4F3EE] tracking-tight">
              DESIGN, CIVIL ENGINEERING & FIT-OUT SERVICES
            </h2>
            <p className="text-xs sm:text-sm font-mono text-[#F4F3EE]/70 mt-2 uppercase tracking-wider">
              EVERY STAGE OF YOUR RESIDENTIAL PROJECT MANAGED UNDER RIGOROUS METRIC QUALITY STANDARDS
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesList.map((service, idx) => (
              <div
                key={idx}
                className="bg-[#1A1E1D] border-2 border-[#111111] p-8 hover:border-[#E94B26] transition-all shadow-[4px_4px_0px_#111111] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black text-[#E94B26] font-mono">
                      0{idx + 1}
                    </span>
                    <Building className="w-5 h-5 text-[#C8A84E]" />
                  </div>
                  <h3 className="text-xl font-black uppercase text-[#F4F3EE] tracking-tight mb-3">
                    {service}
                  </h3>
                  <p className="text-xs text-[#F4F3EE]/80 font-sans leading-relaxed">
                    Delivered with absolute engineering oversight, itemized milestones, lab-tested raw materials, and dedicated on-site project managers.
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#252A29] flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[#C8A84E] font-bold">TURNKEY SCOPE</span>
                  <Link
                    href={`${basePath}/contact`}
                    className="text-xs font-black text-[#E94B26] hover:text-[#C8A84E] uppercase tracking-wider flex items-center gap-1"
                  >
                    <span>ENQUIRE</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Standards & Assurances Section ─── */}
      <section id="services-standards" className="py-24 px-4 sm:px-8 bg-[#1A1E1D] border-b-4 border-[#111111]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-block px-3.5 py-1 bg-[#252A29] text-[#C8A84E] text-xs font-black uppercase tracking-[0.25em] border border-[#C8A84E]/40">
                QUALITY BENCHMARKS
              </div>
              <h2 className="text-3xl sm:text-4xl font-black uppercase text-[#F4F3EE] tracking-tight">
                CERTIFIED RAW MATERIALS & GUARANTEED SPECIFICATIONS
              </h2>
              <p className="text-xs sm:text-sm text-[#F4F3EE]/85 leading-relaxed font-sans">
                We refuse to cut corners on structural safety. Every single foundation, column, and beam cast under our supervision adheres to IS 456 standards with documented batch testing and 10-year warranty protection.
              </p>

              <div className="space-y-3 pt-2">
                {highlightsList.slice(0, 4).map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-3 bg-[#252A29] p-4 border border-[#111111]">
                    <CheckCircle2 className="w-4 h-4 text-[#E94B26] shrink-0 mt-0.5" />
                    <span className="text-xs font-bold text-[#F4F3EE]">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative h-96 sm:h-[450px] w-full border-4 border-[#111111] shadow-[8px_8px_0px_#111111] bg-[#111111]">
                <Image
                  src={secondaryImage}
                  alt="Certified Engineering Specifications"
                  fill
                  className="object-cover contrast-115"
                  sizes="(max-width: 1024px) 100vw, 600px"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
