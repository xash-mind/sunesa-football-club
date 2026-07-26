import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/gallery/")({
  component: GalleryPage,
});

function GalleryPage() {
  return (
    <main className="min-h-screen bg-background p-8">
      <h1 className="font-display text-4xl">Gallery</h1>

      <p className="mt-3 text-muted-foreground">
        Gallery management coming next.
      </p>
    </main>
  );
}