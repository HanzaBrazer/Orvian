import Link from "next/link";

export function LogoMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <span
      className={`relative inline-flex shrink-0 items-center justify-center rounded-[10px] bg-gradient-to-br from-white to-[#c9d2d6] ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="h-[62%] w-[62%]"
        aria-hidden="true"
      >
        <path
          d="M12 2.5c5.25 0 9.5 4.25 9.5 9.5s-4.25 9.5-9.5 9.5S2.5 17.25 2.5 12c0-3.2 1.58-6.03 4-7.76"
          stroke="#0c0c0f"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
        <circle cx="12" cy="12" r="3.1" fill="#0c0c0f" />
      </svg>
    </span>
  );
}

export function Logo({
  className = "",
  markClass,
}: {
  className?: string;
  markClass?: string;
}) {
  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-2.5 ${className}`}
      aria-label="Orvian home"
    >
      <LogoMark className={markClass ?? "h-8 w-8"} />
      <span className="text-[19px] font-semibold tracking-[-0.01em] text-ink">
        Orvian
      </span>
    </Link>
  );
}
