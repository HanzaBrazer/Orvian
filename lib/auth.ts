"use client";

import { useEffect, useState } from "react";

/**
 * NOTE: This is a client-side gate for a static site (no backend).
 * It controls the admin *experience* (who sees Add/Edit), but it is not
 * real security — the credentials live in the shipped bundle. For true
 * protection, move auth + content to a backend (API routes + database).
 */
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "orvian2026";

const KEY = "orvian-admin-session";
export const AUTH_EVENT = "orvian-auth-change";

export function login(username: string, password: string): boolean {
  const ok =
    username.trim().toLowerCase() === ADMIN_USERNAME &&
    password === ADMIN_PASSWORD;
  if (ok) {
    try {
      window.localStorage.setItem(KEY, "1");
      window.dispatchEvent(new Event(AUTH_EVENT));
    } catch {
      /* ignore */
    }
  }
  return ok;
}

export function logout() {
  try {
    window.localStorage.removeItem(KEY);
    window.dispatchEvent(new Event(AUTH_EVENT));
  } catch {
    /* ignore */
  }
}

export function isAdmin(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(KEY) === "1";
  } catch {
    return false;
  }
}

export function useAdmin(): boolean {
  const [admin, setAdmin] = useState(false);
  useEffect(() => {
    const refresh = () => setAdmin(isAdmin());
    refresh();
    window.addEventListener(AUTH_EVENT, refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener(AUTH_EVENT, refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);
  return admin;
}
