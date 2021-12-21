import { SupabaseClient } from '@supabase/supabase-js'
import useSWR, { Fetcher } from 'swr'

import { useSupabase } from '@/common/supabase/useSupabase'
import { handleSupabaseResponse, QueryOpts, SWRResponseWithLoading } from '@/common/utils'

import { Source } from './types'

const makeFetcher = (supabase: SupabaseClient, matchOpts: Partial<Source>, opts?: QueryOpts) => {
	const fetcher: Fetcher<Source[]> = async () => {
		let request = supabase.from<Source>('sources').select('*').match(matchOpts)

		if (opts?.limit) {
			request = request.limit(opts.limit)
		}

		const data = await request.then(handleSupabaseResponse)

		return data
	}

	return fetcher
}

export const useFindSources = (
	_matchOpts: Partial<Source> | undefined | null,
	opts?: QueryOpts | undefined
): SWRResponseWithLoading<Source[], Error> => {
	const client = useSupabase()
	const matchOpts = _matchOpts ?? {}
	const keyOpts = opts ? `&limit=${opts.limit}` : ''

	const key = matchOpts
		? `/sources?${Object.entries(matchOpts)
				.map(([key, value]) => `${key}=${value}`)
				.join('&')}${keyOpts}`
		: `/sources/all`

	const swr = useSWR<Source[], Error>(key, makeFetcher(client, matchOpts, opts))

	/* Check if data is still being fetched */
	const isLoading = typeof swr.data === 'undefined' && typeof swr.error === 'undefined'

	return { ...swr, isLoading }
}
