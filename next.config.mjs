/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Avoid webpack bundling issues with the Google SDK in App Router / route handlers (dev "reading 'call'" errors).
  experimental: {
    serverComponentsExternalPackages: ["@google/generative-ai"],
  },
}

export default nextConfig
