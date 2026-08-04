import fs from 'fs/promises';
import path from 'path';
import { cache } from 'react';
import {
  DEFAULT_INTERIOR_HIGHLIGHTS,
  DEFAULT_INTERIOR_SERVICES,
} from '@/lib/interiorContent';
import crypto from 'crypto';
import { databases } from './appwrite';

export interface GeneratedData {
  clinic: any;
  business: any;
  doctor: any;
  reviews: any[];
  media: any;
  overrides: any;
  meta: any;
  about?: any;
  doctor2?: any;
  homeAbout?: any;
  philosophy?: any;
  templateOverrides?: any;
  selected_template?: string;
}

export function getDocId(slug: string): string {
  return /^[a-f0-9]{32}$/i.test(slug) ? slug : crypto.createHash('md5').update(slug).digest('hex');
}

/** Reject path traversal / unsafe folder names before touching the filesystem. */
export function assertSafeSlug(slug: string): string {
  const cleaned = (slug || '').trim();
  if (!cleaned || cleaned.length > 180) {
    throw new Error('Invalid slug');
  }
  if (cleaned.includes('..') || cleaned.includes('/') || cleaned.includes('\\') || cleaned.includes('\0')) {
    throw new Error('Invalid slug');
  }
  // Human kebab slugs or 32-char Appwrite/md5 ids.
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/i.test(cleaned) && !/^[a-f0-9]{32}$/i.test(cleaned)) {
    throw new Error('Invalid slug');
  }
  return cleaned;
}

function sourcePathFor(slug: string) {
  const safe = assertSafeSlug(slug);
  return path.join(process.cwd(), 'data', safe, 'source.json');
}

/** Persist client data to local JSON (essential leads + newly added only). */
export async function writeSourceConfig(slug: string, data: GeneratedData): Promise<void> {
  const safe = assertSafeSlug(slug);
  const dir = path.join(process.cwd(), 'data', safe);
  await fs.mkdir(dir, { recursive: true });
  const payload: GeneratedData = {
    ...data,
    meta: {
      ...(data.meta || {}),
      updatedAt: new Date().toISOString(),
      generatedAt: data.meta?.generatedAt || new Date().toISOString(),
      source: data.meta?.source || 'local',
    },
  };
  await fs.writeFile(sourcePathFor(safe), JSON.stringify(payload, null, 2), 'utf-8');
}

async function readLocalSourceConfig(slug: string): Promise<GeneratedData | null> {
  try {
    const content = await fs.readFile(sourcePathFor(slug), 'utf-8');
    return JSON.parse(content) as GeneratedData;
  } catch {
    return null;
  }
}

async function readAppwriteSourceConfig(slug: string): Promise<GeneratedData | null> {
  try {
    const docId = getDocId(slug);
    const doc = await databases.getDocument('gtrails', 'scraped_data', docId);
    if (doc?.source_data) {
      return JSON.parse(doc.source_data) as GeneratedData;
    }
  } catch (err: any) {
    console.error('Error reading from Appwrite:', err.message || err);
  }
  return null;
}

/** Best-effort sync of local JSON up to Appwrite (optional). */
export async function syncSourceConfigToAppwrite(slug: string, data: GeneratedData): Promise<void> {
  const documentData = {
    name: data.clinic?.name || slug,
    rating: String(data.business?.rating || ''),
    review_count: String(data.business?.reviewCount || ''),
    address: data.clinic?.address?.full || '',
    phone: data.clinic?.contact?.phone || '',
    image_urls: [
      ...(data.media?.clinicImages || []),
      ...(data.media?.treatmentImages || []),
      ...(data.media?.otherImages || []),
    ],
    reviews: JSON.stringify(data.reviews || []),
    media: JSON.stringify(data.media || {}),
    map_embed_url: data.clinic?.mapEmbedUrl || '',
    source_data: JSON.stringify(data),
  };

  try {
    const docId = getDocId(slug);
    await databases.createDocument('gtrails', 'scraped_data', docId, documentData);
  } catch (err: any) {
    if (err.code === 409 || err.message?.includes('already exists')) {
      const docId = getDocId(slug);
      await databases.updateDocument('gtrails', 'scraped_data', docId, documentData);
    } else {
      throw err;
    }
  }
}

/**
 * Pull a client from Appwrite and save to data/{slug}/source.json.
 * Use for the select clients you want fast local previews for.
 */
export async function fetchAndSaveSourceConfig(slug: string): Promise<GeneratedData | null> {
  const data = await readAppwriteSourceConfig(slug);
  if (!data) return null;
  const hrSlug = assertSafeSlug(data.clinic?.slug || slug);
  await writeSourceConfig(hrSlug, data);
  return data;
}

