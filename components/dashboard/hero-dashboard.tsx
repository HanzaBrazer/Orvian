"use client";

import { motion } from "framer-motion";
import {
  LayoutGrid,
  Command,
  Users,
  FolderKanban,
  Video,
  ListChecks,
  Settings,
  Search,
  Bell,
  ChevronDown,
} from "lucide-react";
import { LogoMark } from "@/components/logo";
import { LineChart } from "@/components/dashboard/charts";

const sideTop = [
  { label: "Dashboard", icon: LayoutGrid, active: true },
  { label: "Teams", icon: Command },
  { label: "Employees", icon: Users },
  { label: "Projects", icon: FolderKanban },
];
const sideBottom = [
  { label: "Meetings", icon: Video },
  { label: "Tasks", icon: ListChecks },
  { label: "Settings", icon: Settings },
];

const skills = [
  { label: "a", value: 26, color: "#f4b183" },
  { label: "b", value: 62, color: "#f17b2c" },
  { label: "c", value: 40, color: "#8fb8ff" },
  { label: "d", value: 100, color: "#9b7bff" },
];

const latest = [
  { name: "Ellie joined team developers", time: "04 April, 2021 | 04:00 PM", a: "/images/avatar-1.jpg" },
  { name: "Jenny joined team HR", time: "04 April, 2021 | 04:00 PM", a: "/images/avatar-linda.jpg" },
  { name: "Adam got employee of the month", time: "03 April, 2021 | 02:00 PM", a: "/images/avatar-javier.jpg" },
  { name: "Robert joined team design", time: "03 April, 2021 | 02:00 PM", a: "/images/avatar-4.jpg" },
];

