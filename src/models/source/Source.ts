export type SourceType = 'github-repo' | 'blog-post' | 'tutorial' | 'whitepaper'

export type Source = {
	id: string
	title: string
	url: string
	description: string
	type: SourceType
	tags: string[]
	likes: number
}
