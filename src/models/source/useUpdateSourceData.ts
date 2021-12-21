import { useSupabase } from '@/common/supabase/useSupabase'

import { updateSource } from './fetchers'
import { Source } from './types'
import { useSourceById } from './useSourceById'

export const useUpdateSourceData = (id: string) => {
	const supabase = useSupabase()
	const { data: source, mutate: mutateSource } = useSourceById(id)

	const request = (id: string, newData: Partial<Omit<Source, 'id'>>) => {
		if (!source) {
			throw new Error('tried to update source likes when source data was not available yet')
		}

		return updateSource(id, newData, supabase).then(() => {
			return mutateSource({ ...source, ...newData })
		})
	}

	return request
}
