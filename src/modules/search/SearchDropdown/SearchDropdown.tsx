import React from 'react'

import { Source } from '@/models/source/types'

import { SearchData } from '../types'
import { SearchHitItemButton } from './SearchHitItemButton'
import * as S from './styles'

export interface SearchDropdownProps {
	shouldExpand: boolean
	onHitClick: (hit: Source) => void
	data: SearchData
}

export const SearchDropdown: React.FunctionComponent<SearchDropdownProps> = ({ onHitClick, data, shouldExpand }) => {
	const handleHitClick = (hit: Source) => () => onHitClick(hit)

	return (
		<S.Dropdown>
			<S.HitsSection>
				<S.HitsSectionTitle>Recents</S.HitsSectionTitle>
				{data.type === 'recents' && <h2>Recents</h2>}
				<S.HitList>
					{data.list.map((hit) => (
						<S.HitListItem key={hit.id}>
							<S.HitItemButton hit={hit} onClick={handleHitClick(hit)} />
						</S.HitListItem>
					))}
				</S.HitList>
			</S.HitsSection>
		</S.Dropdown>
	)
}
