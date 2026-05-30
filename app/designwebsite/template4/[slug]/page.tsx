import { readSourceConfig } from "@/lib/dataBuilder";
import {
  DEFAULT_INTERIOR_HIGHLIGHTS,
  DEFAULT_INTERIOR_REVIEWS,
  DEFAULT_INTERIOR_SERVICES,
  INTERIOR_HERO_IMAGES,
  getInteriorServiceSummary,
  getInteriorServiceData,
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

  const data = await readSourceConfig(slug);
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
    </>
  );
}
