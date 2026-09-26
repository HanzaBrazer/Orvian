"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchPost } from "@/lib/cms";
import type { BlogPost } from "@/lib/blog";
import { PostEditor } from "@/components/admin/post-editor";

export default function EditPostPage({ params }: { params: { slug: string } }) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let mounted = true;
    fetchPost(params.slug).then((p) => {
      if (!mounted) return;
      setPost(p ?? null);
      setReady(true);
    });
    return () => {
      mounted = false;
    };
  }, [params.slug]);

  if (!ready) {
    return (
      <div className="mx-auto max-w-6xl">
        <div className="h-8 w-40 animate-pulse rounded bg-white/[0.05]" />
        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="h-[520px] animate-pulse rounded-2xl bg-white/[0.04]" />
          <div className="h-[420px] animate-pulse rounded-2xl bg-white/[0.04]" />
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center py-24 text-center">
        <h1 className="font-serif text-3xl text-ink">Post not found</h1>
        <p className="mt-2 text-sm text-muted">This article may have been removed.</p>
        <Link href="/admin/blog" className="btn-secondary mt-6 px-5 py-2.5 text-sm">
          Back to Posts
        </Link>
      </div>
    );
  }

  return <PostEditor mode="edit" initial={post} />;
}
