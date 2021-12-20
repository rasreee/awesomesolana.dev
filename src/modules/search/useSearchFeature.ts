import { useCallback, useEffect, useState } from 'react'

import { useDebouncedAndAutofocusedInput } from '@/common/hooks'
import { Source } from '@/models/source'
import { useFindSourcesByQuery } from '@/models/source/useFindSourcesByQuery'

export const useSearchFeature = () => {
	const input = useDebouncedAndAutofocusedInput()

	const [hits, setHits] = useState<Source[]>([])

	const resetHits = () => {
		input.setValue('')
		setHits([])
	}

	const [initialQuery, setInitialQuery] = useState<string>('')
	const [recents, setRecents] = useState<Source[]>([])

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

	const findSourcesByQuery = useFindSourcesByQuery()

	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		const query = input.bind.ref.current?.value
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

	return {
		initialQuery,
		setInitialQuery,
		updateRecents,
		recents,
		setRecents,
		hits,
		setHits,
		resetHits,
		isLoading,
		input
	}
}
