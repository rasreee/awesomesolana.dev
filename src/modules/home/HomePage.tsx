import classNames from 'classnames'
import React from 'react'

import { useKeyCombo } from '@/common/hooks'
import { SearchBar, SearchModal } from '@/modules/search'
import { Padding } from '@/ui/atoms'
import { useModal } from '@/ui/components'

import { Page } from '../common/Page'
import { BlogPostsSection } from './BlogPostsSection'
import { GithubReposSection } from './GithubReposSection'

export const HomePage = () => {
	const { open: openModal, bind: bindModal } = useModal()
	useKeyCombo('Meta+k', openModal)

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
				<Padding px={3}>
					<BlogPostsSection />
				</Padding>
			</div>
			<SearchModal {...bindModal} />
		</Page>
	)
}