export function HeroDashboard() {
  return (
    <div className="relative overflow-hidden rounded-[26px] border border-white/10 bg-[#0b0b0e]/95 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)]">
      <div className="grid grid-cols-[186px_1fr]">
        {/* Sidebar */}
        <aside className="flex flex-col gap-6 border-r border-white/5 bg-white/[0.015] p-4">
          <div className="flex items-center gap-2">
            <LogoMark className="h-7 w-7" />
            <span className="text-[15px] font-semibold">Orvian</span>
          </div>
          <nav className="flex flex-col gap-1">
            {sideTop.map((s) => (
              <SideItem key={s.label} {...s} />
            ))}
          </nav>
          <div className="mt-1 h-px bg-white/5" />
          <nav className="flex flex-col gap-1">
            {sideBottom.map((s) => (
              <SideItem key={s.label} {...s} />
            ))}
          </nav>
        </aside>

        {/* Main */}
        <div className="min-w-0 p-5">
          {/* Topbar */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-semibold">
                Good Morning, <span className="font-serif italic">Anna!</span>
              </p>
              <p className="text-xs text-faint">Hope you have a good day</p>
            </div>
            <div className="flex items-center gap-3 text-muted">
              <Search className="h-4 w-4" />
              <Bell className="h-4 w-4" />
              <span className="flex items-center gap-1 rounded-full border border-line bg-interactive/60 p-0.5 pr-1.5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/avatar-anna.jpg"
                  alt=""
                  className="h-6 w-6 rounded-full object-cover"
                />
                <ChevronDown className="h-3 w-3" />
              </span>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-[1.15fr_1.15fr_0.9fr] gap-3">
            {/* Skill Strength */}
            <Card className="col-span-1">
              <p className="text-[13px] font-semibold">Skill Strength</p>
              <div className="mt-4 flex h-[92px] items-end gap-3">
                {skills.map((s, i) => (
                  <div key={s.label} className="flex flex-1 flex-col items-center gap-1.5">
                    <div className="flex h-[80px] w-full items-end">
                      <motion.div
                        initial={{ height: 0 }}
                        whileInView={{ height: `${s.value}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, delay: 0.15 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                        className="w-full rounded-md"
                        style={{ backgroundColor: s.color }}
                      />
                    </div>
                    <span className="text-[9px] text-faint">{s.label}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 grid grid-cols-2 gap-1.5 text-[9px] text-faint">
                <Legend color="#f17b2c" label="Marketing" />
                <Legend color="#f4b183" label="Content" />
                <Legend color="#8fb8ff" label="Developers" />
                <Legend color="#9b7bff" label="Design" />
              </div>
            </Card>

            {/* Connections */}
            <Card>
              <div className="flex items-center justify-between">
                <p className="text-[13px] font-semibold">Connections</p>
                <span className="flex items-center gap-1 rounded-full border border-line px-2 py-0.5 text-[9px] text-faint">
                  Aug 25-Sept 25 <ChevronDown className="h-2.5 w-2.5" />
                </span>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <div className="flex flex-col gap-2 text-[10px]">
                  <Stat dot="#9b7bff" label="Inactive" value="254" />
                  <Stat dot="#f17b2c" label="Active" value="3000" />
                  <Stat dot="#f4b183" label="Total" value="3254" />
                </div>
                <Orbit />
              </div>
            </Card>

            {/* Latest info */}
            <Card>
              <p className="text-[13px] font-semibold">Latest Info</p>
              <div className="mt-3 flex flex-col gap-2.5">
                {latest.map((l) => (
                  <div key={l.name} className="flex items-center gap-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={l.a} alt="" className="h-6 w-6 rounded-full object-cover" />
                    <div className="min-w-0">
                      <p className="truncate text-[10px] font-medium leading-tight">{l.name}</p>
                      <p className="text-[8px] text-faint">{l.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-[10px] font-medium text-primary">View All Info</p>
            </Card>
          </div>

          {/* Project deliveries + stat column */}
          <div className="mt-3 grid grid-cols-[1.6fr_0.9fr] gap-3">
            <Card>
              <div className="flex items-center justify-between">
                <p className="text-[13px] font-semibold">Project Deliveries</p>
                <div className="flex items-center gap-3 text-[9px] text-faint">
                  <Legend color="#f17b2c" label="Achieved" />
                  <Legend color="#5a5a68" label="Target" />
                </div>
              </div>
              <div className="mt-2">
                <LineChart />
              </div>
            </Card>

            <div className="flex flex-col gap-3">
              <Card className="py-3">
                <p className="text-[15px] font-semibold">Top 10</p>
                <p className="text-[10px] text-faint">Position in Dribbble</p>
                <p className="mt-1 text-[9px] text-success">20% Increase from Last Week</p>
              </Card>
              <Card className="py-3">
                <p className="text-[15px] font-semibold">26</p>
                <p className="text-[10px] text-faint">New employees onboarded</p>
                <p className="mt-1 text-[9px] text-success">15% Increase from Last Month</p>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SideItem({
  label,
  icon: Icon,
  active,
}: {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  active?: boolean;
}) {
  return (
    <span
      className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[12px] ${
        active ? "bg-white/[0.06] text-ink" : "text-faint"
      }`}
    >
      <Icon className="h-3.5 w-3.5" />
      {label}
    </span>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-white/5 bg-white/[0.02] p-3.5 ${className}`}>
      {children}
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-1">
      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color }} />
      {label}
    </span>
  );
}

function Stat({ dot, label, value }: { dot: string; label: string; value: string }) {
  return (
    <div>
      <span className="flex items-center gap-1 text-faint">
        <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: dot }} />
        {label}
      </span>
      <span className="text-sm font-semibold text-ink">{value}</span>
    </div>
  );
}

function Orbit() {
  return (
    <div className="relative ml-auto h-[92px] w-[92px]">
      <svg viewBox="0 0 100 100" className="h-full w-full animate-spin-slow">
        <circle cx="50" cy="50" r="44" fill="none" stroke="#26262e" strokeWidth="1" />
        <circle cx="50" cy="50" r="30" fill="none" stroke="#26262e" strokeWidth="1" />
        <circle cx="50" cy="6" r="3.5" fill="#f17b2c" />
        <circle cx="94" cy="50" r="2.5" fill="#f4b183" />
        <circle cx="22" cy="78" r="2.5" fill="#9b7bff" />
      </svg>
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/avatar-anna.jpg"
          alt=""
          className="h-8 w-8 rounded-full border-2 border-[#0b0b0e] object-cover"
        />
      </span>
    </div>
  );
}
