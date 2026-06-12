import { NextResponse } from 'next/server';
import { readSourceConfig, getDocId } from '@/lib/dataBuilder';
import { exportStandaloneProject } from '@/lib/websiteBuild';
import path from 'path';
import fs from 'fs/promises';
import crypto from 'crypto';
import { databases } from '@/lib/appwrite';

export async function POST(req: Request) {
  try {
    const { slug, templateId } = await req.json();

    if (!slug || !templateId) {
      return NextResponse.json({ error: 'Missing slug or templateId' }, { status: 400 });
    }

    // 1. Fetch the existing source config
    const data = await readSourceConfig(slug);
    if (!data) {
      return NextResponse.json({ error: 'Source configuration not found for slug' }, { status: 404 });
    }

    // 2. Inject selected_template
    const updatedData = {
      ...data,
      selected_template: templateId
    };

    // 3. Save to Appwrite (keeps the admin dashboard accurate)
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
      console.error('Appwrite update error during publish:', err.message || err);
      // Fallback: if update fails, try creating (though it should exist)
      try {
        await databases.createDocument('gtrails', 'scraped_data', docId, documentData);
      } catch (createErr: any) {
        console.error('Appwrite create fallback error:', createErr.message || createErr);
      }
    }

    // 4. Also save selected_template to local source.json
    const localSourceDir = path.join(process.cwd(), 'data', slug);
    const localSourcePath = path.join(localSourceDir, 'source.json');
    try {
      await fs.mkdir(localSourceDir, { recursive: true });
      await fs.writeFile(localSourcePath, JSON.stringify(updatedData, null, 2), 'utf-8');
    } catch (writeErr: any) {
      console.error('Local source.json write error:', writeErr.message || writeErr);
    }

    // 5. Export standalone Next.js project to build/[slug]/
    console.log(`[Publish API] Selected ${templateId} for slug ${slug}. Exporting standalone project...`);
    const buildResult = await exportStandaloneProject(slug, templateId);

    if (!buildResult.ok) {
      console.error(`[Publish API] Export failed: ${buildResult.message}`);
      return NextResponse.json({
        error: 'Data updated, but standalone export failed',
        details: buildResult.message
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      buildPath: `build/${slug}`,
      templateId
    });
  } catch (error: any) {
    console.error('Publish API Exception:', error);
    return NextResponse.json({ error: error.message || 'Failed to publish website' }, { status: 500 });
  }
}
