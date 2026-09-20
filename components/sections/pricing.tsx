"use client";

import { useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui";
import { Stagger, StaggerItem, Reveal } from "@/components/reveal";
import { plans } from "@/lib/site";

export function PricingSection() {
  const [yearly, setYearly] = useState(true);

  return (
    <section className="container-x py-16 sm:py-24">
      <SectionHeading
        eyebrow="Pricing"
        title="Direct, Upfront Pricing"
        subtitle="Choose the plan that fits your needs—no hidden fees, cancel anytime."
      />

      <Reveal delay={0.1}>
        <div className="mt-8 flex justify-center">
          <div className="relative flex items-center rounded-full border border-line bg-card p-1">
            {(["Yearly", "Monthly"] as const).map((label) => {
              const active = (label === "Yearly") === yearly;
              return (
                <button
                  key={label}
                  onClick={() => setYearly(label === "Yearly")}
                  className="relative z-10 rounded-full px-5 py-2 text-sm font-medium transition-colors"
                >
                  <span className={active ? "text-primary-ink" : "text-muted"}>
                    {label}
                  </span>
                  {active && (
                    <motion.span
                      layoutId="price-toggle"
                      className="absolute inset-0 -z-10 rounded-full bg-gradient-to-b from-primary-soft to-primary-strong"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </Reveal>

      <Stagger className="mt-10 grid grid-cols-1 items-start gap-4 lg:grid-cols-3">
        {plans.map((p) => {
          const price = yearly ? p.priceYearly : p.priceMonthly;
          const original = p.original
            ? yearly
              ? p.original.yearly
              : p.original.monthly
            : null;
          return (
            <StaggerItem key={p.name}>
              <div
                className={`relative flex h-full flex-col rounded-3xl border p-6 sm:p-7 ${
                  p.popular
                    ? "border-primary/40 bg-elevated shadow-[0_0_0_1px_rgba(195,248,253,0.15),0_30px_80px_-40px_rgba(195,248,253,0.25)]"
                    : "border-line bg-card"
                }`}
              >
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold text-ink">{p.name}</h3>
                  {p.popular && (
                    <span className="rounded-full bg-success/15 px-2.5 py-0.5 text-xs font-medium text-success">
                      Popular
                    </span>
                  )}
                </div>

                <div className="mt-5 flex items-end gap-2">
                  {original != null && (
                    <span className="mb-1 text-2xl font-medium text-faint line-through">
                      ${original}
                    </span>
                  )}
                  <span className="font-serif text-5xl leading-none text-ink">
                    ${price}
                  </span>
                </div>
                <p className="mt-2 text-xs text-faint">
                  Per user/month, billed {yearly ? "annually" : "monthly"}
                </p>

                <div className="my-6 h-px bg-line" />

                <p className="text-xs font-medium text-muted">{p.audience}</p>
                <ul className="mt-4 flex flex-1 flex-col gap-3">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-muted">
                      <Check className="h-4 w-4 shrink-0 text-primary" />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/features"
                  className={`mt-7 w-full py-3 ${
                    p.popular ? "btn-primary" : "btn-secondary"
                  }`}
                >
                  {p.cta}
                </Link>
              </div>
            </StaggerItem>
          );
        })}
      </Stagger>
    </section>
  );
}
