import { getAllSlugs, readSourceConfig } from '@/lib/sourceData';
import { notFound } from "next/navigation";
import Link from "next/link";
import { ReactNode } from "react";
import { Inter } from "next/font/google";
import ClientHeader from "./ClientHeader";
import SmoothScrollProvider from "./components/SmoothScrollProvider";
import GsapInit from "./components/GsapInit";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  display: "swap",
});

type LayoutProps = {
  children: ReactNode;
  params?: any;
};


export default async function DesignLayout({ children, params }: LayoutProps) {
  const slug = ''; // standalone: slug not needed for data loading

  const data = await readSourceConfig(undefined, 'template4');
  if (!data) return notFound();

  const { clinic } = data;
  const basePath = ``;

  return (
    <div className={`${inter.className} min-h-screen bg-stone-50 text-stone-900 selection:bg-stone-200 scroll-smooth flex flex-col`}>
      <SmoothScrollProvider>
        <GsapInit />
        
        {/* Elegant Floating Glassmorphic Navbar Capsule */}
        <ClientHeader clinic={clinic} basePath={basePath} />

        {/* Main Content */}
        <main className="w-full flex-grow">{children}</main>

        <footer id="contact" className="bg-stone-900 text-stone-400 py-24 px-6 md:px-12 text-center flex flex-col items-center justify-center border-t border-stone-800">
          {/* Map Embed */}
        {(() => {
          const mapUrl = clinic.mapEmbedUrl || 
            `https://maps.google.com/maps?q=${encodeURIComponent((clinic.name || '') + ' ' + (clinic.address?.full || ''))}&output=embed`;
          return (
            <div className="w-full max-w-4xl mx-auto mb-16 rounded-3xl overflow-hidden shadow-sm aspect-video sm:aspect-[21/9] border border-stone-800">
              <iframe
                src={mapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Location of ${clinic.name || 'our studio'}`}
                className="w-full h-full block border-0"
              ></iframe>
            </div>
          );
        })()}

        <h2 className="text-3xl md:text-4xl text-white font-light tracking-widest uppercase mb-4">
          {clinic.name || "Interior Studio"}
        </h2>
        <p className="max-w-md mx-auto font-light leading-relaxed mb-12">
          {clinic.tagline || "Thoughtful interiors for modern living."}
        </p>

        <div className="flex flex-wrap justify-center gap-6 md:gap-10 mb-12 text-[11px] uppercase tracking-[0.2em] font-medium text-stone-400">
          <Link href={`${basePath}`} className="hover:text-white transition-colors">Home</Link>
          <Link href={`${basePath}/about`} className="hover:text-white transition-colors">About</Link>
          <Link href={`${basePath}/services`} className="hover:text-white transition-colors">Services</Link>
          <Link href={`${basePath}/gallery`} className="hover:text-white transition-colors">Portfolio</Link>
          <Link href={`${basePath}/contact`} className="hover:text-white transition-colors">Contact</Link>
        </div>

        <div className="flex flex-col md:flex-row gap-4 md:gap-12 mb-16 text-xs uppercase tracking-[0.2em] text-stone-500 font-light">
          <span>{clinic.contact?.phone || "Contact"}</span>
          <span className="hidden md:inline-flex text-stone-700">|</span>
          <span>{clinic.address?.full || "Location"}</span>
        </div>

        <p className="text-xs tracking-widest opacity-50 uppercase">
          &copy; {new Date().getFullYear()} {clinic.name || "Studio"}. All Rights Reserved.
        </p>
      </footer>
      </SmoothScrollProvider>
    </div>
  );
}
