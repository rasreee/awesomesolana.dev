import { makeAutoObservable } from 'mobx'
import Router from 'next/router'

import { Filter, FilterType } from './types'
import { getFilteredPath, initAll, toFilter } from './utils'
export class FilterStore {
	all: Record<FilterType, string[]> = initAll()

	get allList(): Filter[] {
		return [
			...this.all.categories.map(toFilter(FilterType.Categories)),
			...this.all.concepts.map(toFilter(FilterType.Concepts))
		]
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
