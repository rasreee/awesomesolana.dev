import { GithubRepo } from '@/domains/github/api';
import { Tag, TagType } from '@/domains/tags/tags.types';
import { RequestStore } from '@/lib/mobx/request-store';
import { ReposSearchStore } from '@/modules/repos/repos-search-store';
import { SearchFormData } from '@/modules/search/search.types';
import { TagTypeModalStore } from '@/modules/search/tag-type-modal-store';
import { TagsSearchStore } from '@/modules/tags-search/tags-search-store';
import { TextInputProps } from '@/ui/text-input';

export interface IRootStore {
  tagsSearch: TagsSearchStore;
  reposSearch: ReposSearchStore;
  tagTypeModal: TagTypeModalStore;
}

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
