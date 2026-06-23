import { readSourceConfig } from '@/lib/sourceData';
import {
  DEFAULT_INTERIOR_HIGHLIGHTS,
  DEFAULT_INTERIOR_REVIEWS,
  DEFAULT_INTERIOR_SERVICES,
  INTERIOR_HERO_IMAGES,
  getInteriorServiceSummary,
  getInteriorServiceData,
  getServiceImage,
  INTERIOR_FAQS,
} from "@/lib/interiorContent";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

type PageProps = {
  params?: any;
};

export default async function DesignStudioHome({ params }: PageProps) {
  const slug = ''; // standalone: slug not needed for data loading
  const basePath = ``;

  const data = await readSourceConfig(undefined, 'template4');
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
        <div className="absolute inset-0 z-0" data-gsap="hero-bg">
          <img
            src={heroImage}
            alt={clinic.name || "Interior design studio"}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center pt-20">
          <p className="text-white/80 uppercase tracking-[0.3em] text-xs md:text-sm font-semibold mb-6" data-gsap="hero-sub">
            {clinic.name || "INTERIOR STUDIO"}
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white leading-tight mb-8" data-gsap="hero-title">
            {clinic.tagline || "Elevating spaces. Inspiring lives."}
          </h1>
          <a
            href={walink}
            target="_blank"
            rel="noreferrer"
            className="px-8 py-4 bg-white text-stone-900 border border-white uppercase tracking-widest text-sm hover:bg-transparent hover:text-white transition-all duration-300"
            data-gsap="hero-btn"
          >
            Start Your Project
          </a>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-24 md:py-32 px-6 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="w-full lg:w-1/2" data-gsap="reveal">
            <div className="relative aspect-[3/4] w-full max-w-md mx-auto lg:ml-0 overflow-hidden" data-gsap="parallax-container">
              <img 
                src={doctorImage} 
                alt="Lead designer" 
                className="w-full h-full object-cover"
                data-gsap="parallax-img"
              />
            </div>
          </div>
          <div className="w-full lg:w-1/2 space-y-8" data-gsap="reveal">
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
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12" data-gsap="stagger-container">
            {highlights.map((highlight: string, index: number) => (
              <div key={index} className="flex flex-col text-center" data-gsap="stagger-item">
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
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10" data-gsap="stagger-container">
            {services.map((svc: string, index: number) => {
              const svcData = getInteriorServiceData(svc);
              const svcImage = getServiceImage(svc, media) || svcData?.image || INTERIOR_HERO_IMAGES.services;
              return (
                <div key={index} className="group cursor-pointer" data-gsap="stagger-item">
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" data-gsap="stagger-container">
            {(reviews?.length ? reviews : DEFAULT_INTERIOR_REVIEWS).slice(0, 3).map((review: any, index: number) => (
              <div key={index} className="bg-white p-8 border border-stone-200/60 shadow-xs flex flex-col justify-between" data-gsap="stagger-item">
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
      <section className="py-24 md:py-32 px-6 bg-white border-t border-stone-200/80" data-gsap="reveal">
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

      {/* COLLABORATION / CONTACT CALLOUT SECTION */}
      <section className="py-24 px-6 bg-stone-900 text-white text-center space-y-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <p className="uppercase tracking-[0.3em] text-xs text-stone-400 font-semibold">— Let's Collaborate</p>
          <h2 className="text-3xl md:text-5xl font-light leading-tight max-w-2xl mx-auto tracking-wide">
            Ready to design your private sanctuary?
          </h2>
          <p className="text-stone-400 max-w-md mx-auto font-light text-sm leading-relaxed">
            Schedule a showroom visit, view physical materials, or speak with our architects.
          </p>
          <div className="pt-4">
            <Link
              href={`${basePath}/contact`}
              className="px-8 py-4 bg-white text-stone-900 border border-white uppercase tracking-widest text-sm hover:bg-transparent hover:text-white transition-all duration-300 inline-block font-semibold"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      </section>


      {/* WhatsApp Floating Bubble */}
      <a
        href={walink}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-[#25D366] hover:bg-[#1db954] rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 active:scale-95 duration-300"
        style={{ boxShadow: '0 8px 32px rgba(37,211,102,0.3)' }}
      >
        <svg xmlns="http://www.w3.org/2050/svg" viewBox="0 0 24 24" fill="white" className="w-7 h-7">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </>
  );
}
