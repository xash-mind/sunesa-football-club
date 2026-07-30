import { useState } from "react";

import Field from "../editor/Field";
import TextArea from "../editor/TextArea";
import EditorSection from "../editor/EditorSection";

import type { Page } from "@/services/pages";

interface TrialsEditorProps {
  page: Page;
  onSave: (content: Record<string, any>) => Promise<void>;
}

export default function TrialsEditor({
  page,
  onSave,
}: TrialsEditorProps) {
  const [trials, setTrials] = useState(page.content);
  const [saving, setSaving] = useState(false);

  async function save() {
    setSaving(true);

    try {
      await onSave(trials);
    } finally {
      setSaving(false);
    }
  }

  function update(field: string, value: any) {
    setTrials({
      ...trials,
      [field]: value,
    });
  }

  return (
    <div className="space-y-8">

      <div>
        <h2 className="font-display text-3xl">
          Trials Section
        </h2>

        <p className="mt-2 text-sm text-muted-foreground">
          Controls the player trial information displayed on the website.
        </p>
      </div>


      <EditorSection
        title="Header"
        description="Main trials section heading content."
      >

        <Field
          label="Eyebrow"
          value={trials.eyebrow ?? ""}
          onChange={(v) => update("eyebrow", v)}
        />

        <Field
          label="Title"
          value={trials.title ?? ""}
          onChange={(v) => update("title", v)}
        />

        <TextArea
          label="Subtitle"
          value={trials.subtitle ?? ""}
          onChange={(v) => update("subtitle", v)}
        />
        <Field
  label="Point 1"
  value={trials.point1 ?? ""}
  onChange={(v) => update("point1", v)}
/>

<Field
  label="Point 2"
  value={trials.point2 ?? ""}
  onChange={(v) => update("point2", v)}
/>

<Field
  label="Point 3"
  value={trials.point3 ?? ""}
  onChange={(v) => update("point3", v)}
/>

      </EditorSection>


      <EditorSection
        title="Trial Information"
        description="Details shown to players interested in joining."
      >

        <Field
          label="Age Group"
          value={trials.ageGroup ?? ""}
          onChange={(v) => update("ageGroup", v)}
        />

        <Field
          label="Training Location"
          value={trials.location ?? ""}
          onChange={(v) => update("location", v)}
        />

        <Field
          label="Training Schedule"
          value={trials.schedule ?? ""}
          onChange={(v) => update("schedule", v)}
        />

        <TextArea
          label="Trial Description"
          value={trials.description ?? ""}
          onChange={(v) => update("description", v)}
        />

      </EditorSection>


      <EditorSection
        title="Requirements"
        description="One requirement per line."
      >

        <TextArea
          label="Requirements"
          value={(trials.requirements ?? []).join("\n")}
          onChange={(v) =>
            update(
              "requirements",
              v
                .split("\n")
                .map((x: string) => x.trim())
                .filter(Boolean)
            )
          }
        />

      </EditorSection>


      <EditorSection
        title="Call To Action"
        description="Button and action settings."
      >

        <Field
          label="Button Text"
          value={trials.buttonText ?? ""}
          onChange={(v) => update("buttonText", v)}
        />

        <Field
          label="Button Link"
          value={trials.buttonLink ?? ""}
          onChange={(v) => update("buttonLink", v)}
        />

      </EditorSection>


      <button
        onClick={save}
        className="rounded-xl bg-gradient-gold px-6 py-3 font-semibold"
      >
        {saving ? "Saving..." : "Save Trials"}
      </button>

    </div>
  );
}