/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    emotion: true
  },
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks']
  }
};

export default nextConfig;
