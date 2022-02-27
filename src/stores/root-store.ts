import { useStore } from '@/lib/mobx/store-context';

import { ReposSearchStore } from './repos-search-store';
import { TagTypeModalStore } from './tag-type-modal-store';
import { TagsSearchStore } from './tags-search-store';

export class RootStore {
  tagsSearch = new TagsSearchStore();
  reposSearch = new ReposSearchStore();
  tagTypeModal = new TagTypeModalStore();
}

export const useRootStore = (): RootStore => useStore<RootStore>();
