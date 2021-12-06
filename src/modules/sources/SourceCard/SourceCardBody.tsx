import classNames from 'classnames'
import React, { useMemo } from 'react'

import { Tag } from '@/common/components/Tag'
import { clampText } from '@/common/utils/clampText'

export interface SourceCardBodyProps {
	description: string
	tags: string[]
}

export const SourceCardBody: React.FunctionComponent<SourceCardBodyProps> = ({ description, tags }) => {
	const descriptionText = useMemo(() => {
		const clampedDescription = clampText(description, 85)

		return clampedDescription.length ? clampedDescription : 'No description.'
	}, [description])

	return (
		<>
			<p className={'text-xs leading-5'}>{descriptionText}</p>

			<div className={classNames('flex items-center gap-3', 'absolute bottom-4')}>
				{tags.map((tag) => (
					<Tag fontSize="xs" key={tag}>
						{tag}
					</Tag>
				))}
			</div>
		</>
	)
}
