import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import {
  deleteNews,
  getNews,
  type NewsArticle,
} from "@/services/news";

export const Route = createFileRoute("/admin/news/")({
  component: NewsManagementPage,
});

function NewsManagementPage() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadNews() {
    try {
      const data = await getNews();
      setArticles(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadNews();
  }, []);

  async function handleDelete(id: string) {
    const confirmed = window.confirm(
      "Delete this article?"
    );

    if (!confirmed) return;

    try {
      await deleteNews(id);
      await loadNews();
    } catch (err) {
      console.error(err);
      alert("Failed to delete article.");
    }
  }

  return (
    <main className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-7xl">

        <div className="mb-10 flex items-center justify-between">

          <div>
            <h1 className="font-display text-4xl">
              News
            </h1>

            <p className="mt-2 text-muted-foreground">
              Manage club news articles.
            </p>
          </div>

          <Link
            to="/admin/news/new"
            className="rounded-xl bg-brand-primary px-5 py-3 font-semibold text-black"
          >
            + Create Article
          </Link>

        </div>

        {loading ? (

          <p>Loading...</p>

        ) : articles.length === 0 ? (

          <div className="rounded-2xl border border-border p-10 text-center text-muted-foreground">
            No articles yet.
          </div>

        ) : (

          <div className="space-y-4">

            {articles.map((article) => (

              <div
                key={article.id}
                className="flex items-center justify-between rounded-xl border border-border p-6"
              >

                <div>

                  <h2 className="font-display text-4xl text-gradient-gold">
                    {article.title}
                  </h2>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {article.excerpt}
                  </p>

                  <p className="mt-2 text-xs text-muted-foreground">
                    {article.published ? "Published" : "Draft"}
                  </p>

                </div>

                <div className="flex gap-3">

                  <Link
  to="/admin/news/edit/$id"
  params={{ id: article.id }}
  className="rounded-lg border border-border px-4 py-2"
>
  Edit
</Link>

                  <button
                    onClick={() => handleDelete(article.id)}
                    className="rounded-lg border border-red-500 px-4 py-2 text-red-500"
                  >
                    Delete
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>
    </main>
  );
}