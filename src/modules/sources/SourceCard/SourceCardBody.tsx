import classNames from 'classnames'
import React, { useMemo } from 'react'

import { Tag } from '@/common/components/Tag'
import { clampText } from '@/common/utils/clampText'

export interface SourceCardBodyProps {
	description?: string
	tags: string | string[]
}

const parseSourceTags = (tags: string | string[]): string[] => {
	if (typeof tags !== 'string') return tags

	try {
		const parsedTags = JSON.parse(tags)

		return parsedTags
	} catch (err) {
		console.log('Failed to parseSourceTags: ', err)

		return []
	}
}

export const SourceCardBody: React.FunctionComponent<SourceCardBodyProps> = ({ description, tags }) => {
	const descriptionText = useMemo(() => {
		const clampedDescription = clampText(description ?? '', 85)

		return clampedDescription.length ? clampedDescription : 'No description.'
	}, [description])

	return (
		<>
			<p className={'text-xs leading-5'}>{descriptionText}</p>

			<div className={classNames('flex items-center gap-3', 'overflow-x-scroll', 'absolute bottom-4')}>
				{parseSourceTags(tags).map((tag, i) => (
					<Tag key={i}>{tag}</Tag>
				))}
			</div>
		</>
	)
}
