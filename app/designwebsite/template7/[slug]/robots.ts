import { MetadataRoute } from 'next';
import { getAllSlugs } from '@/lib/dataBuilder';

export const dynamic = 'force-static';

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/private/'],
      },
    ],
    sitemap: 'https://luminadental.com/sitemap.xml',
  };
}
