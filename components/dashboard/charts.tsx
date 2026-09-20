"use client";

import { motion } from "framer-motion";

/* Smooth cardinal spline path from points */
function smoothPath(pts: [number, number][], tension = 0.5) {
  if (pts.length < 2) return "";
  let d = `M ${pts[0][0]} ${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] || p2;
    const cp1x = p1[0] + ((p2[0] - p0[0]) / 6) * tension * 2;
    const cp1y = p1[1] + ((p2[1] - p0[1]) / 6) * tension * 2;
    const cp2x = p2[0] - ((p3[0] - p1[0]) / 6) * tension * 2;
    const cp2y = p2[1] - ((p3[1] - p1[1]) / 6) * tension * 2;
    d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2[0]} ${p2[1]}`;
  }
  return d;
}

function scale(
  values: number[],
  w: number,
  h: number,
  pad: number,
  max: number
): [number, number][] {
  const step = (w - pad * 2) / (values.length - 1);
  return values.map((v, i) => [
    pad + i * step,
    h - pad - (v / max) * (h - pad * 2),
  ]);
}

export function LineChart() {
  const W = 460;
  const H = 190;
  const pad = 26;
  const achieved = [6, 6.5, 6, 8, 6.5, 7, 7.2];
  const target = [5.5, 6, 6.6, 6.2, 6.8, 6.4, 6.6];
  const max = 12;
  const aPts = scale(achieved, W, H, pad, max);
  const tPts = scale(target, W, H, pad, max);
  const aPath = smoothPath(aPts);
  const tPath = smoothPath(tPts);
  const marker = aPts[3];
  const months = ["Oct 2021", "Nov 2021", "Dec 2021", "Jan 2022", "Feb 2022", "Mar 2022"];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      {[0, 2, 4, 6, 8, 10, 12].map((g) => {
        const y = H - pad - (g / max) * (H - pad * 2);
        return (
          <g key={g}>
            <line x1={pad} y1={y} x2={W - pad} y2={y} stroke="#1e1e26" strokeWidth="1" />
            <text x={4} y={y + 3} fontSize="8" fill="#5a5a68">
              {g}
            </text>
          </g>
        );
      })}
      <motion.path
        d={tPath}
        fill="none"
        stroke="#4b4b57"
        strokeWidth="2"
        strokeDasharray="4 4"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.3, ease: "easeInOut" }}
      />
      <motion.path
        d={aPath}
        fill="none"
        stroke="#f17b2c"
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: "easeInOut" }}
      />
      <motion.line
        x1={marker[0]}
        y1={pad}
        x2={marker[0]}
        y2={H - pad}
        stroke="#3a3a45"
        strokeDasharray="3 3"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1 }}
      />
      <motion.circle
        cx={marker[0]}
        cy={marker[1]}
        r="4.5"
        fill="#f17b2c"
        stroke="#0b0b0e"
        strokeWidth="2"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.1, type: "spring", stiffness: 300 }}
      />
      <motion.g
        initial={{ opacity: 0, y: 6 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 1.2 }}
      >
        <rect x={marker[0] - 34} y={marker[1] - 44} width="68" height="34" rx="7" fill="#17171c" stroke="#2a2a33" />
        <circle cx={marker[0] - 24} cy={marker[1] - 32} r="2.5" fill="#f17b2c" />
        <text x={marker[0] - 18} y={marker[1] - 29} fontSize="8" fill="#cfcfda">7 Projects</text>
        <circle cx={marker[0] - 24} cy={marker[1] - 20} r="2.5" fill="#5a5a68" />
        <text x={marker[0] - 18} y={marker[1] - 17} fontSize="8" fill="#cfcfda">5 Projects</text>
      </motion.g>
      {months.map((m, i) => (
        <text
          key={m}
          x={pad + (i * (W - pad * 2)) / (months.length - 1)}
          y={H - 6}
          fontSize="8"
          fill="#5a5a68"
          textAnchor="middle"
        >
          {m}
        </text>
      ))}
    </svg>
  );
}

export function ActivityChart() {
  const W = 300;
  const H = 150;
  const pad = 22;
  const values = [1.2, 2, 1.4, 2.6, 2.1, 2.4, 2.2];
  const max = 3;
  const pts = scale(values, W, H, pad, max);
  const path = smoothPath(pts);
  const area = `${path} L ${pts[pts.length - 1][0]} ${H - pad} L ${pts[0][0]} ${H - pad} Z`;
  const marker = pts[1];
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      <defs>
        <linearGradient id="act" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7fe7d6" stopOpacity="0.28" />
          <stop offset="1" stopColor="#7fe7d6" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[1, 2, 3].map((g) => {
        const y = H - pad - (g / max) * (H - pad * 2);
        return <text key={g} x={4} y={y + 3} fontSize="9" fill="#5a5a68">{g}</text>;
      })}
      <motion.path
        d={area}
        fill="url(#act)"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5 }}
      />
      <motion.path
        d={path}
        fill="none"
        stroke="#57d3bf"
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.3, ease: "easeInOut" }}
      />
      <motion.circle
        cx={marker[0]}
        cy={marker[1]}
        r="4"
        fill="#57d3bf"
        stroke="#0b0b0e"
        strokeWidth="2"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1, type: "spring", stiffness: 300 }}
      />
      <motion.g
        initial={{ opacity: 0, y: 5 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 1.15 }}
      >
        <rect x={marker[0] - 22} y={marker[1] - 26} width="44" height="18" rx="6" fill="#1b1b20" stroke="#2a2a33" />
        <text x={marker[0]} y={marker[1] - 14} fontSize="9" fill="#e6e6ee" textAnchor="middle">2 Tasks</text>
      </motion.g>
      {days.map((d, i) => (
        <text
          key={i}
          x={pad + (i * (W - pad * 2)) / (days.length - 1)}
          y={H - 4}
          fontSize="9"
          fill="#5a5a68"
          textAnchor="middle"
        >
          {d}
        </text>
      ))}
    </svg>
  );
}

export function Donut({ percent = 45 }: { percent?: number }) {
  const r = 34;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative h-[92px] w-[92px]">
      <svg viewBox="0 0 90 90" className="h-full w-full -rotate-90">
        <circle cx="45" cy="45" r={r} fill="none" stroke="#26262e" strokeWidth="9" />
        <motion.circle
          cx="45"
          cy="45"
          r={r}
          fill="none"
          stroke="#57d3bf"
          strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          whileInView={{ strokeDashoffset: c - (c * percent) / 100 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-sm font-semibold">
        {percent}%
      </span>
    </div>
  );
}

export function BarChart() {
  const bars = [
    { m: "May", v: 42, c: "#9b7bff" },
    { m: "Jun", v: 78, c: "#f17b2c" },
    { m: "July", v: 60, c: "#8fb8ff" },
    { m: "August", v: 96, c: "#9b7bff" },
    { m: "Sep", v: 30, c: "#a8c5da" },
    { m: "Oct", v: 55, c: "#a1e3cb" },
  ];
  return (
    <div className="flex h-[150px] items-end gap-3">
      {bars.map((b, i) => (
        <div key={b.m} className="flex flex-1 flex-col items-center gap-2">
          <div className="flex h-[120px] w-full items-end">
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: `${b.v}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="w-full rounded-md"
              style={{ backgroundColor: b.c }}
            />
          </div>
          <span className="text-[10px] text-faint">{b.m}</span>
        </div>
      ))}
    </div>
  );
}
