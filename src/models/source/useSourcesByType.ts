import { SupabaseClient } from '@supabase/supabase-js'
import useSWR, { Fetcher } from 'swr'

import { useSupabase } from '@/common/supabase/useSupabase'
import { handleSupabaseResponse, QueryOpts, SWRResponseWithLoading } from '@/common/utils'

import { Source, SourceType } from './types'

const makeFetcher = (supabase: SupabaseClient, sourceType: SourceType | 'all', opts?: QueryOpts) => {
	const fetcher: Fetcher<Source[]> = async () => {
		const matchOpts = sourceType === 'all' ? {} : { type: sourceType }
		let request = supabase.from<Source>('sources').select('*').match(matchOpts)

		if (opts?.limit) {
			request = request.limit(opts.limit)
		}

		const data = await request.then(handleSupabaseResponse)

		return data
	}

	return fetcher
}

export const useSourcesByType = (
	sourceType?: SourceType | 'all',
	opts?: QueryOpts | undefined
): SWRResponseWithLoading<Source[], Error> => {
	const client = useSupabase()
	const keyOpts = opts ? `&limit=${opts.limit}` : ''
	const key = `sources?type=${sourceType}${keyOpts}`

	const swr = useSWR<Source[], Error>(key, makeFetcher(client, sourceType ?? 'all', opts))

	/* Check if data is still being fetched */
	const isLoading = typeof swr.data === 'undefined' && typeof swr.error === 'undefined'

	return { ...swr, isLoading }
}
