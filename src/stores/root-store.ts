import { action, makeAutoObservable } from 'mobx';

import { TagType } from '@/core/search';
import { useStore } from '@/mobx/storeContext';

import { ReposRootStore } from './repos-search-store';
import { TagsRootStore } from './tags-search-store';

export class RootStore {
  tagsSearch = new TagsRootStore();
  reposSearch = new ReposRootStore();

  tagTypeModal: TagType | null = null;

  get rootUrl(): string {
    const tags = this.reposSearch.tags;
    const query = this.reposSearch.query;
    let result = '/search';

    if (query) {
      result = result + `?q=${query}`;
    }

    if (tags.length) {
      const prefix = result === '/search' ? '?' : '&';

      result = prefix + tags.map((tag) => `${tag.type}=${tag.name}`).join('&');
    }

    return result;
  }

  openTagTypeModal(type: TagType) {
    this.tagTypeModal = type;
  }

  closeTagTypeModal() {
    this.tagTypeModal = null;
  }

  constructor() {
    makeAutoObservable(
      this,
      {
        closeTagTypeModal: action.bound,
        openTagTypeModal: action.bound,
      },
      { name: 'RootStore' },
    );
  }
}

export function useRootStore() {
  return useStore<RootStore>();
}
