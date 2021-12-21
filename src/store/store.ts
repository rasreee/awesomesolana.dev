import { createContext, useContext } from 'react'

import { CommonStore } from './commonStore'

interface Store {
	commonStore: CommonStore
}

export const store: Store = {
	commonStore: new CommonStore()
}

export const StoreContext = createContext(store)

export const useStore = () => {
	return useContext(StoreContext)
}

export const resetStore = () => {
	const { commonStore } = store

	commonStore.resetStore()
}
