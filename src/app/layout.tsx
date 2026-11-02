import type { Metadata } from "next";

import { CookieBanner } from "@/components/CookieBanner";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { SITE_URL } from "@/data/site";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "TheySix Events — 19 Minecraft minigames, 6 arenas, one server",
    template: "%s · TheySix Events",
  },
  description:
    "TheySix Events is a Minecraft minigame server with 19 games across 6 arenas. Join on play.theysix.tech (Java) or bedrock.theysix.tech:25832 (Bedrock).",
  applicationName: "TheySix Events",
  manifest: "/manifest.webmanifest",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "TheySix Events",
    url: SITE_URL,
    title: "TheySix Events — 19 Minecraft minigames, 6 arenas",
    description:
      "19 minigames, 6 arenas, one server. Java and Bedrock, Paper 1.21.11.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "TheySix Events — 19 minigames, 6 arenas, one server",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TheySix Events — 19 Minecraft minigames, 6 arenas",
    description:
      "19 minigames, 6 arenas, one server. Java and Bedrock, Paper 1.21.11.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/logo.gif", type: "image/gif" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "512x512" }],
  },
  formatDetection: { telephone: false },
};

export const viewport = {
  themeColor: "#020202",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-bg-base text-ink antialiased">
        <a
          href="#main"
          className="label-mono sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-control focus:bg-brand focus:px-4 focus:py-2.5 focus:text-[#070A12]"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <CookieBanner />
      </body>
    </html>
  );
}
