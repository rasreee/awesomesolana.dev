import { mockPromise } from '@/common/utils'

import { getSourcesFixture } from './getSourcesFixture'
import { Source, SourceType } from './source.types'

let mockDb = getSourcesFixture()

export const getAllSources = async (): Promise<Source[]> => {
	await mockPromise()

	return [...mockDb]
}

export const findSourceById = async (id: string): Promise<Source | null> => {
	const found = mockDb.find((source) => source.id === id)

	await mockPromise()

	return found ?? null
}

export const updateSourceLikes = async (id: string, likes: number): Promise<Source> => {
	const found = await findSourceById(id)
	if (!found) throw new Error(`Unable to update non-existent source ${id}`)

	const newData: Source = { ...found, likes }

	mockDb = [...mockDb.filter((row) => row.id === id), newData]

	return newData
}

export const findSourcesByType = async (type: SourceType): Promise<Source[]> => {
	await mockPromise()

	return mockDb.filter((row) => row.type === type)
}
