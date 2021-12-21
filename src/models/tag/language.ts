export const languagesConst = ['python', 'javascript', 'typescript', 'rust', 'golang'] as const

export const Languages = {
	Python: 'python',
	Javascript: 'javascript',
	Typescript: 'typescript',
	Rust: 'rust',
	Golang: 'golang'
} as const

export type Language = typeof languagesConst[number]
