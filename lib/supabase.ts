import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

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
