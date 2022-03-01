import { Tag } from '@/domains/tags/tags.types';

export type SearchFormData = {
  query: string;
  filters: Tag[];
};
