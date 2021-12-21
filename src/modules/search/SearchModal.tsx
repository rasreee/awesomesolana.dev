import { useUpdateEffect } from '@react-hookz/web'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useMemo, useState } from 'react'

import { Modal, useModal } from '@/common/components/Modal'
import { useAutoComplete, useDebouncedAndAutofocusedInput } from '@/common/hooks'
import { useFindSourcesByQuery } from '@/models/source'
import { Source } from '@/models/source/types'

import { SearchBar } from './SearchBar'
import { SearchDropdown } from './SearchDropdown'
import { SearchHitsData } from './types'

export interface SearchModalProps extends ReturnType<typeof useModal> {}

export const SearchModal: React.FunctionComponent<SearchModalProps> = (props) => {
	const [initialQuery, setInitialQuery] = useState<string>('')
	const [recents, setRecents] = useState<Source[]>([])

	const input = useDebouncedAndAutofocusedInput()

	const [hits, setHits] = useState<Source[]>([])

	const resetHits = () => {
		input.setValue('')
		setHits([])
	}

	useUpdateEffect(resetHits, [props.isOpen])

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

	const router = useRouter()

	const handleItemClick = (hit: Source) => () => {
		console.log('HIT CLICKED:', hit)
		updateRecents(hit)
		setInitialQuery(hit.title)
		router.push(`/sources/${hit.id}`)
		props.close()
	}

	const searchData = useMemo(() => {
		const data = hits.length > 0 ? { list: hits, type: 'hits' } : { list: recents, type: 'recents' }

		return data as SearchHitsData
	}, [hits, recents])

	const { selectedItemIndex, onKeyDown, setSelectedItemIndex } = useAutoComplete(searchData.list, handleItemClick)

	const findSourcesByQuery = useFindSourcesByQuery()

	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		const query = input.value
		if (!query) return setHits([])

		setIsLoading(true)

		findSourcesByQuery(query).then((res) => {
			console.log('Hits: ', res)
			setHits(res)
			setIsLoading(false)
		})
	}, [input.value])

	return (
		<Modal {...props}>
			<SearchBar isLoading={isLoading} {...input} onKeyDown={onKeyDown} />
			{searchData.list.length > 0 && (
				<SearchDropdown
					data={searchData}
					setFocusedItemIndex={setSelectedItemIndex}
					focusedItemIndex={selectedItemIndex}
					onItemClick={handleItemClick}
				/>
			)}
		</Modal>
	)
}
