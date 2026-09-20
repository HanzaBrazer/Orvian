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
