import { useRouter } from 'next/router'
import React, { useMemo } from 'react'

import { Modal, ModalProps } from '@/common/components/Modal'
import { Source } from '@/models/source/types'

import { ExpandedSearchResults } from './ExpandedSearchResults'
import { SearchForm } from './SearchForm'
import { useSearchModal } from './SearchModalContext'
import { SearchData } from './types'

export interface SearchModalProps extends Pick<ModalProps, 'isOpen' | 'onRequestClose'> {}

export const SearchModal: React.FunctionComponent<SearchModalProps> = (props) => {
	const router = useRouter()
	const { setInitialQuery, recents, updateRecents, query, setQuery, hits, isFocused } = useSearchModal()

	const onHitClick = (hit: Source) => () => {
		updateRecents(hit)
		setInitialQuery(hit.title)
		props.onRequestClose()
		router.push(`/sources/${hit.id}`)
	}

	const effects = useMemo(() => {
		const data: SearchData = hits.length > 0 ? { list: hits, type: 'hits' } : { list: recents, type: 'recents' }

		const shouldExpand = query.length > 0 && data.list.length > 0

		return { data, shouldExpand }
	}, [hits, recents])

	return (
		<Modal {...props}>
			<Modal.Header>
				<SearchForm query={query} onQueryChange={setQuery} isFocused={isFocused} />
			</Modal.Header>
			<ExpandedSearchResults shouldExpand={effects.shouldExpand} data={effects.data} onHitClick={onHitClick} />
		</Modal>
	)
}
