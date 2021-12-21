import React from 'react'

import { SearchFeature } from '@/modules/search'

export interface SidebarProps {}

export const Sidebar: React.FunctionComponent<SidebarProps> = () => {
	return (
		<aside>
			<SearchFeature />
			<ul className="flex flex-col gap-1">
				<li>Item 1</li>
				<li>Item 2</li>
				<li>Item 3</li>
				<li>Item 4</li>
			</ul>
		</aside>
	)
}
