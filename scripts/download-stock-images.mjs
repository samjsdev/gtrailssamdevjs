import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

const TEMPLATE_DIRS = [
  path.join(projectRoot, 'app/designwebsite/template7'),
  path.join(projectRoot, 'app/designwebsite/template8')
];

const OUTPUT_DIR = path.join(projectRoot, 'public/images/stock');
const OUTPUT_URL_PREFIX = '/images/stock';

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Helper to recursively get all relevant files
function getAllFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      getAllFiles(filePath, fileList);
    } else if (filePath.endsWith('.tsx') || filePath.endsWith('.json') || filePath.endsWith('.ts')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

// Hash function for URLs
function hashUrl(url) {
  return crypto.createHash('md5').update(url).digest('hex').substring(0, 8);
}

// Regex to find Unsplash URLs
const UNSPLASH_REGEX = /https:\/\/images\.unsplash\.com\/[a-zA-Z0-9\-\.\_\?\=\&\%]+/g;

async function processImages() {
  const allFiles = TEMPLATE_DIRS.flatMap(dir => getAllFiles(dir));
  const urlMap = new Map(); // originalUrl -> localUrl

  console.log(`Scanning ${allFiles.length} files for Unsplash URLs...`);

  // Step 1: Find all unique URLs
  for (const file of allFiles) {
    const content = fs.readFileSync(file, 'utf-8');
    const matches = content.match(UNSPLASH_REGEX) || [];
    for (let url of matches) {
      if (!urlMap.has(url)) {
        urlMap.set(url, null); // Will be populated with local URL later
      }
    }
  }

  const uniqueUrls = Array.from(urlMap.keys());
  console.log(`Found ${uniqueUrls.length} unique Unsplash URLs.`);

  // Step 2: Download and convert
  for (let i = 0; i < uniqueUrls.length; i++) {
    const url = uniqueUrls[i];
    const hash = hashUrl(url);
    const fileName = `${hash}.webp`;
    const outputPath = path.join(OUTPUT_DIR, fileName);
    const localUrl = `${OUTPUT_URL_PREFIX}/${fileName}`;

    urlMap.set(url, localUrl);

    if (fs.existsSync(outputPath)) {
      console.log(`[${i + 1}/${uniqueUrls.length}] Skipping (already exists): ${fileName}`);
      continue;
    }

    console.log(`[${i + 1}/${uniqueUrls.length}] Downloading: ${url}`);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
      }
      const buffer = await response.arrayBuffer();
      
      // Convert to webp using sharp
      await sharp(Buffer.from(buffer))
        .webp({ quality: 80 })
        .toFile(outputPath);
        
      console.log(`Saved as ${fileName}`);
    } catch (err) {
      console.error(`Error processing ${url}:`, err);
    }
  }

  // Step 3: Replace in files
  console.log(`Replacing URLs in files...`);
  let filesModified = 0;
  for (const file of allFiles) {
    let content = fs.readFileSync(file, 'utf-8');
    let modified = false;

    for (const [originalUrl, localUrl] of urlMap.entries()) {
      if (localUrl && content.includes(originalUrl)) {
        // Simple string replacement using split/join to replace all occurrences
        content = content.split(originalUrl).join(localUrl);
        modified = true;
      }
    }

    if (modified) {
      fs.writeFileSync(file, content, 'utf-8');
      filesModified++;
    }
  }

  console.log(`Done! Modified ${filesModified} files.`);
}

processImages().catch(console.error);
