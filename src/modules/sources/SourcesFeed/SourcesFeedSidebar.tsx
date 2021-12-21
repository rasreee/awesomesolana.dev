import { runInAction } from 'mobx'
import { observer } from 'mobx-react-lite'
import React from 'react'

import { Sidebar } from '@/components/Sidebar'
import { SOURCE_TYPES, useSourceCounts } from '@/models/source'
import { SearchFeatureSm } from '@/modules/search'
import { FilterType } from '@/store/filterStore'
import { useStore } from '@/store/store'

export const SourcesFeedSidebar: React.FunctionComponent = observer(() => {
	const { filterStore } = useStore()

	const onClearClick = () => {
		runInAction(() => {
			filterStore.resetStore()
		})
	}

	const onItemClick = (type: FilterType, id: string) => () => {
		if (filterStore.allList.some((filter) => filter.id === id)) {
			return runInAction(() => filterStore.add(type, id))
		}

		runInAction(() => filterStore.remove(type, id))
	}

	const { data: countsData } = useSourceCounts()

	return (
		<Sidebar>
			<Sidebar.Section>
				<SearchFeatureSm />
			</Sidebar.Section>
			<Sidebar.Section>
				<Sidebar.SectionHeader>
					<Sidebar.SectionTitle>Content Types</Sidebar.SectionTitle>
					{filterStore.categories.length > 0 && (
						<button
							onClick={onClearClick}
							className="font-semibold border border-gray-600 rounded-lg hover:bg-gray-200 text-sm px-3 py-1"
						>
							{`Clear (${filterStore.categories.length})`}
						</button>
					)}
				</Sidebar.SectionHeader>
				<Sidebar.List>
					{SOURCE_TYPES.map((id) => (
						<Sidebar.ListItem
							key={id}
							isActive={filterStore.categories.includes(id)}
							onClick={onItemClick(FilterType.Categories, id)}
						>
							{`${id} (${countsData ? countsData[id] : 0})`}
						</Sidebar.ListItem>
					))}
				</Sidebar.List>
			</Sidebar.Section>
		</Sidebar>
	)
})
