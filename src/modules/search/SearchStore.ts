import { action, makeAutoObservable, reaction } from 'mobx';
import Router from 'next/router';

import { searchRoute, Tag, TagType, tagTypes } from '@/core/search';
import { useStore } from '@/mobx/storeContext';
import { waitFor } from '@/utils';

export class SearchStore {
  tags: Tag[] = [];

  searchForm = { loading: false, error: null, query: '' };

  tagTypeModal: TagType | null = null;

  get rootUrl(): string {
    const {
      tags,
      searchForm: { query },
    } = this;

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

  setQuery(query: string) {
    this.searchForm.query = query;
  }

  addTag(tag: Tag) {
    const oldTags = this.tags;
    const newTags = oldTags ? [...oldTags, tag] : [tag];

    let newPath = `/search`;

    tagTypes.forEach((type) => {
      const tagsForType = newTags.filter((tag) => tag.type === type);

      if (tagsForType.length > 0) {
        const prefix = newPath === '/search' ? '?' : '&';
        newPath =
          newPath +
          prefix +
          type +
          `=${tagsForType.map((tag) => tag.name).join(',')}`;
      }
    });

    this.tags = newTags;
  }

  removeTag(tag: Tag) {
    const oldTags = this.tags;
    const newTags = oldTags.filter((item) => item.name !== tag.name);

    let newPath = `/search`;

    tagTypes.forEach((type) => {
      const tagsForType = newTags.filter((item) => item.type === type);
      if (tagsForType.length > 0) {
        const prefix = newPath === '/search' ? '?' : '&';
        newPath =
          newPath +
          prefix +
          type +
          `=${newTags
            .filter((tag) => tag.type === type)
            .map((tag) => tag.name)
            .join(',')}`;
      }
    });

    this.tags = newTags;
  }

  openTagTypeModal(type: TagType) {
    this.tagTypeModal = type;
    Router.router?.replace(searchRoute.tags.typeUrl(type));
  }

  closeTagTypeModal() {
    this.tagTypeModal = null;
    Router.router?.replace(this.rootUrl);
  }

  constructor() {
    makeAutoObservable(
      this,
      {
        closeTagTypeModal: action.bound,
        openTagTypeModal: action.bound,
        removeTag: action.bound,
        addTag: action.bound,
        submitQuery: action.bound,
        setQuery: action.bound,
      },
      { name: 'SearchStore' },
    );

    reaction(
      () => this.searchForm.query,
      (query) => this.submitQuery(query),
    );
  }

  async submitQuery(query: string) {
    await waitFor(300);
    const tags = this.tags;
    const queryString = query.trim();

    if (!queryString)
      return Router.router?.push(
        `/search${
          tags.length
            ? '?' +
              tags.map((filter) => filter.type + '=' + filter.name).join('&')
            : ''
        }`,
        undefined,
        { shallow: true },
      );

    const newPath = `/search?q=${query}${
      tags.length
        ? '&' + tags.map((filter) => filter.type + '=' + filter.name).join('&')
        : ''
    }`;

    Router.router?.push(newPath, undefined, { shallow: true });
  }
}

export function useSearchStore() {
  return useStore<SearchStore>();
}
