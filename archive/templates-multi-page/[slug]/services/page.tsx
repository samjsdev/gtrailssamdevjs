import { readSourceConfig } from '@/lib/dataBuilder';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  Activity, ArrowRight, Phone, CheckCircle2, Home, Utensils, Sofa,
  BedDouble, Ruler, Layers3, BriefcaseBusiness, Hammer, Lightbulb,
  CircleCheck, type LucideIcon,
} from 'lucide-react';
import {
  DEFAULT_INTERIOR_SERVICES,
  INTERIOR_HERO_IMAGES,
  getInteriorServiceData,
} from '@/lib/interiorContent';

const serviceIconMap: Record<string, LucideIcon> = {
  home: Home,
  utensils: Utensils,
  sofa: Sofa,
  bed: BedDouble,
  ruler: Ruler,
  layers: Layers3,
  briefcase: BriefcaseBusiness,
  hammer: Hammer,
  lightbulb: Lightbulb,
  check: CircleCheck,
};

function getServiceIcon(iconKey?: string): LucideIcon {
  return (iconKey && serviceIconMap[iconKey]) || Activity;
}

export default async function ServicesPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const basePath = `/designwebsite/${slug}`;

  const data = await readSourceConfig(slug);
  if (!data) return notFound();

  const { clinic, business } = data;

  const servicesList: string[] = business.services?.length
    ? business.services
    : DEFAULT_INTERIOR_SERVICES;

  return (
    <div className="font-sans text-[#0A0A0A] bg-[#FCFAF6] min-h-screen selection:bg-[#C1FF72] selection:text-[#0A0A0A]">
      {/* Page Hero Banner */}
      <section className="relative text-white py-24 lg:py-32 overflow-hidden bg-[#0A0A0A]">
        <div className="absolute inset-0 z-0 opacity-40">
          <img src={INTERIOR_HERO_IMAGES.services} alt="Our Services" className="w-full h-full object-cover mix-blend-luminosity" />
          <div className="absolute inset-0 bg-[#0A0A0A]/80"></div>
        </div>
        <div className="max-w-7xl mx-auto px-8 w-full relative z-10 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 shadow-sm mb-8">
            <span className="text-xs font-bold text-[#C1FF72] tracking-wider uppercase">Design Services</span>
          </div>
          <div className="flex flex-col mb-8 items-center">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] tracking-tighter">Complete Interior</h2>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#C1FF72] leading-[1.05] tracking-tighter mt-1">Services Under One Roof<span className="text-white">.</span></h2>
          </div>
          <p className="text-xl text-gray-400 max-w-3xl font-medium leading-relaxed">
            At {clinic.name || 'our studio'}, we design refined homes and commercial spaces with clear planning, curated materials, and execution support from concept to handover.
          </p>
        </div>
      </section>

      {/* Quick Stats Bar */}
      <section className="bg-white border-b border-[#E5E5E5] py-10">
        <div className="max-w-7xl mx-auto px-8 w-full grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div><span className="text-3xl font-extrabold text-[#0A0A0A]">{servicesList.length}+</span><p className="text-gray-500 text-[11px] font-bold tracking-wider uppercase mt-2">Design Services</p></div>
          <div><span className="text-3xl font-extrabold text-[#0A0A0A]">15+</span><p className="text-gray-500 text-[11px] font-bold tracking-wider uppercase mt-2">Years Experience</p></div>
          <div><span className="text-3xl font-extrabold text-[#0A0A0A]">100%</span><p className="text-gray-500 text-[11px] font-bold tracking-wider uppercase mt-2">Material Standards</p></div>
          <div><span className="text-3xl font-extrabold text-[#0A0A0A]">Turnkey</span><p className="text-gray-500 text-[11px] font-bold tracking-wider uppercase mt-2">Execution Support</p></div>
        </div>
      </section>

      {/* Individual Service Deep-Dive Sections */}
      <div className="bg-[#FCFAF6]">
        {servicesList.map((serviceName: string, idx: number) => {
          const svcData = getInteriorServiceData(serviceName);
          const IconComponent = getServiceIcon(svcData?.iconKey);
          const isEven = idx % 2 === 0;

          return (
            <section
              key={idx}
              id={`service-${idx}`}
              className={`py-24 lg:py-32 border-b border-[#E5E5E5] ${isEven ? 'bg-[#FCFAF6]' : 'bg-white'}`}
            >
              <div className="max-w-7xl mx-auto px-8 w-full">
                {/* Service Header */}
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
                  {/* Left: Content */}
                  <div className={`flex-1 ${!isEven ? 'lg:order-2' : ''}`}>
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-14 h-14 bg-[#FCFAF6] rounded-full flex items-center justify-center text-[#0A0A0A] border border-[#E5E5E5] shadow-sm">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white border border-[#E5E5E5] shadow-sm">
                        <span className="text-[#0A0A0A] font-bold text-xs tracking-wider uppercase">Service {String(idx + 1).padStart(2, '0')}</span>
                      </div>
                    </div>

                    <h3 className="text-4xl lg:text-5xl font-extrabold text-[#0A0A0A] mb-4 tracking-tighter">{serviceName}</h3>
                    <p className="text-gray-500 font-medium mb-8 text-lg border-l-4 border-[#C1FF72] pl-4 italic">
                      {svcData?.tagline || 'Design guidance tailored to your space, budget, and lifestyle.'}
                    </p>
                    <p className="text-gray-500 font-medium leading-relaxed text-[16px] mb-12">
                      {svcData?.description || 'Our designers provide a personalized service shaped around how you live, work, host, and relax. We align layouts, finishes, lighting, storage, and execution details before work begins.'}
                    </p>

                    {/* Benefits */}
                    <div className="mb-12">
                      <h4 className="text-sm font-bold tracking-wider uppercase text-[#0A0A0A] mb-6">Key Benefits</h4>
                      <ul className="space-y-4">
                        {(svcData?.benefits || [
                          'Personalized design approach for every client',
                          'Curated materials and dependable execution standards',
                          'Experienced designers with practical site knowledge',
                          'Clear communication from concept to handover',
                        ]).map((b, i) => (
                          <li key={i} className="flex items-start gap-4">
                            <CheckCircle2 className="w-5 h-5 text-[#C1FF72] shrink-0" />
                            <span className="text-gray-500 font-medium">{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <a
                      href={`tel:${clinic.contact?.phone || ''}`}
                      className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#0A0A0A] text-white hover:bg-[#1A1A1A] transition-all hover:scale-105 active:scale-95 font-bold tracking-wide shadow-sm gap-2"
                    >
                      <Phone className="w-4 h-4" /> Book This Service
                    </a>
                  </div>

                  {/* Right: Process Steps */}
                  <div className={`flex-1 w-full ${!isEven ? 'lg:order-1' : ''}`}>
                    <div className="bg-[#FCFAF6] rounded-4xl border border-[#E5E5E5] p-10 lg:p-12 h-full flex flex-col shadow-sm">
                      <h4 className="text-2xl font-extrabold text-[#0A0A0A] mb-10 tracking-tight">How It Works</h4>
                      <div className="space-y-10 grow relative">
                        {/* Connecting Line */}
                        <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-[#E5E5E5]"></div>
                        {(svcData?.process || [
                          'Initial consultation and site assessment',
                          'Custom concept, layout, and budget planning',
                          'Execution using approved drawings and finishes',
                          'Styling, handover, and maintenance guidance',
                        ]).map((step, i) => (
                          <div key={i} className="flex items-start gap-6 relative z-10">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white text-[#0A0A0A] font-bold text-sm tracking-wider shrink-0 border-2 border-[#E5E5E5] shadow-sm">
                              {String(i + 1).padStart(2, '0')}
                            </div>
                            <div className="pt-2">
                              <p className="text-gray-500 font-medium leading-relaxed">{step}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <section className="bg-[#0A0A0A] py-24 lg:py-40 text-white selection:bg-[#C1FF72] selection:text-[#0A0A0A]">
        <div className="max-w-4xl mx-auto px-8 text-center w-full flex flex-col items-center">
          <div className="flex flex-col mb-8 items-center">
            <h3 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] tracking-tighter">Not Sure Which</h3>
            <h3 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#C1FF72] leading-[1.05] tracking-tighter mt-1">Service You Need?<span className="text-white">.</span></h3>
          </div>
          <p className="text-xl text-gray-400 font-medium mb-12 max-w-2xl mx-auto">Book a consultation and our team will evaluate your space, priorities, and budget before recommending the best design path forward.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <a href={`tel:${clinic.contact?.phone || ''}`} className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#C1FF72] text-[#0A0A0A] px-10 py-5 rounded-full font-bold transition-all hover:scale-105 active:scale-95 text-[15px] tracking-wide shadow-sm">
              <Phone className="w-5 h-5" /> Call {clinic.contact?.phone || 'Now'}
            </a>
            <Link href={`${basePath}/contact-us`} className="w-full sm:w-auto flex items-center justify-center gap-2 border border-white/20 text-white px-10 py-5 rounded-full font-bold transition-all hover:bg-white/10 hover:scale-105 active:scale-95 text-[15px] tracking-wide shadow-sm">
              Send Enquiry <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
