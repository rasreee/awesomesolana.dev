import { makeAutoObservable } from 'mobx'

import { FilterArgs, FilterId, FilterIdType, FilterListArgs, FilterType, UnknownFilterArgsError } from './types'

export class FilterStore {
	concepts: Array<FilterIdType[FilterType.Concepts]> = []

	categories: Array<FilterIdType[FilterType.Categories]> = []

	get all(): Array<FilterId> {
		return [...this.concepts, ...this.categories]
	}

	constructor() {
		makeAutoObservable(this)
	}

	has(args: FilterArgs): boolean {
		switch (args.type) {
			case FilterType.Categories:
				return this.categories.includes(args.id)
			case FilterType.Concepts:
				return this.concepts.includes(args.id)
				break
			default:
				throw new UnknownFilterArgsError(args)
		}
	}

	getIds<T extends FilterType>(type: T) {
		switch (type) {
			case FilterType.Categories:
				return this.categories as Array<FilterIdType[FilterType.Categories]>
			case FilterType.Concepts:
				return this.concepts as Array<FilterIdType[FilterType.Concepts]>
			default:
				throw new UnknownFilterArgsError({ type })
		}
	}

	setFilters(args: FilterListArgs) {
		switch (args.type) {
			case FilterType.Categories:
				this.categories = args.ids
				break
			case FilterType.Concepts:
				this.concepts = args.ids
				break
			default:
				throw new UnknownFilterArgsError(args)
		}
	}

	add(args: FilterArgs) {
		switch (args.type) {
			case FilterType.Categories:
				this.categories.push(args.id)
				break
			case FilterType.Concepts:
				this.concepts.push(args.id)
				break
			default:
				throw new UnknownFilterArgsError(args)
		}
	}

	remove(args: FilterArgs) {
		switch (args.type) {
			case FilterType.Categories:
				this.categories.filter((id) => id !== args.id)
				break
			case FilterType.Concepts:
				this.concepts.filter((id) => id !== args.id)
				break
			default:
				throw new UnknownFilterArgsError(args)
		}
	}

	resetStore = () => {
		this.categories = []
		this.concepts = []
	}
}
