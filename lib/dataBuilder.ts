import fs from 'fs/promises';
import path from 'path';
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
  selected_template?: string;
}

export function getDocId(slug: string): string {
  return /^[a-f0-9]{32}$/i.test(slug) ? slug : crypto.createHash('md5').update(slug).digest('hex');
}


export async function createSourceConfig(slug: string, data: any): Promise<GeneratedData> {
  const sourcePath = path.join(process.cwd(), 'data', slug, 'source.json');

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

  await fs.writeFile(sourcePath, JSON.stringify(dataShape, null, 2), 'utf-8');

  // Sync to Appwrite scraped_data collection
  try {
    const documentData = {
      name: dataShape.clinic.name,
      rating: String(dataShape.business.rating || ''),
      review_count: String(dataShape.business.reviewCount || ''),
      address: dataShape.clinic.address.full,
      phone: dataShape.clinic.contact.phone,
      image_urls: data.media ? [
        ...(data.media.clinicImages || []),
        ...(data.media.treatmentImages || []),
        ...(data.media.otherImages || [])
      ] : [],
      reviews: JSON.stringify(dataShape.reviews),
      media: JSON.stringify(dataShape.media),
      map_embed_url: dataShape.clinic.mapEmbedUrl,
      source_data: JSON.stringify(dataShape)
    };

    try {
      const docId = getDocId(dataShape.clinic.slug);
      await databases.createDocument('gtrails', 'scraped_data', docId, documentData);
      console.log(`Successfully created scraped data for "${slug}" in Appwrite!`);
    } catch (err: any) {
      if (err.code === 409 || err.message?.includes('already exists')) {
        const docId = getDocId(dataShape.clinic.slug);
        await databases.updateDocument('gtrails', 'scraped_data', docId, documentData);
        console.log(`Successfully updated scraped data for "${slug}" in Appwrite!`);
      } else {
        throw err;
      }
    }
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

export async function readSourceConfig(slug: string, template?: string): Promise<GeneratedData | null> {
  let baseData: GeneratedData | null = null;

  try {
    const docId = getDocId(slug);
    const doc = await databases.getDocument('gtrails', 'scraped_data', docId);
    if (doc?.source_data) {
      baseData = JSON.parse(doc.source_data) as GeneratedData;
    }
  } catch (sbEx: any) {
    console.error('Error reading from Appwrite:', sbEx.message || sbEx);
  }

  if (!baseData) {
    // Fallback to local file for development or transition
    const sourcePath = path.join(process.cwd(), 'data', slug, 'source.json');
    try {
      const content = await fs.readFile(sourcePath, 'utf-8');
      baseData = JSON.parse(content);
    } catch (error) {
      return null;
    }
  }

  if (baseData && template) {
    const overrides = (baseData as any).templateOverrides?.[template];
    if (overrides) {
      return deepMerge(baseData, overrides) as GeneratedData;
    }
  }

  return baseData;
}

export async function getAllSlugs(): Promise<string[]> {
  try {
    const response = await databases.listDocuments('gtrails', 'scraped_data');
    if (response?.documents) {
      return response.documents.map(item => {
        const json = item.source_data ? JSON.parse(item.source_data) : {};
        return json.clinic?.slug || item.$id;
      });
    }
  } catch (sbEx: any) {
    console.error('Error fetching slugs from Appwrite:', sbEx.message || sbEx);
  }

  // Fallback to local directories
  const dataPath = path.join(process.cwd(), 'data');
  try {
    const entries = await fs.readdir(dataPath, { withFileTypes: true });
    const slugs: string[] = [];
    for (const entry of entries) {
      if (entry.isDirectory()) {
        const sourcePath = path.join(dataPath, entry.name, 'source.json');
        try {
          await fs.access(sourcePath);
          slugs.push(entry.name);
        } catch {}
      }
    }
    return slugs;
  } catch (error) {
    return [];
  }
}
