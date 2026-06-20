import { readSourceConfig, getAllSlugs } from '@/lib/sourceData';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, Mail, MapPin, Phone, MessageCircle } from 'lucide-react';
import { cleanClinicDescription, cleanClinicName } from '@/lib/copyCleaner';
import ClientHeader from './ClientHeader';
import { materialBrands } from '@/lib/siteContent';

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

type LayoutProps = {
  children: React.ReactNode;
  params?: Promise<{ slug?: string }>;
};

export default async function SiteLayout({ children, params }: LayoutProps) {
  const resolvedParams = params ? await params : {};
  const data = await readSourceConfig(resolvedParams.slug, 'template1');
  if (!data) return notFound();

  const { clinic } = data;
  const cleanName = cleanClinicName(clinic.name);
  const cleanDesc = cleanClinicDescription(clinic.description, clinic.name);
  const basePath = '';
  const phone = clinic.contact?.phone || '';
  const email = clinic.contact?.email || '';
  const waPhone = phone.replace(/\D/g, '') || '919176600046';
  const waLink = `https://wa.me/${waPhone}?text=${encodeURIComponent(`Hi, I want to discuss a home project with ${cleanName}.`)}`;

  return (
    <div className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">
      <ClientHeader clinicName={cleanName} basePath={basePath} phone={phone} />
      <main>{children}</main>

      <footer id="contact" className="bg-[var(--ink)] text-[var(--white)] pt-24 md:pt-32 pb-10">
        <div className="site-grid">
          <div className="grid gap-16 lg:grid-cols-[1fr_0.8fr] mb-20 md:mb-32">
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="h-[2px] w-12 bg-[var(--oxide)]"></div>
                <span className="text-xs font-black uppercase tracking-[0.2em] text-[var(--oxide)]">Let's Build Together</span>
              </div>
              <h2 className="text-5xl sm:text-6xl md:text-[6rem] font-black uppercase leading-[0.85] tracking-[-0.05em] mb-8">
                Ready To Start<br />Your Project?
              </h2>
              <p className="max-w-md text-base md:text-lg font-medium leading-relaxed text-white/60">
                {cleanDesc || 'Architecture, civil construction, exterior elevations, Vastu planning, and turnkey interiors from one accountable Chennai team.'}
              </p>
              
              <div className="mt-12 flex flex-wrap gap-4">
                <Link href={`${basePath}/contact`} className="btn-solid bg-white text-[var(--ink)] hover:bg-[var(--safety)] hover:text-black hover:border-[var(--safety)] transition-colors">
                  Start Project Brief
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a href={waLink} target="_blank" rel="noreferrer" className="btn-dark-line flex items-center gap-3">
                  <MessageCircle className="h-5 w-5" />
                  Chat on WhatsApp
                </a>
              </div>
            </div>

            <div className="flex flex-col justify-end lg:pl-10">
              <div className="grid gap-10">
                <div>
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[var(--oxide)] mb-5">Contact Info</h3>
                  <div className="grid gap-5 text-sm md:text-base font-bold text-white/80">
                    <a href={`tel:${phone}`} className="flex items-center gap-4 hover:text-[var(--safety)] transition-colors">
                      <Phone className="h-5 w-5 text-white/30" />
                      {phone || '09176600046'}
                    </a>
                    <a href={`mailto:${email}`} className="flex items-center gap-4 hover:text-[var(--safety)] transition-colors break-all">
                      <Mail className="h-5 w-5 text-white/30" />
                      {email || 'dreamsminedesigners@gmail.com'}
                    </a>
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[var(--oxide)] mb-5">Studio Location</h3>
                  <div className="flex items-start gap-4 text-sm md:text-base font-bold text-white/80 leading-relaxed">
                    <MapPin className="mt-1 h-5 w-5 shrink-0 text-white/30" />
                    <p className="max-w-xs">{clinic.address?.full || 'Chennai, Tamil Nadu'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-xs font-bold uppercase tracking-[0.15em] text-white/40">
            <p>&copy; {new Date().getFullYear()} {cleanName}. All Rights Reserved.</p>
            <nav className="flex flex-wrap justify-center gap-6">
              <Link href={basePath || '/'} className="hover:text-[var(--safety)] transition-colors">Home</Link>
              <Link href={`${basePath}/services`} className="hover:text-[var(--safety)] transition-colors">Services</Link>
              <Link href={`${basePath}/about`} className="hover:text-[var(--safety)] transition-colors">Studio</Link>
              <Link href={`${basePath}/gallery`} className="hover:text-[var(--safety)] transition-colors">Works</Link>
              <Link href={`${basePath}/contact`} className="hover:text-[var(--safety)] transition-colors">Contact</Link>
            </nav>
          </div>
        </div>
      </footer>

      <a
        href={waLink}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition-transform hover:scale-110"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="h-7 w-7" />
      </a>
    </div>
  );
}
