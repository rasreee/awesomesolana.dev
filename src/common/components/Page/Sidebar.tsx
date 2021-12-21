import classNames from 'classnames'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

import { normalizeQueryParam } from '@/common/utils'
import { SOURCE_TYPES, SourceType } from '@/models/source'
import { SearchFeatureSm } from '@/modules/search/SearchFeatureSm'

export interface SidebarProps {}

export const Sidebar: React.FunctionComponent<SidebarProps> = () => {
	const router = useRouter()
	const sourceType = 'type' in router.query ? normalizeQueryParam<SourceType>(router.query.type) : null

	const [selectedTypes, setSelectedTypes] = useState<SourceType[]>(sourceType ? [sourceType] : [])

	const onItemClick = (type: SourceType) => () => {
		if (selectedTypes.includes(type)) {
			setSelectedTypes((prev) => prev.filter((item) => item !== type))
		} else {
			setSelectedTypes((prev) => [...prev, type])
		}
	}

	return (
		<aside className="px-5 flex flex-col gap-5">
			<SearchFeatureSm />
			<ul className="flex flex-col gap-2">
				{SOURCE_TYPES.map((type) => (
					<li key={type}>
						<button
							className={classNames(
								'text-base font-semibold text-gray-700',
								'rounded-md px-2',
								selectedTypes.includes(type) && 'bg-primary-400 text-white'
							)}
							onClick={onItemClick(type)}
						>
							{type}
						</button>
					</li>
				))}
			</ul>
		</aside>
	)
}
