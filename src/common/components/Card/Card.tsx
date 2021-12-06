import { css } from '@emotion/react'
import React, { HTMLAttributes } from 'react'

import { border, spacing, w, Width } from '@/ui/foundations'
import styled from '@/ui/styled'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode
	size?: Width
}

const CardContainer = styled.div<{ size?: Width }>`
	padding: ${spacing(2, 0)};
	${({ theme, size = 'md' }) => css`
		color: ${theme.colors.text};
		background-color: ${theme.colors.surface};
		border-radius: ${theme.radii.lg};
		max-width: ${w(size)};
		min-width: ${w(size)};
		box-shadow: ${theme.shadows.sm};
		--card-title: ${theme.fontSizes['lg']};
		--card-leading: ${theme.fontSizes['xl']};
	`};
`

const sharedStyles = css`
	padding: ${spacing(3, 6)};
`

export function Card({ children, ...props }: CardProps) {
	return <CardContainer {...props}>{children}</CardContainer>
}

Card.Header = styled('div')(
	css`
		height: ${spacing(8)};
	`,
	sharedStyles
)

Card.Title = styled('div')(
	({ theme }) => css`
		font-size: var(--card-title);
		line-height: var(--card-leading);
		font-weight: ${theme.fontWeights.semibold};
		line-height: 1;
	`
)

Card.Body = styled('div')(
	css`
		flex: 1 1 auto;
		margin: ${spacing(4, 0)};
	`,
	sharedStyles
)

Card.Footer = styled('div')(
	({ theme }) => css`
		border-top: ${border(1, theme.colors.outline)};
		height: ${spacing(8)};
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: ${theme.colors.hint};
	`,
	sharedStyles
)
