import React from 'react'

import { Source } from '@/models/source/types'

import { SearchHitsData } from '../types'
import * as S from './SearchDropdown.styles'

export interface SearchDropdownProps {
	data: SearchHitsData
	renderItem: (hit: Source, index: number) => JSX.Element
}

export const SearchDropdown: React.FunctionComponent<SearchDropdownProps> = ({ renderItem, data }) => {
	return (
		<S.Dropdown>
			<S.Content>
				<S.Section>
					{data.type === 'recents' && <S.SectionTitle>Recents</S.SectionTitle>}
					<S.List role="listbox">
						{data.list.map((hit, index) => (
							<S.ListItem key={hit.id}>{renderItem(hit, index)}</S.ListItem>
						))}
					</S.List>
				</S.Section>
			</S.Content>
		</S.Dropdown>
	)
}
