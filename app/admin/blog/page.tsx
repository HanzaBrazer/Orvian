"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  Newspaper,
  Pencil,
  Trash2,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import {
  fetchAllPosts,
  deletePost,
  seedDefaultPosts,
  CMS_EVENT,
  isSupabaseConfigured,
} from "@/lib/cms";
import type { BlogPost, PostStatus } from "@/lib/blog";
import { StatusBadge, EmptyState, ConfirmDialog } from "@/components/admin/ui";
import { useToast } from "@/components/admin/toast";

const filters: (PostStatus | "all")[] = ["all", "published", "draft"];

export default function AdminBlogPage() {
  const { toast } = useToast();
  const [items, setItems] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<PostStatus | "all">("all");
  const [seeding, setSeeding] = useState(false);
  const [toDelete, setToDelete] = useState<BlogPost | null>(null);
  const [deleting, setDeleting] = useState(false);

  const refresh = async () => {
    const data = await fetchAllPosts();
    setItems(data);
    setLoading(false);
  };

  useEffect(() => {
    refresh();
    window.addEventListener(CMS_EVENT, refresh);
    return () => window.removeEventListener(CMS_EVENT, refresh);
  }, []);

  const filtered = useMemo(() => {
    return items.filter((p) => {
      const byStatus = status === "all" || (p.status ?? "published") === status;
      const byQuery =
        !query ||
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase());
      return byStatus && byQuery;
    });
  }, [items, query, status]);

  const seed = async () => {
    setSeeding(true);
    try {
      await seedDefaultPosts();
      await refresh();
      toast("Sample articles added.");
    } catch (e) {
      toast((e as Error).message, "error");
    } finally {
      setSeeding(false);
    }
  };

  const confirmDelete = async () => {
    if (!toDelete) return;
    setDeleting(true);
    try {
      await deletePost(toDelete.slug);
      await refresh();
      toast("Post deleted.");
      setToDelete(null);
    } catch (e) {
      toast((e as Error).message, "error");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-serif text-3xl text-ink sm:text-4xl">Blog Posts</h1>
          <p className="mt-1.5 text-sm text-muted">
            Create, manage, and publish your blog content.
          </p>
        </div>
        <Link href="/admin/blog/new" className="btn-primary shrink-0 px-4 py-2.5 text-sm">
          <Plus className="h-4 w-4" /> New Post
        </Link>
      </div>

      {/* toolbar */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 rounded-full border border-line bg-card px-4 py-2.5 sm:w-72">
          <Search className="h-4 w-4 text-faint" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search posts..."
            className="w-full bg-transparent text-sm text-ink placeholder:text-faint focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-1 rounded-full border border-line bg-card p-1">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setStatus(f)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-medium capitalize transition-colors ${
                status === f ? "bg-white/10 text-ink" : "text-muted hover:text-ink"
              }`}
            >
              {f === "all" ? "All" : f}
            </button>
          ))}
        </div>
      </div>

      {/* table / states */}
      <div className="mt-5 overflow-hidden rounded-2xl border border-line bg-card">
        {loading ? (
          <div className="divide-y divide-line">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4 px-4 py-4">
                <div className="h-10 w-16 animate-pulse rounded-lg bg-white/[0.05]" />
                <div className="h-4 flex-1 animate-pulse rounded bg-white/[0.05]" />
                <div className="h-6 w-16 animate-pulse rounded-full bg-white/[0.05]" />
              </div>
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="p-4">
            <EmptyState
              icon={<Newspaper className="h-6 w-6" />}
              title="No posts yet"
              message="Start creating content for your Orvian blog."
              action={
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <Link href="/admin/blog/new" className="btn-primary px-4 py-2.5 text-sm">
                    <Plus className="h-4 w-4" /> Create Post
                  </Link>
                  {isSupabaseConfigured && (
                    <button
                      onClick={seed}
                      disabled={seeding}
                      className="btn-secondary px-4 py-2.5 text-sm disabled:opacity-60"
                    >
                      <Sparkles className="h-4 w-4" />
                      {seeding ? "Seeding…" : "Seed sample articles"}
                    </button>
                  )}
                </div>
              }
            />
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-4">
            <EmptyState
              icon={<Search className="h-6 w-6" />}
              title="No posts found"
              message="Try a different keyword or filter."
              action={
                <button
                  onClick={() => {
                    setQuery("");
                    setStatus("all");
                  }}
                  className="btn-secondary px-4 py-2.5 text-sm"
                >
                  Clear Filters
                </button>
              }
            />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="border-b border-line text-left text-xs text-faint">
                  <th className="px-4 py-3 font-medium">Article</th>
                  <th className="px-4 py-3 font-medium">Category</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Updated</th>
                  <th className="px-4 py-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p.slug} className="border-b border-line last:border-0 hover:bg-white/[0.015]">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <span className="h-10 w-16 shrink-0 overflow-hidden rounded-lg border border-line bg-interactive">
                          {p.image ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={p.image} alt="" className="h-full w-full object-cover" />
                          ) : null}
                        </span>
                        <span className="min-w-0">
                          <p className="max-w-[240px] truncate font-medium text-ink">{p.title}</p>
                          <p className="max-w-[240px] truncate text-xs text-faint">/{p.slug}</p>
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted">{p.category}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={p.status} />
                    </td>
                    <td className="px-4 py-3 text-faint">{p.date}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={`/blog/${p.slug}`}
                          target="_blank"
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-line text-faint hover:text-ink"
                          aria-label="Preview"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Link>
                        <Link
                          href={`/admin/blog/${p.slug}/edit`}
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-line text-muted hover:text-ink"
                          aria-label="Edit"
                        >
                          <Pencil className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => setToDelete(p)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#ff8a6b]/30 text-[#ff8a6b] hover:bg-[#ff8a6b]/10"
                          aria-label="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {!loading && filtered.length > 0 && (
        <p className="mt-4 text-xs text-faint">
          Showing {filtered.length} of {items.length} posts
        </p>
      )}

      <ConfirmDialog
        open={!!toDelete}
        title="Delete this article?"
        message="This action cannot be undone."
        confirmLabel="Delete Article"
        destructive
        loading={deleting}
        onCancel={() => setToDelete(null)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
