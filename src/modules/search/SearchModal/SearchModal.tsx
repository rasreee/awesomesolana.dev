import { useRouter } from 'next/router'
import React, { useMemo } from 'react'

import { Modal, ModalProps } from '@/common/components/Modal'
import styled from '@/common/utils/styled'
import { Source } from '@/models/source/types'

import { SearchForm } from './SearchForm'
import { SearchHitItemButton } from './SearchHitItemButton'
import { useSearchModal } from './SearchModalContext'
import { SearchData } from './types'

const HitListItem = styled.li`
	position: relative;
`

const HitList = styled.ul`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
`

const HitCount = styled.p`
	line-height: 100%;
	font-size: 14px;
	font-weight: 500;
	color: ${(props) => props.theme.colors.gray[500]};

	.countVal {
		font-size: 1rem;
		font-weight: 700;
	}
`

const SearchHitsList = ({ data, onHitClick }: { data: Source[]; onHitClick: any }) => {
	return (
		<HitList>
			{data.map((hit) => (
				<HitListItem key={hit.id}>
					<SearchHitItemButton hit={hit} onClick={onHitClick(hit)} />
				</HitListItem>
			))}
		</HitList>
	)
}

export const ExpandedSearchResults = (props: { shouldExpand: boolean; onHitClick: any; data: SearchData }) => {
	if (!props.shouldExpand) return null

	return (
		<>
			<Modal.Body>
				{props.data.type === 'recents' && <h2>Recents</h2>}
				<SearchHitsList data={props.data.list} onHitClick={props.onHitClick} />
			</Modal.Body>
			<Modal.Footer>
				<HitCount>
					<span className="countVal">{props.data.list.length}</span> hits
				</HitCount>
			</Modal.Footer>
		</>
	)
}

export interface SearchModalProps extends Pick<ModalProps, 'isOpen' | 'onRequestClose'> {}

export const SearchModal: React.FunctionComponent<SearchModalProps> = (props) => {
	const router = useRouter()
	const { setInitialQuery, recents, updateRecents, input, hits } = useSearchModal()

	const onHitClick = (hit: Source) => () => {
		updateRecents(hit)
		setInitialQuery(hit.title)
		props.onRequestClose()
		router.push(`/sources/${hit.id}`)
	}

	const effects = useMemo(() => {
		const data: SearchData = hits.length > 0 ? { list: hits, type: 'hits' } : { list: recents, type: 'recents' }

		const shouldExpand = input.value.length > 0 && data.list.length > 0

		return { data, shouldExpand }
	}, [hits, recents])

	return (
		<Modal {...props}>
			<Modal.Header>
				<SearchForm {...input} />
			</Modal.Header>
			<ExpandedSearchResults shouldExpand={effects.shouldExpand} data={effects.data} onHitClick={onHitClick} />
		</Modal>
	)
}
