import { readSourceConfig, getAllSlugs } from '@/lib/dataBuilder';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ReactNode } from 'react';
import { MapPin, Star, Phone } from 'lucide-react';
import {
  cleanClinicName,
  cleanArchitectureDescription,
  cleanArchitectureServices,
} from '@/lib/copyCleaner';
import { Cormorant_Garamond, Outfit } from 'next/font/google';
import ClientHeader from './ClientHeader';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
});
const outfit = Outfit({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'], variable: '--font-outfit' });

// Pre-render from local JSON at build time for fast template previews on Vercel.
export const dynamic = 'force-static';

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

type LayoutProps = {
  children: ReactNode;
  params: Promise<{ slug: string }>;
};

export default async function Template14Layout({ children, params }: LayoutProps) {
  const { slug } = await params;

  const data = await readSourceConfig(slug, 'template14');
  if (!data) return notFound();

  const { clinic, business } = data;
  const basePath = `/designwebsite/template14/${slug}`;

  const cleanName = cleanClinicName(clinic.name);
  const city = clinic.address?.city || 'Chennai';
  const cleanDesc = cleanArchitectureDescription(clinic.description, clinic.name, city);
  const phone = clinic.contact?.phone || '';
  const address = clinic.address?.full || '';
  const rating = business.rating || '4.9';

  const words = (cleanName || 'Architectural Atelier').split(' ');
  const first = words.slice(0, -1).join(' ') || words[0];
  const last = words.length > 1 ? words[words.length - 1] : '';

  const servicesList: string[] = cleanArchitectureServices(business.services);

  const waPhone = phone.replace(/\D/g, '') || '919751396117';
  const waText = `Hello ${cleanName || 'there'}, I'd like to book an architectural consultation.`;
  const waLink = `https://wa.me/${waPhone}?text=${encodeURIComponent(waText)}`;

  return (
    <div
      className={`${outfit.className} ${outfit.variable} ${cormorant.variable} min-h-screen flex flex-col bg-[#f5f1e8] text-[#221c14] font-light leading-[1.65] selection:bg-[#b08d4f] selection:text-white scroll-smooth antialiased`}
    >
      <style>{`@keyframes t4zoom { from { transform: scale(1); } to { transform: scale(1.1); } }`}</style>
      {/* Topbar */}
      <div className="bg-[#17130f] text-white/75 text-[12.5px] py-2.5 tracking-[0.06em]">
        <div className="max-w-[1240px] mx-auto px-[30px] flex justify-between items-center gap-4.5">
          <span className="flex items-center gap-2 min-w-0">
            <MapPin className="w-[13px] h-[13px] text-[#b08d4f] shrink-0" strokeWidth={2} />
            <span className="truncate" title={address || city}>
              Studio in {clinic.address?.locality || city} — <b className="text-[#d9c49a] font-medium">By Appointment</b>
            </span>
          </span>
          <span className="hidden md:flex items-center gap-2 shrink-0">
            <Star className="w-[13px] h-[13px] text-[#b08d4f]" strokeWidth={2} />
            Rated {rating} by estate owners in {city}
          </span>
          {phone && (
            <a href={`tel:${phone}`} className="flex items-center gap-2 shrink-0 hover:text-[#d9c49a] transition-colors">
              <Phone className="w-[13px] h-[13px] text-[#b08d4f]" strokeWidth={2} />
              {phone}
            </a>
          )}
        </div>
      </div>

      {/* Header */}
      <ClientHeader studioName={cleanName} basePath={basePath} city={city} />

      <main className="grow">{children}</main>

      {/* Footer */}
      <footer className="bg-[#17130f] text-white pt-[76px]">
        <div className="max-w-[1240px] mx-auto px-[30px]">
          <div className="grid sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.3fr] gap-12 pb-14">
            <div>
              <Link href={basePath} className="flex flex-col leading-[1.05]">
                <b className="font-[family-name:var(--font-cormorant)] text-[28px] font-semibold tracking-[0.06em] text-white">
                  {first} {last && <span className="text-[#d9c49a] italic">{last}</span>}
                </b>
                <small className="text-[9.5px] tracking-[0.48em] uppercase text-white/50">Curated Architecture &amp; Civil</small>
              </Link>
              <p className="text-[14px] text-white/60 leading-[2.1] max-w-[300px] mt-4">
                {cleanDesc || `A boutique architectural atelier in ${city}. Sculpted landmarks, passive solar planning, and generational permanence.`}
              </p>
            </div>

            <div>
              <h4 className="text-[11px] font-semibold tracking-[0.26em] uppercase text-[#b08d4f] mb-5">The Atelier</h4>
              <ul className="grid">
                <li><Link href={`${basePath}/about`} className="text-[14px] text-white/60 leading-[2.1] hover:text-[#d9c49a] transition-colors">Philosophy</Link></li>
                <li><Link href={`${basePath}/services`} className="text-[14px] text-white/60 leading-[2.1] hover:text-[#d9c49a] transition-colors">Disciplines</Link></li>
                <li><Link href={`${basePath}/gallery`} className="text-[14px] text-white/60 leading-[2.1] hover:text-[#d9c49a] transition-colors">Architecture</Link></li>
                <li><Link href={`${basePath}/contact`} className="text-[14px] text-white/60 leading-[2.1] hover:text-[#d9c49a] transition-colors">Atelier Visit</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-[11px] font-semibold tracking-[0.26em] uppercase text-[#b08d4f] mb-5">Disciplines</h4>
              <ul className="grid">
                {(servicesList.length ? servicesList.slice(0, 5) : ['Turnkey Villas', '3D BIM Schematics', 'Structural RCC Engineering', 'Bylaw Sanction Dossiers']).map((svc) => (
                  <li key={svc}>
                    <Link href={`${basePath}/services`} className="text-[14px] text-white/60 leading-[2.1] hover:text-[#d9c49a] transition-colors">
                      {svc}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[11px] font-semibold tracking-[0.26em] uppercase text-[#b08d4f] mb-5">Visit</h4>
              <p className="text-[14px] text-white/60 leading-[2.1]">
                {address || `${city}, Tamil Nadu`}
                <br />
                Open Mon–Sat, 10 AM – 7 PM
              </p>
              {phone && (
                <a href={`tel:${phone}`} className="block text-[14px] text-white/60 leading-[2.1] hover:text-[#d9c49a] transition-colors">
                  {phone}
                </a>
              )}
            </div>
          </div>

          <div className="border-t border-white/10 py-[22px] flex flex-wrap justify-between gap-3.5 text-[12px] text-white/40">
            <span>© {new Date().getFullYear()} {cleanName || 'Studio'}. All rights reserved.</span>
            <span>Bespoke architecture, crafted in {city}</span>
          </div>
        </div>
      </footer>

      {/* WhatsApp float */}
      <a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed right-6 bottom-6 z-[300] w-14 h-14 rounded-full bg-[#25d366] grid place-items-center shadow-[0_12px_30px_rgba(37,211,102,0.4)] hover:scale-110 transition-transform duration-250"
      >
        <svg viewBox="0 0 32 32" className="w-7 h-7 fill-white">
          <path d="M16 3C9.4 3 4 8.4 4 15c0 2.4.7 4.6 2 6.5L4 29l7.7-1.9c1.8 1 3.9 1.5 6 1.5h.3c6.6 0 12-5.4 12-12S22.6 3 16 3zm6.1 16.9c-.3.8-1.6 1.5-2.3 1.6-.6.1-1.4.2-4.4-.9-3.7-1.5-6.1-5.3-6.3-5.5-.2-.2-1.5-2-1.5-3.9s.9-2.7 1.3-3.1c.3-.4.7-.5 1-.5h.7c.2 0 .5-.1.8.6.3.8 1.1 2.7 1.2 2.9.1.2.2.4 0 .7-.1.3-.2.4-.4.7l-.6.7c-.2.2-.4.4-.2.8.2.4 1 1.6 2.1 2.6 1.4 1.3 2.6 1.7 3 1.8.4.2.6.1.8-.1.2-.2 1-1.1 1.2-1.5.3-.4.5-.3.9-.2.4.1 2.1 1 2.5 1.2.4.2.6.3.7.5.1.1.1.9-.2 1.7z" />
        </svg>
      </a>
    </div>
  );
}
