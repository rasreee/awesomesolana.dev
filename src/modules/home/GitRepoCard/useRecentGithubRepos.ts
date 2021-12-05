import useSWR, { Fetcher } from 'swr'

import { findSourcesByType, Source } from '@/models/source'

export interface GithubRepo extends Source {
	updatedAt: string
}

const fetcher = (args: { limit: number }) => {
	const _inner: Fetcher<GithubRepo[]> = async () => {
		const githubSources = await findSourcesByType('github-repo').then((res) => res.slice(0, args.limit))

		// find last updated dates for each repo
		// mocked for now
		return githubSources.map((source) => ({ ...source, updatedAt: new Date().toDateString() }))
	}

	return _inner
}

export const useRecentGithubRepos = (args: { limit: number }) => {
	const swr = useSWR<GithubRepo[], Error>(`recentGithubRepos?limit=${args.limit}`, fetcher(args))

	const isLoading = typeof swr.data === 'undefined' && typeof swr.error === 'undefined'

	return { ...swr, isLoading }
}
