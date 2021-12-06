import classNames from 'classnames'
import React, { CSSProperties } from 'react'

import { pseudo } from '@/common/utils/pseudos'
import { theme } from '@/theme/theme'
import { ColorName, colors, FontSize } from '@/ui/foundations'

export interface TagProps {
	color?: ColorName
	fontSize?: FontSize
	style?: CSSProperties
}

export const Tag: React.FunctionComponent<TagProps> = ({
	children,
	color = 'solanaSecondary',
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
				background: colors[color][50],
				color: colors[color][800],
				[pseudo('_hover')]: {
					borderWidth: '1.5px',
					borderColor: colors[color][700]
				}
			}}
			{...props}
		>
			{children}
		</div>
	)
}
