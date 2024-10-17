/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['three'],
  compiler: {
    emotion: true
  },
  reactStrictMode: false
};

export default nextConfig;
