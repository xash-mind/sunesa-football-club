import { createFileRoute } from "@tanstack/react-router";
import { SunesaSite } from "@/components/sunesa/SunesaSite";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Sunesa Football Club — Firing The Spirit of Football" },
      {
        name: "description",
        content:
          "Registered with Bangalore District Football Association since 2012.",
      },
      { property: "og:title", content: "Sunesa Football Club — Firing The Spirit of Football" },
      {
        property: "og:description",
        content: "Registered with Bangalore District Football Association since 2012.",
      },
    ],
  }),
});

function Index() {
  return <SunesaSite />;
}
