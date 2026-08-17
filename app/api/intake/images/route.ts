import { NextResponse } from 'next/server';
import { scrapeBusinessImages } from '@/lib/scraper';
import { processAndSaveImage } from '@/lib/imageProcessor';
import { assertSafeSlug, persistSourceConfig } from '@/lib/dataBuilder';
import { requireAdmin } from '@/lib/adminAuth';
import path from 'path';
import fs from 'fs/promises';

export async function POST(req: Request) {
  try {
    const denied = await requireAdmin(req);
    if (denied) return denied;

    const body = await req.json();
    const rawSlug = body.slug || '';
    if (!rawSlug) {
      return NextResponse.json({ error: 'Missing business slug' }, { status: 400 });
    }

    const slug = assertSafeSlug(rawSlug);
    const dataDir = path.join(process.cwd(), 'data', slug);
    const sourcePath = path.join(dataDir, 'source.json');

    let existingData: any = null;
    try {
      const content = await fs.readFile(sourcePath, 'utf-8');
      existingData = JSON.parse(content);
    } catch {
      return NextResponse.json({ error: `Business configuration for "${slug}" not found` }, { status: 404 });
    }

    const rawGbpUrl = body.gbpUrl || existingData?.meta?.gbpUrl || existingData?.clinic?.contact?.googleMapsUrl || '';
    const gbpUrl = typeof rawGbpUrl === 'string' ? rawGbpUrl.trim() : '';
    const photosUrl = typeof body.photosUrl === 'string' ? body.photosUrl.trim() : '';

    if (!gbpUrl && !photosUrl) {
      return NextResponse.json({ error: 'No Google Maps or Photos URL found. Please provide a URL to scrape images.' }, { status: 400 });
    }

    const activeImagesPath = path.join(dataDir, 'images');
    await fs.mkdir(activeImagesPath, { recursive: true });

    // 1. Scrape image candidates from Google Maps / Photos gallery
    const targetUrl = gbpUrl || photosUrl;
    const imageUrls = await scrapeBusinessImages(targetUrl, photosUrl || undefined);

    if (!imageUrls || imageUrls.length === 0) {
      return NextResponse.json({ 
        success: false, 
        message: 'No images were found on the provided Google Maps profile.',
        count: 0,
        media: existingData.media || { clinicImages: [], treatmentImages: [], otherImages: [] }
      });
    }

    // 2. Process and save images
    type MediaCategory = 'clinicImages' | 'treatmentImages' | 'otherImages';
    const mediaObj: Record<MediaCategory, string[]> = {
      clinicImages: [] as string[],
      treatmentImages: [] as string[],
      otherImages: [] as string[],
    };

    const imageUrlsParam = imageUrls.slice(0, 150);

    for (let i = 0; i < imageUrlsParam.length; i++) {
      const url = imageUrlsParam[i];
      let category: MediaCategory = 'otherImages';

      if (i < 4) category = 'clinicImages';
      else if (i < 8) category = 'treatmentImages';

      try {
        const localUri = await processAndSaveImage(url, slug, category, i);
        if (localUri) {
          mediaObj[category].push(localUri);
        }
      } catch (imgError) {
        console.error(`[Image Scraper API] Error processing image index ${i}:`, imgError);
      }
    }

    const totalProcessed = mediaObj.clinicImages.length + mediaObj.treatmentImages.length + mediaObj.otherImages.length;

    // 3. Update source.json and sync to Appwrite
    const updatedData = {
      ...existingData,
      media: mediaObj,
      meta: {
        ...(existingData.meta || {}),
        gbpUrl: gbpUrl || existingData.meta?.gbpUrl || '',
        imagesScrapedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
    };

    await persistSourceConfig(slug, updatedData);

    return NextResponse.json({
      success: true,
      count: totalProcessed,
      media: mediaObj,
      slug,
      message: `Successfully scraped and saved ${totalProcessed} images.`
    });

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Image scraping failed';
    console.error('[Image Scraper API] Error:', error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
