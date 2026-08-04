/**
 * Opt-in: pull specific clients from Appwrite into the essential local set
 * (data/{slug}/source.json). Does not run automatically on preview.
 *
 * Usage:
 *   node scripts/sync_clients_to_json.js navaneeth-interiors another-slug
 *   node scripts/sync_clients_to_json.js --all   # only if you really want every Appwrite doc locally
 */

const fs = require('fs/promises');
const path = require('path');
const crypto = require('crypto');

function loadEnv() {
  const files = ['.env', '.env.local', '.env.production'];
  for (const file of files) {
    try {
      const content = require('fs').readFileSync(path.join(process.cwd(), file), 'utf-8');
      content.split('\n').forEach((line) => {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) return;
        const [key, ...value] = trimmed.split('=');
        if (key && value) {
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

async function apiRequest(apiPath) {
  const res = await fetch(`${ENDPOINT}${apiPath}`, {
    headers: {
      'X-Appwrite-Project': PROJECT_ID,
      'X-Appwrite-Key': API_KEY,
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || `HTTP ${res.status}`);
  return data;
}

async function writeLocal(slug, data) {
  const dir = path.join(process.cwd(), 'data', slug);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(path.join(dir, 'source.json'), JSON.stringify(data, null, 2), 'utf-8');
}

async function syncSlug(slug) {
  const docId = getDocId(slug);
  const doc = await apiRequest(`/databases/${DATABASE_ID}/collections/${COLLECTION_ID}/documents/${docId}`);
  if (!doc?.source_data) throw new Error('No source_data on document');
  const data = JSON.parse(doc.source_data);
  const hrSlug = data.clinic?.slug || slug;
  await writeLocal(hrSlug, data);
  return hrSlug;
}

async function listAllSlugs() {
  const docs = [];
  let offset = 0;
  const limit = 100;
  while (true) {
    const page = await apiRequest(
      `/databases/${DATABASE_ID}/collections/${COLLECTION_ID}/documents?queries[]=${encodeURIComponent(
        `limit(${limit})`
      )}&queries[]=${encodeURIComponent(`offset(${offset})`)}`
    );
    docs.push(...(page.documents || []));
    if (!page.documents?.length || page.documents.length < limit) break;
    offset += limit;
  }
  return docs.map((doc) => {
    try {
      const json = doc.source_data ? JSON.parse(doc.source_data) : {};
      return json.clinic?.slug || doc.$id;
    } catch {
      return doc.$id;
    }
  });
}

async function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.log('Usage:');
    console.log('  node scripts/sync_clients_to_json.js <slug> [slug...]');
    console.log('  node scripts/sync_clients_to_json.js --all');
    process.exit(1);
  }

  const slugs = args.includes('--all') ? await listAllSlugs() : args.filter((a) => a !== '--all');
  console.log(`Syncing ${slugs.length} client(s) → data/{slug}/source.json\n`);

  let ok = 0;
  for (const slug of slugs) {
    try {
      const saved = await syncSlug(slug);
      console.log(`✓ ${slug} → data/${saved}/source.json`);
      ok++;
    } catch (err) {
      console.error(`✖ ${slug}: ${err.message}`);
    }
  }

  console.log(`\nDone. ${ok}/${slugs.length} saved.`);
}

main();
