import { useRouter } from 'next/router'
import React, { useMemo } from 'react'

import { Modal } from '@/common/components/Modal'
import { useKeyCombo } from '@/common/hooks'
import { useModal } from '@/common/hooks/useModal'
import { Source } from '@/models/source/types'

import { ExpandedSearchResults } from './ExpandedSearchResults'
import { SearchBarButton } from './SearchBarButton'
import { SearchForm } from './SearchForm'
import { SearchData } from './types'
import { useSearchFeature } from './useSearchFeature'

export interface SearchFeatureProps {}

export const SearchFeature: React.FunctionComponent<SearchFeatureProps> = () => {
	const router = useRouter()
	const modal = useModal()
	useKeyCombo('Meta+k', modal.open)

	const { setInitialQuery, recents, updateRecents, input, hits } = useSearchFeature()

	const onHitClick = (hit: Source) => () => {
		updateRecents(hit)
		setInitialQuery(hit.title)
		modal.close()
		router.push(`/sources/${hit.id}`)
	}

	const effects = useMemo(() => {
		const data: SearchData = hits.length > 0 ? { list: hits, type: 'hits' } : { list: recents, type: 'recents' }

		const shouldExpand = input.value.length > 0 && data.list.length > 0

		return { data, shouldExpand }
	}, [hits, recents])

	return (
		<>
			<>
				<SearchBarButton onClick={modal.open} />
				<Modal {...modal.bind}>
					<Modal.Header>
						<header>
							<SearchForm {...input} />
						</header>
					</Modal.Header>
					<ExpandedSearchResults shouldExpand={effects.shouldExpand} data={effects.data} onHitClick={onHitClick} />
				</Modal>
			</>
		</>
	)
}
