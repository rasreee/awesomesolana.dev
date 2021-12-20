import { Source } from '@/models/source/types'

export type SearchResults = { list: Source[]; type: 'hits' | 'recents' }
