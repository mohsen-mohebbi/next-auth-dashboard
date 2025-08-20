import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['randomuser.me'], // دامنه تصاویر خارجی
  },
};

export default nextConfig;
