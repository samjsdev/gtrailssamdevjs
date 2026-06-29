import { readSourceConfig, getAllSlugs } from '@/lib/dataBuilder';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';
import { cleanClinicName } from '@/lib/copyCleaner';
import { Jost } from 'next/font/google';
import ClientHeader from './ClientHeader';
import ClientLoader from './ClientLoader';
import GsapInit from './GsapInit';
import { TemplateProvider } from './context/TemplateContext';

const jost = Jost({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jost',
  weight: ['300', '400', '500', '600', '700', '800'],
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

  const data = await readSourceConfig(slug, 'template8');
  if (!data) return notFound();

  const { clinic } = data;
  const basePath = `/designwebsite/template8/${slug}`;
  const cleanName = cleanClinicName(clinic.name);

  return (
    <div className={`${jost.variable} font-sans bg-[#f8f9fa] text-[#1A1D27] min-h-screen scroll-smooth`}>
      <TemplateProvider data={data} basePath={basePath}>
        <GsapInit />
        <ClientLoader brandName={cleanName || 'DESIGN'} />
        <ClientHeader clinic={clinic} cleanName={cleanName} basePath={basePath} />
        <main className="flex-1 w-full relative">
          {children}
        </main>
        
      {/* Proper Footer */}
      <footer className="bg-[#2b347b] text-white pt-20 pb-10 mt-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          {/* Full-width Map Embed */}
          <div className="w-full h-72 md:h-96 rounded-3xl overflow-hidden bg-white/5 border border-white/10 mb-16 shadow-lg">
            <iframe
              title="Google Maps Location"
              src={`https://www.google.com/maps?q=${encodeURIComponent(clinic?.address?.full || clinic?.contact?.address || data?.home?.footer?.text?.[6] || 'New York, NY')}&output=embed`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            
            {/* Brand & About */}
            <div>
              <h3 className="text-2xl font-bold mb-6">{cleanName || 'Your Company'}</h3>
              <p className="text-white/70 text-sm leading-relaxed mb-6">
                Elevating spaces with thoughtful interior design and bespoke solutions. We bring your vision to life through creativity and expert craftsmanship.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
              <ul className="space-y-4 text-white/70 text-sm">
                <li><a href={basePath} className="hover:text-white transition">Home</a></li>
                <li><a href={`${basePath}/about`} className="hover:text-white transition">About Us</a></li>
                <li><a href={`${basePath}/services`} className="hover:text-white transition">Services</a></li>
                <li><a href={`${basePath}/gallery`} className="hover:text-white transition">Gallery</a></li>
                <li><a href={`${basePath}/contact`} className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Contact Us</h4>
              <ul className="space-y-4 text-white/70 text-sm">
                <li className="flex items-start gap-3">
                  <span className="mt-1">📍</span>
                  <span>{clinic?.contact?.address || '123 Design Boulevard, Creative District, NY 10001'}</span>
                </li>
                <li className="flex items-center gap-3">
                  <span>📞</span>
                  <span>{clinic?.contact?.phone || '+1 (555) 123-4567'}</span>
                </li>
                <li className="flex items-center gap-3">
                  <span>✉️</span>
                  <span>{clinic?.contact?.email || 'hello@yourcompany.com'}</span>
                </li>
              </ul>
            </div>

          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/50">
            <p>© {new Date().getFullYear()} {cleanName || 'Your Company'}. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition">Privacy Policy</a>
              <a href="#" className="hover:text-white transition">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
      </TemplateProvider>
    </div>
  );
}
