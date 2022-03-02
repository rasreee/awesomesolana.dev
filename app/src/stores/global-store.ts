import { TagsSearchStore } from '@/modules/common/tags-search/tags-search-store';

import { SearchStore } from './search-store';

export class GlobalStore {
  tagsSearch: TagsSearchStore = new TagsSearchStore();
  search: SearchStore = new SearchStore();
}
