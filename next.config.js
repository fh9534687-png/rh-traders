/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  // Fix slow dev navigation when Next.js picks the wrong workspace root
  // (e.g. due to other lockfiles on disk). This keeps file watching and
  // module resolution scoped to this app directory.
  turbopack: {
    root: path.join(__dirname),
  },
  webpack: (config) => {
    return config;
  },
};

module.exports = nextConfig;

