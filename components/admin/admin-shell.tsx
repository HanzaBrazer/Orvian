"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  LayoutDashboard,
  Newspaper,
  Tags,
  ImageIcon,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";
import { LogoMark } from "@/components/logo";
import { useAuthState, logout } from "@/lib/auth";
import { getSupabase } from "@/lib/supabase";

type NavItem = { label: string; href: string; icon: React.ElementType };
const groups: { title: string; items: NavItem[] }[] = [
  {
    title: "MAIN",
    items: [
      { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
      { label: "Blog Posts", href: "/admin/blog", icon: Newspaper },
    ],
  },
  {
    title: "CONTENT",
    items: [
      { label: "Categories", href: "/admin/categories", icon: Tags },
      { label: "Media", href: "/admin/media", icon: ImageIcon },
    ],
  },
  {
    title: "SYSTEM",
    items: [{ label: "Settings", href: "/admin/settings", icon: Settings }],
  },
];

const titles: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/blog": "Blog Posts",
  "/admin/blog/new": "New Post",
  "/admin/categories": "Categories",
  "/admin/media": "Media Library",
  "/admin/settings": "Settings",
};

function pageTitle(pathname: string) {
  if (titles[pathname]) return titles[pathname];
  if (pathname.startsWith("/admin/blog/") && pathname.endsWith("/edit"))
    return "Edit Post";
  if (pathname.startsWith("/admin/blog")) return "Blog Posts";
  return "Dashboard";
}

export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { admin, ready } = useAuthState();
  const [drawer, setDrawer] = useState(false);
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    if (ready && !admin) router.replace("/login");
  }, [ready, admin, router]);

  useEffect(() => {
    setDrawer(false);
  }, [pathname]);

  useEffect(() => {
    const sb = getSupabase();
    sb?.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? ""));
  }, [admin]);

  if (!ready || !admin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg">
        <span className="h-8 w-8 animate-spin rounded-full border-2 border-line border-t-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg text-ink lg:grid lg:grid-cols-[260px_1fr]">
      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-screen flex-col border-r border-line bg-surface lg:flex">
        <SidebarBody pathname={pathname} email={email} />
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {drawer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 lg:hidden"
          >
            <div className="absolute inset-0 bg-black/60" onClick={() => setDrawer(false)} />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-y-0 left-0 flex w-[260px] flex-col border-r border-line bg-surface"
            >
              <SidebarBody pathname={pathname} email={email} onClose={() => setDrawer(false)} />
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main column */}
      <div className="flex min-h-screen min-w-0 flex-col">
        {/* Topbar */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-3 border-b border-line bg-bg/85 px-4 backdrop-blur-xl sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <button
              onClick={() => setDrawer(true)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-line text-muted lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
            <nav className="flex min-w-0 items-center gap-2 text-sm">
              <span className="hidden text-faint sm:inline">Admin</span>
              <ChevronRight className="hidden h-3.5 w-3.5 text-faint sm:inline" />
              <span className="truncate font-medium text-ink">{pageTitle(pathname)}</span>
            </nav>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="hidden text-right sm:block">
              <span className="block text-xs font-medium text-ink">Admin</span>
              <span className="block max-w-[180px] truncate text-[11px] text-faint">
                {email || "Signed in"}
              </span>
            </span>
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary-soft to-primary-strong text-sm font-semibold text-primary-ink">
              {(email || "A").slice(0, 1).toUpperCase()}
            </span>
          </div>
        </header>

        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children}</main>
      </div>
    </div>
  );
}

function SidebarBody({
  pathname,
  email,
  onClose,
}: {
  pathname: string;
  email: string;
  onClose?: () => void;
}) {
  const router = useRouter();
  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  return (
    <>
      <div className="flex items-center justify-between px-5 py-5">
        <Link href="/admin" className="flex items-center gap-2.5">
          <LogoMark className="h-8 w-8" />
          <span className="text-[17px] font-semibold tracking-tight text-ink">
            Orvian
          </span>
          <span className="rounded-md border border-line bg-interactive px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted">
            CMS
          </span>
        </Link>
        {onClose && (
          <button onClick={onClose} className="text-faint lg:hidden" aria-label="Close">
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-2">
        {groups.map((g) => (
          <div key={g.title} className="mb-5">
            <p className="px-2.5 pb-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-faint">
              {g.title}
            </p>
            <div className="flex flex-col gap-0.5">
              {g.items.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`group flex items-center gap-3 rounded-xl px-2.5 py-2.5 text-sm transition-colors ${
                      active
                        ? "bg-primary/10 text-primary"
                        : "text-muted hover:bg-white/[0.04] hover:text-ink"
                    }`}
                  >
                    <item.icon
                      className={`h-[18px] w-[18px] ${active ? "text-primary" : "text-faint group-hover:text-muted"}`}
                    />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="border-t border-line p-3">
        <div className="flex items-center gap-3 rounded-xl px-2 py-2">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary-soft to-primary-strong text-sm font-semibold text-primary-ink">
            {(email || "A").slice(0, 1).toUpperCase()}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-ink">Admin</p>
            <p className="truncate text-[11px] text-faint">{email || "Signed in"}</p>
          </div>
        </div>
        <button
          onClick={async () => {
            await logout();
            router.replace("/login");
          }}
          className="mt-1 flex w-full items-center gap-3 rounded-xl px-2.5 py-2.5 text-sm text-muted transition-colors hover:bg-white/[0.04] hover:text-ink"
        >
          <LogOut className="h-[18px] w-[18px] text-faint" />
          Logout
        </button>
      </div>
    </>
  );
}
