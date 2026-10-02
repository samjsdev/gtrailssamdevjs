import { CONTACT_LINKS } from '@/lib/contactLinks';
import { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { readSourceConfig } from '@/lib/sourceData';
import { notFound } from 'next/navigation';
import ClientNavbar from './ClientNavbar';
import SiteMotion from './SiteMotion';
import { OFFICE_LOCATIONS } from '@/lib/offices';
import BrandMark from '@/components/BrandMark';
import { STUDIO } from '@/lib/clientProfile';
import SocialLinks, { FacebookIcon, InstagramIcon } from '@/components/SocialLinks';

interface LayoutProps {
  children: ReactNode;
  params?: any;
}

export default async function SiteLayout({ children, params }: LayoutProps) {
  const data = await readSourceConfig(undefined, 'template5');

  if (!data || !data.clinic) {
    notFound();
  }

  const displayPhone = '+91 98410 98490';

  const mapEmbedUrl = OFFICE_LOCATIONS[0].mapEmbedUrl;
  return (
    <div className="min-h-screen font-sans antialiased text-[#111111] selection:bg-[#EA580C] selection:text-white w-full bg-surface-cream flex flex-col">
      <SiteMotion />
      {/* ── Sticky Nav ── */}
      <ClientNavbar
        clinicName="Murali Patharala & Associates"
        phone={displayPhone}
        basePath=""
      />

      {/* ── Page Content ── */}
      <main className="flex-1 w-full bg-surface-cream">
        {children}
      </main>

      {/* ── FOOTER (Practice contact information) ── */}
      <footer id="contact-footer" className="relative bg-[#121418] text-white border-t border-white/10 overflow-hidden">
        {/* Atmospheric Architectural Twilight Residence Background */}
        <Image
          src="/images/architecture/hero-villa-twilight.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-55 pointer-events-none select-none"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e11]/90 via-[#121418]/75 to-[#121418]/50 pointer-events-none" />
        {/* Multi-Column Signboard Footer Grid */}
        <div className="relative z-10 p-6 md:p-16 pb-24 md:pb-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 border-b-2 border-[#262626] pb-12 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <BrandMark size={44} className="shrink-0" />
                <div className="flex flex-col">
                  <span className="brand-name text-lg lowercase leading-none tracking-tight text-white">murali patharala</span>
                  <span className="brand-name mt-1 text-[11px] lowercase tracking-[0.11em] text-[#FB923C]">&amp; associates</span>
                </div>
              </div>
              <p className="text-sm text-white/80 max-w-sm mb-6 leading-relaxed font-medium">
                An architectural and interior design practice founded in 1998. For complete turnkey delivery, MPA&apos;s design expertise is paired with civil construction and quality control by <Link href="/construction-package" className="hover:text-[#FB923C] underline underline-offset-2 transition-colors"><span className="brand-name">ARCH foundations</span></Link>.
              </p>

              <div className="mb-6">
                <span className="block text-xs font-bold uppercase tracking-wider text-[#FB923C]">Residential · Commercial · Institutional</span>
                <p className="mt-2 text-xs leading-relaxed text-white/70">Architecture and interiors by MPA. Construction and property development by <Link href="/construction-package" className="hover:text-[#FB923C] underline underline-offset-2 transition-colors"><span className="brand-name">ARCH foundations</span></Link>.</p>
              </div>

              <div className="bg-[#181818] border border-[#2A2A2A] inline-flex flex-col px-5 py-3.5">
                <span className="text-[10px] uppercase tracking-widest text-[#757575] mb-0.5 font-bold">Studio Direct Line</span>
                <a
                  href={`tel:${displayPhone}`}
                  className="text-lg font-bold uppercase tracking-widest text-[#EA580C] hover:text-white transition-colors"
                >
                  {displayPhone}
                </a>
              </div>
            </div>

            <div>
              <h5 className="text-xs font-bold uppercase tracking-widest text-[#EA580C] mb-5">SERVICES &amp; CAPABILITIES</h5>
              <ul className="space-y-2.5">
                {[
                  { label: 'All Services Overview', href: '/services' },
                  { label: 'Architectural Design', href: '/services/architectural-design' },
                  { label: 'Residential Construction', href: '/services/residential-construction' },
                  { label: 'Interior Design & Joinery', href: '/services/interior-design' },
                  { label: 'Turnkey Construction', href: '/services/turnkey-construction' },
                  { label: 'Selected Projects Portfolio', href: '/gallery' },
                  { label: 'About Practice & Team', href: '/about' },
                ].map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-xs font-semibold text-white/80 hover:text-[#EA580C] transition-colors"
                    >
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h5 className="text-xs font-bold uppercase tracking-widest text-[#EA580C] mb-5">PACKAGES &amp; PRICING</h5>
              <ul className="space-y-2.5">
                {[
                  { label: 'Design Packages (MPA)', href: '/design-package' },
                  { label: 'Construction Packages (ARCH)', href: '/construction-package' },
                  { label: 'Book Consultation & BOQ', href: '/contact#enquiry' },
                ].map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-xs font-semibold text-white/80 hover:text-[#EA580C] transition-colors"
                    >
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h5 className="text-xs font-bold uppercase tracking-widest text-[#EA580C] mb-5">PROJECT LOCATIONS</h5>
              <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                {OFFICE_LOCATIONS.map((office) => (
                  <Link key={office.city} href={`/contact#offices`} className="group border-b border-white/10 pb-2">
                    <span className="block text-[9px] font-bold uppercase tracking-[0.18em] text-white/35">{office.code} / {office.state}</span>
                    <span className="mt-1 block text-xs font-bold text-white/85 transition-colors group-hover:text-[#EA580C]">{office.city}</span>
                  </Link>
                ))}
              </div>
              <div className="mt-4 space-y-2">
                <p className="text-xs leading-relaxed text-white/70">{STUDIO.address}</p>
                <a href={STUDIO.alternatePhoneHref} className="inline-block text-sm font-semibold text-[#FB923C] hover:text-white">{STUDIO.alternatePhone}</a>
                <div className="pt-3">
                  <SocialLinks dark />
                </div>
                <div className="mt-5 border-2 border-[#262626] overflow-hidden bg-[#111111]">
                  <iframe 
                    src={mapEmbedUrl}
                    width="100%" 
                    height="140" 
                    style={{ border: 0 }} 
                    allowFullScreen={false} 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    className="grayscale-[0.4] contrast-[1.1] hover:grayscale-0 transition-all duration-500"
                    title="Murali Patharala & Associates Location"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left text-[11px] font-bold uppercase tracking-widest text-[#757575] gap-4">
            <p>© {new Date().getFullYear()} <span className="brand-name">Murali Patharala & Associates</span> (MPA). All rights reserved.</p>
            <div className="flex flex-wrap justify-center md:justify-end gap-x-4 gap-y-2 text-center">
              <span className="text-white/60">Architecture &bull; Interiors &bull; Construction</span>
              <span className="hidden sm:inline">•</span>
              <span className="text-[#EA580C]">Anna Nagar East &bull; Chennai</span>
            </div>
          </div>
          <nav aria-label="Legal information" className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 border-t border-white/10 pt-5 text-[11px] font-semibold text-white/65 md:justify-start">
            <Link href="/privacy" className="transition-colors hover:text-[#FB923C] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FB923C]">Privacy Policy</Link>
            <Link href="/terms" className="transition-colors hover:text-[#FB923C] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FB923C]">Terms of Use</Link>
          </nav>
        </div>
      </footer>

      {/* ── Floating Social Widgets ── */}
      <nav
        aria-label="Quick social links"
        className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-4 z-50 flex flex-col gap-2.5 sm:bottom-6 sm:right-6"
      >
        <a
          href={CONTACT_LINKS.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="flex size-12 items-center justify-center rounded-full bg-[#E1306C] text-white shadow-xl transition-all hover:scale-110 hover:bg-[#C13584] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E1306C] sm:size-14"
          aria-label="Follow MPA on Instagram"
          title="Instagram"
        >
          <InstagramIcon className="size-6 sm:size-7" />
        </a>
        <a
          href={CONTACT_LINKS.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="flex size-12 items-center justify-center rounded-full bg-[#1877F2] text-white shadow-xl transition-all hover:scale-110 hover:bg-[#166FE5] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1877F2] sm:size-14"
          aria-label="Follow MPA on Facebook"
          title="Facebook"
        >
          <FacebookIcon className="size-6 sm:size-7" />
        </a>
        <a
          href={`${CONTACT_LINKS.whatsapp}?text=${encodeURIComponent('Hi Murali Patharala & Associates (MPA), I would like to schedule an architectural consultation.')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex size-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition-all hover:scale-110 hover:bg-[#1ebd5a] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#25D366] sm:size-14"
          aria-label="Chat with us on WhatsApp"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="size-6 sm:size-7 fill-current" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.663-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </a>
      </nav>
    </div>
  );
}
