import { getTagSuggestions } from '@awesomesolana/common';
import { Tag } from '@awesomesolana/common';
import type { SearchFormData } from '@awesomesolana/ui';
import { makeAutoObservable } from 'mobx';

import { createRequestStore } from '@/lib/mobx/request-store';
import { ITagsSearchStore } from '@/stores/interfaces';

export class TagsSearchStore implements ITagsSearchStore {
  constructor() {
    makeAutoObservable(this, {}, { name: 'TagsSearchStore' });
  }
  hits: Tag[] = [];
  query = '';

  request = createRequestStore();

  setHits = (hits: Tag[]) => {
    this.hits = hits;
  };

  onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.query = event.currentTarget.value;
  };

  onSubmit = async ({ query }: SearchFormData) => {
    if (!query) return this.setHits([]);

    this.request.setLoading(true);
    this.request.setError(null);
    try {
      const response = await getTagSuggestions(query);
      this.setHits(response);
    } catch (error) {
      console.error(error);
      this.request.setError(error);
    } finally {
      this.request.setLoading(false);
    }
  };
}