export async function createSourceConfig(slug: string, data: any): Promise<GeneratedData> {
  const dataShape: GeneratedData = {
    clinic: {
      name: data.name || '',
      slug: slug,
      tagline: `Thoughtful Interiors for Everyday Living`,
      description: `Welcome to ${data.name || 'our studio'}. We create refined, functional interiors tailored to your lifestyle, budget, and space.`,
      address: {
        full: data.address || '',
        area: '',
        city: '',
        state: 'Tamil Nadu',
        country: 'India'
      },
      contact: {
        phone: data.phone || '',
        website: data.website || ''
      },
      mapEmbedUrl: data.mapEmbedUrl || ''
    },
    business: {
      rating: data.rating || '',
      reviewCount: data.reviewCount || '',
      timings: [],
      services: DEFAULT_INTERIOR_SERVICES,
      highlights: DEFAULT_INTERIOR_HIGHLIGHTS
    },
    doctor: {
      name: `${data.name?.split(' ')[0] || 'Design'} Studio Team`,
      images: [],
      experience: '5+ years',
      specialization: 'Interior Design & Turnkey Execution'
    },
    reviews: Array.isArray(data.reviews) ? data.reviews : [],
    media: {
      clinicImages: data.media?.clinicImages || [],
      treatmentImages: data.media?.treatmentImages || [],
      otherImages: data.media?.otherImages || []
    },
    overrides: {
      doctorName: '',
      doctorImages: [],
      extraImages: []
    },
    meta: {
      generatedAt: new Date().toISOString(),
      source: 'google_maps'
    }
  };

  // Attempt to extract city/state from the full address if needed.
  if (data.address) {
    const parts = data.address.split(',');
    if (parts.length > 2) {
      dataShape.clinic.address.city = parts[parts.length - 3].trim();
      dataShape.clinic.address.state = parts[parts.length - 2].trim();
    }
  }

  // Primary: local JSON
  await writeSourceConfig(slug, dataShape);

  // Optional: keep Appwrite in sync
  try {
    await syncSourceConfigToAppwrite(slug, dataShape);
    console.log(`Successfully synced scraped data for "${slug}" to Appwrite!`);
  } catch (appwriteError: any) {
    console.error('Error syncing scraped data to Appwrite:', appwriteError.message || appwriteError);
  }

  return dataShape;
}

function deepMerge(target: any, source: any): any {
  if (!source) return target;
  const output = { ...target };
  for (const key of Object.keys(source)) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      output[key] = deepMerge(target[key] || {}, source[key]);
    } else {
      output[key] = source[key];
    }
  }
  return output;
}

async function readSourceConfigUncached(slug: string, template?: string): Promise<GeneratedData | null> {
  // Essential leads live in data/{slug}/source.json — that is the working set.
  let baseData = await readLocalSourceConfig(slug);

  // Appwrite is a one-off fallback for missing slugs. It is NOT auto-cached locally.
  // To add a client to the essential set: scrape (createSourceConfig), save in admin, or
  // run `npm run sync:clients -- <slug>` / GET /api/data?slug=...&refresh=1
  if (!baseData) {
    baseData = await readAppwriteSourceConfig(slug);
  }

  if (!baseData) return null;

  if (template) {
    const overrides = (baseData as any).templateOverrides?.[template];
    if (overrides) {
      return deepMerge(baseData, overrides) as GeneratedData;
    }
  }

  return baseData;
}

/** Request-deduped reader — layout + page share one load. */
export const readSourceConfig = cache(readSourceConfigUncached);

/** Local essential-lead slugs only (data/{slug}/source.json). */
export async function getLocalSlugs(): Promise<string[]> {
  const dataPath = path.join(process.cwd(), 'data');
  try {
    const entries = await fs.readdir(dataPath, { withFileTypes: true });
    const slugs: string[] = [];
    for (const entry of entries) {
      if (entry.isDirectory()) {
        try {
          await fs.access(sourcePathFor(entry.name));
          slugs.push(entry.name);
        } catch {}
      }
    }
    return slugs.sort();
  } catch {
    return [];
  }
}

export type LocalSiteSummary = {
  slug: string;
  name: string;
  rating: string;
  reviews: string;
  image: string;
  date: string;
  timestamp: number;
};

/** Dashboard/preview list — only essential leads saved locally (+ newly added). */
export async function listLocalSites(): Promise<LocalSiteSummary[]> {
  const slugs = await getLocalSlugs();
  const sites: LocalSiteSummary[] = [];

  for (const slug of slugs) {
    const data = await readLocalSourceConfig(slug);
    if (!data) continue;
    const generatedAt = data.meta?.generatedAt || data.meta?.updatedAt || null;
    const timestamp = generatedAt ? new Date(generatedAt).getTime() : 0;
    sites.push({
      slug: data.clinic?.slug || slug,
      name: data.clinic?.name || slug,
      rating: String(data.business?.rating || 'N/A'),
      reviews: String(data.business?.reviewCount || '0'),
      image: data.media?.clinicImages?.[0] || 'https://via.placeholder.com/400x300?text=No+Image',
      date: timestamp ? new Date(timestamp).toLocaleDateString() : '—',
      timestamp,
    });
  }

  return sites;
}

/** Static params / previews — essential local clients only. */
export async function getAllSlugs(): Promise<string[]> {
  return getLocalSlugs();
}
