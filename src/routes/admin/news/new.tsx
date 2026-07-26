import { createFileRoute } from "@tanstack/react-router";
import NewsEditor from "@/components/admin/NewsEditor";

export const Route = createFileRoute("/admin/news/new")({
  component: NewNewsPage,
});

function NewNewsPage() {
  return (
    <main className="min-h-screen p-8">
      <NewsEditor />
    </main>
  );
}