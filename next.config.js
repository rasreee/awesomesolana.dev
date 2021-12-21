// @ts-nocheck
const withPlugins = require('next-compose-plugins')
const withBundleAnalyzer = require('@next/bundle-analyzer')

const config = {}

const bundleAnalyzer = withBundleAnalyzer({
	future: {
		webpack5: true
	},
	enabled: process.env.ANALYZE === 'true',
	poweredByHeader: false,
	trailingSlash: true,
	basePath: '',
	// The starter code load resources from `public` folder with `router.basePath` in React components.
	// So, the source code is "basePath-ready".
	// You can remove `basePath` if you don't need it.
	reactStrictMode: true,
	env: {
		NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
		NEXT_PUBLIC_SUPABASE_KEY: process.env.NEXT_PUBLIC_SUPABASE_KEY,
		NEXT_PUBLIC_AMPLITUDE_API_KEY: process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY
	}
})

module.exports = withPlugins([[bundleAnalyzer, config]])
