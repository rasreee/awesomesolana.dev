import classNames from 'classnames'
import { FC } from 'react'

import { Tag } from '@/common/components/Tag'
import { SourceType } from '@/models/source'
import { EyeIcon } from '@/ui/icon/EyeIcon'
import { HeartIconSolid } from '@/ui/icon/HeartIcon'

import { SourceStatButton } from './SourceStatButton'

type SourceCardFooterProps = {
	type: SourceType
	likes: number
	views: number
	updatedAt: string
	onClickLikes: () => void
}

export const SourceCardFooter: FC<SourceCardFooterProps> = ({ type, likes, views, updatedAt, onClickLikes }) => {
	return (
		<>
			<div className={classNames('flex items-center gap-3', 'absolute left-5')}>
				<SourceStatButton value={likes} icon={HeartIconSolid} onClick={onClickLikes} />
				<SourceStatButton value={views} icon={EyeIcon} />
				<Tag fontSize="xs" color="solanaPrimary" style={{ marginTop: '0.125rem' }}>
					{type}
				</Tag>
			</div>
			<div className="absolute right-5">
				<div className={classNames('overflow-ellipsis line-clamp-1', 'text-xs')}>{updatedAt}</div>
			</div>
		</>
	)
}
