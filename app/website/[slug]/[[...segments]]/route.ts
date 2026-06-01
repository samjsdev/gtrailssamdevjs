import fs from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';
import { getGeneratedWebsiteRoot } from '@/lib/websiteBuild';
import crypto from 'crypto';
import { storage } from '@/lib/appwrite';
import { readSourceConfig } from '@/lib/dataBuilder';

type RouteParams = {
  slug: string;
  segments?: string[];
};

const MIME_BY_EXT: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
};

function isInsideBase(baseDir: string, targetPath: string): boolean {
  const normalizedBase = path.resolve(baseDir);
  const normalizedTarget = path.resolve(targetPath);
  return normalizedTarget === normalizedBase || normalizedTarget.startsWith(`${normalizedBase}${path.sep}`);
}

function getCandidateFiles(baseDir: string, segments: string[]): string[] {
  if (segments.length === 0) {
    return [path.join(baseDir, 'index.html')];
  }

  const joined = path.join(...segments);
  if (path.extname(joined)) {
    return [path.join(baseDir, joined)];
  }

  return [
    path.join(baseDir, joined, 'index.html'),
    path.join(baseDir, `${joined}.html`),
  ];
}

function contentTypeFor(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  return MIME_BY_EXT[ext] || 'application/octet-stream';
}

async function resolveFilePath(baseDir: string, segments: string[]): Promise<string | null> {
  for (const candidate of getCandidateFiles(baseDir, segments)) {
    if (!isInsideBase(baseDir, candidate)) continue;

    try {
      const stats = await fs.stat(candidate);
      if (stats.isFile()) return candidate;
    } catch {
      // Try the next candidate.
    }
  }

  return null;
}

export const dynamic = 'force-dynamic';

export async function GET(_request: Request, { params }: { params: Promise<RouteParams> }) {
  const { slug, segments: rawSegments } = await params;

  if (!slug) {
    return NextResponse.json({ error: 'Slug not found' }, { status: 404 });
  }

  const segments = Array.isArray(rawSegments) ? rawSegments : [];
  if (segments.some((segment) => !segment || segment === '.' || segment === '..')) {
    return NextResponse.json({ error: 'Invalid path segment' }, { status: 400 });
  }

  // Fetch the configuration for this slug from Appwrite / local files
  const data = await readSourceConfig(slug);
  if (!data) {
    return NextResponse.json({ error: 'Business profile not found' }, { status: 404 });
  }

  const template = data.selected_template;
  if (!template) {
    // Return an elegant "under construction" response
    return new NextResponse(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${data.clinic?.name || 'Interior Design Studio'} | Site Not Published</title>
        <style>
          body { font-family: system-ui, -apple-system, sans-serif; background: #fafafa; color: #1f2937; display: flex; align-items: center; justify-content: center; min-h-screen: 100vh; height: 100vh; margin: 0; padding: 1.5rem; box-sizing: border-box; text-align: center; }
          .card { background: white; padding: 3rem 2.5rem; border-radius: 1.5rem; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.04); border: 1px solid #f3f4f6; max-width: 32rem; width: 100%; }
          .icon { font-size: 3rem; margin-bottom: 1.5rem; color: #3b82f6; display: block; }
          h1 { font-size: 1.75rem; font-weight: 800; color: #111827; margin: 0 0 0.75rem 0; letter-spacing: -0.025em; }
          p { margin: 0 0 2.5rem 0; line-height: 1.6; color: #6b7280; font-size: 0.975rem; }
          a { background: #111827; color: white; padding: 0.875rem 1.75rem; text-decoration: none; border-radius: 0.75rem; font-weight: 600; font-size: 0.875rem; transition: background 0.2s; display: inline-block; }
          a:hover { background: #374151; }
        </style>
      </head>
      <body>
        <div class="card">
          <span class="icon">✨</span>
          <h1>Website Under Construction</h1>
          <p>The interior design website for <strong>${data.clinic?.name || 'this studio'}</strong> has been created, but hasn't been published yet. Please select a template design and click Publish in the website editor dashboard to launch the live site.</p>
          <a href="/preview/${slug}">Select Design &amp; Publish</a>
        </div>
      </body>
      </html>
    `, {
      headers: { 
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-store'
      }
    });
  }

  // 1. Try Appwrite Storage first
  const storagePath = segments.length === 0 
    ? `${slug}/${template}/index.html`
    : `${slug}/${template}/${segments.join('/')}`;

  // If path doesn't have an extension, try index.html or .html candidates
  const candidates = [storagePath];
  if (!path.extname(storagePath)) {
    candidates.push(`${storagePath}/index.html`);
    candidates.push(`${storagePath}.html`);
  }

  for (const candidate of candidates) {
    try {
      // Appwrite file IDs are flat; generate a deterministic 32-character MD5 hash of the path
      const fileId = crypto.createHash('md5').update(candidate).digest('hex');
      const downloadUrl = storage.getFileDownload('templates', fileId);
      
      const res = await fetch(downloadUrl.toString());
      if (res.ok) {
        const arrayBuffer = await res.arrayBuffer();
        return new NextResponse(Buffer.from(arrayBuffer), {
          headers: {
            'Content-Type': contentTypeFor(candidate),
            'Cache-Control': 'no-store',
          },
        });
      }
    } catch {
      // Continue to next candidate
    }
  }

  // 2. Fallback to local file system
  const templateRoot = path.join(getGeneratedWebsiteRoot(slug), template);
  const filePath = await resolveFilePath(templateRoot, segments);

  if (filePath) {
    try {
      const fileBuffer = await fs.readFile(filePath);
      return new NextResponse(fileBuffer, {
        headers: {
          'Content-Type': contentTypeFor(filePath),
          'Cache-Control': 'no-store',
        },
      });
    } catch {
      // Continue to error if local read fails
    }
  }

  return NextResponse.json({ error: 'Published website file not found' }, { status: 404 });
}
