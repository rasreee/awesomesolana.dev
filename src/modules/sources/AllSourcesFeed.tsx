import classNames from 'classnames'
import React from 'react'

import { Padding } from '@/common/atoms'
import { QueryOpts } from '@/common/utils'
import { SOURCE_TYPES } from '@/models/source'

import { SourcesFeedGrid } from './SourcesFeedGrid'

export interface AllSourcesFeedProps {
	limit?: number
}

export const AllSourcesFeed: React.FunctionComponent<AllSourcesFeedProps> = ({ limit }) => {
	const queryOpts: QueryOpts = {}

	if (limit) {
		queryOpts.limit = limit
	}

	return (
		<div className={classNames('flex flex-col', 'space-y-6 md:space-y-12', 'py-2 md:py-4', 'mx-auto')}>
			{SOURCE_TYPES.map((sourceType) => (
				<Padding key={sourceType} px={3}>
					<SourcesFeedGrid queryOpts={queryOpts} />
				</Padding>
			))}
		</div>
	)
}
