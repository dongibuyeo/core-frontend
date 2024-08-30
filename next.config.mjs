/** @type {import('next').NextConfig} */
import nextPWA from 'next-pwa'

const withPWA = nextPWA({
  dest: 'public',
})

const nextConfig = withPWA({
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
})

export default nextConfig
