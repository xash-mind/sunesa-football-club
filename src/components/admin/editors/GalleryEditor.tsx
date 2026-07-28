import { useState } from "react";

import Field from "../editor/Field";
import TextArea from "../editor/TextArea";
import EditorSection from "../editor/EditorSection";

import type { Page } from "@/services/pages";

interface GalleryEditorProps {
  page: Page;
  onSave: (content: Record<string, any>) => Promise<void>;
}

export default function GalleryEditor({
  page,
  onSave,
}: GalleryEditorProps) {
  const [gallery, setGallery] = useState(page.content);
  const [saving, setSaving] = useState(false);

  async function save() {
    setSaving(true);

    try {
      await onSave(gallery);
    } finally {
      setSaving(false);
    }
  }

  function update(field: string, value: any) {
    setGallery({
      ...gallery,
      [field]: value,
    });
  }

  return (
    <div className="space-y-8">

      <div>
        <h2 className="font-display text-3xl">
          Gallery Section
        </h2>

        <p className="mt-2 text-sm text-muted-foreground">
          Controls the gallery heading shown above the photos.
        </p>
      </div>

      <EditorSection
        title="Gallery Content"
        description="Edit the heading displayed above the gallery."
      >

        <Field
          label="Eyebrow"
          value={gallery.eyebrow ?? ""}
          onChange={(v) => update("eyebrow", v)}
        />

        <Field
          label="Title"
          value={gallery.title ?? ""}
          onChange={(v) => update("title", v)}
        />

        <TextArea
          label="Subtitle"
          value={gallery.subtitle ?? ""}
          onChange={(v) => update("subtitle", v)}
        />

      </EditorSection>

      <button
        onClick={save}
        className="rounded-xl bg-gradient-gold px-6 py-3 font-semibold"
      >
        {saving ? "Saving..." : "Save Gallery"}
      </button>

    </div>
  );
}