import { useState } from "react";
import {
  createForm,
  updateForm,
} from "@/services/forms";

import type {
  Form,
  FormSection,
} from "@/services/forms";


type FormEditorProps = {
  onBack: () => void;
  form?: Form;
};
type FormField = {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  required: boolean;
  options: string[];
};


export default function FormEditor({
  onBack,
  form,
}: FormEditorProps) {
  const [name, setName] = useState(form?.name ?? "");
const [description, setDescription] = useState(
  form?.description ?? ""
);
const [sections, setSections] = useState<FormSection[]>(
  form?.sections ?? []
);
  
  const [active, setActive] = useState(false);
  const [saving, setSaving] = useState(false);
  const [placement, setPlacement] = useState(
  form?.placement ?? "standalone"
);
  
  function addSection() {
  setSections((current) => [
    ...current,
    {
      id: Date.now().toString(),
      name: "",
      description: "",
      fields: [],
    },
  ]);
}
function addField(sectionId: string) {
  setSections((current) =>
    current.map((section) =>
      section.id === sectionId
        ? {
            ...section,
            fields: [
              ...section.fields,
              {
                id: Date.now().toString(),
                label: "",
                type: "text",
                placeholder: "",
                required: false,
                options: [],
              },
            ],
          }
        : section
    )
  );
}
function addOption(sectionId: string, fieldId: string) {
  setSections((current) =>
    current.map((section) =>
      section.id === sectionId
        ? {
            ...section,
            fields: section.fields.map((field) =>
              field.id === fieldId
                ? {
                    ...field,
                    options: [...field.options, ""],
                  }
                : field
            ),
          }
        : section
    )
  );
}
function removeOption(
  sectionId: string,
  fieldId: string,
  optionIndex: number
) {
  setSections((current) =>
    current.map((section) =>
      section.id === sectionId
        ? {
            ...section,
            fields: section.fields.map((field) =>
              field.id === fieldId
                ? {
                    ...field,
                    options: field.options.filter(
                      (_, index) => index !== optionIndex
                    ),
                  }
                : field
            ),
          }
        : section
    )
  );
}
async function save() {
  setSaving(true);

  try {
    const slug = name
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    if (form) {
      await updateForm(form.id, {
  name,
  slug,
  description,
  placement,
  sections,
});
    } else {
     await createForm(
  name,
  slug,
  description,
  placement,
  sections
);
    }

    onBack();
  } catch (error) {
    console.error("Failed to save form:", error);
  } finally {
    setSaving(false);
  }
}

  return (
    <div className="mx-auto max-w-5xl">

      {/* Header */}

      <div className="flex items-center justify-between gap-4">

        <div>
          <h1 className="font-display text-4xl">
            Create Form
          </h1>

          <p className="mt-2 text-muted-foreground">
            Build a modular form for your website.
          </p>
        </div>

        <button
          onClick={onBack}
          className="
            rounded-xl
            border
            border-border
            px-4 py-2.5
            text-sm
            font-medium
            transition
            hover:border-brand-primary
            hover:text-brand-primary
          "
        >
          ← Back
        </button>

      </div>


      {/* Basic Information */}

      <div className="mt-10 rounded-2xl border border-border bg-card p-6">

        <h2 className="font-display text-2xl">
          Form Information
        </h2>

        <p className="mt-2 text-sm text-muted-foreground">
          Basic information about this form.
        </p>

        <div>
  <label className="mb-2 block text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
    Form Placement
  </label>

  <select
    value={placement}
    onChange={(e) => setPlacement(e.target.value)}
    className="
      w-full
      rounded-xl
      border
      border-border
      bg-brand-background/60
      px-4
      py-3
      text-sm
      text-foreground
      outline-none
      transition-colors
      focus:border-brand-primary
    "
  >
    <option value="trials">Trials Section</option>
    <option value="contact">Contact Section</option>
    <option value="homepage">Homepage</option>
    <option value="standalone">Standalone</option>
  </select>

  <p className="mt-2 text-xs text-muted-foreground">
    Controls where this form can appear on the public website.
  </p>
</div>


        <div className="mt-6 space-y-5">

          <div>
            <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              Form Name
            </label>

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Trial Registration"
              className="
                w-full
                rounded-xl
                border
                border-border
                bg-brand-background/60
                px-4 py-3
                text-sm
                outline-none
                transition
                focus:border-brand-primary
              "
            />
          </div>


          <div>
            <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              Description
            </label>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Application form for Sunesa FC trials."
              rows={3}
              className="
                w-full
                resize-none
                rounded-xl
                border
                border-border
                bg-brand-background/60
                px-4 py-3
                text-sm
                outline-none
                transition
                focus:border-brand-primary
              "
            />
          </div>

        </div>

      </div>


      {/* Sections */}

      <div className="mt-6 rounded-2xl border border-border bg-card p-6">

        <div className="flex items-center justify-between gap-4">

          <div>
            <h2 className="font-display text-2xl">
              Form Sections
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              Add groups of fields to your form.
            </p>
          </div>

          

        </div>


       {sections.length === 0 ? (
  <div className="mt-8 rounded-xl border border-dashed border-border p-8 text-center">
    <p className="text-sm text-muted-foreground">
      No sections added yet.
    </p>

    <p className="mt-1 text-xs text-muted-foreground">
      Add a section to start building your form.
    </p>
  </div>
) : (
  <div className="mt-8 space-y-5">
    {sections.map((section, index) => (
      <div
        key={section.id}
        className="rounded-2xl border border-border bg-brand-background/40 p-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-brand-primary">
              Section {index + 1}
            </div>

            <h3 className="mt-1 font-display text-xl">
              {section.name || "Untitled Section"}
            </h3>
          </div>

          <button
            type="button"
            onClick={() =>
              setSections((current) =>
                current.filter((item) => item.id !== section.id)
              )
            }
            className="text-xs text-muted-foreground transition hover:text-red-400"
          >
            Remove
          </button>
        </div>

        <div className="mt-5 space-y-4">

          <div>
            <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              Section Name
            </label>

            <input
              value={section.name}
              onChange={(e) =>
                setSections((current) =>
                  current.map((item) =>
                    item.id === section.id
                      ? { ...item, name: e.target.value }
                      : item
                  )
                )
              }
              placeholder="Player Information"
              className="w-full rounded-xl border border-border bg-brand-background/60 px-4 py-3 text-sm outline-none transition focus:border-brand-primary"
            />
          </div>

          <div>
            <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              Description
            </label>

            <input
              value={section.description}
              onChange={(e) =>
                setSections((current) =>
                  current.map((item) =>
                    item.id === section.id
                      ? {
                          ...item,
                          description: e.target.value,
                        }
                      : item
                  )
                )
              }
              placeholder="Tell us about the player."
              className="w-full rounded-xl border border-border bg-brand-background/60 px-4 py-3 text-sm outline-none transition focus:border-brand-primary"
            />
          </div>

          <div className="space-y-4">

  {section.fields.length === 0 ? (
    <div className="rounded-xl border border-dashed border-border p-5 text-center">
      <p className="text-xs text-muted-foreground">
        No fields added yet.
      </p>
    </div>
  ) : (
    section.fields.map((field, fieldIndex) => (
      <div
        key={field.id}
        className="rounded-xl border border-border bg-card p-5"
      >

        <div className="flex items-center justify-between">

          <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-primary">
            Field {fieldIndex + 1}
          </div>

          <button
            type="button"
            onClick={() =>
              setSections((current) =>
                current.map((item) =>
                  item.id === section.id
                    ? {
                        ...item,
                        fields: item.fields.filter(
                          (f) => f.id !== field.id
                        ),
                      }
                    : item
                )
              )
            }
            className="text-xs text-muted-foreground transition hover:text-red-400"
          >
            Remove
          </button>

        </div>


        <div className="mt-5 grid gap-4 sm:grid-cols-2">

          {/* Label */}

          <div>
            <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              Field Label
            </label>

            <input
              value={field.label}
              onChange={(e) =>
                setSections((current) =>
                  current.map((item) =>
                    item.id === section.id
                      ? {
                          ...item,
                          fields: item.fields.map((f) =>
                            f.id === field.id
                              ? {
                                  ...f,
                                  label: e.target.value,
                                }
                              : f
                          ),
                        }
                      : item
                  )
                )
              }
              placeholder="Player Name"
              className="w-full rounded-xl border border-border bg-brand-background/60 px-4 py-3 text-sm outline-none transition focus:border-brand-primary"
            />
          </div>


          {/* Type */}

          <div>
            <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              Field Type
            </label>

            <select
              value={field.type}
              onChange={(e) =>
                setSections((current) =>
                  current.map((item) =>
                    item.id === section.id
                      ? {
                          ...item,
                          fields: item.fields.map((f) =>
                            f.id === field.id
                              ? {
                                  ...f,
                                  type: e.target.value,
                                }
                              : f
                          ),
                        }
                      : item
                  )
                )
              }
              className="w-full rounded-xl border border-border bg-brand-background/60 px-4 py-3 text-sm outline-none focus:border-brand-primary"
            >
              <option value="text">Text</option>
              <option value="email">Email</option>
              <option value="tel">Phone</option>
              <option value="number">Number</option>
              <option value="date">Date</option>
              <option value="textarea">Long Text</option>
              <option value="select">Dropdown</option>
            </select>
          </div>


          {/* Placeholder */}

          <div className="sm:col-span-2">
            <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              Placeholder / Helper Text
            </label>

            <input
              value={field.placeholder}
              onChange={(e) =>
                setSections((current) =>
                  current.map((item) =>
                    item.id === section.id
                      ? {
                          ...item,
                          fields: item.fields.map((f) =>
                            f.id === field.id
                              ? {
                                  ...f,
                                  placeholder: e.target.value,
                                }
                              : f
                          ),
                        }
                      : item
                  )
                )
              }
              placeholder="Enter the player's full name"
              className="w-full rounded-xl border border-border bg-brand-background/60 px-4 py-3 text-sm outline-none transition focus:border-brand-primary"
            />
          </div>
          {field.type === "select" && (
  <div className="sm:col-span-2">

    <div className="mb-3 flex items-center justify-between">

      <label className="block text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
        Dropdown Options
      </label>

      <button
        type="button"
        onClick={() => addOption(section.id, field.id)}
        className="text-xs font-semibold text-brand-primary hover:underline"
      >
        + Add Option
      </button>

    </div>

    <div className="space-y-2">

      {field.options.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border p-4 text-center">
          <p className="text-xs text-muted-foreground">
            No options added yet.
          </p>
        </div>
      ) : (
        field.options.map((option, optionIndex) => (
          <div
            key={optionIndex}
            className="flex gap-2"
          >

            <input
              value={option}
              onChange={(e) =>
                setSections((current) =>
                  current.map((item) =>
                    item.id === section.id
                      ? {
                          ...item,
                          fields: item.fields.map((f) =>
                            f.id === field.id
                              ? {
                                  ...f,
                                  options: f.options.map(
                                    (value, index) =>
                                      index === optionIndex
                                        ? e.target.value
                                        : value
                                  ),
                                }
                              : f
                          ),
                        }
                      : item
                  )
                )
              }
              placeholder={`Option ${optionIndex + 1}`}
              className="flex-1 rounded-xl border border-border bg-brand-background/60 px-4 py-3 text-sm outline-none transition focus:border-brand-primary"
            />

            <button
              type="button"
              onClick={() =>
                removeOption(
                  section.id,
                  field.id,
                  optionIndex
                )
              }
              className="rounded-xl border border-border px-4 text-xs text-muted-foreground transition hover:border-red-400 hover:text-red-400"
            >
              Remove
            </button>

          </div>
        ))
      )}

    </div>

  </div>
)}


          {/* Required */}

          <label className="flex items-center gap-3 text-sm text-muted-foreground">

            <input
              type="checkbox"
              checked={field.required}
              onChange={(e) =>
                setSections((current) =>
                  current.map((item) =>
                    item.id === section.id
                      ? {
                          ...item,
                          fields: item.fields.map((f) =>
                            f.id === field.id
                              ? {
                                  ...f,
                                  required: e.target.checked,
                                }
                              : f
                          ),
                        }
                      : item
                  )
                )
              }
              className="h-4 w-4 accent-brand-primary"
            />

            Required field

          </label>

        </div>

      </div>
    ))
  )}

  <button
    type="button"
    onClick={() => addField(section.id)}
    className="rounded-xl border border-brand-primary/40 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-brand-primary transition hover:bg-brand-primary/10"
  >
    + Add Field
  </button>

</div>

        </div>
      </div>
    ))}
  </div>
)}

      </div>


      {/* Save */}

     <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

  <button
    type="button"
    onClick={addSection}
    className="
      rounded-xl
      border
      border-brand-primary/40
      px-6 py-3
      text-sm
      font-semibold
      text-brand-primary
      transition
      hover:bg-brand-primary/10
    "
  >
    + Add Section
  </button>

  <button
    type="button"
    onClick={save}
    disabled={saving || !name.trim()}
    className="
      rounded-xl
      bg-gradient-gold
      px-6 py-3
      text-sm
      font-semibold
      text-primary-foreground
      shadow-gold
      transition
      hover:-translate-y-0.5
      disabled:cursor-not-allowed
      disabled:opacity-50
    "
  >
    {saving
  ? "Saving..."
  : form
  ? "Save Changes"
  : "Save Form"}
  </button>

</div>

    </div>
  );
}