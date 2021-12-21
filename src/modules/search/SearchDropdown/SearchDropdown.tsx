import { useUpdateEffect } from '@react-hookz/web'
import React, { createRef, useMemo } from 'react'

import { EventKeys } from '@/common/components/keyboard/keys'
import { useOnKeyPress } from '@/common/hooks'
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
					<S.List role="listbox">{data.list.map((hit, index) => renderItem(hit, index))}</S.List>
				</S.Section>
			</S.Content>
		</S.Dropdown>
	)
}
