import type { Metadata } from "next";
import { posts, getPost } from "@/lib/blog";
import { ArticleView } from "@/components/blog/article-view";
import { CtaSection } from "@/components/sections/cta";

export const dynamicParams = true;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const post = getPost(params.slug);
  if (!post) return { title: "Article" };
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
  const post = getPost(params.slug) ?? null;
  return (
    <>
      <ArticleView slug={params.slug} initialPost={post} />
      <CtaSection />
    </>
  );
}
