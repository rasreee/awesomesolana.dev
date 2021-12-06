import { useSupabase } from '@/common/supabase/useSupabase'
import { handleSupabaseResponse } from '@/common/utils/handleSupabaseResponse'

import { RawSourceData } from './source.types'
import { useSourceById } from './useSourceById'

export const useUpdateSourceLikes = (id: string) => {
	const supabase = useSupabase()
	const { data: source, mutate: mutateSource } = useSourceById(id)

	const updateSourceLikes = async (id: string, newLikes: number) => {
		if (!source) {
			throw new Error('tried to update source likes when source data was not available yet')
		}

		const newSourcesData = { ...source, likes: newLikes }

		await supabase.from<RawSourceData>('sources').update({ likes: newLikes }).match({ id }).then(handleSupabaseResponse)

		await mutateSource(newSourcesData)

		return newSourcesData
	}

	return updateSourceLikes
}
