import fs from 'fs/promises';
import path from 'path';
import {
  DEFAULT_INTERIOR_HIGHLIGHTS,
  DEFAULT_INTERIOR_SERVICES,
} from '@/lib/interiorContent';

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
        website: ''
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

  return dataShape;
}

export async function readSourceConfig(slug: string): Promise<GeneratedData | null> {
  const sourcePath = path.join(process.cwd(), 'data', slug, 'source.json');
  try {
    const content = await fs.readFile(sourcePath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    return null;
  }
}

export async function getAllSlugs(): Promise<string[]> {
  const dataPath = path.join(process.cwd(), 'data');
  try {
    const entries = await fs.readdir(dataPath, { withFileTypes: true });
    
    // Check if source.json exists in each directory
    const slugs: string[] = [];
    for (const entry of entries) {
      if (entry.isDirectory()) {
        try {
          const stats = await fs.stat(path.join(dataPath, entry.name, 'source.json'));
          if (stats.isFile()) {
            slugs.push(entry.name);
          }
        } catch (e) {
          // source.json doesn't exist or isn't a file
        }
      }
    }
    return slugs;
  } catch (error) {
    return [];
  }
}
