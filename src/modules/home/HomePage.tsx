import classNames from 'classnames'
import React from 'react'

import { SearchBar } from '@/modules/search/SearchBar'
import { Padding } from '@/ui/atoms'

import { Page } from '../common/Page'
import { GithubReposSection } from './GithubReposSection'

export const HomePage = () => {
	return (
		<Page title="Home" description="Awesome Solana content">
			{/* Inner content */}
			<div className={classNames('grid', 'space-y-6 md:space-y-12', 'py-2 md:py-4', 'mx-auto')}>
				<Padding px={3} py={8}>
					<SearchBar />
				</Padding>
				{/* Github Repos section */}
				<Padding px={3}>
					<GithubReposSection />
				</Padding>
			</div>
		</Page>
	)
}
