import { createClient } from '@supabase/supabase-js';

const anonKey = process.env.SB_ANONKEY || '';
const serviceKey = process.env.SB_SERVICEROLEKEY || '';

const getRefFromToken = (token: string): string => {
  try {
    const parts = token.split('.');
    if (parts.length === 3) {
      const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString('utf-8'));
      return payload.ref || '';
    }
  } catch (e) {
    console.error('Error parsing token to extract Supabase project ref:', e);
  }
  return '';
};

const ref = getRefFromToken(serviceKey || anonKey);
const supabaseUrl = ref ? `https://${ref}.supabase.co` : '';

if (!supabaseUrl) {
  console.warn('Supabase URL could not be determined. Check your SB_ANONKEY or SB_SERVICEROLEKEY.');
}

// Create a Supabase client that uses the service role key to bypass RLS for scraping data inserts/updates
export const supabase = createClient(supabaseUrl, serviceKey || anonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});
