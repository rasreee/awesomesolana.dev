import { css } from '@emotion/react'
import { darken } from 'polished'
import * as React from 'react'

import { FontSize, Space, spacing, ThemeColorName } from '@/ui/foundations'
import { pseudo } from '@/ui/helpers'
import styled, { StyledProps } from '@/ui/styled'

export type ButtonStyleOptions = {
	/**
	 * Background color
	 */
	bg?: ThemeColorName
	/**
	 * Border style
	 */
	border?: ThemeColorName | 'transparent'
	/**
	 * Size variant
	 */
	fontSize?: FontSize
	/**
	 * Height as spacing
	 */
	height?: Space
	/**
	 * Foreground (text) color
	 */
	fg?: ThemeColorName
}

export interface ButtonProps extends ButtonStyleOptions, React.ButtonHTMLAttributes<HTMLButtonElement> {
	ref?: React.Ref<HTMLButtonElement>
	children: React.ReactNode
}

const baseButtonStyles = ({ theme }: StyledProps) => css`
	cursor: pointer;
	outline: none;
	border: none;
	text-decoration: none;
	transition: all 0.3s ease;
	font-family: ${theme.fonts.mono};
	font-weight: ${theme.fontWeights.semibold};
	text-align: center;
	border-radius: ${theme.radii.lg};
	font-weight: ${theme.fontWeights.semibold};
	padding: ${spacing(0, 6)};
`

const StyledButton = styled('button')<{ _styles: Required<ButtonStyleOptions> }>(({ theme, _styles }) => {
	const { bg, height, fontSize, fg, border } = _styles
	const bgColor = theme.colors[bg]

	const styles = {
		backgroundColor: theme.colors[bg],
		borderWidth: '1px',
		borderStyle: 'solid',
		borderColor: border === 'transparent' ? 'transparent' : theme.colors[border],
		color: theme.colors[fg],
		fontSize: theme.fontSizes[fontSize],
		height: theme.space[height],

		[pseudo('_hover')]: { backgroundColor: darken('0.2', bgColor) },
		[pseudo('_active')]: { backgroundColor: darken('0.5', bgColor) }
	}

	return css(styles)
}, baseButtonStyles)

export const Button = React.forwardRef(
	(
		{ bg = 'white', border = 'transparent', fontSize = 'base', height = 10, fg = 'darkest', ...props }: ButtonProps,
		ref: ButtonProps['ref']
	) => {
		const { children, ...restProps } = props

		return (
			<StyledButton ref={ref} {...restProps} _styles={{ bg, border, fontSize, height, fg }}>
				{children}
			</StyledButton>
		)
	}
)

Button.displayName = 'Button'
