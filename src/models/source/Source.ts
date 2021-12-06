export type SourceType = 'github-repo' | 'blog-post' | 'tutorial' | 'whitepaper'

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
