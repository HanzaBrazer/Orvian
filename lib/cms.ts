import { posts as defaultPosts, type BlogPost, type Block } from "@/lib/blog";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";

export { isSupabaseConfigured };
export const CMS_EVENT = "orvian-cms-change";

function emitChange() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(CMS_EVENT));
  }
}

/* ---------- row <-> BlogPost mapping ---------- */

type Row = {
  slug: string;
  title: string;
  excerpt: string | null;
  category: string | null;
  read_time: string | null;
  image: string | null;
  body: Block[] | null;
  date: string | null;
  created_at: string | null;
};

function rowToPost(row: Row): BlogPost {
  return {
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt ?? "",
    category: (row.category as BlogPost["category"]) ?? "Business",
    date: row.date || todayDisplay(),
    iso: (row.created_at ?? "").slice(0, 10),
    readTime: row.read_time ?? "5 min read",
    image: row.image ?? "",
    body: Array.isArray(row.body) ? row.body : [],
    createdAt: row.created_at ? new Date(row.created_at).getTime() : Date.now(),
    custom: true,
  };
}

function postToRow(post: BlogPost) {
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    read_time: post.readTime,
    image: post.image,
    body: post.body,
    date: post.date,
  };
}

/* ---------- reads (fallback to defaults when Supabase not configured) ---------- */

export async function fetchPosts(): Promise<BlogPost[]> {
  const sb = getSupabase();
  if (!sb) return [...defaultPosts];
  const { data, error } = await sb
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    console.error("[cms] fetchPosts", error.message);
    return [];
  }
  return (data as Row[]).map(rowToPost);
}

export async function fetchPost(slug: string): Promise<BlogPost | undefined> {
  const sb = getSupabase();
  if (!sb) return defaultPosts.find((p) => p.slug === slug);
  const { data, error } = await sb
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (error) {
    console.error("[cms] fetchPost", error.message);
    return undefined;
  }
  return data ? rowToPost(data as Row) : undefined;
}

/* ---------- writes (require Supabase + admin session) ---------- */

export async function upsertPost(post: BlogPost): Promise<void> {
  const sb = getSupabase();
  if (!sb) throw new Error("Supabase is not configured.");
  const { error } = await sb
    .from("posts")
    .upsert(postToRow(post), { onConflict: "slug" });
  if (error) throw new Error(error.message);
  emitChange();
}

export async function deletePost(slug: string): Promise<void> {
  const sb = getSupabase();
  if (!sb) throw new Error("Supabase is not configured.");
  const { error } = await sb.from("posts").delete().eq("slug", slug);
  if (error) throw new Error(error.message);
  emitChange();
}

/* ---------- image storage ---------- */

export async function uploadImage(blob: Blob): Promise<string> {
  const sb = getSupabase();
  if (!sb) throw new Error("Supabase is not configured.");
  const name = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.jpg`;
  const { error } = await sb.storage
    .from("blog-images")
    .upload(name, blob, { contentType: "image/jpeg", upsert: false });
  if (error) throw new Error(error.message);
  const { data } = sb.storage.from("blog-images").getPublicUrl(name);
  return data.publicUrl;
}

export async function dataUrlToBlob(dataUrl: string): Promise<Blob> {
  const res = await fetch(dataUrl);
  return res.blob();
}

/** Seed the default sample articles (admin only). */
export async function seedDefaultPosts(): Promise<void> {
  const sb = getSupabase();
  if (!sb) throw new Error("Supabase is not configured.");
  const rows = defaultPosts.map((p, i) => ({
    ...postToRow(p),
    // stagger created_at so ordering is stable
    created_at: new Date(Date.now() - i * 60000).toISOString(),
  }));
  const { error } = await sb.from("posts").upsert(rows, { onConflict: "slug" });
  if (error) throw new Error(error.message);
  emitChange();
}

/* ---------- content <-> text helpers ---------- */

export function slugify(s: string): string {
  const base = s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
  return base || `post-${Date.now()}`;
}

export function uniqueSlug(title: string, existingSlug?: string): string {
  return existingSlug || slugify(title);
}

export function parseBody(text: string): Block[] {
  const blocks: Block[] = [];
  const chunks = text.replace(/\r\n/g, "\n").split(/\n\s*\n/);
  for (const raw of chunks) {
    const lines = raw
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);
    if (lines.length === 0) continue;
    if (lines.every((l) => l.startsWith("- "))) {
      blocks.push({ type: "ul", items: lines.map((l) => l.slice(2).trim()) });
    } else if (lines.length === 1 && lines[0].startsWith("## ")) {
      blocks.push({ type: "h2", text: lines[0].slice(3).trim() });
    } else if (lines[0].startsWith("## ")) {
      blocks.push({ type: "h2", text: lines[0].slice(3).trim() });
      const rest = lines.slice(1).join(" ").trim();
      if (rest) blocks.push({ type: "p", text: rest });
    } else {
      blocks.push({ type: "p", text: lines.join(" ") });
    }
  }
  return blocks;
}

export function serializeBody(blocks: Block[]): string {
  return blocks
    .map((b) => {
      if (b.type === "h2") return `## ${b.text}`;
      if (b.type === "p") return b.text;
      if (b.type === "ul") return b.items.map((i) => `- ${i}`).join("\n");
      if (b.type === "ol")
        return b.items.map((i) => `${i.title}: ${i.text}`).join("\n\n");
      return "";
    })
    .join("\n\n");
}

export function compressImage(
  file: File,
  maxW = 1280,
  quality = 0.82
): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith("image/")) {
      reject(new Error("Please choose an image file."));
      return;
    }
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Could not read the file."));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("Could not load the image."));
      img.onload = () => {
        const scale = Math.min(1, maxW / img.width);
        const w = Math.max(1, Math.round(img.width * scale));
        const h = Math.max(1, Math.round(img.height * scale));
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Canvas not supported."));
          return;
        }
        ctx.drawImage(img, 0, 0, w, h);
        try {
          resolve(canvas.toDataURL("image/jpeg", quality));
        } catch (e) {
          reject(e as Error);
        }
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}

export function todayDisplay(): string {
  return new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
