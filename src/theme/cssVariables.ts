import { css } from '@emotion/react'

export const cssVariables = css`
	:root {
		--font-sans: Inter, 'Inter UI', system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Oxygen, sans-serif,
			'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji', sans-serif;
		--font-mono: 'Dank Mono', Dank, dm, Menlo, Consolas, Roboto Mono, Ubuntu Monospace, Oxygen Mono, Liberation Mono,
			monospace;

		--font-thin: 100;
		--font-extralight: 200;
		--font-light: 300;
		--font-normal: 400;
		--font-medium: 500;
		--font-semibold: 600;
		--font-bold: 700;
		--font-extrabold: 800;
		--font-black: 900;

		--gray-50: #f9fafb;
		--gray-100: #f3f4f6;
		--gray-200: #e5e7eb;
		--gray-300: #d1d5db;
		--gray-400: #9ca3af;
		--gray-500: #6b7280;
		--gray-600: #4b5563;
		--gray-700: #374151;
		--gray-800: #1f2937;
		--gray-900: #111827;

		--rounded-none: 0px;
		--rounded-sm: 0.125rem;
		--rounded-default: 0.25rem;
		--rounded-md: 0.375rem;
		--rounded-lg: 0.5rem;
		--rounded-xl: 0.75rem;
		--rounded-2xl: 1rem;
		--rounded-3xl: 1.5rem;
		--rounded-full: 9999px;
	}
`
