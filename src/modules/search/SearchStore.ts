import { action, makeAutoObservable, observable, reaction } from 'mobx';

import { Tag, TagType, tagTypes, tagUtils } from '@/core/search';
import { useStore } from '@/mobx/storeContext';
import { waitFor } from '@/utils';

interface SearchFormState {
  loading: boolean;
  error: string | null;
  query: string;
}

interface ISearchForm extends SearchFormState {
  onChange: (value: string) => void;
  onReset: () => void;
}

function initSearchForm(): ISearchForm {
  const state: SearchFormState = observable.object({
    loading: false,
    error: null,
    query: '',
  });

  const onReset = action(() => {
    state.loading = false;
    state.error = null;
    state.query = '';
  });

  const onChange = action((value: string) => {
    state.query = value;
  });

  return { ...state, onChange, onReset };
}

interface TagsSearchState {
  hits: Tag[];
}

interface TagsSearch extends TagsSearchState {}

function initTagsSearch(): TagsSearch {
  const state = observable.object<TagsSearchState>({ hits: [] });

  return state;
}

export class SearchStore {
  tags: Tag[] = [];

  tagsSearchResult: Tag[] = [];
  tagsSearch: TagsSearch = initTagsSearch();

  searchForm = initSearchForm();

  tagTypeModal: TagType | null = null;

  clearTags(type: TagType) {
    const newTags = this.tags.filter((tag) => tag.type !== type);

    this.tags = newTags;
  }

  getRootUrl(query: string, tags: Tag[]): string {
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

  get rootUrl(): string {
    const tags = this.tags;
    const query = this.searchForm.query;
    return this.getRootUrl(query, tags);
  }

  get searchParams(): { tags: Tag[]; query: string } {
    return { tags: this.tags, query: this.searchForm.query };
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

  toggleTag(tag: Tag) {
    if (tagUtils.list(this.tags).has(tag)) return this.removeTag(tag);

    this.addTag(tag);
  }

  openTagTypeModal(type: TagType) {
    this.tagTypeModal = type;
  }

  closeTagTypeModal() {
    this.tagTypeModal = null;
  }

  async submitTagsSearch(query: string) {
    await waitFor(300);
    console.log('query', query);
  }

  async submitQuery(query: string) {
    await waitFor(300);
    console.log('query', query);
    // if (!queryString)
    //   return Router.router?.push(
    //     `/search${
    //       tags.length
    //         ? '?' +
    //           tags.map((filter) => filter.type + '=' + filter.name).join('&')
    //         : ''
    //     }`,
    //     undefined,
    //     { shallow: true },
    //   );
  }

  reset() {
    this.tags = [];
    this.searchForm = initSearchForm();
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
        clearTags: action.bound,
      },
      { name: 'SearchStore' },
    );

    reaction(
      () => this.searchForm.query,
      (query) => this.submitQuery(query),
    );
  }
}

export function useSearchStore() {
  return useStore<SearchStore>();
}
