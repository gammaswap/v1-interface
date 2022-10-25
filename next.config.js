/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/positions',
        permanent: true,
      },
    ]
  },
  images: {
    domains: ['cloudflare-ipfs.com']
  }
}
