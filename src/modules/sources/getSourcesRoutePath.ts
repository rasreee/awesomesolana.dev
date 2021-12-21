import { SourceType } from '@/models/source/types'

export const getSourcesRoutePath = (sourceTypes?: SourceType[]) => {
	return sourceTypes && sourceTypes.length > 0 ? `/sources?type=${sourceTypes.join(',')}` : '/sources/all'
}
