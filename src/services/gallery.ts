import { supabase } from "@/lib/supabase";

export interface GalleryImage {
  id: string;
  title: string | null;
  image_url: string;
  category: "Team" | "Training" | "Matches" | "Events";
  uploaded_at: string;
}

export async function getGallery() {
  const { data, error } = await supabase
    .from("gallery")
    .select("*")
    .order("uploaded_at", { ascending: false });

  if (error) throw error;

  return data as GalleryImage[];
}

export async function getGalleryByCategory(
  category: GalleryImage["category"]
) {
  const { data, error } = await supabase
    .from("gallery")
    .select("*")
    .eq("category", category)
    .order("uploaded_at", { ascending: false });

  if (error) throw error;

  return data as GalleryImage[];
}

export async function getAllGalleryImages() {
  return getGallery();
}

export async function createGalleryImage(image: {
  title?: string;
  image_url: string;
  category: GalleryImage["category"];
}) {
  const { data, error } = await supabase
    .from("gallery")
    .insert(image)
    .select()
    .single();

  if (error) throw error;

  return data as GalleryImage;
}

export async function deleteGalleryImage(id: string) {
  const { error } = await supabase
    .from("gallery")
    .delete()
    .eq("id", id);

  if (error) throw error;
}