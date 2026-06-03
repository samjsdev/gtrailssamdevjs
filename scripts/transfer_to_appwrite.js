/**
 * Appwrite Complete Data & Asset Migration Script
 * 
 * This script scans your local '/data' folders and uploads:
 * 1. Scraped database records to Appwrite Database.
 * 2. High-res scraper pictures to Appwrite 'scraped_images' storage bucket.
 * 3. Packaged dynamic HTML/CSS templates to Appwrite 'templates' storage bucket.
 * 
 * Usage:
 * node scripts/transfer_to_appwrite.js
 */

const fs = require('fs/promises');
const path = require('path');
const crypto = require('crypto');

// Load environment variables
function loadEnv() {
  const files = ['.env', '.env.local', '.env.production'];
  for (const file of files) {
    try {
      const content = require('fs').readFileSync(path.join(process.cwd(), file), 'utf-8');
      content.split('\n').forEach(line => {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) return;
        const [key, ...value] = trimmed.split('=');
        if (key && value) process.env[key.trim()] = value.join('=').trim().replace(/^["']|["']$/g, '');
      });
    } catch (e) {
      // Ignore
    }
  }
}

loadEnv();

const PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '6a1cf32a002c668912cc';
const ENDPOINT = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://sgp.cloud.appwrite.io/v1';
const API_KEY = process.env.APPWgtrailskey || '';
const DATABASE_ID = 'gtrails';
const COLLECTION_ID = 'scraped_data';

if (!API_KEY) {
  console.error("\x1b[31m✖ Error: APPWgtrailskey not found in environment or .env file.\x1b[0m");
  process.exit(1);
}

const headers = {
  'X-Appwrite-Project': PROJECT_ID,
  'X-Appwrite-Key': API_KEY,
};

async function apiRequest(path, method = 'GET', body = null, isMultipart = false) {
  const url = `${ENDPOINT}${path}`;
  const options = {
    method,
    headers: isMultipart ? { 'X-Appwrite-Project': PROJECT_ID, 'X-Appwrite-Key': API_KEY } : { ...headers, 'Content-Type': 'application/json' },
  };

  if (body) {
    options.body = isMultipart ? body : JSON.stringify(body);
  }

  const response = await fetch(url, options);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || `HTTP ${response.status}`);
  }
  return data;
}

async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Upload file to specific bucket
async function uploadFileToBucket(bucketId, fileId, filePath, contentType) {
  try {
    const fileContent = await fs.readFile(filePath);
    
    // 1. Delete if exists
    try {
      await apiRequest(`/storage/buckets/${bucketId}/files/${fileId}`, 'DELETE');
    } catch (e) {
      // Ignore
    }

    // 2. Upload
    const formData = new FormData();
    formData.append('fileId', fileId);
    const blob = new Blob([fileContent], { type: contentType });
    formData.append('file', blob, path.basename(filePath));

    await apiRequest(`/storage/buckets/${bucketId}/files`, 'POST', formData, true);
    return true;
  } catch (err) {
    console.error(`  ✖ Failed to upload file ${filePath} to bucket ${bucketId}:`, err.message);
    return false;
  }
}

// Upload directory recursively to specific bucket using path mapping callback
async function uploadDirToBucket(bucketId, srcDir, storagePrefix, pathMapFn) {
  const entries = await fs.readdir(srcDir, { withFileTypes: true });

  for (let entry of entries) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = `${storagePrefix}/${entry.name}`;

    if (entry.isDirectory()) {
      await uploadDirToBucket(bucketId, srcPath, destPath, pathMapFn);
    } else {
      const fileId = pathMapFn(destPath, entry.name);
      const ext = path.extname(entry.name).toLowerCase();
      const contentType = {
        '.html': 'text/html; charset=utf-8',
        '.css': 'text/css; charset=utf-8',
        '.js': 'application/javascript; charset=utf-8',
        '.json': 'application/json; charset=utf-8',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.svg': 'image/svg+xml',
        '.webp': 'image/webp',
      }[ext] || 'application/octet-stream';

      console.log(`  -> Uploading asset: ${destPath}`);
      await uploadFileToBucket(bucketId, fileId, srcPath, contentType);
    }
  }
}

