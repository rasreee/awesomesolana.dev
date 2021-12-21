import { createContext, useContext } from 'react'

import { FilterStore } from './filter'

interface Store {
	filterStore: FilterStore
}

export const store: Store = {
	filterStore: new FilterStore()
}

export const StoreContext = createContext(store)

export const useStore = () => {
	return useContext(StoreContext)
}

export const resetStore = () => {
	const { filterStore } = store
	filterStore.resetStore()
}
