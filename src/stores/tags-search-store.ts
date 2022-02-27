import { action, computed, makeAutoObservable } from 'mobx';

import { getTagSuggestions, Tag } from '@/core/search';
import type { TextInputProps } from '@/ui/components/TextInput';

import { createRequestStore, RequestStore } from './request-store';

export interface TagsSearchState {
  hits: Tag[];
  query: string;
}

export interface ITagsRootStore extends TagsSearchState {
  setHits: (hits: Tag[]) => void;
  onSubmit: (query: string) => any;
  onReset: () => void;
  request: RequestStore;
  getTextInputProps: (props?: Partial<TextInputProps>) => TextInputProps;
}

export class TagsRootStore implements ITagsRootStore {
  hits: Tag[] = [];
  query = '';

  request = createRequestStore();

  setHits(hits: Tag[]) {
    this.hits = hits;
  }

  onChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.query = event.currentTarget.value;
  }

  getTextInputProps = (props?: Partial<TextInputProps>): TextInputProps =>
    computed(() => ({
      ...props,
      value: this.query,
      onChange: this.onChange,
    })).get();

  async onSubmit(query: string) {
    if (!query) return this.setHits([]);

    this.request.setLoading(true);
    this.request.setError(null);
    try {
      const response = await getTagSuggestions(query);
      this.setHits(response);
    } catch (error) {
      this.request.setError(error);
    } finally {
      this.request.setLoading(false);
    }
  }

  onReset() {
    this.query = '';
    this.hits = [];
    this.request.onReset();
  }

  constructor() {
    makeAutoObservable(
      this,
      { onChange: action.bound, onReset: action.bound },
      { name: 'TagsRootStore' },
    );
  }
}
