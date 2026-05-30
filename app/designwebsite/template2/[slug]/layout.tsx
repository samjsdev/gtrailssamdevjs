import { readSourceConfig, getAllSlugs } from '@/lib/dataBuilder';
import { notFound } from 'next/navigation';
import { 
  Phone, Palette, ArrowUpRight, Hammer
} from 'lucide-react';
import Link from 'next/link';
import { ReactNode } from 'react';
import { Cormorant_Garamond, Plus_Jakarta_Sans } from 'next/font/google';

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

  const data = await readSourceConfig(slug);
  if (!data) return notFound();

  const { clinic } = data;
  const basePath = `/designwebsite/template2/${slug}`;

  return (
    <div className={`${plusJakarta.className} min-h-screen bg-[#FDFBF9] text-[#2A221E] selection:bg-[#B48A66] selection:text-white scroll-smooth flex flex-col`} style={{ WebkitFontSmoothing: 'antialiased' }}>
      {/* Top Info Bar */}
      <div className="bg-[#1C1C1E] text-[#FAF6F0] py-3 px-8 text-[12px] border-b border-[#FAF6F0]/5 relative z-50 font-light tracking-wider">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0">
          <div className="flex flex-wrap items-center justify-center gap-6">
            <span className="flex items-center gap-2 text-[#FAF6F0]/80">
               {clinic.address?.full || 'Studio Location'}
            </span>
            <span className="hidden md:flex items-center gap-2 text-[#FAF6F0]/50">
               Mon-Sat, 9AM to 6PM
            </span>
          </div>
          <div className="flex items-center gap-4 font-medium tracking-wide">
             <a href={`tel:${clinic.contact?.phone || ''}`} className="flex items-center gap-2 hover:text-[#B48A66] transition-colors text-[#B48A66]">
               <Phone className="w-3.5 h-3.5 text-[#B48A66]" /> {clinic.contact?.phone || 'Contact Number'}
             </a>
          </div>
        </div>
      </div>

      {/* Navbar (Matches Woodworking Dark Theme) */}
      <header className="sticky top-0 z-40 bg-[#282828] border-b border-white/5 transition-all duration-300 shadow-md">
        <div className="max-w-7xl mx-auto px-8 h-24 flex justify-between items-center">
          <Link href={basePath} className="flex items-center gap-4 leading-none group">
            <div className="w-11 h-11 bg-white/5 rounded-xl flex items-center justify-center text-[#B48A66] border border-white/10 group-hover:bg-[#B48A66] group-hover:text-white transition-all duration-300">
              <Hammer className="w-5 h-5" />
            </div>
            <h1 className={`${cormorant.className} text-2xl font-bold tracking-tight text-white`}>
              {clinic.name || 'Craftsmanship'}
            </h1>
          </Link>
          
          <nav className="hidden lg:flex items-center gap-10 font-semibold text-xs text-white/80 uppercase tracking-widest">
            <Link href="#services" className="hover:text-[#B48A66] transition-colors relative py-1">Services</Link>
            <Link href="#about" className="hover:text-[#B48A66] transition-colors relative py-1">About Us</Link>
            <Link href="#gallery" className="hover:text-[#B48A66] transition-colors relative py-1">Gallery</Link>
            <Link href="#contact" className="hover:text-[#B48A66] transition-colors relative py-1">Contact</Link>
          </nav>
 
          <Link href="#contact" className="hidden md:flex items-center gap-2 bg-[#B48A66] text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-[#9E7551] transition-all text-sm tracking-wide shadow-sm hover:scale-[1.02] active:scale-[0.98]">
             Get A Quote <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </header>
 
      {/* Main Content */}
      <main className="grow">
        {children}
      </main>
 
      {/* Footer */}
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

      <footer id="contact" className="bg-[#FAF6F0] border-t border-[#B48A66]/15 pt-24 pb-12 px-8 mt-auto">
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

          {/* Footer Navigation Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16 text-[#2A221E]/70">
            <div className="lg:col-span-2 space-y-6">
              <Link href={basePath} className="flex items-center gap-4">
                <div className="w-11 h-11 bg-white border border-[#B48A66]/20 rounded-xl flex items-center justify-center text-[#B48A66]">
                  <Hammer className="w-5 h-5" />
                </div>
                <h4 className={`${cormorant.className} text-2xl font-bold tracking-tight text-[#2A221E]`}>{clinic.name || 'Craftsmanship'}</h4>
              </Link>
              <p className="text-[#2A221E]/80 font-light leading-relaxed max-w-sm text-[15px]">{clinic.description || 'Delivering high-end custom carpentry, bespoke furniture, and precision woodworking tailored to your unique requirements.'}</p>
            </div>
 
            <div>
              <h5 className="text-[#2A221E]/40 font-semibold mb-8 tracking-[0.15em] uppercase text-xs">Contact Info</h5>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <span className="text-[15px] font-light leading-relaxed">{clinic.address?.full || 'Studio Location'}</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-[15px] font-light">{clinic.contact?.phone || 'Phone Number'}</span>
                </li>
              </ul>
            </div>
 
            <div>
              <h5 className="text-[#2A221E]/40 font-semibold mb-8 tracking-[0.15em] uppercase text-xs">Quick Links</h5>
              <ul className="space-y-4 font-light">
                <li><Link href="#services" className="hover:text-[#B48A66] transition-colors inline-block w-full text-[15px]">Services</Link></li>
                <li><Link href="#about" className="hover:text-[#B48A66] transition-colors inline-block w-full text-[15px]">About Us</Link></li>
                <li><Link href="#gallery" className="hover:text-[#B48A66] transition-colors inline-block w-full text-[15px]">Gallery</Link></li>
                <li><Link href="#contact" className="hover:text-[#B48A66] transition-colors inline-block w-full text-[15px]">Contact Us</Link></li>
              </ul>
            </div>
          </div>
 
          {/* Subfooter */}
          <div className="pt-8 border-t border-[#B48A66]/15 flex flex-col md:flex-row justify-between items-center gap-6 text-sm font-light text-[#2A221E]/40">
            <p>&copy; {new Date().getFullYear()} {clinic.name || 'Craftsmanship'}. All rights reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-[#B48A66] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[#B48A66] transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
      {/* WhatsApp Floating Bubble */}
      {(() => {
        const waPhone = clinic.contact?.phone?.replace(/\D/g, '') || '919751396117';
        const waText = `Hi, I'm interested in booking a consultation at ${clinic.name || 'your studio'}!`;
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
