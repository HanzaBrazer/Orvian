import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, CalendarDays, ArrowRight } from "lucide-react";
import { posts, getPost, type Block } from "@/lib/blog";
import { BlogCard } from "@/components/blog/blog-card";
import { CtaSection } from "@/components/sections/cta";
import { Reveal } from "@/components/reveal";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const post = getPost(params.slug);
  if (!post) return { title: "Article not found" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, images: [post.image] },
  };
}

export default function BlogDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = getPost(params.slug);
  if (!post) notFound();

  const recent = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <article className="container-x pt-32 sm:pt-40">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <nav className="flex items-center gap-2 text-sm text-faint">
              <Link href="/" className="link-muted">
                Home
              </Link>
              <ChevronLeft className="h-3.5 w-3.5" />
              <Link href="/blog" className="link-muted">
                Blog
              </Link>
            </nav>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="display mt-6 text-balance text-4xl text-ink sm:text-5xl lg:text-[52px]">
              {post.title}
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-muted">
              {post.excerpt}
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-5 flex items-center gap-4 text-sm text-faint">
              <span className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4" />
                {post.date}
              </span>
              <span>·</span>
              <span>{post.readTime}</span>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="relative mx-auto mt-10 aspect-[16/9] max-w-4xl overflow-hidden rounded-3xl border border-line">
            <Image
              src={post.image}
              alt={post.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 900px"
              className="object-cover"
            />
            <span className="absolute left-4 top-4 rounded-lg bg-black/55 px-3 py-1.5 text-xs font-medium text-white backdrop-blur">
              {post.category}
            </span>
          </div>
        </Reveal>

        <div className="mx-auto mt-12 max-w-3xl">
          <BlogBody blocks={post.body} />
        </div>
      </article>

      {/* Recent articles */}
      <section className="container-x py-16 sm:py-24">
        <Reveal>
          <h2 className="display text-3xl text-ink sm:text-4xl">Recent Articles</h2>
        </Reveal>
        <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {recent.map((p) => (
            <Reveal key={p.slug}>
              <BlogCard post={p} tagStyle="light" />
            </Reveal>
          ))}
        </div>
        <div className="mt-12 flex justify-center">
          <Link href="/blog" className="btn-secondary px-6 py-3">
            More articles
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <CtaSection />
    </>
  );
}

function BlogBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="flex flex-col gap-6">
      {blocks.map((b, i) => {
        if (b.type === "h2")
          return (
            <h2 key={i} className="mt-4 text-xl font-semibold text-ink sm:text-2xl">
              {b.text}
            </h2>
          );
        if (b.type === "p")
          return (
            <p key={i} className="text-[15px] leading-[1.8] text-muted">
              {b.text}
            </p>
          );
        if (b.type === "ul")
          return (
            <ul key={i} className="flex flex-col gap-2 pl-1">
              {b.items.map((it, j) => (
                <li key={j} className="flex gap-3 text-[15px] leading-relaxed text-muted">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {it}
                </li>
              ))}
            </ul>
          );
        if (b.type === "ol")
          return (
            <ol key={i} className="flex flex-col gap-5">
              {b.items.map((it, j) => (
                <li key={j} className="flex gap-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line-strong bg-interactive text-sm font-medium text-primary">
                    {j + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-ink">{it.title}</p>
                    <p className="mt-1 text-[15px] leading-[1.8] text-muted">
                      {it.text}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          );
        return null;
      })}
    </div>
  );
}
