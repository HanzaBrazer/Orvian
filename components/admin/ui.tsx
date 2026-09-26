"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { PostStatus } from "@/lib/blog";

export function StatusBadge({ status }: { status?: PostStatus }) {
  const s = status ?? "published";
  const map: Record<PostStatus, string> = {
    published: "border-success/25 bg-success/10 text-success",
    draft: "border-line-strong/60 bg-white/[0.04] text-muted",
  };
  const dot: Record<PostStatus, string> = {
    published: "bg-success",
    draft: "bg-faint",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium capitalize ${map[s]}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dot[s]}`} />
      {s}
    </span>
  );
}

export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = "Confirm",
  destructive = false,
  loading = false,
  onCancel,
  onConfirm,
}: {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  destructive?: boolean;
  loading?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[75] flex items-center justify-center p-4"
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onCancel} />
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-[400px] rounded-2xl border border-white/10 bg-[#0e0e12]/95 p-6 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.95)] backdrop-blur-2xl"
          >
            <h3 className="text-lg font-semibold text-ink">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{message}</p>
            <div className="mt-6 flex justify-end gap-2">
              <button onClick={onCancel} className="btn-secondary px-4 py-2.5 text-sm">
                Cancel
              </button>
              <button
                onClick={onConfirm}
                disabled={loading}
                className={`inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-colors disabled:opacity-60 ${
                  destructive
                    ? "bg-[#ff8a6b] text-black hover:brightness-105"
                    : "btn-primary"
                }`}
              >
                {loading && (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/40 border-t-black" />
                )}
                {confirmLabel}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function EmptyState({
  icon,
  title,
  message,
  action,
}: {
  icon: React.ReactNode;
  title: string;
  message: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-line-strong/50 bg-card/40 px-6 py-16 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-line bg-interactive text-faint">
        {icon}
      </span>
      <h3 className="mt-5 text-lg font-semibold text-ink">{title}</h3>
      <p className="mt-1.5 max-w-sm text-sm text-muted">{message}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
