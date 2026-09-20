import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0c0c0f",
        surface: "#101013",
        card: "#17171a",
        elevated: "#1c1c22",
        interactive: "#222228",
        interactive2: "#292932",
        line: "#26262e",
        "line-strong": "#393946",
        ink: "#eeeef2",
        muted: "#b2b2c9",
        faint: "#797993",
        primary: {
          DEFAULT: "#c3f8fd",
          soft: "#d4fbfe",
          strong: "#a5f0f7",
          ink: "#06222a",
        },
        success: { DEFAULT: "#47d687", bg: "#123c24" },
        brand: { DEFAULT: "#5024ff", light: "#a1adff", pale: "#d8dfff" },
        chart: {
          purple: "#6e3ff3",
          orange: "#f17b2c",
          blue: "#375dfb",
          pink: "#e255f2",
          indigo: "#95a4fc",
          cyan: "#a8c5da",
          green: "#a1e3cb",
        },
      },
      fontFamily: {
        serif: ["var(--font-stix)", "Georgia", "serif"],
        sans: ["var(--font-geist)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      maxWidth: {
        container: "1200px",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "draw-line": {
          from: { strokeDashoffset: "1000" },
          to: { strokeDashoffset: "0" },
        },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        "marquee-slow": "marquee 60s linear infinite",
        "fade-up": "fade-up 0.7s cubic-bezier(0.22,1,0.36,1) both",
        "spin-slow": "spin-slow 22s linear infinite",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
