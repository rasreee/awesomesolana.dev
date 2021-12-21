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

export type Filters = Record<FilterType, string[]>
