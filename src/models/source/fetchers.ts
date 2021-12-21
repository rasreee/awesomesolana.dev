import { SupabaseClient } from '@supabase/supabase-js'

import { handleSupabaseResponse } from '@/common/utils'

import { Source } from './types'

export const findAllSources = async (supabase: SupabaseClient): Promise<Source[]> => {
	const { data, error } = await supabase.from<Source>('sources').select('*')
	if (error) throw error

	return data ?? []
}

export const updateSource = async (id: string, updateData: Partial<Source>, supabase: SupabaseClient) => {
	const response = await supabase.from<Source>('sources').update(updateData).match({ id }).then(handleSupabaseResponse)

	return response[0]
}
