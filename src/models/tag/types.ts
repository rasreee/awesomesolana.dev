export enum TagType {
	Categories = 'categories',
	Languages = 'languages'
	// Dependencies = 'dependencies',
	// Frameworks = 'frameworks',
	// Concepts = 'concepts'
}

export type Tag = {
	id: number
	count: number
	name: string
	type: TagType
}
