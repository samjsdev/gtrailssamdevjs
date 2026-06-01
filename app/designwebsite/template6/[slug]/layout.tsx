import { getAllSlugs, readSourceConfig } from "@/lib/dataBuilder";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ReactNode } from "react";
import { Playfair_Display, Lato } from "next/font/google";
import { MapPin, Phone } from "lucide-react";
import ClientHeader from "./ClientHeader";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  display: "swap",
});

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

type LayoutProps = {
  children: ReactNode;
  params: Promise<{ slug: string }>;
};

export default async function DesignStudioLayout({ children, params }: LayoutProps) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  const data = await readSourceConfig(slug, 'template6');
  if (!data) return notFound();

  const { clinic } = data;
  const basePath = `/designwebsite/template6/${slug}`;
  
  const waphone = clinic.contact?.phone?.replace(/\D/g, "") || "919751396117";
  const watext = `Hi, I'm interested in booking a design consultation at ${clinic.name || "your studio"}!`;
  const walink = `https://wa.me/${waphone}?text=${encodeURIComponent(watext)}`;

  return (
    <div className={`${lato.className} min-h-screen bg-[#1a1a1a] text-zinc-300 selection:bg-zinc-800 selection:text-white scroll-smooth flex flex-col`}>
      {/* Dynamic Scrolling Header */}
      <ClientHeader clinic={clinic} basePath={basePath} />

      {/* Main content */}
      <main className="grow">
        {children}
      </main>

      {/* Sophisticated Footer */}
      {/* Tally Forms Contact Mockup - Restyled to match quiet luxury theme */}
      <section className="py-24 bg-[#121212] border-t border-white/10 z-10 relative" id="tally-form">
        <div className="max-w-4xl mx-auto px-8 w-full text-center">
          <div className="mb-12 space-y-4">
             <h2 className={`${playfair.className} text-3xl sm:text-4xl text-white tracking-wide uppercase`}>Ready to Start Your Project?</h2>
             <p className="text-zinc-400 font-light leading-relaxed max-w-sm mx-auto text-sm">Please fill out the form below and our team will get back to you shortly.</p>
          </div>
          <div className="max-w-xl mx-auto w-full">
            <form className="bg-[#1a1a1a] rounded-[2rem] border border-white/10 p-8 sm:p-10 text-left space-y-6 shadow-2xl">
              <div className="space-y-2">
                <label htmlFor="fullName" className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500 font-sans">Full Name</label>
                <input type="text" id="fullName" placeholder="Your name" className="w-full text-white px-5 py-3.5 rounded-xl border border-white/10 focus:outline-none focus:ring-1 focus:ring-white focus:border-transparent transition-all bg-[#222] font-sans text-sm" />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500 font-sans">Email Address</label>
                <input type="email" id="email" placeholder="you@company.com" className="w-full text-white px-5 py-3.5 rounded-xl border border-white/10 focus:outline-none focus:ring-1 focus:ring-white focus:border-transparent transition-all bg-[#222] font-sans text-sm" />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500 font-sans">Message</label>
                <textarea id="message" rows={4} placeholder="Tell us about your project" className="w-full text-white px-5 py-3.5 rounded-xl border border-white/10 focus:outline-none focus:ring-1 focus:ring-white focus:border-transparent transition-all resize-none bg-[#222] font-sans text-sm"></textarea>
              </div>
              <button type="button" className="w-full py-4 mt-2 bg-white hover:bg-[#1a1a1a] hover:text-white text-black font-bold rounded-xl border border-transparent hover:border-white transition-all uppercase tracking-wider text-xs shadow-md font-sans">
                Request a Proposal
              </button>
            </form>
          </div>
        </div>
      </section>

      <footer id="contact" className="bg-[#121212] pt-24 pb-12 px-6 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto">
          {/* Map Embed */}
          {(() => {
            const mapUrl = clinic.mapEmbedUrl || 
              `https://maps.google.com/maps?q=${encodeURIComponent((clinic.name || '') + ' ' + (clinic.address?.full || ''))}&output=embed`;
            return (
              <div className="mb-16 rounded-3xl overflow-hidden shadow-sm aspect-video sm:aspect-[21/9] border border-black/10">
                <iframe
                  src={mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Location of ${clinic.name || 'our studio'}`}
                  className="w-full h-full block"
                ></iframe>
              </div>
            );
          })()}

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
            <div className="lg:col-span-2 space-y-6 text-zinc-400">
              <h4 className={`${playfair.className} text-3xl text-white tracking-wide uppercase`}>{clinic.name || "Studio"}</h4>
              <p className="font-light leading-loose max-w-sm text-sm">
                {clinic.description || "Curating spaces with purpose, blending timeless elegance with modern function."}
              </p>
            </div>

            <div>
              <h5 className="text-white text-xs uppercase tracking-[0.2em] mb-8">Reach Us</h5>
              <ul className="space-y-6 text-sm font-light text-zinc-400">
                <li className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 shrink-0 opacity-50" />
                  <span>{clinic.address?.full || "Our Studio Location"}</span>
                </li>
                <li className="flex items-center gap-4">
                  <Phone className="w-5 h-5 shrink-0 opacity-50" />
                  <span>{clinic.contact?.phone || "Contact Number"}</span>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="text-white text-xs uppercase tracking-[0.2em] mb-8">Explore</h5>
              <ul className="space-y-4 text-sm font-light text-zinc-400">
                <li><Link href={`${basePath}`} className="hover:text-white transition">Home</Link></li>
                <li><Link href={`${basePath}/about`} className="hover:text-white transition">About</Link></li>
                <li><Link href={`${basePath}/services`} className="hover:text-white transition">Services</Link></li>
                <li><Link href={`${basePath}/gallery`} className="hover:text-white transition">Gallery</Link></li>
                <li><Link href={`${basePath}/contact`} className="hover:text-white transition">Contact</Link></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] tracking-[0.2em] uppercase text-zinc-600">
            <p>&copy; {new Date().getFullYear()} {clinic.name || "Studio"}. All Rights Reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-zinc-300">Privacy</a>
              <a href="#" className="hover:text-zinc-300">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
