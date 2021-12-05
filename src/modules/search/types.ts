import { Tag } from '@/models/tag'

export type SearchResults = { list: Tag[]; type: 'hits' | 'recents' }
