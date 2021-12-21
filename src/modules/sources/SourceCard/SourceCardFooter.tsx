import classNames from 'classnames'
import React, { FC } from 'react'

import { Tag } from '@/components/Tag'
import { EyeIcon } from '@/icons/EyeIcon'
import { HeartIconSolid } from '@/icons/HeartIcon'
import { Category } from '@/models/tag/types'

import { SourceStatButton } from './SourceStatButton'

type SourceCardFooterProps = {
	type: Category
	likes: number
	views: number
	updatedAt: string
	onCategoryClick: () => void
	onClickLikes: () => void
}

export const SourceCardFooter: FC<SourceCardFooterProps> = ({
	type,
	likes,
	views,
	updatedAt,
	onClickLikes,
	onCategoryClick
}) => {
	return (
		<>
			<div className={classNames('flex items-center gap-3', 'absolute left-5')}>
				<SourceStatButton value={likes} icon={HeartIconSolid} onClick={onClickLikes} />
				<SourceStatButton value={views} icon={EyeIcon} />
				<Tag fontSize="xs" color="primary" style={{ marginTop: '0.125rem' }} onClick={onCategoryClick}>
					{type}
				</Tag>
			</div>
			<div className="absolute right-5">
				<div className={classNames('overflow-ellipsis line-clamp-1', 'text-xs')}>{updatedAt}</div>
			</div>
		</>
	)
}
