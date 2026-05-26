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
  const basePath = `/designwebsite/template3/${slug}`;

  const data = await readSourceConfig(slug);
  if (!data) return notFound();

  const { clinic, business } = data;

  const servicesList: string[] = business.services?.length
    ? business.services
    : DEFAULT_INTERIOR_SERVICES;

  return (
    <div className="font-sans text-emerald-900 bg-gray-50 min-h-screen selection:bg-emerald-900 selection:text-white">
      {/* Page Hero Banner */}
      <section className="relative text-white py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={INTERIOR_HERO_IMAGES.services} alt="Our Services" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-emerald-900/75"></div>
          <div className="absolute inset-0 bg-linear-to-t from-emerald-900 via-emerald-900/40 to-transparent"></div>
        </div>
        <div className="max-w-7xl mx-auto px-8 w-full relative z-10">
          <p className="text-gray-400 font-semibold tracking-[0.15em] uppercase text-xs mb-6">Design Services</p>
          <div className="flex flex-col mb-8">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-normal text-gray-500 leading-none tracking-tighter">Complete Interior</h2>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-normal text-white leading-none tracking-tighter -mt-1.5">Services Under One Roof</h2>
          </div>
          <p className="text-xl text-gray-400 max-w-3xl font-light leading-relaxed">
            At {clinic.name || 'our studio'}, we design refined homes and commercial spaces with clear planning, curated materials, and execution support from concept to handover.
          </p>
        </div>
      </section>

      {/* Quick Stats Bar */}
      <section className="bg-gray-100 border-b border-gray-200 py-10">
        <div className="max-w-7xl mx-auto px-8 w-full grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div><span className="text-3xl font-normal text-emerald-900">{servicesList.length}+</span><p className="text-gray-500 text-[11px] font-semibold tracking-widest uppercase mt-2">Design Services</p></div>
          <div><span className="text-3xl font-normal text-emerald-900">15+</span><p className="text-gray-500 text-[11px] font-semibold tracking-widest uppercase mt-2">Years Experience</p></div>
          <div><span className="text-3xl font-normal text-emerald-900">100%</span><p className="text-gray-500 text-[11px] font-semibold tracking-widest uppercase mt-2">Material Standards</p></div>
          <div><span className="text-3xl font-normal text-emerald-900">Turnkey</span><p className="text-gray-500 text-[11px] font-semibold tracking-widest uppercase mt-2">Execution Support</p></div>
        </div>
      </section>

      {/* Individual Service Deep-Dive Sections */}
      <div className="bg-white">
        {servicesList.map((serviceName: string, idx: number) => {
          const svcData = getInteriorServiceData(serviceName);
          const IconComponent = getServiceIcon(svcData?.iconKey);
          const isEven = idx % 2 === 0;

          return (
            <section
              key={idx}
              id={`service-${idx}`}
              className={`py-24 lg:py-32 border-b border-gray-100 ${isEven ? 'bg-white' : 'bg-gray-50'}`}
            >
              <div className="max-w-7xl mx-auto px-8 w-full">
                {/* Service Header */}
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
                  {/* Left: Content */}
                  <div className={`flex-1 ${!isEven ? 'lg:order-2' : ''}`}>
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-800 border border-gray-200">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <p className="text-gray-400 font-semibold text-xs tracking-widest uppercase">Service {String(idx + 1).padStart(2, '0')}</p>
                    </div>

                    <h3 className="text-3xl lg:text-4xl font-normal text-emerald-900 mb-4">{serviceName}</h3>
                    <p className="text-gray-500 font-medium mb-8">
                      {svcData?.tagline || 'Design guidance tailored to your space, budget, and lifestyle.'}
                    </p>
                    <p className="text-gray-600 font-light leading-relaxed text-[16px] mb-12">
                      {svcData?.description || 'Our designers provide a personalized service shaped around how you live, work, host, and relax. We align layouts, finishes, lighting, storage, and execution details before work begins.'}
                    </p>

                    {/* Benefits */}
                    <div className="mb-12">
                      <h4 className="text-sm font-semibold tracking-widest uppercase text-gray-500 mb-6">Key Benefits</h4>
                      <ul className="space-y-4">
                        {(svcData?.benefits || [
                          'Personalized design approach for every client',
                          'Curated materials and dependable execution standards',
                          'Experienced designers with practical site knowledge',
                          'Clear communication from concept to handover',
                        ]).map((b, i) => (
                          <li key={i} className="flex items-start gap-4">
                            <CheckCircle2 className="w-5 h-5 text-gray-400 shrink-0" />
                            <span className="text-gray-600 font-light">{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <a
                      href={`tel:${clinic.contact?.phone || ''}`}
                      className="inline-flex items-center gap-2 border border-gray-300 text-emerald-900 px-8 py-3.5 rounded-full font-medium hover:bg-gray-100 transition-colors text-sm"
                    >
                      <Phone className="w-4 h-4" /> Book This Service
                    </a>
                  </div>

                  {/* Right: Process Steps */}
                  <div className={`flex-1 ${!isEven ? 'lg:order-1' : ''}`}>
                    <div className="bg-white rounded-3xl border border-gray-100 p-10 lg:p-12 h-full flex flex-col">
                      <h4 className="text-xl font-medium text-emerald-900 mb-10">How It Works</h4>
                      <div className="space-y-10 grow">
                        {(svcData?.process || [
                          'Initial consultation and site assessment',
                          'Custom concept, layout, and budget planning',
                          'Execution using approved drawings and finishes',
                          'Styling, handover, and maintenance guidance',
                        ]).map((step, i) => (
                          <div key={i} className="flex items-start gap-6">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 font-medium text-xs tracking-widest shrink-0 border border-gray-200">
                              {String(i + 1).padStart(2, '0')}
                            </div>
                            <div className="pt-1.5">
                              <p className="text-gray-600 font-light leading-relaxed">{step}</p>
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
      <section className="bg-emerald-900 py-24 lg:py-40 text-white">
        <div className="max-w-4xl mx-auto px-8 w-full text-center">
          <div className="flex flex-col mb-8">
            <h3 className="text-5xl md:text-6xl lg:text-7xl font-normal text-gray-500 leading-none tracking-tighter">Not Sure Which</h3>
            <h3 className="text-5xl md:text-6xl lg:text-7xl font-normal text-white leading-none tracking-tighter -mt-1.5">Service You Need?</h3>
          </div>
          <p className="text-xl text-gray-400 font-light mb-12 max-w-2xl mx-auto">Book a consultation and our team will evaluate your space, priorities, and budget before recommending the best design path forward.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href={`tel:${clinic.contact?.phone || ''}`} className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-emerald-900 px-8 py-4 rounded-full font-medium hover:bg-gray-100 transition-colors text-sm tracking-wide">
              <Phone className="w-4 h-4" /> Call {clinic.contact?.phone || 'Now'}
            </a>
            <Link href={`${basePath}/contact-us`} className="w-full sm:w-auto flex items-center justify-center gap-2 border border-gray-600 text-white px-8 py-4 rounded-full font-medium hover:bg-gray-800 transition-colors text-sm tracking-wide">
              Send Enquiry <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
