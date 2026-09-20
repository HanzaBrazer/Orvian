import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { StepsSection } from "@/components/sections/steps";
import { PlatformShowcase } from "@/components/sections/platform-showcase";
import { MonitorWorkflow } from "@/components/sections/monitor-workflow";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { CtaSection } from "@/components/sections/cta";
import { CTAButtons } from "@/components/ui";

export const metadata: Metadata = {
  title: "Features",
  description:
    "Packed features of the Orvian task management app — real-time updates, progress tracking, seamless integrations and more.",
};

export default function FeaturesPage() {
  return (
    <>
      <Hero
        image="/images/hero-features.jpg"
        tall
        badge={<span className="chip">Product</span>}
        title="Packed Features of The Orvian Task Management App"
        subtitle="Streamline your processes and empower your team with our products. Effortlessly manage tasks, data, and more in one centralized platform."
      >
        <CTAButtons className="justify-center" />
      </Hero>

      <StepsSection />
      <PlatformShowcase />
      <MonitorWorkflow />
      <TestimonialsSection />
      <CtaSection />
    </>
  );
}
