import React, { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react'

import { useDebouncedAndAutofocusedInput } from '@/common/hooks/useInput'
import { Source, useFindSourcesByQuery } from '@/models/source'

import { ExpandedSearchResults } from './ExpandedSearchResults'
import * as S from './Search.styles'
import { SearchForm } from './SearchForm'
import { SearchData } from './types'

export interface SearchProps {
	onHitClick: (hit: Source) => void
	initialQuery: string
	setInitialQuery: Dispatch<SetStateAction<string>>
	recents: Source[]
	setRecents: Dispatch<SetStateAction<Source[]>>
}

export const Search: React.FunctionComponent<SearchProps> = ({
	onHitClick,
	initialQuery,
	setInitialQuery,
	recents,
	setRecents
}) => {
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

	const handleHitClick = (hit: Source) => () => {
		updateRecents(hit)
		setInitialQuery(hit.title)
		onHitClick(hit)
	}

	const effects = useMemo(() => {
		const data: SearchData = hits.length > 0 ? { list: hits, type: 'hits' } : { list: recents, type: 'recents' }

		const shouldExpand = input.value.length > 0 && data.list.length > 0

		return { data, shouldExpand }
	}, [hits, recents])

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
		<>
			<S.Header>
				<SearchForm isLoading={isLoading} {...input} />
			</S.Header>
			<S.Dropdown>
				<ExpandedSearchResults shouldExpand={effects.shouldExpand} data={effects.data} onHitClick={handleHitClick} />
			</S.Dropdown>
		</>
	)
}
