import { posts as defaultPosts, type BlogPost, type Block } from "@/lib/blog";

const KEY = "orvian-cms-v1";
export const CMS_EVENT = "orvian-cms-change";

type Store = {
  overrides: Record<string, BlogPost>;
  deleted: string[];
};

function read(): Store {
  if (typeof window === "undefined") return { overrides: {}, deleted: [] };
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return { overrides: {}, deleted: [] };
    const parsed = JSON.parse(raw);
    return {
      overrides: parsed.overrides ?? {},
      deleted: parsed.deleted ?? [],
    };
  } catch {
    return { overrides: {}, deleted: [] };
  }
}

function write(store: Store) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(store));
    window.dispatchEvent(new Event(CMS_EVENT));
  } catch {
    /* storage unavailable — ignore */
  }
}

export function getMergedPosts(): BlogPost[] {
  const { overrides, deleted } = read();
  const added = Object.values(overrides)
    .filter((p) => !defaultPosts.some((d) => d.slug === p.slug))
    .sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0));
  const base = defaultPosts.map((d) => overrides[d.slug] ?? d);
  return [...added, ...base].filter((p) => !deleted.includes(p.slug));
}

export function getMergedPost(slug: string): BlogPost | undefined {
  return getMergedPosts().find((p) => p.slug === slug);
}

export function isCustom(slug: string): boolean {
  return !defaultPosts.some((d) => d.slug === slug);
}

export function upsertPost(post: BlogPost) {
  const store = read();
  store.overrides[post.slug] = post;
  store.deleted = store.deleted.filter((s) => s !== post.slug);
  write(store);
}

export function deletePost(slug: string) {
  const store = read();
  delete store.overrides[slug];
  if (!store.deleted.includes(slug)) store.deleted.push(slug);
  write(store);
}

export function resetPost(slug: string) {
  const store = read();
  delete store.overrides[slug];
  store.deleted = store.deleted.filter((s) => s !== slug);
  write(store);
}

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
  const wanted = slugify(title);
  if (existingSlug === wanted) return wanted;
  const taken = new Set(getMergedPosts().map((p) => p.slug));
  if (!taken.has(wanted)) return wanted;
  let i = 2;
  while (taken.has(`${wanted}-${i}`)) i++;
  return `${wanted}-${i}`;
}

/* ---- Body <-> plain text ---- */

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
      // heading + following paragraph in same block
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

export const blogImages = [
  "/images/blog-business.jpg",
  "/images/blog-management.jpg",
  "/images/blog-analytics.jpg",
];

export function todayDisplay(): string {
  return new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
