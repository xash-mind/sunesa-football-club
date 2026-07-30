import { useState } from "react";

import Field from "../editor/Field";
import TextArea from "../editor/TextArea";
import EditorSection from "../editor/EditorSection";
import type { Page } from "@/services/pages";

interface HeroEditorProps {
  page: Page;
  onSave: (content: Record<string, any>) => Promise<void>;
}

export default function HeroEditor({
  page,
  onSave,
}: HeroEditorProps) {
  const [hero, setHero] = useState(page.content);
  const [saving, setSaving] = useState(false);

  async function save() {
  setSaving(true);

  try {
    await onSave(hero);
  } finally {
    setSaving(false);
  }
}

  function update(field: string, value: any) {
    setHero({
      ...hero,
      [field]: value,
    });
  }

  return (
  <div className="space-y-8">

    <div>
      <h2 className="font-display text-3xl">
        Hero Section
      </h2>

      <p className="mt-2 text-sm text-muted-foreground">
        Controls the landing section of your website.
      </p>
    </div>

    <EditorSection
      title="Content"
      description="Main content displayed in the hero section."
    >

      <Field
        label="Badge"
        value={hero.badge ?? ""}
        onChange={(v) => update("badge", v)}
      />

      <Field
        label="Heading Line 1"
        value={hero.heading1 || "One Club."}
        onChange={(v) => update("heading1", v)}
      />

      <Field
        label="Heading Line 2"
        value={hero.heading2 || "One Passion."}
        onChange={(v) => update("heading2", v)}
      />

      <Field
        label="Heading Line 3"
        value={hero.heading3 || "Endless Possibilities."}
        onChange={(v) => update("heading3", v)}
      />

      <TextArea
        label="Description"
        value={hero.description || "Together, We Take Talent From The Grassroots To The Highest Level."}
        onChange={(v) => update("description", v)}
      />

    </EditorSection>

    <EditorSection
      title="Buttons"
      description="Configure the hero call-to-action buttons."
    >

      <Field
        label="Primary Button"
        value={hero.primaryButton || "Join Trials"}
        onChange={(v) => update("primaryButton", v)}
      />

      <Field
        label="Primary Button Link"
        value={hero.primaryButtonLink || "#trials"}
        onChange={(v) => update("primaryButtonLink", v)}
      />

      <Field
        label="Secondary Button"
        value={hero.secondaryButton || "About Us"}
        onChange={(v) => update("secondaryButton", v)}
      />

      <Field
        label="Secondary Button Link"
        value={hero.secondaryButtonLink || "#about"}
        onChange={(v) => update("secondaryButtonLink", v)}
      />

    </EditorSection>

    <EditorSection
      title="Statistics"
      description="Statistics editor will be added shortly."
    >

      <p className="text-sm text-muted-foreground">
        Coming soon.
      </p>

    </EditorSection>

   
  <button
        onClick={save}
        className="rounded-xl bg-gradient-gold px-6 py-3 font-semibold"
      >
        {saving ? "Saving..." : "Save Hero"}
      </button>
</div>

  
);
}
