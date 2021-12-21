import React from 'react'

import { Modal } from '@/common/components/Modal'
import { Source } from '@/models/source/types'
import styled from '@/styled'

import { SearchHitItemButton } from '../SearchHitItemButton'
import { SearchData } from '../types'

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

export type ExpandedSearchResultsProps = { shouldExpand: boolean; onHitClick: any; data: SearchData }

export const ExpandedSearchResults = (props: ExpandedSearchResultsProps) => {
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
