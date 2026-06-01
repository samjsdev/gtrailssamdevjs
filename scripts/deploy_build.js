const fs = require('fs/promises');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Try loading env vars if not present
if (!process.env.SB_SERVICEROLEKEY) {
  try {
    const envFile = require('fs').readFileSync(path.join(process.cwd(), '.env.local'), 'utf-8');
    envFile.split('\n').forEach(line => {
      const [key, ...value] = line.split('=');
      if (key && value) process.env[key.trim()] = value.join('=').trim().replace(/^["']|["']$/g, '');
    });
  } catch (e) {
    // Ignore if file doesn't exist
  }
}

// Supabase configuration
const anonKey = process.env.SB_ANONKEY || '';
const serviceKey = process.env.SB_SERVICEROLEKEY || '';

const getRefFromToken = (token) => {
  try {
    const parts = token.split('.');
    if (parts.length === 3) {
      const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString('utf-8'));
      return payload.ref || '';
    }
  } catch (e) {
    console.error('Error parsing token to extract Supabase project ref:', e);
  }
  return '';
};

const ref = getRefFromToken(serviceKey || anonKey);
const supabaseUrl = ref ? `https://${ref}.supabase.co` : '';
const supabase = (supabaseUrl && (serviceKey || anonKey)) 
  ? createClient(supabaseUrl, serviceKey || anonKey)
  : null;

if (!supabase) {
  console.warn('Supabase client could not be initialized. Check your SB_ANONKEY or SB_SERVICEROLEKEY.');
}

async function uploadFileToSupabase(filePath, storagePath) {
  if (!supabase) return;

  try {
    const fileContent = await fs.readFile(filePath);
    const ext = path.extname(filePath).toLowerCase();
    const contentType = {
      '.html': 'text/html',
      '.css': 'text/css',
      '.js': 'application/javascript',
      '.json': 'application/json',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.svg': 'image/svg+xml',
      '.webp': 'image/webp',
    }[ext] || 'application/octet-stream';

    const { error } = await supabase.storage
      .from('templates')
      .upload(storagePath, fileContent, {
        contentType,
        upsert: true
      });

    if (error) {
      console.error(`Failed to upload ${storagePath}:`, error.message);
    }
  } catch (err) {
    console.error(`Error uploading ${filePath} to ${storagePath}:`, err.message);
  }
}

async function uploadDirToSupabase(srcDir, storagePrefix) {
  if (!supabase) return;

  const entries = await fs.readdir(srcDir, { withFileTypes: true });

  for (let entry of entries) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = `${storagePrefix}/${entry.name}`;

    if (entry.isDirectory()) {
      await uploadDirToSupabase(srcPath, destPath);
    } else {
      await uploadFileToSupabase(srcPath, destPath);
    }
  }
}

async function copyDir(src, dest) {
  try {
    await fs.mkdir(dest, { recursive: true });
    const entries = await fs.readdir(src, { withFileTypes: true });

    for (let entry of entries) {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);

      if (entry.isDirectory()) {
        await copyDir(srcPath, destPath);
      } else {
        await fs.copyFile(srcPath, destPath);
      }
    }
  } catch (err) {
    if (err.code !== 'ENOENT') throw err;
  }
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function toPosix(value) {
  return value.split(path.sep).join('/');
}

function relativePrefix(fromDir, toDir) {
  const rel = toPosix(path.relative(fromDir, toDir));
  if (!rel) return './';
  return rel.endsWith('/') ? rel : `${rel}/`;
}

function getTemplateRouteBase(templateId, slug) {
  return `/designwebsite/${templateId}/${slug}`;
}

