import type { Metadata } from "next";
import { Outfit, Fraunces } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./context/ThemeContext";
import AppShell from "./components/AppShell";
import { getAllSlugs, readSourceConfig } from "@/lib/dataBuilder";
import { notFound } from "next/navigation";
import { ReactNode } from "react";
import { TemplateProvider } from "./context/TemplateContext";
import mainData from "./public/main.json";
import {
  cleanArchitectureTagline,
  cleanArchitectureDescription,
  cleanArchitectureServices,
  cleanArchitectureHighlights,
  cleanArchitectureSpecialization,
} from "@/lib/copyCleaner";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const data = await readSourceConfig(resolvedParams.slug, 'template17');
  if (!data) return {};

  const city = data.clinic?.address?.city || 'Chennai';
  const cleanDesc = cleanArchitectureDescription(data.clinic?.description, data.clinic?.name, city);

  return {
    title: data.clinic?.name || "Architectural Atelier & Civil Build",
    description: cleanDesc,
    keywords: data.clinic?.keywords || "architecture, civil construction, turnkey villas, residential houses, commercial buildings",
    openGraph: {
      images: [
        {
          url: data.media?.clinicImages?.[0] || '/images/architecture/hero-villa-twilight.webp',
          width: 1200,
          height: 630,
          alt: data.clinic?.name || 'Architectural Atelier',
        },
      ],
    },
    icons: {
      icon: data.clinic?.logo || '/images/lumina_logo.svg',
      shortcut: data.clinic?.logo || '/images/lumina_logo.svg',
      apple: data.clinic?.logo || '/images/lumina_logo.svg',
    },
  };
}

export default async function DesignStudioLayout({
  children,
  params,
}: Readonly<{
  children: ReactNode;
  params: Promise<{ slug: string }>;
}>) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  const data = await readSourceConfig(slug, 'template17');
  if (!data) return notFound();

  const city = data.clinic?.address?.city || 'Chennai';
  const cleanTagline = cleanArchitectureTagline(data.clinic?.tagline);
  const cleanDesc = cleanArchitectureDescription(data.clinic?.description, data.clinic?.name, city);
  const cleanServices = cleanArchitectureServices(data.business?.services);
  const cleanHighlights = cleanArchitectureHighlights(data.business?.highlights);
  const cleanSpecialization = cleanArchitectureSpecialization(data.doctor?.specialization);

  const sanitizedClinic = {
    ...data.clinic,
    tagline: cleanTagline,
    description: cleanDesc,
  };
  const sanitizedBusiness = {
    ...data.business,
    services: cleanServices,
    highlights: cleanHighlights,
  };
  const sanitizedDoctor = {
    ...data.doctor,
    specialization: cleanSpecialization,
  };

  // Deeply merge so that empty scraped fields don't overwrite template defaults
  const templateData = data as any;
  const mergedData = {
    ...mainData,
    ...data,
    clinic: sanitizedClinic,
    business: sanitizedBusiness,
    doctor: sanitizedDoctor,
    navbar: templateData.navbar || mainData.navbar,
    hero: templateData.hero || mainData.hero,
    stats: templateData.stats || mainData.stats,
    contact: templateData.contact || mainData.contact,
    booking: templateData.booking || mainData.booking,
    services: templateData.services || mainData.services,
  };

  const basePath = `/designwebsite/template17/${slug}`;

  return (
    <div className={`${outfit.variable} ${fraunces.variable}`} style={{ fontFamily: "'Outfit', sans-serif" }}>
      <TemplateProvider data={mergedData} basePath={basePath}>
        <ThemeProvider>
          <AppShell>{children}</AppShell>
        </ThemeProvider>
      </TemplateProvider>
    </div>
  );
}
