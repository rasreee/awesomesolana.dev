import { css } from '@emotion/react'
import styled from '@emotion/styled'

import { fontSize, fontWeight } from '../foundations'
import { StyledProps } from '../styled'

const sharedHeadlineStyle = ({ theme }: StyledProps) => css`
	font-family: ${theme.fonts.mono};
	font-weight: ${fontWeight(theme, 'bold')};
	line-height: 125%;
`

export const H1 = styled.h1(
	({ theme }) => css`
		font-weight: ${fontWeight(theme, 'bold')};
		font-size: ${fontSize(theme, '3xl')};
	`,
	sharedHeadlineStyle
)

export const H6 = styled.h1(
	({ theme }) => css`
		font-size: ${fontSize(theme, 'lg')};
	`,
	sharedHeadlineStyle
)
