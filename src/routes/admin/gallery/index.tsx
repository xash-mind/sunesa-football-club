import { createFileRoute } from "@tanstack/react-router";

import GalleryManager from "@/components/admin/GalleryManager";

export const Route = createFileRoute("/admin/gallery/")({
  component: GalleryPage,
});

function GalleryPage() {
  return (
    <main className="min-h-screen bg-background p-8">
      <GalleryManager />
    </main>
  );
}