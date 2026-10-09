import type { NextConfig } from "next"

import { env } from "./lib/env"

const securityHeaders = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  { key: "X-Frame-Options", value: "DENY" },
]

const nextConfig: NextConfig = {
  headers: async () => [{ source: "/:path*", headers: securityHeaders }],
  // Same-origin API: the browser calls /api/*, which reaches the Nest backend (API_PREFIX=api).
  rewrites: async () => [
    { source: "/api/:path*", destination: `${env.API_URL}/api/:path*` },
  ],
  devIndicators: false,
}

export default nextConfig
