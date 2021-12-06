import { capitalizeFirstLetter } from '@/common/utils/capitalize'

import { SourceType } from './source.types'

export const formatSourceTypeLabel = (sourceType: SourceType): string => {
	if (sourceType === 'github-repo') return 'Repos'
	if (sourceType === 'awesome-list') return 'Lists'
	const words = sourceType.split('-')
	const label = capitalizeFirstLetter(words[0])

	return `${label}s`
}
