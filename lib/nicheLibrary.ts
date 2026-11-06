import fs from 'fs/promises';
import path from 'path';
import { NICHES, type NicheImages } from './niches';

const SLOTS = ['heroes', 'gallery', 'services', 'about', 'people'] as const;
type Slot = (typeof SLOTS)[number];

const IMAGE_EXT = /\.(webp|jpe?g|png|avif)$/i;

function libraryRoot() {
  return path.join(process.cwd(), 'public', 'images', 'niches');
}

async function listSlot(nicheId: string, slot: Slot, regionIds: string[] = []): Promise<string[]> {
  const root = libraryRoot();
  const results: string[] = [];

  // 1. Regional specific images if regions are checked
  for (const reg of regionIds) {
    // Check niche-level region directory: public/images/niches/[nicheId]/[slot]/[reg]/
    try {
      const nicheRegDir = path.join(root, nicheId, slot, reg);
      const entries = await fs.readdir(nicheRegDir);
      for (const name of entries.filter((n) => IMAGE_EXT.test(n) && !n.startsWith('.')).sort((a, b) => a.localeCompare(b))) {
        results.push(`/images/niches/${nicheId}/${slot}/${reg}/${name}`);
      }
    } catch {}

    // Check global region directory: public/images/niches/regions/[reg]/[slot]/
    try {
      const globalRegDir = path.join(root, 'regions', reg, slot);
      const entries = await fs.readdir(globalRegDir);
      for (const name of entries.filter((n) => IMAGE_EXT.test(n) && !n.startsWith('.')).sort((a, b) => a.localeCompare(b))) {
        results.push(`/images/niches/regions/${reg}/${slot}/${name}`);
      }
    } catch {}
  }

  // 2. Base niche directory: public/images/niches/[nicheId]/[slot]/
  const dir = path.join(root, nicheId, slot);
  try {
    const entries = await fs.readdir(dir);
    for (const name of entries.filter((n) => IMAGE_EXT.test(n) && !n.startsWith('.')).sort((a, b) => a.localeCompare(b))) {
      results.push(`/images/niches/${nicheId}/${slot}/${name}`);
    }
  } catch {}

  return results;
}

function interleave(groups: string[][]): string[] {
  const out: string[] = [];
  const max = groups.reduce((length, group) => Math.max(length, group.length), 0);
  for (let index = 0; index < max; index += 1) {
    for (const group of groups) {
      if (group[index]) out.push(group[index]);
    }
  }
  return out;
}

function fallbackSlot(nicheId: string, slot: Slot): string[] {
  const niche = NICHES.find((item) => item.id === nicheId);
  return niche?.images[slot] ? [...niche.images[slot]] : [];
}

/** Photos dropped in the niche library win. Empty slots use the built-in fallbacks. */
export async function nicheImagesFor(nicheIds: string[], regionIds: string[] = []): Promise<NicheImages> {
  const selected = nicheIds.filter((id) => NICHES.some((niche) => niche.id === id));
  const images = {} as NicheImages;

  for (const slot of SLOTS) {
    const groups: string[][] = [];
    for (const id of selected) {
      const custom = await listSlot(id, slot, regionIds);
      groups.push(custom.length ? custom : fallbackSlot(id, slot));
    }
    images[slot] = interleave(groups);
  }

  return images;
}

export type NicheMedia = {
  clinicImages: string[];
  treatmentImages: string[];
  otherImages: string[];
};

function pad(list: string[], min: number): string[] {
  if (!list.length) return [];
  const out = list.slice();
  let index = 0;
  while (out.length < min) {
    out.push(list[index % list.length]);
    index += 1;
  }
  return out;
}

/** Shape niche photos the way templates already read media arrays. */
export async function nicheMediaFor(nicheIds: string[], regionIds: string[] = []): Promise<NicheMedia> {
  const images = await nicheImagesFor(nicheIds, regionIds);
  const heroes = images.heroes.length ? images.heroes : images.gallery;
  const services = images.services.length ? images.services : heroes;
  const gallery = images.gallery.length ? images.gallery : heroes;
  const about = images.about.length ? images.about : heroes;
  const people = images.people.length ? images.people : about;

  return {
    clinicImages: pad([...heroes, ...about], 6).slice(0, 8),
    treatmentImages: pad(services, 6).slice(0, 8),
    otherImages: pad([...gallery, ...about, ...people, ...services], 14).slice(0, 16),
  };
}
