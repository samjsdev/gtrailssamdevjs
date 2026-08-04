import { NextResponse } from 'next/server';
import { persistSourceConfig, type GeneratedData } from '@/lib/dataBuilder';
import { requireAdmin } from '@/lib/adminAuth';

export async function POST(req: Request) {
  try {
    const denied = await requireAdmin(req);
    if (denied) return denied;

    const { slug, sourceData } = await req.json();

    if (!slug || !sourceData) {
      return NextResponse.json({ error: 'Missing slug or source data' }, { status: 400 });
    }

    await persistSourceConfig(slug, sourceData as GeneratedData);

    return NextResponse.json({ success: true, slug, websiteGenerated: false });
  } catch (error: any) {
    console.error('Generate API Error:', error);
    return NextResponse.json({ error: 'Failed to update source data' }, { status: 500 });
  }
}
