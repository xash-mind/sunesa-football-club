import { useState } from "react";

import Field from "../editor/Field";
import TextArea from "../editor/TextArea";
import EditorSection from "../editor/EditorSection";

import type { Page } from "@/services/pages";

interface FooterEditorProps {
  page: Page;
  onSave: (content: Record<string, any>) => Promise<void>;
}

export default function FooterEditor({
  page,
  onSave,
}: FooterEditorProps) {
  const [footer, setFooter] = useState(page.content);
  const [saving, setSaving] = useState(false);

  async function save() {
    setSaving(true);

    try {
      await onSave(footer);
    } finally {
      setSaving(false);
    }
  }

  function update(field: string, value: any) {
    setFooter({
      ...footer,
      [field]: value,
    });
  }

  return (
    <div className="space-y-8">

      <div>
        <h2 className="font-display text-3xl">
          Footer Section
        </h2>

        <p className="mt-2 text-sm text-muted-foreground">
          Controls the website footer content and links.
        </p>
      </div>


      <EditorSection
        title="Brand Content"
        description="Main footer branding information."
      >

        <Field
          label="Club Name"
          value={footer.clubName ?? ""}
          onChange={(v) => update("clubName", v)}
        />

        <TextArea
          label="Description"
          value={footer.description ?? ""}
          onChange={(v) => update("description", v)}
        />

        <Field
          label="Copyright Text"
          value={footer.copyright ?? ""}
          onChange={(v) => update("copyright", v)}
        />

      </EditorSection>


      <EditorSection
        title="Navigation Links"
        description="Footer quick links section."
      >

        <Field
          label="Quick Links Title"
          value={footer.quickLinksTitle ?? ""}
          onChange={(v) => update("quickLinksTitle", v)}
        />

        <TextArea
          label="Quick Links"
          value={(footer.quickLinks ?? []).join("\n")}
          onChange={(v) =>
            update(
              "quickLinks",
              v
                .split("\n")
                .map((x: string) => x.trim())
                .filter(Boolean)
            )
          }
        />

      </EditorSection>


      <EditorSection
        title="Contact Details"
        description="Contact information shown in the footer."
      >

        <Field
          label="Email"
          value={footer.email ?? ""}
          onChange={(v) => update("email", v)}
        />

        <Field
          label="Phone"
          value={footer.phone ?? ""}
          onChange={(v) => update("phone", v)}
        />

        <Field
          label="Address"
          value={footer.address ?? ""}
          onChange={(v) => update("address", v)}
        />

      </EditorSection>


      <EditorSection
        title="Social Links"
        description="Social media URLs displayed in the footer."
      >

        <Field
          label="Instagram"
          value={footer.instagram ?? ""}
          onChange={(v) => update("instagram", v)}
        />

        <Field
          label="Facebook"
          value={footer.facebook ?? ""}
          onChange={(v) => update("facebook", v)}
        />

        <Field
          label="YouTube"
          value={footer.youtube ?? ""}
          onChange={(v) => update("youtube", v)}
        />

      </EditorSection>


      <button
        onClick={save}
        className="rounded-xl bg-gradient-gold px-6 py-3 font-semibold"
      >
        {saving ? "Saving..." : "Save Footer"}
      </button>

    </div>
  );
}