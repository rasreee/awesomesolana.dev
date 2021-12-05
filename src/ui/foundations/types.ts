import { baseThemeColors, colors as baseColors } from './colors'

export type Spacings = {
	bit: string
	byte: string
	kilo: string
	mega: string
	giga: string
	tera: string
	peta: string
	exa: string
	zetta: string
}

export type ColorConfig<CN extends string = string> = { [colorName in CN]: ColorScale }

export type ColorName = keyof typeof baseColors

export type Colors = ColorConfig<ColorName>

export type ColorScale = {
	0: string
	50: string
	100: string
	200: string
	300: string
	400: string
	500: string
	600: string
	700: string
	800: string
	900: string
}

const colorLevels = [0, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900] as const

export type ColorLevel = typeof colorLevels[number]

export type ThemeColorName = keyof typeof baseThemeColors

export type ColorObject = { name: ThemeColorName; level?: number }
