import Image from "next/image";
import { Plus } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { Icon } from "@/components/icon";
import { Eyebrow } from "@/components/ui";
import { Donut, ActivityChart } from "@/components/dashboard/charts";
import { platformFeatures } from "@/lib/site";

export function PlatformShowcase() {
  return (
    <section className="container-x py-16 sm:py-24">
      <div className="overflow-hidden rounded-[32px] border border-line bg-card">
        <div className="grid grid-cols-1 items-stretch gap-8 p-5 sm:p-8 lg:grid-cols-2 lg:gap-10 lg:p-4">
          {/* Left visual */}
          <Reveal>
            <div className="relative min-h-[420px] overflow-hidden rounded-3xl">
              <Image
                src="/images/hills.jpg"
                alt=""
                fill
                sizes="(max-width:1024px) 100vw, 600px"
                className="scale-105 object-cover blur-[2px]"
              />
              <div className="absolute inset-0 bg-black/45" />
              <div className="relative flex flex-col gap-3 p-5">
                <div className="flex gap-3">
                  <div className="glass w-1/2 rounded-2xl p-4">
                    <p className="text-xs text-white/80">Running Task</p>
                    <p className="mt-1 text-4xl font-semibold text-white">65</p>
                    <div className="mt-3 flex items-center gap-3">
                      <Donut percent={45} />
                      <div>
                        <p className="text-xs text-white/70">Tasks</p>
                        <p className="text-xl font-semibold text-white">126</p>
                      </div>
                    </div>
                  </div>
                  <div className="glass flex w-1/2 flex-col rounded-2xl p-4">
                    <p className="text-sm leading-snug text-white/90">
                      Product Design, Figma, Sketch (Software), Prototype
                    </p>
                    <div className="mt-3 flex items-center gap-2">
                      <span className="rounded-md border border-white/15 bg-white/10 px-2 py-0.5 text-[10px] text-white/80">
                        #002
                      </span>
                      <span className="text-[10px] font-medium text-[#ff8a6b]">
                        Done
                      </span>
                    </div>
                    <div className="mt-auto flex items-center gap-2 pt-4">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/images/avatar-linda.jpg"
                        alt=""
                        className="h-7 w-7 rounded-full border border-white/20 object-cover"
                      />
                      <span className="flex h-7 w-7 items-center justify-center rounded-full border border-dashed border-white/40 text-white/70">
                        <Plus className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
                <div className="glass rounded-2xl p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-white">Activity</p>
                    <span className="rounded-md border border-white/15 bg-white/10 px-2 py-1 text-[10px] text-white/80">
                      This Week ▾
                    </span>
                  </div>
                  <div className="mt-2">
                    <ActivityChart />
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right text */}
          <div className="flex flex-col justify-center px-1 lg:pr-8">
            <Reveal>
              <Eyebrow>New Features</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="display mt-5 text-4xl text-ink sm:text-5xl">
                All in one platform for enhanced control.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted">
                This innovative concept strives to streamline operations,
                providing users with heightened efficiency and convenience by
                eliminating the need to navigate between tools.
              </p>
            </Reveal>

            <div className="mt-8 flex flex-col gap-6">
              {platformFeatures.map((f, i) => (
                <Reveal key={f.title} delay={0.15 + i * 0.08}>
                  <div className="flex gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-ink">
                      <Icon name={f.icon} className="h-5 w-5" strokeWidth={1.8} />
                    </span>
                    <div>
                      <h3 className="text-base font-semibold text-ink">
                        {f.title}
                      </h3>
                      <p className="mt-1 max-w-sm text-sm leading-relaxed text-muted">
                        {f.desc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
