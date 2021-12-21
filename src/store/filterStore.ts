import { makeAutoObservable } from 'mobx'
import Router from 'next/router'

export enum FilterType {
	Categories = 'categories',
	// Languages = 'languages'
	// Dependencies = 'dependencies',
	// Frameworks = 'frameworks',
	Concepts = 'concepts'
}

export const filterTypes = {
	Categories: FilterType.Categories,
	Concepts: FilterType.Concepts
} as const

type FilterBase = { type: FilterType; id: string }

export interface CategoryFilter extends FilterBase {
	type: FilterType.Categories
	id: string
}

export interface ConceptFilter extends FilterBase {
	type: FilterType.Concepts
	id: string
}

export type Filter = CategoryFilter | ConceptFilter

const getFilteredPath = (filters: Record<FilterType, string[]>) => {
	let pathname = `/sources`

	Object.entries(filters).forEach(([type, ids], index) => {
		if (ids.length === 0) return
		const separator = index === 0 ? '?' : '&'
		pathname += `${pathname}${separator}${type}=${ids.join(',')}`
	})

	return pathname
}

const toFilter =
	(type: FilterType) =>
	(id: string): Filter => ({
		id,
		type
	})

const initAll = (): Record<FilterType, string[]> => ({ categories: [], concepts: [] })

export class FilterStore {
	all: Record<FilterType, string[]> = initAll()

	get allList(): Filter[] {
		return [
			...this.all.categories.map(toFilter(FilterType.Categories)),
			...this.all.concepts.map(toFilter(FilterType.Concepts))
		]
	}

	get categories(): string[] {
		return this.all.categories
	}

	get concepts(): string[] {
		return this.all.concepts
	}

	constructor() {
		makeAutoObservable(this)
	}

	setConcepts(values: string[]) {
		this.all.concepts = values
	}

	setCategories(values: string[]) {
		this.all.categories = values
	}

	private updateRoute() {
		Router.router?.push(getFilteredPath(this.all))
	}

	add(type: FilterType, id: string) {
		const oldFilters = this.all
		this.all = { ...oldFilters, [type]: [...oldFilters[type], id] }
		this.updateRoute()
	}

	remove(type: FilterType, id: string) {
		let oldFilters

		switch (type) {
			case FilterType.Categories: {
				oldFilters = this.all.categories
				break
			}
			case FilterType.Concepts: {
				oldFilters = this.all.concepts
				break
			}

			default:
				{
					oldFilters = this.all.categories
					console.warn(`WARNING: unknown filter type ${type}`)
				}

				this.setConcepts(oldFilters.filter((filterId) => filterId !== id))
				this.updateRoute()
		}
	}

	resetStore = () => {
		this.all = initAll()
	}
}
