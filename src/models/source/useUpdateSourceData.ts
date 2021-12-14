import { useSupabase } from '@/common/supabase/useSupabase'
import { handleSupabaseResponse } from '@/common/utils/handleSupabaseResponse'

import { Source } from './types'
import { useSourceById } from './useSourceById'

export const useUpdateSourceData = (id: string) => {
	const supabase = useSupabase()
	const { data: source, mutate: mutateSource } = useSourceById(id)

	const request = async (id: string, data: Partial<Omit<Source, 'id' | 'tags'>>) => {
		if (!source) {
			throw new Error('tried to update source likes when source data was not available yet')
		}

		const newSourcesData = { ...source, ...data }

		await supabase.from<string>('sources').update(data).match({ id }).then(handleSupabaseResponse)

		await mutateSource(newSourcesData)

		return newSourcesData
	}

	return request
}
