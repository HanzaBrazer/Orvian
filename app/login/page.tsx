"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Check,
  LogOut,
} from "lucide-react";
import { Logo, LogoMark } from "@/components/logo";
import { signIn, logout, useAdmin, isSupabaseConfigured } from "@/lib/auth";

const perks = [
  "Publish and edit blog articles in seconds",
  "A clean, dashboard-style content editor",
  "Your content, always in the Orvian look",
];

export default function LoginPage() {
  const router = useRouter();
  const admin = useAdmin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "";
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await signIn(email, password);
    setLoading(false);
    if (res.ok) router.push("/blog");
    else setError(res.error || "Incorrect email or password.");
  };

  return (
    <main className="min-h-screen bg-bg lg:grid lg:grid-cols-2">
      {/* Left visual panel */}
      <div className="relative hidden overflow-hidden lg:block">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hills.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/85 via-black/60 to-black/40" />
        <div className="relative flex h-full flex-col justify-between p-10 xl:p-14">
          <Logo />
          <div className="max-w-md">
            <span className="chip mb-6">Orvian Studio</span>
            <h1 className="display text-4xl text-white xl:text-5xl">
              Publish content that moves people.
            </h1>
            <p className="mt-4 text-pretty text-[15px] leading-relaxed text-white/80">
              Sign in to the Orvian dashboard to add and edit blog articles —
              all in the signature Orvian style.
            </p>
            <ul className="mt-8 flex flex-col gap-3">
              {perks.map((p) => (
                <li key={p} className="flex items-center gap-3 text-sm text-white/90">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <p className="text-xs text-white/50">© 2026 Orvian AI. All rights reserved.</p>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex min-h-screen flex-col items-center justify-center px-5 py-10 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-[400px]"
        >
          <div className="mb-8 flex items-center justify-between">
            <Link href="/" className="lg:hidden">
              <Logo />
            </Link>
            <Link
              href="/"
              className="ml-auto inline-flex items-center gap-1.5 text-sm link-muted"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to home
            </Link>
          </div>

          {admin ? (
            <SignedIn onGo={() => router.push("/blog")} />
          ) : (
            <>
              <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                <span className="relative mb-5 hidden lg:inline-flex">
                  <LogoMark className="h-11 w-11" />
                  <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-bg bg-primary text-primary-ink">
                    <ShieldCheck className="h-3 w-3" />
                  </span>
                </span>
                <h2 className="display text-3xl text-ink sm:text-4xl">Sign in</h2>
                <p className="mt-2 text-sm text-muted">
                  Access the Orvian dashboard to manage your blog.
                </p>
              </div>

              <form onSubmit={submit} className="mt-8 flex flex-col gap-3.5">
                <label className="block">
                  <span className="mb-1.5 block text-xs font-medium text-muted">
                    Email
                  </span>
                  <span className="flex items-center gap-2.5 rounded-2xl border border-line bg-white/[0.02] px-3.5 focus-within:border-primary/50">
                    <Mail className="h-4 w-4 shrink-0 text-faint" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError("");
                      }}
                      autoFocus
                      placeholder="you@example.com"
                      className="w-full bg-transparent py-3 text-sm text-ink placeholder:text-faint focus:outline-none"
                    />
                  </span>
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-xs font-medium text-muted">
                    Password
                  </span>
                  <span className="flex items-center gap-2.5 rounded-2xl border border-line bg-white/[0.02] px-3.5 focus-within:border-primary/50">
                    <Lock className="h-4 w-4 shrink-0 text-faint" />
                    <input
                      type={show ? "text" : "password"}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setError("");
                      }}
                      placeholder="••••••••"
                      className="w-full bg-transparent py-3 text-sm text-ink placeholder:text-faint focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShow((v) => !v)}
                      aria-label={show ? "Hide password" : "Show password"}
                      className="shrink-0 text-faint hover:text-ink"
                    >
                      {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </span>
                </label>

                {error && <p className="text-sm text-[#ff8a6b]">{error}</p>}

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary mt-2 w-full py-3 disabled:opacity-70"
                >
                  {loading ? (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-ink/40 border-t-primary-ink" />
                  ) : (
                    <>
                      Sign in <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6 rounded-2xl border border-white/5 bg-white/[0.02] p-3.5 text-center">
                <p className="text-[12px] leading-relaxed text-faint">
                  {isSupabaseConfigured
                    ? "Use the admin email & password created in your Supabase project."
                    : "Supabase is not configured yet — add your environment variables to enable admin login."}
                </p>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </main>
  );
}

function SignedIn({ onGo }: { onGo: () => void }) {
  return (
    <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
      <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 text-primary">
        <ShieldCheck className="h-6 w-6" />
      </span>
      <h2 className="display text-3xl text-ink sm:text-4xl">You&apos;re signed in</h2>
      <p className="mt-2 text-sm text-muted">
        You have admin access. Head to the blog to add or edit articles.
      </p>
      <div className="mt-7 flex w-full flex-col gap-2.5">
        <button onClick={onGo} className="btn-primary w-full py-3">
          Go to Blog dashboard <ArrowRight className="h-4 w-4" />
        </button>
        <button onClick={logout} className="btn-secondary w-full py-3">
          <LogOut className="h-4 w-4" /> Log out
        </button>
      </div>
    </div>
  );
}
