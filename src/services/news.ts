import { supabase } from "@/lib/supabase";

export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  thumbnail: string | null;
  published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

/**
 * ADMIN
 * Get every article
 */
export async function getNews() {
  const { data, error } = await supabase
    .from("news")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data as NewsArticle[];
}

/**
 * PUBLIC
 * Get only published articles
 */
export async function getPublishedNews() {
  const { data, error } = await supabase
    .from("news")
    .select("*")
    .eq("published", true)
    .order("published_at", { ascending: false });

  if (error) throw error;

  return data as NewsArticle[];
}

/**
 * PUBLIC
 * Get article by slug
 */
export async function getNewsBySlug(slug: string) {
  const { data, error } = await supabase
    .from("news")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) throw error;

  return data as NewsArticle;
}
/**
 * ADMIN
 * Get article by id
 */
export async function getNewsById(id: string) {
  const { data, error } = await supabase
    .from("news")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;

  return data as NewsArticle;
}

/**
 * ADMIN
 * Create article
 */
export async function createNews(
  article: Omit<
    NewsArticle,
    "id" | "created_at" | "updated_at"
  >
) {
  const { data, error } = await supabase
    .from("news")
    .insert(article)
    .select()
    .single();

  if (error) throw error;

  return data;
}

/**
 * ADMIN
 * Update article
 */
export async function updateNews(
  id: string,
  article: Partial<NewsArticle>
) {
  const { data, error } = await supabase
    .from("news")
    .update(article)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data;
}

/**
 * ADMIN
 * Delete article
 */
export async function deleteNews(id: string) {
  const { error } = await supabase
    .from("news")
    .delete()
    .eq("id", id);

  if (error) throw error;
}