import { supabase } from "@/lib/supabase";
import { deleteImage } from "@/services/storage";

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

/**
 * Remove the gallery row first and then clean up its Storage object.
 * This avoids leaving a live row that points at a missing image if the database
 * delete fails after Storage has already removed the file.
 */
export async function deleteGalleryImage(id: string) {
  const { data: image, error: fetchError } = await supabase
    .from("gallery")
    .select("image_url")
    .eq("id", id)
    .single();

  if (fetchError) throw fetchError;

  const { error } = await supabase
    .from("gallery")
    .delete()
    .eq("id", id);

  if (error) throw error;

  try {
    await deleteImage(image.image_url);
  } catch (cleanupError) {
    console.error(
      "Gallery row deleted, but its image could not be removed:",
      cleanupError
    );
  }
}
