/**
 * Standalone Next.js Project Exporter
 * 
 * Generates a self-contained Next.js project at build/[slug]/ that:
 * - Reads all data from a local source.json (no DB)
 * - Has all images downloaded to public/images/ (no CDN)
 * - Can be independently built: cd build/[slug] && npm install && npm run build
 * - Produces a static build/[slug]/out/ folder
 * 
 * Usage: node scripts/export_standalone.js <slug> <templateId>
 */

const fs = require('fs/promises');
const fsSync = require('fs');
const path = require('path');
const crypto = require('crypto');

// Load env vars
function loadEnv() {
  const files = ['.env', '.env.local', '.env.production'];
  for (const file of files) {
    try {
      const content = fsSync.readFileSync(path.join(process.cwd(), file), 'utf-8');
      content.split('\n').forEach(line => {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) return;
        const [key, ...value] = trimmed.split('=');
        if (key && value) process.env[key.trim()] = value.join('=').trim().replace(/^["']|["']$/g, '');
      });
    } catch (e) {
      // Ignore if file doesn't exist
    }
  }
}

loadEnv();

const PROJECT_ROOT = process.cwd();
const ACTIVE_TEMPLATES = ['template1', 'template2', 'template3', 'template4', 'template6', 'template7', 'template10'];

// Unsplash fallback images used in interiorContent.ts
const UNSPLASH_FALLBACKS = {
  home: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=2000",
  services: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=2000",
  gallery: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=2000",
  guides: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=2000",
  about: "https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&q=80&w=2000",
  contact: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=2000",
  designer: "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&q=80&w=1200",
};

async function downloadImage(url, destPath) {
  try {
    const response = await fetch(url, {
      redirect: 'follow',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'Accept': 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8',
        'Referer': 'https://www.google.com/',
      }
    });
    if (!response.ok) {
      console.warn(`  ⚠️ Failed to download ${url}: HTTP ${response.status}`);
      return false;
    }
    const arrayBuffer = await response.arrayBuffer();
    await fs.writeFile(destPath, Buffer.from(arrayBuffer));
    return true;
  } catch (err) {
    console.warn(`  ⚠️ Error downloading ${url}: ${err.message}`);
    return false;
  }
}

async function copyDir(src, dest) {
  await fs.mkdir(dest, { recursive: true });
  const entries = await fs.readdir(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath);
    } else {
      await fs.copyFile(srcPath, destPath);
    }
  }
}

