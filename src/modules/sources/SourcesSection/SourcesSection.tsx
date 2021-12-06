import classNames from 'classnames'
import Link from 'next/link'
import { FC } from 'react'

import { SourceType, useSourcesByType } from '@/models/source'

import { SourceCard } from './SourceCard'

export type SourcesSectionHeaderProps = {
	sourceType: SourceType
}

const SourcesSectionHeader: FC<SourcesSectionHeaderProps> = ({ sourceType }) => {
	const caption = `${sourceType.replace('-', ' ')}s`
	const sourcesPathname = `/sources?type=${sourceType}`

	return (
		<div
			className={classNames(
				'flex',
				'items-center justify-between',
				/* Hacky way to make left side of header match content's starting point */
				'py-2',
				'md:px-5 lg:px-3'
			)}
		>
			<h6 className="text-gray-800 text-sm uppercase font-bold">{caption}</h6>
			<Link href={sourcesPathname}>
				<a
					className={classNames(
						'hover:underline',
						'uppercase text-primary-500 font-semibold text-sm',
						'px-3',
						'py-1 md:py-2',
						'cursor-pointer',
						'rounded-md'
					)}
				>
					{'view all'}
				</a>
			</Link>
		</div>
	)
}

export type SourcesSectionFeedProps = {
	sourceType: SourceType
}

const SourcesSectionFeed: FC<SourcesSectionFeedProps> = ({ sourceType }) => {
	const { data: sources, isLoading } = useSourcesByType(sourceType, { limit: 3 })

	return (
		<div
			className={classNames(
				'grid',
				'grid-cols-1 md:grid-cols-3',
				'content-center',
				'space-y-2 md:space-y-0',
				'space-x-0 md:space-x-4'
			)}
		>
			{isLoading && <div>Loading...</div>}
			{sources?.map((source) => (
				<li className="m-0 p-0" key={source.id}>
					<SourceCard {...source} />
				</li>
			))}
		</div>
	)
}

export type SourcesSectionProps = {
	sourceType: SourceType
}

export const SourcesSection: FC<SourcesSectionProps> = ({ sourceType }) => {
	return (
		<div className={classNames('grid', 'space-y-2')}>
			{/* Section header */}
			<SourcesSectionHeader sourceType={sourceType} />
			{/* Section content below header */}
			<SourcesSectionFeed sourceType={sourceType} />
		</div>
	)
}
