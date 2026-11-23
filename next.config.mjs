import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async redirects() {
    return [
      { source: "/terms", destination: "https://wiki.theysix.tech/tos", permanent: true },
      { source: "/legal/terms", destination: "https://wiki.theysix.tech/tos", permanent: true },
      { source: "/legal/tos", destination: "https://wiki.theysix.tech/tos", permanent: true },
      { source: "/legal/privacy", destination: "https://wiki.theysix.tech/privacy", permanent: true },
      { source: "/legal/cookies", destination: "https://wiki.theysix.tech/cookies", permanent: true },
      { source: "/tos", destination: "https://wiki.theysix.tech/tos", permanent: true },
      { source: "/cookies", destination: "https://wiki.theysix.tech/cookies", permanent: true },
      { source: "/privacy", destination: "https://wiki.theysix.tech/privacy", permanent: true },
    ];
  },
  webpack: (config) => {
    config.resolve.alias["@"] = path.resolve(__dirname, "src");
    return config;
  },
};

export default nextConfig;
