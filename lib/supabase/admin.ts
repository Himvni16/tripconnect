import { createClient as createSupabaseClient } from '@supabase/supabase-js';
// Server-only module: do not import from Client Components or expose this key to the browser.
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRoleKey) throw new Error('Missing Supabase server environment variables.');
  return createSupabaseClient(url, serviceRoleKey, { auth: { autoRefreshToken: false, persistSession: false } });
}
export function isAdminEmail(email?: string) {
  const allowed = (process.env.ADMIN_EMAILS ?? '').split(',').map(value => value.trim().toLowerCase()).filter(Boolean);
  return !!email && allowed.includes(email.toLowerCase());
}
