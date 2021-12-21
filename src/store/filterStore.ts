import { makeAutoObservable } from 'mobx'

export enum FilterType {
	Categories = 'categories'
	// Languages = 'languages'
	// Dependencies = 'dependencies',
	// Frameworks = 'frameworks',
	// Concepts = 'concepts'
}

export type Filter = { type: FilterType; id: string }

export class FilterStore {
	filters: Filter[] = []

	constructor() {
		makeAutoObservable(this)
	}

	setFilters(val: Filter[]) {
		this.filters = val
	}

	resetStore = () => {
		this.filters = []
	}
}
