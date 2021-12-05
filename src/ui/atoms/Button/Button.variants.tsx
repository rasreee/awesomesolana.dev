import { css } from '@emotion/react'
import { darken, transparentize } from 'polished'
import React from 'react'

import { ThemeColorName } from '@/ui/foundations'
import { pseudo } from '@/ui/helpers'
import styled from '@/ui/styled'

import { Button, ButtonProps } from './Button'

export const PrimaryButton = ({ bg = 'primary', ...props }: ButtonProps & { bg?: ThemeColorName }) => (
	<Button {...props} bg={bg} fg={'white'} />
)

const SSecondaryButton = styled(Button)<{ fg: ThemeColorName }>(({ theme, fg }) => {
	const bgColor = theme.colors[fg]
	const initialBg = transparentize('0.95', bgColor)

	return css`
		color: ${darken('0.1', bgColor)};
		background-color: ${initialBg};
		opacity: 1;
		border: 2px solid ${transparentize('0.6', bgColor)};
		${pseudo('_hover')} {
			background-color: ${transparentize('0.8', bgColor)};
		}
		${pseudo('_active')} {
			background-color: ${transparentize('0.6', bgColor)};
		}
	`
})

export const SecondaryButton = ({ fg = 'secondary', ...props }: ButtonProps & { bg?: ThemeColorName }) => (
	<SSecondaryButton {...props} bg={'white'} fg={fg} />
)

const SGhostButton = styled(Button)<{ fg: ThemeColorName }>(({ theme, fg }) => {
	const initialBg = theme.colors[fg]

	return css`
		color: ${initialBg};
		background-color: transparent;
		opacity: 1;
		${pseudo('_hover')} {
			background-color: ${transparentize('0.85', initialBg)};
		}
		${pseudo('_active')} {
			opacity: 1;
			background-color: ${transparentize('0.6', initialBg)};
		}
	`
})

export const GhostButton = ({ fg = 'gray', ...props }: ButtonProps) => <SGhostButton {...props} fg={fg} />
