import classNames from 'classnames'
import { darken, lighten } from 'polished'
import React, { CSSProperties } from 'react'

import { pseudo } from '@/common/utils/pseudos'
import { theme } from '@/theme/theme'
import { FontSize, ThemeColorName } from '@/ui/foundations'

export interface TagProps {
	color?: ThemeColorName
	fontSize?: FontSize
	style?: CSSProperties
}

export const Tag: React.FunctionComponent<TagProps> = ({
	children,
	color = 'turquoise',
	fontSize = 'xs',
	...props
}) => {
	return (
		<div
			className={classNames(
				'max-w-max',
				'rounded px-2 py-0.5',
				'font-medium leading-tight',
				`hover:shadow-sm`,
				'cursor-pointer'
			)}
			css={{
				fontSize: theme.fontSizes[fontSize],
				background: lighten('0.325', theme.colors[color]),
				color: darken('0.2', theme.colors[color]),
				[pseudo('_hover')]: {
					borderWidth: '1.5px',
					borderColor: darken('0.1', theme.colors[color])
				}
			}}
			{...props}
		>
			{children}
		</div>
	)
}
