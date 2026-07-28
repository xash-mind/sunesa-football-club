// src/routes/news/$slug.tsx
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getPublishedNews } from "@/services/news";

export const Route = createFileRoute("/news/$slug")({
  component: NewsArticlePage,
});

function NewsArticlePage() {
  const { slug } = Route.useParams();
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadArticle() {
      try {
        const all = await getPublishedNews();
        const found = all.find((n) => n.slug === slug);
        setArticle(found || null);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadArticle();
  }, [slug]);

  if (loading) return <div className="p-8 text-center">Loading…</div>;
  if (!article) return <div className="p-8 text-center">Article not found.</div>;

  return (
    <div className="mx-auto max-w-4xl px-6 py-32">
      {article.thumbnail && (
        <img src={article.thumbnail} alt={article.title} className="w-full h-64 object-cover rounded-xl mb-6" />
      )}
      <h1 className="font-display text-5xl">{article.title}</h1>
      <div className="mt-6 prose prose-lg" dangerouslySetInnerHTML={{ __html: article.content }} />
    </div>
  );
}