import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    useCache: true,
  },
  // ignore ts errors
  typescript: {
    ignoreBuildErrors: true,
  },
  // ignore eslint errors
  eslint: {
    ignoreDuringBuilds: true,
  },
}

export default nextConfig
