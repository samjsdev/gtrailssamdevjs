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
  const data = await readSourceConfig(resolvedParams.slug, 'template7');
  if (!data) return {};

  return {
    title: data.clinic?.name || "Waring Interiors Design Studio",
    description: data.clinic?.description || "Waring Interiors offers expert residential and commercial interior design services with state-of-the-art visualization.",
    keywords: data.clinic?.keywords || "interior design, home renovation, modern furniture, Waring Interiors",
    openGraph: {
      images: [
        {
          url: data.media?.clinicImages?.[0] || '/og.webp',
          width: 1200,
          height: 630,
          alt: data.clinic?.name || 'Waring Interiors Design Studio',
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

  const data = await readSourceConfig(slug, 'template7');
  if (!data) return notFound();

  // Deeply merge so that empty scraped fields don't overwrite template defaults
  const mergedData = {
    ...mainData,
    ...data,
    navbar: data.navbar || mainData.navbar,
    hero: data.hero || mainData.hero,
    stats: data.stats || mainData.stats,
    contact: data.contact || mainData.contact,
    booking: data.booking || mainData.booking,
    services: data.services || mainData.services,
  };

  const basePath = `/designwebsite/template7/${slug}`;

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
