/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
     'localhost',
     'api.swayauth.com', 
     'lh3.googleusercontent.com',
     'platform-lookaside.fbsbx.com',
     'cdn.pixabay.com'
    ],
  },
}

module.exports = nextConfig
