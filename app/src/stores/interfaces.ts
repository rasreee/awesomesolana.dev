import { Tag } from '@awesomesolana/common';
import { SearchFormData } from '@awesomesolana/ui';

import { RequestStore } from '@/lib/mobx/request-store';

interface TagsSearchState {
  hits: Tag[];
  query: string;
}

export interface ITagsSearchStore extends TagsSearchState {
  setHits: (hits: Tag[]) => void;
  onSubmit: (query: SearchFormData) => any;
  request: RequestStore;
}
