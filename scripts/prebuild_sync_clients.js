/**
 * Before next build: refresh existing local clients from Appwrite backup.
 *
 * We only handle the few clients already in data/{slug}/source.json.
 * Appwrite is backup - this does NOT pull the entire DB.
 *
 * Skips when APPWgtrailskey is missing (uses committed JSON as-is).
 */

const { spawnSync } = require('child_process');
const path = require('path');
const fs = require('fs');

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

function listLocalSlugs() {
  const dataDir = path.join(process.cwd(), 'data');
  try {
    return fs
      .readdirSync(dataDir, { withFileTypes: true })
      .filter((e) => e.isDirectory() && fs.existsSync(path.join(dataDir, e.name, 'source.json')))
      .map((e) => e.name)
      .sort();
  } catch {
    return [];
  }
}

loadEnv();

const slugs = listLocalSlugs();
if (slugs.length === 0) {
  console.log('[prebuild] No local data/{slug}/source.json clients - nothing to refresh.');
  process.exit(0);
}

if (!process.env.APPWgtrailskey) {
  console.log(
    `[prebuild] APPWgtrailskey not set - using committed JSON for ${slugs.length} client(s).`
  );
  process.exit(0);
}

console.log(
  `[prebuild] Refreshing ${slugs.length} local client(s) from Appwrite backup to data/{slug}/source.json...`
);
const result = spawnSync(
  process.execPath,
  [path.join(__dirname, 'sync_clients_to_json.js'), ...slugs],
  { stdio: 'inherit', env: process.env }
);

if (result.status !== 0) {
  console.warn('[prebuild] Backup refresh failed - continuing with committed JSON.');
}

process.exit(0);

