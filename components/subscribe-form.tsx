"use client";

import { useState } from "react";
import { Check } from "lucide-react";

export function SubscribeForm({
  variant = "footer",
}: {
  variant?: "footer" | "hero";
}) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setDone(true);
    setEmail("");
    setTimeout(() => setDone(false), 2600);
  };

  return (
    <form
      onSubmit={submit}
      className={`flex w-full items-center gap-2 rounded-full border p-1.5 transition-colors ${
        variant === "hero"
          ? "border-white/15 bg-black/25 backdrop-blur-md"
          : "border-line-strong/70 bg-interactive/60"
      }`}
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email address.."
        aria-label="Email address"
        className="min-w-0 flex-1 bg-transparent px-3.5 py-2 text-sm text-ink placeholder:text-faint focus:outline-none"
      />
      <button type="submit" className="btn-primary shrink-0 px-4 py-2">
        {done ? (
          <>
            <Check className="h-4 w-4" /> Subscribed
          </>
        ) : (
          "Subscribe"
        )}
      </button>
    </form>
  );
}
