import { readSourceConfig, getAllSlugs } from '@/lib/dataBuilder';
import { notFound } from 'next/navigation';
import { 
  ArrowUpRight, Palette
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { ReactNode } from 'react';
import { Fustat, Inter } from 'next/font/google';
import { INTERIOR_HERO_IMAGES } from '@/lib/interiorContent';

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

const fustat = Fustat({
  subsets: ['latin'],
  weight: ['700'],
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
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
  const basePath = `/designwebsite/template3/${slug}`;

  return (
    <div
      className={`${inter.className} min-h-screen bg-white text-slate-900 selection:bg-[#0084FF] selection:text-white scroll-smooth flex flex-col`}
      style={{ WebkitFontSmoothing: 'antialiased' }}
    >
      <header className="sticky top-6 z-50 flex justify-center px-4 md:px-6 transition-all duration-300">
        <div className="w-fit">
          <div className="flex items-center gap-4 md:gap-8 px-4 md:px-6 py-3 bg-white/80 backdrop-blur-xl rounded-full shadow-[0_12px_36px_rgba(0,0,0,0.12)] border border-white/60">
          <Link href={basePath} className="flex items-center gap-4 leading-none">
            <div className="relative w-10 h-10 overflow-hidden rounded-xl border border-black/10 bg-white/70">
              <Image
                src={INTERIOR_HERO_IMAGES.home}
                alt="Interior design studio"
                fill
                sizes="40px"
                className="object-cover"
              />
            </div>
            <h1 className={`${fustat.className} text-lg md:text-xl leading-none tracking-[-0.02em] text-slate-900`}>
              {clinic.name || 'Studio Name'}
            </h1>
          </Link>
          
          <nav className="hidden lg:flex items-center gap-8 text-[15px] font-medium text-slate-700">
            <Link href="#services" className="hover:text-[#0084FF] transition-colors">Services</Link>
            <Link href="#about" className="hover:text-[#0084FF] transition-colors">About Us</Link>
            <Link href="#gallery" className="hover:text-[#0084FF] transition-colors">Gallery</Link>
            <Link href="#contact" className="hover:text-[#0084FF] transition-colors">Contact</Link>
          </nav>

          <Link
            href="#contact"
            className="hidden md:inline-flex items-center gap-2 rounded-xl bg-[rgba(255,255,255,0.42)] px-4 py-2 text-[14px] font-medium text-slate-900 border border-[rgba(0,0,0,0.08)] [box-shadow:inset_0px_4px_4px_0px_rgba(255,255,255,0.25)] hover:bg-[rgba(255,255,255,0.58)] transition-colors"
          >
            Book Consultation
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white border border-black/10">
              <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </Link>
          </div>
        </div>
      </header>

      <main className="grow">
        {children}
      </main>

      <footer id="contact" className="bg-white border-t border-slate-100 pt-24 pb-12 px-8 mt-auto">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16 text-slate-500">
            <div className="lg:col-span-2 space-y-6">
              <Link href={basePath} className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#0084FF] border border-slate-200">
                  <Palette className="w-6 h-6" />
                </div>
                <h4 className={`${fustat.className} text-xl tracking-tight text-slate-900`}>{clinic.name || 'Design Studio'}</h4>
              </Link>
              <p className="text-slate-500 font-normal leading-relaxed max-w-sm text-[16px]">{clinic.description || 'Creating refined interiors with thoughtful planning, curated materials, and client-first project coordination.'}</p>
            </div>

            <div>
              <h5 className="text-slate-400 font-semibold mb-8 tracking-[0.15em] uppercase text-xs">Contact Info</h5>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <span className="text-[15px] font-normal leading-relaxed">{clinic.address?.full || 'Studio Location'}</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-[15px] font-normal">{clinic.contact?.phone || 'Phone Number'}</span>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="text-slate-400 font-semibold mb-8 tracking-[0.15em] uppercase text-xs">Quick Links</h5>
              <ul className="space-y-4 font-normal">
                <li><Link href="#services" className="hover:text-[#0084FF] transition-colors inline-block w-full text-[15px]">Services</Link></li>
                <li><Link href="#about" className="hover:text-[#0084FF] transition-colors inline-block w-full text-[15px]">About Us</Link></li>
                <li><Link href="#gallery" className="hover:text-[#0084FF] transition-colors inline-block w-full text-[15px]">Gallery</Link></li>
                <li><Link href="#contact" className="hover:text-[#0084FF] transition-colors inline-block w-full text-[15px]">Contact Us</Link></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6 text-sm font-normal text-slate-400">
            <p>&copy; {new Date().getFullYear()} {clinic.name || 'Studio'}. All rights reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-[#0084FF] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[#0084FF] transition-colors">Terms of Service</a>
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
