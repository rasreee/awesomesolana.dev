import { TagsSearchStore } from '@/modules/common/tags-search/tags-search-store';

import { SearchStore } from './search-store';
import { TagTypeModalStore } from './tag-type-modal-store';

export class GlobalStore {
  tagsSearch = new TagsSearchStore();
  tagTypeModal = new TagTypeModalStore();
  search = new SearchStore();
}
