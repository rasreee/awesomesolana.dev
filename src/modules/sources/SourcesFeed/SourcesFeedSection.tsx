import classNames from 'classnames'
import Link from 'next/link'
import React, { FC } from 'react'

import { QueryOpts } from '@/common/utils'
import { SourceType } from '@/models/source'
import { TagType } from '@/models/tag'

import { getFilteredSourcesPath } from './getFilteredSourcesPath'
import { SourcesFeedGrid } from './SourcesFeedGrid'

export type SourcesFeedSectionHeaderProps = {
	sourceType: SourceType
}

const SourcesFeedSectionHeaderProps: FC<SourcesFeedSectionHeaderProps> = ({ sourceType }) => {
	const caption = `${sourceType.replace('-', ' ')}s`

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
			<Link href={getFilteredSourcesPath(TagType.Categories, [sourceType])}>
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

export type SourcesFeedSectionProps = {
	sourceType: SourceType
	queryOpts?: QueryOpts
}

export const SourcesFeedSection: FC<SourcesFeedSectionProps> = ({ sourceType, queryOpts = {} }) => {
	return (
		<div className={classNames('grid', 'space-y-2')}>
			{/* Section header */}
			<SourcesFeedSectionHeaderProps sourceType={sourceType} />
			{/* Section content below header */}
			<SourcesFeedGrid sourceType={sourceType} queryOpts={queryOpts} spaceYClasses={'space-y-2 md:space-y-0'} />
		</div>
	)
}
