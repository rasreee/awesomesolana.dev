import { action, computed, makeAutoObservable } from 'mobx';

import { appConfig } from '@/configs/app-config';
import {
  GithubRepo,
  GithubReposSearchParams,
  githubSwrKey,
  parseRawGitHubRepo,
  RawGithubReposResponse,
} from '@/core/github';
import { Tag, TagType, tagUtils } from '@/core/search';
import { TextInputProps } from '@/ui/components';

import { createRequestStore, RequestStore } from './request-store';

export interface ReposSearchState {
  hits: GithubRepo[];
  tags: Tag[];
  query: string;
}

export interface IReposRootStore extends ReposSearchState {
  setHits: (hits: GithubRepo[]) => void;
  onSubmit: (query: string) => Promise<any>;
  request: RequestStore;
  onReset: () => void;
  getTextInputProps: (props?: Partial<TextInputProps>) => TextInputProps;
  clearTags: (type: TagType) => void;
  toggleTag: (tag: Tag) => void;
}

async function searchGithubRepos(
  params: Partial<GithubReposSearchParams>,
): Promise<RawGithubReposResponse> {
  const res = await fetch(
    appConfig.baseUrl + githubSwrKey.route('/search', params),
  );

  return res.json();
}

export class ReposRootStore implements IReposRootStore {
  hits: GithubRepo[] = [];
  tags: Tag[] = [];
  query = '';

  request = createRequestStore();

  setHits(hits: GithubRepo[]) {
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
      const response = await searchGithubRepos({
        keywords: [query],
        tags: this.tags,
      });
      this.setHits(
        response.items.map((rawData) => parseRawGitHubRepo(rawData)),
      );
    } catch (error) {
      this.request.setError(error);
    } finally {
      this.request.setLoading(false);
    }
  }

  onReset() {
    this.query = '';
    this.request.onReset();
  }

  addTag(tag: Tag) {
    this.tags = [...this.tags, tag];
  }

  removeTag(tag: Tag) {
    this.tags = tagUtils.list(this.tags).exclude([tag]);
  }

  toggleTag(tag: Tag) {
    if (tagUtils.list(this.tags).has(tag)) return this.removeTag(tag);

    this.addTag(tag);
  }

  clearTags(type: TagType) {
    this.tags = this.tags.filter((tag) => tag.type === type);
  }

  constructor() {
    makeAutoObservable(
      this,
      { onChange: action.bound },
      { name: 'ReposRootStore' },
    );
  }
}
