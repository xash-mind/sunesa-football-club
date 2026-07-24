import { siteConfig } from "@/config/site";
import { createFileRoute } from "@tanstack/react-router";
import { SunesaSite } from "@/components/sunesa/SunesaSite";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: siteConfig.seo.title },
      {
        name: "description",
        content: siteConfig.seo.description,
      },
      { property: "og:title", content: siteConfig.seo.title },
      {
        property: "og:description",
        content: siteConfig.seo.description,
      },
    ],
  }),
});


function Index() {
  return <SunesaSite />;
}
