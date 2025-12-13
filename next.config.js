/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // Basic image optimization
  images: {
    domains: [
      'firebasestorage.googleapis.com',
      'lh3.googleusercontent.com',
      'localhost',
    ],
  },
  
  // Minimal experimental features to reduce chunk loading issues
  experimental: {
    optimizePackageImports: ['react', 'react-dom'],
  },
  
  // Skip type/lint checks for faster development
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig;