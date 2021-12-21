import classNames from 'classnames'
import React, { FC } from 'react'

import { QueryOpts } from '@/common/utils'
import { SourceType, useSourcesByType } from '@/models/source'

import { SourceCard } from '../SourceCard'

export interface SourcesFeedGridProps {
	sourceType?: SourceType
	queryOpts?: QueryOpts
	spaceXClasses?: string
	spaceYClasses?: string
}

export const SourcesFeedGrid: FC<SourcesFeedGridProps> = ({
	sourceType,
	queryOpts,
	spaceXClasses = 'space-x-0 md:space-x-4',
	spaceYClasses = 'space-y-2 md:space-y-3'
}) => {
	const { data: sources, isLoading } = useSourcesByType(sourceType, queryOpts)

	return (
		<div className={classNames('grid', 'grid-cols-1 md:grid-cols-3', spaceYClasses, spaceXClasses)}>
			{isLoading && <div>Loading...</div>}
			{sources?.map((source) => (
				<li className="m-0 p-0" key={source.id}>
					<SourceCard {...source} />
				</li>
			))}
		</div>
	)
}
