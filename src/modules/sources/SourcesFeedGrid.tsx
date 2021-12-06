import classNames from 'classnames'
import React, { FC } from 'react'

import { SourceType, useSourcesByType } from '@/models/source'

import { SourceCard } from './SourceCard'

export type SourcesFeedGridProps = {
	sourceType: SourceType
	opts?: { limit: number }
	spaceXClasses?: string
	spaceYClasses?: string
}

export const SourcesFeedGrid: FC<SourcesFeedGridProps> = ({
	sourceType,
	opts,
	spaceXClasses = 'space-x-0 md:space-x-4',
	spaceYClasses = 'space-y-2 md:space-y-3'
}) => {
	const { data: sources, isLoading } = useSourcesByType(sourceType, opts)

	return (
		<div className={classNames('grid', 'grid-cols-1 md:grid-cols-3', 'content-center', spaceYClasses, spaceXClasses)}>
			{isLoading && <div>Loading...</div>}
			{sources?.map((source) => (
				<li className="m-0 p-0" key={source.id}>
					<SourceCard {...source} />
				</li>
			))}
		</div>
	)
}
