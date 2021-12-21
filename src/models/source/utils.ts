import { capitalizeFirstLetter } from '@/common/utils/capitalize'

import { Category } from '../tag/types'

export const formatSourceTypeLabel = (sourceType: Category): string => {
	if (sourceType === 'github-repo') return 'Repos'
	if (sourceType === 'awesome-list') return 'Lists'
	const words = sourceType.split('-')
	const label = capitalizeFirstLetter(words[0])

	return `${label}s`
}

export const parseSourceTags = (tags: string | string[]): string[] => {
	if (typeof tags !== 'string') return tags

	try {
		const parsedTags = JSON.parse(tags)

		return parsedTags
	} catch (err) {
		console.log('Failed to parseSourceTags. ', { tags, error: err })
		console.log(tags.split(','))
		console.log('typeof tags: ', typeof tags.split(','))

		return []
	}
}
