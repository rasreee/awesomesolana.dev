import classNames from 'classnames'
import { FC } from 'react'

import { QueryOpts } from '@/common/utils'
import { SourceMatchOpts } from '@/models/source/types'
import { useFindSources } from '@/models/source/useFindSources'

import { SourceCard } from '../SourceCard'

export interface SourcesFeedGridProps {
	matchOpts?: SourceMatchOpts
	queryOpts?: QueryOpts
	spaceXClasses?: string
	spaceYClasses?: string
}

export const SourcesFeedGrid: FC<SourcesFeedGridProps> = ({
	matchOpts,
	queryOpts,
	spaceXClasses = 'space-x-0 md:space-x-4',
	spaceYClasses = 'space-y-2 md:space-y-3'
}) => {
	const { data: sources, isLoading } = useFindSources(matchOpts, queryOpts)

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
