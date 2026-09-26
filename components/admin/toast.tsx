"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, AlertCircle, X } from "lucide-react";

type Toast = { id: number; message: string; kind: "success" | "error" };
type Ctx = { toast: (message: string, kind?: "success" | "error") => void };

const ToastContext = createContext<Ctx>({ toast: () => {} });
export const useToast = () => useContext(ToastContext);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Toast[]>([]);

  const toast = useCallback(
    (message: string, kind: "success" | "error" = "success") => {
      const id = Date.now() + Math.random();
      setItems((prev) => [...prev, { id, message, kind }]);
      setTimeout(() => {
        setItems((prev) => prev.filter((t) => t.id !== id));
      }, 3500);
    },
    []
  );

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="pointer-events-none fixed right-4 top-4 z-[80] flex w-[min(92vw,340px)] flex-col gap-2">
        <AnimatePresence>
          {items.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: -12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-auto flex items-start gap-2.5 rounded-2xl border border-line bg-[#0e0e12]/95 p-3.5 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.9)] backdrop-blur-xl"
            >
              {t.kind === "success" ? (
                <CheckCircle2 className="mt-0.5 h-[18px] w-[18px] shrink-0 text-success" />
              ) : (
                <AlertCircle className="mt-0.5 h-[18px] w-[18px] shrink-0 text-[#ff8a6b]" />
              )}
              <p className="flex-1 text-sm text-ink">{t.message}</p>
              <button
                onClick={() => setItems((p) => p.filter((x) => x.id !== t.id))}
                className="shrink-0 text-faint hover:text-ink"
                aria-label="Dismiss"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
