import delay from 'lodash.delay';
import { makeAutoObservable, reaction } from 'mobx';

import { Tag } from '@/domains/tags/tags.types';
import { getTagSuggestions } from '@/domains/tags/tags.utils';
import { createRequestStore } from '@/lib/mobx/request-store';

import { SearchFormData } from '../search/search.types';

export class SearchQuery {
  constructor() {
    makeAutoObservable(this, {}, { name: 'SearchQuery' });

    reaction(
      () => this.query,
      (query) => {
        console.log(`[REACTION] query=${query}`);
        delay(this.submitSearch, 200, { query });
      },
    );
  }

  results: Tag[] = [];

  query = '';

  request = createRequestStore();

  setQuery = (value: string) => (this.query = value);

  onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.query = event.currentTarget.value;
  };

  setResults = (hits: Tag[]) => {
    this.results = hits;
  };

  reset = () => {
    this.query = '';
    this.results = [];
  };

  submitSearch = async ({ query, filters }: Partial<SearchFormData>) => {
    console.log('SearchQuery.submitSearch()', { query });
    if (!query) return this.reset();

    this.request.setLoading(true);
    this.request.setError(null);
    try {
      const response = await getTagSuggestions(query, filters);
      this.setResults(response);
    } catch (error) {
      console.error(error);
      this.request.setError(error);
    } finally {
      this.request.setLoading(false);
    }
  };
}

export class HomePageStore {
  menu = { isOpen: false };
  search = new SearchQuery();

  reset = () => {
    this.search = new SearchQuery();
    this.closeMenu();
  };

  openMenu = () => {
    this.menu = { isOpen: true };
  };

  closeMenu = () => {
    this.menu = { isOpen: false };
  };

  constructor() {
    makeAutoObservable(this, {}, { name: 'HomePageStore' });
  }
}