async function migrate() {
  console.log("\x1b[36m=== Starting Complete Appwrite Data & Asset Transfer ===\x1b[0m\n");
  const dataDir = path.join(process.cwd(), 'data');

  let slugs = [];
  try {
    const entries = await fs.readdir(dataDir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory() && entry.name !== '...' && entry.name !== '.DS_Store') {
        const sourcePath = path.join(dataDir, entry.name, 'source.json');
        try {
          await fs.access(sourcePath);
          slugs.push(entry.name);
        } catch (e) {
          // Ignore
        }
      }
    }
  } catch (err) {
    console.error("\x1b[31m✖ Error reading local data directory:\x1b[0m", err.message);
    process.exit(1);
  }

  console.log(`Found ${slugs.length} dynamic websites to migrate.\n`);

  for (const slug of slugs) {
    console.log(`\x1b[35m--- Migrating: ${slug} ---\x1b[0m`);

    // 1. Migrate Database Metadata Document
    console.log(" 📝 Migrating database record...");
    const sourcePath = path.join(dataDir, slug, 'source.json');
    const sourceDataContent = await fs.readFile(sourcePath, 'utf-8');
    const sourceData = JSON.parse(sourceDataContent);

    const documentData = {
      name: sourceData.clinic?.name || slug,
      rating: String(sourceData.business?.rating || ''),
      review_count: String(sourceData.business?.reviewCount || ''),
      address: sourceData.clinic?.address?.full || '',
      phone: sourceData.clinic?.contact?.phone || '',
      image_urls: sourceData.media ? [
        ...(sourceData.media.clinicImages || []),
        ...(sourceData.media.treatmentImages || []),
        ...(sourceData.media.otherImages || [])
      ] : [],
      reviews: JSON.stringify(sourceData.reviews || []),
      media: JSON.stringify(sourceData.media || {}),
      map_embed_url: sourceData.clinic?.mapEmbedUrl || '',
      source_data: sourceDataContent
    };

    const docId = crypto.createHash('md5').update(slug).digest('hex');

    try {
      await apiRequest(`/databases/${DATABASE_ID}/collections/${COLLECTION_ID}/documents`, 'POST', {
        documentId: docId,
        data: documentData
      });
      console.log("  \x1b[32m✔ Created database record.\x1b[0m");
    } catch (err) {
      if (err.message.includes("already exists") || err.message.includes("conflict")) {
        try {
          await apiRequest(`/databases/${DATABASE_ID}/collections/${COLLECTION_ID}/documents/${docId}`, 'PATCH', {
            data: documentData
          });
          console.log("  \x1b[33mℹ Database record already exists. Updated.\x1b[0m");
        } catch (patchErr) {
          console.error("  ✖ Failed to update database record:", patchErr.message);
        }
      } else {
        console.error("  ✖ Failed to create database record:", err.message);
      }
    }

    await delay(1000);

    // 2. Migrate Scraped Images
    console.log(" 🖼 Migrating processed images...");
    const imagesDir = path.join(dataDir, slug, 'images');
    try {
      await fs.access(imagesDir);
      const imgEntries = await fs.readdir(imagesDir, { withFileTypes: true });

      for (let img of imgEntries) {
        if (img.isFile() && !img.name.startsWith('.')) {
          const imgPath = path.join(imagesDir, img.name);
          const fileId = crypto.createHash('md5').update(`${slug}_${img.name}`).digest('hex');
          console.log(`  -> Uploading image: ${img.name} (File ID: ${fileId})`);
          await uploadFileToBucket('scraped_images', fileId, imgPath, 'image/jpeg');
        }
      }
      console.log("  \x1b[32m✔ Images successfully uploaded.\x1b[0m");
    } catch (err) {
      console.log("  ℹ No processed images directory found. Skipping image uploads.");
    }

    await delay(1000);

    // 3. Migrate Package Templates Web assets
    console.log(" 🌐 Migrating packaged HTML/CSS dynamic websites...");
    const websiteDir = path.join(dataDir, slug, 'website');
    try {
      await fs.access(websiteDir);
      const templates = await fs.readdir(websiteDir, { withFileTypes: true });

      for (let t of templates) {
        if (t.isDirectory()) {
          const templatePath = path.join(websiteDir, t.name);
          console.log(`  Package: ${t.name}`);
          
          await uploadDirToBucket(
            'templates', 
            templatePath, 
            `${slug}/${t.name}`,
            (destPath) => crypto.createHash('md5').update(destPath).digest('hex')
          );
        }
      }
      console.log("  \x1b[32m✔ Packaged template websites successfully uploaded.\x1b[0m");
    } catch (err) {
      console.log("  ℹ No compiled static HTML website outputs found. Skipping template website uploads.");
    }

    console.log("");
  }

  console.log("\x1b[32m=== All Data and Assets Migrated Successfully to Appwrite! ===\x1b[0m");
}

migrate().catch(err => {
  console.error("\x1b[31m✖ Migration failed:\x1b[0m", err.message);
});
