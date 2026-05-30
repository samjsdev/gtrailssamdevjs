import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';
import { supabase } from '@/lib/supabase';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');
  const file = searchParams.get('file');

  if (!slug || !file) {
    return NextResponse.json({ error: 'Missing slug or file parameter' }, { status: 400 });
  }

  // 1. Try Supabase Storage first
  try {
    const { data, error } = await supabase.storage
      .from('scraped_images')
      .download(`${slug}/${file}`);
    
    if (!error && data) {
      const arrayBuffer = await data.arrayBuffer();
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
    console.error('Supabase image fetch error:', sbErr);
  }

  // 2. Fallback to local file system
  const filePath = path.join(process.cwd(), 'data', slug, 'images', file);

  try {
    const fileBuffer = await fs.readFile(filePath);
    
    // Guess MIME type heuristically
    const ext = path.extname(file).toLowerCase();
    let mimeType = 'image/jpeg';
    if (ext === '.png') mimeType = 'image/png';
    else if (ext === '.webp') mimeType = 'image/webp';
    else if (ext === '.gif') mimeType = 'image/gif';

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': mimeType,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Image not found' }, { status: 404 });
  }
}
