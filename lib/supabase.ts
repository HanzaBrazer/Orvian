import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Public project credentials. The anon/publishable key is safe to expose
// (it is embedded in the client bundle anyway and protected by RLS).
// Environment variables override these when provided.
const FALLBACK_URL = "https://vruxhhrnlwqcmoxibhpy.supabase.co";
const FALLBACK_ANON = "sb_publishable_NhNOQxyRWPQ9yjZrzTlYRQ_dEJn4Izd";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || FALLBACK_URL;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || FALLBACK_ANON;

export const isSupabaseConfigured = Boolean(url && anon);

let browserClient: SupabaseClient | null = null;

/** Browser singleton (persists the admin session). Returns null if not configured. */
export function getSupabase(): SupabaseClient | null {
  if (!isSupabaseConfigured) return null;
  if (typeof window === "undefined") {
    // On the server, create a stateless client per call.
    return createClient(url!, anon!, { auth: { persistSession: false } });
  }
  if (!browserClient) {
    browserClient = createClient(url!, anon!, {
      auth: { persistSession: true, autoRefreshToken: true },
    });
  }
  return browserClient;
}
