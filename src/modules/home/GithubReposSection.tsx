import classNames from 'classnames'
import Link from 'next/link'
import React from 'react'

import { GitRepoCard, useRecentGithubRepos } from './GitRepoCard'

const GithubReposSectionHeader = () => {
	return (
		<div
			className={classNames(
				'flex items-center justify-between',
				/* Hack to make left side of header match with content's starting point */
				'py-2 md:px-5 lg:px-3'
			)}
		>
			<h6 className="text-gray-800 text-sm uppercase font-bold">{'recent github repos'}</h6>
			<Link href="/repos/all">
				<a
					className={classNames(
						'hover:underline',
						'uppercase text-primary-500 font-semibold text-sm',
						'px-3 py-1 md:py-2',
						'cursor-pointer rounded-md'
					)}
				>
					{'view all'}
				</a>
			</Link>
		</div>
	)
}

const GithubReposSectionFeed = () => {
	const { data: recentGithubRepos, isLoading } = useRecentGithubRepos({ limit: 3 })

	return (
		<div
			className={classNames(
				'grid grid-cols-1 md:grid-cols-3',
				/* Center each card within its space  */
				'content-center',
				/* Vertical spacing */
				'space-y-2 md:space-y-0',
				/* Horizontal spacing */
				'space-x-0 md:space-x-4'
			)}
		>
			{isLoading && <div>Loading...</div>}
			{recentGithubRepos?.map((repo) => (
				<li className="m-0 p-0" key={repo.id}>
					<GitRepoCard {...repo} />
				</li>
			))}
		</div>
	)
}

export const GithubReposSection = () => {
	return (
		<div className="grid space-y-2">
			{/* Section header */}
			<GithubReposSectionHeader />
			{/* Section content below header */}
			<GithubReposSectionFeed />
		</div>
	)
}
