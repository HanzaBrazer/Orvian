"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Trash2, Check, UploadCloud, ImagePlus } from "lucide-react";
import type { BlogPost, Category } from "@/lib/blog";
import {
  upsertPost,
  deletePost,
  parseBody,
  serializeBody,
  uniqueSlug,
  blogImages,
  compressImage,
  todayDisplay,
} from "@/lib/cms";

const categories: Category[] = ["Business", "Analytics", "Management"];

const emptyBodySample =
  "## Overview\nWrite an introduction paragraph here. Separate paragraphs with a blank line.\n\n## Why it matters\nExplain the key idea.\n\n- First takeaway\n- Second takeaway\n- Third takeaway";

export function CmsEditor({
  mode,
  post,
  open,
  onClose,
  onSaved,
}: {
  mode: "add" | "edit";
  post?: BlogPost;
  open: boolean;
  onClose: () => void;
  onSaved: (slug: string, deleted?: boolean) => void;
}) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<Category>("Business");
  const [excerpt, setExcerpt] = useState("");
  const [image, setImage] = useState(blogImages[0]);
  const [imageName, setImageName] = useState("");
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [readTime, setReadTime] = useState("5 min read");
  const [bodyText, setBodyText] = useState("");
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file?: File | null) => {
    if (!file) return;
    setError("");
    setUploading(true);
    try {
      const dataUrl = await compressImage(file);
      setImage(dataUrl);
      setImageName(file.name);
    } catch (e) {
      setError((e as Error).message || "Could not upload that image.");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = () => {
    setImage("");
    setImageName("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const imageLabel = image
    ? imageName ||
      (image.startsWith("data:")
        ? "Uploaded image"
        : image.split("/").pop() || "Cover image")
    : "";

  useEffect(() => {
    if (!open) return;
    if (mode === "edit" && post) {
      setTitle(post.title);
      setCategory(post.category);
      setExcerpt(post.excerpt);
      setImage(post.image);
      setReadTime(post.readTime);
      setBodyText(serializeBody(post.body));
    } else {
      setTitle("");
      setCategory("Business");
      setExcerpt("");
      setImage(blogImages[0]);
      setReadTime("5 min read");
      setBodyText(emptyBodySample);
    }
    setImageName("");
    setError("");
  }, [open, mode, post]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const save = () => {
    if (!title.trim()) {
      setError("Please add a title.");
      return;
    }
    const slug =
      mode === "edit" && post ? post.slug : uniqueSlug(title);
    const body = parseBody(bodyText);
    const iso = new Date().toISOString().slice(0, 10);
    const next: BlogPost = {
      slug,
      title: title.trim(),
      excerpt: excerpt.trim() || title.trim(),
      category,
      date: mode === "edit" && post ? post.date : todayDisplay(),
      iso: mode === "edit" && post ? post.iso : iso,
      readTime: readTime.trim() || "5 min read",
      image,
      body: body.length ? body : [{ type: "p", text: excerpt || title }],
      createdAt: post?.createdAt ?? Date.now(),
      custom: true,
    };
    upsertPost(next);
    onSaved(slug);
  };

  const remove = () => {
    if (!post) return;
    deletePost(post.slug);
    onSaved(post.slug, true);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto p-4 py-10 sm:py-16"
        >
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-[#0e0e12]/95 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)] backdrop-blur-2xl"
          >
            {/* header */}
            <div className="flex items-center justify-between border-b border-white/5 px-6 py-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
                  {mode === "add" ? "New Article" : "Edit Article"}
                </p>
                <h2 className="mt-0.5 text-lg font-semibold text-ink">
                  Content Editor
                </h2>
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-line-strong/60 bg-interactive/60 text-ink hover:bg-interactive2"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            {/* body */}
            <div className="max-h-[70vh] space-y-5 overflow-y-auto px-6 py-6">
              <Field label="Title">
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="A comprehensive guide to…"
                  className="input"
                />
              </Field>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Category">
                  <div className="flex flex-wrap gap-2">
                    {categories.map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setCategory(c)}
                        className={`rounded-full border px-3.5 py-2 text-sm transition-colors ${
                          category === c
                            ? "border-primary/40 bg-primary/15 text-primary"
                            : "border-line text-muted hover:text-ink"
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </Field>
                <Field label="Read time">
                  <input
                    value={readTime}
                    onChange={(e) => setReadTime(e.target.value)}
                    placeholder="5 min read"
                    className="input"
                  />
                </Field>
              </div>

              <Field label="Excerpt">
                <textarea
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  rows={2}
                  placeholder="A short summary shown on the blog card and article header."
                  className="input resize-none"
                />
              </Field>

              <Field label="Cover image" hint="Upload a file, choose a preset, or paste a URL">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleFile(e.target.files?.[0])}
                />

                {image ? (
                  /* Attachment preview with remove */
                  <div className="flex items-center gap-3 rounded-2xl border border-line bg-white/[0.02] p-2.5">
                    <span className="relative h-14 w-20 shrink-0 overflow-hidden rounded-lg border border-line">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={image}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-ink">
                        {imageLabel}
                      </p>
                      <p className="text-xs text-faint">
                        {image.startsWith("data:")
                          ? "Uploaded · stored with the article"
                          : "Cover image"}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="shrink-0 rounded-full border border-line-strong/60 px-3 py-1.5 text-xs text-muted transition-colors hover:text-ink"
                    >
                      Replace
                    </button>
                    <button
                      type="button"
                      onClick={removeImage}
                      aria-label="Remove image"
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#ff8a6b]/30 text-[#ff8a6b] transition-colors hover:bg-[#ff8a6b]/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  /* Upload dropzone */
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDragging(true);
                    }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setDragging(false);
                      handleFile(e.dataTransfer.files?.[0]);
                    }}
                    className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border border-dashed px-4 py-7 text-center transition-colors ${
                      dragging
                        ? "border-primary/60 bg-primary/5"
                        : "border-line-strong/60 hover:border-primary/40 hover:bg-white/[0.02]"
                    }`}
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-interactive text-primary">
                      {uploading ? (
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary/40 border-t-primary" />
                      ) : (
                        <UploadCloud className="h-5 w-5" />
                      )}
                    </span>
                    <span className="text-sm text-ink">
                      {uploading ? "Processing…" : "Click to upload or drag & drop"}
                    </span>
                    <span className="text-xs text-faint">PNG, JPG, WEBP — up to ~5MB</span>
                  </div>
                )}

                {/* presets + url */}
                <div className="mt-3 flex items-center gap-2">
                  <span className="flex items-center gap-1 text-xs text-faint">
                    <ImagePlus className="h-3.5 w-3.5" /> Presets
                  </span>
                  {blogImages.map((src) => (
                    <button
                      key={src}
                      type="button"
                      onClick={() => {
                        setImage(src);
                        setImageName("");
                      }}
                      className={`relative h-10 w-14 overflow-hidden rounded-lg border-2 transition-colors ${
                        image === src ? "border-primary" : "border-transparent hover:border-line-strong"
                      }`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={src} alt="" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
                <input
                  value={image.startsWith("data:") ? "" : image}
                  onChange={(e) => {
                    setImage(e.target.value);
                    setImageName("");
                  }}
                  placeholder="…or paste an image URL (https://…)"
                  className="input mt-2"
                />
              </Field>

              <Field
                label="Content"
                hint="Blank line = new paragraph · “## ” = heading · “- ” = bullet"
              >
                <textarea
                  value={bodyText}
                  onChange={(e) => setBodyText(e.target.value)}
                  rows={10}
                  className="input resize-y font-mono text-[13px] leading-relaxed"
                />
              </Field>

              {error && <p className="text-sm text-[#ff8a6b]">{error}</p>}
            </div>

            {/* footer */}
            <div className="flex items-center justify-between gap-3 border-t border-white/5 px-6 py-4">
              {mode === "edit" ? (
                <button
                  onClick={remove}
                  className="inline-flex items-center gap-2 rounded-full border border-[#ff8a6b]/30 px-4 py-2.5 text-sm text-[#ff8a6b] transition-colors hover:bg-[#ff8a6b]/10"
                >
                  <Trash2 className="h-4 w-4" /> Delete
                </button>
              ) : (
                <span />
              )}
              <div className="flex items-center gap-2">
                <button onClick={onClose} className="btn-ghost px-5 py-2.5">
                  Cancel
                </button>
                <button onClick={save} className="btn-primary px-5 py-2.5">
                  <Check className="h-4 w-4" />
                  {mode === "add" ? "Publish" : "Save changes"}
                </button>
              </div>
            </div>
          </motion.div>

          <style jsx>{`
            :global(.input) {
              width: 100%;
              border-radius: 0.85rem;
              border: 1px solid #26262e;
              background: rgba(255, 255, 255, 0.02);
              padding: 0.65rem 0.85rem;
              font-size: 0.9rem;
              color: #eeeef2;
              outline: none;
              transition: border-color 0.2s;
            }
            :global(.input:focus) {
              border-color: rgba(195, 248, 253, 0.5);
            }
            :global(.input::placeholder) {
              color: #6a6a78;
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
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
      <span className="mb-2 flex items-baseline justify-between">
        <span className="text-sm font-medium text-ink">{label}</span>
        {hint && <span className="text-[11px] text-faint">{hint}</span>}
      </span>
      {children}
    </label>
  );
}
