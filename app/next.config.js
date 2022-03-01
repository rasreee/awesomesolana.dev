const path = require('path');
const dotenv = require('dotenv');

dotenv.config({
  path: path.join(
    __dirname,
    process.env.NODE_ENV === 'production' ? '.env' : '.env.local',
  ),
});

const withTM = require('next-transpile-modules')([
  '@awesomesolana/common',
  '@awesomesolana/hooks',
  '@awesomesolana/tw',
  '@awesomesolana/ui',
]);

/* eslint-disable @typescript-eslint/no-var-requires */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

let config = {
  eslint: {
    dirs: ['src'],
  },
  rootDir: 'src',
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback, // if you miss it, all the other options in fallback, specified
      // by next.js will be dropped. Doesn't make much sense, but how it is
      fs: false,
    };

    return config;
  },
  env: {
    GITHUB_ACCESS_TOKEN: process.env.GITHUB_ACCESS_TOKEN,
    BASE_URL: process.env.BASE_URL,
    NEXT_PUBLIC_SUPABASE_KEY: process.env.NEXT_PUBLIC_SUPABASE_KEY,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  },
};

config = withBundleAnalyzer(config);

/** @type {import('next').NextConfig} */
module.exports = withTM(config);
