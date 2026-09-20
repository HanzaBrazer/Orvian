import { SectionHeading } from "@/components/ui";
import { Stagger, StaggerItem } from "@/components/reveal";
import { Icon } from "@/components/icon";
import { steps } from "@/lib/site";

export function StepsSection() {
  return (
    <section className="container-x py-16 sm:py-24">
      <SectionHeading
        title={
          <>
            Start Improving
            <br className="hidden sm:block" /> Productivity
          </>
        }
        subtitle="Orvian combines intelligent workflows, real-time insights, and effortless integration—deliver a world-class onboarding experience."
      />

      <Stagger className="mt-12 grid grid-cols-1 gap-4 sm:mt-16 md:grid-cols-3">
        {steps.map((s, i) => (
          <StaggerItem key={s.title}>
            <div className="group relative h-full overflow-hidden rounded-3xl border border-line bg-card p-6 transition-colors duration-300 hover:border-line-strong">
              {i === 1 && (
                <div className="grain pointer-events-none absolute inset-0 opacity-40" />
              )}
              <div className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-interactive text-primary transition-transform duration-300 group-hover:-translate-y-0.5">
                <Icon name={s.icon} className="h-5 w-5" />
              </div>
              <p className="relative mt-6 text-xs font-medium uppercase tracking-wide text-faint">
                {s.step}
              </p>
              <h3 className="relative mt-2 text-lg font-semibold text-ink">
                {s.title}
              </h3>
              <p className="relative mt-2 text-sm leading-relaxed text-muted">
                {s.desc}
              </p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
