import { useSupabase } from '@/common/supabase/useSupabase'

import { findAllSources } from './source.api'
import { Source } from './types'

export const useFindSourcesByQuery = () => {
	const supabase = useSupabase()

	const findSourcesByQuery = async (query: string): Promise<Source[]> => {
		let hits = [] as Source[]

		if (query.length) {
			const a = query.toLowerCase()
			const allSources = await findAllSources(supabase)

			hits = allSources.filter((item) => {
				const b = item.title.toLowerCase().slice(0, query.length)

				return a === b
			})
		}

		return hits
	}

	return findSourcesByQuery
}
