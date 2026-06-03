import { NextResponse } from 'next/server';
import { readSourceConfig, getDocId } from '@/lib/dataBuilder';
import path from 'path';
import fs from 'fs/promises';
import crypto from 'crypto';
import { databases } from '@/lib/appwrite';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('slug');

  if (!slug) return NextResponse.json({ error: 'Missing slug' }, { status: 400 });

  const data = await readSourceConfig(slug);
  if (!data) return NextResponse.json({ error: 'Config not found' }, { status: 404 });

  return NextResponse.json(data);
}

export async function PUT(req: Request) {
  try {
    const { slug, sourceData } = await req.json();

    if (!slug || !sourceData) {
      return NextResponse.json({ error: 'Missing slug or source data' }, { status: 400 });
    }

    // 1. Save to Appwrite
    const documentData = {
      name: sourceData.clinic?.name || slug,
      rating: String(sourceData.business?.rating || ''),
      review_count: String(sourceData.business?.reviewCount || ''),
      address: sourceData.clinic?.address?.full,
      phone: sourceData.clinic?.contact?.phone,
      source_data: JSON.stringify(sourceData)
    };

    try {
      const docId = getDocId(slug);
      await databases.createDocument('gtrails', 'scraped_data', docId, documentData);
    } catch (err: any) {
      if (err.code === 409 || err.message?.includes('already exists')) {
        const docId = getDocId(slug);
        await databases.updateDocument('gtrails', 'scraped_data', docId, documentData);
      } else {
        console.error('Appwrite save error:', err);
        // We'll still save locally as fallback
      }
    }

    return NextResponse.json({ success: true, message: 'Saved successfully' });
  } catch (error) {
    console.error('Save error:', error);
    return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('slug');

  if (!slug) return NextResponse.json({ error: 'Missing slug' }, { status: 400 });

  try {
    const docId = getDocId(slug);

    let hrSlug = slug;
    try {
      const doc = await databases.getDocument('gtrails', 'scraped_data', docId);
      if (doc?.source_data) {
        const json = JSON.parse(doc.source_data);
        if (json.clinic?.slug) {
          hrSlug = json.clinic.slug;
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

    if (hrSlug !== slug) {
      const md5Dir = path.join(process.cwd(), 'data', slug);
      await fs.rm(md5Dir, { recursive: true, force: true });
    }
    
    return NextResponse.json({ success: true, message: 'Deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}