function rewriteHtmlForStatic({ html, slug, templateId, pageName, targetWebsiteDir, dataSlugDir }) {
  const currentPageDir = pageName
    ? path.join(targetWebsiteDir, pageName)
    : targetWebsiteDir;
  const nextPrefix = relativePrefix(currentPageDir, targetWebsiteDir);
  const imagesPrefix = relativePrefix(currentPageDir, path.join(targetWebsiteDir, 'images'));
  const mediaPrefix = relativePrefix(currentPageDir, path.join(dataSlugDir, 'images'));
  const routeBase = getTemplateRouteBase(templateId, slug);

  let output = html;

  // Make Next static assets template-relative, not root-relative.
  output = output.replace(/\/_next\//g, `${nextPrefix}_next/`);

  // Map app router links to packaged page folders (about-us/, services/, etc.).
  const routeRegex = new RegExp(`${escapeRegExp(routeBase)}(?:\\/([a-z0-9-]+))?\\/?`, 'gi');
  output = output.replace(routeRegex, (_match, section) => {
    const targetDir = section ? path.join(targetWebsiteDir, section) : targetWebsiteDir;
    return relativePrefix(currentPageDir, targetDir);
  });

  // Replace media API URLs with direct file paths to slug images.
  output = output.replace(/\/api\/media\?slug=[^"'<\s&]+(?:&amp;|&)file=([^"'<\s&]+)/gi, (_match, fileName) => {
    return `${mediaPrefix}${fileName}`;
  });

  // Replace public image URLs with copied template-local images folder.
  output = output.replace(/\/images\//g, imagesPrefix);

  return output;
}

async function moveTemplateOutputs() {
  const rootDir = process.cwd();
  const serverAppDir = path.join(rootDir, '.next', 'server', 'app', 'designwebsite');
  const dataDir = path.join(rootDir, 'data');
  const nextStaticDir = path.join(rootDir, '.next', 'static');
  const publicImagesDir = path.join(rootDir, 'public', 'images');

  // Check if .next/server/app/designwebsite exists
  try {
    await fs.access(serverAppDir);
  } catch (e) {
    console.error('`.next/server/app/designwebsite` directory not found. Did the build run successfully?');
    return;
  }

  // Get all slugs from data directory
  let dataFolders = [];
  try {
    const entries = await fs.readdir(dataDir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory() && entry.name !== '...' && entry.name !== '.DS_Store') {
        const sourcePath = path.join(dataDir, entry.name, 'source.json');
        try {
          await fs.access(sourcePath);
          dataFolders.push(entry.name);
        } catch (e) {
          // Ignore
        }
      }
    }
  } catch (e) {
    console.error('Could not read data directory.', e);
    return;
  }

  for (const slug of dataFolders) {
    console.log(`Processing template exports for slug: ${slug}`);

    // Map template source directories
    const templatesMap = [
      { id: 'template1', baseHtml: path.join(serverAppDir, 'template1', `${slug}.html`), subDir: path.join(serverAppDir, 'template1', slug) },
      { id: 'template2', baseHtml: path.join(serverAppDir, 'template2', `${slug}.html`), subDir: path.join(serverAppDir, 'template2', slug) },
      { id: 'template3', baseHtml: path.join(serverAppDir, 'template3', `${slug}.html`), subDir: path.join(serverAppDir, 'template3', slug) },
      { id: 'template4', baseHtml: path.join(serverAppDir, 'template4', `${slug}.html`), subDir: path.join(serverAppDir, 'template4', slug) },
      { id: 'template6', baseHtml: path.join(serverAppDir, 'template6', `${slug}.html`), subDir: path.join(serverAppDir, 'template6', slug) },
      { id: 'template10', baseHtml: path.join(serverAppDir, 'template10', `${slug}.html`), subDir: path.join(serverAppDir, 'template10', slug) },
    ];

    for (const t of templatesMap) {
      const targetWebsiteDir = path.join(dataDir, slug, 'website', t.id);
      const dataSlugDir = path.join(dataDir, slug);

      try {
        await fs.access(t.baseHtml);
        
        await fs.mkdir(targetWebsiteDir, { recursive: true });

        // Copy and rewrite the main index.html
        const baseHtmlContent = await fs.readFile(t.baseHtml, 'utf-8');
        const rewrittenBaseHtml = rewriteHtmlForStatic({
          html: baseHtmlContent,
          slug,
          templateId: t.id,
          pageName: '',
          targetWebsiteDir,
          dataSlugDir,
        });
        await fs.writeFile(path.join(targetWebsiteDir, 'index.html'), rewrittenBaseHtml, 'utf-8');

        // Copy all sub-pages like about-us.html into about-us/index.html
        try {
          const subEntries = await fs.readdir(t.subDir, { withFileTypes: true });
          for (let entry of subEntries) {
            if (entry.isFile() && entry.name.endsWith('.html')) {
              const pageName = entry.name.replace('.html', '');
              const targetPageDir = path.join(targetWebsiteDir, pageName);
              await fs.mkdir(targetPageDir, { recursive: true });

              const subHtmlContent = await fs.readFile(path.join(t.subDir, entry.name), 'utf-8');
              const rewrittenSubHtml = rewriteHtmlForStatic({
                html: subHtmlContent,
                slug,
                templateId: t.id,
                pageName,
                targetWebsiteDir,
                dataSlugDir,
              });
              await fs.writeFile(path.join(targetPageDir, 'index.html'), rewrittenSubHtml, 'utf-8');
            }
          }
        } catch (subErr) {
          // Ignore subpages if missing
        }

        // Copy the global `_next/static` folder
        const targetNextDir = path.join(targetWebsiteDir, '_next', 'static');
        await copyDir(nextStaticDir, targetNextDir);

        // Copy public image assets used by templates (hero images, etc.)
        const targetImagesDir = path.join(targetWebsiteDir, 'images');
        await copyDir(publicImagesDir, targetImagesDir);

        console.log(` -> Packaging local files for ${t.id} successfully.`);

        // Upload everything to Supabase
        if (supabase) {
          console.log(` -> Uploading ${t.id} to Supabase...`);
          await uploadDirToSupabase(targetWebsiteDir, `${slug}/${t.id}`);
          console.log(` -> Uploaded ${t.id} to Supabase successfully.`);
        }
      } catch (e) {
        console.warn(` -> Note: Source for ${t.id} not found (${t.baseHtml}). Skipping.`);
      }
    }
  }

  console.log('✅ Template exports fully packaged to `data/[slug]/website/`');
}

moveTemplateOutputs()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Migration failed:', err);
    process.exit(1);
  });
