import { css } from '@emotion/react'
import classNames from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { MouseEventHandler } from 'react'

import { useHover } from '@/common/hooks'
import { isMobileDevice } from '@/common/utils'
import { SecondaryButton } from '@/ui/atoms/Button'
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
			gap: ${spacing(3)};
			font-size: ${theme.fontSizes.sm};
		`
)

export function GitRepoCard({ id, title, description, likes, updatedAt, url }: GitRepoCardProps) {
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
					'mobile:w-full h-52',
					'py-1 md:py-2',
					'bg-white',
					'rounded-lg',
					'grid space-y-0',
					isHovered ? 'shadow-lg' : 'shadow-sm',
					'mobile:mx-auto'
				)}
				onClick={onClick}
			>
				{/* Header */}
				<div className={classNames('flex items-center justify-between', 'px-4 py-1.5 md:py-2')}>
					<div className="grid">
						<Link href={url}>
							<a
								className={classNames(
									'rounded-md',
									'px-2 py-1',
									'font-bold text-base text-gray-900',
									'hover:text-primary-500 hover:bg-primary-50',
									'active:text-primary-800 active:bg-primary-100',
									'overflow-ellipsis overflow-hidden'
								)}
							>
								{title}
							</a>
						</Link>
						<Link href={url}>
							<>
								<a
									className={classNames(
										'flex items-start',
										'gap-1.5',
										'py-0.5',
										'text-gray-600',
										'text-xs underline font-semibold',
										'hover:text-primary-500',
										'active:text-primary-800',
										'cursor-pointer',
										'overflow-clip'
									)}
								>
									<LinkIcon height="14" width="14" />
									{url}
								</a>
							</>
						</Link>
					</div>
				</div>
				{/* Body */}
				<div
					className={classNames(
						'grid content-start',
						'px-6 py-1.5 md:py-2',
						'overflow-ellipsis overflow-hidden',
						'text-sm'
					)}
				>
					<p>{description}</p>
				</div>
				{/* Footer */}
				<div className={classNames('flex items-center', 'px-6 py-1.5 md:py-2', 'pb-3')}>
					<Left>
						<Stat>
							<HeartIcon kind={'solid'} />
							<div className="stat-text">{likes}</div>
						</Stat>
						<SecondaryButton
							fg="primary"
							height={6}
							fontSize="xs"
							css={{ width: spacing(20), textAlign: 'center', padding: 0 }}
						>
							Next.js
						</SecondaryButton>
						<div className={classNames('overflow-ellipsis overflow-hidden', 'text-xs')}>{updatedAt}</div>
					</Left>
				</div>
			</div>
		</>
	)
}
