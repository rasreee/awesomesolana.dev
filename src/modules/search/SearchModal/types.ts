import { Source } from '@/models/source/types'

export type SearchData = { list: Source[]; type: 'hits' | 'recents' }
