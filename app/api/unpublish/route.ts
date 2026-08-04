import { NextResponse } from 'next/server';
import { readSourceConfig, persistSourceConfig } from '@/lib/dataBuilder';
import { requireAdmin } from '@/lib/adminAuth';
import path from 'path';
import fs from 'fs/promises';

export async function POST(req: Request) {
  try {
    const denied = await requireAdmin(req);
    if (denied) return denied;

    const { slug } = await req.json();

    if (!slug) {
      return NextResponse.json({ error: 'Missing slug' }, { status: 400 });
    }

    const data = await readSourceConfig(slug);
    if (!data) {
      return NextResponse.json({ error: 'Source configuration not found for slug' }, { status: 404 });
    }

    const updatedData = { ...data };
    delete updatedData.selected_template;

    // Store in JSON + Appwrite
    await persistSourceConfig(slug, updatedData);

    const buildDir = path.join(process.cwd(), 'build', slug);
    try {
      await fs.rm(buildDir, { recursive: true, force: true });
      console.log(`[Unpublish API] Deleted build directory for slug ${slug}`);
    } catch (rmErr: any) {
      console.error('Failed to delete build directory:', rmErr.message || rmErr);
    }

    return NextResponse.json({
      success: true,
      message: 'Unpublished successfully',
    });
  } catch (error: any) {
    console.error('Unpublish API Exception:', error);
    return NextResponse.json({ error: error.message || 'Failed to unpublish website' }, { status: 500 });
  }
}
