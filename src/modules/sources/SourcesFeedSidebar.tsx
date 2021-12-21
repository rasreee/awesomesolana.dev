import { useRouter } from 'next/router'
import React from 'react'

import { Sidebar } from '@/common/components'
import { SOURCE_TYPES, SourceType } from '@/models/source'
import { SearchFeatureSm } from '@/modules/search/SearchFeatureSm'
import { useSourcesFeed } from '@/modules/sources/SourcesFeedContext'

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

	return (
		<Sidebar>
			<Sidebar.Header>
				<SearchFeatureSm />
			</Sidebar.Header>
			<Sidebar.Body>
				<Sidebar.List>
					{SOURCE_TYPES.map((type) => (
						<Sidebar.ListItem key={type} isActive={sourceTypes.includes(type)} onClick={onItemClick(type)}>
							{type}
						</Sidebar.ListItem>
					))}
				</Sidebar.List>
			</Sidebar.Body>
		</Sidebar>
	)
}
