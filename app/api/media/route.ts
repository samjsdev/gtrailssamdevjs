import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';
import crypto from 'crypto';
import { storage } from '@/lib/appwrite';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');
  const file = searchParams.get('file');

  if (!slug || !file) {
    return NextResponse.json({ error: 'Missing slug or file parameter' }, { status: 400 });
  }

  // 1. Try local file system first (fast, up-to-date for local dev)
  const filePath = path.join(process.cwd(), 'data', slug, 'images', file);

  try {
    const fileBuffer = await fs.readFile(filePath);
    const ext = path.extname(file).toLowerCase();
    let mimeType = 'image/jpeg';
    if (ext === '.png') mimeType = 'image/png';
    else if (ext === '.webp') mimeType = 'image/webp';
    else if (ext === '.gif') mimeType = 'image/gif';

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': mimeType,
        'Cache-Control': 'public, max-age=31536000, immutable'
      },
    });
  } catch (localErr) {
    // Local file not found, proceed to Appwrite Storage fallback
  }

  // 2. Try Appwrite Storage fallback
  try {
    const fileId = crypto.createHash('md5').update(`${slug}_${file}`).digest('hex');
    const downloadUrl = storage.getFileDownload('scraped_images', fileId);
    
    const res = await fetch(downloadUrl.toString());
    if (res.ok) {
      const arrayBuffer = await res.arrayBuffer();
      const ext = path.extname(file).toLowerCase();
      let mimeType = 'image/jpeg';
      if (ext === '.png') mimeType = 'image/png';
      else if (ext === '.webp') mimeType = 'image/webp';
      else if (ext === '.gif') mimeType = 'image/gif';

      return new NextResponse(Buffer.from(arrayBuffer), {
        headers: {
          'Content-Type': mimeType,
          'Cache-Control': 'public, max-age=31536000, immutable'
        },
      });
    }
  } catch (sbErr) {
    console.error('Appwrite image fetch error:', sbErr);
  }

  return NextResponse.json({ error: 'Image not found' }, { status: 404 });
}
