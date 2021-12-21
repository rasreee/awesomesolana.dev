import { Category } from '../tag/types'

export interface Source {
	id: string
	title: string
	description?: string
	views: number
	likes: number
	updatedAt: string
	url: string
	category: Category
}

export type SourceMatchOpts = Partial<Source> | undefined | null
