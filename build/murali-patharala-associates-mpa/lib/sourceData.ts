/**
 * Standalone source data reader — no database dependencies.
 * Reads all business data from source.json at the project root.
 */
import fs from 'fs/promises';
import path from 'path';

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

export async function readSourceConfig(slug?: string, template?: string): Promise<GeneratedData | null> {
  const sourcePath = path.join(process.cwd(), 'source.json');
  try {
    const content = await fs.readFile(sourcePath, 'utf-8');
    let baseData = JSON.parse(content) as GeneratedData;

    if (baseData && template) {
      const overrides = (baseData as any).templateOverrides?.[template];
      if (overrides) {
        return deepMerge(baseData, overrides) as GeneratedData;
      }
    }

    return baseData;
  } catch (error) {
    console.error('Failed to read source.json:', error);
    return null;
  }
}

export async function getAllSlugs(): Promise<string[]> {
  try {
    const sourcePath = path.join(process.cwd(), 'source.json');
    const content = await fs.readFile(sourcePath, 'utf-8');
    const data = JSON.parse(content);
    return [data.clinic?.slug || 'site'];
  } catch {
    return [];
  }
}
