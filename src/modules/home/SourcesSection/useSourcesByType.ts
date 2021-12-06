import useSWR, { Fetcher } from 'swr'

import { findSourcesByType, Source, SourceType } from '@/models/source'

const fetcher = (sourceType: SourceType, opts: { limit: number }) => {
	const _inner: Fetcher<Source[]> = async () => {
		const sources = await findSourcesByType(sourceType).then((res) => res.slice(0, opts.limit))

		return sources
	}

	return _inner
}

export const useSourcesByType = (sourceType: SourceType, opts: { limit: number }) => {
	const swr = useSWR<Source[], Error>(
		`recentSources?sourceType=${sourceType}&limit=${opts.limit}`,
		fetcher(sourceType, opts)
	)

	const isLoading = typeof swr.data === 'undefined' && typeof swr.error === 'undefined'

	return { ...swr, isLoading }
}
