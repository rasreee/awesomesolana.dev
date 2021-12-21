import React from 'react'

import { Source } from '@/models/source/types'

import { SearchData } from '../types'
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
			{data.list.length > 0 && (
				<S.HitsSection>
					{data.type === 'recents' && <S.HitsSectionTitle>Recents</S.HitsSectionTitle>}
					<S.HitList>
						{data.list.map((hit) => (
							<S.HitListItem key={hit.id}>
								<S.HitItemButton onClick={handleHitClick(hit)}>{hit.title}</S.HitItemButton>
							</S.HitListItem>
						))}
					</S.HitList>
				</S.HitsSection>
			)}
		</S.Dropdown>
	)
}
