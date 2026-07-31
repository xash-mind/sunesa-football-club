import { useEffect, useState } from "react";
import FormEditor from "@/components/admin/FormEditor";
import SubmissionsManager from "@/components/admin/SubmissionsManager";
import { deleteForm } from "@/services/forms";

import {
  getForms,
  getForm,
  updateForm,
  type Form,
} from "@/services/forms";

export default function FormsManager() {
  const [forms, setForms] = useState<Form[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [editingForm, setEditingForm] = useState<Form | null>(null);
  const [viewingSubmissions, setViewingSubmissions] =
  useState<string | null>(null);

  async function handleDeleteForm(id: string) {
  const confirmed = window.confirm(
    "Delete this form and all of its submissions permanently?"
  );

  if (!confirmed) return;

  try {
    await deleteForm(id);

    setForms((current) =>
      current.filter((form) => form.id !== id)
    );
  } catch (error) {
    console.error("Failed to delete form:", error);
  }
}

  async function loadForms() {
    setLoading(true);

    try {
      const data = await getForms();
      setForms(data);
    } catch (error) {
      console.error("Failed to load forms:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadForms();
  }, []);

  if (viewingSubmissions) {
  return (
    <SubmissionsManager
      formId={viewingSubmissions}
      onBack={() => setViewingSubmissions(null)}
    />
  );
}

 if (creating) {
  return (
    <FormEditor
      onBack={() => {
        setCreating(false);
        loadForms();
      }}
    />
  );
}

if (editingForm) {
  return (
    <FormEditor
      form={editingForm}
      onBack={() => {
        setEditingForm(null);
        loadForms();
      }}
    />
  );
}

  if (loading) {
    return (
      <div className="py-12 text-center text-sm text-muted-foreground">
        Loading forms...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl">

      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

        <div>
          <h1 className="font-display text-4xl">
            Forms
          </h1>

          <p className="mt-3 text-muted-foreground">
            Create and manage forms used across your website.
          </p>
        </div>

        <button
          onClick={() => setCreating(true)}
          className="
            rounded-xl
            bg-gradient-gold
            px-5 py-3
            text-sm
            font-semibold
            uppercase
            tracking-[0.14em]
            text-primary-foreground
            shadow-gold
            transition
            hover:-translate-y-0.5
          "
        >
          + Create Form
        </button>

      </div>

      {forms.length === 0 ? (

        <div className="mt-12 rounded-3xl border border-dashed border-border bg-card p-12 text-center">

          <h2 className="font-display text-2xl">
            No forms yet
          </h2>

          <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
            Create your first form and build it using modular sections
            and fields.
          </p>

        </div>

      ) : (

        <div className="mt-10 grid gap-5">

          {forms.map((form) => (

            <div
              key={form.id}
              className="
                rounded-2xl
                border
                border-border
                bg-card
                p-6
                transition
                hover:border-brand-primary/40
                hover:shadow-gold
              "
            >

              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

                <div>

                  <div className="flex items-center gap-3">

                    <h2 className="font-display text-2xl">
                      {form.name || "Untitled Form"}
                    </h2>

                    <span
                      className={`
                        rounded-full
                        px-2.5 py-1
                        text-[10px]
                        font-semibold
                        uppercase
                        tracking-[0.16em]
                        ${
                          form.active
                            ? "bg-green-500/10 text-green-400"
                            : "bg-secondary text-muted-foreground"
                        }
                      `}
                    >
                      {form.active ? "Active" : "Inactive"}
                    </span>

                  </div>

                  <p className="mt-2 text-sm text-muted-foreground">
                    {form.description || "No description"}
                  </p>

                  <p className="mt-1 text-xs uppercase tracking-[0.14em] text-brand-primary">
                    {form.placement || "standalone"}
                    </p>

                 <p className="mt-1 text-xs text-muted-foreground/70">
                    /{form.slug || "no-slug"}
                  </p>

                </div>

                <div className="flex flex-wrap gap-3">

                    <button
  onClick={async () => {
    try {
      await updateForm(form.id, {
        active: !form.active,
      });

      await loadForms();
    } catch (error) {
      console.error("Failed to update form status:", error);
    }
  }}
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
  {form.active ? "Deactivate" : "Activate"}
</button>

<button
  onClick={async () => {
    try {
      const fullForm = await getForm(form.id);
      setEditingForm(fullForm);
    } catch (error) {
      console.error("Failed to load form:", error);
    }
  }}
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
  Edit
</button>

                  <button
  onClick={() => setViewingSubmissions(form.id)}
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
  Submissions
</button>
<button
  type="button"
  onClick={() => handleDeleteForm(form.id)}
  className="
    rounded-xl
    border
    border-red-500/30
    px-4 py-2.5
    text-sm
    font-medium
    text-red-400
    transition
    hover:border-red-500
    hover:bg-red-500/10
  "
>
  Delete
</button>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}