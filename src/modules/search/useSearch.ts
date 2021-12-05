import { useDebouncedState } from '@react-hookz/web'
import { useState } from 'react'

import { Tag } from '@/models/tag'

export const useSearch = () => {
	const [query, setQuery] = useDebouncedState('', 200)
	const [hits, setHits] = useState<Tag[]>([])

	const reset = () => {
		setQuery('')
		setHits([])
	}

	return { query, setQuery, hits, setHits, reset }
}
