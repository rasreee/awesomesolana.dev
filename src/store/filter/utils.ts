import { Filter, FilterType } from './types'

export const getFilteredPath = (filters: Record<FilterType, string[]>) => {
	let pathname = `/sources`

	Object.entries(filters).forEach(([type, ids], index) => {
		if (ids.length === 0) return
		const separator = index === 0 ? '?' : '&'
		pathname += `${pathname}${separator}${type}=${ids.join(',')}`
	})

	return pathname
}

export const toFilter =
	(type: FilterType) =>
	(id: string): Filter => ({
		id,
		type
	})

export const initAll = (): Record<FilterType, string[]> => ({ categories: [], concepts: [] })
