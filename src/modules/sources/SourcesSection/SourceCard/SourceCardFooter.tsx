import { css } from '@emotion/react'
import classNames from 'classnames'
import React, { FC } from 'react'

import { spacing } from '@/ui/foundations'
import { EyeIcon } from '@/ui/icon/EyeIcon'
import { HeartIcon } from '@/ui/icon/HeartIcon'
import styled from '@/ui/styled'

const Stat = styled('div')(
	({ theme }) =>
		css`
			font-family: ${theme.fonts.mono};
			color: ${theme.colors.darkGray};
			font-weight: ${theme.fontWeights.semibold};
			font-size: ${theme.fontSizes.xs};
			display: flex;
			align-items: center;
			gap: ${spacing(1)};

			svg {
				height: 1.25em;
			}

			.stat-text {
				padding-top: 0.125rem;
			}
		`
)

type SourceCardFooterProps = {
	likes: number
	views: number
	updatedAt: string
}

export const SourceCardFooter: FC<SourceCardFooterProps> = ({ likes, views, updatedAt }) => {
	return (
		<>
			<div className={classNames('flex items-center gap-3', 'absolute left-5')}>
				<Stat>
					<HeartIcon kind={'solid'} className="text-secondary-500" />
					<div className="stat-text">{likes}</div>
				</Stat>
				<Stat>
					<EyeIcon className="text-gray-500" style={{ fontSize: '1.25em', marginTop: '0.05rem' }} />
					<div className="stat-text">{views}</div>
				</Stat>
			</div>
			<div className="absolute right-5">
				<div className={classNames('overflow-ellipsis line-clamp-1', 'text-xs')}>{updatedAt}</div>
			</div>
		</>
	)
}
