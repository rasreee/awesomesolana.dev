import { useCallback, useState } from 'react'

import { Source } from '@/models/source/types'

export const useSearchHistory = () => {
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
			setInitialQuery(hit.title)
		},
		[recents]
	)

	return { initialQuery, setInitialQuery, recents, setRecents, updateRecents }
}
