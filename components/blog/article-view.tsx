"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, CalendarDays, ArrowRight, Pencil } from "lucide-react";
import type { BlogPost, Block } from "@/lib/blog";
import { getMergedPost, getMergedPosts, CMS_EVENT } from "@/lib/cms";
import { CmsEditor } from "@/components/blog/cms-editor";
import { BlogCard } from "@/components/blog/blog-card";
import { Reveal } from "@/components/reveal";

export function ArticleView({
  slug,
  initialPost,
}: {
  slug: string;
  initialPost: BlogPost | null;
}) {
  const router = useRouter();
  const [post, setPost] = useState<BlogPost | null>(initialPost);
  const [recent, setRecent] = useState<BlogPost[]>([]);
  const [ready, setReady] = useState(false);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const refresh = () => {
      setPost(getMergedPost(slug) ?? null);
      setRecent(getMergedPosts().filter((p) => p.slug !== slug).slice(0, 3));
      setReady(true);
    };
    refresh();
    window.addEventListener(CMS_EVENT, refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener(CMS_EVENT, refresh);
      window.removeEventListener("storage", refresh);
    };
  }, [slug]);

  if (!post) {
    return (
      <div className="container-x flex min-h-[60vh] flex-col items-center justify-center pt-32 text-center">
        {ready ? (
          <>
            <h1 className="display text-3xl text-ink sm:text-4xl">
              Article not found
            </h1>
            <p className="mt-3 text-muted">
              This article may have been removed.
            </p>
            <Link href="/blog" className="btn-secondary mt-6 px-5 py-3">
              Back to Blog
            </Link>
          </>
        ) : (
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-line border-t-primary" />
        )}
      </div>
    );
  }

  return (
    <>
      <article className="container-x pt-32 sm:pt-40">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center justify-between gap-4">
            <nav className="flex items-center gap-2 text-sm text-faint">
              <Link href="/" className="link-muted">
                Home
              </Link>
              <ChevronLeft className="h-3.5 w-3.5" />
              <Link href="/blog" className="link-muted">
                Blog
              </Link>
            </nav>
            <button
              onClick={() => setEditing(true)}
              className="btn-secondary shrink-0 px-4 py-2 text-sm"
            >
              <Pencil className="h-3.5 w-3.5" />
              Edit
            </button>
          </div>

          <h1 className="display mt-6 text-balance text-4xl text-ink sm:text-5xl lg:text-[52px]">
            {post.title}
          </h1>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-muted">
            {post.excerpt}
          </p>
          <div className="mt-5 flex items-center gap-4 text-sm text-faint">
            <span className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              {post.date}
            </span>
            <span>·</span>
            <span>{post.readTime}</span>
          </div>
        </div>

        <div className="relative mx-auto mt-10 aspect-[16/9] max-w-4xl overflow-hidden rounded-3xl border border-line">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.image}
            alt={post.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <span className="absolute left-4 top-4 rounded-lg bg-black/55 px-3 py-1.5 text-xs font-medium text-white backdrop-blur">
            {post.category}
          </span>
        </div>

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

      <CmsEditor
        mode="edit"
        post={post}
        open={editing}
        onClose={() => setEditing(false)}
        onSaved={(_, deleted) => {
          setEditing(false);
          if (deleted) router.push("/blog");
        }}
      />
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
                <li
                  key={j}
                  className="flex gap-3 text-[15px] leading-relaxed text-muted"
                >
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
