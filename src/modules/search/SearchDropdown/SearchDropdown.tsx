import React from 'react'

import { EventKeys } from '@/common/components/keyboard/keys'
import { useOnKeyPress } from '@/common/hooks'
import { Source } from '@/models/source/types'

import { SearchHitsData } from '../types'
import * as S from './SearchDropdown.styles'

export interface SearchDropdownProps {
	onItemClick: (hit: Source) => void
	data: SearchHitsData
	focusedItemIndex: number
	setFocusedItemIndex: (index: number) => void
}

export const SearchDropdown: React.FunctionComponent<SearchDropdownProps> = ({
	focusedItemIndex,
	setFocusedItemIndex,
	onItemClick,
	data
}) => {
	const handleItemClick = (hit: Source) => () => onItemClick(hit)

	useOnKeyPress(EventKeys.ArrowUp, () => {
		if (focusedItemIndex === 0) return
		setFocusedItemIndex(focusedItemIndex - 1)
	})

	useOnKeyPress(EventKeys.ArrowDown, () => {
		if (focusedItemIndex === data.list.length - 1) return
		setFocusedItemIndex(focusedItemIndex + 1)
	})

	useOnKeyPress(EventKeys.Tab, () => {
		if (focusedItemIndex === data.list.length - 1) return
		setFocusedItemIndex(focusedItemIndex + 1)
	})

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
