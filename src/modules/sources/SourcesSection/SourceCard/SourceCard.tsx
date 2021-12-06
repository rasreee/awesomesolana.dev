import classNames from 'classnames'

import { Source } from '@/models/source/source.types'

import { SourceCardFooter } from './SourceCardFooter'
import { SourceCardHeader } from './SourceCardHeader'

export interface SourceCardProps extends Source {}

export function SourceCard({ id, type, title, description, likes, updatedAt, url, tags, views }: SourceCardProps) {
	return (
		<div
			className={classNames(
				'mobile:w-full h-56',
				'bg-white',
				'rounded-lg',
				'flex flex-col',
				'shadow-sm hover:shadow-lg',
				'mobile:mx-auto'
			)}
		>
			{/* Header */}
			<div className={classNames('flex items-center justify-between', 'overflow-hidden', 'px-4 pt-2', 'h-16')}>
				<SourceCardHeader {...{ type, title, url }} />
			</div>
			{/* Body */}
			<div
				className={classNames(
					'relative',
					'flex flex-col flex-1 justify-between',
					'px-6 py-1.5 md:py-2',
					'overflow-ellipsis line-clamp-2',
					'text-sm'
				)}
			>
				<p>{description}</p>
				<div className={classNames('flex items-center gap-3', 'absolute bottom-4')}>
					{tags.map((tag) => (
						<div
							key={tag}
							className={classNames(
								'rounded px-2 py-0.5',
								'font-medium leading-tight',
								'bg-teal-100 text-teal-600',
								'hover:shadow-sm hover:border hover:border-teal-300 active:bg-teal-200 active:text-teal-700',
								'cursor-pointer'
							)}
						>
							{tag}
						</div>
					))}
				</div>
			</div>
			{/* Footer */}
			<div
				className={classNames(
					'w-full h-12',
					'flex items-center justify-between',
					'relative',
					'py-1.5 md:py-1',
					'pb-3',
					'bg-gray-50',
					'rounded-b-lg'
				)}
			>
				<SourceCardFooter {...{ likes, views, updatedAt }} />
			</div>
		</div>
	)
}