function transformSourceCode(content, templateId, slug) {
  let result = content;

  // 1. Replace dataBuilder imports with sourceData
  result = result.replace(
    /import\s*\{([^}]*)\}\s*from\s*['"]@\/lib\/dataBuilder['"]/g,
    (match, imports) => {
      // Keep only readSourceConfig and getAllSlugs, drop getDocId
      const kept = imports
        .split(',')
        .map(s => s.trim())
        .filter(s => s === 'readSourceConfig' || s === 'getAllSlugs')
        .join(', ');
      if (!kept) return '// dataBuilder import removed (standalone)';
      return `import { ${kept} } from '@/lib/sourceData'`;
    }
  );

  // 2. Remove appwrite imports entirely
  result = result.replace(
    /import\s*\{[^}]*\}\s*from\s*['"]@\/lib\/appwrite['"];?\n?/g,
    '// appwrite import removed (standalone)\n'
  );
  result = result.replace(
    /import\s*\{[^}]*\}\s*from\s*['"]\.\.?\/appwrite['"];?\n?/g,
    '// appwrite import removed (standalone)\n'
  );

  // 3. Remove generateStaticParams exports
  result = result.replace(
    /export\s+async\s+function\s+generateStaticParams\s*\(\s*\)\s*\{[\s\S]*?\n\}\n?/g,
    ''
  );

  // 4. Rewrite basePath from `/designwebsite/templateX/${slug}` to ``
  // Handle template literal pattern
  const basePathLiteral = new RegExp(
    'const\\s+basePath\\s*=\\s*`/designwebsite/' + templateId + '/\\$\\{slug\\}`',
    'g'
  );
  result = result.replace(basePathLiteral, "const basePath = ``");

  // Handle direct string pattern
  result = result.replace(
    new RegExp(`const\\s+basePath\\s*=\\s*'/designwebsite/${templateId}/[^']*'`, 'g'),
    "const basePath = ``"
  );

  // 5. Transform page components that take params: Promise<{ slug: string }>
  // Replace the pattern where slug is extracted from params with direct slug from source.json
  // Pattern: const resolvedParams = await params; const { slug } = resolvedParams;
  result = result.replace(
    /const\s+resolvedParams\s*=\s*await\s+params\s*;\s*\n\s*const\s*\{\s*slug\s*\}\s*=\s*resolvedParams\s*;/g,
    `const slug = ''; // standalone: slug not needed for data loading`
  );

  // 6. Transform readSourceConfig calls - in standalone, no slug is needed
  // BUT keep the template parameter if present
  result = result.replace(
    /await\s+readSourceConfig\(\s*slug\s*,\s*['"]([^'"]+)['"]\s*\)/g,
    `await readSourceConfig(undefined, '$1')`
  );
  result = result.replace(
    /await\s+readSourceConfig\(\s*slug\s*\)/g,
    'await readSourceConfig()'
  );

  // 7. Fix PageProps / LayoutProps type - remove Promise<{ slug: string }> references
  result = result.replace(
    /params:\s*Promise<\{\s*slug:\s*string\s*\}>/g,
    'params?: any'
  );

  return result;
}

