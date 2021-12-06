import classNames from 'classnames'
import { FC } from 'react'

import { EyeIcon } from '@/ui/icon/EyeIcon'
import { HeartIconSolid } from '@/ui/icon/HeartIcon'

import { SourceStatButton } from './SourceStatButton'

type SourceCardFooterProps = {
	likes: number
	views: number
	updatedAt: string
	onClickLikes: () => void
}

export const SourceCardFooter: FC<SourceCardFooterProps> = ({ likes, views, updatedAt, onClickLikes }) => {
	return (
		<>
			<div className={classNames('flex items-center gap-3', 'absolute left-5')}>
				<SourceStatButton value={likes} icon={HeartIconSolid} onClick={onClickLikes} />
				<SourceStatButton value={views} icon={EyeIcon} />
			</div>
			<div className="absolute right-5">
				<div className={classNames('overflow-ellipsis line-clamp-1', 'text-xs')}>{updatedAt}</div>
			</div>
		</>
	)
}
