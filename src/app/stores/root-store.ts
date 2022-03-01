import { ReposSearchStore } from '@/modules/repos-page/repos-search-store';
import { TagsSearchStore } from '@/modules/tags-search/tags-search-store';

import { IRootStore } from './interfaces';
import { TagTypeModalStore } from './tag-type-modal-store';

export class RootStore implements IRootStore {
  tagsSearch = new TagsSearchStore();
  reposSearch = new ReposSearchStore();
  tagTypeModal = new TagTypeModalStore();
}
