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
      { source: "/tos", destination: "https://wiki.theysix.tech/legal/tos", permanent: true },
      { source: "/privacy", destination: "https://wiki.theysix.tech/legal/privacy", permanent: true },
      { source: "/cookies", destination: "https://wiki.theysix.tech/legal/cookies", permanent: true },
    ];
  },
  webpack: (config) => {
    config.resolve.alias["@"] = path.resolve(__dirname, "src");
    return config;
  },
};

export default nextConfig;
