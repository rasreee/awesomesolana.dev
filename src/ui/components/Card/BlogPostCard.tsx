import { css } from '@emotion/react'
import React from 'react'

import { Card } from '@/ui/components'
import { spacing } from '@/ui/foundations'
import { EyeIcon, HeartIcon } from '@/ui/icon'
import styled from '@/ui/styled'

export interface BlogPostCardProps {
	title: string
	description: string
	date: string
	views: number
	likes: number
	youLiked: boolean
}

const Right = styled('div')(
	css`
		display: flex;
		align-items: center;
		gap: ${spacing(3)};
	`
)

const Left = styled('div')(
	({ theme }) =>
		css`
			font-size: ${theme.fontSizes.xs};
		`
)

const Stat = styled('div')(
	({ theme }) =>
		css`
			font-size: ${theme.fontSizes.xs};
			display: flex;
			align-items: center;
			gap: ${spacing(0.5)};

			svg {
				height: 1.25em;
				color: inherit;
			}
		`
)

export function BlogPostCard({ title, description, date, youLiked, likes, views }: BlogPostCardProps) {
	return (
		<Card>
			<Card.Header>
				<Card.Title>{title}</Card.Title>
			</Card.Header>
			<Card.Body>{description}</Card.Body>
			<Card.Footer>
				<Left>{date}</Left>
				<Right>
					<Stat>
						<EyeIcon />
						{views}
					</Stat>
					<Stat>
						<HeartIcon kind={youLiked ? 'solid' : 'outlined'} />
						{likes}
					</Stat>
				</Right>
			</Card.Footer>
		</Card>
	)
}
