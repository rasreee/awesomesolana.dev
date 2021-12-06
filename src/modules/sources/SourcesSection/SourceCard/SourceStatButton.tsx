import { css } from '@emotion/react'
import React, { FC, HTMLAttributes } from 'react'

import { spacing } from '@/ui/foundations'
import { IconProps } from '@/ui/icon'
import styled from '@/ui/styled'

export interface SourceStatButtonProps extends HTMLAttributes<HTMLButtonElement> {
	value: number
	icon: FC<IconProps>
}

const Stat = styled('button')(
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

export const SourceStatButton: React.FunctionComponent<SourceStatButtonProps> = ({ value, icon: Icon, ...props }) => {
	return (
		<Stat {...props}>
			<Icon className="text-gray-500" style={{ fontSize: '1.25em', marginTop: '0.05rem' }} />
			<div className="stat-text">{value}</div>
		</Stat>
	)
}
