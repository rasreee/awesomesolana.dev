import { makeAutoObservable } from 'mobx';

import { Tag } from '@/domains/tags/tags.types';
import { getTagSuggestions } from '@/domains/tags/tags.utils';
import { createRequestStore } from '@/lib/mobx/request-store';

import { SearchFormData } from '../search/search.types';

export class HomePageStore {
  menu = { isOpen: false };
  search: { results: Tag[]; query: string } = { results: [], query: '' };
  request = createRequestStore();

  resultsToShow: Tag[] = [];

  setSearchQuery = (value: string) =>
    (this.search = { ...this.search, query: value });

  reset = () => {
    this.resultsToShow = [];
    this.search = { results: [], query: '' };
    this.closeMenu();
  };

  openMenu = () => {
    this.menu = { isOpen: true };
  };

  closeMenu = () => {
    this.menu = { isOpen: false };
  };

  submitSearch = async ({ query, filters }: SearchFormData) => {
    if (!query) return (this.search = { results: [], query: '' });

    this.request.setLoading(true);
    this.request.setError(null);
    try {
      const response = await getTagSuggestions(query, filters);
      this.search = { ...this.search, results: response };
    } catch (error) {
      console.error(error);
      this.request.setError(error);
    } finally {
      this.request.setLoading(false);
    }
  };

  constructor() {
    makeAutoObservable(this, {}, { name: 'HomePageStore' });
  }
}
