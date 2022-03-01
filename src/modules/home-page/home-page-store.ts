import delay from 'lodash.delay';
import { makeAutoObservable, reaction } from 'mobx';

import { Tag } from '@/domains/tags/tags.types';
import { getTagSuggestions } from '@/domains/tags/tags.utils';

import { SearchFormData } from '../common/search-form/types';

export class SearchState {
  query = '';
  results: Tag[] = [];
  isBusy = false;
  error: string | null | undefined = null;

  constructor(private store: HomePageStore) {
    makeAutoObservable(this, {}, { name: 'SearchState' });

    reaction(
      () => this.query,
      (query) => {
        delay(this.submitSearch, 200, { query });
      },
    );
  }

  submitSearch = async ({ query, filters }: Partial<SearchFormData>) => {
    if (!query) return this.reset();

    this.isBusy = true;
    this.error = null;
    try {
      const response = await getTagSuggestions(query, filters);
      this.results = response;
    } catch (error) {
      console.error(error);
      if (!(error instanceof Error)) return;
      this.error = error.message;
    } finally {
      this.isBusy = false;
    }
  };

  reset = () => {
    this.query = '';
    this.results = [];
  };
}

export class HomePageStore {
  menu = { isOpen: false };
  search = new SearchState(this);

  reset = () => {
    this.search.reset();
    this.closeMenu();
  };

  openMenu = () => {
    this.menu = { isOpen: true };
  };

  closeMenu = () => {
    this.menu = { isOpen: false };
  };

  onSearchQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.search.query = event.currentTarget.value;
  };

  constructor() {
    makeAutoObservable(this, {}, { name: 'HomePageStore' });
  }
}
