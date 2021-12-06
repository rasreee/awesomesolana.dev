export const SOURCE_TYPES = ['github-repo', 'article', 'whitepaper'] as const

export type SourceType = typeof SOURCE_TYPES[number]

export type Source = {
	id: string
	type: SourceType
	title: string
	description: string
	views: number
	likes: number
	updatedAt: string
	url: string
	tags: string[]
}

export type RawSourceData = Omit<Source, 'tags'> & {
	tags: string
}
