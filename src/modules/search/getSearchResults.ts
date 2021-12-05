import { getTags, Tag } from '@/models/tag'

export const getSearchResults = (query: string) => {
	let hits = [] as Tag[]

	if (query.length) {
		const a = query.toLowerCase()

		hits = getTags().filter((item) => {
			const b = item.name.toLowerCase().substr(0, query.length)

			return a === b
		})
	}

	return hits
}
