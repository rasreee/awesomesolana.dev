import { ReposSearchStore } from '@/modules/repos/repos-search-store';
import { TagTypeModalStore } from '@/modules/search/tag-type-modal-store';
import { TagsSearchStore } from '@/modules/tags-search/tags-search-store';

import { IRootStore } from './interfaces';

export class RootStore implements IRootStore {
  tagsSearch = new TagsSearchStore();
  reposSearch = new ReposSearchStore();
  tagTypeModal = new TagTypeModalStore();
}
