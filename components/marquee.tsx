const partners = [
  "/partners/partner-1.svg",
  "/partners/partner-2.svg",
  "/partners/partner-3.svg",
  "/partners/partner-4.svg",
  "/partners/partner-5.svg",
];

export function TrustBar({ caption = true }: { caption?: boolean }) {
  return (
    <div className="flex flex-col items-center gap-6">
      {/* Desktop / tablet: centered static row */}
      <div className="hidden w-full flex-wrap items-center justify-center gap-x-6 gap-y-4 sm:flex lg:gap-x-12">
        {partners.map((src, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={i}
            src={src}
            alt="Partner logo"
            className="h-8 w-auto opacity-80 transition-opacity duration-300 hover:opacity-100 lg:h-9"
          />
        ))}
      </div>

      {/* Mobile: gentle marquee */}
      <div className="mask-fade-x w-full overflow-hidden sm:hidden">
        <div className="flex w-max animate-marquee items-center gap-8 pr-8">
          {[...partners, ...partners].map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={i} src={src} alt="" className="h-8 w-auto opacity-80" />
          ))}
        </div>
      </div>

      {caption && (
        <p className="text-center text-sm text-faint">
          More than 1 million companies worldwide already trust Orvian
        </p>
      )}
    </div>
  );
}
