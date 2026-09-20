const partners = [
  "/partners/partner-1.svg",
  "/partners/partner-2.svg",
  "/partners/partner-3.svg",
  "/partners/partner-4.svg",
  "/partners/partner-5.svg",
];

export function TrustBar({ caption = true }: { caption?: boolean }) {
  const row = [...partners, ...partners, ...partners];
  return (
    <div className="flex flex-col items-center gap-7">
      <div className="mask-fade-x w-full overflow-hidden">
        <div className="flex w-max animate-marquee items-center gap-10 pr-10 sm:gap-16 sm:pr-16">
          {row.map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={i}
              src={src}
              alt="Partner logo"
              className="h-7 w-auto shrink-0 opacity-60 transition-opacity duration-300 hover:opacity-100 sm:h-8"
            />
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
