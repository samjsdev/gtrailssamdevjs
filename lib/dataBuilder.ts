import fs from 'fs/promises';
import path from 'path';
import {
  DEFAULT_INTERIOR_HIGHLIGHTS,
  DEFAULT_INTERIOR_SERVICES,
} from '@/lib/interiorContent';
import { supabase } from './supabase';

export interface GeneratedData {
  clinic: any;
  business: any;
  doctor: any;
  reviews: any[];
  media: any;
  overrides: any;
  meta: any;
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

  // Sync to Supabase scraped_data table
  try {
    const { error } = await supabase.from('scraped_data').upsert({
      slug: dataShape.clinic.slug,
      name: dataShape.clinic.name,
      rating: dataShape.business.rating,
      review_count: dataShape.business.reviewCount,
      address: dataShape.clinic.address.full,
      phone: dataShape.clinic.contact.phone,
      image_urls: data.media ? [
        ...(data.media.clinicImages || []),
        ...(data.media.treatmentImages || []),
        ...(data.media.otherImages || [])
      ] : [],
      reviews: dataShape.reviews,
      media: dataShape.media,
      map_embed_url: dataShape.clinic.mapEmbedUrl,
      source_data: dataShape,
      updated_at: new Date().toISOString()
    });

    if (error) {
      console.error('Failed to upsert to Supabase scraped_data:', error);
    } else {
      console.log(`Successfully synced scraped data for "${slug}" to Supabase!`);
    }
  } catch (supabaseError) {
    console.error('Error syncing scraped data to Supabase:', supabaseError);
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
    const { data, error } = await supabase
      .from('scraped_data')
      .select('source_data')
      .eq('slug', slug)
      .single();

    if (!error && data?.source_data) {
      baseData = data.source_data as GeneratedData;
    }
  } catch (sbEx) {
    console.error('Error reading from Supabase:', sbEx);
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
    const { data, error } = await supabase
      .from('scraped_data')
      .select('slug');

    if (!error && data) {
      return data.map(item => item.slug);
    }
  } catch (sbEx) {
    console.error('Error fetching slugs from Supabase:', sbEx);
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
