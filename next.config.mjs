/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['three'],
  compiler: {
    emotion: true
  }
};

export default nextConfig;
