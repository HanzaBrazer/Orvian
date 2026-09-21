import type { Metadata } from "next";
import { fetchPost } from "@/lib/cms";
import { ArticleView } from "@/components/blog/article-view";
import { CtaSection } from "@/components/sections/cta";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await fetchPost(params.slug);
  if (!post) return { title: "Article" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.image ? [post.image] : [],
    },
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = (await fetchPost(params.slug)) ?? null;
  return (
    <>
      <ArticleView slug={params.slug} initialPost={post} />
      <CtaSection />
    </>
  );
}
