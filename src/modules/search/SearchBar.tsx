import classNames from 'classnames'
import React, { useEffect, useState } from 'react'

import { KeyComboSymbol } from '@/common/components'
import { useInput, useIsMobileDevice, useOnKeyPress } from '@/common/hooks'
import { SearchIcon } from '@/icons/SearchIcon'
import { Source } from '@/models/source'
import { useFindSourcesByQuery } from '@/models/source/useFindSourcesByQuery'

import { SearchResults } from './SearchModal/SearchResults'

export interface SearchBarProps {
	shouldAutoFocus?: boolean
	size?: 'sm' | 'lg'
}

export const SearchBar: React.FunctionComponent<SearchBarProps> = ({ shouldAutoFocus = false, size = 'lg' }) => {
	const { isFocused, value: query, blur, bind } = useInput({ autoFocus: shouldAutoFocus })
	const findSourcesByQuery = useFindSourcesByQuery()

	useOnKeyPress('Escape', blur)

	useOnKeyPress('Enter', () => {
		console.log('Submitted Query: ', bind.ref.current?.value)
	})

	const [hits, setHits] = useState<Source[]>([])
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		const query = bind.ref.current?.value
		if (!query) return setHits([])

		setIsLoading(true)

		const fetcher = async () => {
			const promise = new Promise((resolve) => {
				setTimeout(() => {
					resolve(null)
				}, 200)
			})

			await promise

			return findSourcesByQuery(query)
		}

		fetcher().then((res) => {
			console.log('Hits: ', res)
			setHits(res)
			setIsLoading(false)
		})
	}, [query])

	const isMobileDevice = useIsMobileDevice()

	return (
		<>
			{/* Inner content */}
			<div
				className={classNames(
					'flex items-center',
					'appearance-none',
					'w-full md:w-6/12',
					'mx-auto',
					size === 'sm' ? 'px-3 py-0.5' : 'px-3 py-2',
					'rounded-lg',
					'bg-white',
					'shadow-sm',
					'border',
					isFocused ? 'outline-none ring-primary-500 border-primary-500' : 'border-gray-300',
					'placeholder-gray-400',
					size === 'sm' ? 'text-sm sm:text-xs' : 'text-base sm:text-sm'
				)}
			>
				{isLoading ? (
					<div>Loading...</div>
				) : (
					<SearchIcon
						className={classNames(
							size === 'sm' ? 'h-4 w-4 md:h-4 md:w-4' : 'md:h-6 md:w-6',
							isFocused ? 'text-primary-500' : 'text-gray-500'
						)}
					/>
				)}
				<input
					{...bind}
					type="search"
					placeholder="Search for awesome Solana content"
					className={classNames(
						'px-3 py-2 flex flex-1 outline-none border-none',
						'placeholder:text-gray-500',
						'leading-tight',
						'align-middle'
					)}
				/>

				{!isMobileDevice && <KeyComboSymbol size={size} keys={['Meta', 'K']} style={{ color: 'var(--gray-500)' }} />}
			</div>
			<SearchResults hits={hits} />
		</>
	)
}
