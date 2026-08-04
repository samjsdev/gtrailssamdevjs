import { readSourceConfig, getAllSlugs } from '@/lib/dataBuilder';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ReactNode } from 'react';
import { Star, MapPin, Phone } from 'lucide-react';
import { cleanClinicName, cleanClinicDescription } from '@/lib/copyCleaner';
import { Manrope, Newsreader } from 'next/font/google';
import ClientHeader from './ClientHeader';

const manrope = Manrope({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'], variable: '--font-manrope' });
const newsreader = Newsreader({
  subsets: ['latin'],
  weight: ['400', '500'],
  style: ['italic'],
  variable: '--font-newsreader',
});

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

type LayoutProps = {
  children: ReactNode;
  params: Promise<{ slug: string }>;
};

export default async function Template3Layout({ children, params }: LayoutProps) {
  const { slug } = await params;

  const data = await readSourceConfig(slug, 'template3');
  if (!data) return notFound();

  const { clinic, business } = data;
  const basePath = `/designwebsite/template3/${slug}`;

  const cleanName = cleanClinicName(clinic.name);
  const cleanDesc = cleanClinicDescription(clinic.description, clinic.name);
  const phone = clinic.contact?.phone || '';
  const address = clinic.address?.full || '';
  const city = clinic.address?.city || 'Chennai';
  const rating = business.rating || '4.9';
  const servicesList: string[] = business.services?.length ? business.services : [];
  const initial = (cleanName || 'S').charAt(0).toUpperCase();
  const words = (cleanName || 'Design Studio').split(' ');

  const waPhone = phone.replace(/\D/g, '') || '919751396117';
  const waText = `Hi, I'm interested in a free design session with ${cleanName || 'your studio'}!`;
  const waLink = `https://wa.me/${waPhone}?text=${encodeURIComponent(waText)}`;

  return (
    <div className={`${manrope.className} ${manrope.variable} ${newsreader.variable} min-h-screen flex flex-col bg-[#fbf7f2] text-[#241f1a] leading-[1.6] selection:bg-[#f4b942] selection:text-[#241f1a] scroll-smooth antialiased`}>
      {/* Topbar */}
      <div className="bg-[#1d1713] text-white/90 text-[13px] py-2.5 px-7">
        <div className="max-w-[1220px] mx-auto flex justify-between items-center gap-4.5 font-semibold">
          <span className="flex items-center gap-2 min-w-0">
            <Star className="w-[13px] h-[13px] text-[#d8442c] shrink-0" fill="currentColor" />
            <span className="truncate">
              {city}&rsquo;s trusted interiors studio — <b className="text-[#f4b942]">{rating}★ on Google</b>
            </span>
          </span>
          {address && (
            <span className="hidden lg:flex items-center gap-2 min-w-0">
              <MapPin className="w-[13px] h-[13px] text-[#d8442c] shrink-0" />
              <span className="truncate">{address}</span>
            </span>
          )}
          {phone && (
            <a href={`tel:${phone}`} className="flex items-center gap-2 shrink-0 hover:text-[#f4b942] transition-colors">
              <Phone className="w-[13px] h-[13px] text-[#d8442c]" />
              {phone}
            </a>
          )}
        </div>
      </div>

      {/* Header */}
      <ClientHeader clinicName={cleanName} basePath={basePath} />

      <main className="grow">{children}</main>

      {/* Footer */}
      <footer className="bg-[#1d1713] text-white px-7 pt-16">
        <div className="max-w-[1220px] mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.3fr] gap-10 pb-12">
            <div>
              <Link href={basePath} className="flex items-center gap-2.5 text-[23px] font-extrabold tracking-[-0.02em] text-white">
                <span className="w-[34px] h-[34px] rounded-[11px] bg-[#d8442c] text-white grid place-items-center text-[16px]">
                  {initial}
                </span>
                <span>
                  {words[0]}
                  {words.length > 1 && <span className="text-[#f4b942]"> {words.slice(1).join(' ')}</span>}
                </span>
              </Link>
              <p className="text-[13.5px] text-white/70 leading-[2.05] max-w-[280px] mt-3.5">
                {cleanDesc || `${city}'s trusted interiors studio. Your home, on time, on budget.`}
              </p>
            </div>

            <div>
              <h4 className="text-[11.5px] font-extrabold tracking-[0.2em] uppercase text-[#f4b942] mb-4.5">Offerings</h4>
              {(servicesList.length ? servicesList.slice(0, 5) : ['Full Home Interiors', 'Modular Kitchens', 'Renovations']).map((svc) => (
                <Link key={svc} href={`${basePath}/services`} className="block text-[13.5px] text-white/70 leading-[2.05] hover:text-white transition-colors">
                  {svc}
                </Link>
              ))}
            </div>

            <div>
              <h4 className="text-[11.5px] font-extrabold tracking-[0.2em] uppercase text-[#f4b942] mb-4.5">Explore</h4>
              <Link href={`${basePath}/gallery`} className="block text-[13.5px] text-white/70 leading-[2.05] hover:text-white transition-colors">Projects</Link>
              <Link href={`${basePath}/services`} className="block text-[13.5px] text-white/70 leading-[2.05] hover:text-white transition-colors">Services</Link>
              <Link href={`${basePath}/about`} className="block text-[13.5px] text-white/70 leading-[2.05] hover:text-white transition-colors">About Us</Link>
              <Link href={`${basePath}/contact`} className="block text-[13.5px] text-white/70 leading-[2.05] hover:text-white transition-colors">Free Design Session</Link>
            </div>

            <div>
              <h4 className="text-[11.5px] font-extrabold tracking-[0.2em] uppercase text-[#f4b942] mb-4.5">Visit / Call</h4>
              <p className="text-[13.5px] text-white/70 leading-[2.05]">{address || `${city}, Tamil Nadu`}</p>
              {phone && (
                <a href={`tel:${phone}`} className="block text-[13.5px] text-white/70 leading-[2.05] hover:text-white transition-colors">
                  {phone}
                </a>
              )}
              <p className="text-[13.5px] text-white/70 leading-[2.05]">Open 10am – 7pm, Mon–Sat</p>
            </div>
          </div>

          <div className="border-t border-white/10 py-5 flex flex-wrap justify-between gap-3.5 text-[12px] text-white/45">
            <span>© {new Date().getFullYear()} {cleanName || 'Studio'}. All rights reserved.</span>
            <span>Homes delivered across {city}</span>
          </div>
        </div>
      </footer>

      {/* WhatsApp float */}
      <a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-[300] w-14 h-14 rounded-full bg-[#25d366] grid place-items-center shadow-[0_12px_30px_rgba(37,211,102,0.4)] hover:scale-110 transition-transform duration-250"
      >
        <svg viewBox="0 0 32 32" className="w-7 h-7 fill-white">
          <path d="M16 3C9.4 3 4 8.4 4 15c0 2.4.7 4.6 2 6.5L4 29l7.7-1.9c1.8 1 3.9 1.5 6 1.5h.3c6.6 0 12-5.4 12-12S22.6 3 16 3zm6.1 16.9c-.3.8-1.6 1.5-2.3 1.6-.6.1-1.4.2-4.4-.9-3.7-1.5-6.1-5.3-6.3-5.5-.2-.2-1.5-2-1.5-3.9s.9-2.7 1.3-3.1c.3-.4.7-.5 1-.5h.7c.2 0 .5-.1.8.6.3.8 1.1 2.7 1.2 2.9.1.2.2.4 0 .7-.1.3-.2.4-.4.7l-.6.7c-.2.2-.4.4-.2.8.2.4 1 1.6 2.1 2.6 1.4 1.3 2.6 1.7 3 1.8.4.2.6.1.8-.1.2-.2 1-1.1 1.2-1.5.3-.4.5-.3.9-.2.4.1 2.1 1 2.5 1.2.4.2.6.3.7.5.1.1.1.9-.2 1.7z" />
        </svg>
      </a>
    </div>
  );
}
