"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import { Logo } from "@/components/logo";
import { Icon } from "@/components/icon";
import { nav, megaMenu } from "@/lib/site";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mega, setMega] = useState(false);
  const [mobile, setMobile] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobile(false);
    setMega(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobile ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobile]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const openMega = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMega(true);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMega(false), 140);
  };

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <div className="container-x pt-3 sm:pt-4">
        <div
          className={`pointer-events-auto relative mx-auto flex w-full items-center justify-between gap-3 rounded-full border px-2.5 py-2 pl-4 transition-all duration-500 ease-out ${
            scrolled ? "md:max-w-[680px]" : "md:max-w-[960px]"
          } ${
            scrolled || mega
              ? "border-white/10 bg-[#0e0e12]/80 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.9)] backdrop-blur-xl"
              : "border-white/[0.07] bg-[#141418]/50 backdrop-blur-md"
          }`}
        >
          <Logo />

          {/* Desktop nav */}
          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex">
            {nav.links.map((link) =>
              link.mega ? (
                <div
                  key={link.href}
                  onMouseEnter={openMega}
                  onMouseLeave={scheduleClose}
                  className="relative"
                >
                  <Link
                    href={link.href}
                    className={`flex items-center gap-1 rounded-full px-4 py-2 text-sm transition-colors ${
                      isActive(link.href) || mega
                        ? "bg-white/10 text-ink"
                        : "text-muted hover:text-ink"
                    }`}
                  >
                    {link.label}
                    <ChevronDown
                      className={`h-3.5 w-3.5 transition-transform duration-300 ${
                        mega ? "rotate-180" : ""
                      }`}
                    />
                  </Link>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-full px-4 py-2 text-sm transition-colors ${
                    isActive(link.href)
                      ? "bg-white/10 text-ink"
                      : "text-muted hover:text-ink"
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/features" className="btn-primary hidden px-5 py-2.5 md:inline-flex">
              Sign Up
            </Link>
            <button
              onClick={() => setMobile(true)}
              aria-label="Open menu"
              className="btn-primary h-10 w-10 !px-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>

          {/* Mega menu */}
          <AnimatePresence>
            {mega && (
              <motion.div
                onMouseEnter={openMega}
                onMouseLeave={scheduleClose}
                initial={{ opacity: 0, y: 10, scale: 0.985 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.985 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="absolute left-1/2 top-[calc(100%+12px)] hidden w-[860px] max-w-[92vw] -translate-x-1/2 md:block"
              >
                <MegaPanel />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobile && <MobileMenu onClose={() => setMobile(false)} isActive={isActive} />}
      </AnimatePresence>
    </header>
  );
}

function MegaPanel() {
  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#0e0e12]/95 p-2 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.95)] backdrop-blur-2xl">
      <div className="grid grid-cols-[1fr_1fr_1fr_0.9fr] gap-2">
        {megaMenu.columns.map((col) => (
          <div key={col.title} className="p-3">
            <p className="px-2 pb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-faint">
              {col.title}
            </p>
            <div className="flex flex-col">
              {col.items.map((item) => (
                <Link
                  key={item.label}
                  href="/features"
                  className="group flex items-start gap-3 rounded-2xl p-2.5 transition-colors hover:bg-white/[0.06]"
                >
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-line bg-interactive text-muted transition-colors group-hover:border-primary/40 group-hover:text-primary">
                    <Icon name={item.icon} className="h-4 w-4" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-medium text-ink">
                      {item.label}
                    </span>
                    <span className="block truncate text-xs text-faint">
                      {item.desc}
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ))}

        <div className="p-3">
          <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#171720] to-[#101015] p-4">
            <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-primary/20 blur-2xl" />
            <div>
              <span className="chip mb-3 !border-primary/30 !bg-primary/10 !text-primary">
                {megaMenu.featured.tag}
              </span>
              <p className="font-serif text-lg text-ink">
                {megaMenu.featured.title}
              </p>
              <p className="mt-1.5 text-xs leading-relaxed text-muted">
                {megaMenu.featured.desc}
              </p>
            </div>
            <Link
              href="/features"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-transform hover:gap-2.5"
            >
              {megaMenu.featured.cta}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileMenu({
  onClose,
  isActive,
}: {
  onClose: () => void;
  isActive: (href: string) => boolean;
}) {
  const [productOpen, setProductOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="pointer-events-auto fixed inset-0 z-50 md:hidden"
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-x-3 top-3 overflow-hidden rounded-3xl border border-white/10 bg-[#0e0e12]/95 backdrop-blur-2xl"
      >
        <div className="flex items-center justify-between border-b border-white/5 px-4 py-3">
          <Logo />
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line-strong/60 bg-interactive/60 text-ink"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="max-h-[70vh] overflow-y-auto px-3 py-3">
          <Link
            href="/"
            className={`block rounded-2xl px-4 py-3.5 text-base ${
              isActive("/") ? "bg-white/10 text-ink" : "text-muted"
            }`}
          >
            Home
          </Link>

          <button
            onClick={() => setProductOpen((v) => !v)}
            className="flex w-full items-center justify-between rounded-2xl px-4 py-3.5 text-left text-base text-muted"
          >
            Product
            <ChevronDown
              className={`h-4 w-4 transition-transform ${
                productOpen ? "rotate-180 text-ink" : ""
              }`}
            />
          </button>
          <AnimatePresence initial={false}>
            {productOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-1 gap-1 px-2 pb-2">
                  {megaMenu.columns.flatMap((c) => c.items).map((item) => (
                    <Link
                      key={item.label}
                      href="/features"
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-muted hover:bg-white/[0.05] hover:text-ink"
                    >
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-line bg-interactive text-primary">
                        <Icon name={item.icon} className="h-4 w-4" />
                      </span>
                      {item.label}
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <Link
            href="/blog"
            className={`block rounded-2xl px-4 py-3.5 text-base ${
              isActive("/blog") ? "bg-white/10 text-ink" : "text-muted"
            }`}
          >
            Blog
          </Link>

          <div className="mt-3 flex flex-col gap-2 border-t border-white/5 px-1 pt-4">
            <Link href="/features" className="btn-primary w-full py-3">
              Start for free
            </Link>
            <Link href="/features" className="btn-secondary w-full py-3">
              Sign Up
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
