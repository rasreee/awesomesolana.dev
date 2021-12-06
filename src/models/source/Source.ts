export type SourceType = 'github-repo' | 'article' | 'whitepaper'

export type Source = {
	id: string
	type: SourceType
	title: string
	description: string
	likes: number
	updatedAt: string
	url: string
	tags: string[]
}
