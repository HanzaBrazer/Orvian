import Link from "next/link";
import type { BlogPost } from "@/lib/blog";

export function BlogCard({
  post,
  tagStyle = "dark",
}: {
  post: BlogPost;
  tagStyle?: "dark" | "light";
}) {
  return (
    <Link href={`/blog/${post.slug}`} className="group flex flex-col">
      <div className="relative aspect-[16/11] overflow-hidden rounded-2xl border border-line">
        {post.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.image}
            alt={post.title}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-interactive2 via-card to-surface" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <span
          className={`absolute left-3 top-3 rounded-lg px-2.5 py-1 text-xs font-medium backdrop-blur ${
            tagStyle === "light"
              ? "bg-white/90 text-black"
              : "bg-black/55 text-white"
          }`}
        >
          {post.category}
        </span>
      </div>
      <p className="mt-4 text-xs text-faint">{post.date}</p>
      <h3 className="mt-2 text-pretty text-[17px] font-semibold leading-snug text-ink transition-colors group-hover:text-primary">
        {post.title}
      </h3>
    </Link>
  );
}
