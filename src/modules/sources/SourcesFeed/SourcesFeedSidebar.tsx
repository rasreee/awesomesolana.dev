import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

import { Sidebar } from '@/components'
import { SOURCE_TYPES, useSourceCounts } from '@/models/source'
import { getLanguagesAndFrameworks, Language, TagType } from '@/models/tag'
import { SearchFeatureSm } from '@/modules/search/SearchFeatureSm'
import { useStore } from '@/store/store'

const getFilteredSourcesPath = (type?: TagType, filterIds?: string[]) => {
	return filterIds && filterIds.length > 0 && type ? `/sources?type=${filterIds.join(',')}` : '/sources'
}

export const SourcesFeedSidebar: React.FunctionComponent = observer(() => {
	const router = useRouter()
	const { filterStore } = useStore()

	const [languages, setLanguages] = useState<Language[]>([])

	const onClearClick = () => {
		router.push(getFilteredSourcesPath())
	}

	const onSelect = (type: TagType, id: string, selected: string[]) => {
		const newFilters = [...selected, id]
		router.push(getFilteredSourcesPath(type, [...newFilters, id]))
	}

	const onRemove = (type: TagType, id: string, selected: string[]) => {
		const filtered = selected.filter((selectedId) => selectedId !== id)
		router.push(getFilteredSourcesPath(type, [...filtered, id]))
	}

	const onItemClick = (type: TagType, id: string) => () => {
		const selected: string[] = []

		if (selected.some((selectedId) => selectedId === id)) {
			return onSelect(type, id, selected)
		}

		onRemove(type, id, selected)
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
							onClick={onItemClick(TagType.Categories, id)}
						>
							{`${id} (${countsData ? countsData[id] : 0})`}
						</Sidebar.ListItem>
					))}
				</Sidebar.List>
			</Sidebar.Section>
			<Sidebar.Section>
				<Sidebar.SectionHeader>
					<Sidebar.SectionTitle>Languages</Sidebar.SectionTitle>
					{languages.length > 0 && (
						<button
							onClick={onClearClick}
							className="font-semibold border border-gray-600 rounded-lg hover:bg-gray-200 text-sm px-3 py-1"
						>
							{`Clear (${languages.length})`}
						</button>
					)}
				</Sidebar.SectionHeader>
				<Sidebar.List>
					{getLanguagesAndFrameworks().map((id) => (
						<Sidebar.ListItem key={id} isActive={false} onClick={onItemClick(TagType.Languages, id)}>
							{`${id} (${0})`}
						</Sidebar.ListItem>
					))}
				</Sidebar.List>
			</Sidebar.Section>
		</Sidebar>
	)
})
