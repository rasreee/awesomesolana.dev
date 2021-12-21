import { makeAutoObservable } from 'mobx'

import { FilterType } from './types'
import { initAll } from './utils'

export class FilterStore {
	all: Record<FilterType, string[]> = initAll()

	constructor() {
		makeAutoObservable(this)
	}

	setConcepts(values: string[]) {
		this.all.concepts = values
	}

	setCategories(values: string[]) {
		this.all.categories = values
	}

	add(type: FilterType, id: string) {
		const oldFilters = this.all
		this.all = { ...oldFilters, [type]: [...oldFilters[type], id] }
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
		}
	}

	resetStore = () => {
		this.all = initAll()
	}
}
