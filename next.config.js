/** @type {import('next').NextConfig} */
const nextConfig = {
  assetPrefix: process.env.NODE_ENV === 'production' ? '/app' : '',
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig
