import fs from 'fs';
import path from 'path';
import AssetAuditClient from './AssetAuditClient';
import { classifyAsset, type Asset } from '@/lib/siteContent';

type ScannedFile = {
  path: string;
  name: string;
  folder: string;
  size: number;
};

// Recursive file scanner
function scanDirectory(dir: string, baseDir: string): ScannedFile[] {
  const results: ScannedFile[] = [];
  if (!fs.existsSync(dir)) return results;

  const list = fs.readdirSync(dir);
  for (const file of list) {
    if (file.startsWith('.')) continue; // skip hidden files

    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      results.push(...scanDirectory(filePath, baseDir));
    } else {
      const relativePath = '/' + path.relative(baseDir, filePath).replace(/\\/g, '/');
      const folderName = path.basename(path.dirname(filePath));
      results.push({
        path: relativePath,
        name: file,
        folder: folderName,
        size: stat.size,
      });
    }
  }
  return results;
}

export default function AssetAuditPage() {
  const publicDir = path.join(process.cwd(), 'public');
  const allImagesDir = path.join(publicDir, 'images', 'all');
  
  // Programmatically scan files
  const files = scanDirectory(allImagesDir, publicDir);

  const inventory: Asset[] = files.map((file) => classifyAsset(file.path));

  return (
    <AssetAuditClient files={files} inventory={inventory} />
  );
}
