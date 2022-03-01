import { Tag } from '@/domains/tags/types';

export type SearchFormData = {
  query: string;
  filters: Tag[];
};
