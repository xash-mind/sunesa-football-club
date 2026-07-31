import { createFileRoute } from "@tanstack/react-router";

import FormsManager from "@/components/admin/FormsManager";

export const Route = createFileRoute("/admin/forms/")({
  component: FormsPage,
});

function FormsPage() {
  return (
    <main className="min-h-screen bg-background p-8">
      <FormsManager />
    </main>
  );
}