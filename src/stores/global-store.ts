import { TagsSearchStore } from '@/modules/common/tags-search/tags-search-store';
import { ReposSearchStore } from '@/modules/repos-page/repos-search-store';

import { IGlobalStore } from './interfaces';
import { TagTypeModalStore } from './tag-type-modal-store';

export class GlobalStore implements IGlobalStore {
  tagsSearch = new TagsSearchStore();
  reposSearch = new ReposSearchStore();
  tagTypeModal = new TagTypeModalStore();
}