async function exportStandalone(slug, templateId) {
  console.log(`\n🚀 Exporting standalone Next.js project for "${slug}" with template "${templateId}"...\n`);

  if (!ACTIVE_TEMPLATES.includes(templateId)) {
    throw new Error(`Invalid template ID: ${templateId}. Must be one of: ${ACTIVE_TEMPLATES.join(', ')}`);
  }

  const buildDir = path.join(PROJECT_ROOT, 'build', slug);
  const templateSrcDir = path.join(PROJECT_ROOT, 'app', 'designwebsite', templateId, '[slug]');

  // Verify template exists
  try {
    await fs.access(templateSrcDir);
  } catch {
    throw new Error(`Template directory not found: ${templateSrcDir}`);
  }

  // 1. Clean and create build directory
  console.log('📁 Creating build directory...');
  await fs.rm(buildDir, { recursive: true, force: true });
  await fs.mkdir(buildDir, { recursive: true });

  // 2. Load source data
  console.log('📄 Loading source data...');
  let sourceData;

  // Try loading from Appwrite first via the local data file
  const localSourcePath = path.join(PROJECT_ROOT, 'data', slug, 'source.json');
  try {
    const content = await fs.readFile(localSourcePath, 'utf-8');
    sourceData = JSON.parse(content);
  } catch {
    throw new Error(`Source config not found at ${localSourcePath}`);
  }

  // Inject selected_template
  sourceData.selected_template = templateId;

  // 3. Download all images and rewrite URLs
  console.log('🖼️  Downloading images...');
  const imagesDir = path.join(buildDir, 'public', 'images');
  await fs.mkdir(imagesDir, { recursive: true });

  const imageUrlMap = new Map(); // old URL -> new local path

  // Download media images
  for (const category of ['clinicImages', 'treatmentImages', 'otherImages']) {
    const images = sourceData.media?.[category];
    if (!Array.isArray(images)) continue;

    for (let i = 0; i < images.length; i++) {
      const url = images[i];
      if (!url) continue;

      const filename = `${category}-${i + 1}.jpg`;
      const destPath = path.join(imagesDir, filename);
      const localPath = `/images/${filename}`;

      const downloaded = await downloadImage(url, destPath);
      if (downloaded) {
        imageUrlMap.set(url, localPath);
        sourceData.media[category][i] = localPath;
        console.log(`  ✅ ${filename}`);
      } else {
        // Try local fallback from data/[slug]/images/
        const localFallback = path.join(PROJECT_ROOT, 'data', slug, 'images', filename);
        try {
          await fs.access(localFallback);
          await fs.copyFile(localFallback, destPath);
          imageUrlMap.set(url, localPath);
          sourceData.media[category][i] = localPath;
          console.log(`  ✅ ${filename} (from local cache)`);
        } catch {
          console.warn(`  ⚠️ Could not download or find local fallback for ${filename}`);
        }
      }
    }
  }

  // Download Unsplash fallback images
  console.log('🖼️  Downloading fallback stock images...');
  const fallbackMap = {};
  for (const [key, url] of Object.entries(UNSPLASH_FALLBACKS)) {
    const filename = `fallback-${key}.jpg`;
    const destPath = path.join(imagesDir, filename);
    const localPath = `/images/${filename}`;

    const downloaded = await downloadImage(url, destPath);
    if (downloaded) {
      fallbackMap[url] = localPath;
      console.log(`  ✅ ${filename}`);
    }
  }

  // 4. Write source.json to build root
  console.log('📝 Writing source.json...');
  await fs.writeFile(
    path.join(buildDir, 'source.json'),
    JSON.stringify(sourceData, null, 2),
    'utf-8'
  );

  // 5. Create package.json
  console.log('📦 Creating package.json...');
  const packageJson = {
    name: slug,
    version: "1.0.0",
    private: true,
    scripts: {
      dev: "next dev",
      build: "next build",
      start: "next start"
    }
  };
  await fs.writeFile(
    path.join(buildDir, 'package.json'),
    JSON.stringify(packageJson, null, 2),
    'utf-8'
  );

  // 6. Create next.config.ts (static export mode)
  console.log('⚙️  Creating next.config.ts...');
  const nextConfig = `import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
`;
  await fs.writeFile(path.join(buildDir, 'next.config.ts'), nextConfig, 'utf-8');

  // 7. Copy tsconfig.json
  console.log('📋 Copying tsconfig.json...');
  const tsconfig = {
    compilerOptions: {
      target: "ES2017",
      lib: ["dom", "dom.iterable", "esnext"],
      allowJs: true,
      skipLibCheck: true,
      strict: false,
      noEmit: true,
      esModuleInterop: true,
      module: "esnext",
      moduleResolution: "bundler",
      resolveJsonModule: true,
      isolatedModules: true,
      jsx: "preserve",
      incremental: true,
      plugins: [{ name: "next" }],
      paths: {
        "@/*": ["./*"]
      }
    },
    include: ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
    exclude: ["node_modules"]
  };
  await fs.writeFile(
    path.join(buildDir, 'tsconfig.json'),
    JSON.stringify(tsconfig, null, 2),
    'utf-8'
  );

  // 8. Copy postcss.config.mjs
  console.log('📋 Copying postcss.config.mjs...');
  await fs.copyFile(
    path.join(PROJECT_ROOT, 'postcss.config.mjs'),
    path.join(buildDir, 'postcss.config.mjs')
  );

  // 9. Copy globals.css
  console.log('🎨 Copying globals.css...');
  await fs.mkdir(path.join(buildDir, 'app'), { recursive: true });
  await fs.copyFile(
    path.join(PROJECT_ROOT, 'app', 'globals.css'),
    path.join(buildDir, 'app', 'globals.css')
  );

  // 10. Copy lib files
  console.log('📚 Copying lib files...');
  const libDir = path.join(buildDir, 'lib');
  await fs.mkdir(libDir, { recursive: true });

  // sourceData.ts (the standalone data reader)
  await fs.copyFile(
    path.join(PROJECT_ROOT, 'scripts', 'templates', 'sourceData.ts'),
    path.join(libDir, 'sourceData.ts')
  );

  // copyCleaner.ts (copied verbatim)
  await fs.copyFile(
    path.join(PROJECT_ROOT, 'lib', 'copyCleaner.ts'),
    path.join(libDir, 'copyCleaner.ts')
  );

  // interiorContent.ts - copy and rewrite Unsplash URLs to local paths
  let interiorContent = await fs.readFile(
    path.join(PROJECT_ROOT, 'lib', 'interiorContent.ts'),
    'utf-8'
  );
  for (const [url, localPath] of Object.entries(fallbackMap)) {
    // Escape URL for regex
    const escapedUrl = url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    interiorContent = interiorContent.replace(new RegExp(escapedUrl, 'g'), localPath);
  }
  await fs.writeFile(path.join(libDir, 'interiorContent.ts'), interiorContent, 'utf-8');

  // 11. Copy shared components
  console.log('🧩 Copying shared components...');
  const componentsDir = path.join(buildDir, 'components');
  await fs.mkdir(componentsDir, { recursive: true });

  // Copy ReviewsSlider.tsx
  try {
    await fs.copyFile(
      path.join(PROJECT_ROOT, 'components', 'ReviewsSlider.tsx'),
      path.join(componentsDir, 'ReviewsSlider.tsx')
    );
  } catch {
    console.warn('  ⚠️ ReviewsSlider.tsx not found, skipping.');
  }

  // 12. Copy and transform template source files
  console.log(`🔄 Copying and transforming template "${templateId}" files...`);

  const appDir = path.join(buildDir, 'app');

  // Recursively copy all tsx files from the template, transforming each
  async function copyAndTransformDir(srcDir, destDir, relPath = '') {
    await fs.mkdir(destDir, { recursive: true });
    const entries = await fs.readdir(srcDir, { withFileTypes: true });

    for (const entry of entries) {
      const srcPath = path.join(srcDir, entry.name);
      const destPath = path.join(destDir, entry.name);

      if (entry.isDirectory()) {
        // For template4's components subdirectory
        await copyAndTransformDir(srcPath, destPath, path.join(relPath, entry.name));
      } else if (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts')) {
        let content = await fs.readFile(srcPath, 'utf-8');

        // Transform the source code
        content = transformSourceCode(content, templateId, slug);

        // Rewrite any remaining CDN image URLs to local paths
        for (const [url, localPath] of imageUrlMap.entries()) {
          const escapedUrl = url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          content = content.replace(new RegExp(escapedUrl, 'g'), localPath);
        }
        for (const [url, localPath] of Object.entries(fallbackMap)) {
          const escapedUrl = url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          content = content.replace(new RegExp(escapedUrl, 'g'), localPath);
        }

        await fs.writeFile(destPath, content, 'utf-8');
        console.log(`  📄 ${path.join(relPath, entry.name)}`);
      } else {
        // Copy other files as-is (css, etc.)
        await fs.copyFile(srcPath, destPath);
      }
    }
  }

  await copyAndTransformDir(templateSrcDir, appDir);

  // 13. Create root layout.tsx wrapper (the template's layout.tsx becomes the main layout)
  // The template layout is already at app/layout.tsx from the copy.
  // We need to ensure it has the html/body wrapper and metadata.
  // Read the copied layout and wrap it properly if it doesn't have html/body.
  const layoutPath = path.join(appDir, 'layout.tsx');
  let layoutContent = await fs.readFile(layoutPath, 'utf-8');

  // Check if layout already has <html> tag
  if (!layoutContent.includes('<html')) {
    // The template layout doesn't include html/body — we need a root layout wrapper
    // Rename current layout to _templateLayout.tsx and create a new root layout
    const cleanName = sourceData.clinic?.name || slug;

    const rootLayout = `import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '${cleanName.replace(/'/g, "\\'")} — Interior Design Studio',
  description: '${(sourceData.clinic?.description || 'Premium interior design services').replace(/'/g, "\\'")}',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
`;
    // The template layout wraps children but doesn't have html/body.
    // We'll create a separate root layout and keep the template layout as a nested layout.
    // Actually, let's check — if the template layout has fonts, we'll merge them.
    
    // Rename current layout to _layout.tsx and write new root layout
    // Actually: better approach — just ensure the template layout is the root layout
    // by adding html/body around it.
    
    // For simplicity: write a proper root layout that wraps everything
    await fs.writeFile(layoutPath, rootLayout, 'utf-8');
    
    // Move original layout to a group route layout
    // Actually the simplest approach: make the template layout into a (template) group route layout
    // and have the root layout be minimal.
    
    // Let me restructure: move all template files into a (template) group route
    // so the root layout is clean and the template layout handles styling.

    // Move files from app/ to app/(site)/
    const siteDir = path.join(appDir, '(site)');
    await fs.mkdir(siteDir, { recursive: true });

    const appEntries = await fs.readdir(appDir, { withFileTypes: true });
    for (const entry of appEntries) {
      if (entry.name === 'layout.tsx' || entry.name === 'globals.css' || entry.name === '(site)') continue;
      const src = path.join(appDir, entry.name);
      const dest = path.join(siteDir, entry.name);
      await fs.rename(src, dest);
    }

    // Restore template layout as the group layout
    const templateLayoutContent = transformSourceCode(
      await fs.readFile(path.join(PROJECT_ROOT, 'app', 'designwebsite', templateId, '[slug]', 'layout.tsx'), 'utf-8'),
      templateId,
      slug
    );

    // Rewrite CDN URLs in the template layout too
    let finalTemplateLayout = templateLayoutContent;
    for (const [url, localPath] of imageUrlMap.entries()) {
      const escapedUrl = url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      finalTemplateLayout = finalTemplateLayout.replace(new RegExp(escapedUrl, 'g'), localPath);
    }
    for (const [url, localPath] of Object.entries(fallbackMap)) {
      const escapedUrl = url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      finalTemplateLayout = finalTemplateLayout.replace(new RegExp(escapedUrl, 'g'), localPath);
    }

    await fs.writeFile(path.join(siteDir, 'layout.tsx'), finalTemplateLayout, 'utf-8');
  }

  // 14. Copy public/images from root project (template static assets like hero placeholders)
  console.log('📁 Copying public template assets...');
  const rootPublicImages = path.join(PROJECT_ROOT, 'public', 'images');
  try {
    await fs.access(rootPublicImages);
    await copyDir(rootPublicImages, path.join(buildDir, 'public', 'images'));
  } catch {
    // No public/images, fine
  }

  // 15. Create global-error.tsx and not-found.tsx to prevent Next.js 16 static export issues
  console.log('🛡️  Creating error boundary pages...');
  const globalErrorTsx = `'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <h2>Something went wrong!</h2>
          <button onClick={() => reset()}>Try again</button>
        </div>
      </body>
    </html>
  );
}
`;
  await fs.writeFile(path.join(appDir, 'global-error.tsx'), globalErrorTsx, 'utf-8');

  const notFoundTsx = `export default function NotFound() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      <a href="/">Go Home</a>
    </div>
  );
}
`;
  await fs.writeFile(path.join(appDir, 'not-found.tsx'), notFoundTsx, 'utf-8');

  console.log(`\n✅ Standalone project exported to: build/${slug}/`);
  console.log(`   To build: cd build/${slug} && npm run build`);
  console.log(`   Output will be in: build/${slug}/out/\n`);
}

// CLI entrypoint
async function main() {
  const args = process.argv.slice(2);
  if (args.length < 2) {
    console.error('Usage: node scripts/export_standalone.js <slug> <templateId>');
    process.exit(1);
  }

  const [slug, templateId] = args;
  try {
    await exportStandalone(slug, templateId);
  } catch (err) {
    console.error('❌ Export failed:', err.message || err);
    process.exit(1);
  }
}

main();
