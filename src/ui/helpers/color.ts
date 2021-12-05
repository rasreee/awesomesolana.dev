import divide from 'lodash.divide'
import { darken, lighten } from 'polished'

import { theme } from '@/theme/theme'

import { ThemeColorName } from '../foundations'

export const getColorValue = (name: ThemeColorName | undefined, level = 0) => {
	if (!name) return 'transparent'
	if (name === 'white') return 'white'

	const hex = theme.colors[name]
	const diff = level - 500
	let res = hex
	const amount = `${divide(Math.abs(diff), 1000)}`

	if (diff < 0) {
		res = `${lighten(amount, hex)}`
	} else {
		res = darken(amount, hex)
	}

	return res
}
