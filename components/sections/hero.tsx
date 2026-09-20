"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { HeroDashboard } from "@/components/dashboard/hero-dashboard";

export function Hero({
  image,
  badge,
  title,
  subtitle,
  children,
  withDashboard = false,
  tall = false,
}: {
  image: string;
  badge: React.ReactNode;
  title: React.ReactNode;
  subtitle: string;
  children?: React.ReactNode;
  withDashboard?: boolean;
  tall?: boolean;
}) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/20 to-bg" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/60 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-bg via-bg/70 to-transparent" />
      </div>

      <div
        className={`container-x relative flex flex-col items-center text-center ${
          tall ? "pt-36 sm:pt-44" : "pt-32 sm:pt-40"
        } pb-10`}
      >
        <HeroReveal>
          <div className="flex flex-col items-center">
            {badge}
            <h1 className="display mt-6 max-w-4xl text-balance text-[42px] leading-[1.02] text-white [text-shadow:0_2px_30px_rgba(0,0,0,0.55)] sm:text-6xl lg:text-[76px]">
              {title}
            </h1>
            <p className="mt-5 max-w-xl text-pretty text-[15px] leading-relaxed text-white/85 sm:text-base">
              {subtitle}
            </p>
            <div className="mt-8">{children}</div>
          </div>
        </HeroReveal>

        {withDashboard && (
          <HeroDashboardReveal>
            <div className="relative mt-14 hidden w-full max-w-4xl md:block">
              <div className="pointer-events-none absolute -inset-6 rounded-[40px] bg-primary/10 blur-3xl" />
              <div className="relative">
                <HeroDashboard />
              </div>
            </div>
          </HeroDashboardReveal>
        )}
      </div>
    </section>
  );
}

/* client reveal wrappers */
export function HeroReveal({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function HeroDashboardReveal({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}
