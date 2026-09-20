import { Hero } from "@/components/sections/hero";
import { TrustBar } from "@/components/marquee";
import { StepsSection } from "@/components/sections/steps";
import { PlatformShowcase } from "@/components/sections/platform-showcase";
import { SimplifySection } from "@/components/sections/simplify";
import { PricingSection } from "@/components/sections/pricing";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { CtaSection } from "@/components/sections/cta";
import { CTAButtons, TaglineBadge } from "@/components/ui";

export default function HomePage() {
  return (
    <>
      <Hero
        image="/images/hero-home.jpg"
        withDashboard
        badge={<TaglineBadge label="New">#1 Task Management App</TaglineBadge>}
        title={
          <>
            Boost Your Productivity With Orvian Task Management
          </>
        }
        subtitle="Streamline your processes and empower your team with our products. Effortlessly manage tasks, data, and more in one centralized platform."
      >
        <CTAButtons className="justify-center" />
      </Hero>

      <section className="container-x pt-12 sm:pt-16">
        <TrustBar />
      </section>

      <StepsSection />
      <PlatformShowcase />
      <SimplifySection />
      <PricingSection />

      <section className="container-x pb-4">
        <TrustBar />
      </section>

      <TestimonialsSection />
      <CtaSection />
    </>
  );
}
