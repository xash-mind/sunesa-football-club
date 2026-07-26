import { createFileRoute } from "@tanstack/react-router";
import NewsEditor from "@/components/admin/NewsEditor";

export const Route = createFileRoute("/admin/news/edit/$id")({
  component: EditNewsPage,
});

function EditNewsPage() {
  const { id } = Route.useParams();

  return (
    <main className="min-h-screen p-8">
      <NewsEditor articleId={id} />
    </main>
  );
}