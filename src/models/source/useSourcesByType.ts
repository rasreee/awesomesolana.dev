import useSWR, { Fetcher } from 'swr'

import { SWRResponseWithLoading } from '@/common/utils/swr'

import { findSourcesByType } from './source.requests'
import { Source, SourceType } from './source.types'

type FetcherOptions = { limit: number }

const makeFetcher = (sourceType: SourceType, opts?: FetcherOptions) => {
	const fetcher: Fetcher<Source[]> = async () => {
		const sources = await findSourcesByType(sourceType)

		// TODO let API handle limit

		const result = opts ? sources.slice(0, opts.limit) : sources

		return result
	}

	return fetcher
}

export const useSourcesByType = (
	sourceType: SourceType,
	opts?: FetcherOptions
): SWRResponseWithLoading<Source[], Error> => {
	const keyOpts = opts ? `&limit=${opts.limit}` : ''
	const key = `sources?type=${sourceType}${keyOpts}`

	const swr = useSWR<Source[], Error>(key, makeFetcher(sourceType, opts))

	/* Check if data is still being fetched */
	const isLoading = typeof swr.data === 'undefined' && typeof swr.error === 'undefined'

	return { ...swr, isLoading }
}
