import { readSourceConfig } from "@/lib/dataBuilder";
import {
  DEFAULT_INTERIOR_HIGHLIGHTS,
  DEFAULT_INTERIOR_REVIEWS,
  DEFAULT_INTERIOR_SERVICES,
  INTERIOR_HERO_IMAGES,
  getInteriorServiceSummary,
  getInteriorServiceData,
  INTERIOR_FAQS,
} from "@/lib/interiorContent";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function DesignStudioHome({ params }: PageProps) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  const data = await readSourceConfig(slug, 'template4');
  if (!data) return notFound();

  const { clinic, business, doctor, media, reviews } = data;
  const heroImage =
    media?.clinicImages?.[0] ||
    media?.treatmentImages?.[0] ||
    media?.otherImages?.[0] ||
    INTERIOR_HERO_IMAGES.home;
  
  const doctorImage =
    doctor?.images?.[0] ||
    media?.otherImages?.[0] ||
    INTERIOR_HERO_IMAGES.designer;

  const services = business?.services?.length
    ? business.services
    : DEFAULT_INTERIOR_SERVICES;

  const highlights = business?.highlights?.length
    ? business.highlights.slice(0, 4)
    : DEFAULT_INTERIOR_HIGHLIGHTS;

  const waphone = clinic.contact?.phone?.replace(/\D/g, "") || "919751396117";
  const watext = `Hi, I'm interested in booking a design consultation at ${clinic.name || "your studio"}!`;
  const walink = `https://wa.me/${waphone}?text=${encodeURIComponent(watext)}`;

  return (
    <>
      {/* HERO SECTION */}
      <section className="relative h-screen min-h-[600px] w-full flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt={clinic.name || "Interior design studio"}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center pt-20">
          <p className="text-white/80 uppercase tracking-[0.3em] text-xs md:text-sm font-semibold mb-6">
            {clinic.name || "INTERIOR STUDIO"}
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white leading-tight mb-8">
            {clinic.tagline || "Elevating spaces. Inspiring lives."}
          </h1>
          <a
            href={walink}
            target="_blank"
            rel="noreferrer"
            className="px-8 py-4 bg-white text-stone-900 border border-white uppercase tracking-widest text-sm hover:bg-transparent hover:text-white transition-all duration-300"
          >
            Start Your Project
          </a>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-24 md:py-32 px-6 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="w-full lg:w-1/2">
            <div className="relative aspect-[3/4] w-full max-w-md mx-auto lg:ml-0 overflow-hidden">
              <img 
                src={doctorImage} 
                alt="Lead designer" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="w-full lg:w-1/2 space-y-8">
            <p className="uppercase tracking-[0.2em] text-sm text-stone-500 font-semibold">— Our Philosophy</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-stone-900 leading-tight">
              {doctor?.name || "The Design Vision"}
            </h2>
            <p className="text-lg text-stone-600 font-light leading-relaxed">
              {clinic.description ||
                "We believe in the power of spaces to transform how we live and work. By blending meticulous planning with curated materials, we craft environments that feel both timeless and deeply personal."}
            </p>
            <p className="text-stone-500 font-light">
               {doctor?.specialization || "Residential & Commercial Interior Planning"}
            </p>
          </div>
        </div>
      </section>

      {/* HIGHLIGHTS SECTION */}
      <section className="py-24 px-6 bg-stone-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="uppercase tracking-[0.2em] text-sm text-stone-500 font-semibold mb-4">— Why Us</p>
            <h2 className="text-3xl md:text-4xl font-light text-stone-900">Precision in Every Detail</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {highlights.map((highlight: string, index: number) => (
              <div key={index} className="flex flex-col text-center">
                <span className="text-stone-300 text-5xl font-light mb-4">0{index + 1}</span>
                <p className="text-stone-800 font-medium tracking-wide uppercase text-sm">{highlight}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="py-24 md:py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-stone-900 mb-6">Our Expertise</h2>
            <p className="text-stone-500 font-light max-w-2xl mx-auto">Comprehensive interior solutions tailored to elevate your environment.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {services.map((svc: string, index: number) => {
              const svcData = getInteriorServiceData(svc);
              const svcImage = svcData?.image || INTERIOR_HERO_IMAGES.services;
              return (
                <div key={index} className="group cursor-pointer">
                  <div className="aspect-[4/5] overflow-hidden mb-6 relative">
                    <img 
                      src={svcImage} 
                      alt={svc} 
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <h3 className="text-xl font-medium text-stone-900 mb-3 tracking-wide">{svc}</h3>
                  <p className="text-stone-600 font-light leading-relaxed text-sm">
                    {svcData?.description || getInteriorServiceSummary(svc)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TRUST STRIP / PARTNERS */}
      <section className="py-16 bg-stone-900 text-stone-400 border-t border-b border-stone-850">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-center text-stone-500 mb-8">
            TRUSTED BY DESIGN ENTHUSIASTS WORLDWIDE
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center text-center font-semibold text-[10px] md:text-xs tracking-[0.25em] text-stone-400 uppercase">
            <span className="hover:text-stone-100 transition-colors cursor-default">ARCHITECTURAL ARCHIVE</span>
            <span className="hover:text-stone-100 transition-colors cursor-default">FINE MATERIAL CO.</span>
            <span className="hover:text-stone-100 transition-colors cursor-default">LUXE INTERIOR LAB</span>
            <span className="hover:text-stone-100 transition-colors cursor-default">TIMBER & MASON</span>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="py-24 md:py-32 px-6 bg-stone-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <p className="uppercase tracking-[0.2em] text-xs text-stone-500 font-semibold mb-4">— Client Stories</p>
            <h2 className="text-3xl md:text-5xl font-light text-stone-900 leading-tight">What Our Clients Say</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(reviews?.length ? reviews : DEFAULT_INTERIOR_REVIEWS).slice(0, 3).map((review: any, index: number) => (
              <div key={index} className="bg-white p-8 border border-stone-200/60 shadow-xs flex flex-col justify-between">
                <div className="space-y-6">
                  <div className="flex gap-1 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-stone-600 font-light leading-relaxed italic text-sm">
                    &ldquo;{review.text}&rdquo;
                  </p>
                </div>
                <div className="pt-6 mt-8 border-t border-stone-100 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-stone-900 text-stone-100 flex items-center justify-center font-bold text-xs uppercase">
                    {review.author?.charAt(0) || "C"}
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-stone-900 uppercase tracking-wider">{review.author || "Client"}</h4>
                    <p className="text-[10px] text-stone-400 uppercase tracking-widest">{review.role || "Homeowner"}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-24 md:py-32 px-6 bg-white border-t border-stone-200/80">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <p className="uppercase tracking-[0.2em] text-xs text-stone-500 font-semibold mb-4">— Client Queries</p>
            <h2 className="text-3xl md:text-5xl font-light text-stone-900 leading-tight">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {INTERIOR_FAQS.map((faq, i) => (
              <details key={i} className="group border border-stone-200 bg-stone-50 overflow-hidden transition-all duration-300" open={i === 0}>
                <summary className="flex justify-between items-center font-semibold text-stone-850 text-sm md:text-base cursor-pointer list-none p-6 hover:text-stone-600 transition-colors uppercase tracking-wider">
                  {faq.q}
                  <span className="transition-transform duration-300 group-open:rotate-180 text-stone-400">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </span>
                </summary>
                <div className="text-stone-600 font-light text-sm leading-relaxed border-t border-stone-200/60 p-6 bg-white">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* PROPOSAL FORM SECTION */}
      <section className="py-24 md:py-32 px-6 bg-stone-100 border-t border-stone-200/60" id="tally-form">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-16 space-y-4">
            <p className="uppercase tracking-[0.2em] text-xs text-stone-500 font-semibold">— Start Your Journey</p>
            <h2 className="text-3xl md:text-5xl font-light text-stone-900 leading-tight">Ready to Elevate Your Space?</h2>
            <p className="text-stone-500 font-light max-w-lg mx-auto text-sm">Please share a brief description of your project, and our principal designer will personally contact you.</p>
          </div>
          
          <div className="max-w-xl mx-auto">
            <form className="bg-white border border-stone-200 p-8 md:p-12 text-left space-y-6 shadow-sm">
              <div className="space-y-2">
                <label htmlFor="fullName" className="block text-xs font-bold uppercase tracking-wider text-stone-500">Full Name</label>
                <input type="text" id="fullName" placeholder="Your name" className="w-full text-stone-900 px-4 py-3 border border-stone-200 focus:outline-none focus:border-stone-900 bg-stone-50 text-sm" />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-stone-500">Email Address</label>
                <input type="email" id="email" placeholder="you@example.com" className="w-full text-stone-900 px-4 py-3 border border-stone-200 focus:outline-none focus:border-stone-900 bg-stone-50 text-sm" />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-stone-500">Project Description</label>
                <textarea id="message" rows={4} placeholder="Describe your dream space, style preferences, and approximate timeline..." className="w-full text-stone-900 px-4 py-3 border border-stone-200 focus:outline-none focus:border-stone-900 bg-stone-50 text-sm resize-none"></textarea>
              </div>
              <button type="button" className="w-full py-4 mt-2 bg-stone-900 hover:bg-stone-850 text-white font-bold text-xs uppercase tracking-widest transition-colors">
                Request Design Proposal
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
