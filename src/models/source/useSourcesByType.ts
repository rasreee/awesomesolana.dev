import { SupabaseClient } from '@supabase/supabase-js'
import useSWR, { Fetcher } from 'swr'

import { useSupabase } from '@/common/supabase/useSupabase'
import { handleSupabaseResponse, QueryOpts, SWRResponseWithLoading } from '@/common/utils'
import { Filter } from '@/store/filterStore'

import { Source } from './types'

const makeFetcher = (supabase: SupabaseClient, filter: Filter | undefined, opts?: QueryOpts) => {
	const fetcher: Fetcher<Source[]> = async () => {
		const matchOpts = filter ? { [filter.type]: filter.id } : {}
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
	filter?: Filter,
	opts?: QueryOpts | undefined
): SWRResponseWithLoading<Source[], Error> => {
	const client = useSupabase()
	const keyOpts = opts ? `&limit=${opts.limit}` : ''
	const key = filter ? `/sources?${filter.type}=${filter.id}${keyOpts}` : `/sources/all`

	const swr = useSWR<Source[], Error>(key, makeFetcher(client, filter, opts))

	/* Check if data is still being fetched */
	const isLoading = typeof swr.data === 'undefined' && typeof swr.error === 'undefined'

	return { ...swr, isLoading }
}
