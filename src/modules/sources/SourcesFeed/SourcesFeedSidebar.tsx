import { useRouter } from 'next/router'
import React from 'react'

import { Sidebar } from '@/common/components'
import { SOURCE_TYPES, SourceType, useSourceCounts } from '@/models/source'
import { getLanguagesAndFrameworks } from '@/models/tag'
import { SearchFeatureSm } from '@/modules/search/SearchFeatureSm'
import { useSourcesFeed } from '@/modules/sources/SourcesFeed/SourcesFeedContext'

import { getSourcesRoutePath } from './getSourcesRoutePath'

export interface SidebarProps {}

export const SourcesFeedSidebar: React.FunctionComponent<SidebarProps> = () => {
	const router = useRouter()
	const { sourceTypes } = useSourcesFeed()

	const onItemClick = (type: SourceType) => () => {
		router.push(
			getSourcesRoutePath(
				sourceTypes.includes(type) ? sourceTypes.filter((item) => item !== type) : [...sourceTypes, type]
			)
		)
	}

	const onClearClick = () => {
		router.push(getSourcesRoutePath())
	}

	const onLanguageAndFrameworkClick = (id: string) => {
		return () => {
			console.log(`onLanguageAndFrameworkClick: ${id}`)
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
					<Sidebar.SectionTitle>Content Types</Sidebar.SectionTitle>
					{sourceTypes.length > 0 && (
						<button
							onClick={onClearClick}
							className="font-semibold border border-gray-600 rounded-lg hover:bg-gray-200 text-sm px-3 py-1"
						>
							{`Clear (${sourceTypes.length})`}
						</button>
					)}
				</Sidebar.SectionHeader>
				<Sidebar.List>
					{SOURCE_TYPES.map((type) => (
						<Sidebar.ListItem key={type} isActive={sourceTypes.includes(type)} onClick={onItemClick(type)}>
							{`${type} (${countsData ? countsData[type] : 0})`}
						</Sidebar.ListItem>
					))}
				</Sidebar.List>
			</Sidebar.Section>
			<Sidebar.Section>
				<Sidebar.SectionHeader>
					<Sidebar.SectionTitle>Languages and Frameworks</Sidebar.SectionTitle>
					{sourceTypes.length > 0 && (
						<button
							onClick={onClearClick}
							className="font-semibold border border-gray-600 rounded-lg hover:bg-gray-200 text-sm px-3 py-1"
						>
							{`Clear (${sourceTypes.length})`}
						</button>
					)}
				</Sidebar.SectionHeader>
				<Sidebar.List>
					{getLanguagesAndFrameworks().map((id) => (
						<Sidebar.ListItem key={id} isActive={false} onClick={onLanguageAndFrameworkClick(id)}>
							{`${id} (${0})`}
						</Sidebar.ListItem>
					))}
				</Sidebar.List>
			</Sidebar.Section>
		</Sidebar>
	)
}
