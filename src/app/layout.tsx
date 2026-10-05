import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";

import { CookieBanner } from "@/components/CookieBanner";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { SITE_URL } from "@/data/site";

import "./globals.css";

/**
 * Both families are loaded for real: the sibling site declares them in its
 * Tailwind theme but never fetches them, so everything silently falls back to
 * system-ui. `display: swap` is set so text paints immediately.
 */
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  axes: ["opsz"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
  weight: ["400", "500", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "TheySix Events — 19 Minecraft minigames, 6 arenas, one server",
    template: "%s · TheySix Events",
  },
  description:
    "TheySix Events is a Minecraft minigame server with 19 games across 6 arenas. Join on theysix.sparked.network with Java or Bedrock.",
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
  themeColor: "#070A12",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
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
