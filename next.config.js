/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development'
  
});

const nextConfig = withPWA({
  output: "export",
  basePath: process.env.NODE_ENV === 'production' ? '/ResearchReader' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/ResearchReader/' : ''
});

module.exports = nextConfig;
