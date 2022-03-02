import { Tag } from '@awesomesolana/common';
import { getTagSuggestions } from '@awesomesolana/common';
import { SearchFormData } from '@awesomesolana/ui';
import delay from 'lodash.delay';
import { makeAutoObservable, reaction } from 'mobx';

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

  submitSearch = async ({ query }: Partial<SearchFormData>) => {
    if (!query) return this.reset();

    this.isBusy = true;
    this.error = null;
    try {
      const response = await getTagSuggestions(query);
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
