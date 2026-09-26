import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;

// Erlaubt `next dev`, dieselben Cloudflare-Bindings (D1 etc.) zu sehen wie
// der Worker in Produktion.
import("@opennextjs/cloudflare").then((m) => m.initOpenNextCloudflareForDev());
