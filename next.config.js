/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compilerOptions: {
    baseUrl: '.'
  },
  images: {
    domains: ['i.ibb.co']
  }
}

module.exports = nextConfig
