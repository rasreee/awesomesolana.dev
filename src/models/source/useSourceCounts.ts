import { SupabaseClient } from '@supabase/supabase-js'
import useSWR from 'swr'

import { useSupabase } from '@/common/supabase/useSupabase'

import { Source, SOURCE_TYPES, SourceType } from './types'

export type SourceCounts = Record<SourceType, number>

export const getSourceCount = async (type: SourceType, supabase: SupabaseClient): Promise<number> => {
	const { data, error } = await supabase.from<Source>('sources').select('*').match({ type })

	if (error) throw error

	return data?.length ?? 0
}

export const useSourceCounts = () => {
	const supabase = useSupabase()

	const fetcher = async () => {
		const promises = [] as Array<Promise<{ type: SourceType; count: number }>>

		SOURCE_TYPES.forEach((type, index) => {
			promises[index] = getSourceCount(type, supabase).then((count) => ({ type, count }))
		})

		const countsData = await Promise.all(promises)
		const counts = {} as SourceCounts

		countsData.forEach((data) => {
			counts[data.type] = data.count
		})

		return counts
	}

	const swr = useSWR<SourceCounts>('sourceCounts', fetcher)

	return swr
}
