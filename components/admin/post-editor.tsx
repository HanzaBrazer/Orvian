"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  Send,
  Trash2,
  UploadCloud,
  Heading2,
  List,
  ChevronDown,
  X,
  ExternalLink,
} from "lucide-react";
import type { BlogPost, Category, PostStatus } from "@/lib/blog";
import {
  slugify,
  parseBody,
  serializeBody,
  compressImage,
  uploadImage,
  dataUrlToBlob,
  upsertPost,
  deletePost,
  todayDisplay,
} from "@/lib/cms";
import { useToast } from "@/components/admin/toast";
import { ConfirmDialog } from "@/components/admin/ui";

const categoryOptions: Category[] = ["Business", "Analytics", "Management"];

const sampleBody =
  "## Overview\nWrite an introduction paragraph here. Separate paragraphs with a blank line.\n\n## Why it matters\nExplain the key idea.\n\n- First takeaway\n- Second takeaway";

export function PostEditor({
  mode,
  initial,
}: {
  mode: "new" | "edit";
  initial?: BlogPost;
}) {
  const router = useRouter();
  const { toast } = useToast();

  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(mode === "edit");
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? "");
  const [bodyText, setBodyText] = useState(
    initial ? serializeBody(initial.body) : sampleBody
  );
  const [image, setImage] = useState(initial?.image ?? "");
  const [category, setCategory] = useState<Category>(initial?.category ?? "Business");
  const [tags, setTags] = useState<string[]>(initial?.tags ?? []);
  const [tagInput, setTagInput] = useState("");
  const [readTime, setReadTime] = useState(initial?.readTime ?? "5 min read");
  const [status, setStatus] = useState<PostStatus>(initial?.status ?? "draft");
  const [seoOpen, setSeoOpen] = useState(false);
  const [seoTitle, setSeoTitle] = useState(initial?.seoTitle ?? "");
  const [seoDesc, setSeoDesc] = useState(initial?.seoDescription ?? "");

  const [saving, setSaving] = useState<null | "draft" | "publish">(null);
  const [uploading, setUploading] = useState(false);
  const [confirmPublish, setConfirmPublish] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [confirmLeave, setConfirmLeave] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [dirty, setDirty] = useState(false);

  const fileRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => setDirty(true), [title, slug, excerpt, bodyText, image, category, tags, status, seoTitle, seoDesc]);
  // ignore the very first run
  const firstRun = useRef(true);
  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      setDirty(false);
    }
  }, []);

  useEffect(() => {
    if (!slugTouched) setSlug(slugify(title || ""));
  }, [title, slugTouched]);

  useEffect(() => {
    const beforeUnload = (e: BeforeUnloadEvent) => {
      if (dirty) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", beforeUnload);
    return () => window.removeEventListener("beforeunload", beforeUnload);
  }, [dirty]);

  const handleFile = async (file?: File | null) => {
    if (!file) return;
    setUploading(true);
    try {
      setImage(await compressImage(file));
    } catch (e) {
      toast((e as Error).message, "error");
    } finally {
      setUploading(false);
    }
  };

  const insertPrefix = (prefix: string) => {
    const ta = bodyRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const value = ta.value;
    const lineStart = value.lastIndexOf("\n", start - 1) + 1;
    const next = value.slice(0, lineStart) + prefix + value.slice(lineStart);
    setBodyText(next);
    requestAnimationFrame(() => {
      ta.focus();
      ta.selectionStart = ta.selectionEnd = start + prefix.length;
    });
  };

  const addTag = () => {
    const t = tagInput.trim();
    if (t && !tags.includes(t)) setTags([...tags, t]);
    setTagInput("");
  };

  const build = (finalStatus: PostStatus, finalImage: string): BlogPost => ({
    slug: (mode === "edit" && initial ? initial.slug : slug) || slugify(title),
    title: title.trim() || "Untitled",
    excerpt: excerpt.trim() || title.trim(),
    category,
    date: mode === "edit" && initial ? initial.date : todayDisplay(),
    iso: mode === "edit" && initial ? initial.iso : new Date().toISOString().slice(0, 10),
    readTime: readTime.trim() || "5 min read",
    image: finalImage,
    body: parseBody(bodyText),
    status: finalStatus,
    tags,
    seoTitle: seoTitle.trim(),
    seoDescription: seoDesc.trim(),
    createdAt: initial?.createdAt ?? Date.now(),
    custom: true,
  });

  const save = async (finalStatus: PostStatus) => {
    if (!title.trim()) {
      toast("Please add a title first.", "error");
      return;
    }
    setSaving(finalStatus === "draft" ? "draft" : "publish");
    try {
      let finalImage = image;
      if (image.startsWith("data:")) {
        finalImage = await uploadImage(await dataUrlToBlob(image));
      }
      await upsertPost(build(finalStatus, finalImage));
      setDirty(false);
      toast(
        finalStatus === "published"
          ? "Post published successfully."
          : "Draft saved successfully."
      );
      router.push("/admin/blog");
    } catch (e) {
      toast((e as Error).message || "Could not save.", "error");
    } finally {
      setSaving(null);
      setConfirmPublish(false);
    }
  };

  const remove = async () => {
    if (!initial) return;
    setDeleting(true);
    try {
      await deletePost(initial.slug);
      toast("Post deleted.");
      router.push("/admin/blog");
    } catch (e) {
      toast((e as Error).message, "error");
    } finally {
      setDeleting(false);
      setConfirmDelete(false);
    }
  };

  const back = () => {
    if (dirty) setConfirmLeave(true);
    else router.push("/admin/blog");
  };

  return (
    <div className="mx-auto max-w-6xl">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button onClick={back} className="inline-flex items-center gap-2 text-sm link-muted">
          <ArrowLeft className="h-4 w-4" /> Back to Posts
        </button>
        <div className="flex items-center gap-2">
          {mode === "edit" && (
            <button
              onClick={() => setConfirmDelete(true)}
              className="inline-flex items-center gap-2 rounded-full border border-[#ff8a6b]/30 px-4 py-2.5 text-sm text-[#ff8a6b] transition-colors hover:bg-[#ff8a6b]/10"
            >
              <Trash2 className="h-4 w-4" /> Delete
            </button>
          )}
          <button
            onClick={() => save("draft")}
            disabled={!!saving}
            className="btn-secondary px-4 py-2.5 text-sm disabled:opacity-60"
          >
            {saving === "draft" ? (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-ink/40 border-t-ink" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            Save Draft
          </button>
          <button
            onClick={() => setConfirmPublish(true)}
            disabled={!!saving}
            className="btn-primary px-4 py-2.5 text-sm disabled:opacity-70"
          >
            <Send className="h-4 w-4" />
            {mode === "edit" && initial?.status === "published" ? "Update" : "Publish"}
          </button>
        </div>
      </div>

      <h1 className="mt-5 font-serif text-2xl text-ink">
        {mode === "new" ? "New Blog Post" : "Edit Blog Post"}
      </h1>
      {mode === "edit" && initial && (
        <p className="mt-1 text-xs text-faint">
          Current status:{" "}
          <span className="capitalize text-muted">{initial.status ?? "published"}</span>
        </p>
      )}

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
        {/* CONTENT */}
        <div className="min-w-0 space-y-5">
          <Field label="Title">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter post title..."
              className="w-full rounded-xl border border-line bg-card px-4 py-3 font-serif text-2xl text-ink placeholder:text-faint focus:border-primary/50 focus:outline-none"
            />
          </Field>

          <Field label="Slug" hint="Auto-generated from the title. You can edit it.">
            <div className="flex items-center rounded-xl border border-line bg-card px-3.5">
              <span className="text-sm text-faint">/blog/</span>
              <input
                value={slug}
                onChange={(e) => {
                  setSlugTouched(true);
                  setSlug(slugify(e.target.value));
                }}
                placeholder="post-url-slug"
                className="w-full bg-transparent py-3 text-sm text-ink placeholder:text-faint focus:outline-none"
              />
            </div>
          </Field>

          <Field label="Excerpt" hint="Short summary shown on cards & article header.">
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              rows={2}
              placeholder="A short summary of the article..."
              className="w-full resize-none rounded-xl border border-line bg-card px-4 py-3 text-sm text-ink placeholder:text-faint focus:border-primary/50 focus:outline-none"
            />
          </Field>

          <Field label="Content" hint="“## ” = heading · “- ” = bullet · blank line = paragraph">
            <div className="overflow-hidden rounded-xl border border-line bg-card">
              <div className="flex items-center gap-1 border-b border-line px-2 py-1.5">
                <ToolBtn onClick={() => insertPrefix("## ")} label="Heading">
                  <Heading2 className="h-4 w-4" />
                </ToolBtn>
                <ToolBtn onClick={() => insertPrefix("- ")} label="Bullet list">
                  <List className="h-4 w-4" />
                </ToolBtn>
              </div>
              <textarea
                ref={bodyRef}
                value={bodyText}
                onChange={(e) => setBodyText(e.target.value)}
                placeholder="Start writing your article..."
                className="min-h-[440px] w-full resize-y bg-transparent px-4 py-4 font-mono text-[13px] leading-relaxed text-ink placeholder:text-faint focus:outline-none"
              />
            </div>
          </Field>
        </div>

        {/* SETTINGS */}
        <aside className="space-y-5">
          <SidePanel title="Featured Image">
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFile(e.target.files?.[0])}
            />
            {image ? (
              <div className="space-y-2">
                <span className="relative block aspect-[16/9] overflow-hidden rounded-lg border border-line">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={image} alt="" className="h-full w-full object-cover" />
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => fileRef.current?.click()}
                    className="flex-1 rounded-lg border border-line py-2 text-xs text-muted hover:text-ink"
                  >
                    Replace
                  </button>
                  <button
                    onClick={() => setImage("")}
                    className="flex-1 rounded-lg border border-[#ff8a6b]/30 py-2 text-xs text-[#ff8a6b] hover:bg-[#ff8a6b]/10"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => fileRef.current?.click()}
                className="flex w-full flex-col items-center gap-2 rounded-xl border border-dashed border-line-strong/60 px-3 py-6 text-center hover:border-primary/40"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-interactive text-primary">
                  {uploading ? (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary/40 border-t-primary" />
                  ) : (
                    <UploadCloud className="h-[18px] w-[18px]" />
                  )}
                </span>
                <span className="text-sm text-ink">Upload image</span>
                <span className="text-[11px] text-faint">JPG, PNG, WebP · 1200×630</span>
              </button>
            )}
          </SidePanel>

          <SidePanel title="Category">
            <SelectBox value={category} onChange={(v) => setCategory(v as Category)}>
              {categoryOptions.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </SelectBox>
          </SidePanel>

          <SidePanel title="Tags">
            <div className="flex flex-wrap gap-1.5">
              {tags.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-1 rounded-full border border-line bg-interactive px-2.5 py-1 text-xs text-muted"
                >
                  {t}
                  <button onClick={() => setTags(tags.filter((x) => x !== t))} aria-label="Remove tag">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
            <input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addTag();
                }
              }}
              placeholder="Add a tag..."
              className="mt-2 w-full rounded-lg border border-line bg-card px-3 py-2 text-sm text-ink placeholder:text-faint focus:border-primary/50 focus:outline-none"
            />
          </SidePanel>

          <SidePanel title="Status">
            <SelectBox value={status} onChange={(v) => setStatus(v as PostStatus)}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </SelectBox>
            <FieldRow className="mt-3" label="Read time">
              <input
                value={readTime}
                onChange={(e) => setReadTime(e.target.value)}
                className="w-28 rounded-lg border border-line bg-card px-3 py-1.5 text-sm text-ink focus:border-primary/50 focus:outline-none"
              />
            </FieldRow>
          </SidePanel>

          {/* SEO accordion */}
          <div className="overflow-hidden rounded-2xl border border-line bg-card">
            <button
              onClick={() => setSeoOpen((v) => !v)}
              className="flex w-full items-center justify-between px-4 py-3.5 text-sm font-semibold text-ink"
            >
              SEO Settings
              <ChevronDown className={`h-4 w-4 transition-transform ${seoOpen ? "rotate-180" : ""}`} />
            </button>
            {seoOpen && (
              <div className="space-y-3 border-t border-line px-4 py-4">
                <div>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-xs font-medium text-muted">Meta Title</span>
                    <span className="text-[11px] text-faint">{seoTitle.length}/60</span>
                  </div>
                  <input
                    value={seoTitle}
                    onChange={(e) => setSeoTitle(e.target.value.slice(0, 70))}
                    className="w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm text-ink focus:border-primary/50 focus:outline-none"
                  />
                </div>
                <div>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-xs font-medium text-muted">Meta Description</span>
                    <span className="text-[11px] text-faint">{seoDesc.length}/160</span>
                  </div>
                  <textarea
                    value={seoDesc}
                    onChange={(e) => setSeoDesc(e.target.value.slice(0, 180))}
                    rows={3}
                    className="w-full resize-none rounded-lg border border-line bg-surface px-3 py-2 text-sm text-ink focus:border-primary/50 focus:outline-none"
                  />
                </div>
              </div>
            )}
          </div>

          {mode === "edit" && initial && (
            <Link
              href={`/blog/${initial.slug}`}
              target="_blank"
              className="flex items-center justify-center gap-2 rounded-xl border border-line py-2.5 text-sm text-muted hover:text-ink"
            >
              <ExternalLink className="h-4 w-4" /> Preview on site
            </Link>
          )}
        </aside>
      </div>

      <ConfirmDialog
        open={confirmPublish}
        title={status === "published" ? "Publish this article?" : "Save & publish?"}
        message="This article will become visible on the public Orvian blog."
        confirmLabel="Publish Article"
        loading={saving === "publish"}
        onCancel={() => setConfirmPublish(false)}
        onConfirm={() => save("published")}
      />
      <ConfirmDialog
        open={confirmDelete}
        title="Delete this article?"
        message="This action cannot be undone."
        confirmLabel="Delete Article"
        destructive
        loading={deleting}
        onCancel={() => setConfirmDelete(false)}
        onConfirm={remove}
      />
      <ConfirmDialog
        open={confirmLeave}
        title="Unsaved changes"
        message="You have unsaved changes. Are you sure you want to leave this page?"
        confirmLabel="Discard Changes"
        destructive
        onCancel={() => setConfirmLeave(false)}
        onConfirm={() => router.push("/admin/blog")}
      />
    </div>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-baseline justify-between">
        <span className="text-sm font-medium text-ink">{label}</span>
        {hint && <span className="text-[11px] text-faint">{hint}</span>}
      </span>
      {children}
    </label>
  );
}

function FieldRow({
  label,
  className = "",
  children,
}: {
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`flex items-center justify-between ${className}`}>
      <span className="text-xs font-medium text-muted">{label}</span>
      {children}
    </div>
  );
}

function SidePanel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-line bg-card p-4">
      <p className="mb-3 text-sm font-semibold text-ink">{title}</p>
      {children}
    </div>
  );
}

function SelectBox({
  value,
  onChange,
  children,
}: {
  value: string;
  onChange: (v: string) => void;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none rounded-lg border border-line bg-surface px-3 py-2.5 text-sm text-ink focus:border-primary/50 focus:outline-none"
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
    </div>
  );
}

function ToolBtn({
  onClick,
  label,
  children,
}: {
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className="flex h-8 w-8 items-center justify-center rounded-lg text-muted transition-colors hover:bg-white/[0.06] hover:text-ink"
    >
      {children}
    </button>
  );
}
