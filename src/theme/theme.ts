import { colors, shadows, typography } from './foundations'

const theme = {
	colors,
	...typography,
	shadows
} as const

export type Theme = typeof theme

export { theme }

export const mockTheme = (): Theme => {
	return { ...theme }
}
