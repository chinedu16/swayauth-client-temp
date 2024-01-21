/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [
     'localhost',
     'api.swayauth.com', 
     'lh3.googleusercontent.com',
     'platform-lookaside.fbsbx.com'
    ],
  },
}

module.exports = nextConfig
