import { useState } from "react";

import Field from "../editor/Field";
import TextArea from "../editor/TextArea";
import EditorSection from "../editor/EditorSection";

import type { Page } from "@/services/pages";

interface NewsPageEditorProps {
  page: Page;
  onSave: (content: Record<string, any>) => Promise<void>;
}

export default function NewsPageEditor({
  page,
  onSave,
}: NewsPageEditorProps) {
  const [news, setNews] = useState(page.content);
  const [saving, setSaving] = useState(false);

  async function save() {
    setSaving(true);

    try {
      await onSave(news);
    } finally {
      setSaving(false);
    }
  }

  function update(field: string, value: any) {
    setNews({
      ...news,
      [field]: value,
    });
  }

  return (
    <div className="space-y-8">

      <div>
        <h2 className="font-display text-3xl">
          News Section
        </h2>

        <p className="mt-2 text-sm text-muted-foreground">
          Controls the news section displayed on the website.
        </p>
      </div>


      <EditorSection
        title="Header"
        description="Controls the title and introduction text."
      >

        <Field
          label="Eyebrow"
          value={news.eyebrow ?? ""}
          onChange={(v) => update("eyebrow", v)}
        />

        <Field
          label="Title"
          value={news.title ?? ""}
          onChange={(v) => update("title", v)}
        />

        <TextArea
          label="Subtitle"
          value={news.subtitle ?? ""}
          onChange={(v) => update("subtitle", v)}
        />

      </EditorSection>


      <EditorSection
        title="News Display"
        description="Controls how the news section appears."
      >

        <Field
          label="Section Label"
          value={news.sectionLabel ?? ""}
          onChange={(v) => update("sectionLabel", v)}
        />

        <Field
          label="Read More Text"
          value={news.readMoreText ?? ""}
          onChange={(v) => update("readMoreText", v)}
        />

        <Field
          label="Empty State Message"
          value={news.emptyMessage ?? ""}
          onChange={(v) => update("emptyMessage", v)}
        />

      </EditorSection>


      <EditorSection
        title="Featured News"
        description="Controls the featured news card."
      >

        <Field
          label="Featured Title"
          value={news.featuredTitle ?? ""}
          onChange={(v) => update("featuredTitle", v)}
        />

        <TextArea
          label="Featured Description"
          value={news.featuredDescription ?? ""}
          onChange={(v) => update("featuredDescription", v)}
        />

        <Field
          label="Featured Button Text"
          value={news.featuredButton ?? ""}
          onChange={(v) => update("featuredButton", v)}
        />

      </EditorSection>


      <button
        onClick={save}
        className="rounded-xl bg-gradient-gold px-6 py-3 font-semibold"
      >
        {saving ? "Saving..." : "Save News Section"}
      </button>

    </div>
  );
}