import { useEffect, useMemo, useState } from "react";

import {
  getGallery,
  createGalleryImage,
  deleteGalleryImage,
  type GalleryImage,
} from "@/services/gallery";

import { uploadImage } from "@/services/storage";

const categories = [
  "Team",
  "Training",
  "Matches",
  "Events",
] as const;

type Category = (typeof categories)[number];

export default function GalleryManager() {
  const [images, setImages] =
    useState<GalleryImage[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [showUpload, setShowUpload] =
    useState(false);

  const [deleteMode, setDeleteMode] =
    useState(false);

  const [selectedImages, setSelectedImages] =
    useState<string[]>([]);

  const [title, setTitle] =
    useState("");

  const [category, setCategory] =
    useState<Category>("Team");

  const [preview, setPreview] =
    useState("");

  const [file, setFile] =
    useState<File | null>(null);

  const [uploading, setUploading] =
    useState(false);

  const [deleting, setDeleting] =
    useState(false);

  useEffect(() => {
    loadGallery();
  }, []);

  async function loadGallery() {
    try {
      const data = await getGallery();
      setImages(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function resetUploadForm() {
    setTitle("");
    setCategory("Team");
    setPreview("");
    setFile(null);
  }

  function closeUpload() {
    resetUploadForm();
    setShowUpload(false);
  }

  async function handleUpload() {
    if (!file) {
      alert("Please choose an image.");
      return;
    }

    try {
      setUploading(true);

      const imageUrl =
        await uploadImage(file, "gallery");

      await createGalleryImage({
        title,
        image_url: imageUrl,
        category,
      });

      await loadGallery();

      closeUpload();

    } catch (err) {
      console.error(err);
      alert("Failed to upload image.");
    } finally {
      setUploading(false);
    }
  }

  function toggleSelection(id: string) {
    if (!deleteMode) return;

    setSelectedImages((current) =>
      current.includes(id)
        ? current.filter((x) => x !== id)
        : [...current, id]
    );
  }

  async function handleDelete() {
    if (selectedImages.length === 0) return;

    if (
      !window.confirm(
        `Delete ${selectedImages.length} photo(s)?`
      )
    )
      return;

    try {
      setDeleting(true);

      for (const id of selectedImages) {
        await deleteGalleryImage(id);
      }

      await loadGallery();

      setSelectedImages([]);
      setDeleteMode(false);

    } catch (err) {
      console.error(err);
    } finally {
      setDeleting(false);
    }
  }

  const groupedImages = useMemo(() => {
    return categories.map((category) => ({
      category,
      images: images.filter(
        (img) => img.category === category
      ),
    }));
  }, [images]);

  if (loading) {
    return (
      <div className="p-10 text-center">
        Loading Gallery...
      </div>
    );
  }

  return (
    <>
      <div className="mx-auto max-w-7xl space-y-12">

        <div className="flex flex-wrap items-center justify-between gap-4">

          <div>

            <h1 className="font-display text-4xl text-gradient-gold">
              Gallery
            </h1>

            <p className="mt-2 text-muted-foreground">
              Upload and organise club media.
            </p>

          </div>

          <div className="flex flex-wrap items-center gap-3">

            {!deleteMode ? (
              <>
                <button
                  onClick={() =>
                    setShowUpload(true)
                  }
                  className="rounded-xl bg-brand-primary px-6 py-3 font-semibold text-black transition hover:opacity-90"
                >
                  + Add Photo
                </button>

                <button
                  onClick={() =>
                    setDeleteMode(true)
                  }
                  className="rounded-xl border border-red-500 px-6 py-3 font-semibold text-red-400 transition hover:bg-red-500/10"
                >
                  Delete Photos
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    setDeleteMode(false);
                    setSelectedImages([]);
                  }}
                  className="rounded-xl border border-border px-6 py-3 transition hover:border-brand-primary"
                >
                  Cancel
                </button>

                <p className="min-w-[170px] text-center text-sm text-muted-foreground">
                  {selectedImages.length === 0
                    ? "Select photos to delete"
                    : `${selectedImages.length} photo${
                        selectedImages.length > 1
                          ? "s"
                          : ""
                      } selected`}
                </p>

                <button
                  onClick={handleDelete}
                  disabled={
                    deleting ||
                    selectedImages.length === 0
                  }
                  className={`rounded-xl px-6 py-3 font-semibold transition ${
                    selectedImages.length === 0
                      ? "cursor-not-allowed bg-zinc-700 text-zinc-400"
                      : "bg-red-600 text-white hover:bg-red-700"
                  } ${
                    deleting
                      ? "opacity-60"
                      : ""
                  }`}
                >
                  {deleting
                    ? "Deleting..."
                    : `Delete Selected${
                        selectedImages.length
                          ? ` (${selectedImages.length})`
                          : ""
                      }`}
                </button>

              </>
            )}

          </div>

        </div>

        {groupedImages.map(
          ({ category, images }) => (
            <section key={category}>

              <h2 className="mb-5 border-b border-border pb-3 font-display text-2xl">
                {category}
              </h2>

              {images.length === 0 ? (
                <p className="text-muted-foreground">
                  No images yet.
                </p>
              ) : (
                <div className="grid grid-cols-2 gap-5 md:grid-cols-4 lg:grid-cols-5">

                  {images.map((image) => {

                    const selected =
                      selectedImages.includes(
                        image.id
                      );

                    return (
                      <div
                        key={image.id}
                        onClick={() =>
                          toggleSelection(image.id)
                        }
                        className={`group relative overflow-hidden rounded-2xl border bg-card transition-all duration-200 ${
                          deleteMode
                            ? "cursor-pointer"
                            : ""
                        } ${
                          selected
                            ? "scale-[0.96] border-red-500 ring-2 ring-red-500"
                            : "border-border hover:border-brand-primary"
                        }`}
                      >

                        <img
                          src={image.image_url}
                          alt={
                            image.title ??
                            image.category
                          }
                          className="aspect-square w-full object-cover transition duration-300 group-hover:scale-105"
                        />

                        {image.title && (
                          <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2 text-xs">
                            {image.title}
                          </div>
                        )}

                        {deleteMode && (
                          <div className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-black/70 text-white">
                            {selected ? "✓" : ""}
                          </div>
                        )}

                      </div>
                    );

                  })}

                </div>
              )}

            </section>
          )
        )}

      </div>

      {showUpload && (
        <div
          className="fixed inset-0 z-[9999] overflow-y-auto bg-black/75 backdrop-blur-sm"
          onClick={closeUpload}
        >

          <div className="flex min-h-full items-center justify-center p-6">

            <div
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-xl rounded-3xl border border-border bg-card shadow-2xl max-h-[90vh] overflow-y-auto"
            >

              <div className="p-8">

                <h2 className="font-display text-3xl text-gradient-gold">
                  Upload Photo
                </h2>

                <p className="mt-2 text-sm text-muted-foreground">
                  Add a new image to the club gallery.
                </p>

                <div className="mt-8 space-y-6">

                                      <div>
                    <label className="mb-2 block text-sm font-semibold uppercase tracking-wide text-brand-primary">
                      Photo Title (optional)
                    </label>

                    <input
                      value={title}
                      onChange={(e) =>
                        setTitle(e.target.value)
                      }
                      placeholder="Summer Training Session"
                      className="w-full rounded-xl border border-border bg-secondary px-4 py-3 outline-none transition focus:border-brand-primary"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold uppercase tracking-wide text-brand-primary">
                      Choose Photo
                    </label>

                    <label className="inline-flex cursor-pointer items-center rounded-xl border border-brand-primary bg-secondary px-5 py-3 transition hover:shadow-gold">
                      📷 Select Image

                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const selected =
                            e.target.files?.[0];

                          if (!selected) return;

                          setFile(selected);

                          setPreview(
                            URL.createObjectURL(selected)
                          );
                        }}
                      />
                    </label>

                    {file && (
                      <p className="mt-3 text-sm text-muted-foreground">
                        ✓ {file.name}
                      </p>
                    )}
                  </div>

                  {preview && (
                    <div>
                      <label className="mb-3 block text-sm font-semibold uppercase tracking-wide text-brand-primary">
                        Preview
                      </label>

                      <img
                        src={preview}
                        alt="Preview"
                        className="mx-auto max-h-56 w-auto max-w-full rounded-2xl border border-border object-contain"
                      />
                    </div>
                  )}

                  <div>
                    <label className="mb-3 block text-sm font-semibold uppercase tracking-wide text-brand-primary">
                      Category
                    </label>

                    <div className="flex flex-wrap gap-3">
                      {categories.map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() =>
                            setCategory(item)
                          }
                          className={`rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200 ${
                            category === item
                              ? "bg-brand-primary text-black shadow-gold"
                              : "border border-border bg-secondary hover:border-brand-primary"
                          }`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>

                </div>

                <div className="sticky bottom-0 mt-8 flex justify-end gap-3 border-t border-border bg-card pt-6">

                  <button
                    type="button"
                    onClick={closeUpload}
                    className="rounded-xl border border-border px-6 py-3 transition hover:border-brand-primary"
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    disabled={!file || uploading}
                    onClick={handleUpload}
                    className="rounded-xl bg-brand-primary px-7 py-3 font-semibold text-black transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {uploading
                      ? "Uploading..."
                      : "Upload Photo"}
                  </button>

                </div>

              </div>

            </div>

          </div>

        </div>
      )}

    </>
  );
}