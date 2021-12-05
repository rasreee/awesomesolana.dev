export type TagType = 'content-formats' | 'dependencies' | 'languages-and-frameworks' | 'crypto-topics'

export type Tag = {
	type: TagType
	id: number
	name: string
	count: number
}
