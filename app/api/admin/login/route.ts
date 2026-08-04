import { NextResponse } from 'next/server';
import {
  adminSessionCookieOptions,
  getAdminPassword,
  getAdminSessionToken,
  isAdminPasswordConfigured,
} from '@/lib/adminAuth';

export async function POST(req: Request) {
  if (!isAdminPasswordConfigured()) {
    return NextResponse.json(
      { error: 'Admin password not configured. Set PASSWORD in your environment.' },
      { status: 503 }
    );
  }

  let password = '';
  try {
    const body = await req.json();
    password = typeof body?.password === 'string' ? body.password : '';
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  if (!password || password !== getAdminPassword()) {
    return NextResponse.json({ error: 'Incorrect password' }, { status: 401 });
  }

  const token = await getAdminSessionToken();
  if (!token) {
    return NextResponse.json({ error: 'Admin password not configured' }, { status: 503 });
  }

  const response = NextResponse.json({ success: true });
  const cookie = adminSessionCookieOptions(token);
  response.cookies.set(cookie.name, cookie.value, {
    httpOnly: cookie.httpOnly,
    sameSite: cookie.sameSite,
    secure: cookie.secure,
    path: cookie.path,
    maxAge: cookie.maxAge,
  });
  return response;
}
