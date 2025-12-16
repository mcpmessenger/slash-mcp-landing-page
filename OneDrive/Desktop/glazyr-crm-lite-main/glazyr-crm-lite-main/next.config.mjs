/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Force unique build ID to prevent caching
  generateBuildId: async () => {
    return `build-${Date.now()}-${Math.random().toString(36).substring(7)}`
  },
  // For AWS Amplify - use standalone output
  output: process.env.AMPLIFY ? 'standalone' : undefined,
  // For Netlify - no special output needed, plugin handles it
}

export default nextConfig
