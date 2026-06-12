import { NextResponse } from 'next/server';
import { readSourceConfig, getDocId } from '@/lib/dataBuilder';
import path from 'path';
import fs from 'fs/promises';
import { databases } from '@/lib/appwrite';

export async function POST(req: Request) {
  try {
    const { slug } = await req.json();

    if (!slug) {
      return NextResponse.json({ error: 'Missing slug' }, { status: 400 });
    }

    // 1. Fetch the existing source config
    const data = await readSourceConfig(slug);
    if (!data) {
      return NextResponse.json({ error: 'Source configuration not found for slug' }, { status: 404 });
    }

    // 2. Remove selected_template
    const updatedData = { ...data };
    delete updatedData.selected_template;

    // 3. Save to Appwrite
    const docId = getDocId(slug);
    const documentData = {
      name: updatedData.clinic?.name || slug,
      rating: String(updatedData.business?.rating || ''),
      review_count: String(updatedData.business?.reviewCount || ''),
      address: updatedData.clinic?.address?.full,
      phone: updatedData.clinic?.contact?.phone,
      source_data: JSON.stringify(updatedData)
    };

    try {
      await databases.updateDocument('gtrails', 'scraped_data', docId, documentData);
    } catch (err: any) {
      console.error('Appwrite update error during unpublish:', err.message || err);
    }

    // 4. Save to local source.json
    const localSourceDir = path.join(process.cwd(), 'data', slug);
    const localSourcePath = path.join(localSourceDir, 'source.json');
    try {
      await fs.mkdir(localSourceDir, { recursive: true });
      await fs.writeFile(localSourcePath, JSON.stringify(updatedData, null, 2), 'utf-8');
    } catch (writeErr: any) {
      console.error('Local source.json write error:', writeErr.message || writeErr);
    }

    // 5. Delete standalone Next.js project from build/[slug]/
    const buildDir = path.join(process.cwd(), 'build', slug);
    try {
      await fs.rm(buildDir, { recursive: true, force: true });
      console.log(`[Unpublish API] Deleted build directory for slug ${slug}`);
    } catch (rmErr: any) {
      console.error('Failed to delete build directory:', rmErr.message || rmErr);
    }

    return NextResponse.json({
      success: true,
      message: 'Unpublished successfully'
    });
  } catch (error: any) {
    console.error('Unpublish API Exception:', error);
    return NextResponse.json({ error: error.message || 'Failed to unpublish website' }, { status: 500 });
  }
}
