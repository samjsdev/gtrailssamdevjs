import { readSourceConfig, getAllSlugs } from '@/lib/dataBuilder';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';
import { cleanClinicName } from '@/lib/copyCleaner';
import { Jost } from 'next/font/google';
import ClientHeader from './ClientHeader';

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
      <ClientHeader clinic={clinic} cleanName={cleanName} basePath={basePath} />
      <main className="flex-1 w-full relative">
        {children}
      </main>
      
      {/* Footer Placeholder */}
      <footer className="bg-[#2b347b] text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <p className="opacity-80">© {new Date().getFullYear()} {cleanName || 'Your Company'}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
