import Link from "next/link";
import { Phone } from "lucide-react";
import { Reveal } from "@/components/reveal";

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-line-strong/60 bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-muted backdrop-blur">
      {children}
    </span>
  );
}

/** Frosted-glass hero tagline: a "New" chip + gradient text, matching Figma. */
export function TaglineBadge({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="inline-flex items-center gap-2 overflow-hidden rounded-[10px] border border-white/[0.08] bg-[rgba(34,34,40,0.5)] py-1 pl-1 pr-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-lg">
      <span className="rounded-md bg-[#393946] px-2 py-0.5 text-sm font-medium text-[#d8dfff]">
        {label}
      </span>
      <span
        className="bg-clip-text text-sm text-transparent"
        style={{
          backgroundImage:
            "linear-gradient(180deg, #ffffff 68%, #9ef7ff 99%, #7bd0ea 140%)",
        }}
      >
        {children}
      </span>
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className = "",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
}) {
  const alignCls =
    align === "center" ? "items-center text-center" : "items-start text-left";
  return (
    <div className={`flex flex-col ${alignCls} ${className}`}>
      {eyebrow && (
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2 className="display mt-5 text-balance text-4xl text-ink sm:text-5xl lg:text-[56px]">
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.1}>
          <p
            className={`mt-4 max-w-xl text-pretty text-[15px] leading-relaxed text-muted ${
              align === "center" ? "mx-auto" : ""
            }`}
          >
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}

export function CTAButtons({
  primaryLabel = "Start for free",
  primaryHref = "/features",
  secondaryLabel = "Talk to sales",
  secondaryHref = "#",
  className = "",
}: {
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  className?: string;
}) {
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <Link href={primaryHref} className="btn-primary px-6 py-3">
        {primaryLabel}
      </Link>
      <Link href={secondaryHref} className="btn-secondary px-5 py-3">
        <Phone className="h-4 w-4" />
        {secondaryLabel}
      </Link>
    </div>
  );
}
