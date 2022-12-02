/** @type {import('next').NextConfig} */
const withTM = require('next-transpile-modules')(['@stripe/firestore-stripe-payments'])

const nextConfig = withTM({
  reactStrictMode: false,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        port: '',
        pathname: '/t/p/original/',
      },
    ],
    domains: ['image.tmdb.org'],
  },
})

module.exports = nextConfig
