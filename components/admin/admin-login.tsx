"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Lock, User, Eye, EyeOff, ShieldCheck, ArrowRight } from "lucide-react";
import { LogoMark } from "@/components/logo";
import { login } from "@/lib/auth";

export function AdminLogin({
  open,
  onClose,
  onSuccess,
}: {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      setUsername("");
      setPassword("");
      setError(false);
      setShow(false);
      document.body.style.overflow = "hidden";
    }
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    // small delay for feel
    setTimeout(() => {
      const ok = login(username, password);
      setLoading(false);
      if (ok) {
        onSuccess();
      } else {
        setError(true);
      }
    }, 450);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[70] flex items-center justify-center p-4"
        >
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-[420px] overflow-hidden rounded-[28px] border border-white/10 bg-[#0e0e12]/95 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.95)] backdrop-blur-2xl"
          >
            {/* glow */}
            <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />

            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-line-strong/60 bg-interactive/60 text-ink hover:bg-interactive2"
            >
              <X className="h-4.5 w-4.5" />
            </button>

            <div className="relative px-7 pb-7 pt-9">
              <div className="flex flex-col items-center text-center">
                <div className="relative">
                  <LogoMark className="h-12 w-12" />
                  <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-[#0e0e12] bg-primary text-primary-ink">
                    <ShieldCheck className="h-3 w-3" />
                  </span>
                </div>
                <h2 className="display mt-5 text-3xl text-ink">Admin Sign In</h2>
                <p className="mt-2 text-sm text-muted">
                  Sign in to manage articles and content.
                </p>
              </div>

              <form onSubmit={submit} className="mt-7 flex flex-col gap-3">
                <label className="block">
                  <span className="mb-1.5 block text-xs font-medium text-muted">
                    Username
                  </span>
                  <span className="flex items-center gap-2.5 rounded-2xl border border-line bg-white/[0.02] px-3.5 focus-within:border-primary/50">
                    <User className="h-4 w-4 shrink-0 text-faint" />
                    <input
                      value={username}
                      onChange={(e) => {
                        setUsername(e.target.value);
                        setError(false);
                      }}
                      autoFocus
                      placeholder="admin"
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
                        setError(false);
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
                      {show ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </span>
                </label>

                <AnimatePresence>
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-sm text-[#ff8a6b]"
                    >
                      Incorrect username or password.
                    </motion.p>
                  )}
                </AnimatePresence>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary mt-2 w-full py-3 disabled:opacity-70"
                >
                  {loading ? (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-ink/40 border-t-primary-ink" />
                  ) : (
                    <>
                      Sign in
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-5 rounded-2xl border border-white/5 bg-white/[0.02] p-3 text-center">
                <p className="text-[11px] leading-relaxed text-faint">
                  Demo credentials — username{" "}
                  <span className="font-medium text-muted">admin</span>, password{" "}
                  <span className="font-medium text-muted">orvian2026</span>
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
