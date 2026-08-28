import { ReactNode } from 'react';
import Link from 'next/link';
import { readSourceConfig } from '@/lib/sourceData';
import { notFound } from 'next/navigation';
import ClientNavbar from './ClientNavbar';
import { MessageCircle } from 'lucide-react';
import InitialLoader from './InitialLoader';

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
      <InitialLoader companyName={data.clinic.clinicName || 'Murali Patharala Associates'} />
      {/* ── Sticky Nav ── */}
      <ClientNavbar
        clinicName="Murali Patharala Associates"
        phone={displayPhone}
        basePath=""
      />

      {/* ── Page Content ── */}
      <main className="flex-1 w-full bg-[#FAFAFA]">
        {children}
      </main>

      {/* ── FOOTER (Deejos-Inspired Authority Signboard) ── */}
      <footer id="contact-footer" className="bg-[#111111] text-white border-t-4 border-[#111111]">
        {/* Multi-Column Signboard Footer Grid */}
        <div className="p-8 md:p-16 pb-8">
          <div className="grid md:grid-cols-4 gap-12 border-b-2 border-[#262626] pb-12 mb-8">
            <div className="md:col-span-2">
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
                    Murali Patharala Associates
                  </span>
                </div>
              </div>
              <p className="text-sm md:text-base text-white/80 max-w-md mb-6 leading-relaxed font-medium">
                A premier residential construction and architectural firm founded in 1998. Providing one-stop turnkey solutions—architecture, civil engineering, 425+ QC checks, and bespoke modular interiors across Chennai.
              </p>

              <div className="mb-6">
                <span className="text-xs text-[#EA580C] font-bold uppercase tracking-wider block mb-1">
                  ABOUT COMPANY
                </span>
                <p className="text-xs text-white/70">
                  Rated <strong className="text-white">4.9 / 5.0</strong> based on 500+ completed residential projects in Chennai.
                </p>
              </div>

              <div className="bg-[#181818] border border-[#2A2A2A] inline-flex flex-col px-6 py-4">
                <span className="text-xs uppercase tracking-widest text-[#757575] mb-1 font-bold">Studio Direct Line</span>
                <a
                  href={`tel:${displayPhone}`}
                  className="text-xl font-bold uppercase tracking-widest text-[#EA580C] hover:text-white transition-colors"
                >
                  {displayPhone}
                </a>
              </div>
            </div>

            <div>
              <h5 className="text-xs font-bold uppercase tracking-widest text-[#EA580C] mb-6">QUICK LINKS</h5>
              <ul className="space-y-3">
                {[
                  { label: 'Home', href: '/' },
                  { label: 'About', href: '/about' },
                  { label: 'Services', href: '/services' },
                  { label: 'Our Projects', href: '/gallery' },
                  { label: 'Contact', href: '/contact' },
                ].map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-xs font-bold uppercase tracking-wider text-white/80 hover:text-[#EA580C] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h5 className="text-xs font-bold uppercase tracking-widest text-[#EA580C] mb-6">CONTACT INFO</h5>
              <p className="text-xs md:text-sm font-medium leading-relaxed text-white/80">
                W115A, 3rd Ave, Annanagar East,<br />
                Chennai, Tamil Nadu 600040
              </p>
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
                    title="Murali Patharala Associates Location"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center text-[11px] font-bold uppercase tracking-widest text-[#757575] gap-4">
            <p>© {new Date().getFullYear()} Murali Patharala Associates (MPA). All rights reserved.</p>
            <div className="flex gap-6">
              <span className="text-white/60">Home Construction &bull; Architecture &bull; Interiors</span>
              <span>•</span>
              <span className="text-[#EA580C]">Chennai, India</span>
            </div>
          </div>
        </div>
      </footer>

      {/* ── Floating WhatsApp Widget ── */}
      <a
        href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent('Hi Murali Patharala Associates (MPA), I would like to schedule a free architectural consultation.')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 hover:bg-[#1ebd5a] transition-all flex items-center justify-center"
        style={{ animation: 'bounce 2s infinite' }}
        aria-label="Chat with us on WhatsApp"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-8 h-8 fill-current">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.663-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </div>
  );
}
