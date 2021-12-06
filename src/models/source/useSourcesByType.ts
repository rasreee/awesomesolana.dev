import { SupabaseClient } from '@supabase/supabase-js'
import useSWR, { Fetcher } from 'swr'

import { useSupabase } from '@/common/supabase/useSupabase'
import { SWRResponseWithLoading } from '@/common/utils/swr'

import { RawSourceData, Source, SourceType } from './source.types'

type FetcherOptions = { limit: number }

const makeFetcher = (supabase: SupabaseClient, sourceType: SourceType, opts?: FetcherOptions) => {
	const fetcher: Fetcher<Source[]> = async () => {
		let request = supabase.from<RawSourceData>('sources').select('*').match({ type: sourceType })

		if (opts?.limit) {
			request = request.limit(opts.limit)
		}

		const { data, error } = await request

		if (error) throw error

		if (!data) throw new Error('No error returned from Supabase, but data was null.')

		const result: Source[] = data.map((rawData) => ({ ...rawData, tags: JSON.parse(rawData.tags) as string[] }))

		return result
	}

	return fetcher
}

export const useSourcesByType = (
	sourceType: SourceType,
	opts?: FetcherOptions
): SWRResponseWithLoading<Source[], Error> => {
	const client = useSupabase()
	const keyOpts = opts ? `&limit=${opts.limit}` : ''
	const key = `sources?type=${sourceType}${keyOpts}`

	const swr = useSWR<Source[], Error>(key, makeFetcher(client, sourceType, opts))

	/* Check if data is still being fetched */
	const isLoading = typeof swr.data === 'undefined' && typeof swr.error === 'undefined'

	return { ...swr, isLoading }
}
