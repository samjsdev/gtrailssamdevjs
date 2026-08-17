import { NextResponse } from 'next/server';
import { scrapeBusinessDetails } from '@/lib/scraper';
import { createSourceConfig } from '@/lib/dataBuilder';
import { requireAdmin } from '@/lib/adminAuth';
import path from 'path';
import fs from 'fs/promises';

export async function POST(req: Request) {
  try {
    const denied = await requireAdmin(req);
    if (denied) return denied;

    const body = await req.json();
    const rawUrl = body.gbpUrl || body.url || '';
    const gbpUrl = typeof rawUrl === 'string' ? rawUrl.trim() : '';
    const forceRefresh = Boolean(body.forceRefresh);

    if (!gbpUrl || !/(google\.[^/]+\/maps|maps\.app\.goo\.gl|g\.page|maps\.google\.|g\.co|google\.[^/]+\/search|goo\.gl)/i.test(gbpUrl)) {
      return NextResponse.json({ error: 'Invalid Google Maps URL' }, { status: 400 });
    }

    // 1. Extract a simple slug from the URL or query params
    const match = gbpUrl.match(/\/place\/([^\/]+)/);
    const rawName = match ? decodeURIComponent(match[1]).replace(/\+/g, ' ') : 'interior-design-website';
    let slug = rawName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const dataPath = path.join(process.cwd(), 'data', slug);

    // Reuse cache only when this is not an explicit refresh request.
    const shouldUseCache = !forceRefresh;
    if (shouldUseCache) {
      try {
        const sourcePath = path.join(dataPath, 'source.json');
        const stats = await fs.stat(sourcePath);
        if (stats.isFile()) {
          const existing = JSON.parse(await fs.readFile(sourcePath, 'utf-8'));
          if (existing?.clinic?.name) {
            return NextResponse.json({ slug, cached: true, websiteGenerated: false });
          }
        }
      } catch {
        // Doesn't exist, proceed
      }
    }

    await fs.mkdir(dataPath, { recursive: true });
    await fs.mkdir(path.join(dataPath, 'images'), { recursive: true });

    // 2. Scrape details (Phase 1: name, address, phone, website, 5-star reviews, embed map)
    const scrapedData = await scrapeBusinessDetails(gbpUrl);

    // Better slug from actual name
    if (scrapedData.name) {
      slug = scrapedData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      const newPath = path.join(process.cwd(), 'data', slug);
      if (dataPath !== newPath) {
         try { await fs.rename(dataPath, newPath); } catch {}
      }
    }

    // 3. Generate source.json with business details (Images are scraped separately in Phase 2)
    await createSourceConfig(slug, { 
      name: scrapedData.name, 
      rating: scrapedData.rating, 
      reviewCount: scrapedData.reviewCount, 
      address: scrapedData.address, 
      phone: scrapedData.phone,
      website: scrapedData.website,
      googleMapsUrl: gbpUrl,
      gbpUrl: gbpUrl,
      media: {
        clinicImages: [],
        treatmentImages: [],
        otherImages: [],
      },
      reviews: scrapedData.reviews,
      mapEmbedUrl: scrapedData.mapEmbedUrl,
    });

    return NextResponse.json({ slug, websiteGenerated: false });

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Scraping failed';
    console.error('Intake API Error:', error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

