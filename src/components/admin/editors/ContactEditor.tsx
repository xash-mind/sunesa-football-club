import { useState } from "react";

import Field from "../editor/Field";
import TextArea from "../editor/TextArea";
import EditorSection from "../editor/EditorSection";

import type { Page } from "@/services/pages";

interface ContactEditorProps {
  page: Page;
  onSave: (content: Record<string, any>) => Promise<void>;
}

export default function ContactEditor({
  page,
  onSave,
}: ContactEditorProps) {
  const [contact, setContact] = useState(page.content);
  const [saving, setSaving] = useState(false);

  async function save() {
    setSaving(true);

    try {
      await onSave(contact);
    } finally {
      setSaving(false);
    }
  }

  function update(field: string, value: any) {
    setContact({
      ...contact,
      [field]: value,
    });
  }

  return (
    <div className="space-y-8">

      <div>
        <h2 className="font-display text-3xl">
          Contact Section
        </h2>

        <p className="mt-2 text-sm text-muted-foreground">
          Controls contact details, location and visitor information.
        </p>
      </div>


      <EditorSection
  title="Contact Information"
  description="Controls the five information cards shown on the left side of the Contact section."
>

  <Field
    label="Section Eyebrow"
    value={contact.eyebrow ?? ""}
    onChange={(v) => update("eyebrow", v)}
  />

  <Field
    label="Section Title"
    value={contact.title ?? ""}
    onChange={(v) => update("title", v)}
  />

  <TextArea
    label="Section Subtitle"
    value={contact.subtitle ?? ""}
    onChange={(v) => update("subtitle", v)}
  />

  <hr className="my-4 border-border" />

  <Field
    label="Card 1 Label"
    value={contact.card1Label ?? ""}
    onChange={(v) => update("card1Label", v)}
  />

  <Field
    label="Card 1 Value"
    value={contact.card1Value ?? ""}
    onChange={(v) => update("card1Value", v)}
  />

  <Field
    label="Card 2 Label"
    value={contact.card2Label ?? ""}
    onChange={(v) => update("card2Label", v)}
  />

  <Field
    label="Card 2 Value"
    value={contact.card2Value ?? ""}
    onChange={(v) => update("card2Value", v)}
  />

  <Field
    label="Card 3 Label"
    value={contact.card3Label ?? ""}
    onChange={(v) => update("card3Label", v)}
  />

  <Field
    label="Card 3 Value"
    value={contact.card3Value ?? ""}
    onChange={(v) => update("card3Value", v)}
  />

  <Field
    label="Card 4 Label"
    value={contact.card4Label ?? ""}
    onChange={(v) => update("card4Label", v)}
  />

  <Field
    label="Card 4 Value"
    value={contact.card4Value ?? ""}
    onChange={(v) => update("card4Value", v)}
  />

  <Field
    label="Card 5 Label"
    value={contact.card5Label ?? ""}
    onChange={(v) => update("card5Label", v)}
  />

  <Field
    label="Card 5 Value"
    value={contact.card5Value ?? ""}
    onChange={(v) => update("card5Value", v)}
  />

</EditorSection>


      <EditorSection
        title="Visit Section"
        description="Controls the call-to-action card."
      >

        <Field
          label="Visit Title"
          value={contact.visitTitle ?? ""}
          onChange={(v) => update("visitTitle", v)}
        />

        <TextArea
          label="Visit Description"
          value={contact.visitDescription ?? ""}
          onChange={(v) => update("visitDescription", v)}
        />

        <Field
          label="Primary Button Text"
          value={contact.primaryButton ?? ""}
          onChange={(v) => update("primaryButton", v)}
        />

        <Field
          label="Primary Button Link"
          value={contact.primaryButtonLink ?? ""}
          onChange={(v) => update("primaryButtonLink", v)}
        />

        <Field
          label="Secondary Button Text"
          value={contact.secondaryButton ?? ""}
          onChange={(v) => update("secondaryButton", v)}
        />

        <Field
          label="Secondary Button Link"
          value={contact.secondaryButtonLink ?? ""}
          onChange={(v) => update("secondaryButtonLink", v)}
        />

      </EditorSection>


     <EditorSection
  title="Map Section"
  description="Paste a Google Maps Embed URL."
>

  <Field
    label="Google Maps Embed URL"
    value={contact.mapEmbed ?? ""}
    onChange={(v) => update("mapEmbed", v)}
  />

</EditorSection>


      <EditorSection
        title="Social Media"
        description="Social links shown in the contact section."
      >

        <Field
          label="Instagram URL"
          value={contact.instagram ?? ""}
          onChange={(v) => update("instagram", v)}
        />

        <Field
          label="Facebook URL"
          value={contact.facebook ?? ""}
          onChange={(v) => update("facebook", v)}
        />

        <Field
          label="YouTube URL"
          value={contact.youtube ?? ""}
          onChange={(v) => update("youtube", v)}
        />

      </EditorSection>


      <button
        onClick={save}
        className="rounded-xl bg-gradient-gold px-6 py-3 font-semibold"
      >
        {saving ? "Saving..." : "Save Contact"}
      </button>

    </div>
  );
}