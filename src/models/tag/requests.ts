import tagsJson from './fixtures/tags.json'
import { Tag } from './types'

export function getTags() {
	return tagsJson as Tag[]
}

export const findTagById = (id: number) => {
	const found = getTags().find((f) => f.id === id)

	if (!found) {
		throw new Error(`Could not find tag for id: ${id}`)
	}

	return found
}

export const getDependencies = (): Tag[] => {
	return getTags().filter((tag) => tag.type === 'dependencies')
}
