import { NextResponse } from 'next/server';
import { readSourceConfig, getDocId } from '@/lib/dataBuilder';
import { runBuildDeploy } from '@/lib/websiteBuild';
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
      console.error('Appwrite update error during publish:', err.message || err);
      // Fallback: if update fails, try creating (though it should exist)
      try {
        await databases.createDocument('gtrails', 'scraped_data', docId, documentData);
      } catch (createErr: any) {
        console.error('Appwrite create fallback error:', createErr.message || createErr);
      }
    }

    // 5. Trigger build and package specifically for the selected template
    console.log(`[Publish API] Selected ${templateId} for slug ${slug}. Triggering build...`);
    const buildResult = await runBuildDeploy(`publish:${slug}:${templateId}`);

    if (!buildResult.ok) {
      console.error(`[Publish API] Build failed: ${buildResult.message}`);
      return NextResponse.json({
        error: 'Data updated, but static build failed',
        details: buildResult.message
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      liveUrl: `/website/${slug}`,
      templateId
    });
  } catch (error: any) {
    console.error('Publish API Exception:', error);
    return NextResponse.json({ error: error.message || 'Failed to publish website' }, { status: 500 });
  }
}
