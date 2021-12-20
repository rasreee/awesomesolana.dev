import { useRouter } from 'next/router'
import React, { useMemo } from 'react'

import { Modal } from '@/common/components/Modal'
import { useKeyCombo } from '@/common/hooks'
import { useModal } from '@/common/hooks/useModal'
import styled from '@/common/utils/styled'
import { Source } from '@/models/source/types'

import { ExpandedSearchResults } from './ExpandedSearchResults'
import { SearchBarButton } from './SearchBarButton'
import { SearchForm } from './SearchForm'
import { SearchData } from './types'
import { useSearchFeature } from './useSearchFeature'

export const SearchModalHeader = styled.header`
	position: relative;
	z-index: 1;
	display: flex;
	flex: none;
	padding: 0 1rem;
	align-items: center;
	border-bottom-width: 1px;
	--tw-border-opacity: 1;
	border-color: rgb(241 245 249 / var(--tw-border-opacity));
`

export const SearchModalDropdown = styled.div``

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
						<SearchModalHeader>
							<SearchForm {...input} />
						</SearchModalHeader>
					</Modal.Header>
					<SearchModalDropdown>
						<ExpandedSearchResults shouldExpand={effects.shouldExpand} data={effects.data} onHitClick={onHitClick} />
					</SearchModalDropdown>
				</Modal>
			</>
		</>
	)
}
