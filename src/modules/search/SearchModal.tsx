import { useRouter } from 'next/router'
import React, { useEffect, useMemo } from 'react'

import { Modal, ModalProps } from '@/common/components'
import { Tag } from '@/models/tag'

import { ExpandedSearchResults } from './ExpandedSearchResults'
import { getSearchResults } from './getSearchResults'
import { useInitialQuery } from './InitialQueryContext'
import { useRecents } from './RecentsContext'
import { SearchForm } from './SearchForm'
import { SearchResults } from './types'
import { useSearch } from './useSearch'

export interface SearchModalProps extends Pick<ModalProps, 'isOpen' | 'onRequestClose'> {}

export const SearchModal: React.FunctionComponent<SearchModalProps> = (props) => {
	const router = useRouter()
	const { setInitialQuery } = useInitialQuery()
	const { recents, updateRecents } = useRecents()

	const { query, setQuery, hits, setHits, reset } = useSearch()

	useEffect(() => {
		setHits(getSearchResults(query))
	}, [query])

	const onHitClick = (hit: Tag) => () => {
		updateRecents(hit)
		setInitialQuery(hit.name)
		props.onRequestClose()
		router.push(`/tags/${hit.id}`)
	}

	const effects = useMemo(() => {
		const data: SearchResults = hits.length > 0 ? { list: hits, type: 'hits' } : { list: recents, type: 'recents' }

		const shouldExpand = query.length > 0 && data.list.length > 0

		return { data, shouldExpand }
	}, [hits, recents])

	return (
		<Modal {...props}>
			<Modal.Header>
				<SearchForm query={query} onQueryChange={setQuery} />
			</Modal.Header>
			<ExpandedSearchResults shouldExpand={effects.shouldExpand} data={effects.data} onHitClick={onHitClick} />
		</Modal>
	)
}
