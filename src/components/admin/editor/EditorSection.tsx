import type { ReactNode } from "react";
interface EditorSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export default function EditorSection({
  title,
  description,
  children,
}: EditorSectionProps) {
  return (
    <section className="rounded-2xl border border-border bg-brand-surface p-6">

      <div className="mb-6">

        <h3 className="font-display text-2xl">
          {title}
        </h3>

        {description && (
          <p className="mt-1 text-sm text-muted-foreground">
            {description}
          </p>
        )}

      </div>

      <div className="space-y-5">
        {children}
      </div>

    </section>
  );
}