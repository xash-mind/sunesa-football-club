import { useState } from "react";
import type { Form } from "@/services/forms";
import { supabase } from "@/lib/supabase";

interface FormRendererProps {
  form: Form;
  onBack: () => void;
}

export default function FormRenderer({
  form,
  onBack,
}: FormRendererProps) {
  const [values, setValues] = useState<Record<string, string>>({});

  function updateValue(fieldId: string, value: string) {
    setValues((current) => ({
      ...current,
      [fieldId]: value,
    }));
  }

  const [submitting, setSubmitting] = useState(false);
const [submitted, setSubmitted] = useState(false);


async function handleSubmit(
  e: React.FormEvent<HTMLFormElement>
) {
  e.preventDefault();

  setSubmitting(true);

  try {
    const { supabase } = await import("@/lib/supabase");

    const { error } = await supabase
  .from("form_submissions")
  .insert({
    form_id: form.id,
    data: values,
  });
     
    if (error) {
      throw error;
    }

    setSubmitted(true);
  } catch (error) {
    console.error("Failed to submit form:", error);
  } finally {
    setSubmitting(false);
  }
}
if (submitted) {
  return (
    <div className="glass-card rounded-3xl p-10 text-center">

      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10 text-3xl">
        ✓
      </div>

      <h2 className="mt-6 font-display text-3xl">
        Application Submitted
      </h2>

      <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
        Your application has been successfully submitted.
        The Sunesa team will review your details and get back to you.
      </p>

      <button
        type="button"
        onClick={onBack}
        className="
          mt-8
          inline-flex
          items-center
          justify-center
          gap-2
          rounded-xl
          bg-gradient-gold
          px-6 py-3.5
          text-sm
          font-semibold
          uppercase
          tracking-[0.18em]
          text-primary-foreground
          shadow-gold
          transition-all
          hover:-translate-y-0.5
        "
      >
        Back to Applications
      </button>

    </div>
  );
}
  return (
    <div className="glass-card rounded-3xl p-8">

      <button
        type="button"
        onClick={onBack}
        className="mb-6 text-sm text-muted-foreground transition hover:text-brand-primary"
      >
        ← Back to trials
      </button>

      <div className="mb-8">
        <h2 className="font-display text-3xl">
          {form.name}
        </h2>

        {form.description && (
          <p className="mt-2 text-sm text-muted-foreground">
            {form.description}
          </p>
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-10"
      >

        {form.sections.map((section) => (

          <section
            key={section.id}
            className="space-y-5"
          >

            <div>
              <h3 className="font-display text-xl">
                {section.name}
              </h3>

              {section.description && (
                <p className="mt-1 text-sm text-muted-foreground">
                  {section.description}
                </p>
              )}
            </div>

            <div className="grid gap-5 sm:grid-cols-2">

              {section.fields.map((field) => (

                <div
                  key={field.id}
                  className="sm:col-span-2"
                >

                  <label className="mb-2 block text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
                    {field.label}

                    {field.required && (
                      <span className="ml-1 text-brand-primary">
                        *
                      </span>
                    )}
                  </label>

                  {field.type === "textarea" ? (

                    <textarea
                      required={field.required}
                      placeholder={field.placeholder}
                      value={values[field.id] ?? ""}
                      onChange={(e) =>
                        updateValue(field.id, e.target.value)
                      }
                      rows={4}
                      className="
                        w-full
                        rounded-xl
                        border
                        border-border
                        bg-brand-background/60
                        px-4 py-3
                        text-sm
                        outline-none
                        transition-colors
                        focus:border-brand-primary
                      "
                    />

                  ) : field.type === "select" ? (

                    <select
                      required={field.required}
                      value={values[field.id] ?? ""}
                      onChange={(e) =>
                        updateValue(field.id, e.target.value)
                      }
                      className="
                        w-full
                        rounded-xl
                        border
                        border-border
                        bg-brand-background/60
                        px-4 py-3
                        text-sm
                        outline-none
                        transition-colors
                        focus:border-brand-primary
                      "
                    >
                      <option value="">
                        Select an option
                      </option>

                      {field.options.map((option) => (
                        <option
                          key={option}
                          value={option}
                        >
                          {option}
                        </option>
                      ))}
                    </select>

                  ) : (

                    <input
                      type={field.type}
                      required={field.required}
                      placeholder={field.placeholder}
                      value={values[field.id] ?? ""}
                      onChange={(e) =>
                        updateValue(field.id, e.target.value)
                      }
                      className="
                        w-full
                        rounded-xl
                        border
                        border-border
                        bg-brand-background/60
                        px-4 py-3
                        text-sm
                        outline-none
                        transition-colors
                        focus:border-brand-primary
                      "
                    />

                  )}

                </div>

              ))}

            </div>

          </section>

        ))}

       <button
  type="submit"
  disabled={submitting}
  className="
    inline-flex
    w-full
    items-center
    justify-center
    gap-2
    rounded-xl
    bg-gradient-gold
    px-6 py-3.5
    text-sm
    font-semibold
    uppercase
    tracking-[0.18em]
    text-primary-foreground
    shadow-gold
    transition-all
    hover:-translate-y-0.5
    disabled:cursor-not-allowed
    disabled:opacity-60
  "
>
  {submitting ? "Submitting..." : "Submit Application"}

  {!submitting && <span>→</span>}
</button>

      </form>

    </div>
  );
}