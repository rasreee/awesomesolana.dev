import { Category, Concept } from '@/models/tag/types'

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
	id: Category
}

export interface ConceptFilter extends FilterBase {
	type: FilterType.Concepts
	id: string
}

export type FilterId = Category | Concept

export type FilterIdType = {
	[FilterType.Categories]: Category
	[FilterType.Concepts]: Concept
}

export type FilterListConfig<T extends FilterType> = { type: T; ids: Array<FilterIdType[T]> }
export type FilterConfig<T extends FilterType> = { type: T; id: FilterIdType[T] }

export type Filters = { categories: Category[]; concepts: string[] }

export class UnknownFilterArgsError extends Error {
	constructor(args: any) {
		const message = `Unknown Filter args ${JSON.stringify(args)}`
		super(message)
	}
}

export type FilterListArgs = FilterListConfig<FilterType.Categories> | FilterListConfig<FilterType.Concepts>
export type FilterArgs = FilterConfig<FilterType.Categories> | FilterConfig<FilterType.Concepts>
