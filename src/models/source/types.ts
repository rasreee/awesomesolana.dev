export const SOURCE_TYPES = [
	'github-repo',
	'github-org',
	'article',
	'whitepaper',
	'awesome-list',
	'video',
	'course',
	'devtool'
] as const

export type SourceType = typeof SOURCE_TYPES[number]

export type Source = {
	id: string
	type: SourceType
	title: string
	description?: string
	views: number
	likes: number
	updatedAt: string
	url: string
}
