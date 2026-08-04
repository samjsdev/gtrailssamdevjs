import { NextResponse } from 'next/server';

export const ADMIN_COOKIE = 'gtrails_admin';

const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

/** Admin password from env. Empty/unset means admin auth is not configured. */
export function getAdminPassword(): string {
  return (process.env.PASSWORD || '').trim();
}

export function isAdminPasswordConfigured(): boolean {
  return getAdminPassword().length > 0;
}

async function sha256Hex(value: string): Promise<string> {
  const data = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

/** Stable session token derived from PASSWORD (never store the raw password in the cookie). */
export async function getAdminSessionToken(): Promise<string | null> {
  const password = getAdminPassword();
  if (!password) return null;
  return sha256Hex(`gtrails:${password}`);
}

function timingSafeEqualString(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let out = 0;
  for (let i = 0; i < a.length; i++) out |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return out === 0;
}

/** True when request has a valid admin cookie or password header. */
export async function isAdminAuthorized(req: Request): Promise<boolean> {
  const expected = await getAdminSessionToken();
  if (!expected) return false;

  const cookieHeader = req.headers.get('cookie') || '';
  const cookieMatch = cookieHeader.match(new RegExp(`(?:^|;\\s*)${ADMIN_COOKIE}=([^;]*)`));
  const cookieValue = cookieMatch?.[1] ? decodeURIComponent(cookieMatch[1]) : '';
  if (cookieValue && timingSafeEqualString(cookieValue, expected)) return true;

  const headerPassword =
    req.headers.get('x-admin-password') ||
    (req.headers.get('authorization')?.match(/^Bearer\s+(.+)$/i)?.[1] ?? '');
  if (headerPassword && timingSafeEqualString(headerPassword.trim(), getAdminPassword())) {
    return true;
  }

  return false;
}

export async function requireAdmin(req: Request): Promise<NextResponse | null> {
  if (!isAdminPasswordConfigured()) {
    return NextResponse.json(
      { error: 'Admin password not configured. Set PASSWORD in your environment.' },
      { status: 503 }
    );
  }
  if (await isAdminAuthorized(req)) return null;
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}

export function adminSessionCookieOptions(token: string) {
  return {
    name: ADMIN_COOKIE,
    value: token,
    httpOnly: true,
    sameSite: 'lax' as const,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: COOKIE_MAX_AGE,
  };
}

/** Server Components / layouts: true when the admin session cookie is valid. */
export async function hasValidAdminCookie(cookieValue: string | undefined): Promise<boolean> {
  const expected = await getAdminSessionToken();
  if (!expected || !cookieValue) return false;
  return timingSafeEqualString(cookieValue, expected);
}
