import classNames from 'classnames'
import React, { useEffect, useState } from 'react'

import { KeyComboSymbol } from '@/common/components'
import { useInput, useIsMobileDevice, useOnKeyPress } from '@/common/hooks'
import { Tag } from '@/models/tag'
import { SearchIcon } from '@/ui/icon'

import { getSearchResults } from './getSearchResults'
import { SearchResults } from './SearchResults'

export interface SearchBarProps {}

export const SearchBar: React.FunctionComponent<SearchBarProps> = () => {
	const { isFocused, value: query, blur, bind } = useInput({ autoFocus: true })

	useOnKeyPress('Escape', blur)

	useOnKeyPress('Enter', () => {
		console.log('Submitted Query: ', bind.ref.current?.value)
	})

	const [hits, setHits] = useState<Tag[]>([])
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

			return getSearchResults(query)
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
					'mx-auto px-3 py-2',
					'rounded-lg',
					'bg-white',
					'shadow-sm',
					'border',
					isFocused ? 'outline-none ring-primary-500 border-primary-500' : 'border-gray-300',
					'placeholder-gray-400',
					'text-base sm:text-sm'
				)}
			>
				{isLoading ? (
					<div>Loading...</div>
				) : (
					<SearchIcon
						className={classNames('h-5 w-5', 'md:h-6 md:w-6', isFocused ? 'text-primary-500' : 'text-gray-500')}
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
				{!isMobileDevice && <KeyComboSymbol keys={['Meta', 'K']} style={{ color: 'var(--gray-500)' }} />}
			</div>
			<SearchResults hits={hits} />
		</>
	)
}
