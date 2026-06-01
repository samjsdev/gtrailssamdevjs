import { readSourceConfig, getAllSlugs } from '@/lib/dataBuilder';
import { notFound } from 'next/navigation';
import { 
  MapPin, Phone, Palette, Clock
} from 'lucide-react';
import Link from 'next/link';
import { ReactNode } from 'react';
import { cleanClinicName, cleanClinicDescription } from '@/lib/copyCleaner';
import { Cormorant_Garamond, Plus_Jakarta_Sans } from 'next/font/google';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-cormorant',
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jakarta',
  weight: ['300', '400', '500', '600', '700', '800'],
});

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

type LayoutProps = {
  children: ReactNode;
  params: Promise<{ slug: string }>;
};

export default async function DesignStudioLayout({ children, params }: LayoutProps) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  const data = await readSourceConfig(slug, 'template1');
  if (!data) return notFound();

  const { clinic } = data;
  const basePath = `/designwebsite/template1/${slug}`;

  // Clean data using the utility functions
  const cleanName = cleanClinicName(clinic.name);
  const cleanDesc = cleanClinicDescription(clinic.description, clinic.name);

  return (
    <div className={`${cormorant.variable} ${jakarta.variable} min-h-screen bg-[#FCFAF6] font-sans text-[#0A0A0A] selection:bg-[#C1FF72] selection:text-[#0A0A0A] scroll-smooth flex flex-col`}>
      {/* Top Info Bar */}
      <div className="bg-[#0A0A0A] text-[#FCFAF6]/80 py-3 px-8 text-[11px] font-bold uppercase tracking-widest border-b border-[#FCFAF6]/10 relative z-50">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0">
          <div className="flex flex-wrap items-center justify-center gap-6">
            <span className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#C1FF72]" />
              <span className="font-semibold text-[#FCFAF6]/90">{clinic.address?.full || 'Studio Location'}</span>
            </span>
            <span className="hidden md:flex items-center gap-2 text-[#FCFAF6]/50">
              <Clock className="w-3.5 h-3.5 text-[#FCFAF6]/40" />
              <span>Mon-Sat: 10AM - 7PM</span>
            </span>
          </div>
          <div className="flex items-center gap-4 text-white font-medium tracking-wide">
            <a href={`tel:${clinic.contact?.phone || ''}`} className="flex items-center gap-2 hover:text-[#C1FF72] transition-colors duration-300">
              <Phone className="w-3.5 h-3.5 text-[#C1FF72]" /> 
              <span>{clinic.contact?.phone || 'Contact Number'}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <header className="sticky top-0 z-40 bg-[#FCFAF6]/95 backdrop-blur-md border-b border-[#0A0A0A]/5 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-8 h-24 flex justify-between items-center">
          <Link href={basePath} className="leading-none group">
            <h1 className="text-xl font-extrabold tracking-widest text-[#0A0A0A] uppercase transition-all group-hover:text-[#0A0A0A]/70 flex items-center gap-2">
              <span>{cleanName || 'Studio Name'}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C1FF72] animate-pulse"></span>
            </h1>
          </Link>
          
          <nav className="hidden lg:flex items-center gap-10 font-bold text-[11px] uppercase tracking-[0.25em]">
            <Link href={basePath} className="text-[#0A0A0A]/70 hover:text-[#0A0A0A] transition-colors relative py-2 after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-[1.5px] hover:after:w-4 after:bg-[#C1FF72] after:transition-all">Home</Link>
            <Link href={`${basePath}/services`} className="text-[#0A0A0A]/70 hover:text-[#0A0A0A] transition-colors relative py-2 after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-[1.5px] hover:after:w-4 after:bg-[#C1FF72] after:transition-all">Services</Link>
            <Link href={`${basePath}/about`} className="text-[#0A0A0A]/70 hover:text-[#0A0A0A] transition-colors relative py-2 after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-[1.5px] hover:after:w-4 after:bg-[#C1FF72] after:transition-all">About Us</Link>
            <Link href={`${basePath}/gallery`} className="text-[#0A0A0A]/70 hover:text-[#0A0A0A] transition-colors relative py-2 after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-[1.5px] hover:after:w-4 after:bg-[#C1FF72] after:transition-all">Gallery</Link>
            <Link href={`${basePath}/contact`} className="text-[#0A0A0A]/70 hover:text-[#0A0A0A] transition-colors relative py-2 after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-[1.5px] hover:after:w-4 after:bg-[#C1FF72] after:transition-all">Contact</Link>
          </nav>

          <Link href={`${basePath}/contact`} className="hidden md:flex items-center gap-2 bg-[#0A0A0A] text-[#FCFAF6] px-8 py-3.5 rounded-full font-bold text-[11px] tracking-[0.2em] uppercase hover:bg-transparent hover:text-[#0A0A0A] transition-all duration-500 shadow-sm border border-[#0A0A0A]">
            Book Consultation
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="grow">
        {children}
      </main>

      {/* Footer */}
      <footer id="contact" className="bg-[#0A0A0A] text-[#FCFAF6] border-t border-[#0A0A0A] pt-24 pb-12 px-8 mt-auto relative overflow-hidden">
        {/* Subtle decorative mesh grid lines in background */}
        <div className="absolute inset-0 bg-[radial-gradient(#FCFAF6_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Map Embed */}
          {(() => {
            const mapUrl = clinic.mapEmbedUrl || 
              `https://maps.google.com/maps?q=${encodeURIComponent((cleanName || '') + ' ' + (clinic.address?.full || ''))}&output=embed`;
            return (
              <div className="mb-20 rounded-[2.5rem] overflow-hidden border border-[#FCFAF6]/10 shadow-2xl bg-[#151515] relative group">
                <div className="absolute inset-0 bg-[#0A0A0A]/40 group-hover:bg-[#0A0A0A]/0 transition-all duration-700 pointer-events-none"></div>
                <iframe
                  src={mapUrl}
                  width="100%"
                  height="380"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Location of ${cleanName || 'our studio'}`}
                  className="w-full block filter invert-[90%] hue-rotate-180 contrast-[105%]"
                ></iframe>
              </div>
            );
          })()}

          {/* Footer Navigation Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-12 mb-20 text-[#FCFAF6]/60">
            <div className="lg:col-span-2 space-y-8">
              <Link href={basePath} className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-[#FCFAF6]/5 rounded-2xl flex items-center justify-center text-[#C1FF72] border border-[#FCFAF6]/10 group-hover:bg-[#C1FF72] group-hover:text-[#0A0A0A] group-hover:border-[#C1FF72] transition-all duration-500">
                  <Palette className="w-5 h-5" />
                </div>
                <h4 className="text-2xl font-serif font-semibold tracking-wider text-white flex items-center gap-1.5">
                  <span>{cleanName || 'Design Studio'}</span>
                  <span className="w-1 h-1 rounded-full bg-[#C1FF72]"></span>
                </h4>
              </Link>
              <p className="text-[#FCFAF6]/60 font-medium leading-relaxed max-w-sm text-sm">
                {cleanDesc || 'Creating refined interiors with thoughtful planning, curated materials, and client-first project execution.'}
              </p>
            </div>

            <div className="space-y-6">
              <h5 className="text-white font-bold tracking-[0.2em] uppercase text-[11px]">Contact Info</h5>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <MapPin className="w-4 h-4 mt-1 shrink-0 text-[#C1FF72]" />
                  <span className="text-sm font-semibold leading-relaxed text-[#FCFAF6]/80">{clinic.address?.full || 'Studio Location'}</span>
                </li>
                <li className="flex items-start gap-4">
                  <Phone className="w-4 h-4 mt-1 shrink-0 text-[#C1FF72]" />
                  <span className="text-sm font-bold text-white hover:text-[#C1FF72] transition-colors">
                    <a href={`tel:${clinic.contact?.phone || ''}`}>{clinic.contact?.phone || 'Phone Number'}</a>
                  </span>
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <h5 className="text-white font-bold tracking-[0.2em] uppercase text-[11px]">Quick Links</h5>
              <ul className="space-y-4 font-semibold text-sm">
                <li><Link href={basePath} className="hover:text-[#C1FF72] hover:translate-x-1 transition-all inline-block">Home</Link></li>
                <li><Link href={`${basePath}/services`} className="hover:text-[#C1FF72] hover:translate-x-1 transition-all inline-block">Services</Link></li>
                <li><Link href={`${basePath}/about`} className="hover:text-[#C1FF72] hover:translate-x-1 transition-all inline-block">About Us</Link></li>
                <li><Link href={`${basePath}/gallery`} className="hover:text-[#C1FF72] hover:translate-x-1 transition-all inline-block">Gallery</Link></li>
                <li><Link href={`${basePath}/contact`} className="hover:text-[#C1FF72] hover:translate-x-1 transition-all inline-block">Contact Us</Link></li>
              </ul>
            </div>
          </div>

          {/* Subfooter */}
          <div className="pt-8 border-t border-[#FCFAF6]/10 flex flex-col md:flex-row justify-between items-center gap-6 text-xs font-semibold text-[#FCFAF6]/50 uppercase tracking-wider">
            <p>&copy; {new Date().getFullYear()} {cleanName || 'Studio'}. All rights reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-[#C1FF72] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[#C1FF72] transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
      
      {/* WhatsApp Floating Bubble */}
      {(() => {
        const waPhone = clinic.contact?.phone?.replace(/\D/g, '') || '919751396117';
        const waText = `Hi, I'm interested in booking a design consultation at ${cleanName || 'your studio'}!`;
        const waLink = `https://wa.me/${waPhone}?text=${encodeURIComponent(waText)}`;
        return (
          <a
            href={waLink}
            target="_blank"
            rel="noreferrer"
            aria-label="Chat on WhatsApp"
            className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-[#25D366] hover:bg-[#1db954] rounded-full flex items-center justify-center shadow-2xl transition-all hover:scale-110 active:scale-95 group"
            style={{ boxShadow: '0 8px 32px rgba(37,211,102,0.4)' }}
          >
            <span className="absolute -left-32 top-3 w-28 bg-[#0A0A0A] text-[#FCFAF6] text-[11px] font-bold uppercase tracking-widest text-center py-2 px-3 rounded-xl border border-[#FCFAF6]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block">Chat With Us</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-8 h-8">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </a>
        );
      })()}
    </div>
  );
}
