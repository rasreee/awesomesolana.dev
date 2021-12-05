import { lighten } from 'polished'
import { createContext, Dispatch, SetStateAction, useContext } from 'react'

import { colors as baseColors } from '@/ui/foundations'

export const colorModes = {
	dark: {
		bg: '#151F28',
		surface: '#202F3C',
		hint: baseColors.gray[300],
		text: baseColors.gray[50],
		primary: baseColors.ultramarine[500],
		secondary: baseColors.strawberry[500],
		outline: lighten('0.1', '#202f3c'),
		accent: '#29C6CF'
	},
	light: {
		bg: '#EFF1F5',
		surface: '#fff',
		hint: '#8F9BB3',
		text: '#151f28',
		primary: baseColors.ultramarine[500],
		secondary: baseColors.strawberry[500],
		outline: '#D0D6E2',
		account: '#29C6CF'
	}
}

export type ColorModeName = keyof typeof colorModes

export type IColorModeContext = {
	colorMode: ColorModeName
	setColorMode: Dispatch<SetStateAction<ColorModeName>>
}

export const ColorModeContext = createContext<IColorModeContext | undefined>(undefined)

export const useColorMode = () => {
	const context = useContext(ColorModeContext)
	if (!context) throw new Error()

	return context
}
