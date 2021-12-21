import { Source } from '@/models/source/types'

export type SearchHitsData = { list: Source[]; type: 'hits' | 'recents' }
