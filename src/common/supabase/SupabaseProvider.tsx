import React, { FC, useMemo } from 'react'

import { initSupabase } from './initSupabase'
import { SupabaseContext } from './SupabaseContext'

export const SupabaseProvider: FC = ({ children }) => {
	const Supabase = useMemo(initSupabase, [])

	return <SupabaseContext.Provider value={Supabase}>{children}</SupabaseContext.Provider>
}
