import { makeAutoObservable } from 'mobx'

import { Filters, FilterType } from './types'

const initAll = (): Record<FilterType, string[]> => ({ categories: [], concepts: [] })

export class FilterStore {
	all: Filters = initAll()

	constructor() {
		makeAutoObservable(this)
	}

	setFilters(type: FilterType, ids: string[]) {
		this.all = { ...this.all, [type]: ids }
	}

	add(type: FilterType, id: string) {
		this.all = { ...this.all, [type]: [...this.all[type], id] }
	}

	remove(type: FilterType, id: string) {
		this.all = { ...this.all, [type]: this.all[type].filter((filterId) => filterId !== id) }
	}

	resetStore = () => {
		this.all = initAll()
	}
}
