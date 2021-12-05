import useSWR, { Fetcher } from 'swr'

import { findSourcesByType, Source } from '@/models/source'

export interface BlogPost extends Source {
	updatedAt: string
}

const fetcher = (args: { limit: number }) => {
	const _inner: Fetcher<BlogPost[]> = async () => {
		const blogPostSources = await findSourcesByType('blog-post')
		const tutorialSources = await findSourcesByType('tutorial')
		const res = [...tutorialSources, ...blogPostSources].slice(0, args.limit)

		// find last updated dates for each repo
		// mocked for now
		return res.map((source) => ({ ...source, updatedAt: new Date().toDateString() }))
	}

	return _inner
}

export const useRecentBlogPosts = (args: { limit: number }) => {
	const swr = useSWR<BlogPost[], Error>(`recentBlogPosts?limit=${args.limit}`, fetcher(args))

	const isLoading = typeof swr.data === 'undefined' && typeof swr.error === 'undefined'

	return { ...swr, isLoading }
}
