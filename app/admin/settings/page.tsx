"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User, ShieldCheck, Newspaper, LogOut } from "lucide-react";
import { getSupabase } from "@/lib/supabase";
import { logout, isSupabaseConfigured } from "@/lib/auth";

export default function SettingsPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  useEffect(() => {
    getSupabase()
      ?.auth.getUser()
      .then(({ data }) => setEmail(data.user?.email ?? ""));
  }, []);

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="font-serif text-3xl text-ink sm:text-4xl">Settings</h1>
      <p className="mt-1.5 text-sm text-muted">Manage your admin account and blog defaults.</p>

      <div className="mt-7 space-y-5">
        {/* Profile */}
        <Section icon={<User className="h-5 w-5" />} title="Profile">
          <Row label="Name" value="Admin" />
          <Row label="Email" value={email || "—"} />
        </Section>

        {/* Account */}
        <Section icon={<ShieldCheck className="h-5 w-5" />} title="Account">
          <Row
            label="Authentication"
            value={isSupabaseConfigured ? "Supabase Auth" : "Not configured"}
          />
          <div className="flex items-center justify-between pt-1">
            <span className="text-sm text-muted">Session</span>
            <button
              onClick={async () => {
                await logout();
                router.replace("/login");
              }}
              className="inline-flex items-center gap-2 rounded-full border border-[#ff8a6b]/30 px-4 py-2 text-sm text-[#ff8a6b] transition-colors hover:bg-[#ff8a6b]/10"
            >
              <LogOut className="h-4 w-4" /> Logout
            </button>
          </div>
        </Section>

        {/* Blog settings */}
        <Section icon={<Newspaper className="h-5 w-5" />} title="Blog Settings">
          <Row label="Blog name" value="Orvian Blog" />
          <Row label="Default author" value="Admin" />
          <Row label="Default SEO title" value="Orvian — Task Management" />
          <p className="pt-1 text-xs text-faint">
            These defaults are used as placeholders for the MVP. Editing them can be
            added in a future version.
          </p>
        </Section>
      </div>
    </div>
  );
}

function Section({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-line bg-card p-5">
      <div className="mb-4 flex items-center gap-2.5">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-line bg-interactive text-primary">
          {icon}
        </span>
        <h2 className="text-base font-semibold text-ink">{title}</h2>
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-sm text-muted">{label}</span>
      <span className="max-w-[60%] truncate text-sm font-medium text-ink">{value}</span>
    </div>
  );
}
