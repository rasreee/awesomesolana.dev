/* eslint-disable @typescript-eslint/no-var-requires */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const path = require('path');
const dotenv = require('dotenv');

dotenv.config({
  path: path.join(
    __dirname,
    process.env.NODE_ENV === 'production' ? '.env' : '.env.local',
  ),
});

/** @type {import('next').NextConfig} */
module.exports = withBundleAnalyzer({
  eslint: {
    dirs: ['src'],
  },
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
    NEXT_PUBLIC_SUPABASE_KEY: process.env.NEXT_PUBLIC_SUPABASE_KEY,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  },
});
