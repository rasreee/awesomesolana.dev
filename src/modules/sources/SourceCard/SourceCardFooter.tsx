import classNames from 'classnames'
import React, { FC } from 'react'

import { Tag } from '@/components/Tag'
import { EyeIcon } from '@/icons/EyeIcon'
import { HeartIconSolid } from '@/icons/HeartIcon'
import { SourceType } from '@/models/source'

import { SourceStatButton } from './SourceStatButton'

type SourceCardFooterProps = {
	type: SourceType
	likes: number
	views: number
	updatedAt: string
	onTypeClick: () => void
	onClickLikes: () => void
}

export const SourceCardFooter: FC<SourceCardFooterProps> = ({
	type,
	likes,
	views,
	updatedAt,
	onClickLikes,
	onTypeClick
}) => {
	return (
		<>
			<div className={classNames('flex items-center gap-3', 'absolute left-5')}>
				<SourceStatButton value={likes} icon={HeartIconSolid} onClick={onClickLikes} />
				<SourceStatButton value={views} icon={EyeIcon} />
				<Tag fontSize="xs" color="primary" style={{ marginTop: '0.125rem' }} onClick={onTypeClick}>
					{type}
				</Tag>
			</div>
			<div className="absolute right-5">
				<div className={classNames('overflow-ellipsis line-clamp-1', 'text-xs')}>{updatedAt}</div>
			</div>
		</>
	)
}
