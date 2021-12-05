import { css } from '@emotion/react'
import classNames from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { MouseEventHandler } from 'react'

import { useHover } from '@/common/hooks'
import { isMobileDevice } from '@/common/utils'
import { spacing } from '@/ui/foundations'
import { HeartIcon, LinkIcon } from '@/ui/icon'
import styled from '@/ui/styled'

import { GithubRepo } from './useRecentGithubRepos'

export interface GitRepoCardProps extends GithubRepo {}

const Stat = styled('div')(
	({ theme }) =>
		css`
			font-family: ${theme.fonts.mono};
			color: ${theme.colors.darkGray};
			font-weight: ${theme.fontWeights.semibold};
			font-size: ${theme.fontSizes.xs};
			display: flex;
			align-items: center;
			gap: ${spacing(1)};

			svg {
				height: 1.25em;
				color: ${theme.colors.secondary};
			}

			.stat-text {
				padding-top: 0.125rem;
			}
		`
)

const Left = styled('div')(
	({ theme }) =>
		css`
			display: flex;
			align-items: center;
			gap: ${spacing(2)};
			font-size: ${theme.fontSizes.sm};
		`
)

const Right = styled('div')(
	({ theme }) =>
		css`
			font-size: ${theme.fontSizes.sm};
		`
)

export function GitRepoCard({ id, title, description, likes, updatedAt, url, tags }: GitRepoCardProps) {
	const router = useRouter()
	const { isHovered, bind } = useHover<HTMLDivElement>()

	const onClick: MouseEventHandler<HTMLDivElement> = () => {
		if (isMobileDevice()) {
			router.push(`/repos/${id}`)
		}
	}

	return (
		<>
			<div
				{...bind}
				className={classNames(
					'mobile:w-full h-56',
					'bg-white',
					'rounded-lg',
					'flex flex-col',
					isHovered ? 'shadow-lg' : 'shadow-sm',
					'mobile:mx-auto'
				)}
				onClick={onClick}
			>
				{/* Header */}
				<div className={classNames('flex items-center justify-between', 'overflow-hidden', 'px-4 pt-2', 'h-16')}>
					<div className="flex flex-col px-2">
						<Link href={url}>
							<a
								className={classNames(
									'rounded-md',
									'md:pb-1',
									'font-bold text-base text-gray-900',
									'hover:text-primary-500 hover:bg-primary-50',
									'active:text-primary-800 active:bg-primary-100',
									'overflow-ellipsis line-clamp-1'
								)}
							>
								{title}
							</a>
						</Link>
						<Link href={url}>
							<>
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
							</>
						</Link>
					</div>
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
							<li key={tag}>
								<div
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
							</li>
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
					<div className={classNames('flex items-center gap-2', 'absolute left-5')}>
						<Stat>
							<HeartIcon kind={'solid'} />
							<div className="stat-text">{likes}</div>
						</Stat>
					</div>
					<div className="absolute right-5">
						<div className={classNames('overflow-ellipsis line-clamp-1', 'text-xs')}>{updatedAt}</div>
					</div>
				</div>
			</div>
		</>
	)
}
