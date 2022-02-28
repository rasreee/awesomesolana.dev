import { useStore } from '@/lib/mobx/store-context';
import { ReposSearchStore } from '@/modules/repos/repos-search-store';
import { TagTypeModalStore } from '@/modules/search/tag-type-modal-store';
import { TagsSearchStore } from '@/modules/tags-search/tags-search-store';

export interface RootStore {
  tagsSearch: TagsSearchStore;
  reposSearch: ReposSearchStore;
  tagTypeModal: TagTypeModalStore;
}

export class RootStore {
  tagsSearch = new TagsSearchStore();
  reposSearch = new ReposSearchStore();
  tagTypeModal = new TagTypeModalStore();
}

export const useRootStore = (): RootStore => useStore<RootStore>();
