import { makeAutoObservable } from 'mobx';

import { ITagsSearchStore } from '@/app/stores/interfaces';
import { Tag } from '@/domains/tags/tags.types';
import { getTagSuggestions } from '@/domains/tags/tags.utils';
import { createRequestStore } from '@/lib/mobx/request-store';
import type { TextInputProps } from '@/ui/text-input';

import { SearchFormData } from '../search-form/types';

export class TagsSearchStore implements ITagsSearchStore {
  constructor() {
    makeAutoObservable(this, {}, { name: 'TagsSearchStore' });
  }
  getTextInputProps: (
    props?: Partial<TextInputProps> | undefined,
  ) => TextInputProps;

  hits: Tag[] = [];
  query = '';

  request = createRequestStore();

  setHits = (hits: Tag[]) => {
    this.hits = hits;
  };

  onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.query = event.currentTarget.value;
  };

  onSubmit = async ({ query, filters }: SearchFormData) => {
    console.log('TagsSearchStore.onSubmit()', { query, filters });
    if (!query) return this.setHits([]);

    this.request.setLoading(true);
    this.request.setError(null);
    try {
      const response = await getTagSuggestions(query, filters);
      this.setHits(response);
    } catch (error) {
      console.error(error);
      this.request.setError(error);
    } finally {
      this.request.setLoading(false);
    }
  };

  onReset = () => {
    this.query = '';
    this.hits = [];
    this.request.onReset();
  };
}
