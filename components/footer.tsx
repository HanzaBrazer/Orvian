import Link from "next/link";
import { Logo } from "@/components/logo";
import { footer } from "@/lib/site";
import { SubscribeForm } from "@/components/subscribe-form";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-surface pt-16 sm:pt-20">
      <div className="container-x">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <Logo />
            <div className="mt-6 max-w-sm">
              <SubscribeForm />
              <p className="mt-3 text-sm text-faint">
                No weekly emails. Just thoughtful updates, when they matter.
              </p>
            </div>
          </div>

          {footer.columns.map((col) => (
            <div key={col.title}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-faint">
                {col.title}
              </p>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => {
                  const href =
                    l === "Blog"
                      ? "/blog"
                      : l === "Features" || l === "Pricing" || l === "How It Works"
                      ? "/features"
                      : "#";
                  return (
                    <li key={l}>
                      <Link href={href} className="text-sm link-muted">
                        {l}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Watermark */}
      <div
        aria-hidden
        className="pointer-events-none relative mt-14 select-none"
      >
        <div className="container-x">
          <div className="flex items-end justify-between">
            <span className="block bg-gradient-to-b from-white/[0.05] to-transparent bg-clip-text font-serif text-[22vw] leading-[0.7] tracking-tight text-transparent">
              Orvian
            </span>
          </div>
        </div>
      </div>

      <div className="container-x relative -mt-6 pb-8">
        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/5 pt-6 sm:flex-row">
          <p className="text-xs text-faint">
            © 2026 Orvian AI. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link href="#" className="text-xs link-muted">
              Privacy
            </Link>
            <Link href="#" className="text-xs link-muted">
              Terms
            </Link>
            <Link href="#" className="text-xs link-muted">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
