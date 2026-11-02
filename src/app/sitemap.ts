import type { MetadataRoute } from "next";

import { SITE_URL } from "@/data/site";

const ROUTES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/games", priority: 0.9, changeFrequency: "weekly" },
  { path: "/how-to-play", priority: 0.8, changeFrequency: "monthly" },
  { path: "/arenas", priority: 0.7, changeFrequency: "monthly" },
  { path: "/ranks", priority: 0.6, changeFrequency: "monthly" },
  { path: "/server", priority: 0.6, changeFrequency: "weekly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return ROUTES.map((route) => ({
    url: route.path === "/" ? `${SITE_URL}/` : `${SITE_URL}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
