"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, Plus, Sparkles } from "lucide-react";
import { BlogCard } from "@/components/blog/blog-card";
import { CmsEditor } from "@/components/blog/cms-editor";
import { categories, type BlogPost } from "@/lib/blog";
import {
  fetchPosts,
  seedDefaultPosts,
  CMS_EVENT,
  isSupabaseConfigured,
} from "@/lib/cms";
import { useAdmin } from "@/lib/auth";

export function BlogList() {
  const [active, setActive] = useState<(typeof categories)[number]>("All Articles");
  const [query, setQuery] = useState("");
  const [items, setItems] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [editorOpen, setEditorOpen] = useState(false);
  const [seeding, setSeeding] = useState(false);
  const admin = useAdmin();

  const refresh = useCallback(async () => {
    const data = await fetchPosts();
    setItems(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
    window.addEventListener(CMS_EVENT, refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener(CMS_EVENT, refresh);
      window.removeEventListener("storage", refresh);
    };
  }, [refresh]);

  const filtered = useMemo(() => {
    return items.filter((p) => {
      const byCat = active === "All Articles" || p.category === active;
      const byQuery =
        !query ||
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.excerpt.toLowerCase().includes(query.toLowerCase());
      return byCat && byQuery;
    });
  }, [items, active, query]);

  const seed = async () => {
    setSeeding(true);
    try {
      await seedDefaultPosts();
      await refresh();
    } catch (e) {
      console.error(e);
    } finally {
      setSeeding(false);
    }
  };

  return (
    <section className="container-x py-14 sm:py-16">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="no-scrollbar -mx-1 flex items-center gap-2 overflow-x-auto px-1">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm transition-colors ${
                active === c
                  ? "border-transparent bg-white/10 text-ink"
                  : "border-line text-muted hover:text-ink"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2.5">
          <div className="flex flex-1 items-center gap-2 rounded-full border border-line bg-card px-4 py-2.5 sm:w-64">
            <Search className="h-4 w-4 text-faint" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search"
              aria-label="Search articles"
              className="w-full bg-transparent text-sm text-ink placeholder:text-faint focus:outline-none"
            />
          </div>
          {admin && (
            <button
              onClick={() => setEditorOpen(true)}
              className="btn-primary shrink-0 whitespace-nowrap px-4 py-2.5"
            >
              <Plus className="h-4 w-4" />
              Add Article
            </button>
          )}
        </div>
      </div>

      {/* Admin seed helper (only when DB is configured but empty) */}
      {admin && isSupabaseConfigured && !loading && items.length === 0 && (
        <div className="mt-8 flex flex-col items-center justify-between gap-3 rounded-2xl border border-line bg-card p-5 text-center sm:flex-row sm:text-left">
          <div>
            <p className="text-sm font-semibold text-ink">Your blog is empty</p>
            <p className="text-sm text-muted">
              Seed the sample articles to get started, or add your own.
            </p>
          </div>
          <button
            onClick={seed}
            disabled={seeding}
            className="btn-secondary shrink-0 px-4 py-2.5 disabled:opacity-60"
          >
            <Sparkles className="h-4 w-4" />
            {seeding ? "Seeding…" : "Seed sample articles"}
          </button>
        </div>
      )}

      <motion.div
        layout
        className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((post) => (
            <motion.div
              key={post.slug}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <BlogCard post={post} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {!loading && filtered.length === 0 && items.length > 0 && (
        <p className="mt-16 text-center text-muted">
          No articles found. Try a different search.
        </p>
      )}

      <CmsEditor
        mode="add"
        open={editorOpen}
        onClose={() => setEditorOpen(false)}
        onSaved={() => {
          setEditorOpen(false);
          refresh();
        }}
      />
    </section>
  );
}
