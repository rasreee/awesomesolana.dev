import { capitalizeFirstLetter } from '@/common/utils/capitalize'

import { Category } from './types'

export const formatSourceTypeLabel = (sourceType: Category): string => {
	if (sourceType === 'github-repo') return 'Repos'
	if (sourceType === 'awesome-list') return 'Lists'
	const words = sourceType.split('-')
	const label = capitalizeFirstLetter(words[0])

	return `${label}s`
}
