/**
 * Push all local data/{slug}/source.json clients to Appwrite backup.
 * Ensures every essential client exists in both stores.
 *
 * Usage: node scripts/push_json_to_appwrite.js
 */

const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

function loadEnv() {
  for (const file of ['.env', '.env.local', '.env.production']) {
    try {
      const content = fs.readFileSync(path.join(process.cwd(), file), 'utf-8');
      content.split('\n').forEach((line) => {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) return;
        const [key, ...value] = trimmed.split('=');
        if (key && value.length && process.env[key.trim()] === undefined) {
          process.env[key.trim()] = value.join('=').trim().replace(/^["']|["']$/g, '');
        }
      });
    } catch {}
  }
}

loadEnv();

const PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '6a1cf32a002c668912cc';
const ENDPOINT = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://sgp.cloud.appwrite.io/v1';
const API_KEY = process.env.APPWgtrailskey || '';
const DATABASE_ID = 'gtrails';
const COLLECTION_ID = 'scraped_data';

if (!API_KEY) {
  console.error('✖ APPWgtrailskey not found in environment.');
  process.exit(1);
}

function getDocId(slug) {
  return /^[a-f0-9]{32}$/i.test(slug) ? slug : crypto.createHash('md5').update(slug).digest('hex');
}

function listLocalSlugs() {
  const dataDir = path.join(process.cwd(), 'data');
  return fs
    .readdirSync(dataDir, { withFileTypes: true })
    .filter((e) => e.isDirectory() && fs.existsSync(path.join(dataDir, e.name, 'source.json')))
    .map((e) => e.name)
    .sort();
}

async function upsert(slug, data) {
  const docId = getDocId(slug);
  const body = {
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

  const headers = {
    'X-Appwrite-Project': PROJECT_ID,
    'X-Appwrite-Key': API_KEY,
    'Content-Type': 'application/json',
  };

  const createRes = await fetch(
    `${ENDPOINT}/databases/${DATABASE_ID}/collections/${COLLECTION_ID}/documents`,
    {
      method: 'POST',
      headers,
      body: JSON.stringify({ documentId: docId, data: body }),
    }
  );

  if (createRes.ok) return 'created';

  const createErr = await createRes.json().catch(() => ({}));
  if (createRes.status === 409 || /already exists/i.test(createErr.message || '')) {
    const updateRes = await fetch(
      `${ENDPOINT}/databases/${DATABASE_ID}/collections/${COLLECTION_ID}/documents/${docId}`,
      {
        method: 'PATCH',
        headers,
        body: JSON.stringify({ data: body }),
      }
    );
    if (!updateRes.ok) {
      const updateErr = await updateRes.json().catch(() => ({}));
      throw new Error(updateErr.message || `HTTP ${updateRes.status}`);
    }
    return 'updated';
  }

  throw new Error(createErr.message || `HTTP ${createRes.status}`);
}

async function main() {
  const slugs = listLocalSlugs();
  console.log(`Pushing ${slugs.length} local client(s) → Appwrite backup\n`);

  let ok = 0;
  for (const slug of slugs) {
    try {
      const data = JSON.parse(
        fs.readFileSync(path.join(process.cwd(), 'data', slug, 'source.json'), 'utf-8')
      );
      const action = await upsert(data.clinic?.slug || slug, data);
      console.log(`✓ ${slug} (${action})`);
      ok++;
    } catch (err) {
      console.error(`✖ ${slug}: ${err.message}`);
    }
  }

  console.log(`\nDone. ${ok}/${slugs.length} stored in Appwrite.`);
  process.exit(ok === slugs.length ? 0 : 1);
}

main();
