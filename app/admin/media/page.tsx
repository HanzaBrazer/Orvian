"use client";

import { useEffect, useState } from "react";
import { ImageIcon, Copy, Check } from "lucide-react";
import { fetchAllPosts, CMS_EVENT } from "@/lib/cms";
import { EmptyState } from "@/components/admin/ui";
import { useToast } from "@/components/admin/toast";

export default function MediaPage() {
  const { toast } = useToast();
  const [images, setImages] = useState<{ url: string; title: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState<string>("");

  useEffect(() => {
    const refresh = async () => {
      const posts = await fetchAllPosts();
      const seen = new Set<string>();
      const list: { url: string; title: string }[] = [];
      for (const p of posts) {
        if (p.image && !seen.has(p.image)) {
          seen.add(p.image);
          list.push({ url: p.image, title: p.title });
        }
      }
      setImages(list);
      setLoading(false);
    };
    refresh();
    window.addEventListener(CMS_EVENT, refresh);
    return () => window.removeEventListener(CMS_EVENT, refresh);
  }, []);

  const copy = (url: string) => {
    navigator.clipboard?.writeText(url).then(() => {
      setCopied(url);
      toast("URL copied.");
      setTimeout(() => setCopied(""), 1500);
    });
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-interactive text-primary">
          <ImageIcon className="h-5 w-5" />
        </span>
        <div>
          <h1 className="font-serif text-3xl text-ink sm:text-4xl">Media Library</h1>
          <p className="mt-1 text-sm text-muted">Images used across your blog.</p>
        </div>
      </div>

      {loading ? (
        <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="aspect-[4/3] animate-pulse rounded-xl bg-white/[0.05]" />
          ))}
        </div>
      ) : images.length === 0 ? (
        <div className="mt-7">
          <EmptyState
            icon={<ImageIcon className="h-6 w-6" />}
            title="No media yet"
            message="Cover images you upload to articles will appear here."
          />
        </div>
      ) : (
        <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {images.map((img) => (
            <div key={img.url} className="overflow-hidden rounded-xl border border-line bg-card">
              <span className="relative block aspect-[4/3]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.url} alt={img.title} className="h-full w-full object-cover" />
              </span>
              <div className="flex items-center justify-between gap-2 px-3 py-2">
                <p className="truncate text-xs text-muted">{img.title}</p>
                <button
                  onClick={() => copy(img.url)}
                  className="shrink-0 text-faint hover:text-ink"
                  aria-label="Copy URL"
                >
                  {copied === img.url ? (
                    <Check className="h-3.5 w-3.5 text-success" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
