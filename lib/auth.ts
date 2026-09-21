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

export function useAdmin(): boolean {
  const [admin, setAdmin] = useState(false);
  useEffect(() => {
    const sb = getSupabase();
    if (!sb) return;
    let mounted = true;
    sb.auth.getSession().then(({ data }) => {
      if (mounted) setAdmin(!!data.session);
    });
    const { data: sub } = sb.auth.onAuthStateChange((_event, session) => {
      setAdmin(!!session);
    });
    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);
  return admin;
}
