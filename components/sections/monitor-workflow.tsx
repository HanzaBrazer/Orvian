import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { Eyebrow } from "@/components/ui";

export function MonitorWorkflow() {
  return (
    <section className="container-x py-16 sm:py-24">
      <div className="overflow-hidden rounded-[32px] border border-line bg-card">
        <div className="grid grid-cols-1 items-center gap-8 p-5 sm:p-8 lg:grid-cols-2 lg:gap-12">
          {/* text */}
          <div className="order-2 lg:order-1 lg:pl-6">
            <Reveal>
              <Eyebrow>New Features</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="display mt-5 text-4xl text-ink sm:text-5xl">
                Monitor Workflow With Progress Tracking.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted">
                This innovative concept strives to streamline operations,
                providing users with heightened efficiency and convenience by
                eliminating the need to navigate between tools.
              </p>
            </Reveal>
          </div>

          {/* visual */}
          <Reveal delay={0.1} className="order-1 lg:order-2">
            <div className="relative min-h-[360px] overflow-hidden rounded-3xl">
              <Image
                src="/images/hills.jpg"
                alt=""
                fill
                sizes="(max-width:1024px) 100vw, 560px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/35" />

              {/* portrait */}
              <div className="absolute right-5 top-5 h-44 w-36 overflow-hidden rounded-2xl border border-white/20 shadow-2xl sm:h-52 sm:w-44">
                <Image
                  src="/images/feature-portrait.jpg"
                  alt="Team member"
                  fill
                  sizes="200px"
                  className="object-cover"
                />
              </div>

              {/* connections card */}
              <div className="absolute bottom-5 left-5 w-64 rounded-2xl border border-white/12 bg-black/45 p-4 backdrop-blur-xl">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-white">Connections</p>
                  <span className="flex items-center gap-1 rounded-full border border-white/15 px-2 py-0.5 text-[10px] text-white/70">
                    Aug 25-Sept 25 <ChevronDown className="h-2.5 w-2.5" />
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex flex-col gap-2 text-[11px]">
                    <Row dot="#9b7bff" label="Inactive" value="254" />
                    <Row dot="#f17b2c" label="Active" value="3000" />
                    <Row dot="#f4b183" label="Total" value="3254" />
                  </div>
                  <div className="relative h-20 w-20">
                    <svg viewBox="0 0 100 100" className="h-full w-full animate-spin-slow">
                      <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                      <circle cx="50" cy="50" r="30" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                      <circle cx="50" cy="6" r="3.5" fill="#f17b2c" />
                      <circle cx="94" cy="50" r="2.5" fill="#f4b183" />
                    </svg>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/avatar-anna.jpg"
                      alt=""
                      className="absolute left-1/2 top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-black/40 object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Row({ dot, label, value }: { dot: string; label: string; value: string }) {
  return (
    <div>
      <span className="flex items-center gap-1.5 text-white/70">
        <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: dot }} />
        {label}
      </span>
      <span className="text-sm font-semibold text-white">{value}</span>
    </div>
  );
}
