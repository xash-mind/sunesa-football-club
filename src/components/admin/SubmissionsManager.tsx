import { useEffect, useState } from "react";

import {
  getForm,
  getSubmissions,
  deleteSubmission,
  type Form,
  type FormSubmission,
} from "@/services/forms";



interface SubmissionsManagerProps {
  formId: string;
  onBack: () => void;
}

export default function SubmissionsManager({
  formId,
  onBack,
}: SubmissionsManagerProps) {
  const [form, setForm] = useState<Form | null>(null);
  const [submissions, setSubmissions] = useState<FormSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedSubmission, setExpandedSubmission] =
  useState<string | null>(null);

  async function load() {
    setLoading(true);

    try {
      const [formData, submissionData] = await Promise.all([
        getForm(formId),
        getSubmissions(formId),
      ]);

      setForm(formData);
      setSubmissions(submissionData);
    } catch (error) {
      console.error("Failed to load submissions:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, [formId]);

  if (loading) {
    return (
      <div className="py-12 text-center text-sm text-muted-foreground">
        Loading submissions...
      </div>
    );
  }
  async function handleDeleteSubmission(id: string) {
  const confirmed = window.confirm(
    "Delete this submission permanently?"
  );

  if (!confirmed) return;

  try {
    await deleteSubmission(id);

    setSubmissions((current) =>
      current.filter((submission) => submission.id !== id)
    );
  } catch (error) {
    console.error("Failed to delete submission:", error);
  }
}




return (
  <div className="mx-auto max-w-6xl">

    <button
      onClick={onBack}
      className="mb-8 text-sm text-muted-foreground transition hover:text-brand-primary"
    >
      ← Back to Forms
    </button>

    <div>
      <h1 className="font-display text-4xl">
        {form?.name || "Form"} Submissions
      </h1>

      <p className="mt-2 text-sm text-muted-foreground">
        {submissions.length} submission
        {submissions.length === 1 ? "" : "s"}
      </p>
    </div>

    {submissions.length === 0 ? (

      <div className="mt-10 rounded-3xl border border-dashed border-border bg-card p-12 text-center">

        <h2 className="font-display text-2xl">
          No submissions yet
        </h2>

        <p className="mt-3 text-sm text-muted-foreground">
          Submitted responses will appear here.
        </p>

      </div>

    ) : (

      <div className="mt-10 space-y-4">

        {submissions.map((submission, index) => {

          const nameField = form?.sections
            ?.flatMap((section) => section.fields)
            .find(
              (field) =>
                field.label.trim().toLowerCase() === "name"
            );

          const applicantName = nameField
            ? submission.data[nameField.id]
            : null;

          return (
            <div
              key={submission.id}
              className="
                overflow-hidden
                rounded-2xl
                border
                border-border
                bg-card
              "
            >

              <button
                type="button"
                onClick={() =>
                  setExpandedSubmission(
                    expandedSubmission === submission.id
                      ? null
                      : submission.id
                  )
                }
                className="
                  flex
                  w-full
                  items-center
                  justify-between
                  gap-4
                  p-5
                  text-left
                  transition-colors
                  hover:bg-secondary/40
                "
              >

                <div className="flex items-center gap-4">

                  <span
                    className="
                      flex
                      h-9
                      w-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-brand-primary/10
                      text-xs
                      font-semibold
                      text-brand-primary
                    "
                  >
                    #{submissions.length - index}
                  </span>

                  <div>

                    <div className="text-sm font-medium">
                      {String(
                        applicantName || "Unnamed Applicant"
                      )}
                    </div>

                    <div className="mt-1 text-xs text-muted-foreground">
                      {new Date(
                        submission.submitted_at
                      ).toLocaleString()}
                    </div>

                  </div>

                </div>

                <span className="text-lg text-muted-foreground">
                  {expandedSubmission === submission.id
                    ? "⌃"
                    : "⌄"}
                </span>

              </button>

              {expandedSubmission === submission.id && (

                <div className="border-t border-border p-6">

                  <div className="grid gap-4 sm:grid-cols-2">

                    {Object.entries(submission.data).map(
                      ([key, value]) => {

                        const field = form?.sections
                          ?.flatMap(
                            (section) => section.fields
                          )
                          .find(
                            (field) => field.id === key
                          );
                          <button
  type="button"
  onClick={() => handleDeleteSubmission(submission.id)}
  className="
    mt-6
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
  Delete Submission
</button>

                        return (
                          <div key={key}>

                            <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                              {field?.label || key}
                            </div>

                            <div className="mt-1 text-sm text-foreground">
                              {String(value || "—")}
                            </div>

                          </div>
                        );
                      }
                    )}

                  </div>

                </div>

              )}

            </div>
          );
        })}

      </div>

    )}

  </div>
);

}
