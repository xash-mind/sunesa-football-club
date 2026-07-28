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
        description="Details displayed in the contact section."
      >

        <Field
          label="Email"
          value={contact.email ?? ""}
          onChange={(v) => update("email", v)}
        />

        <Field
          label="Phone"
          value={contact.phone ?? ""}
          onChange={(v) => update("phone", v)}
        />

        <Field
          label="Address"
          value={contact.address ?? ""}
          onChange={(v) => update("address", v)}
        />

        <TextArea
          label="Description"
          value={contact.description ?? ""}
          onChange={(v) => update("description", v)}
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
        description="Google Maps placeholder settings."
      >

        <Field
          label="Map Title"
          value={contact.mapTitle ?? ""}
          onChange={(v) => update("mapTitle", v)}
        />

        <TextArea
          label="Map Description"
          value={contact.mapDescription ?? ""}
          onChange={(v) => update("mapDescription", v)}
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