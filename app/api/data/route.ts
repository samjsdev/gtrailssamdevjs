import { NextResponse } from 'next/server';
import {
  readSourceConfig,
  persistSourceConfig,
  fetchAndSaveSourceConfig,
  getDocId,
  assertSafeSlug,
  type GeneratedData,
} from '@/lib/dataBuilder';
import { requireAdmin } from '@/lib/adminAuth';
import path from 'path';
import fs from 'fs/promises';
import { databases } from '@/lib/appwrite';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('slug');
  const refresh = searchParams.get('refresh') === '1';

  if (!slug) return NextResponse.json({ error: 'Missing slug' }, { status: 400 });

  // ?refresh=1 restores this client from Appwrite backup → local JSON.
  if (refresh) {
    const denied = await requireAdmin(req);
    if (denied) return denied;
    const fresh = await fetchAndSaveSourceConfig(slug);
    if (!fresh) return NextResponse.json({ error: 'Not found in Appwrite backup' }, { status: 404 });
    return NextResponse.json(fresh);
  }

  const data = await readSourceConfig(slug);
  if (!data) return NextResponse.json({ error: 'Config not found' }, { status: 404 });

  return NextResponse.json(data);
}

export async function PUT(req: Request) {
  try {
    const denied = await requireAdmin(req);
    if (denied) return denied;

    const { slug, sourceData } = await req.json();

    if (!slug || !sourceData) {
      return NextResponse.json({ error: 'Missing slug or source data' }, { status: 400 });
    }

    // Store in JSON + Appwrite (both required).
    await persistSourceConfig(slug, sourceData as GeneratedData);

    return NextResponse.json({ success: true, message: 'Saved to JSON and Appwrite' });
  } catch (error) {
    console.error('Save error:', error);
    return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('slug');

  if (!slug) return NextResponse.json({ error: 'Missing slug' }, { status: 400 });

  try {
    const safeSlug = assertSafeSlug(slug);
    const docId = getDocId(safeSlug);

    let hrSlug = safeSlug;
    try {
      const doc = await databases.getDocument('gtrails', 'scraped_data', docId);
      if (doc?.source_data) {
        const json = JSON.parse(doc.source_data);
        if (json.clinic?.slug) {
          hrSlug = assertSafeSlug(json.clinic.slug);
        }
      }
    } catch (fetchErr) {
      console.error('Failed to fetch doc before deletion to resolve hrSlug:', fetchErr);
    }

    // 1. Delete from Appwrite
    try {
      await databases.deleteDocument('gtrails', 'scraped_data', docId);
    } catch (err) {
      console.error('Appwrite delete error:', err);
    }

    // 2. Delete local files (both human-readable and MD5 directories if they exist)
    const dataDir = path.join(process.cwd(), 'data', hrSlug);
    await fs.rm(dataDir, { recursive: true, force: true });

    if (hrSlug !== safeSlug) {
      const md5Dir = path.join(process.cwd(), 'data', safeSlug);
      await fs.rm(md5Dir, { recursive: true, force: true });
    }

    return NextResponse.json({ success: true, message: 'Deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}
