import { observer } from 'mobx-react-lite'

import { Sidebar } from '@/components/Sidebar'
import { SOURCE_TYPES, useSourceCounts } from '@/models/source'
import { SearchFeatureSm } from '@/modules/search'
import { FilterType } from '@/store/filter'
import { useStore } from '@/store/store'

export const SourcesFeedSidebar = observer(function _SourcesFeedSidebar() {
	const { filterStore } = useStore()

	const onItemClick = (type: FilterType, id: string) => () => {
		if (Object.values(filterStore.all).some((filters) => filters.includes(id))) {
			filterStore.remove(type, id)
		} else {
			filterStore.add(type, id)
		}
	}

	const { data: countsData } = useSourceCounts()

	return (
		<Sidebar>
			<Sidebar.Section>
				<SearchFeatureSm />
			</Sidebar.Section>
			<Sidebar.Section>
				<Sidebar.SectionHeader>
					<Sidebar.SectionTitle>Categories</Sidebar.SectionTitle>
					{filterStore.all.categories.length > 0 && (
						<button
							onClick={filterStore.resetStore}
							className="font-semibold border border-gray-600 rounded-lg hover:bg-gray-200 text-sm px-3 py-1"
						>
							{`Clear (${filterStore.all.categories.length})`}
						</button>
					)}
				</Sidebar.SectionHeader>
				<Sidebar.List>
					{SOURCE_TYPES.map((id) => (
						<Sidebar.ListItem
							key={id}
							isActive={filterStore.all.categories.includes(id)}
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
