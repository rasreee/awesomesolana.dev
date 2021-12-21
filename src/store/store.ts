import { createContext, useContext } from 'react'

import { CommonStore } from './commonStore'
import { FilterStore } from './filterStore'

interface Store {
	filterStore: FilterStore
	commonStore: CommonStore
}

export const store: Store = {
	commonStore: new CommonStore(),
	filterStore: new FilterStore()
}

export const StoreContext = createContext(store)

export const useStore = () => {
	return useContext(StoreContext)
}

export const resetStore = () => {
	const { commonStore, filterStore } = store

	commonStore.resetStore()
	filterStore.resetStore()
}
