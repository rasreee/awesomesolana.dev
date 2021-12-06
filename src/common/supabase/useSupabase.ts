import { useContext } from 'react'

import { SupabaseContext } from './SupabaseContext'

export const useSupabase = () => {
	const ctx = useContext(SupabaseContext)
	if (typeof ctx === 'undefined') throw new Error('failed to ensure defined context')

	return ctx
}
