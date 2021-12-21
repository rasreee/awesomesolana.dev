import { createClient, SupabaseClient } from '@supabase/supabase-js'

export const initSupabase = (
	apiKey = process.env.NEXT_PUBLIC_SUPABASE_API_KEY,
	url = process.env.NEXT_PUBLIC_SUPABASE_URL
) => {
	if (!url) throw new Error('NEXT_PUBLIC_SUPABASE_URL was undefined')
	if (!apiKey) throw new Error('NEXT_PUBLIC_SUPABASE_API_KEY was undefined')

	return createClient(url, apiKey)
}

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
	type: Category
	title: string
	description?: string
	views: number
	likes: number
	updatedAt: string
	url: string
	category: Category | null
}

export const findAllSources = async (supabase: SupabaseClient): Promise<Source[]> => {
	const { data, error } = await supabase.from<Source>('sources').select('*')
	if (error) throw error

	return data ?? []
}

const migrateSourceTypeToCategory = async () => {
	const supabase = initSupabase(
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzODcwOTc4OCwiZXhwIjoxOTU0Mjg1Nzg4fQ.61wbzLabYiUNkfDZMVMqsArT-qmmp9UODFh4PWGfQKk',
		'https://uxmwcecuncwkkpikkgit.supabase.co'
	)

	const allSources = await findAllSources(supabase)
	const promises: Array<PromiseLike<any>> = []

	allSources.forEach((source, index) => {
		const newData = { ...source, category: source.type }

		promises[index] = supabase.from<Source>('sources').update({ category: source.type }).match({ id: source.id })
	})

	await Promise.all(promises)
}

migrateSourceTypeToCategory()
	.then(() => console.log('SUCCESS'))
	.catch((error) => {
		console.log('FAILED: ', error)
	})
