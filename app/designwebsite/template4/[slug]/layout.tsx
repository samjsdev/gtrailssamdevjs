import { getAllSlugs, readSourceConfig } from "@/lib/dataBuilder";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ReactNode } from "react";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  display: "swap",
});

type LayoutProps = {
  children: ReactNode;
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function DesignLayout({ children, params }: LayoutProps) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  const data = await readSourceConfig(slug);
  if (!data) return notFound();

  const { clinic } = data;
  const basePath = `/designwebsite/template4/${slug}`;

  const waphone = clinic.contact?.phone?.replace(/\D/g, "") || "919751396117";
  const watext = `Hi, I'm interested in booking a design consultation at ${clinic.name || "your studio"}!`;
  const walink = `https://wa.me/${waphone}?text=${encodeURIComponent(watext)}`;

  return (
    <div className={`${inter.className} min-h-screen bg-stone-50 text-stone-900 selection:bg-stone-200 scroll-smooth`}>
      {/* Elegant Transparent Navbar */}
      <header className="absolute top-0 left-0 w-full z-50 py-8 px-6 md:px-12 flex justify-between items-center transition-all bg-gradient-to-b from-black/50 to-transparent text-white">
        <Link href={basePath} className="text-xl md:text-2xl font-semibold tracking-widest uppercase">
          {clinic.name || "Studio"}
        </Link>
        <nav className="hidden md:flex gap-8 text-sm uppercase tracking-[0.2em] font-light">
          <Link href="#about" className="hover:text-stone-300 transition-colors">About</Link>
          <Link href="#services" className="hover:text-stone-300 transition-colors">Services</Link>
          <Link href="#portfolio" className="hover:text-stone-300 transition-colors">Portfolio</Link>
          <Link href="#contact" className="hover:text-stone-300 transition-colors">Contact</Link>
        </nav>
        <a 
          href={walink} 
          target="_blank" 
          rel="noreferrer"
          className="hidden md:inline-block border border-white/50 px-6 py-2 text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-colors"
        >
          Consult
        </a>
      </header>

      {/* Main Content */}
      <main className="w-full">{children}</main>

      {/* Minimal Footer */}
      {/* Tally Forms Contact Mockup */}
      <section className="py-24 bg-white border-t border-gray-200 z-10 relative" id="tally-form">
        <div className="max-w-4xl mx-auto px-8 w-full text-center">
          <div className="mb-12 space-y-4">
             <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Ready to Start Your Project?</h2>
             <p className="text-gray-500 font-medium">Please fill out the form below and our team will get back to you shortly.</p>
          </div>
          <div className="max-w-xl mx-auto w-full">
            <form className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 p-8 sm:p-10 text-left space-y-6">
              <div className="space-y-2">
                <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 font-sans">Full Name</label>
                <input type="text" id="fullName" placeholder="Your name" className="w-full text-gray-900 px-5 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4834D4] focus:border-transparent transition-colors bg-[#FAFAFA] font-sans" />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 font-sans">Email Address</label>
                <input type="email" id="email" placeholder="you@company.com" className="w-full text-gray-900 px-5 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4834D4] focus:border-transparent transition-colors bg-[#FAFAFA] font-sans" />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 font-sans">Message</label>
                <textarea id="message" rows={4} placeholder="Tell us about your project" className="w-full text-gray-900 px-5 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4834D4] focus:border-transparent transition-colors resize-none bg-[#FAFAFA] font-sans"></textarea>
              </div>
              <button type="button" className="w-full py-4 mt-2 bg-[#4834D4] hover:bg-[#3C2BAE] text-white font-bold rounded-xl transition-colors shadow-md font-sans">
                Request a Proposal
              </button>
            </form>
          </div>
        </div>
      </section>

      <footer id="contact" className="bg-stone-900 text-stone-400 py-24 px-6 md:px-12 text-center flex flex-col items-center justify-center">

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

        <div className="flex flex-col md:flex-row gap-4 md:gap-12 mb-16 text-sm uppercase tracking-[0.2em]">
          <span>{clinic.contact?.phone || "Contact"}</span>
          <span className="hidden md:inline-flex">|</span>
          <span>{clinic.address?.full || "Location"}</span>
        </div>

        <p className="text-xs tracking-widest opacity-50 uppercase">
          &copy; {new Date().getFullYear()} {clinic.name || "Studio"}. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}
