import { supabase } from "@/lib/supabase";

const BUCKET = "media";

export async function uploadImage(
  file: File,
  folder: string
) {
  const extension = file.name.split(".").pop();

  const filename =
    `${Date.now()}-${Math.random()
      .toString(36)
      .substring(2)}.${extension}`;

  const path = `${folder}/${filename}`;

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, file);

  if (error) throw error;

  const { data } = supabase.storage
    .from(BUCKET)
    .getPublicUrl(path);

  return data.publicUrl;
}

export function getStoragePath(url: string) {
  const marker = `/storage/v1/object/public/${BUCKET}/`;

  const index = url.indexOf(marker);

  if (index === -1) return null;

  return url.substring(index + marker.length);
}

export async function deleteImage(url: string) {
  const path = getStoragePath(url);

  if (!path) return;

  const { error } = await supabase.storage
    .from(BUCKET)
    .remove([path]);

  if (error) throw error;
}