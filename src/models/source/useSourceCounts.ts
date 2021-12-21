import { SupabaseClient } from '@supabase/supabase-js'
import useSWR from 'swr'

import { useSupabase } from '@/common/supabase/useSupabase'

import { categoriesConst, Category, Source } from './types'

export type SourceCounts = Record<Category, number>

export const getSourceCount = async (category: Category, supabase: SupabaseClient): Promise<number> => {
	const { data, error } = await supabase.from<Source>('sources').select('*').match({ category })

	if (error) throw error

	return data?.length ?? 0
}

export const useSourceCounts = () => {
	const supabase = useSupabase()

	const fetcher = async () => {
		const promises = [] as Array<Promise<{ category: Category; count: number }>>

		categoriesConst.forEach((category, index) => {
			promises[index] = getSourceCount(category, supabase).then((count) => ({ category, count }))
		})

		const countsData = await Promise.all(promises)
		const counts = {} as SourceCounts

		countsData.forEach((data) => {
			counts[data.category] = data.count
		})

		return counts
	}

	const swr = useSWR<SourceCounts>('sourceCounts', fetcher)

	return swr
}
