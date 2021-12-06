import { baseThemeColors, shadows, space, typography } from '@/ui/foundations'

import { colorModes } from './color-mode'
import { sizes } from './sizes'

const theme = {
	modes: colorModes,
	colors: { ...baseThemeColors, ...colorModes.dark },
	...typography,
	shadows,
	sizes,
	space
} as const

export type Theme = typeof theme

export { theme }

export const mockTheme = (): Theme => {
	return { ...theme }
}
