import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/pages/")({
  component: PagesPage,
});

function PagesPage() {
  return (
    <main className="min-h-screen bg-background p-8">
      <h1 className="font-display text-4xl">Pages</h1>

      <p className="mt-3 text-muted-foreground">
        Page editor coming next.
      </p>
    </main>
  );
}