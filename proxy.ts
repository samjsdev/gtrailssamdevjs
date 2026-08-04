import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {
  ADMIN_COOKIE,
  getAdminSessionToken,
  isAdminPasswordConfigured,
} from '@/lib/adminAuth';

function timingSafeEqualString(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let out = 0;
  for (let i = 0; i < a.length; i++) out |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return out === 0;
}

async function hasValidSession(request: NextRequest): Promise<boolean> {
  const expected = await getAdminSessionToken();
  if (!expected) return false;

  const cookieValue = request.cookies.get(ADMIN_COOKIE)?.value || '';
  if (cookieValue && timingSafeEqualString(cookieValue, expected)) return true;

  const headerPassword =
    request.headers.get('x-admin-password') ||
    (request.headers.get('authorization')?.match(/^Bearer\s+(.+)$/i)?.[1] ?? '');
  if (headerPassword && timingSafeEqualString(headerPassword.trim(), process.env.PASSWORD?.trim() || '')) {
    return true;
  }

  return false;
}

function isPublicAdminPath(pathname: string): boolean {
  return (
    pathname === '/private/login' ||
    pathname === '/api/admin/login' ||
    pathname === '/api/admin/logout'
  );
}

function needsAuth(request: NextRequest): boolean {
  const { pathname, searchParams } = request.nextUrl;
  const method = request.method.toUpperCase();

  if (pathname.startsWith('/private')) {
    return !isPublicAdminPath(pathname);
  }

  if (pathname === '/api/generate' || pathname === '/api/intake' || pathname === '/api/publish' || pathname === '/api/unpublish') {
    return true;
  }

  if (pathname === '/api/data' || pathname.startsWith('/api/data/')) {
    // Reads are public for templates; writes + refresh require admin.
    if (method === 'PUT' || method === 'DELETE' || method === 'POST' || method === 'PATCH') return true;
    if (method === 'GET' && searchParams.get('refresh') === '1') return true;
  }

  return false;
}

export async function proxy(request: NextRequest) {
  if (!needsAuth(request)) {
    return NextResponse.next();
  }

  if (!isAdminPasswordConfigured()) {
    if (request.nextUrl.pathname.startsWith('/api/')) {
      return NextResponse.json(
        { error: 'Admin password not configured. Set PASSWORD in your environment.' },
        { status: 503 }
      );
    }
    const login = new URL('/private/login', request.url);
    login.searchParams.set('next', request.nextUrl.pathname + request.nextUrl.search);
    return NextResponse.redirect(login);
  }

  if (await hasValidSession(request)) {
    return NextResponse.next();
  }

  if (request.nextUrl.pathname.startsWith('/api/')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const login = new URL('/private/login', request.url);
  login.searchParams.set('next', request.nextUrl.pathname + request.nextUrl.search);
  return NextResponse.redirect(login);
}

export const config = {
  matcher: [
    '/private/:path*',
    '/api/data',
    '/api/generate',
    '/api/intake',
    '/api/publish',
    '/api/unpublish',
    '/api/admin/:path*',
  ],
};
