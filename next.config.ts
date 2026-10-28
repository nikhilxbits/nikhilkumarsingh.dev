import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    experimental: { agentFeedback: true },
    cacheComponents: true,
    partialPrefetching: true,
    reactCompiler: true,
    turbopack: { rules: { "*.css": { loaders: ["@tailwindcss/turbopack"], as: "*.css" } } },
    reactStrictMode: true,
    typedRoutes: true,
    devIndicators: false,
    env: { BUILD_TIMESTAMPS: Date.now().toString() },
    compiler: process.env.NODE_ENV === "production" ? { removeConsole: { exclude: ["error"] } } : undefined
};

export default nextConfig;
