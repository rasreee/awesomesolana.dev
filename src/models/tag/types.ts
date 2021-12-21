import { FilterType } from '@/store/filterStore'

export type Tag = {
	id: number
	count: number
	name: string
	type: FilterType
}
