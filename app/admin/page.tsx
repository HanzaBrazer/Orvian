"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FileText,
  CheckCircle2,
  PencilLine,
  Tags,
  Plus,
  ArrowRight,
} from "lucide-react";
import {
  fetchAllPosts,
  fetchStats,
  CMS_EVENT,
  type CmsStats,
} from "@/lib/cms";
import type { BlogPost } from "@/lib/blog";
import { StatusBadge, EmptyState } from "@/components/admin/ui";

const kpis = [
  { key: "total", label: "Total Posts", icon: FileText, tint: "text-chart-indigo" },
  { key: "published", label: "Published", icon: CheckCircle2, tint: "text-success" },
  { key: "drafts", label: "Drafts", icon: PencilLine, tint: "text-chart-orange" },
  { key: "categories", label: "Categories", icon: Tags, tint: "text-chart-cyan" },
] as const;

export default function DashboardPage() {
  const [stats, setStats] = useState<CmsStats | null>(null);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const refresh = async () => {
      const [s, p] = await Promise.all([fetchStats(), fetchAllPosts()]);
      setStats(s);
      setPosts(p);
      setLoading(false);
    };
    refresh();
    window.addEventListener(CMS_EVENT, refresh);
    return () => window.removeEventListener(CMS_EVENT, refresh);
  }, []);

  return (
    <div className="mx-auto max-w-5xl">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-serif text-3xl text-ink sm:text-4xl">Dashboard</h1>
          <p className="mt-1.5 text-sm text-muted">Overview of your blog content.</p>
        </div>
        <Link href="/admin/blog/new" className="btn-primary shrink-0 px-4 py-2.5 text-sm">
          <Plus className="h-4 w-4" /> New Post
        </Link>
      </div>

      {/* KPI cards */}
      <div className="mt-7 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {kpis.map((k) => (
          <div key={k.key} className="rounded-2xl border border-line bg-card p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted">{k.label}</span>
              <k.icon className={`h-4 w-4 ${k.tint}`} />
            </div>
            <p className="mt-3 text-3xl font-semibold text-ink">
              {loading || !stats ? "—" : stats[k.key]}
            </p>
          </div>
        ))}
      </div>

      {/* Recent posts */}
      <div className="mt-8 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-ink">Recent Posts</h2>
        <Link
          href="/admin/blog"
          className="inline-flex items-center gap-1.5 text-sm text-primary hover:gap-2.5"
        >
          View All <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="mt-4 overflow-hidden rounded-2xl border border-line bg-card">
        {loading ? (
          <TableSkeleton />
        ) : posts.length === 0 ? (
          <div className="p-4">
            <EmptyState
              icon={<FileText className="h-6 w-6" />}
              title="No blog posts yet"
              message="Create your first article to get started."
              action={
                <Link href="/admin/blog/new" className="btn-primary px-4 py-2.5 text-sm">
                  <Plus className="h-4 w-4" /> Create New Post
                </Link>
              }
            />
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-line text-left text-xs text-faint">
                <th className="px-4 py-3 font-medium">Article</th>
                <th className="hidden px-4 py-3 font-medium sm:table-cell">Category</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="hidden px-4 py-3 font-medium md:table-cell">Updated</th>
                <th className="px-4 py-3 text-right font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {posts.slice(0, 5).map((p) => (
                <tr key={p.slug} className="border-b border-line last:border-0">
                  <td className="max-w-[260px] px-4 py-3">
                    <p className="truncate font-medium text-ink">{p.title}</p>
                  </td>
                  <td className="hidden px-4 py-3 text-muted sm:table-cell">{p.category}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={p.status} />
                  </td>
                  <td className="hidden px-4 py-3 text-faint md:table-cell">{p.date}</td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/admin/blog/${p.slug}/edit`}
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

function TableSkeleton() {
  return (
    <div className="divide-y divide-line">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 px-4 py-4">
          <div className="h-4 flex-1 animate-pulse rounded bg-white/[0.05]" />
          <div className="h-4 w-20 animate-pulse rounded bg-white/[0.05]" />
          <div className="h-6 w-16 animate-pulse rounded-full bg-white/[0.05]" />
        </div>
      ))}
    </div>
  );
}
