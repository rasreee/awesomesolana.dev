import { createContext, Dispatch, SetStateAction, useContext } from 'react'

import { colors as baseColors } from '@/modules/theme/foundations'

export const colorModes = {
	dark: {
		bg: '#151F28',
		surface: '#202F3C',
		hint: baseColors.gray[300],
		text: baseColors.gray[50],
		primary: baseColors.primary[500],
		secondary: baseColors.secondary[500]
	},
	light: {
		bg: '#EFF1F5',
		surface: '#fff',
		hint: baseColors.gray[600],
		text: baseColors.gray[900],
		primary: baseColors.primary[500],
		secondary: baseColors.secondary[500]
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
