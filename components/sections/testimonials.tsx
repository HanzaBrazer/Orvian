import Image from "next/image";
import { SectionHeading } from "@/components/ui";
import { Stagger, StaggerItem, Reveal } from "@/components/reveal";
import { BrandLogo } from "@/components/brand-logos";
import { testimonials } from "@/lib/site";

export function TestimonialsSection() {
  return (
    <section className="container-x py-16 sm:py-24">
      <SectionHeading
        eyebrow="Testimonials"
        title={
          <>
            What Our Customers
            <br className="hidden sm:block" /> Are Saying
          </>
        }
        subtitle="See why customers rely on Orvian to streamline their processes"
      />

      <Reveal delay={0.1}>
        <div className="mt-8 flex justify-center">
          <div className="flex items-center gap-2 text-faint">
            <Laurel />
            <span className="text-xs font-medium leading-tight text-muted">
              App of
              <br />
              The Year
            </span>
            <Laurel flip />
          </div>
        </div>
      </Reveal>

      <Stagger className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-3">
        {testimonials.map((t, i) => (
          <StaggerItem key={t.name}>
            <figure
              className={`flex h-full flex-col rounded-3xl border p-6 transition-colors ${
                i === 1
                  ? "border-line-strong bg-elevated"
                  : "border-line bg-card"
              }`}
            >
              <div className="flex items-center gap-3">
                <Image
                  src={t.avatar}
                  alt={t.name}
                  width={48}
                  height={48}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <figcaption>
                  <p className="text-sm font-semibold text-ink">{t.name}</p>
                  <p className="text-xs text-faint">{t.role}</p>
                </figcaption>
              </div>
              <blockquote className="mt-5 flex-1 text-sm leading-relaxed text-muted">
                “{t.quote}”
              </blockquote>
              <div className="mt-6 text-faint/80">
                <BrandLogo name={t.company} />
              </div>
            </figure>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}

function Laurel({ flip }: { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 40 48"
      className={`h-12 w-9 text-faint ${flip ? "-scale-x-100" : ""}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
    >
      <path d="M30 4C16 8 10 20 12 44" />
      <path d="M28 12c-5 0-8 3-8 3M26 20c-5 0-8 3-8 3M23 28c-4 0-7 3-7 3M20 36c-3 0-6 2-6 2" />
    </svg>
  );
}
