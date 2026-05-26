import { readSourceConfig, getAllSlugs } from '@/lib/dataBuilder';
import { notFound } from 'next/navigation';
import { Phone, ArrowUpRight, Palette } from 'lucide-react';
import Link from 'next/link';
import { ReactNode } from 'react';
import { Outfit, Space_Grotesk } from 'next/font/google';

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '700'],
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
  const basePath = `/designwebsite/template6/${slug}`;

  return (
    <div className={`${outfit.className} min-h-screen bg-[#FFFEEB] text-black selection:bg-black selection:text-white scroll-smooth flex flex-col`}>
      {/* Navbar header */}
      <header className="sticky top-4 z-50 flex justify-center px-4 md:px-6">
        <div className="w-full max-w-7xl">
          <div className="flex items-center justify-between px-6 py-4 bg-white border-4 border-black rounded-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <Link href={basePath} className="flex items-center gap-2">
              <span className={`${spaceGrotesk.className} text-xl md:text-2xl font-black uppercase tracking-tight`}>
                {clinic.name || 'Studio'}
              </span>
            </Link>
            
            <nav className="hidden lg:flex items-center gap-8 text-[14px] font-black uppercase tracking-wider">
              <Link href="#services" className="hover:underline hover:decoration-2 transition-all">Services</Link>
              <Link href="#about" className="hover:underline hover:decoration-2 transition-all">About Us</Link>
              <Link href="#gallery" className="hover:underline hover:decoration-2 transition-all">Gallery</Link>
              <Link href="#contact" className="hover:underline hover:decoration-2 transition-all">Contact</Link>
            </nav>

            <Link
              href="#contact"
              className="inline-flex items-center gap-2 bg-[#FF8C42] border-2 border-black px-4 py-2 text-[13px] font-black uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
            >
              INQUIRE NOW
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="grow pt-8">
        {children}
      </main>

      {/* Footer */}
      <footer id="contact" className="bg-white border-t-4 border-black pt-20 pb-12 px-8 mt-16">
        <div className="max-w-7xl mx-auto">
          {/* Map Embed block */}
          {(() => {
            const mapUrl = clinic.mapEmbedUrl || 
              `https://maps.google.com/maps?q=${encodeURIComponent((clinic.name || '') + ' ' + (clinic.address?.full || ''))}&output=embed`;
            return (
              <div className="mb-16 border-4 border-black p-2 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white">
                <iframe
                  src={mapUrl}
                  width="100%"
                  height="350"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Location of ${clinic.name || 'our studio'}`}
                  className="w-full block border-2 border-black"
                ></iframe>
              </div>
            );
          })()}

          {/* Footer Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
            <div className="lg:col-span-2 space-y-6">
              <h4 className={`${spaceGrotesk.className} text-2xl font-black uppercase`}>{clinic.name || 'Studio'}</h4>
              <p className="font-bold text-slate-700 leading-relaxed max-w-sm">{clinic.description || 'Designing space, choosing materials, coordinating vendors - bold execution without compromises.'}</p>
            </div>

            <div>
              <h5 className="font-black mb-6 uppercase text-sm tracking-wider">CONTACT DIRECT</h5>
              <ul className="space-y-4 font-bold text-sm">
                <li>
                  <strong>Address:</strong><br />
                  {clinic.address?.full || 'Studio Location'}
                </li>
                <li>
                  <strong>Phone:</strong><br />
                  {clinic.contact?.phone || 'Phone Number'}
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-black mb-6 uppercase text-sm tracking-wider">NAVIGATION</h5>
              <ul className="space-y-2 text-sm font-bold uppercase">
                <li><Link href="#services" className="hover:underline">Services</Link></li>
                <li><Link href="#about" className="hover:underline">About Us</Link></li>
                <li><Link href="#gallery" className="hover:underline">Gallery</Link></li>
                <li><Link href="#contact" className="hover:underline">Contact</Link></li>
              </ul>
            </div>
          </div>

          {/* Subfooter */}
          <div className="pt-8 border-t-2 border-black flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold uppercase">
            <p>&copy; {new Date().getFullYear()} {clinic.name || 'Studio'}. ALL RIGHTS RESERVED.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:underline">Privacy Policy</a>
              <a href="#" className="hover:underline">Terms of Service</a>
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
