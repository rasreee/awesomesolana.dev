import { computed } from 'mobx'
import { observer } from 'mobx-react-lite'

import { Sidebar } from '@/components/Sidebar'
import { useSourceCounts } from '@/models/source/useSourceCounts'
import { categoriesConst } from '@/models/tag/types'
import { SearchFeatureSm } from '@/modules/search'
import { FilterArgs, FilterType } from '@/store/filter'
import { useStore } from '@/store/store'

export const SourcesFeedSidebar = observer(function _SourcesFeedSidebar() {
	const { filterStore } = useStore()

	const { data: countsData } = useSourceCounts()

	return (
		<Sidebar>
			<Sidebar.Section>
				<SearchFeatureSm />
			</Sidebar.Section>
			<Sidebar.Section>
				<Sidebar.SectionHeader>
					<Sidebar.SectionTitle>Categories</Sidebar.SectionTitle>
					{filterStore.categories.length > 0 && (
						<button
							onClick={filterStore.resetStore}
							className="font-semibold border border-gray-600 rounded-lg hover:bg-gray-200 text-sm px-3 py-1"
						>
							{`Clear (${filterStore.categories.length})`}
						</button>
					)}
				</Sidebar.SectionHeader>
				<Sidebar.List>
					{categoriesConst.map((id) => {
						const args = { id, type: FilterType.Categories } as FilterArgs
						const alreadyActiveComp = computed(() => filterStore.has(args))

						return (
							<Sidebar.ListItem
								key={id}
								isActive={alreadyActiveComp.get()}
								onClick={() => {
									const alreadyActive = alreadyActiveComp.get()
									console.log({ alreadyActive })
									alreadyActive ? filterStore.remove(args) : filterStore.add(args)
								}}
							>
								{`${id} (${countsData ? countsData[id] : 0})`}
							</Sidebar.ListItem>
						)
					})}
				</Sidebar.List>
			</Sidebar.Section>
		</Sidebar>
	)
})
