import React from 'react'

import { Source } from '@/models/source/types'

import { SearchHitsData } from '../types'
import * as S from './styles'

export interface SearchDropdownProps {
	onHitClick: (hit: Source) => void
	data: SearchHitsData
}

export const SearchDropdown: React.FunctionComponent<SearchDropdownProps> = ({ onHitClick, data }) => {
	const handleHitClick = (hit: Source) => () => onHitClick(hit)

	return (
		<S.Dropdown>
			<S.Content>
				<S.Section>
					{data.type === 'recents' && <S.SectionTitle>Recents</S.SectionTitle>}
					<S.List>
						{data.list.map((hit) => (
							<S.ListItem key={hit.id}>
								<S.ItemButton onClick={handleHitClick(hit)}>{hit.title}</S.ItemButton>
							</S.ListItem>
						))}
					</S.List>
				</S.Section>
			</S.Content>
		</S.Dropdown>
	)
}
