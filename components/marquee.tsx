import { BrandLogo } from "@/components/brand-logos";
import { trustLogos } from "@/lib/site";

export function TrustBar({ caption = true }: { caption?: boolean }) {
  const row = [...trustLogos, ...trustLogos];
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="mask-fade-x w-full overflow-hidden">
        <div className="flex w-max animate-marquee items-center gap-12 pr-12 text-faint/80 hover:[animation-play-state:paused]">
          {row.map((name, i) => (
            <div key={`${name}-${i}`} className="shrink-0">
              <BrandLogo name={name} />
            </div>
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
