import fs from 'fs/promises';
import path from 'path';
import { cache } from 'react';
import {
  DEFAULT_INTERIOR_HIGHLIGHTS,
  DEFAULT_INTERIOR_SERVICES,
} from '@/lib/interiorContent';
import crypto from 'crypto';

/** Lazy Appwrite import — template previews that hit local JSON never load the DB client. */
async function getDatabases() {
  const { databases } = await import('./appwrite');
  return databases;
}

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

function withUpdatedMeta(data: GeneratedData, source = 'local'): GeneratedData {
  return {
    ...data,
    meta: {
      ...(data.meta || {}),
      updatedAt: new Date().toISOString(),
      generatedAt: data.meta?.generatedAt || new Date().toISOString(),
      source: data.meta?.source || source,
    },
  };
}

/** Write client data to local data/{slug}/source.json (fast path for local + Vercel). */
export async function writeSourceConfig(slug: string, data: GeneratedData): Promise<void> {
  const safe = assertSafeSlug(slug);
  const dir = path.join(process.cwd(), 'data', safe);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(sourcePathFor(safe), JSON.stringify(withUpdatedMeta(data), null, 2), 'utf-8');
}

/**
 * Store client data in BOTH places:
 * 1. local data/{slug}/source.json (reads / previews)
 * 2. Appwrite scraped_data (backup)
 * Fails if either write fails.
 */
export async function persistSourceConfig(slug: string, data: GeneratedData): Promise<GeneratedData> {
  const safe = assertSafeSlug(data.clinic?.slug || slug);
  const payload = withUpdatedMeta(data);
  const errors: string[] = [];

  try {
    await writeSourceConfig(safe, payload);
  } catch (err: any) {
    errors.push(`JSON: ${err.message || err}`);
  }

  try {
    await syncSourceConfigToAppwrite(safe, payload);
  } catch (err: any) {
    errors.push(`Appwrite: ${err.message || err}`);
  }

  if (errors.length) {
    throw new Error(`Failed to store client in both places — ${errors.join(' | ')}`);
  }

  return payload;
}

/** Push every local JSON client up to Appwrite backup. */
export async function syncAllLocalClientsToAppwrite(): Promise<{ ok: string[]; failed: { slug: string; error: string }[] }> {
  const slugs = await getLocalSlugs();
  const ok: string[] = [];
  const failed: { slug: string; error: string }[] = [];

  for (const slug of slugs) {
    const data = await readLocalSourceConfig(slug);
    if (!data) {
      failed.push({ slug, error: 'Missing or invalid source.json' });
      continue;
    }
    try {
      await syncSourceConfigToAppwrite(slug, data);
      ok.push(slug);
    } catch (err: any) {
      failed.push({ slug, error: err.message || String(err) });
    }
  }

  return { ok, failed };
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
    const databases = await getDatabases();
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

/** Sync one client JSON payload up to Appwrite backup. */
export async function syncSourceConfigToAppwrite(slug: string, data: GeneratedData): Promise<void> {
  const databases = await getDatabases();
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
 * Restore one client from Appwrite backup → local JSON.
 * Opt-in only (admin refresh / sync:clients) — not used on normal reads.
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

  // Primary JSON + Appwrite backup
  try {
    await persistSourceConfig(slug, dataShape);
    console.log(`Successfully saved scraped data for "${slug}" (JSON + Appwrite backup)`);
  } catch (err: any) {
    console.error('Error saving scraped data:', err.message || err);
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
  // JSON only — Appwrite is backup storage, never used for normal reads.
  const baseData = await readLocalSourceConfig(slug);
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

/** Slugs that have data/{slug}/source.json (the few clients we handle). */
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

/** Dashboard / lists — JSON only. */
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

  return sites.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
}

/** @deprecated Use listLocalSites — kept as alias. */
export async function listDashboardSites(): Promise<LocalSiteSummary[]> {
  return listLocalSites();
}

/** Static params for template previews — JSON clients only. */
export async function getAllSlugs(): Promise<string[]> {
  return getLocalSlugs();
}
