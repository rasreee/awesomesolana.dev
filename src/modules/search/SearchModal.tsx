import React, { useCallback, useEffect, useMemo, useState } from 'react'

import { Modal, useModal } from '@/common/components/Modal'
import { useAutoComplete, useDebouncedAndAutofocusedInput } from '@/common/hooks'
import { useFindSourcesByQuery } from '@/models/source'
import { Source } from '@/models/source/types'

import { SearchBar } from './SearchBar'
import { SearchDropdown } from './SearchDropdown'
import { SearchHitsData } from './types'

export interface SearchModalProps extends ReturnType<typeof useModal> {
	onItemClick: (hit: Source) => void
}

export const SearchModal: React.FunctionComponent<SearchModalProps> = ({ onItemClick, ...props }) => {
	const [initialQuery, setInitialQuery] = useState<string>('')
	const [recents, setRecents] = useState<Source[]>([])

	const input = useDebouncedAndAutofocusedInput()

	const [hits, setHits] = useState<Source[]>([])

	const resetHits = () => {
		input.setValue('')
		setHits([])
	}

	const updateRecents = useCallback(
		(hit: Source) => {
			// Create updated clone of recents
			let newRecents = [...recents].slice(0, 9)

			if (newRecents.some((r) => r.id === hit.id)) {
				newRecents = newRecents.filter((r) => r.id !== hit.id)
			}

			newRecents.unshift(hit)
			// Update the list
			setRecents(newRecents)
		},
		[recents]
	)

	const handleItemClick = (hit: Source) => () => {
		updateRecents(hit)
		setInitialQuery(hit.title)
		onItemClick(hit)
	}

	const searchData = useMemo(() => {
		const data = hits.length > 0 ? { list: hits, type: 'hits' } : { list: recents, type: 'recents' }

		return data as SearchHitsData
	}, [hits, recents])

	const { selectedItemIndex, onKeyDown } = useAutoComplete(searchData.list, handleItemClick)

	const findSourcesByQuery = useFindSourcesByQuery()

	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		const query = input.value
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
	}, [input.value])

	return (
		<Modal {...props}>
			<SearchBar isLoading={isLoading} {...input} />
			{searchData.list.length > 0 && (
				<SearchDropdown data={searchData} focusedItemIndex={selectedItemIndex} onItemClick={handleItemClick} />
			)}
		</Modal>
	)
}
