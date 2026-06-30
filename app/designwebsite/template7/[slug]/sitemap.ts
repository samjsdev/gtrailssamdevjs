import { MetadataRoute } from 'next';
import { getAllSlugs } from '@/lib/dataBuilder';

export const dynamic = 'force-static';

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://luminainterior.com';

  // Core routes
  const routes = [
    '',
    '/about',
    '/treatments',
    '/gallery',
    '/contact',
    '/privacy',
    '/terms',
    '/team',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  return [...routes];
}
