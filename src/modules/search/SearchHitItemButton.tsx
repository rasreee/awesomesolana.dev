import classNames from 'classnames'
import React, { FC, HTMLAttributes } from 'react'

import { Source } from '@/models/source'

export interface SearchHitItemButtonProps extends HTMLAttributes<HTMLButtonElement> {
	hit: Source
}

export const SearchHitItemButton: FC<SearchHitItemButtonProps> = ({ onClick, hit }) => {
	return (
		<button
			className={classNames(
				'flex items-center',
				'w-full h-16',
				'border-0 rounded-lg',
				'pr-5 pl-4 my1 mx-0',
				'font-semibold',
				'bg-gray-50 hover:bg-secondary-400 active:bg-secondary-600',
				'text-white',
				'hover:shadow-md active:shadow-md'
			)}
			onClick={onClick}
		>
			{hit.title}
		</button>
	)
}
