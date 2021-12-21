import { SupabaseClient } from '@supabase/supabase-js'
import useSWR, { Fetcher } from 'swr'

import { useSupabase } from '@/common/supabase/useSupabase'
import { handleSupabaseResponse, QueryOpts, SWRResponseWithLoading } from '@/common/utils'

import { Source } from './types'

const makeFetcher = (supabase: SupabaseClient, opts?: QueryOpts) => {
	const fetcher: Fetcher<Source[]> = async () => {
		let request = supabase.from<Source>('sources').select('*')

		if (opts?.limit) {
			request = request.limit(opts.limit)
		}

		const data = await request.then(handleSupabaseResponse)

		return data
	}

	return fetcher
}

export const useAllSources = (opts?: QueryOpts): SWRResponseWithLoading<Source[], Error> => {
	const client = useSupabase()
	const keyOpts = opts ? `&limit=${opts.limit}` : ''
	const key = `sources/all?${keyOpts}`

	const swr = useSWR<Source[], Error>(key, makeFetcher(client, opts))

	/* Check if data is still being fetched */
	const isLoading = typeof swr.data === 'undefined' && typeof swr.error === 'undefined'

	return { ...swr, isLoading }
}
