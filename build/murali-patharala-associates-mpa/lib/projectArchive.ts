import { readdir } from 'node:fs/promises';
import path from 'node:path';

const archiveRoot = 'murali-patharala-associates-assets';

const archiveGroups = [
  { folder: 'exterior_renders', prefix: 'EXT' },
  { folder: 'interior_renders', prefix: 'INT' },
  { folder: 'completed_interiors', prefix: 'CMP' },
  { folder: 'portfolio_showcase', prefix: 'PRT' },
] as const;

// Removed archive entries remain listed to preserve stable gallery IDs.
// The corresponding image files have been deleted from public storage.
const duplicateArchiveFiles = new Set([
  'exterior_renders/Govindha Rajan2026.webp',
  'exterior_renders/JAMEEL.webp',
  'exterior_renders/selva kumar.webp',
  'interior_renders/WhatsApp Image 2026-09-23 at 16.22.23 (2).webp',
  'interior_renders/WhatsApp Image 2026-09-23 at 16.22.23 (4).webp',
  'interior_renders/WhatsApp Image 2026-09-23 at 16.22.24 (1).webp',
  'interior_renders/WhatsApp Image 2026-09-23 at 16.42.57 (4).webp',
  'interior_renders/WhatsApp Image 2026-09-23 at 16.42.58 (1).webp',
  'portfolio_showcase/WhatsApp Image 2026-09-23 at 17.34.32 (1).webp',
  'portfolio_showcase/WhatsApp Image 2026-09-23 at 17.34.32.webp',
  'portfolio_showcase/WhatsApp Image 2026-09-23 at 17.34.31 (1).webp',
  'portfolio_showcase/WhatsApp Image 2026-09-23 at 17.34.36.webp',
  'portfolio_showcase/WhatsApp Image 2026-09-23 at 17.34.41.webp',
  'portfolio_showcase/WhatsApp Image 2026-09-23 at 17.34.49 (2).webp',
]);

// Alternate angles removed from the Projects gallery and public storage.
const approvedAngleRemovals = new Set([
  'exterior_renders/Govindha Rajan.webp', // EXT-003
  'exterior_renders/Yasmeen.webp', // EXT-030
  'exterior_renders/WhatsApp Image 2026-09-23 at 16.17.56.webp', // EXT-021
  'exterior_renders/modern-residence-exterior-render-portrait.webp', // EXT-009
  'exterior_renders/Parthiban.webp', // EXT-011
  'exterior_renders/WhatsApp Image 2026-09-23 at 17.38.21.webp', // EXT-024
  'interior_renders/WhatsApp Image 2026-09-23 at 16.22.23 (1).webp', // INT-001
  'interior_renders/WhatsApp Image 2026-09-23 at 16.22.23.webp', // INT-010
  'interior_renders/WhatsApp Image 2026-09-23 at 16.22.23 (6).webp', // INT-006
  'interior_renders/WhatsApp Image 2026-09-23 at 16.22.23 (7).webp', // INT-007
  'interior_renders/WhatsApp Image 2026-09-23 at 16.22.24 (3).webp', // INT-013
  'interior_renders/WhatsApp Image 2026-09-23 at 16.42.59 (6).webp', // INT-031
  'interior_renders/WhatsApp Image 2026-09-23 at 16.42.59 (7).webp', // INT-032
  'portfolio_showcase/WhatsApp Image 2026-09-23 at 17.34.36 (1).webp', // PRT-022
  'portfolio_showcase/WhatsApp Image 2026-09-23 at 17.34.39 (2).webp', // PRT-029
  'portfolio_showcase/WhatsApp Image 2026-09-23 at 17.34.26.webp', // PRT-001
  'portfolio_showcase/WhatsApp Image 2026-09-23 at 17.34.44 (2).webp', // PRT-040
  'portfolio_showcase/WhatsApp Image 2026-09-23 at 17.34.53.webp', // PRT-060
  'portfolio_showcase/WhatsApp Image 2026-09-23 at 17.34.54 (1).webp', // PRT-061
  'portfolio_showcase/WhatsApp Image 2026-09-23 at 17.34.56.webp', // PRT-067
]);

// These two portfolio pages are already upright. The other portrait portfolio
// pages contain landscape photographs turned sideways in the source export.
const uprightPortfolioFiles = new Set([
  'WhatsApp Image 2026-09-23 at 17.34.27 (1).webp',
  'WhatsApp Image 2026-09-23 at 17.34.33.webp',
]);

export type ArchiveGroup = (typeof archiveGroups)[number]['folder'];

export interface ArchiveImage {
  id: string;
  url: string;
  fileName: string;
  group: ArchiveGroup;
  rotation: 0 | 90;
}

export async function getProjectArchiveImages(): Promise<ArchiveImage[]> {
  const images = await Promise.all(
    archiveGroups.map(async ({ folder, prefix }) => {
      const directory = path.join(process.cwd(), 'public', archiveRoot, folder);
      const files = (await readdir(directory))
        .filter((file) => /\.(avif|gif|jpe?g|png|webp)$/i.test(file))
        .sort((a, b) => a.localeCompare(b, 'en', { numeric: true }));

      // Include deleted filenames when assigning ordinals so existing EXT/INT/
      // CMP/PRT IDs do not change as the storage is cleaned up.
      const deletedFiles = [...duplicateArchiveFiles, ...approvedAngleRemovals]
        .filter((archiveFile) => archiveFile.startsWith(`${folder}/`))
        .map((archiveFile) => archiveFile.slice(folder.length + 1));
      const ordinalFiles = [...new Set([...files, ...deletedFiles])]
        .sort((a, b) => a.localeCompare(b, 'en', { numeric: true }));
      const ordinalByFile = new Map(ordinalFiles.map((file, index) => [file, index + 1]));

      return files.map((fileName) => ({
        id: `${prefix}-${String(ordinalByFile.get(fileName)!).padStart(3, '0')}`,
        url: `/${archiveRoot}/${folder}/${fileName}`,
        fileName,
        group: folder,
        rotation: folder === 'portfolio_showcase' && !uprightPortfolioFiles.has(fileName) ? 90 as const : 0 as const,
      }));
    }),
  );

  return images.flat().filter((image) => {
    const archiveFile = `${image.group}/${image.fileName}`;
    return !duplicateArchiveFiles.has(archiveFile) && !approvedAngleRemovals.has(archiveFile);
  });
}
