import classNames from 'classnames'
import React from 'react'

import { KbdSymbol } from '@/components/keyboard/KbdSymbol'
import { SearchIcon } from '@/icons/SearchIcon'

export type SearchButtonSmProps = {
	onClick: () => void
}

export const SearchButtonSm: React.FunctionComponent<SearchButtonSmProps> = ({ onClick }) => {
	return (
		<>
			{/* Inner content */}
			<button
				onClick={onClick}
				className={classNames(
					'hidden sm:flex items-center w-64 space-x-3 px-4 h-10 bg-white shadow-sm rounded-lg',
					'text-sm text-gray-400 text-left',
					'ring-1 ring-gray-900/10 hover:ring-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500',
					'dark:bg-gray-800 dark:ring-0 dark:text-gray-300 dark:highlight-white/5 dark:hover:bg-gray-700'
				)}
			>
				<SearchIcon className={'flex-none text-gray-300 dark:text-gray-400 h-4 w-4'} />
				<span className="flex-auto">Quick search...</span>
				<KbdSymbol keys={['Meta', 'K']} />
			</button>
		</>
	)
}
