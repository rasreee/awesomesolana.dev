import { useSupabase } from '@/common/supabase/useSupabase'

import { updateSource } from './source.api'
import { Source } from './types'
import { useSourceById } from './useSourceById'

export const useUpdateSourceData = (id: string) => {
	const supabase = useSupabase()
	const { data: source, mutate: mutateSource } = useSourceById(id)

	const request = async (id: string, newData: Partial<Omit<Source, 'id'>>): Promise<Source> => {
		if (!source) {
			throw new Error('tried to update source likes when source data was not available yet')
		}

		const response = await updateSource(id, newData, supabase)
		await mutateSource(response)

		return response
	}

	return request
}
