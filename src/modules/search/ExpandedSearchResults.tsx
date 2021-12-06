import React from 'react'

import { Modal } from '@/common/components'
import { Tag } from '@/models/tag'
import { colors } from '@/ui/foundations'
import styled from '@/ui/styled'

import { SearchHitButton } from './SearchHitButton'
import { SearchResults } from './types'

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
	color: ${colors.gray['500']};

	.countVal {
		font-size: 1rem;
		font-weight: 700;
	}
`

const SearchHits = ({ data, onHitClick }: { data: Tag[]; onHitClick: any }) => {
	return (
		<HitList>
			{data.map((hit) => (
				<HitListItem key={hit.id}>
					<SearchHitButton hit={hit} onClick={onHitClick(hit)} />
				</HitListItem>
			))}
		</HitList>
	)
}

export const ExpandedSearchResults = (props: { shouldExpand: boolean; onHitClick: any; data: SearchResults }) => {
	if (!props.shouldExpand) return null

	return (
		<>
			<Modal.Body>
				{props.data.type === 'recents' && <h2>Recents</h2>}
				<SearchHits data={props.data.list} onHitClick={props.onHitClick} />
			</Modal.Body>
			<Modal.Footer>
				<HitCount>
					<span className="countVal">{props.data.list.length}</span> hits
				</HitCount>
			</Modal.Footer>
		</>
	)
}
