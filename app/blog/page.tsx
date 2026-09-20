import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { BlogList } from "@/components/blog/blog-list";
import { CtaSection } from "@/components/sections/cta";
import { SubscribeForm } from "@/components/subscribe-form";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights, guides and stories on task management, productivity and building better teams with Orvian.",
};

export default function BlogPage() {
  return (
    <>
      <Hero
        image="/images/hero-blog.jpg"
        badge={<span className="chip">Blog</span>}
        title="Packed Features of The Orvian Task Management App"
        subtitle="Streamline your processes and empower your team with our products. Effortlessly manage tasks, data, and more in one centralized platform."
      >
        <div className="mx-auto w-full max-w-md">
          <SubscribeForm variant="hero" />
        </div>
      </Hero>

      <BlogList />
      <CtaSection />
    </>
  );
}
