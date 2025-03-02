/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // Server actions are available by default in Next.js 14
  },
  
  // Prevent Next.js from normalizing URLs with trailing slashes
  skipTrailingSlashRedirect: true,
}

module.exports = nextConfig 