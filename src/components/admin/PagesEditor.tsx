import { useEffect, useState } from "react";

import HeroEditor from "./editors/HeroEditor";
import GalleryEditor from "./editors/GalleryEditor";
import AboutEditor from "./editors/AboutEditor";

import {
  getPages,
  updatePage,
  type Page,
} from "@/services/pages";

export default function PagesEditor() {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getPages();
        setPages(data);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  async function savePage(
    section: Page["section"],
    content: Record<string, any>
  ) {
    const updated = await updatePage(section, content);

    setPages((prev) =>
      prev.map((page) =>
        page.section === updated.section ? updated : page
      )
    );
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="space-y-8">

      {pages.map((page) => {

        if (page.section === "hero") {
          return (
            <HeroEditor
              key={page.section}
              page={page}
              onSave={async (content: Record<string, any>) => {
  await savePage(page.section, content);
}}

            />
            
          );
        }
if (page.section === "gallery") {
  return (
    <GalleryEditor
      key={page.section}
      page={page}
      onSave={(content) =>
        savePage(page.section, content)
      }
    />
  );
}
if (page.section === "about") {
  return (
    <AboutEditor
      key={page.section}
      page={page}
      onSave={(content) =>
        savePage(page.section, content)
      }
    />
  );
}
        return (
          <div
            key={page.section}
            className="rounded-2xl border border-border bg-brand-background p-6"
          >
            <div className="mb-4 flex items-center justify-between">

              <h2 className="text-xl font-semibold capitalize">
                {page.section}
              </h2>

              <button
                onClick={() =>
                  savePage(page.section, page.content)
                }
                className="rounded-lg bg-brand-primary px-4 py-2 text-sm text-white"
              >
                Save
              </button>

            </div>

            <pre className="overflow-auto rounded-lg bg-secondary p-4 text-xs">
              {JSON.stringify(page.content, null, 2)}
            </pre>

          </div>
        );
      })}

    </div>
  );
}
