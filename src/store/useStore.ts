import { useMemo } from 'react'

import { initializeStore } from './store'

export function useStore(initialState: any) {
	const store = useMemo(() => initializeStore(initialState), [initialState])

	return store
}
