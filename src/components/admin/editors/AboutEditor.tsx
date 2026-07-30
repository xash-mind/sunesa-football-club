import { useState } from "react";

import Field from "../editor/Field";
import TextArea from "../editor/TextArea";
import EditorSection from "../editor/EditorSection";

import type { Page } from "@/services/pages";

interface AboutEditorProps {
  page: Page;
  onSave: (content: Record<string, any>) => Promise<void>;
}

export default function AboutEditor({
  page,
  onSave,
}: AboutEditorProps) {
  const [about, setAbout] = useState(page.content);
  const [saving, setSaving] = useState(false);

  async function save() {
    setSaving(true);

    try {
      await onSave(about);
    } finally {
      setSaving(false);
    }
  }

  function update(field: string, value: any) {
    setAbout({
      ...about,
      [field]: value,
    });
  }

  return (
    <div className="space-y-8">

  <div>
    <h2 className="font-display text-3xl">
      About Section
    </h2>

    <p className="mt-2 text-sm text-muted-foreground">
      Controls the About page of your website.
    </p>
  </div>

  <EditorSection
    title="Header"
    description="This content appears at the top of the About section. Use |text| to highlight words."
  >

    <Field
      label="Eyebrow"
      value={about.eyebrow ?? ""}
      onChange={(v) => update("eyebrow", v)}
    />

    <Field
      label="Title"
      value={about.title ?? ""}
      onChange={(v) => update("title", v)}
    />

    <TextArea
      label="Subtitle"
      value={about.subtitle ?? ""}
      onChange={(v) => update("subtitle", v)}
    />

  </EditorSection>

  <EditorSection
    title="Mission, Vision & Story"
    description="Controls the club's purpose and history."
  >

    <Field
      label="Mission Title"
      value={about.missionTitle ?? ""}
      onChange={(v) => update("missionTitle", v)}
    />

    <TextArea
      label="Mission Description"
      value={about.missionDescription ?? ""}
      onChange={(v) => update("missionDescription", v)}
    />

    <Field
      label="Vision Title"
      value={about.visionTitle ?? ""}
      onChange={(v) => update("visionTitle", v)}
    />

    <TextArea
      label="Vision Description"
      value={about.visionDescription ?? ""}
      onChange={(v) => update("visionDescription", v)}
    />

    <TextArea
      label="Club Story"
      value={about.story ?? ""}
      onChange={(v) => update("story", v)}
    />

  </EditorSection>
    <EditorSection
  title="Core Values"
  description="One value per line."
>

  <Field
    label="Values Title"
    value={about.valuesTitle ?? ""}
    onChange={(v) => update("valuesTitle", v)}
  />

  <TextArea
    label="Values"
    value={(about.values ?? []).join("\n")}
    onChange={(v) =>
      update(
        "values",
        v
          .split("\n")
          .map((x: string) => x.trim())
          .filter(Boolean)
      )
    }
  />

</EditorSection>


  <EditorSection
  title="Why Choose Sunesa"
  description="These three cards appear at the bottom of the About section."
>

  <Field
    label="Section Eyebrow"
    value={about.whyEyebrow ?? ""}
    onChange={(v) => update("whyEyebrow", v)}
  />

  <Field
    label="Section Title"
    value={about.whyTitle ?? ""}
    onChange={(v) => update("whyTitle", v)}
  />

  <TextArea
    label="Section Description"
    value={about.whySubtitle ?? ""}
    onChange={(v) => update("whySubtitle", v)}
  />

  <Field
    label="Card 1 Eyebrow"
    value={about.card1Eyebrow ?? ""}
    onChange={(v) => update("card1Eyebrow", v)}
  />

  <Field
    label="Card 1 Title"
    value={about.card1Title ?? ""}
    onChange={(v) => update("card1Title", v)}
  />

    <TextArea
      label="Card 1 Description"
      value={about.card1Description ?? ""}
      onChange={(v) => update("card1Description", v)}
    />

   <Field
  label="Card 2 Eyebrow"
  value={about.card2Eyebrow ?? ""}
  onChange={(v) => update("card2Eyebrow", v)}
/>

    <Field
      label="Card 2 Title"
      value={about.card2Title ?? ""}
      onChange={(v) => update("card2Title", v)}
    />

    <TextArea
      label="Card 2 Description"
      value={about.card2Description ?? ""}
      onChange={(v) => update("card2Description", v)}
    />

    <Field
  label="Card 3 Eyebrow"
  value={about.card3Eyebrow ?? ""}
  onChange={(v) => update("card3Eyebrow", v)}
/>

    <Field
      label="Card 3 Title"
      value={about.card3Title ?? ""}
      onChange={(v) => update("card3Title", v)}
    />

    <TextArea
      label="Card 3 Description"
      value={about.card3Description ?? ""}
      onChange={(v) => update("card3Description", v)}
    />

  </EditorSection>
  
   <button
        onClick={save}
        className="rounded-xl bg-gradient-gold px-6 py-3 font-semibold"
      >
        {saving ? "Saving..." : "Save About"}
      </button>


</div>
  );
}