import { supabase } from "@/lib/supabase";

export type PageSection =
  | "hero"
  | "about"
  | "gallery"
  | "news"
  | "trials"
  | "contact"
  | "footer";

export interface Page {
  id: string;
  section: PageSection;
  content: Record<string, any>;
  updated_at: string;
}

export async function getPages() {
  const { data, error } = await supabase
    .from("pages")
    .select("*")
    .order("section");

  if (error) throw error;

  return data as Page[];
}

export async function getPage(section: PageSection) {
  const { data, error } = await supabase
    .from("pages")
    .select("*")
    .eq("section", section)
    .single();

  if (error) throw error;

  return data as Page;
}

export async function updatePage(
  section: PageSection,
  content: Record<string, any>
) {
  const { data, error } = await supabase
    .from("pages")
    .update({
      content,
      updated_at: new Date().toISOString(),
    })
    .eq("section", section)
    .select()
    .single();

  if (error) throw error;

  return data as Page;
}