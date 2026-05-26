import { readSourceConfig, getAllSlugs } from '@/lib/dataBuilder';
import { notFound } from 'next/navigation';
import { Phone, Compass, MapPin } from 'lucide-react';
import Link from 'next/link';
import { ReactNode } from 'react';
import { Lora, DM_Sans } from 'next/font/google';

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
});

type LayoutProps = {
  children: ReactNode;
  params: Promise<{ slug: string }>;
};

export default async function DesignStudioLayout({ children, params }: LayoutProps) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  const data = await readSourceConfig(slug);
  if (!data) return notFound();

  const { clinic } = data;
  const basePath = `/designwebsite/template7/${slug}`;

  return (
    <div className={`${dmSans.className} min-h-screen bg-[#FAF8F5] text-[#3D2C20] selection:bg-[#E3A857] selection:text-white scroll-smooth flex flex-col`}>
      {/* Top bar info */}
      <div className="bg-[#3B483B] text-[#FAF8F5] py-2 px-8 text-xs relative z-50">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-2">
             <Compass className="w-3.5 h-3.5 text-[#E3A857]" />
             <span>{clinic.address?.full || 'Studio Location'}</span>
          </div>
          <div className="flex items-center gap-4 text-white font-medium">
             <a href={`tel:${clinic.contact?.phone || ''}`} className="flex items-center gap-2 hover:text-[#E3A857] transition-colors">
               <Phone className="w-3.5 h-3.5 text-[#E3A857]" /> {clinic.contact?.phone || 'Contact Phone'}
             </a>
          </div>
        </div>
      </div>

      {/* Navbar header */}
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#D4C3B3] transition-all duration-300">
        <div className="max-w-7xl mx-auto px-8 h-20 flex justify-between items-center">
          <Link href={basePath} className="flex items-center gap-2">
            <h1 className={`${lora.className} text-xl md:text-2xl font-bold tracking-tight text-[#3D2C20]`}>
              {clinic.name || 'Retro Studio'}
            </h1>
          </Link>
          
          <nav className="hidden lg:flex items-center gap-8 font-medium text-xs uppercase tracking-widest text-[#5C4D3C]">
            <Link href="#services" className="hover:text-[#E3A857] transition-colors">Services</Link>
            <Link href="#about" className="hover:text-[#E3A857] transition-colors">About Us</Link>
            <Link href="#gallery" className="hover:text-[#E3A857] transition-colors">Gallery</Link>
            <Link href="#contact" className="hover:text-[#E3A857] transition-colors">Contact</Link>
          </nav>

          <Link href="#contact" className="hidden md:flex items-center bg-[#3D2C20] text-white px-6 py-2.5 rounded-none font-bold uppercase tracking-wider text-xs hover:bg-[#E3A857] transition-all">
             Consultation
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="grow">
        {children}
      </main>

      {/* Footer */}
      <footer id="contact" className="bg-[#EAE5DF] border-t border-[#D4C3B3] pt-16 pb-12 px-8 mt-auto">
        <div className="max-w-7xl mx-auto">
          {/* Map Embed block */}
          {(() => {
            const mapUrl = clinic.mapEmbedUrl || 
              `https://maps.google.com/maps?q=${encodeURIComponent((clinic.name || '') + ' ' + (clinic.address?.full || ''))}&output=embed`;
            return (
              <div className="mb-16 rounded-none overflow-hidden border border-[#D4C3B3] shadow-sm bg-[#FAF8F5]">
                <iframe
                  src={mapUrl}
                  width="100%"
                  height="350"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Location of ${clinic.name || 'our studio'}`}
                  className="w-full block"
                ></iframe>
              </div>
            );
          })()}

          {/* Footer Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16 text-[#5C4D3C]">
            <div className="lg:col-span-2 space-y-6">
              <h4 className={`${lora.className} text-2xl font-bold text-[#3D2C20]`}>{clinic.name || 'Retro Studio'}</h4>
              <p className="font-light leading-relaxed max-w-sm text-[15px]">{clinic.description || 'Designing functional interiors influenced by the organic forms and clean lines of mid-century aesthetics.'}</p>
            </div>

            <div>
              <h5 className="text-[#3D2C20] font-semibold mb-6 uppercase text-xs tracking-wider">CONTACT DIRECT</h5>
              <ul className="space-y-4 font-light text-sm">
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 mt-1 shrink-0 text-[#E3A857]" />
                  <span>{clinic.address?.full || 'Studio Location'}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="w-4 h-4 mt-1 shrink-0 text-[#E3A857]" />
                  <span>{clinic.contact?.phone || 'Phone Number'}</span>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="text-[#3D2C20] font-semibold mb-6 uppercase text-xs tracking-wider">QUICK NAV</h5>
              <ul className="space-y-3 text-sm">
                <li><Link href="#services" className="hover:text-[#E3A857] transition-colors">Services</Link></li>
                <li><Link href="#about" className="hover:text-[#E3A857] transition-colors">About Us</Link></li>
                <li><Link href="#gallery" className="hover:text-[#E3A857] transition-colors">Gallery</Link></li>
                <li><Link href="#contact" className="hover:text-[#E3A857] transition-colors">Contact Us</Link></li>
              </ul>
            </div>
          </div>

          {/* Subfooter */}
          <div className="pt-8 border-t border-[#D4C3B3] flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#5D4D3D]">
            <p>&copy; {new Date().getFullYear()} {clinic.name || 'Studio'}. ALL RIGHTS RESERVED.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-[#E3A857] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[#E3A857] transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
          {/* WhatsApp Floating Bubble */}
      {(() => {
        const waPhone = clinic.contact?.phone?.replace(/\D/g, '') || '919751396117';
        const waText = `Hi, I'm interested in booking a design consultation at ${clinic.name || 'your studio'}!`;
        const waLink = `https://wa.me/${waPhone}?text=${encodeURIComponent(waText)}`;
        return (
          <a
            href={waLink}
            target="_blank"
            rel="noreferrer"
            aria-label="Chat on WhatsApp"
            className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-[#25D366] hover:bg-[#1db954] rounded-full flex items-center justify-center shadow-2xl transition-all hover:scale-110 active:scale-95"
            style={{ boxShadow: '0 8px 32px rgba(37,211,102,0.4)' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-8 h-8">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </a>
        );
      })()}
</div>
  );
}
