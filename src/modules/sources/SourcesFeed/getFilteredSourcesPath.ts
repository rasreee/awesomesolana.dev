import { TagType } from '@/models/tag'

export const getFilteredSourcesPath = (type?: TagType, filterIds?: string[]) => {
	return filterIds && filterIds.length > 0 && type ? `/sources?type=${filterIds.join(',')}` : '/sources'
}
