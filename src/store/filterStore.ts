import { makeAutoObservable } from 'mobx'

export enum FilterType {
	Category = 'category'
	// Languages = 'languages'
	// Dependencies = 'dependencies',
	// Frameworks = 'frameworks',
	// Concepts = 'concepts'
}

export const filterTypes = {
	[FilterType.Category]: FilterType.Category
} as const

export type Filter = { type: FilterType; id: string }

export interface CategoryFilter extends Filter {
	type: FilterType.Category
	id: string
}

export class FilterStore {
	categories: string[] = []

	get allFilters(): Filter[] {
		return this.categories.map((id) => ({ id, type: FilterType.Category }))
	}

	constructor() {
		makeAutoObservable(this)
	}

	setCategories(values: string[]) {
		this.categories = values
	}

	resetStore = () => {
		this.categories = []
	}
}
