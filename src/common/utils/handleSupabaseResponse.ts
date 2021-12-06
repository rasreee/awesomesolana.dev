import { PostgrestResponse, PostgrestSingleResponse } from '@supabase/supabase-js'

export const handleSupabaseResponse = <Data>(response: PostgrestResponse<Data>) => {
	const { data, error } = response
	if (error) throw error

	if (!data) throw new Error('No error returned from Supabase, but data was null.')

	return data
}

export const handleSupabaseSingleResponse = <Data>(response: PostgrestSingleResponse<Data>) => {
	const { data, error } = response
	if (error) throw error

	if (!data) throw new Error('No error returned from Supabase, but data was null.')

	return data
}
