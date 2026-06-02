import { readSourceConfig, getAllSlugs } from '@/lib/dataBuilder';
import { notFound } from 'next/navigation';
import { 
  Phone, ArrowUpRight, Sparkles, Send
} from 'lucide-react';
import Link from 'next/link';
import { ReactNode } from 'react';
import { Cormorant_Garamond, Plus_Jakarta_Sans } from 'next/font/google';
import ClientHeader from './ClientHeader';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-jakarta',
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

  const data = await readSourceConfig(slug, 'template2');
  if (!data) return notFound();

  const { clinic } = data;
  const basePath = `/designwebsite/template2/${slug}`;

  return (
    <div className={`${plusJakarta.className} min-h-screen bg-[#F7F4EF] text-[#2A2421] selection:bg-[#8E7056] selection:text-white scroll-smooth flex flex-col`} style={{ WebkitFontSmoothing: 'antialiased' }}>
      {/* Top Info Bar */}
      <div className="bg-[#2A2421] text-[#FAF8F5] py-3 px-6 sm:px-8 text-[11px] border-b border-white/5 relative z-50 font-light tracking-widest uppercase">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
          <div className="flex flex-wrap items-center justify-center gap-6">
            <span className="flex items-center gap-2 text-[#FAF8F5]">
              {clinic.address?.city ? `${clinic.address.city}, Chennai` : 'Pallikaranai, Chennai'}
            </span>
            <span className="hidden md:flex items-center gap-2 text-[#FAF8F5]/85 border-l border-white/10 pl-6">
              Mon-Sat, 9AM to 6PM
            </span>
          </div>
          <div className="flex items-center gap-4 font-semibold tracking-widest">
            <a href={`tel:${clinic.contact?.phone || ''}`} className="flex items-center gap-2 hover:text-[#FAF8F5] transition-colors text-[#FAF8F5]">
              <Phone className="w-3 h-3 text-[#8E7056]" /> {clinic.contact?.phone || 'Contact Number'}
            </a>
          </div>
        </div>
      </div>

      {/* Floating Capsule Header */}
      <ClientHeader clinicName={clinic.name} basePath={basePath} phone={clinic.contact?.phone || ''} />
 
      {/* Main Content inside Padded Canvas Wrapper */}
      <main className="grow px-4 sm:px-6 md:px-8 pt-4 pb-8 max-w-7xl mx-auto w-full relative z-10">
        {children}
      </main>
 
      {/* Footer */}
      <footer className="bg-[#EAE3D8]/50 border-t border-[#EAE3D8]/80 pt-20 pb-12 px-6 sm:px-8 mt-auto">
        <div className="max-w-7xl mx-auto">
          {/* Map Embed */}
          {(() => {
            const mapUrl = clinic.mapEmbedUrl || 
              `https://maps.google.com/maps?q=${encodeURIComponent((clinic.name || '') + ' ' + (clinic.address?.full || 'Adyar, Chennai'))}&output=embed`;
            return (
              <div className="mb-16 rounded-[2rem] overflow-hidden shadow-sm aspect-video sm:aspect-[21/9] border border-[#EAE3D8]">
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

          {/* Footer Navigation Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16 text-[#2A2421]/80">
            <div className="lg:col-span-2 space-y-6">
              <Link href={basePath} className="flex items-center gap-3">
                <div className="w-9 h-9 bg-[#8E7056]/15 rounded-full flex items-center justify-center text-[#8E7056]">
                  <Sparkles className="w-4.5 h-4.5" />
                </div>
                <h4 className={`${cormorant.className} text-xl font-bold tracking-wide text-[#2A2421]`}>
                  {clinic.name || 'SKETCHLAB'}
                </h4>
              </Link>
              <p className="text-[#2A2421]/90 font-light leading-relaxed max-w-sm text-[13.5px]">
                {clinic.description || 'Simplifying the interior design process with curated material palettes, bespoke furniture selections, and modular kitchens in Chennai.'}
              </p>
            </div>
 
            <div>
              <h5 className="text-[#8E7056] font-bold mb-6 tracking-[0.2em] uppercase text-[10px]">Contact Info</h5>
              <ul className="space-y-4 font-light text-[13.5px]">
                <li className="leading-relaxed text-[#2A2421]/90">
                  {clinic.address?.full || '1/20, Anna Street, Velachery - Tambaram Main Rd, Pallikaranai, Chennai, Tamil Nadu 600100'}
                </li>
                <li>
                  <a href={`tel:${clinic.contact?.phone || ''}`} className="hover:text-[#8E7056] transition-colors text-[#2A2421]/90 font-semibold">
                    {clinic.contact?.phone || 'Phone Number'}
                  </a>
                </li>
              </ul>
            </div>
 
            <div>
              <h5 className="text-[#8E7056] font-bold mb-6 tracking-[0.2em] uppercase text-[10px]">Explore</h5>
              <ul className="space-y-3 font-light text-[13.5px]">
                <li><Link href={basePath} className="hover:text-[#8E7056] transition-colors text-[#2A2421]/85">Home</Link></li>
                <li><Link href={`${basePath}/about`} className="hover:text-[#8E7056] transition-colors text-[#2A2421]/85">About</Link></li>
                <li><Link href={`${basePath}/services`} className="hover:text-[#8E7056] transition-colors text-[#2A2421]/85">Services</Link></li>
                <li><Link href={`${basePath}/gallery`} className="hover:text-[#8E7056] transition-colors text-[#2A2421]/85">Gallery</Link></li>
                <li><Link href={`${basePath}/contact`} className="hover:text-[#8E7056] transition-colors text-[#2A2421]/85">Contact</Link></li>
              </ul>
            </div>
          </div>
 
          {/* Subfooter */}
          <div className="pt-8 border-t border-[#EAE3D8] flex flex-col md:flex-row justify-between items-center gap-6 text-[12px] font-light text-[#2A2421]/75">
            <p>&copy; {new Date().getFullYear()} {clinic.name || 'SKETCHLAB'}. All rights reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-[#8E7056] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[#8E7056] transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
      
      {/* WhatsApp Floating Bubble */}
      {(() => {
        const waPhone = clinic.contact?.phone?.replace(/\D/g, '') || '919751396117';
        const waText = `Hi, I'm interested in booking an interior design consultation at ${clinic.name || 'your studio'}!`;
        const waLink = `https://wa.me/${waPhone}?text=${encodeURIComponent(waText)}`;
        return (
          <a
            href={waLink}
            target="_blank"
            rel="noreferrer"
            aria-label="Chat on WhatsApp"
            className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] hover:bg-[#1db954] rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 active:scale-95"
            style={{ boxShadow: '0 8px 32px rgba(37,211,102,0.3)' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-7 h-7">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </a>
        );
      })()}
    </div>
  );
}

