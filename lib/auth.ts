"use client";

import { useEffect, useState } from "react";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";

export { isSupabaseConfigured };

/**
 * Admin allowlist. Any account whose email is here can access the CMS
 * (/admin). Everyone else who signs up is a regular user.
 * Configure with NEXT_PUBLIC_ADMIN_EMAILS (comma-separated).
 */
const ADMIN_EMAILS = (
  process.env.NEXT_PUBLIC_ADMIN_EMAILS || "admin@orvian.com"
)
  .split(",")
  .map((s) => s.trim().toLowerCase())
  .filter(Boolean);

export function isAdminEmail(email?: string | null): boolean {
  return !!email && ADMIN_EMAILS.includes(email.toLowerCase());
}

export async function signIn(
  email: string,
  password: string
): Promise<{ ok: boolean; error?: string }> {
  const sb = getSupabase();
  if (!sb) return { ok: false, error: "Supabase is not configured." };
  const { error } = await sb.auth.signInWithPassword({
    email: email.trim(),
    password,
  });
  return error ? { ok: false, error: error.message } : { ok: true };
}

export async function signUp(
  email: string,
  password: string
): Promise<{ ok: boolean; needsConfirm?: boolean; error?: string }> {
  const sb = getSupabase();
  if (!sb) return { ok: false, error: "Supabase is not configured." };
  const { data, error } = await sb.auth.signUp({
    email: email.trim(),
    password,
  });
  if (error) return { ok: false, error: error.message };
  // No session returned => email confirmation is required.
  return { ok: true, needsConfirm: !data.session };
}

export async function logout() {
  const sb = getSupabase();
  await sb?.auth.signOut();
}

export type AuthState = {
  user: boolean; // any signed-in account
  admin: boolean; // signed-in AND allow-listed admin
  email: string;
  ready: boolean;
};

export function useAuthState(): AuthState {
  const [state, setState] = useState<AuthState>({
    user: false,
    admin: false,
    email: "",
    ready: false,
  });

  useEffect(() => {
    const sb = getSupabase();
    if (!sb) {
      setState({ user: false, admin: false, email: "", ready: true });
      return;
    }
    let mounted = true;
    const apply = (session: { user?: { email?: string } } | null) => {
      const email = session?.user?.email ?? "";
      if (mounted)
        setState({
          user: !!session,
          admin: isAdminEmail(email),
          email,
          ready: true,
        });
    };
    sb.auth.getSession().then(({ data }) => apply(data.session));
    const { data: sub } = sb.auth.onAuthStateChange((_e, session) =>
      apply(session)
    );
    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  return state;
}

/** true only for allow-listed admins (used to show CMS controls). */
export function useAdmin(): boolean {
  return useAuthState().admin;
}
