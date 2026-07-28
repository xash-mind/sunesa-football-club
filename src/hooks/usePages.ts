import { useEffect, useState } from "react";
import { getPages, type Page } from "@/services/pages";

export function usePages() {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPages() {
      try {
        const data = await getPages();
        setPages(data);
      } finally {
        setLoading(false);
      }
    }

    loadPages();
  }, []);

  return {
    pages,
    loading,
  };
}