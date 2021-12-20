import { SupabaseClient } from '@supabase/supabase-js'

import { RawSource, Source } from './types'

export const findAllSources = async (supabase: SupabaseClient): Promise<Source[]> => {
	const { data, error } = await supabase.from<RawSource>('sources').select('*')
	if (error) throw error

	return data ?? []
}
