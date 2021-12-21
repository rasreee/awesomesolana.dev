import React from 'react'

import { formatSourceTypeLabel } from '@/models/source'
import { categoriesConst, Category, Source } from '@/models/source/types'

import { SearchHitsData } from '../types'
import * as S from './SearchDropdown.styles'

export type SearchDropdownSectionProps = {
	type: Category | 'recents'
	items: Source[]
	renderItem: (hit: Source, index: number) => JSX.Element
}

export const SearchDropdownSection: React.FunctionComponent<SearchDropdownSectionProps> = ({
	type,
	items,
	renderItem,
	...props
}) => {
	if (items.length === 0) return null

	return (
		<S.Content {...props}>
			<S.Section>
				<S.SectionTitle>{type === 'recents' ? 'Recents' : formatSourceTypeLabel(type)}</S.SectionTitle>
				<S.List role="listbox">
					{items.map((hit, index) => (
						<S.ListItem key={hit.id}>{renderItem(hit, index)}</S.ListItem>
					))}
				</S.List>
			</S.Section>
		</S.Content>
	)
}

export interface SearchDropdownProps {
	data: SearchHitsData
	renderItem: (hit: Source, index: number) => JSX.Element
	show: boolean
}

export const SearchDropdown: React.FunctionComponent<SearchDropdownProps> = ({ show, renderItem, data }) => {
	if (!show) return null

	return (
		<S.Dropdown>
			{categoriesConst.map((sourceType) => (
				<SearchDropdownSection
					key={sourceType}
					type={sourceType}
					items={data.list.filter((item) => item.category === sourceType)}
					renderItem={renderItem}
				/>
			))}
		</S.Dropdown>
	)
}
