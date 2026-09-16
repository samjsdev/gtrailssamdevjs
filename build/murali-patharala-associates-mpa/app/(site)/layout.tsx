import { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { readSourceConfig } from '@/lib/sourceData';
import { notFound } from 'next/navigation';
import ClientNavbar from './ClientNavbar';
import { MessageCircle } from 'lucide-react';
import InitialLoader from './InitialLoader';
import SiteMotion from './SiteMotion';
import { OFFICE_LOCATIONS } from '@/lib/offices';

interface LayoutProps {
  children: ReactNode;
  params?: any;
}

export default async function SiteLayout({ children, params }: LayoutProps) {
  const data = await readSourceConfig(undefined, 'template5');

  if (!data || !data.clinic) {
    notFound();
  }

  const phone = '09841098490';
  const displayPhone = '+91 98410 98490';
  const rawDigits = phone.replace(/\D/g, '');
  const cleanPhone = rawDigits.startsWith('91') ? rawDigits : `91${rawDigits.replace(/^0+/, '')}`;

  const address = 'W115A, 3rd Ave, Annanagar East, Chennai, Tamil Nadu 600040';
  const mapEmbedUrl = data.clinic.mapEmbedUrl || 'https://maps.google.com/maps?q=murali%20patharala%20%26%20associates%20(%20mpa)%20W115A%2C%203rd%20Ave%2C%20Annanagar%20East%2C%20Chennai%2C%20Tamil%20Nadu%20600040&output=embed';
  return (
    <div className="min-h-screen font-sans antialiased text-[#111111] selection:bg-[#EA580C] selection:text-white w-full bg-[#FAFAFA] flex flex-col">
      <InitialLoader companyName={data.clinic.clinicName || 'Murali Patharala & Associates'} />
      <SiteMotion />
      {/* ── Sticky Nav ── */}
      <ClientNavbar
        clinicName="Murali Patharala & Associates"
        phone={displayPhone}
        basePath=""
      />

      {/* ── Page Content ── */}
      <main className="flex-1 w-full bg-[#FAFAFA]">
        {children}
      </main>

      {/* ── FOOTER (Deejos-Inspired Authority Signboard) ── */}
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
                <div className="w-8 h-8 bg-[#EA580C] flex items-center justify-center shrink-0">
                  <div className="w-2.5 h-2.5 bg-[#111111]"></div>
                </div>
                <div className="flex flex-col">
                  <span
                    className="text-2xl sm:text-3xl font-bold tracking-tight uppercase text-[#EA580C]"
                    style={{ fontFamily: "'Lora', serif" }}
                  >
                    MPA
                  </span>
                  <span className="text-[10px] font-bold tracking-[0.2em] text-white/70 uppercase">
                    Murali Patharala & Associates
                  </span>
                </div>
              </div>
              <p className="text-sm text-white/80 max-w-sm mb-6 leading-relaxed font-medium">
                An architectural and interior design practice founded in 1998. For complete turnkey delivery, MPA&apos;s design expertise is paired with civil construction and quality control by ARCH Foundation.
              </p>

              <div className="mb-6">
                <span className="text-xs text-[#EA580C] font-bold uppercase tracking-wider block mb-1">
                  RATED 4.9 / 5.0
                </span>
                <p className="text-xs text-white/70">
                  500+ completed residential projects across Chennai, Coimbatore, Bangalore &amp; Pondicherry.
                </p>
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
                      className="text-xs font-semibold text-white/80 hover:text-[#EA580C] transition-colors flex items-center gap-1.5"
                    >
                      <span className="text-[#EA580C]/60 text-[10px]">&rarr;</span>
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
                  { label: 'Classic Construction Package', href: '/construction-package#packages' },
                  { label: 'Premium Construction Package', href: '/construction-package#packages' },
                  { label: 'Supreme Luxury Package', href: '/construction-package#packages' },
                  { label: 'Design Sequence & Feasibility', href: '/design-package#design-packages' },
                  { label: 'Book Consultation & BOQ', href: '/contact#enquiry' },
                ].map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-xs font-semibold text-white/80 hover:text-[#EA580C] transition-colors flex items-center gap-1.5"
                    >
                      <span className="text-[#EA580C]/60 text-[10px]">&rarr;</span>
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h5 className="text-xs font-bold uppercase tracking-widest text-[#EA580C] mb-5">OUR STUDIOS</h5>
              <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                {OFFICE_LOCATIONS.map((office) => (
                  <Link key={office.city} href={`/contact#offices`} className="group border-b border-white/10 pb-2">
                    <span className="block text-[9px] font-bold uppercase tracking-[0.18em] text-white/35">{office.code} / {office.state}</span>
                    <span className="mt-1 block text-xs font-bold text-white/85 transition-colors group-hover:text-[#EA580C]">{office.city}</span>
                  </Link>
                ))}
              </div>
              <div className="mt-4 space-y-2">
                <p className="text-[11px] text-[#757575] font-bold uppercase tracking-wider">
                  Mon – Sat: 9:30 AM – 7:30 PM
                </p>
                <p className="text-xs text-white/70">
                  hello@muralipatharala.com
                </p>
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
            <p>© {new Date().getFullYear()} Murali Patharala & Associates (MPA). All rights reserved.</p>
            <div className="flex flex-wrap justify-center md:justify-end gap-x-4 gap-y-2 text-center">
              <span className="text-white/60">Home Construction &bull; Architecture &bull; Interiors</span>
              <span className="hidden sm:inline">•</span>
              <span className="text-[#EA580C]">Chennai &bull; Coimbatore &bull; Bangalore &bull; Pondicherry</span>
            </div>
          </div>
        </div>
      </footer>

      {/* ── Floating WhatsApp Widget ── */}
      <a
        href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent('Hi Murali Patharala & Associates (MPA), I would like to schedule a free architectural consultation.')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-50 bg-[#25D366] text-white p-3.5 sm:p-4 rounded-full shadow-2xl hover:scale-110 hover:bg-[#1ebd5a] transition-all flex items-center justify-center"
        style={{ animation: 'bounce 2s infinite' }}
        aria-label="Chat with us on WhatsApp"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-7 h-7 sm:w-8 sm:h-8 fill-current">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.663-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </div>
  );
}
