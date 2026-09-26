"use client";

import { useEffect, useState } from "react";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";

export { isSupabaseConfigured };

export async function signIn(
  email: string,
  password: string
): Promise<{ ok: boolean; error?: string }> {
  const sb = getSupabase();
  if (!sb)
    return {
      ok: false,
      error: "Supabase is not configured yet. Add your environment variables.",
    };
  const { error } = await sb.auth.signInWithPassword({
    email: email.trim(),
    password,
  });
  return error ? { ok: false, error: error.message } : { ok: true };
}

export async function logout() {
  const sb = getSupabase();
  await sb?.auth.signOut();
}

/**
 * Dev-only convenience: when Supabase isn't configured and we're running a
 * local dev build, treat the viewer as admin so the dashboard UI can be
 * previewed. Production always requires a real Supabase session.
 */
const DEV_BYPASS =
  process.env.NODE_ENV !== "production" && !isSupabaseConfigured;

export function useAdmin(): boolean {
  return useAuthState().admin;
}

export function useAuthState(): { admin: boolean; ready: boolean } {
  const [state, setState] = useState<{ admin: boolean; ready: boolean }>({
    admin: DEV_BYPASS,
    ready: false,
  });
  useEffect(() => {
    const sb = getSupabase();
    if (!sb) {
      setState({ admin: DEV_BYPASS, ready: true });
      return;
    }
    let mounted = true;
    sb.auth.getSession().then(({ data }) => {
      if (mounted) setState({ admin: !!data.session, ready: true });
    });
    const { data: sub } = sb.auth.onAuthStateChange((_event, session) => {
      setState({ admin: !!session, ready: true });
    });
    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);
  return state;
}
