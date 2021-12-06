import useSWR, { Fetcher } from 'swr'

import { SWRResponseWithLoading } from '@/common/utils/swr'
import { findSourcesByType, Source, SourceType } from '@/models/source'

type FetcherOptions = { limit: number }

const getFetcher = (sourceType: SourceType, opts: FetcherOptions) => {
	const fetcher: Fetcher<Source[]> = async () => {
		const sources = await findSourcesByType(sourceType)

		// TODO let API handle limit
		const result = sources.slice(0, opts.limit)

		return result
	}

	return fetcher
}

export const useSourcesByType = (
	sourceType: SourceType,
	opts: FetcherOptions
): SWRResponseWithLoading<Source[], Error> => {
	const key = `sources?type=${sourceType}&limit=${opts.limit}`

	const swr = useSWR<Source[], Error>(key, getFetcher(sourceType, opts))

	/* Check if data is still being fetched */
	const isLoading = typeof swr.data === 'undefined' && typeof swr.error === 'undefined'

	return { ...swr, isLoading }
}