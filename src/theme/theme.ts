import {
	baseThemeColors,
	layouts,
	radii,
	shadows,
	space,
	transitions,
	typography,
	widths,
	zIndex
} from '@/ui/foundations'

import { colorModes } from './color-mode'
import { sizes } from './sizes'

const theme = {
	transitions,
	modes: colorModes,
	colors: { ...baseThemeColors, ...colorModes.dark },
	...typography,
	radii,
	shadows,
	sizes,
	space,
	zIndex,
	layouts,
	widths
} as const

export type Theme = typeof theme

export { theme }

export const mockTheme = (): Theme => {
	return { ...theme }
}
