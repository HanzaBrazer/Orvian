import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Public project credentials. The anon/publishable key is safe to expose
// (it is embedded in the client bundle anyway and protected by RLS).
// Environment variables override these when provided.
const FALLBACK_URL = "https://vruxhhrnlwqcmoxibhpy.supabase.co";
const FALLBACK_ANON = "sb_publishable_NhNOQxyRWPQ9yjZrzTlYRQ_dEJn4Izd";

/**
 * Pick a usable Supabase URL. A misconfigured env var (e.g. a bare project
 * ref without https://) would make createClient throw and break the Vercel
 * build during static generation, so we validate it and fall back when it is
 * not a real http(s) URL.
 */
function resolveUrl(): string {
  const env = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  if (env && /^https?:\/\/[^\s]+$/i.test(env)) {
    try {
      // Throws on an invalid URL.
      // eslint-disable-next-line no-new
      new URL(env);
      return env;
    } catch {
      /* fall through to the fallback */
    }
  }
  return FALLBACK_URL;
}

function resolveAnon(): string {
  const env = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();
  return env && env.length > 10 ? env : FALLBACK_ANON;
}

const url = resolveUrl();
const anon = resolveAnon();

export const isSupabaseConfigured = Boolean(url && anon);

let browserClient: SupabaseClient | null = null;

/** Browser singleton (persists the admin session). Returns null if not configured. */
export function getSupabase(): SupabaseClient | null {
  if (!isSupabaseConfigured) return null;
  try {
    if (typeof window === "undefined") {
      // On the server, create a stateless client per call.
      return createClient(url, anon, { auth: { persistSession: false } });
    }
    if (!browserClient) {
      browserClient = createClient(url, anon, {
        auth: { persistSession: true, autoRefreshToken: true },
      });
    }
    return browserClient;
  } catch {
    // Never let a client-construction error crash a page render or the build.
    return null;
  }
}
