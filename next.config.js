/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Image optimization
  images: {
    domains: ['images.unsplash.com'],
    unoptimized: true,
  },
  
  // Static export for Netlify
  output: 'export',
  distDir: 'out',
  
  // Disable TypeScript errors during build (warnings only)
  typescript: {
    ignoreBuildErrors: false,
  },
  
  // Disable ESLint errors during build (warnings only)
  eslint: {
    ignoreDuringBuilds: false,
  },
  
  // Optimize build performance
  swcMinify: true,
  
  // Trailing slash for better static hosting
  trailingSlash: true,
  
  // Skip validation during build for faster builds
  skipTrailingSlashRedirect: true,
  skipMiddlewareUrlNormalize: true,
}

module.exports = nextConfig
