import { createFileRoute } from "@tanstack/react-router";

import PagesEditor from "@/components/admin/PagesEditor";

export const Route = createFileRoute("/admin/pages/")({
  component: PagesPage,
});

function PagesPage() {
  return (
    <main className="min-h-screen bg-background p-8">
      <h1 className="font-display text-4xl">
        Pages
      </h1>

      <p className="mt-3 mb-8 text-muted-foreground">
        Edit website content.
      </p>

      <PagesEditor />
    </main>
  );
}