export const categoriesConst = [
	'github-repo',
	'github-org',
	'article',
	'whitepaper',
	'awesome-list',
	'video',
	'course',
	'devtool'
] as const

export type Category = typeof categoriesConst[number]

export interface Source {
	id: string
	title: string
	description?: string
	views: number
	likes: number
	updatedAt: string
	url: string
	category: Category
}
