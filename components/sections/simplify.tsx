import Image from "next/image";
import { Check, MessageSquare, Folder } from "lucide-react";
import { SectionHeading } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { BarChart } from "@/components/dashboard/charts";

const integrationRows = [
  ["dropbox", "slack", "spotify", "grammarly", "webflow"],
  ["shopify", "notion", "mailchimp", "cloudflare", "asana"],
  ["squarespace", "reddit", "paypal", "wix", "dropbox"],
];

const tabs = [
  { label: "All", count: 10 },
  { label: "Important", count: null, active: true },
  { label: "Notes", count: 5 },
  { label: "Links", count: 10 },
];
const tasks = [
  { text: "Create a user flow of social application design", done: true, status: "Approved" },
  { text: "Create a user flow of social application design", done: true, status: "In review" },
  { text: "Landing page design for Fintech project", done: true, status: "In review" },
  { text: "Interactive prototype for the app", done: false, status: "In review" },
];
const collaborators = [
  { name: "Gabriel Julian", avatar: "/images/avatar-javier.jpg", x: "right-6 top-4", color: "#6e3ff3" },
  { name: "William Henry", avatar: "/images/avatar-4.jpg", x: "left-6 top-24", color: "#f17b2c" },
  { name: "Adam Gill", avatar: "/images/avatar-1.jpg", x: "right-10 top-28", color: "#375dfb" },
];

export function SimplifySection() {
  return (
    <section className="container-x py-16 sm:py-24">
      <SectionHeading
        eyebrow="More Features"
        title={
          <>
            Simplify Your
            <br className="hidden sm:block" /> Workflows
          </>
        }
        subtitle="Orvian combines intelligent workflows, real-time insights, and effortless integration—deliver a world-class onboarding experience."
      />

      <div className="mt-12 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-2">
        {/* Create Unlimited Task */}
        <Reveal>
          <FeatureCard
            title="Create Unlimited Task"
            desc="Progress tracking is a crucial feature in a task management app as it allows users to stay on top of every deliverable."
          >
            <div className="rounded-2xl border border-line bg-surface/80 p-4">
              <div className="no-scrollbar flex items-center gap-4 overflow-x-auto border-b border-line pb-3 text-sm">
                {tabs.map((t) => (
                  <span
                    key={t.label}
                    className={`flex shrink-0 items-center gap-1.5 ${
                      t.active ? "text-ink" : "text-faint"
                    }`}
                  >
                    {t.label}
                    {t.count != null && (
                      <span className="rounded-full bg-interactive px-1.5 text-[10px] text-muted">
                        {t.count}
                      </span>
                    )}
                  </span>
                ))}
              </div>
              <ul className="mt-3 flex flex-col gap-2.5">
                {tasks.map((t, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span
                      className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${
                        t.done ? "bg-[#ff8a6b]" : "border border-line-strong"
                      }`}
                    >
                      {t.done && <Check className="h-2.5 w-2.5 text-black" strokeWidth={3} />}
                    </span>
                    <span className="min-w-0 flex-1 truncate text-[13px] text-muted">
                      {t.text}
                    </span>
                    <span
                      className={`shrink-0 rounded-md px-2 py-0.5 text-[10px] ${
                        t.status === "Approved"
                          ? "bg-success/15 text-success"
                          : "bg-interactive text-faint"
                      }`}
                    >
                      {t.status}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </FeatureCard>
        </Reveal>

        {/* Collaborate on Tasks */}
        <Reveal delay={0.05}>
          <PhotoFeatureCard
            title="Collaborate on Tasks"
            desc="Bring the right people together and move work forward with shared context."
          >
            <div className="relative h-full min-h-[220px]">
              {collaborators.map((c) => (
                <div key={c.name} className={`absolute ${c.x} flex items-center gap-2`}>
                  <span
                    className="h-3 w-3 rotate-45 rounded-[3px]"
                    style={{ backgroundColor: c.color }}
                  />
                  <span className="flex items-center gap-2 rounded-full bg-black/50 px-2 py-1 text-xs text-white backdrop-blur">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={c.avatar} alt="" className="h-5 w-5 rounded-full object-cover" />
                    {c.name}
                  </span>
                </div>
              ))}
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between">
                <div className="flex -space-x-2">
                  {["/images/avatar-linda.jpg", "/images/avatar-3.jpg", "/images/avatar-2.jpg"].map(
                    (a) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        key={a}
                        src={a}
                        alt=""
                        className="h-7 w-7 rounded-full border-2 border-black/40 object-cover"
                      />
                    )
                  )}
                </div>
                <div className="flex items-center gap-4 text-xs text-white/80">
                  <span className="flex items-center gap-1.5">
                    <MessageSquare className="h-3.5 w-3.5" /> 12 comments
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Folder className="h-3.5 w-3.5" /> 0 files
                  </span>
                </div>
              </div>
            </div>
          </PhotoFeatureCard>
        </Reveal>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Progress Tracking */}
        <Reveal>
          <PhotoFeatureCard
            title="Progress Tracking"
            desc="Progress tracking is a crucial feature in a task management app as it allows users."
          >
            <div className="rounded-2xl border border-white/10 bg-black/35 p-4 backdrop-blur-sm">
              <BarChart />
            </div>
          </PhotoFeatureCard>
        </Reveal>

        {/* Seamless Integration */}
        <Reveal delay={0.05} className="min-w-0 lg:col-span-2">
          <PhotoFeatureCard
            title="Seamless Integration"
            desc="Seamless integration is a crucial aspect of a task management app, enhancing its functionality and user experience."
          >
            <div className="flex flex-col gap-3 overflow-hidden py-1">
              {integrationRows.map((rowLogos, row) => (
                <div key={row} className="mask-fade-x overflow-hidden">
                  <div
                    className={`flex w-max items-center gap-3 ${
                      row === 1
                        ? "animate-marquee-slow"
                        : "animate-marquee"
                    } ${row === 1 ? "[animation-direction:reverse]" : ""}`}
                  >
                    {[...rowLogos, ...rowLogos].map((name, i) => (
                      <LogoPill key={`${row}-${name}-${i}`} name={name} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </PhotoFeatureCard>
        </Reveal>
      </div>
    </section>
  );
}

function FeatureCard({
  title,
  desc,
  children,
}: {
  title: string;
  desc: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full min-w-0 flex-col gap-6 rounded-3xl border border-line bg-card p-5 sm:p-6">
      <div className="min-w-0 flex-1">{children}</div>
      <div>
        <h3 className="text-lg font-semibold text-ink">{title}</h3>
        <p className="mt-1.5 max-w-md text-sm leading-relaxed text-muted">{desc}</p>
      </div>
    </div>
  );
}

function PhotoFeatureCard({
  title,
  desc,
  children,
}: {
  title: string;
  desc: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex h-full min-h-[320px] flex-col justify-between overflow-hidden rounded-3xl border border-line p-5 sm:p-6">
      <Image
        src="/images/hills.jpg"
        alt=""
        fill
        sizes="(max-width:1024px) 100vw, 500px"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/55 to-black/85" />
      <div className="relative flex-1">{children}</div>
      <div className="relative mt-6">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="mt-1.5 max-w-md text-sm leading-relaxed text-white/80">{desc}</p>
      </div>
    </div>
  );
}

function LogoPill({ name }: { name: string }) {
  return (
    <span className="inline-flex shrink-0 items-center rounded-full border border-white/10 bg-white/[0.06] px-5 py-2.5 backdrop-blur-md">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/integrations/${name}.svg`}
        alt={name}
        className="h-[18px] w-auto"
      />
    </span>
  );
}
