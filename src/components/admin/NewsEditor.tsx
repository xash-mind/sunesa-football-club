import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import RichTextEditor from "@/components/admin/RichTextEditor";

import {
  createNews,
  getNewsById,
  updateNews,
} from "@/services/news";

import {
  uploadImage,
  deleteImage,
} from "@/services/storage";

interface NewsEditorProps {
  articleId?: string;
}

function slugify(text: string) {
  const base = text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  const random =
    Math.random()
      .toString(36)
      .substring(2, 8);

  return `${base}-${random}`;
}
const inputClass =
  "w-full rounded-xl border border-border bg-card px-4 py-3 text-foreground outline-none transition focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/30";

export default function NewsEditor({
  articleId,
}: NewsEditorProps) {
  const navigate = useNavigate();

  const editing = !!articleId;

  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [published, setPublished] = useState(false);

  const [loading, setLoading] = useState(editing);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [originalThumbnail, setOriginalThumbnail] = useState("");
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    if (!editing) return;

    async function loadArticle() {
      try {
        const article = await getNewsById(articleId!);

        setTitle(article.title);
        setExcerpt(article.excerpt);
        setContent(article.content);
        setThumbnail(article.thumbnail ?? "");
        setOriginalThumbnail(article.thumbnail ?? "");
        setPublished(article.published);
      } catch (err) {
        console.error(err);
        alert("Failed to load article.");
      } finally {
        setLoading(false);
      }
    }

    loadArticle();
  }, [articleId, editing]);

  async function handleThumbnailUpload(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    setFileName(file.name);

    try {
      setUploading(true);

      const url = await uploadImage(file, "news");

      if (
        editing &&
        originalThumbnail &&
        originalThumbnail !== url
      ) {
        await deleteImage(originalThumbnail);
      }

      setThumbnail(url);

    } catch (err) {
      console.error(err);
      alert("Failed to upload image.");
    } finally {
      setUploading(false);
    }
  }

  async function handleSave() {
    if (!title.trim()) {
      alert("Please enter a title.");
      return;
    }

    try {
      setSaving(true);

      const article = {
        title,
        slug: slugify(title),
        excerpt,
        content,
        thumbnail,
        published,
        published_at: published
          ? new Date().toISOString()
          : null,
      };

      if (editing) {
        await updateNews(articleId!, article);
      } else {
        await createNews(article);
      }

      navigate({
        to: "/admin/news",
      });

    } catch (err) {
      console.error(err);
      alert("Failed to save article.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="p-10 text-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8">

      <h1 className="font-display text-4xl text-gradient-gold">
        {editing ? "Edit Article" : "Create News Article"}
      </h1>

      <div className="rounded-2xl border border-border bg-card p-6">
        <label className="mb-2 block text-sm font-semibold uppercase tracking-wide text-brand-primary">
          Title
        </label>

        <input
          className={inputClass}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Article title"
        />
      </div>

      <div className="rounded-2xl border border-border bg-card p-6">
        <label className="mb-2 block text-sm font-semibold uppercase tracking-wide text-brand-primary">
          Excerpt
        </label>

        <textarea
          className={`${inputClass} min-h-28 resize-none`}
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          placeholder="Short description"
        />
      </div>

      <div className="rounded-2xl border border-border bg-card p-6">
        <label className="mb-3 block font-medium">
          Thumbnail Image
        </label>

        <label className="inline-flex cursor-pointer items-center rounded-xl border border-brand-primary bg-secondary px-5 py-3 text-sm font-medium transition hover:border-brand-primary hover:shadow-gold">
          📷 Click to Upload

          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleThumbnailUpload}
          />
        </label>

        {uploading && (
          <p className="mt-3 text-sm text-muted-foreground">
            Uploading...
          </p>
        )}

        {!uploading && fileName && (
          <p className="mt-3 text-sm text-muted-foreground">
            ✓ {fileName}
          </p>
        )}

        {thumbnail && (
          <img
            src={thumbnail}
            alt="Thumbnail preview"
            className="mt-5 h-56 w-full rounded-xl border border-border object-cover"
          />
        )}
      </div>

      <div className="rounded-2xl border border-border bg-card p-6">
  <label className="mb-2 block text-sm font-semibold uppercase tracking-wide text-brand-primary">
    Content
  </label>
<div>
  <RichTextEditor
    value={content}
    onChange={setContent}
  />
</div>
</div>

      <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-4">
       <input
  type="checkbox"
  checked={published}
  onChange={(e) => setPublished(e.target.checked)}
/>

<div>
  <p className="font-medium">
    Publish Article
  </p>

  <p className="text-sm text-muted-foreground">
    Published articles appear on the website immediately.
  </p>
</div>
      </div>

      <button
       onClick={handleSave}
       disabled={saving || uploading}
       className="w-full rounded-xl bg-brand-primary py-4 text-lg font-semibold text-black transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
>
        {saving
          ? "Saving..."
          : editing
          ? "Update Article"
          : "Save Article"}
      </button>

    </div>
  );
}