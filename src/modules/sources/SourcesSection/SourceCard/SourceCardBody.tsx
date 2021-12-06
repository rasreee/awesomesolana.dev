import classNames from 'classnames'
import React, { useEffect } from 'react'

import { Tag } from '@/modules/common/Tag'

export interface SourceCardBodyProps {
	description: string
	tags: string[]
}

export const SourceCardBody: React.FunctionComponent<SourceCardBodyProps> = ({ description, tags }) => {
	useEffect(() => {
		console.log(tags)
	}, [])

	return (
		<>
			<p>{description}</p>
			<div className={classNames('flex items-center gap-3', 'absolute bottom-4')}>
				{tags.map((tag) => (
					<Tag key={tag}>{tag}</Tag>
				))}
			</div>
		</>
	)
}
