import { ReposSearchStore } from '@/core/github/repos-search-store';
import { TagTypeModalStore } from '@/core/tags/tag-type-modal-store';
import { TagsSearchStore } from '@/core/tags/tags-search-store';
import { useStore } from '@/mobx/store-context';

export class RootStore {
  tagsSearch = new TagsSearchStore();
  reposSearch = new ReposSearchStore();
  tagTypeModal = new TagTypeModalStore();
}

export const useRootStore = (): RootStore => useStore<RootStore>();
