/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    // esmExternals: 'loose',
  },
  transpilePackages: ['@uimkit/uikit-react'],
}

module.exports = nextConfig
