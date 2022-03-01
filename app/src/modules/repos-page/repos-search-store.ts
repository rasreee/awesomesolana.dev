import { action, computed, makeAutoObservable } from 'mobx';
import Router from 'next/router';

import {
  GithubRepo,
  parseRawGitHubRepo,
  searchGithubRepos,
} from '@/domains/github';
import { tagUtils } from '@/domains/tags/tags.utils';
import { Tag, TagType } from '@/domains/tags/types';
import { createRequestStore } from '@/lib/mobx/request-store';
import { searchQuery } from '@/lib/searchQuery';
import { IReposSearchStore } from '@/stores/interfaces';
import type { TextInputProps } from '@/ui/text-input';

import { SearchFormData } from '../common/search-form/types';

export class ReposSearchStore implements IReposSearchStore {
  constructor() {
    makeAutoObservable(
      this,
      { toggleTag: action.bound },
      { name: 'ReposSearchStore' },
    );
  }

  hits: GithubRepo[] = [];
  tags: Tag[] = [];
  query = '';

  request = createRequestStore();

  setHits = (hits: GithubRepo[]) => {
    this.hits = hits;
  };

  onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.query = event.currentTarget.value;
  };

  getTextInputProps = (props?: Partial<TextInputProps>): TextInputProps =>
    computed(() => ({
      ...props,
      value: this.query,
      onChange: this.onChange,
    })).get();

  onSubmit = async ({ query, filters }: SearchFormData) => {
    if (!query && !filters.length) return this.setHits([]);

    this.request.setLoading(true);
    this.request.setError(null);
    try {
      const response = await searchGithubRepos({
        keywords: [query],
        tags: filters,
      });
      this.setHits(
        response.items.map((rawData) => parseRawGitHubRepo(rawData)),
      );
    } catch (error) {
      this.request.setError(error);
    } finally {
      this.request.setLoading(false);
    }
  };

  onReset = () => {
    this.query = '';
    this.request.onReset();
  };

  toggleTag = (tag: Tag) => {
    const isAdded = tagUtils.list(this.tags).has(tag);
    const newTags = isAdded
      ? tagUtils.list(this.tags).exclude([tag])
      : [...this.tags, tag];
    this.handleRoute(this.query, newTags);
    this.tags = newTags;
  };

  clearTags = (type: TagType) => {
    const newTags = this.tags.filter((tag) => tag.type !== type);
    this.handleRoute(this.query, newTags);
    /* important that we set state AFTER using the router */
    this.tags = newTags;
  };

  private handleRoute(queryString: string, tags: Tag[]) {
    const query = searchQuery({ term: queryString, tags });
    Router.router?.push(
      `/repos`,
      {
        query,
      },
      { shallow: true },
    );
  }
}
