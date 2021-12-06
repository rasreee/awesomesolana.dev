import classNames from 'classnames'
import React, { FC, useMemo } from 'react'

import { clampText } from '@/common/utils/clampText'
import { LinkIcon } from '@/ui/icon/LinkIcon'

type SourceCardHeaderProps = { title: string; url: string; onClickLink: () => void }

export const SourceCardHeader: FC<SourceCardHeaderProps> = ({ title, url, onClickLink }) => {
	const clampedTitle = useMemo(() => clampText(title, 26), [title])

	return (
		<div className="flex flex-col px-0 max-w-full">
			<button
				onClick={onClickLink}
				className={classNames(
					'rounded-md',
					'md:pb-1',
					'font-bold text-base text-gray-900',
					'hover:text-primary-500 active:text-primary-800',
					'overflow-ellipsis',
					'max-w-max',
					'text-left',
					'px-2'
				)}
			>
				{clampedTitle}
			</button>
			<button
				onClick={onClickLink}
				className={classNames(
					'flex items-center',
					'gap-1.5',
					'text-gray-600',
					'text-xs underline font-semibold',
					'hover:text-primary-500',
					'active:text-primary-800',
					'cursor-pointer',
					'px-2'
				)}
			>
				<LinkIcon height="13" width="13" />
				<span className={classNames('overflow-ellipsis line-clamp-1', 'p-0 m-0 text-left')}>{url}</span>
			</button>
		</div>
	)
}
