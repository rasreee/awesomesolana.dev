import React from 'react'

import { Source } from '@/models/source/types'

import { SearchHitsData } from '../types'
import * as S from './SearchDropdown.styles'

export interface SearchDropdownProps {
	onItemClick: (hit: Source) => void
	data: SearchHitsData
	focusedItemIndex: number
}

export const SearchDropdown: React.FunctionComponent<SearchDropdownProps> = ({
	focusedItemIndex,
	onItemClick,
	data
}) => {
	const handleItemClick = (hit: Source) => () => onItemClick(hit)

	return (
		<S.Dropdown>
			<S.Content>
				<S.Section>
					{data.type === 'recents' && <S.SectionTitle>Recents</S.SectionTitle>}
					<S.List role="listbox">
						{data.list.map((hit, index) => (
							<S.ListItem key={hit.id}>
								<S.ItemButton isFocused={index === focusedItemIndex} onClick={handleItemClick(hit)}>
									{hit.title}
								</S.ItemButton>
							</S.ListItem>
						))}
					</S.List>
				</S.Section>
			</S.Content>
		</S.Dropdown>
	)
}
