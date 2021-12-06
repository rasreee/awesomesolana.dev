import classNames from 'classnames'
import React, { useMemo } from 'react'

import { Tag } from '@/common/components/Tag'
import { clampText } from '@/common/utils/clampText'

export interface SourceCardBodyProps {
	description: string
	tags: string[]
}

export const SourceCardBody: React.FunctionComponent<SourceCardBodyProps> = ({ description, tags }) => {
	const clampedDescription = useMemo(() => clampText(description, 70), [description])

	return (
		<>
			{clampedDescription && <p className="text-xs leading-5">{clampedDescription}</p>}

			<div className={classNames('flex items-center gap-3', 'absolute bottom-4')}>
				{tags.map((tag) => (
					<Tag key={tag}>{tag}</Tag>
				))}
			</div>
		</>
	)
}
