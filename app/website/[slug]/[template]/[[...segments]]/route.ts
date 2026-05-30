import fs from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';
import { REQUIRED_TEMPLATE_IDS, getGeneratedWebsiteRoot } from '@/lib/websiteBuild';
import { supabase } from '@/lib/supabase';

type RouteParams = {
  slug: string;
  template: string;
  segments?: string[];
};

const VALID_TEMPLATES = new Set<string>(REQUIRED_TEMPLATE_IDS);

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
  const { slug, template, segments: rawSegments } = await params;

  if (!slug || !template || !VALID_TEMPLATES.has(template)) {
    return NextResponse.json({ error: 'Template not found' }, { status: 404 });
  }

  const segments = Array.isArray(rawSegments) ? rawSegments : [];
  if (segments.some((segment) => !segment || segment === '.' || segment === '..')) {
    return NextResponse.json({ error: 'Invalid path segment' }, { status: 400 });
  }

  // 1. Try Supabase Storage first
  const storagePath = segments.length === 0 
    ? `${slug}/${template}/index.html`
    : `${slug}/${template}/${segments.join('/')}`;

  // If path doesn't have an extension, try index.html or .html
  const candidates = [storagePath];
  if (!path.extname(storagePath)) {
    candidates.push(`${storagePath}/index.html`);
    candidates.push(`${storagePath}.html`);
  }

  for (const candidate of candidates) {
    const { data, error } = await supabase.storage
      .from('templates')
      .download(candidate);

    if (!error && data) {
      const arrayBuffer = await data.arrayBuffer();
      return new NextResponse(Buffer.from(arrayBuffer), {
        headers: {
          'Content-Type': contentTypeFor(candidate),
          'Cache-Control': 'no-store',
        },
      });
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

  return NextResponse.json({ error: 'Preview file not found' }, { status: 404 });
}
