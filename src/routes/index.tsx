import { createFileRoute } from "@tanstack/react-router";
import { SunesaSite } from "@/components/sunesa/SunesaSite";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Sunesa Football Club — Train With Purpose. Play With Pride." },
      {
        name: "description",
        content:
          "Official youth football academy under Arka Vega Sports Academy. Veteran-led coaching, structured development from U8 to U18.",
      },
      { property: "og:title", content: "Sunesa Football Club — Youth Academy" },
      {
        property: "og:description",
        content: "Veteran-led youth football development. Book a trial session today.",
      },
    ],
  }),
});

function Index() {
  return <SunesaSite />;
}
