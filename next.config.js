/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {},
  webpack: (config) => {
    return config;
  },
};

module.exports = nextConfig;

