import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/forms/")({
  component: FormsPage,
});

function FormsPage() {
  return (
    <main className="min-h-screen bg-background p-8">
      <h1 className="font-display text-4xl">Forms</h1>

      <p className="mt-3 text-muted-foreground">
        Trial registrations and contact forms will appear here.
      </p>
    </main>
  );
}