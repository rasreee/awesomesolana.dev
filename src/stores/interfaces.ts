import { RequestStore } from '@/lib/mobx/request-store';
import { GithubRepo } from '@/modules/github';
import { SearchFormData, Tag, TagType } from '@/modules/search/types';
import { TextInputProps } from '@/ui/text-input';

interface TagsSearchState {
  hits: Tag[];
  query: string;
}

export interface ITagsSearchStore extends TagsSearchState {
  setHits: (hits: Tag[]) => void;
  onSubmit: (query: SearchFormData) => any;
  onReset: () => void;
  request: RequestStore;
}

interface ReposSearchState {
  hits: GithubRepo[];
  tags: Tag[];
  query: string;
}

export interface IReposSearchStore extends ReposSearchState {
  setHits: (hits: GithubRepo[]) => void;
  onSubmit: (params: SearchFormData) => Promise<any>;
  request: RequestStore;
  onReset: () => void;
  getTextInputProps: (props?: Partial<TextInputProps>) => TextInputProps;
  clearTags: (type: TagType) => void;
  toggleTag: (tag: Tag) => void;
}

export interface ITagTypeModalStore {
  tagType: TagType | null;
  onClose: () => void;
  isOpen: boolean;
}
