import { NextResponse } from 'next/server';
import { readSourceConfig, persistSourceConfig } from '@/lib/dataBuilder';
import { exportStandaloneProject } from '@/lib/websiteBuild';
import { requireAdmin } from '@/lib/adminAuth';

export async function POST(req: Request) {
  try {
    const denied = await requireAdmin(req);
    if (denied) return denied;

    const { slug, templateId } = await req.json();

    if (!slug || !templateId) {
      return NextResponse.json({ error: 'Missing slug or templateId' }, { status: 400 });
    }

    const data = await readSourceConfig(slug);
    if (!data) {
      return NextResponse.json({ error: 'Source configuration not found for slug' }, { status: 404 });
    }

    const updatedData = {
      ...data,
      selected_template: templateId,
    };

    // Store in JSON + Appwrite
    await persistSourceConfig(slug, updatedData);

    console.log(`[Publish API] Selected ${templateId} for slug ${slug}. Exporting standalone project...`);
    const buildResult = await exportStandaloneProject(slug, templateId);

    if (!buildResult.ok) {
      console.error(`[Publish API] Export failed: ${buildResult.message}`);
      return NextResponse.json({
        error: 'Data updated, but standalone export failed',
        details: buildResult.message,
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      buildPath: `build/${slug}`,
      message: 'Published successfully',
    });
  } catch (error: any) {
    console.error('Publish API Exception:', error);
    return NextResponse.json({ error: error.message || 'Failed to publish website' }, { status: 500 });
  }
}
