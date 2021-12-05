import { css, SerializedStyles } from '@emotion/react'
import { lighten } from 'polished'

import { Theme } from '@/theme/theme'

type ThemeArgs = Theme | { theme: Theme }

function isTheme(args: ThemeArgs): args is Theme {
	return (args as { theme: Theme }).theme === undefined
}

/**
 * @private
 */
const getTheme = (args: ThemeArgs): Theme => (isTheme(args) ? args : args.theme)

/**
 * Visually communicates to the user that an element is hovered, focused, or
 * active in the disabled, invalid, and warning states.
 */
export const inputOutline = (
	args:
		| Theme
		| {
				theme: Theme
				disabled?: boolean
				invalid?: boolean
				hasWarning?: boolean
				/**
				 * @deprecated
				 */
				showValid?: boolean
		  }
): SerializedStyles => {
	const theme = getTheme(args)

	const options = isTheme(args) ? { disabled: false, invalid: false, hasWarning: false } : args

	if (options.disabled) {
		return css`
			box-shadow: 0 0 0 1px ${theme.colors.gray};
		`
	}

	let colors: Record<'default' | 'hover' | 'active' | 'focus', string>

	switch (true) {
		case options.invalid: {
			colors = {
				default: theme.colors.danger,
				hover: theme.colors.gray,
				focus: theme.colors.danger,
				active: theme.colors.danger
			}

			break
		}
		case options.hasWarning: {
			colors = {
				default: theme.colors.warning,
				hover: lighten(2, theme.colors.warning),
				focus: theme.colors.warning,
				active: theme.colors.warning
			}

			break
		}
		default: {
			colors = {
				default: theme.colors.gray,
				hover: theme.colors.darkGray,
				focus: theme.colors.primary,
				active: theme.colors.primary
			}
		}
	}

	return css`
		box-shadow: 0 0 0 1px ${colors.default};

		&:hover {
			box-shadow: 0 0 0 1px ${colors.hover};
		}

		&:focus {
			box-shadow: 0 0 0 2px ${colors.focus};
		}

		&:active {
			box-shadow: 0 0 0 1px ${colors.active};
		}
	`
}
