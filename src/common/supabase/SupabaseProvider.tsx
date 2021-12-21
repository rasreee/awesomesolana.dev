import { createClient } from '@supabase/supabase-js'
import React, { FC, useMemo } from 'react'

import { SupabaseContext } from './SupabaseContext'

const initSupabase = () => {
	const url = process.env.NEXT_PUBLIC_SUPABASE_URL
	const apiKey = process.env.NEXT_PUBLIC_SUPABASE_API_KEY
	if (!url) throw new Error('NEXT_PUBLIC_SUPABASE_URL was undefined')
	if (!apiKey) throw new Error('NEXT_PUBLIC_SUPABASE_API_KEY was undefined')

	return createClient(url, apiKey)
}

export const SupabaseProvider: FC = ({ children }) => {
	const Supabase = useMemo(initSupabase, [])

	return <SupabaseContext.Provider value={Supabase}>{children}</SupabaseContext.Provider>
}
