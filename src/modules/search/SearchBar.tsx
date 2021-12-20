import classNames from 'classnames'
import React from 'react'

import { KbdSymbol } from '@/common/components/keyboard/KbdSymbol'
import { SearchIcon } from '@/icons/SearchIcon'

export type SearchBarProps = {}

export const SearchBar: React.FunctionComponent<SearchBarProps> = () => {
	return (
		<>
			{/* Inner content */}
			<button
				className={classNames(
					'hidden sm:flex items-center w-72 space-x-3 px-4 h-12 bg-white shadow-sm rounded-lg',
					'text-gray-400 text-left',
					'ring-1 ring-gray-900/10 hover:ring-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500',
					'dark:bg-gray-800 dark:ring-0 dark:text-gray-300 dark:highlight-white/5 dark:hover:bg-gray-700'
				)}
			>
				<SearchIcon className={'flex-none text-gray-300 dark:text-gray-400'} />
				<span className="flex-auto">Quick search...</span>
				<KbdSymbol keys={['Meta', 'K']} />
			</button>
		</>
	)
}
