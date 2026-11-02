import type { MetadataRoute } from "next";

import { SERVER_NAME, SITE_URL } from "@/data/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SERVER_NAME} — Minecraft minigames`,
    short_name: "TheySix Events",
    description:
      "19 Minecraft minigames across 6 arenas. Java: play.theysix.tech. Bedrock: bedrock.theysix.tech:25832.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#070A12",
    theme_color: "#070A12",
    lang: "en",
    categories: ["games", "entertainment"],
    icons: [
      {
        src: "/logo.gif",
        sizes: "528x528",
        type: "image/gif",
        purpose: "any",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    shortcuts: [
      { name: "Games", url: "/games" },
      { name: "How to play", url: "/how-to-play" },
    ],
    // Surfaced here so the site URL appears in the install metadata too.
    id: SITE_URL,
  };
}
