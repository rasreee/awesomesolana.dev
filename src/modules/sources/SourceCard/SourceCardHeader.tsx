import classNames from 'classnames'
import Link from 'next/link'
import React, { FC } from 'react'

import { Tag } from '@/common/components/Tag'
import { SourceType } from '@/models/source/source.types'
import { LinkIcon } from '@/ui/icon/LinkIcon'

type SourceCardHeaderProps = { title: string; url: string; type: SourceType }

export const SourceCardHeader: FC<SourceCardHeaderProps> = ({ title, url, type }) => {
	return (
		<div className="flex flex-col px-2">
			<div className="flex items-center gap-4">
				<Link href={url}>
					<a
						className={classNames(
							'rounded-md',
							'md:pb-1',
							'font-bold text-base text-gray-900',
							'hover:text-primary-500 active:text-primary-800',
							'overflow-ellipsis line-clamp-1'
						)}
					>
						{title}
					</a>
				</Link>
				<Tag color={'primary'}>{type}</Tag>
			</div>
			<Link href={url}>
				<a
					className={classNames(
						'flex items-center',
						'gap-1.5',
						'text-gray-600',
						'text-xs underline font-semibold',
						'hover:text-primary-500',
						'active:text-primary-800',
						'cursor-pointer'
					)}
				>
					<LinkIcon height="13" width="13" />
					<span className={classNames('overflow-ellipsis line-clamp-1')}>{url}</span>
				</a>
			</Link>
		</div>
	)
}
