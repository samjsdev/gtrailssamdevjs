import { readSourceConfig } from '@/lib/sourceData';
import { notFound } from "next/navigation";
import {
  DEFAULT_INTERIOR_SERVICES,
  INTERIOR_HERO_IMAGES,
  getInteriorServiceData,
  getInteriorServiceSummary,
  getServiceImage,
} from "@/lib/interiorContent";
import ServicesClient from "./ServicesClient";
import type { Metadata } from 'next';

type PageProps = {
  params?: any;
};

export async function generateMetadata(): Promise<Metadata> {
  const data = await readSourceConfig(undefined, 'template4');
  const clinicName = data?.clinic?.name || "360 Degree Interior";
  const desc = "Discover our comprehensive interior services in Chennai: Residential Design, Modular Kitchens, Living Room Styling, and Custom Furniture.";

  return {
    title: `Our Services | Design & Custom Joinery Execution | ${clinicName}`,
    description: desc,
    keywords: [
      "Interior Services Chennai",
      "Residential Interior Design",
      "Modular Kitchen Design",
      "Living Room Styling",
      "Bedroom Makeovers",
      "Custom Joinery Sourcing",
      clinicName
    ],
    openGraph: {
      title: `Our Services | Design & Custom Joinery Execution | ${clinicName}`,
      description: desc,
      type: "website",
      locale: "en_IN",
      siteName: clinicName,
    },
  };
}

export default async function ServicesPage({ params }: PageProps) {
  const slug = ''; // standalone: slug not needed for data loading

  const data = await readSourceConfig(undefined, 'template4');
  if (!data) return notFound();

  const rawServices = data.business?.services?.length
    ? data.business.services
    : DEFAULT_INTERIOR_SERVICES;

  const servicesList = rawServices.map((svc: string) => {
    const detail = getInteriorServiceData(svc);
    const image = getServiceImage(svc, data.media) || detail?.image || INTERIOR_HERO_IMAGES.services;
    return {
      title: svc,
      tagline: detail?.tagline || "Tailored design solutions for your space.",
      description: detail?.description || getInteriorServiceSummary(svc),
      benefits: detail?.benefits?.length ? detail.benefits : [
        "Personalized design concepts",
        "Material and finish guidance",
        "Transparent project planning",
        "End-to-end execution support"
      ],
      process: detail?.process?.length ? detail.process : [
        "Initial Consultation & Measurements",
        "Concept Moodboards & Layout Plans",
        "Material Selection & Costing",
        "Site Coordination & Handover"
      ],
      image,
    };
  });

  return (
    <div className="text-stone-900 bg-stone-50 min-h-screen pb-32 selection:bg-stone-200">
      
      {/* HEADER HERO */}
      <section className="relative pt-36 pb-20 px-6 max-w-6xl mx-auto text-center z-10">
        <div className="space-y-6 max-w-4xl mx-auto">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-500">— DESIGN CAPABILITIES</p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-stone-900 leading-tight">
            Our Services
          </h1>
          <p className="text-base md:text-lg text-stone-600 font-light max-w-2xl mx-auto leading-relaxed">
            From spatial analysis to artisanal turnarounds, we implement tailored spatial structures with absolute precision, material sincerity, and transparent budgets.
          </p>
        </div>
      </section>

      {/* CORE WRAPPER */}
      <ServicesClient servicesList={servicesList} />
    </div>
  );
}
