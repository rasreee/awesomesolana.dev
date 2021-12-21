import Link from 'next/link'
import React from 'react'

import { SOURCE_TYPES } from '@/models/source'
import { SearchFeature } from '@/modules/search'

export interface SidebarProps {}

export const Sidebar: React.FunctionComponent<SidebarProps> = () => {
	return (
		<aside className="px-5 flex flex-col gap-5">
			<SearchFeature />
			<ul className="flex flex-col gap-1">
				{SOURCE_TYPES.map((type) => (
					<li key={type}>
						<Link href={`/sources?type=${type}`}>
							<a>{type}</a>
						</Link>
					</li>
				))}
			</ul>
		</aside>
	)
}
