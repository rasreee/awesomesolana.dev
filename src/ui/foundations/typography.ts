const fonts = {
	sans: '"Open Sans", Inter, "Inter UI", system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Oxygen, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
	mono: '"SF Mono", "Roboto Mono", monospace'
}

export const fontSizes = {
	'xxs': '0.625rem',
	'xs': '0.75rem',
	'sm': '0.875rem',
	'base': '1rem',
	'lg': '1.25rem',
	'xl': '1.5rem',
	'2xl': '2rem',
	'3xl': '3rem',
	'4xl': '4rem',
	'5xl': '6rem'
}

export type FontSize = keyof typeof fontSizes

export const fontWeights = {
	thin: 100,
	extralight: 200,
	light: 300,
	normal: 400,
	medium: 500,
	semibold: 600,
	bold: 700,
	extrabold: 800,
	black: 900
}

export type FontWeight = keyof typeof fontWeights

export const typography = {
	fonts,
	fontSizes,
	fontWeights
}

export type Typography = typeof typography
