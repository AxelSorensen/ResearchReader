/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: true,
  
});

const nextConfig = withPWA({
  output: "export",
  basePath: '/ResearchReader',
  assetPrefix: '/ResearchReader/'
});

module.exports = nextConfig;
