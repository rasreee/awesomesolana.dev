import classNames from 'classnames'
import React, { CSSProperties } from 'react'

import { ColorName, colors, FontSize, fontSizes } from '@/ui/foundations'

import { pseudo } from '../utils/pseudos'

export interface TagProps {
	color?: ColorName
	fontSize?: FontSize
	style?: CSSProperties
}

export const Tag: React.FunctionComponent<TagProps> = ({
	children,
	color = 'secondary',
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
				fontSize: fontSizes[fontSize],
				background: colors[color][50],
				color: colors[color][700],
				[pseudo('_hover')]: {
					borderColor: colors[color][600],
					borderWidth: '1.5px'
				}
			}}
			{...props}
		>
			{children}
		</div>
	)
}
