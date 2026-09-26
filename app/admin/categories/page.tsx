"use client";

import { useEffect, useState } from "react";
import { Tags } from "lucide-react";
import { fetchAllPosts, slugify, CMS_EVENT } from "@/lib/cms";

const known = ["Business", "Analytics", "Management"] as const;

export default function CategoriesPage() {
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const refresh = async () => {
      const posts = await fetchAllPosts();
      const c: Record<string, number> = {};
      for (const k of known) c[k] = 0;
      for (const p of posts) c[p.category] = (c[p.category] ?? 0) + 1;
      setCounts(c);
      setLoading(false);
    };
    refresh();
    window.addEventListener(CMS_EVENT, refresh);
    return () => window.removeEventListener(CMS_EVENT, refresh);
  }, []);

  return (
    <div className="mx-auto max-w-4xl">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-interactive text-primary">
          <Tags className="h-5 w-5" />
        </span>
        <div>
          <h1 className="font-serif text-3xl text-ink sm:text-4xl">Categories</h1>
          <p className="mt-1 text-sm text-muted">
            Organize your blog content into categories.
          </p>
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-line bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line text-left text-xs text-faint">
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Slug</th>
              <th className="px-4 py-3 text-right font-medium">Posts</th>
            </tr>
          </thead>
          <tbody>
            {known.map((c) => (
              <tr key={c} className="border-b border-line last:border-0">
                <td className="px-4 py-3 font-medium text-ink">{c}</td>
                <td className="px-4 py-3 text-muted">{slugify(c)}</td>
                <td className="px-4 py-3 text-right text-muted">
                  {loading ? "—" : counts[c] ?? 0}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-xs text-faint">
        Categories are fixed to match the public blog filters (Business, Analytics,
        Management). Post counts update automatically.
      </p>
    </div>
  );
}
