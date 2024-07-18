/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: '',
 // output: 'export',
//  images:{
//    unoptimized: true,
//  },
//  distDir : 'out',
  //trailingSlash: true,
  //assetPrefix: '.',
  //staticPageGenerationTimeout: 1000,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;


