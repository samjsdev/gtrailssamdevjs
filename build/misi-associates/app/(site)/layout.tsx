import type { Metadata } from "next";
import { Outfit, Fraunces } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "./context/ThemeContext";
import AppShell from "./components/AppShell";
import { readSourceConfig } from '@/lib/sourceData';
import { notFound } from "next/navigation";
import { ReactNode } from "react";
import { TemplateProvider } from "./context/TemplateContext";
import mainData from "./public/main.json";

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


export async function generateMetadata({ params }: { params?: any }): Promise<Metadata> {
  const resolvedParams = await params;
  const data = await readSourceConfig(resolvedParams.slug, 'template7');
  if (!data) return {};

  return {
    title: data.clinic?.name || "Misi Associates | Architecture & Interior Design",
    description: data.clinic?.description || "Misi Associates offers expert architecture, construction, project management, interior design, and turnkey services.",
    keywords: data.clinic?.keywords || "architecture, interior design, construction, project management, Misi Associates, Chennai, Madurai, Ramanathapuram",
    openGraph: {
      images: [
        {
          url: data.media?.clinicImages?.[0] || '/asset/portfolio/pdf-gallery-1.png',
          width: 1200,
          height: 630,
          alt: data.clinic?.name || 'Misi Associates',
        },
      ],
    },
    icons: {
      icon: '/asset/brandmark.png',
      shortcut: '/asset/brandmark.png',
      apple: '/asset/brandmark.png',
    },
  };
}

export default async function DesignStudioLayout({
  children,
  params,
}: Readonly<{
  children: ReactNode;
  params?: any;
}>) {
  const slug = ''; // standalone: slug not needed for data loading

  const data = await readSourceConfig(undefined, 'template7');
  if (!data) return notFound();

  // Deeply merge so that empty scraped fields don't overwrite template defaults
  const templateData = data as any;
  const mergedData = {
    ...mainData,
    ...data,
    navbar: templateData.navbar || mainData.navbar,
    hero: templateData.hero || mainData.hero,
    stats: templateData.stats || mainData.stats,
    contact: templateData.contact || mainData.contact,
    booking: templateData.booking || mainData.booking,
    services: templateData.services || mainData.services,
  };

  const basePath = ``;

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
